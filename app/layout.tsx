import type { Metadata, Viewport } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
