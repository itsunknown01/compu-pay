"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "@/lib/gsap";

type AnimationType =
  | "fade-up"
  | "fade-in"
  | "slide-left"
  | "slide-right"
  | "scale-up"
  | "stagger-children";

interface ScrollAnimationOptions {
  type?: AnimationType;
  duration?: number;
  delay?: number;
  stagger?: number;
  scrub?: boolean | number;
  start?: string;
  end?: string;
  markers?: boolean;
  once?: boolean;
}

const prefersReducedMotion =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: ScrollAnimationOptions = {},
) {
  const ref = useRef<T>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const {
    type = "fade-up",
    duration = 0.8,
    delay = 0,
    stagger = 0.1,
    scrub = false,
    start = "top 85%",
    end = "bottom 20%",
    once = true,
  } = options;

  const getAnimation = useCallback(
    (el: T) => {
      const defaults = { duration, delay, ease: "power3.out" };

      switch (type) {
        case "fade-up":
          return {
            from: { y: 40, opacity: 0 },
            to: { y: 0, opacity: 1, ...defaults },
          };
        case "fade-in":
          return {
            from: { opacity: 0 },
            to: { opacity: 1, ...defaults },
          };
        case "slide-left":
          return {
            from: { x: 60, opacity: 0 },
            to: { x: 0, opacity: 1, ...defaults },
          };
        case "slide-right":
          return {
            from: { x: -60, opacity: 0 },
            to: { x: 0, opacity: 1, ...defaults },
          };
        case "scale-up":
          return {
            from: { scale: 0.9, opacity: 0 },
            to: { scale: 1, opacity: 1, ...defaults },
          };
        case "stagger-children":
          return {
            from: { y: 30, opacity: 0 },
            to: {
              y: 0,
              opacity: 1,
              ...defaults,
              stagger: {
                amount: stagger * el.children.length,
                from: "start" as const,
              },
            },
          };
        default:
          return {
            from: { y: 40, opacity: 0 },
            to: { y: 0, opacity: 1, ...defaults },
          };
      }
    },
    [type, duration, delay, stagger],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const anim = getAnimation(el);
      const targets = type === "stagger-children" ? el.children : el;

      gsap.set(targets, anim.from);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub,
          toggleActions: once
            ? "play none none none"
            : "play none none reverse",
        },
      });

      tl.to(targets, anim.to);
      tlRef.current = tl;
    }, el);

    return () => {
      ctx.revert();
    };
  }, [getAnimation, type, start, end, scrub, once]);

  return ref;
}
