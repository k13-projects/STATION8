"use client";

import { type HTMLMotionProps, motion, useInView } from "motion/react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { useMotionPreference } from "@/motion/MotionPreferenceProvider";

/**
 * Reveal — fades and lifts content into view the first time it crosses the
 * viewport. Uses motion's IntersectionObserver via useInView. Respects reduced
 * motion: skips translation, keeps a gentle opacity fade.
 *
 * Place on any block element. Default delay 0; stagger siblings by passing
 * incremental `delay` values.
 */

// Safety net: if useInView hasn't reported inView within this window after
// mount, fade content in anyway. Guards against observer-never-fires bugs
// (chunk load races, hydration hiccups, viewport math edge cases) that would
// otherwise leave the entire page stuck at opacity:0.
const FALLBACK_MS = 700;

type RevealProps = {
  children: ReactNode;
  as?: "div" | "section" | "article" | "header" | "footer" | "li" | "p" | "span";
  delay?: number;
  /** Distance in px the content travels up while fading in. */
  distance?: number;
  /** Start the tween when this % of the element is visible (0-1). */
  amount?: number;
  /** If true, re-triggers every time element enters view. */
  repeat?: boolean;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "initial" | "animate" | "transition" | "children">;

export function Reveal({
  children,
  as = "div",
  delay = 0,
  distance = 32,
  amount = 0.2,
  repeat = false,
  className,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount, once: !repeat });
  const { shouldReduce } = useMotionPreference();
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setFallback(true), FALLBACK_MS);
    return () => clearTimeout(t);
  }, []);

  const visible = inView || fallback;

  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      ref={ref}
      initial={{ opacity: 0, y: shouldReduce ? 0 : distance }}
      animate={visible ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: shouldReduce ? 0.2 : 0.8,
        delay,
        ease: [0.2, 0.9, 0.1, 1], // --ease-precise
      }}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}
