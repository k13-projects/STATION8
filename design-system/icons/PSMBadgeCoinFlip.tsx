"use client";

import { motion } from "motion/react";
import Image from "next/image";
import type { CSSProperties } from "react";
import { useMotionPreference } from "@/motion/MotionPreferenceProvider";

/**
 * PSM Badge with a recurring coin-flip — a full 360° rotation around the
 * vertical axis every `intervalMs`. Built for vendor "Arriving Soon" tiles so
 * the empty slots feel alive without begging for attention.
 *
 * The flip uses a smooth in-out ease so the coin starts slow, accelerates
 * through the edge, and settles softly — not a hard stop. A tiny mid-flip
 * scale lift (~4.5%) sells the coin as a weighted object catching the light
 * instead of a decal spinning in place. A two-face setup keeps the logo
 * legible throughout the spin (the back face is pre-mirrored so the monogram
 * never reads inverted).
 */

type Props = {
  size?: number;
  className?: string;
  tone?: "light" | "dark";
  title?: string;
  decorative?: boolean;
  /** Full cycle length — flip + rest — in ms. */
  intervalMs?: number;
  /** Delay before the first flip so the page can settle. */
  initialDelayMs?: number;
};

const FLIP_DURATION_S = 1.15;
// In-out quartic-ish — slow edges, quick middle, smooth landing.
const FLIP_EASE: [number, number, number, number] = [0.65, 0.02, 0.35, 1];
const LIFT_EASE: [number, number, number, number] = [0.4, 0, 0.6, 1];

export function PSMBadgeCoinFlip({
  size = 68,
  className,
  tone = "light",
  title = "STATION8 Public Market",
  decorative = false,
  intervalMs = 3000,
  initialDelayMs = 500,
}: Props) {
  const { shouldReduce } = useMotionPreference();
  const src = tone === "light" ? "/brand/psm-badge-white.png" : "/brand/psm-badge.png";

  const faceStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    width: size,
    height: size,
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
  };

  const repeatDelay = Math.max(0, intervalMs / 1000 - FLIP_DURATION_S);
  const initialDelayS = initialDelayMs / 1000;

  return (
    <span
      className={className}
      role={decorative ? "presentation" : "img"}
      aria-label={decorative ? undefined : title}
      style={{
        display: "inline-block",
        width: size,
        height: size,
        perspective: 900,
      }}
    >
      <motion.span
        initial={{ rotateY: 0, scale: 1 }}
        animate={
          shouldReduce ? { rotateY: 0, scale: 1 } : { rotateY: [0, 360], scale: [1, 1.045, 1] }
        }
        transition={
          shouldReduce
            ? { duration: 0 }
            : {
                rotateY: {
                  duration: FLIP_DURATION_S,
                  ease: FLIP_EASE,
                  delay: initialDelayS,
                  repeat: Infinity,
                  repeatDelay,
                },
                scale: {
                  duration: FLIP_DURATION_S,
                  ease: LIFT_EASE,
                  times: [0, 0.5, 1],
                  delay: initialDelayS,
                  repeat: Infinity,
                  repeatDelay,
                },
              }
        }
        style={{
          position: "relative",
          display: "block",
          width: size,
          height: size,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <Image
          src={src}
          alt=""
          aria-hidden
          width={size * 2}
          height={size * 2}
          style={faceStyle}
          priority
        />
        {/* Back face — rotated 180° with scaleX(-1) so the monogram reads right-
            side up as the coin passes through the back half of its spin. */}
        <Image
          src={src}
          alt=""
          aria-hidden
          width={size * 2}
          height={size * 2}
          style={{
            ...faceStyle,
            transform: "rotateY(180deg) scaleX(-1)",
          }}
          priority
        />
      </motion.span>
    </span>
  );
}
