"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * GSAP + ScrollTrigger plugin registration, called once per client boot.
 * Components that use ScrollTrigger should call `registerScrollTrigger()` in
 * a top-level `useLayoutEffect` before building their timelines.
 */

let registered = false;

export function registerScrollTrigger(): typeof ScrollTrigger {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return ScrollTrigger;
}

export { gsap };
