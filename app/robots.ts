import type { MetadataRoute } from "next";

/**
 * robots.txt generator. Indexable in production only; previews are
 * disallowed so Vercel preview URLs don't pollute search results.
 *
 * `NEXT_PUBLIC_SITE_URL` must be set per-environment for the sitemap
 * URL to point at the right host. See DECISIONS_NEEDED.md D-8.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const IS_PROD = process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production";

export default function robots(): MetadataRoute.Robots {
  if (!IS_PROD) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
