"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/design-system/primitives/Button";
import { Body } from "@/design-system/primitives/Typography";
import { Magnetic } from "@/motion/primitives/Magnetic";

/**
 * BookingsModal — the "Get in Touch" button in the Bookings section.
 *
 * The button used to point at #bookings-form, an anchor for a form that was never built, so the
 * most visible commercial call to action on the site did nothing at all. This is that form, with
 * the fields Lorena's brief specified: event host name, email, phone, date, time, number of
 * guests, message. Host, email and message are required there and required here.
 *
 * Same <dialog> approach as LearnMoreModal: focus trap, inert background, Escape to close and
 * aria-modal come free from the platform, backdrop click is wired explicitly.
 *
 * On delivery, see app/api/bookings/route.ts. The one thing worth knowing here is the failure
 * path: if the mail service is not configured yet, or the network drops, the form does NOT claim
 * to have sent anything. It says so and hands the guest a prefilled mail draft to the same inbox,
 * so an enquiry is never silently lost and the button is never a dead end again.
 */

const CONTACT_EMAIL = "info@station8pm.com";

type Status = "idle" | "sending" | "sent" | "fallback" | "error";

const FIELD_CLASS =
  "w-full rounded-[6px] border border-[color:var(--color-olive)]/25 bg-white/70 px-3 py-2.5 " +
  "font-[family-name:var(--font-sans)] text-[0.875rem] text-[color:var(--color-dark-bark)] " +
  "placeholder:text-[color:var(--color-dark-bark)]/40 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-olive)]";

const LABEL_CLASS =
  "mb-1.5 block font-[family-name:var(--font-mono)] text-[0.6875rem] font-bold uppercase " +
  "tracking-[0.12em] text-[color:var(--color-olive)]";

