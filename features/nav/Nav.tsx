"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PSMBadge } from "@/design-system/icons/PSMBadge";
import { MonoCaption } from "@/design-system/primitives/Typography";

/**
 * Top navigation shell.
 *
 * Behavior in P1:
 *  - Sticky on scroll
 *  - Transparent at top, Dark Bark once the user scrolls past 80px
 *  - Mobile: hamburger toggles a full-screen overlay
 *
 * Scroll-direction hide/show arrives in P2 once the motion system is live.
 */

const LINKS = [
  { label: "Who We Are", href: "#who-we-are" },
  { label: "Our Vendors", href: "#vendors" },
  { label: "Events", href: "#events" },
  { label: "Bookings", href: "#bookings" },
  { label: "Visit Us", href: "#visit-us" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile overlay is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-[var(--duration-base)] ease-[var(--ease-unhurried)] ${
        scrolled || mobileOpen
          ? "bg-[color:var(--color-dark-bark)]/95 backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 md:px-12"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="flex items-center gap-3 text-[color:var(--color-sand-stone)] hover:text-white transition-colors"
          aria-label="Station 8 Public Market home"
        >
          <PSMBadge size={36} />
          <MonoCaption className="hidden sm:inline-block pt-0.5">Station 8</MonoCaption>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="mono-caption text-[color:var(--color-sand-stone)] hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="md:hidden text-[color:var(--color-sand-stone)] mono-caption"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        id="mobile-nav"
        className={`md:hidden overflow-hidden transition-[max-height] duration-[var(--duration-base)] ease-[var(--ease-unhurried)] ${
          mobileOpen ? "max-h-[100svh]" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-6 px-6 pb-10 pt-4">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block font-[family-name:var(--font-display)] text-[length:var(--text-h1)] leading-tight text-[color:var(--color-sand-stone)] hover:text-white"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
