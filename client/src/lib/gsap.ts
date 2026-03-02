"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins once at module level
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Default GSAP configuration for consistent feel
gsap.defaults({
  ease: "power3.out",
  duration: 0.8,
});

// ScrollTrigger defaults
ScrollTrigger.defaults({
  toggleActions: "play none none reverse",
});

export { gsap, ScrollTrigger };
