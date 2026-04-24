"use client";

import { motion } from "motion/react";
import { useMotionPreference } from "@/motion/MotionPreferenceProvider";

/**
 * Animated PSM Badge — the same geometry as the static PSMBadge, rebuilt with
 * motion's path animations so the rings, crosshair rails, and S monogram draw
 * themselves in on mount. Used as the nav logo and the hero badge so the first
 * paint feels like a brand mark being struck, not loaded.
 *
 * Reduced motion: the paths render immediately at their final state.
 */

type Props = {
  size?: number | string;
  className?: string;
  title?: string;
  decorative?: boolean;
  /** Delay before the draw-in begins. */
  delay?: number;
};

const DRAW_DURATION = 1.2;
const EASE: [number, number, number, number] = [0.2, 0.9, 0.1, 1];

export function PSMBadgeAnimated({
  size = 64,
  className,
  title = "Station 8 Public Market",
  decorative = false,
  delay = 0,
}: Props) {
  const { shouldReduce } = useMotionPreference();

  const a11y = decorative
    ? { "aria-hidden": true as const, role: "presentation" }
    : { role: "img" as const, "aria-label": title };

  const strokeIn = (at: number) =>
    shouldReduce
      ? { pathLength: 1, opacity: 1 }
      : {
          pathLength: 1,
          opacity: 1,
          transition: { duration: DRAW_DURATION, delay: delay + at, ease: EASE },
        };

  return (
    <motion.svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={shouldReduce ? undefined : { opacity: 0 }}
      animate={shouldReduce ? undefined : { opacity: 1 }}
      transition={{ duration: 0.4, delay }}
      {...a11y}
    >
      <title>{title}</title>

      {/* Outer + inner rings draw first */}
      <motion.circle
        cx="100"
        cy="100"
        r="94"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={strokeIn(0)}
      />
      <motion.circle
        cx="100"
        cy="100"
        r="86"
        strokeWidth={0.9}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={strokeIn(0.1)}
      />

      {/* Crosshair rails extend outward from the rings */}
      <motion.line
        x1="6"
        y1="100"
        x2="42"
        y2="100"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={strokeIn(0.35)}
      />
      <motion.line
        x1="158"
        y1="100"
        x2="194"
        y2="100"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={strokeIn(0.35)}
      />
      <motion.line
        x1="100"
        y1="6"
        x2="100"
        y2="42"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={strokeIn(0.4)}
      />
      <motion.line
        x1="100"
        y1="158"
        x2="100"
        y2="194"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={strokeIn(0.4)}
      />

      {/* P / M letters fade in after the rails land */}
      <motion.g
        strokeWidth={0.9}
        initial={shouldReduce ? undefined : { opacity: 0 }}
        animate={shouldReduce ? undefined : { opacity: 1 }}
        transition={{ duration: 0.4, delay: delay + 0.9, ease: EASE }}
      >
        <text
          x="26"
          y="103"
          fontSize="11"
          fontWeight={700}
          fill="currentColor"
          stroke="none"
          textAnchor="middle"
        >
          P
        </text>
        <text
          x="174"
          y="103"
          fontSize="11"
          fontWeight={700}
          fill="currentColor"
          stroke="none"
          textAnchor="middle"
        >
          M
        </text>
      </motion.g>

      {/* S monogram strokes draw last */}
      <g strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
        <motion.path
          d="M 128 66 C 128 54 118 46 106 46 L 78 46 C 66 46 58 54 58 66 C 58 78 66 86 78 86 L 122 86 C 134 86 142 94 142 106 C 142 118 134 126 122 126 L 78 126"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={strokeIn(0.5)}
        />
        <motion.path
          d="M 122 76 L 82 76 M 118 116 L 94 116"
          strokeWidth={2.2}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={strokeIn(0.8)}
        />
        <motion.path
          d="M 72 134 C 72 146 82 154 94 154 L 122 154 C 134 154 142 146 142 134"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={strokeIn(0.7)}
        />
      </g>
    </motion.svg>
  );
}
