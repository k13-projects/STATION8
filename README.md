# STATION8 Public Market

Next-generation site for STATION8 Public Market — a 20,000 sq ft food hall at UC San Diego's Theater District in La Jolla, CA. Part of Landmark Food Halls.

> Built by the Kazimiro team. Plan at `../.claude/plans/you-are-our-new-lovely-lollipop.md`.

## Stack

- **Next.js 15** (App Router, React 19, TypeScript strict)
- **Tailwind v4** — CSS-first tokens via `@theme` in `app/globals.css`
- **GSAP 3 + Motion** — hybrid animation layer (added in P2)
- **Sanity CMS** — vendors, events, hero, site copy (added in P3)
- **Mapbox GL JS** — custom Olive/Green-Glass style (P5)
- **Biome** — lint + format
- **Vitest + Playwright + @axe-core/playwright** — unit + e2e + a11y

## Scripts

```bash
pnpm dev        # local dev
pnpm build      # production build
pnpm typecheck  # tsc --noEmit
pnpm lint       # biome check .
pnpm lint:fix   # biome check --write .
pnpm format     # biome format --write .
pnpm test       # vitest (added in P2)
pnpm test:e2e   # playwright (added in P7)
```

## Repository layout

```
app/                Next.js App Router
features/           Section features (hero, vendors, events, ...)
design-system/      Tokens, typography, primitives, brand icons
motion/             Scroll + component motion primitives and timelines
lib/                Sanity client, env, Mapbox, IG, validation
sanity/schemas/     CMS document schemas
public/             Static assets (logos, fonts, renders)
ASSETS/             Source-of-truth brand briefs and imagery (not deployed)
tests/              Playwright + axe specs
```

## Phase status

- [x] **P0** — Foundation (Next.js + Tailwind v4 tokens + Biome + TS strict + env schema)
- [ ] **P1** — Design system (logo SVGs, nav/footer shells, primitives in Storybook)
- [ ] **P2** — Motion foundation (`useMotionPreference`, ScrollTrigger helpers, primitives)
- [ ] **P3** — Sanity CMS (schemas + Studio at `/studio`)
- [ ] **P4** — Section scaffolding (all 9 sections, real copy, basic reveals)
- [ ] **P5** — Signature motion (hero displacement, vendors pinned, section color morph, ...)
- [ ] **P6** — Integrations (booking → Resend, IG token cron, Mapbox style)
- [ ] **P7** — A11y / perf / QA (Lighthouse ≥95 mobile)
- [ ] **P8** — Launch

## Environment

Copy `.env.example` to `.env.local` and fill values as integrations come online.
