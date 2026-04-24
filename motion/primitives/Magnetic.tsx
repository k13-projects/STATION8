"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { type ReactNode, useCallback, useRef } from "react";
import { useMotionPreference } from "@/motion/MotionPreferenceProvider";

/**
 * Magnetic — the child element attracts the cursor within a radius.
 * Used sparingly on the single primary CTA (Bookings "Get in Touch") so the
 * effect remains special. Reduced motion disables entirely.
 *
 * The child receives pointer events; wrap a <button>, <a>, or similar.
 */

type MagneticProps = {
  children: ReactNode;
  /** Activation radius in px. */
  radius?: number;
  /** Maximum translation in px. */
  strength?: number;
  className?: string;
};

export function Magnetic({ children, radius = 80, strength = 12, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { shouldReduce } = useMotionPreference();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springConfig = { stiffness: 260, damping: 22, mass: 0.4 };
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);
  const tx = useTransform(x, (v) => `${v}px`);
  const ty = useTransform(y, (v) => `${v}px`);

  const handleMove = useCallback(
    (e: React.PointerEvent<HTMLSpanElement>) => {
      if (shouldReduce || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > radius) {
        rawX.set(0);
        rawY.set(0);
        return;
      }
      const pull = Math.min(1, 1 - dist / radius);
      rawX.set((dx / radius) * strength * pull);
      rawY.set((dy / radius) * strength * pull);
    },
    [shouldReduce, radius, strength, rawX, rawY],
  );

  const reset = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  if (shouldReduce) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onPointerDown={reset}
      className={`inline-block ${className ?? ""}`}
      style={{ willChange: "transform" }}
    >
      <motion.span style={{ display: "inline-block", x: tx, y: ty }}>{children}</motion.span>
    </span>
  );
}
