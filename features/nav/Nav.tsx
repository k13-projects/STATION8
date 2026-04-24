"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Lockup } from "@/design-system/icons/Lockup";

/**
 * Top nav — mirrors the STATION8 brief:
 *  - Centered STATION8 lockup on a dark translucent bar
 *  - Hamburger on the right opens a full-screen menu overlay
 *
 * The separate link row (WHO WE ARE · OUR VENDORS · …) lives in `SectionNav`,
 * which sits below the hero on load and sticks to the top once scrolled past.
 */

const LINKS = [
  { label: "WHO WE ARE", href: "#who-we-are" },
  { label: "OUR VENDORS", href: "#vendors" },
  { label: "EVENTS", href: "#events" },
  { label: "BOOKINGS", href: "#bookings" },
  { label: "VISIT US", href: "#visit-us" },
  { label: "CONTACT", href: "#contact" },
];

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [mobileOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[color:var(--color-olive)]/85 backdrop-blur">
      <nav
        className="relative mx-auto flex h-20 max-w-[1600px] items-center justify-center px-6 md:px-12"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="block text-[color:var(--color-sand-stone)] hover:text-white transition-colors"
          aria-label="STATION8 Public Market home"
        >
          <Lockup tone="light" width={200} priority />
        </Link>

        <button
          type="button"
          className="absolute right-6 md:right-12 flex flex-col gap-1.5 text-[color:var(--color-sand-stone)]"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="global-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block h-[2px] w-7 bg-current transition-transform duration-[var(--duration-base)] ${
              mobileOpen ? "translate-y-[8px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-7 bg-current transition-opacity duration-[var(--duration-base)] ${
              mobileOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-[2px] w-7 bg-current transition-transform duration-[var(--duration-base)] ${
              mobileOpen ? "-translate-y-[8px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Overlay menu */}
      <div
        id="global-menu"
        className={`overflow-hidden transition-[max-height] duration-[var(--duration-slow)] ease-[var(--ease-unhurried)] ${
          mobileOpen ? "max-h-[100svh]" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-4 px-6 pb-10 pt-6 md:px-12">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block font-[family-name:var(--font-display)] text-[length:var(--text-h1)] uppercase tracking-wide text-[color:var(--color-sand-stone)] hover:text-white"
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
