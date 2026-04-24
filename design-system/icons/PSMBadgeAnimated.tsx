"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useMotionPreference } from "@/motion/MotionPreferenceProvider";

/**
 * Animated PSM Badge — the real brand mark with a compass-lock entrance.
 * On mount the badge fades in while rotating from −8° to 0° with a subtle
 * scale lift, so the first paint feels like a needle finding north.
 *
 * Reduced motion: the badge simply fades in at its final state.
 */

type Props = {
  size?: number;
  className?: string;
  title?: string;
  tone?: "light" | "dark";
  decorative?: boolean;
  /** Delay before the entrance starts. */
  delay?: number;
};

const EASE: [number, number, number, number] = [0.2, 0.9, 0.1, 1];

export function PSMBadgeAnimated({
  size = 64,
  className,
  title = "STATION8 Public Market",
  tone = "light",
  decorative = false,
  delay = 0,
}: Props) {
  const { shouldReduce } = useMotionPreference();
  const src = tone === "light" ? "/brand/psm-badge-white.png" : "/brand/psm-badge.png";

  if (shouldReduce) {
    return (
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay }}
        className={`inline-block ${className ?? ""}`}
        style={{ width: size, height: size }}
      >
        <Image
          src={src}
          alt={decorative ? "" : title}
          width={size * 2}
          height={size * 2}
          aria-hidden={decorative ? true : undefined}
          style={{ width: size, height: size }}
          priority
        />
      </motion.span>
    );
  }

  return (
    <motion.span
      initial={{ opacity: 0, rotate: -8, scale: 0.96 }}
      animate={{ opacity: 1, rotate: 0, scale: 1 }}
      transition={{
        duration: 1.4,
        delay,
        ease: EASE,
        opacity: { duration: 0.6, delay },
      }}
      className={`inline-block ${className ?? ""}`}
      style={{ width: size, height: size, transformOrigin: "center" }}
    >
      <Image
        src={src}
        alt={decorative ? "" : title}
        width={size * 2}
        height={size * 2}
        aria-hidden={decorative ? true : undefined}
        style={{ width: size, height: size }}
        priority
      />
    </motion.span>
  );
}
