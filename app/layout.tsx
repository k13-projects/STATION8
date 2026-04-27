import type { Metadata, Viewport } from "next";
import { Big_Shoulders_Stencil, Inter, JetBrains_Mono } from "next/font/google";
import { MotionPreferenceProvider } from "@/motion/MotionPreferenceProvider";
import { SectionColorMorph } from "@/motion/SectionColorMorph";
import "./globals.css";

/**
 * Fallback web fonts — live until Nitti + Industry Inc licenses clear.
 * next/font self-hosts and generates size-adjust metrics for zero CLS.
 * Variables are consumed by @theme tokens in globals.css.
 */
const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans-loaded",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-loaded",
  display: "swap",
  weight: ["400", "500", "700"],
});

const fontDisplay = Big_Shoulders_Stencil({
  subsets: ["latin"],
  variable: "--font-display-loaded",
  display: "swap",
  weight: ["500", "700", "900"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "STATION8 — Where Global is Local",
    template: "%s · STATION8",
  },
  description:
    "STATION8 Public Market — the premier San Diego restaurant collective at UC San Diego's Theater District in La Jolla. Chef-driven menus, global cuisines, one iconic food hall.",
  applicationName: "STATION8 Public Market",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    "food hall",
    "La Jolla",
    "UCSD",
    "Theater District",
    "restaurant collective",
    "public market",
  ],
  authors: [{ name: "Landmark Food Halls" }],
  creator: "Landmark Food Halls",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "STATION8 Public Market",
    title: "STATION8 — Where Global is Local",
    description: "Cuisine from Around the World. Around the Corner.",
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  // No maximumScale / userScalable cap — WCAG 1.4.4 / 508 require zoom support.
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#DDCBA4" },
    { media: "(prefers-color-scheme: dark)", color: "#31261D" },
  ],
};

/**
 * LocalBusiness / Restaurant JSON-LD for rich results.
 * Address, phone, geo are placeholders — see DECISIONS_NEEDED.md D-6.
 * Vendor list is hand-mirrored from features/vendors/vendors.ts; if that file
 * grows materially, swap this block to import + map at build time.
 */
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "STATION8 Public Market",
  description:
    "STATION8 Public Market — the premier San Diego restaurant collective at UC San Diego's Theater District in La Jolla. Chef-driven menus, global cuisines, one iconic food hall.",
  url: SITE_URL,
  servesCuisine: [
    "Detroit-style pizza",
    "Modern Mexican",
    "Coastal seafood",
    "Latin American",
    "Japanese ramen",
    "American burgers",
    "Hawaiian poke",
  ],
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "[Street Address]",
    addressLocality: "La Jolla",
    addressRegion: "CA",
    postalCode: "92037",
    addressCountry: "US",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "07:00",
      closes: "21:00",
    },
  ],
  areaServed: { "@type": "City", name: "La Jolla" },
  parentOrganization: {
    "@type": "Organization",
    name: "Landmark Food Halls",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontMono.variable} ${fontDisplay.variable}`}>
      <head>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON.stringify of a server-side object literal — no untrusted input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      {/* suppressHydrationWarning silences the false hydration diff caused by
          browser extensions (Grammarly, LastPass, etc.) that inject attributes
          onto <body> after SSR. It applies only to this element — real app
          hydration mismatches elsewhere still surface normally. */}
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <MotionPreferenceProvider>
          <SectionColorMorph />
          {children}
        </MotionPreferenceProvider>
      </body>
    </html>
  );
}
