# Open Decisions — STATION8 Pre-Launch

> Items that **only the user (Kazimiro) can decide.** Each has a short why, the options, and a recommended default. When the user asks "what's next", surface the highest-priority unresolved item from this list.
>
> Companion: [PRE_LAUNCH_PLAN.md](PRE_LAUNCH_PLAN.md).

**Priority order:** D-1, D-3, D-2, D-6, D-7, D-8, D-4, D-5, D-9, D-10, D-11.

---

## D-1 — Real contact email addresses 🔴 launch-blocker
**Status:** open
**Where it bites:** `features/contact/Footer.tsx:13-15` currently uses `hello@station8.example`, `vendors@station8.example`, `careers@station8.example`. The `.example` TLD is RFC 2606 reserved — these are non-deliverable. Same domain placeholder appears in JSON-LD, security.txt, and several legal pages.
**Need:** the real domain(s) and three monitored mailboxes (or one catch-all + forwarders).
**Recommended default:** `hello@`, `vendors@`, `careers@`, `bookings@`, `security@`, `accessibility@`, `legal@`, `privacy@` — all on the production domain.

---

## D-2 — Instagram handle 🔴 launch-blocker
**Status:** open
**Where it bites:** `features/contact/Footer.tsx:71` hardcodes `https://instagram.com/station8`. That handle may belong to someone else; needs verification or the icon should be removed until the real account exists.

---

## D-3 — Bookings CTA fix 🔴 launch-blocker
**Status:** open
**Where it bites:** `app/page.tsx:230` — the "Get in Touch" button targets `#bookings-form`, but there is no booking form on the page. The most visible commercial CTA on the site does nothing.
**Options:**
- **A — Interim mailto** (5 min): swap `href` to `mailto:bookings@<domain>?subject=Private%20Event%20Inquiry`. Recommended for launch.
- **B — Build the form now** (multi-day): Resend + Turnstile + server validation. This is P6 work; pulling it in adds risk to the launch date.
**Recommended:** A for launch, B during P6.

---

## D-4 — Brand assets for favicons + OG image 🟠 high
**Status:** partial — minimal SVG favicon shipped at `app/icon.svg`
**Need:**
- Production favicons: 32×32 PNG, 180×180 Apple touch icon, 192/512 PNG for PWA, branded `.ico`.
- 1200×630 OpenGraph share image (`public/og-image.png`).
- Optional: Safari pinned tab SVG, Microsoft tile.
**Recommendation:** export from the existing brand assets in `ASSETS/` (gitignored brand source) using realfavicongenerator.net.

---

## D-5 — Error monitoring 🟠 high
**Status:** open
**Decision:** Sentry vs Vercel Analytics + Speed Insights vs none-at-launch?
**Notes:**
- Sentry env keys already exist in `.env.example` and `lib/env.ts`.
- Sentry adds ~30 KB to client bundle and a privacy disclosure (we'd update Privacy Policy).
- Vercel Web Analytics is privacy-friendly (no cookies, GDPR/CCPA compliant out of the box) but only tracks page views, not exceptions.
**Recommended:** **Both** — Vercel Analytics for traffic (no consent needed) + Sentry for exceptions (disclose in privacy policy).

---

## D-6 — Real business address, phone, hours for JSON-LD 🟠 high
**Status:** open
**Where it bites:** `app/layout.tsx` JSON-LD currently has placeholder address and no phone. Google Restaurant rich results need accurate `address`, `geo`, `telephone`, `openingHours`.
**Need:**
- Street address, city, state, zip
- Lat/long
- Phone number (or mark explicitly as "no public phone yet")
- Confirmed daily hours (current copy says 7am–9pm daily — confirm)

---

## D-7 — Legal entity name and governing-law jurisdiction 🟠 high
**Status:** open
**Where it bites:** `/privacy`, `/terms`, `/cookies`, `/accessibility` — every legal page references `[Legal Entity Name]` and `California` as governing law.
**Need:**
- Confirm legal entity (e.g. "Landmark Food Halls, LLC" — site metadata says "Landmark Food Halls" but legal entity may differ)
- Confirm California as governing law
- Confirm jurisdiction for disputes (county)
- Decide on arbitration clause yes/no in Terms

**Important:** the drafts shipped are **drafts for legal review**. Do not publish without a lawyer's sign-off.

---

## D-8 — Production domain name 🟠 high
**Status:** open
**Where it bites:** `NEXT_PUBLIC_SITE_URL` is `http://localhost:3000` in `.env.example`. `app/sitemap.ts`, `app/robots.ts`, JSON-LD, security.txt, all legal pages need the real production URL.
**Likely:** `station8publicmarket.com` or similar. Confirm registrar + DNS provider too (affects HSTS preload eligibility).

---

## D-9 — Cookie banner approach 🟡 medium
**Status:** open — currently no banner needed
**Context:** site sets zero cookies and uses one localStorage key (motion preference). No analytics yet.
**Decision triggers when:** Sentry, Vercel Analytics, or any embed (Instagram, Mapbox) is added.
**Options:**
- **Notice-only banner** (US/CCPA standard) — passive disclosure
- **Opt-in consent banner** (EU/GDPR strict) — block scripts until accepted
**Recommended:** notice-only is sufficient for a CA-only audience. If site targets EU visitors materially, switch to opt-in.

---

## D-10 — HSTS preload commitment 🟡 medium
**Status:** open
**Current:** HSTS shipped with `max-age=31536000; includeSubDomains` (1 year, no preload).
**Decision:** opt into the [HSTS preload list](https://hstspreload.org/)?
**Tradeoff:** preload is one-way commitment (removal takes weeks). Only opt in once you're certain every subdomain (current and future) will always be HTTPS.
**Recommended:** wait 2–4 weeks post-launch with no HTTPS issues, then opt in.

---

## D-11 — Staging URL + access control 🟡 medium
**Status:** open
**Need:** a stable staging URL for stakeholder review (Eren, Lorena) where `robots.ts` returns `disallow: /` so it doesn't index. Vercel preview URLs work but rotate; a stable `staging.station8.example` would be friendlier.

---

## How decisions are surfaced

When the user asks "what's next" or similar:
1. Read this file.
2. Pick the highest-priority unresolved item.
3. Ask the user the specific question, with the recommended default and any tradeoffs.
4. Once answered, update the relevant files **and** mark this item as resolved here (move to a "Resolved" section at the bottom with the answer + date).

---

## Resolved

*(none yet)*
