"use client";

import { useReducedMotion } from "motion/react";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/**
 * Motion preference — the single source of truth for whether the site should
 * move. Layered signal:
 *   1. OS-level `prefers-reduced-motion` (via motion's useReducedMotion)
 *   2. User-toggle in the footer that overrides the OS value, persisted in localStorage.
 *
 * Components that animate should consult `useMotionPreference()` and bail out
 * (return final state, no tween) when `shouldReduce` is true.
 */

type ToggleState = "system" | "reduce" | "full";

type MotionPreferenceValue = {
  /** Final reduced-motion verdict combining OS + user choice. */
  shouldReduce: boolean;
  /** Raw OS signal. */
  systemReduced: boolean;
  /** Current user toggle position. */
  toggle: ToggleState;
  /** Cycle the toggle: system → reduce → full → system. */
  cycleToggle: () => void;
  /** Set an explicit toggle state. */
  setToggle: (t: ToggleState) => void;
};

const MotionPreferenceContext = createContext<MotionPreferenceValue | null>(null);

const STORAGE_KEY = "station8.motion-toggle";

function readStoredToggle(): ToggleState {
  if (typeof window === "undefined") return "system";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "reduce" || stored === "full" ? stored : "system";
}

export function MotionPreferenceProvider({ children }: { children: ReactNode }) {
  const systemReduced = useReducedMotion() ?? false;
  const [toggle, setToggleState] = useState<ToggleState>("system");

  // Hydrate from localStorage after mount (avoid SSR mismatch)
  useEffect(() => {
    setToggleState(readStoredToggle());
  }, []);

  const setToggle = useCallback((t: ToggleState) => {
    setToggleState(t);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, t);
    }
  }, []);

  const cycleToggle = useCallback(() => {
    setToggleState((prev) => {
      const next: ToggleState =
        prev === "system" ? "reduce" : prev === "reduce" ? "full" : "system";
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, next);
      }
      return next;
    });
  }, []);

  const value = useMemo<MotionPreferenceValue>(() => {
    const shouldReduce = toggle === "reduce" ? true : toggle === "full" ? false : systemReduced;
    return { shouldReduce, systemReduced, toggle, setToggle, cycleToggle };
  }, [toggle, systemReduced, setToggle, cycleToggle]);

  return (
    <MotionPreferenceContext.Provider value={value}>{children}</MotionPreferenceContext.Provider>
  );
}

export function useMotionPreference(): MotionPreferenceValue {
  const ctx = useContext(MotionPreferenceContext);
  if (!ctx) {
    // Safe fallback so isolated components can render without a provider (e.g. in tests)
    return {
      shouldReduce: false,
      systemReduced: false,
      toggle: "system",
      setToggle: () => {},
      cycleToggle: () => {},
    };
  }
  return ctx;
}
