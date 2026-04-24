import type { Metadata, Viewport } from "next";
import { Big_Shoulders_Stencil, Inter, JetBrains_Mono } from "next/font/google";
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

export const metadata: Metadata = {
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
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "STATION8 Public Market",
    title: "STATION8 — Where Global is Local",
    description: "Cuisine from Around the World. Around the Corner.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#DDCBA4" },
    { media: "(prefers-color-scheme: dark)", color: "#31261D" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontMono.variable} ${fontDisplay.variable}`}>
      <body>{children}</body>
    </html>
  );
}
