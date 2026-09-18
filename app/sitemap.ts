import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

/**
 * Sitemap generator. Static for now — when /events, vendor detail pages, or
 * other dynamic routes land (P3+), enumerate them here from the Sanity client.
 *
 * The host comes from `lib/site-url.ts`, which resolves it per environment
 * rather than falling back to localhost. See DECISIONS_NEEDED.md D-8.
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/cookies`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    {
      url: `${SITE_URL}/accessibility`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}
