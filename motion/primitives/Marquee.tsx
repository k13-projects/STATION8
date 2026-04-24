"use client";

import type { ReactNode } from "react";
import { useMotionPreference } from "@/motion/MotionPreferenceProvider";

/**
 * Marquee — infinite horizontal ticker. Duplicates the slot so there's always
 * content on screen. Speed is measured in seconds-per-loop, not px-per-second —
 * that keeps the cadence stable regardless of content width.
 *
 * Reduced motion renders a static single-pass row (no animation).
 */

type MarqueeProps = {
  children: ReactNode;
  /** Seconds per full loop (default 40) — higher is slower. */
  duration?: number;
  /** Direction: left or right */
  direction?: "left" | "right";
  /** Pause when the cursor hovers over it. */
  pauseOnHover?: boolean;
  className?: string;
};

export function Marquee({
  children,
  duration = 40,
  direction = "left",
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  const { shouldReduce } = useMotionPreference();

  if (shouldReduce) {
    return (
      <div className={`relative w-full overflow-hidden ${className ?? ""}`} aria-hidden="true">
        <div className="flex items-center whitespace-nowrap">{children}</div>
      </div>
    );
  }

  return (
    <div
      className={`marquee-root group relative w-full overflow-hidden ${className ?? ""}`}
      aria-hidden="true"
    >
      <div
        className="marquee-track flex shrink-0 items-center gap-16 whitespace-nowrap pr-16"
        style={{
          animation: `marquee-${direction} ${duration}s linear infinite`,
          animationPlayState: "running",
        }}
      >
        {children}
      </div>
      <div
        className="marquee-track flex shrink-0 items-center gap-16 whitespace-nowrap pr-16"
        aria-hidden="true"
        style={{
          animation: `marquee-${direction} ${duration}s linear infinite`,
          animationPlayState: "running",
        }}
      >
        {children}
      </div>
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
        .marquee-root { display: flex; }
        ${
          pauseOnHover ? ".marquee-root:hover .marquee-track { animation-play-state: paused; }" : ""
        }
      `}</style>
    </div>
  );
}