export function BookingsModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [mailtoHref, setMailtoHref] = useState("");

  const openModal = useCallback(() => {
    dialogRef.current?.showModal();
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      setOpen(false);
      // Reset only after a success, so a guest who closes on an error still finds what they typed.
      setStatus((s) => (s === "sent" ? "idle" : s));
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  const onBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) closeModal();
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus("sending");

    // Built up front so it is ready whichever way this goes: it is the fallback below, and it costs
    // nothing if the send succeeds.
    const lines = [
      `Host: ${data.name ?? ""}`,
      `Email: ${data.email ?? ""}`,
      `Phone: ${data.phone ?? ""}`,
      `Date: ${data.date ?? ""}`,
      `Time: ${data.time ?? ""}`,
      `Guests: ${data.guests ?? ""}`,
      "",
      data.message ?? "",
    ].join("\n");
    setMailtoHref(
      `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Private event enquiry")}&body=${encodeURIComponent(lines)}`,
    );

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
        return;
      }
      const payload = (await res.json().catch(() => ({}))) as { error?: string };
      // not_configured means delivery is not wired yet; send_failed means it broke on the way.
      // Either way the guest gets a route that works rather than a shrug.
      setStatus(
        payload.error === "invalid" || payload.error === "invalid_phone" ? "error" : "fallback",
      );
    } catch {
      setStatus("fallback");
    }
  };

  return (
    <>
      <Magnetic>
        <Button
          onClick={openModal}
          variant="primary"
          className="!rounded-full !bg-[color:var(--color-olive)] !text-[color:var(--color-sand-stone)] !border-[color:var(--color-olive)] hover:!bg-[color:var(--color-dark-bark)]"
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          Get in Touch
        </Button>
      </Magnetic>

      {/* biome-ignore lint/a11y/useKeyWithClickEvents: the backdrop click is a pointer affordance; the keyboard path is Escape, handled natively by <dialog> */}
      <dialog
        ref={dialogRef}
        onClick={onBackdropClick}
        aria-labelledby="bookings-title"
        className="m-auto w-[min(94vw,640px)] max-w-none rounded-[10px] border border-[color:var(--color-olive)]/20 bg-[color:var(--color-sand-stone)] p-0 text-[color:var(--color-dark-bark)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] backdrop:bg-[color:var(--color-dark-bark)]/65 backdrop:backdrop-blur-sm"
      >
        <div className="relative max-h-[90svh] overflow-y-auto px-6 pb-8 pt-9 md:px-9 md:pb-9">
          <button
            type="button"
            onClick={closeModal}
            aria-label="Close"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-[color:var(--color-dark-bark)] transition-colors duration-[var(--duration-fast)] ease-[var(--ease-precise)] hover:bg-[color:var(--color-olive)]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-olive)]"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" fill="none">
              <path
                d="M1 1L15 15M15 1L1 15"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <h2
            id="bookings-title"
            className="font-[family-name:var(--font-display)] text-[1.375rem] uppercase leading-[1.1] tracking-tight md:text-[1.75rem]"
          >
            Plan something special
          </h2>
          <Body className="mt-2 text-[0.8125rem] leading-[1.6] text-[color:var(--color-dark-bark)]/80">
            Tell us what you have in mind and the team will come back to you. Host name, email and a
            short note are all we really need; the rest helps us answer faster.
          </Body>

          {status === "sent" ? (
            <div className="mt-7" role="status">
              <h3 className="font-[family-name:var(--font-mono)] text-[0.9375rem] font-bold uppercase tracking-[0.12em] text-[color:var(--color-olive)]">
                Thank you, it is on its way
              </h3>
              <Body className="mt-2.5 text-[0.8125rem] leading-[1.6] text-[color:var(--color-dark-bark)]/85">
                Your enquiry has reached the team and they will reply to the address you gave us.
              </Body>
              <button
                type="button"
                onClick={closeModal}
                className="mt-6 rounded-full border border-[color:var(--color-olive)] px-5 py-2 font-[family-name:var(--font-mono)] text-[0.75rem] uppercase tracking-[0.12em] text-[color:var(--color-olive)] transition-colors duration-[var(--duration-fast)] hover:bg-[color:var(--color-olive)] hover:text-[color:var(--color-sand-stone)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-olive)]"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-7 flex flex-col gap-4" noValidate={false}>
              {/* Honeypot. Hidden from people, tempting to bots, checked on the server. */}
              <div
                aria-hidden="true"
                className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
              >
                <label htmlFor="bk-company">Company</label>
                <input
                  id="bk-company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div>
                <label htmlFor="bk-name" className={LABEL_CLASS}>
                  Event host name <span aria-hidden="true">*</span>
                </label>
                <input
                  id="bk-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className={FIELD_CLASS}
                  placeholder="Your name"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="bk-email" className={LABEL_CLASS}>
                    Email <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="bk-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={FIELD_CLASS}
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="bk-phone" className={LABEL_CLASS}>
                    Phone
                  </label>
                  <input
                    id="bk-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className={FIELD_CLASS}
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label htmlFor="bk-date" className={LABEL_CLASS}>
                    Date
                  </label>
                  <input id="bk-date" name="date" type="date" className={FIELD_CLASS} />
                </div>
                <div>
                  <label htmlFor="bk-time" className={LABEL_CLASS}>
                    Time
                  </label>
                  <input id="bk-time" name="time" type="time" className={FIELD_CLASS} />
                </div>
                <div>
                  <label htmlFor="bk-guests" className={LABEL_CLASS}>
                    Guests
                  </label>
                  <input
                    id="bk-guests"
                    name="guests"
                    type="number"
                    min={1}
                    inputMode="numeric"
                    className={FIELD_CLASS}
                    placeholder="How many"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="bk-message" className={LABEL_CLASS}>
                  Message <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="bk-message"
                  name="message"
                  required
                  rows={4}
                  className={`${FIELD_CLASS} resize-y`}
                  placeholder="Birthday, company dinner, something else entirely"
                />
              </div>

              {status === "error" ? (
                <p
                  role="alert"
                  className="rounded-[6px] bg-[color:var(--color-olive)]/10 px-3 py-2.5 font-[family-name:var(--font-sans)] text-[0.8125rem] leading-[1.5]"
                >
                  Something in the form did not look right. Check the email address and the phone
                  number, then try again.
                </p>
              ) : null}

              {status === "fallback" ? (
                <p
                  role="alert"
                  className="rounded-[6px] bg-[color:var(--color-olive)]/10 px-3 py-2.5 font-[family-name:var(--font-sans)] text-[0.8125rem] leading-[1.5]"
                >
                  We could not send this from the site just now, and we would rather tell you than
                  lose it.{" "}
                  <a
                    href={mailtoHref}
                    className="font-semibold underline underline-offset-2 hover:text-[color:var(--color-olive)]"
                  >
                    Open it as an email instead
                  </a>{" "}
                  and everything you typed comes with it, addressed to {CONTACT_EMAIL}.
                </p>
              ) : null}

              <div className="mt-1 flex items-center gap-4">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="rounded-full bg-[color:var(--color-olive)] px-6 py-2.5 font-[family-name:var(--font-mono)] text-[0.75rem] uppercase tracking-[0.12em] text-[color:var(--color-sand-stone)] transition-colors duration-[var(--duration-fast)] hover:bg-[color:var(--color-dark-bark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-olive)] focus-visible:ring-offset-2 disabled:opacity-60"
                >
                  {status === "sending" ? "Sending" : "Send enquiry"}
                </button>
                <span className="font-[family-name:var(--font-sans)] text-[0.75rem] text-[color:var(--color-dark-bark)]/60">
                  <span aria-hidden="true">*</span> required
                </span>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
