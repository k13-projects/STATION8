"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * SectionNav — the link row from the STATION8 brief.
 *
 * Initial state: sits in document flow, just below the hero.
 * Scrolled past the hero: smoothly sticks to the top of the viewport (below
 * the global top nav) and stays there for the rest of the page.
 *
 * Uses an IntersectionObserver on a sentinel at the element's natural top
 * edge. When the sentinel leaves the viewport upward, the bar becomes
 * position: fixed and fades into its sticky state over the motion base
 * duration — no layout-shift flicker.
 */

const LINKS = [
  { label: "WHO WE ARE", href: "#who-we-are" },
  { label: "OUR VENDORS", href: "#vendors" },
  { label: "EVENTS", href: "#events" },
  { label: "BOOKINGS", href: "#bookings" },
  { label: "VISIT US", href: "#visit-us" },
  { label: "CONTACT", href: "#contact" },
];

/** Top-nav height so the sticky state sits flush under it. */
const TOP_NAV_HEIGHT = 80;

export function SectionNav() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        // When the sentinel goes above the viewport, stick the bar
        setStuck(entry.boundingClientRect.top < 0);
      },
      // Fire as soon as the sentinel reaches the top of the viewport, offset
      // by the top-nav height so transitions chain cleanly.
      { rootMargin: `-${TOP_NAV_HEIGHT}px 0px 0px 0px`, threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* Sentinel — detects when the bar's natural position crosses the viewport top */}
      <div ref={sentinelRef} aria-hidden="true" className="h-0" />

      {/* Placeholder keeps the document flow correct when the bar goes fixed */}
      <div className="relative h-16">
        <div
          className={`${
            stuck
              ? "fixed left-0 right-0 shadow-[0_4px_20px_rgba(0,0,0,0.18)]"
              : "absolute inset-x-0"
          } z-40 bg-[color:var(--color-olive)] text-[color:var(--color-sand-stone)] transition-[top,box-shadow] duration-[var(--duration-base)] ease-[var(--ease-precise)]`}
          style={{ top: stuck ? TOP_NAV_HEIGHT : 0 }}
        >
          <div className="relative text-[color:var(--color-sand-stone)]">
            <PatternTint />
          </div>
          <nav
            className="relative mx-auto flex h-16 max-w-[1600px] items-center justify-center px-6 md:px-12"
            aria-label="Sections"
          >
            <ul className="flex items-center gap-6 md:gap-10 overflow-x-auto whitespace-nowrap">
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
      </div>
    </>
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
