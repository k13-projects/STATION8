"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * SectionNav — the link row from the STATION8 brief.
 *
 * Behavior:
 *  - Starts in document flow immediately below the hero.
 *  - Uses CSS `position: sticky` to pin at `top: 80px` (flush under the global
 *    top nav) the instant it touches that offset during a scroll — works
 *    reliably whether the user scrolls the wheel, flings, drags the
 *    scrollbar, or triggers an anchor jump.
 *  - A scroll listener toggles a "stuck" class that fades in a soft drop
 *    shadow and slightly darkens the bar, so the pin moment reads visually.
 *
 * Why sticky over IntersectionObserver: zero-height sentinels are a
 * knife-edge case for IO and miss fast scrolls / anchor jumps — which is
 * exactly the bug the stakeholder flagged.
 */

const LINKS = [
  { label: "WHO WE ARE", href: "#who-we-are" },
  { label: "OUR VENDORS", href: "#vendors" },
  { label: "EVENTS", href: "#events" },
  { label: "BOOKINGS", href: "#bookings" },
  { label: "VISIT US", href: "#visit-us" },
  { label: "CONTACT", href: "#contact" },
];

/**
 * Top-nav height so the sticky bar parks flush under it.
 * Matches the mobile/desktop nav heights in `features/nav/Nav.tsx`.
 */
const TOP_NAV_HEIGHT_MOBILE = 88;
const TOP_NAV_HEIGHT_DESKTOP = 112;

export function SectionNav() {
  const barRef = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const navHeight = () =>
      window.matchMedia("(min-width: 768px)").matches
        ? TOP_NAV_HEIGHT_DESKTOP
        : TOP_NAV_HEIGHT_MOBILE;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        // Allow 1px tolerance for subpixel rendering.
        setStuck(rect.top <= navHeight() + 1);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={barRef}
      data-stuck={stuck ? "true" : "false"}
      className="sticky top-[88px] md:top-[112px] z-40 bg-[color:var(--color-olive)] text-[color:var(--color-sand-stone)] transition-shadow duration-[var(--duration-base)] ease-[var(--ease-precise)] data-[stuck=true]:shadow-[0_6px_24px_rgba(0,0,0,0.22)]"
    >
      <div className="relative text-[color:var(--color-sand-stone)]">
        <PatternTint />
      </div>
      <nav
        className="relative mx-auto flex h-16 max-w-[1600px] items-center justify-center px-6 md:px-12"
        aria-label="Sections"
      >
        <ul className="flex items-center gap-6 overflow-x-auto whitespace-nowrap md:gap-10">
          {LINKS.map((l, i) => (
            <li key={l.href} className="flex items-center gap-6 md:gap-10">
              <Link
                href={l.href}
                className="mono-caption text-[length:var(--text-mono-label)] text-[color:var(--color-sand-stone)] hover:text-white transition-colors"
              >
                {l.label}
              </Link>
              {i < LINKS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="h-4 w-px bg-[color:var(--color-sand-stone)]/30"
                />
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

function PatternTint() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none opacity-[0.08]"
      style={{
        backgroundColor: "currentColor",
        WebkitMaskImage: "url(/brand/pattern-circles.png)",
        maskImage: "url(/brand/pattern-circles.png)",
        WebkitMaskRepeat: "repeat",
        maskRepeat: "repeat",
        WebkitMaskSize: "220px auto",
        maskSize: "220px auto",
      }}
    />
  );
}
