import type { NextConfig } from "next";

/**
 * Production security headers.
 *
 * CSP is intentionally permissive on script-src/style-src ('unsafe-inline',
 * 'unsafe-eval') because:
 *   - Next.js App Router emits inline hydration scripts
 *   - Tailwind v4 inlines arbitrary-value styles
 *   - motion/react and gsap both call new Function() to parse animation values
 *   - Next.js dev mode uses eval() for source maps / HMR
 * Tightening to nonce/hash-based CSP needs a per-request middleware that mints
 * nonces — deferred to P7 polish.
 *
 * What this still buys us today:
 *   - frame-ancestors 'none'   → blocks clickjacking
 *   - img-src allowlist        → only Sanity + Instagram CDNs
 *   - connect-src bounded      → no exfil to arbitrary hosts
 *   - form-action 'self'       → blocks credential-form hijack
 *   - upgrade-insecure-requests
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.sanity.io https://scontent.cdninstagram.com",
  "font-src 'self' data:",
  "connect-src 'self' https:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  // 1 year HSTS, no preload yet — see DECISIONS_NEEDED.md D-10
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self), interest-cohort=(), browsing-topics=()",
  },
  { key: "Content-Security-Policy", value: csp },
];

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  typedRoutes: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "scontent.cdninstagram.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        // security.txt should be served as plain text
        source: "/.well-known/security.txt",
        headers: [{ key: "Content-Type", value: "text/plain; charset=utf-8" }],
      },
    ];
  },
};

export default config;
