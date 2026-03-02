"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

interface AnimatedTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  splitBy?: "words" | "chars";
  staggerAmount?: number;
  delay?: number;
  scrub?: boolean;
  start?: string;
}

const prefersReducedMotion =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

export default function AnimatedText({
  children,
  as: Tag = "h2",
  className = "",
  splitBy = "words",
  staggerAmount = 0.4,
  delay = 0,
  scrub = false,
  start = "top 85%",
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || prefersReducedMotion) return;

    const spans = el.querySelectorAll(".anim-unit");
    if (!spans.length) return;

    const ctx = gsap.context(() => {
      gsap.set(spans, { y: 30, opacity: 0 });

      gsap.to(spans, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay,
        ease: "power3.out",
        stagger: staggerAmount / spans.length,
        scrollTrigger: {
          trigger: el,
          start,
          scrub,
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [children, delay, scrub, splitBy, staggerAmount, start]);

  const units = splitBy === "words" ? children.split(" ") : children.split("");

  return (
    <div ref={containerRef}>
      <Tag className={className}>
        {units.map((unit, i) => (
          <span
            key={i}
            className="anim-unit inline-block"
            style={{ willChange: "transform, opacity" }}
          >
            {unit}
            {splitBy === "words" && i < units.length - 1 ? "\u00A0" : ""}
          </span>
        ))}
      </Tag>
    </div>
  );
}
