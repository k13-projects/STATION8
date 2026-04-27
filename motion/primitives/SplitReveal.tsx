"use client";

import { motion, useInView } from "motion/react";
import { type ElementType, useEffect, useMemo, useRef, useState } from "react";
import { useMotionPreference } from "@/motion/MotionPreferenceProvider";

// Safety net: matches Reveal — see motion/primitives/Reveal.tsx.
const FALLBACK_MS = 700;

/**
 * SplitReveal — reveal a string word-by-word with a controlled stagger.
 * Words are wrapped in inline-block spans so they can translate independently
 * without breaking line wrapping. Reduced motion collapses to a single fade.
 *
 * Use on any headline or tagline. For mixed-markup content prefer Reveal.
 */

type SplitRevealProps = {
  text: string;
  as?: ElementType;
  className?: string;
  stagger?: number;
  delay?: number;
  distance?: number;
  amount?: number;
  id?: string;
};

export function SplitReveal({
  text,
  as: As = "span",
  className,
  stagger = 0.06,
  delay = 0,
  distance = 32,
  amount = 0.3,
  id,
}: SplitRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { amount, once: true });
  const { shouldReduce } = useMotionPreference();
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setFallback(true), FALLBACK_MS);
    return () => clearTimeout(t);
  }, []);

  const visible = inView || fallback;

  const words = useMemo(() => text.split(/(\s+)/), [text]);

  if (shouldReduce) {
    return (
      <As ref={ref} id={id} className={className}>
        <motion.span
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : undefined}
          transition={{ duration: 0.2, delay }}
          style={{ display: "inline-block" }}
        >
          {text}
        </motion.span>
      </As>
    );
  }

  return (
    <As ref={ref} id={id} className={className}>
      {words.map((word, i) => {
        const isSpace = /^\s+$/.test(word);
        if (isSpace) return word;
        return (
          <motion.span
            // biome-ignore lint/suspicious/noArrayIndexKey: word order is stable for a given text input
            key={i}
            initial={{ opacity: 0, y: distance }}
            animate={visible ? { opacity: 1, y: 0 } : undefined}
            transition={{
              duration: 0.8,
              delay: delay + i * stagger,
              ease: [0.2, 0.9, 0.1, 1],
            }}
            style={{ display: "inline-block", willChange: "transform, opacity" }}
          >
            {word}
          </motion.span>
        );
      })}
    </As>
  );
}
