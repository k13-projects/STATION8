import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Private event / bookings enquiry endpoint.
 *
 * The Bookings section's "Get in Touch" button opens a pop-up form; this route delivers what it
 * collects to STATION8. The fields are the ones Lorena's own brief specified (STATION 8 - TEXTS:
 * "Get in touch - button - pop up", then "Event host name (required), Email (required), Phone,
 * Date, Time, Number of Guests, Message (required)"), so the shape of this form is the client's,
 * not ours.
 *
 * Ported from LobsterLab's app/api/catering/route.ts, which was itself ported from TLC's
 * /api/contact. Same house rules: the API key and the destination live ONLY server-side, never
 * NEXT_PUBLIC_*, and nothing the client sends ever reaches a mail header unsanitized.
 *
 * Required env (server-side):
 *   RESEND_API_KEY      - Resend API key scoped to the sending domain
 *   BOOKING_INBOX       - where enquiries land, currently info@station8pm.com
 *   BOOKING_FROM_EMAIL  - verified sender, e.g. "STATION8 Bookings <bookings@notify.k13projects.com>"
 *
 * Until those are set this route returns 503 not_configured and the form says so, offering the
 * guest a prefilled mail draft instead. It must never answer "sent" for an enquiry it dropped:
 * this whole section exists because the button used to point at a form that was never built, and
 * a silent failure is the same defect wearing a nicer coat.
 */
export const runtime = "nodejs";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const DIGITS_RE = /\d/g;
const MIN_PHONE_DIGITS = 7;

const MAX_BODY_BYTES = 16384;
// Strips CR/LF and other control characters, which is what keeps the server-built subject and the
// reply-to header injection-safe. The message variant keeps \n so paragraphs survive.
// biome-ignore lint/suspicious/noControlCharactersInRegex: matching control characters is the entire job here, they are what a header injection is made of
const CONTROL_CHARS_RE = /[\r\n\x00-\x1f]/g;
// biome-ignore lint/suspicious/noControlCharactersInRegex: same, minus the newline so paragraphs survive
const CONTROL_KEEP_NEWLINES_RE = /[\x00-\x09\x0b\x0c\x0e-\x1f]/g;

const MAX_FIELD = 200;
const MAX_MESSAGE = 4000;

// One IP gets five enquiries an hour. In memory on purpose: a booking form does not justify a
// datastore, and a serverless instance recycling simply resets a limit that only exists to blunt
// casual abuse.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT;
}

function clean(value: unknown, max: number, keepNewlines = false): string {
  if (typeof value !== "string") return "";
  const stripped = value.replace(keepNewlines ? CONTROL_KEEP_NEWLINES_RE : CONTROL_CHARS_RE, " ");
  return stripped.trim().slice(0, max);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Honeypot: a field the form renders but hides from people. Anything that fills it is a bot, and
  // it is answered with a plain 200 so the bot has nothing to learn from being refused.
  if (clean(body.company, 100)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, MAX_FIELD);
  const email = clean(body.email, MAX_FIELD);
  const phone = clean(body.phone, MAX_FIELD);
  const date = clean(body.date, MAX_FIELD);
  const time = clean(body.time, MAX_FIELD);
  const guests = clean(body.guests, 40);
  const message = clean(body.message, MAX_MESSAGE, true);

  // Required by the brief: host name, email, message. Phone, date, time and guest count are
  // optional there, so they stay optional here; a guest who only knows "sometime in June" should
  // still be able to ask.
  if (!name || !EMAIL_RE.test(email) || !message) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  if (phone && (phone.match(DIGITS_RE) ?? []).length < MIN_PHONE_DIGITS) {
    return NextResponse.json({ ok: false, error: "invalid_phone" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_INBOX;
  const from = process.env.BOOKING_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error(
      "[bookings] Resend not configured (RESEND_API_KEY/BOOKING_INBOX/BOOKING_FROM_EMAIL) - enquiry REJECTED, not delivered.",
    );
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const subject = `Private event enquiry: ${name}${guests ? `, ${guests} guests` : ""}`;
  const receivedAt = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date());

  const rows: Array<[string, string]> = [
    ["Host", name],
    ["Email", email],
    ["Phone", phone || "not given"],
    ["Date", date || "not given"],
    ["Time", time || "not given"],
    ["Guests", guests || "not given"],
  ];

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#222;">
      <p style="margin:0 0 16px;"><strong>Private event enquiry from station8publicmarket.com</strong></p>
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 16px;">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="padding:6px 14px 6px 0;color:#666;">${label}</td><td style="padding:6px 0;"><strong>${escapeHtml(value)}</strong></td></tr>`,
          )
          .join("")}
      </table>
      <p style="margin:0 0 8px;color:#666;">Message</p>
      <p style="margin:0 0 16px;white-space:pre-wrap;">${escapeHtml(message)}</p>
      <p style="margin:0;color:#888;font-size:13px;">Received ${receivedAt} Pacific. Reply to this email and it goes straight to the guest.</p>
    </div>
  `;

  const text = [
    "Private event enquiry from station8publicmarket.com",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    message,
    "",
    `Received ${receivedAt} Pacific. Reply to this email and it goes straight to the guest.`,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      html,
      text,
    });
    if (error) {
      console.error("[bookings] Resend rejected the send:", error);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[bookings] send threw:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
