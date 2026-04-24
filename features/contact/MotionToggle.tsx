"use client";

import { useMotionPreference } from "@/motion/MotionPreferenceProvider";

/**
 * Footer control that lets visitors override the site's motion.
 * Cycles through system → reduce → full. The choice persists across sessions.
 */

const LABELS = {
  system: "Motion · follows system",
  reduce: "Motion · reduced",
  full: "Motion · full",
} as const;

const HINTS = {
  system: "Using your device's accessibility setting",
  reduce: "Animations minimised",
  full: "All animations enabled",
} as const;

export function MotionToggle() {
  const { toggle, cycleToggle } = useMotionPreference();
  return (
    <button
      type="button"
      onClick={cycleToggle}
      className="mono-caption text-[color:var(--color-sand-stone)]/60 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-sand-stone)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-dark-bark)]"
      aria-label={`Motion preference: ${LABELS[toggle]}. ${HINTS[toggle]}. Click to cycle.`}
      title={HINTS[toggle]}
    >
      {LABELS[toggle]}
    </button>
  );
}
