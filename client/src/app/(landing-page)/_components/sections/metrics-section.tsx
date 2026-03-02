"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";
import ScrollSection from "../scroll-section";
import AnimatedText from "../animated-text";

const prefersReducedMotion =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

const METRICS = [
  {
    value: 99.9,
    suffix: "%",
    label: "Payroll Accuracy",
    description: "Industry-leading calculation precision",
  },
  {
    value: 75,
    suffix: "%",
    label: "Time Saved",
    description: "Compared to manual review processes",
  },
  {
    value: 10,
    suffix: "K+",
    label: "Risks Detected",
    description: "Payroll anomalies caught before processing",
  },
  {
    value: 50,
    suffix: "+",
    label: "Jurisdictions",
    description: "Multi-state tax compliance covered",
  },
];

function CountUpNumber({
  value,
  suffix,
  duration = 2,
}: {
  value: number;
  suffix: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion) {
      setDisplay(value.toString());
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const obj = { val: 0 };
            gsap.to(obj, {
              val: value,
              duration,
              ease: "power2.out",
              onUpdate: () => {
                if (value % 1 !== 0) {
                  setDisplay(obj.val.toFixed(1));
                } else {
                  setDisplay(Math.floor(obj.val).toString());
                }
              },
            });
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export default function MetricsSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current || prefersReducedMotion) return;

    const cards = gridRef.current.querySelectorAll(".metric-card");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <ScrollSection
      id="metrics"
      className="bg-[var(--lp-surface)]"
      ariaLabel="Key metrics"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--lp-accent-bright)] mb-4">
            By the Numbers
          </p>
          <AnimatedText
            as="h2"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--lp-text)] mb-6"
          >
            Trusted by Enterprise Finance Teams
          </AnimatedText>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto"
        >
          {METRICS.map((metric, i) => (
            <div
              key={i}
              className="metric-card glass gradient-border rounded-2xl p-6 md:p-8 text-center transition-all duration-300 hover:bg-white/[0.03] group opacity-0"
            >
              <div className="text-4xl md:text-5xl font-bold font-display text-[var(--lp-accent-bright)] mb-2 glow-text">
                <CountUpNumber
                  value={metric.value}
                  suffix={metric.suffix}
                  duration={2}
                />
              </div>
              <div className="text-sm font-semibold text-[var(--lp-text)] mb-1">
                {metric.label}
              </div>
              <div className="text-xs text-[var(--lp-text-muted)]">
                {metric.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollSection>
  );
}
