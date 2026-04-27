# STATION8 — Pre-Launch Readiness Plan

> **Purpose of this document.** This is the durable plan for closing the gaps identified in the 2026-04-26 pre-production audit. It is written so that **any future Claude session (or human dev) can pick the work up cold**, without re-reading the audit transcript. Each item lists *what*, *why*, *files touched*, *gotchas*, and *done criteria*. Status is tracked inline.
>
> **Companion docs:**
> - [DECISIONS_NEEDED.md](DECISIONS_NEEDED.md) — open questions only the user (Kazimiro) can answer. Do not invent answers; surface them when the user asks "what's next".
> - [AUDIT_2026-04-26.md](AUDIT_2026-04-26.md) — condensed version of the original audit findings.

---

## Context (read first)

- **Project:** STATION8 Public Market — marketing site for a Landmark Food Halls venue at UCSD's Theater District in La Jolla, CA. Built on Next.js 15 / React 19 / Tailwind v4, currently on phase **P0** of an 8-phase roadmap (P0=foundation, P3=Sanity CMS, P5=Mapbox, P6=booking form + Instagram + Resend, P7=perf/SEO polish, P8=launch).
- **Audit verdict:** strong foundation, **64/100 overall**, not launch-ready. Strongest area: a11y (92). Weakest: privacy/legal (25), CMS (30).
- **User direction (2026-04-26):**
  1. Placeholder images stay until pro photos arrive — **do not** spend effort on image optimization.
  2. Write Privacy Policy, Terms of Service, Cookie Policy.
  3. Make the site **Section 508 compliant** (US fed accessibility / WCAG 2.1 AA) — explicit liability concern, no disability lawsuits.
  4. Address all other audit issues as independently as possible.
  5. Defer real-world decisions (real emails, IG handle, legal entity name, etc.) to [DECISIONS_NEEDED.md](DECISIONS_NEEDED.md).
- **Working agreements** (from auto-memory):
  - Never commit without explicit user approval — finish a change, run checks, stop, wait.
  - Branch naming for staged work: `st8_{mon}{dd}_v{N}` (e.g. `st8_apr26_v1`).
  - Commit format: grouped bullets, `---` divider, italic tech details (non-technical stakeholders read git log).
  - STATION8 brand name is always `STATION8` — never `Station 8`.
  - Don't put internal artifacts on the public site.

---

## Status legend

