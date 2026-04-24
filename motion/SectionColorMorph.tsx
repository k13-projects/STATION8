"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { useMotionPreference } from "@/motion/MotionPreferenceProvider";
import { gsap, registerScrollTrigger } from "@/motion/scroll-trigger";

/**
 * SectionColorMorph — watches elements tagged with `data-section-bg="<color-token>"`
 * and tweens the document's root background color as each one scrolls past the
 * midline of the viewport. This gives the whole page one continuous color
 * river (Dark Bark → Sand Stone → Olive → Dark Bark → …) without per-section
 * hard cuts.
 *
 * Tag sections with a CSS variable token name, e.g.
 *     <section data-section-bg="--color-olive">…</section>
 *
 * Reduced motion: no scroll subscription; section bg colors are left as
 * whatever their own CSS declares.
 */

export function SectionColorMorph() {
  const { shouldReduce } = useMotionPreference();
  const lastColor = useRef<string | null>(null);

  // Use layoutEffect on client so the initial color is correct before paint
  const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

  useIsoLayoutEffect(() => {
    if (shouldReduce) return;
    const ScrollTrigger = registerScrollTrigger();

    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section-bg]"));
    if (sections.length === 0) return;

    const resolve = (token: string) => {
      const v = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
      return v || token;
    };

    const triggers = sections.map((el) => {
      const token = el.dataset.sectionBg ?? "--color-dark-bark";
      return ScrollTrigger.create({
        trigger: el,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) {
            const color = resolve(token);
            if (lastColor.current === color) return;
            lastColor.current = color;
            gsap.to(document.documentElement, {
              backgroundColor: color,
              duration: 0.9,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        },
      });
    });

    // Seed with the first active section's color on mount
    const firstActive = triggers.find((t) => t.isActive);
    if (firstActive) {
      const el = firstActive.trigger as HTMLElement;
      const token = el.dataset.sectionBg ?? "--color-dark-bark";
      document.documentElement.style.backgroundColor = resolve(token);
      lastColor.current = resolve(token);
    }

    return () => {
      for (const t of triggers) t.kill();
    };
  }, [shouldReduce]);

  return null;
}
