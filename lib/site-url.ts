/**
 * The site's own absolute URL, for canonical tags, Open Graph, JSON-LD and the
 * sitemap.
 *
 * Why this exists (2026-09-17). Three files each carried
 * `process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"`, and
 * `NEXT_PUBLIC_SITE_URL` was never set on the station-8 Vercel project. So the
 * live site shipped `<link rel="canonical" href="http://localhost:3000">` and a
 * JSON-LD `url` to match: the page was telling Google that the real version of
 * itself is a machine nobody can reach. That is worse than a missing canonical,
 * and nothing on the page looked wrong, which is why it survived a launch.
 *
 * The fix is not another env var to remember. A production build now resolves
 * its own host, in this order:
 *
 *   1. `NEXT_PUBLIC_SITE_URL`, if set. Still the override, for a rename or a
 *      staging host that must self-canonicalise.
 *   2. A Vercel production build: the real domain, below. www, not the apex:
 *      the apex 307s to www, and a canonical that redirects is a canonical
 *      pointing somewhere else.
 *   3. A Vercel preview build: its own deployment URL, so previews describe
 *      themselves. `app/robots.ts` keeps previews out of the index anyway.
 *   4. Local development: the project's own dev port.
 *
 * The only way back to a localhost canonical in production is to set
 * `NEXT_PUBLIC_SITE_URL` to one deliberately.
 */

/** The live address. Changing this is a rename, not configuration. */
export const PRODUCTION_URL = "https://www.station8publicmarket.com";

function resolve(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  if (process.env.VERCEL_ENV === "production") return PRODUCTION_URL;

  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  // A production `next build` run anywhere else, e.g. a local smoke test of the
  // built site: still not localhost, because the output of a production build
  // is the thing that gets deployed and a stale localhost canonical is exactly
  // the bug this file exists to prevent.
  if (process.env.NODE_ENV === "production") return PRODUCTION_URL;

  return "http://localhost:9132";
}

export const SITE_URL = resolve();