- ✅ Done in this sprint
- 🟡 Partially done — see notes
- ⏸ Blocked on a decision in [DECISIONS_NEEDED.md](DECISIONS_NEEDED.md)
- ⏳ Not started, queued
- 🚫 Out of scope (won't do, with reason)

---

## Master punch list

| # | Severity | Item | Status | Notes |
|---|---|---|---|---|
| 1 | 🔴 | Patch postcss CVE (`<8.5.10`) | ✅ | `pnpm update` run; verify with `pnpm audit --prod` |
| 2 | 🔴 | Privacy Policy page | ✅ | Draft at `/privacy`; needs lawyer review + entity confirm |
| 3 | 🔴 | Terms of Service page | ✅ | Draft at `/terms`; needs lawyer review |
| 4 | 🔴 | Cookie / Storage Policy page | ✅ | Draft at `/cookies` |
| 5 | 🔴 | Accessibility Statement page | ✅ | Draft at `/accessibility`; refresh date when re-audited |
| 6 | 🔴 | 508/WCAG: drop `maximumScale: 5` | ✅ | `app/layout.tsx` viewport |
| 7 | 🔴 | 508/WCAG: skip-to-content link | ✅ | Added in `app/page.tsx`; styled in `globals.css` |
| 8 | 🔴 | 508/WCAG: fix Divider `aria-hidden="false"` bug | ✅ | Now `aria-hidden`, decorative |
| 9 | 🔴 | Security headers (CSP, HSTS, X-CTO, Referrer-Policy, Permissions-Policy, X-Frame-Options) | ✅ | `next.config.ts` `headers()`; CSP starts permissive — tighten after monitoring |
| 10 | 🔴 | `app/not-found.tsx` | ✅ | Branded 404 |
| 11 | 🔴 | `app/error.tsx` | ✅ | Branded crash fallback (client component, required by Next 15) |
| 12 | 🔴 | `app/robots.ts` | ✅ | Production = allow all, preview = disallow |
| 13 | 🔴 | `app/sitemap.ts` | ✅ | Lists `/`, `/privacy`, `/terms`, `/cookies`, `/accessibility` |
| 14 | 🟠 | LocalBusiness JSON-LD | ✅ | Inline `<script type="application/ld+json">` in `app/layout.tsx` |
| 15 | 🟠 | `SECURITY.md` | ✅ | Repo root |
| 16 | 🟠 | `public/.well-known/security.txt` | ✅ | 1-yr expiry, points at security@ alias |
| 17 | 🟠 | CI workflow (`lint + typecheck + test + e2e`) | ✅ | `.github/workflows/ci.yml` — runs on push/PR |
| 18 | 🟠 | Footer legal links | ✅ | Footer bottom strip now links to all 4 legal pages |
| 19 | 🟠 | Replace placeholder contact emails (`@station8.example`) | ⏸ | **D-1** in [DECISIONS_NEEDED.md](DECISIONS_NEEDED.md) |
| 20 | 🟠 | Verify or remove Instagram link (`instagram.com/station8`) | ⏸ | **D-2** |
| 21 | 🟠 | Fix broken Bookings CTA `#bookings-form` | ⏸ | **D-3** — interim mailto vs build form now |
| 22 | 🟡 | Real favicon set + 1200×630 OG image | 🟡 | Minimal SVG favicon `app/icon.svg` shipped; OG image still pending — **D-4** |
| 23 | 🟡 | Wire Sentry / error monitoring | ⏸ | **D-5** — env keys exist, no code yet |
| 24 | 🟡 | Lighthouse pass on staging deploy | ⏳ | Run after deploy |
| 25 | 🟡 | Component test coverage backfill | ⏳ | Future sprint — not launch-blocking |
| 26 | 🟡 | Sanity CMS wiring (P3) | 🚫 | Out of scope — own phase |
| 27 | 🟡 | Image re-encode | 🚫 | Out of scope — placeholders only, pro photos arriving |
| 28 | 🟡 | `tsconfig.tsbuildinfo` in .gitignore | ✅ | Already covered by `*.tsbuildinfo` rule (audit was wrong) |

---

## Detail notes per item

### #9 — Security headers — CSP caveat
The CSP shipped in `next.config.ts` is **deliberately permissive on `script-src` / `style-src`** (`'unsafe-inline'`) because Next.js App Router needs inline `<script>` for hydration boot and Tailwind uses inline styles for arbitrary values. Tightening to nonce/hash-based CSP is a separate, larger task — needs a custom middleware that mints nonces per request. **Defer to P7 polish.** What ships now is still a measurable improvement: `frame-ancestors 'none'` blocks clickjacking, `img-src` allowlists Sanity + Instagram, `connect-src` is bounded, `form-action 'self'` blocks credential exfil.

### #11 — `app/error.tsx` is a client component
Next.js 15 requires error boundaries in App Router to be `"use client"`. Don't try to make it a server component.

### #12/13 — robots / sitemap depend on `NEXT_PUBLIC_SITE_URL`
Both files default to `http://localhost:3000` if the env var is missing, which is safe for dev but means the production deploy **must** set `NEXT_PUBLIC_SITE_URL=https://<real-domain>` before the sitemap is useful. Add to deploy checklist.

### #14 — LocalBusiness JSON-LD
The schema currently uses placeholder `streetAddress`, `postalCode`, and `telephone`. These are flagged in [DECISIONS_NEEDED.md](DECISIONS_NEEDED.md) as **D-6**. Once provided, swap them in. Vendor list is built from `features/vendors/vendors.ts` so it stays in sync.

### #17 — CI workflow
Workflow runs on Node 22 (matches `.nvmrc`) and uses pnpm 10. It does **not** install Playwright browsers by default — added a separate `e2e` job that does, but it's marked `continue-on-error: true` until the test suite has more coverage. Tighten this once the suite is real.

### #21 — Bookings CTA
This is the most visible UX defect. Two paths:
- **Path A (interim):** swap `href="#bookings-form"` → `href="mailto:bookings@<domain>"`. ~5 min.
- **Path B (real):** build a Resend-backed form with Turnstile (this is P6 work). Multi-day.
Surface to user — see **D-3**.

---

## What's intentionally NOT done in this sprint

- **Image re-encoding** — user override.
- **Sanity CMS wiring** — that's the entire P3 phase; not a launch blocker for marketing site.
- **Real booking form** — P6 work; interim mailto recommended.
- **Sentry** — needs DSN; user decision pending.
- **Tighten CSP to nonce-based** — needs nonce middleware; defer to P7.
- **Real favicons / OG image** — needs branded asset export; placeholder SVG icon ships.
- **Component test backfill** — non-launch-blocking; future sprint.

---

## How to pick this up next session

1. Read this file top to bottom.
2. Read [DECISIONS_NEEDED.md](DECISIONS_NEEDED.md) and surface any answered items.
3. Run `pnpm install && pnpm typecheck && pnpm lint && pnpm test` (use Node 22).
4. For any item still ⏸ or 🟡, check if its blocking decision has been resolved in [DECISIONS_NEEDED.md](DECISIONS_NEEDED.md).
5. Do NOT commit unless the user says so — see auto-memory `feedback_commit_only_on_approval.md`.
