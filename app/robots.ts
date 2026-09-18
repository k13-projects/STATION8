import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

/**
 * robots.txt generator. Indexable in production only; previews are
 * disallowed so Vercel preview URLs don't pollute search results.
 *
 * The host comes from `lib/site-url.ts`, which resolves it per environment
 * rather than falling back to localhost. See DECISIONS_NEEDED.md D-8.
 */

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
