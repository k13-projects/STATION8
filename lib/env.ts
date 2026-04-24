import { z } from "zod";

/**
 * Server-only environment schema.
 * Populated incrementally as integrations come online (Sanity/Resend/Mapbox/IG/Sentry).
 * `.optional()` during P0 so the dev server boots with an empty .env.local.
 */
const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

  // Sanity (P3)
  SANITY_PROJECT_ID: z.string().min(1).optional(),
  SANITY_DATASET: z.string().min(1).optional(),
  SANITY_API_READ_TOKEN: z.string().min(1).optional(),
  SANITY_API_WRITE_TOKEN: z.string().min(1).optional(),

  // Resend + Turnstile (P6)
  RESEND_API_KEY: z.string().min(1).optional(),
  TURNSTILE_SECRET_KEY: z.string().min(1).optional(),
  BOOKING_INBOX: z.string().email().optional(),

  // Instagram Graph API (P6)
  INSTAGRAM_ACCESS_TOKEN: z.string().min(1).optional(),
  INSTAGRAM_USER_ID: z.string().min(1).optional(),

  // Sentry (P0, optional until DSN provisioned)
  SENTRY_DSN: z.string().url().optional(),
  SENTRY_AUTH_TOKEN: z.string().min(1).optional(),
});

const clientSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  NEXT_PUBLIC_MAPBOX_TOKEN: z.string().min(1).optional(),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
});

function parse<T extends z.ZodTypeAny>(schema: T, source: Record<string, unknown>): z.infer<T> {
  const parsed = schema.safeParse(source);
  if (!parsed.success) {
    console.error("❌ Invalid environment variables:", parsed.error.format());
    throw new Error("Invalid environment variables");
  }
  return parsed.data;
}

export const serverEnv =
  typeof window === "undefined"
    ? parse(serverSchema, process.env)
    : ({} as z.infer<typeof serverSchema>);

export const clientEnv = parse(clientSchema, {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
});
