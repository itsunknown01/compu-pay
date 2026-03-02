"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import ScrollSection from "../scroll-section";
import AnimatedText from "../animated-text";
import { AlertTriangle, Clock, FileWarning, DollarSign } from "lucide-react";

const prefersReducedMotion =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

const PAIN_POINTS = [
  {
    icon: AlertTriangle,
    title: "Hidden Compliance Risks",
    description:
      "Tax code changes across 50+ jurisdictions create silent compliance gaps that only surface during audits.",
    stat: "76%",
    statLabel: "of companies have compliance gaps",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
  },
  {
    icon: Clock,
    title: "Manual Error Exposure",
    description:
      "Spreadsheet-based payroll workflows introduce human errors that compound across pay periods.",
    stat: "$8.5B",
    statLabel: "lost annually to payroll errors",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
  },
  {
    icon: FileWarning,
    title: "Late-Stage Discovery",
    description:
      "Most payroll issues are only found after processing — when correction costs multiply 10×.",
    stat: "10×",
    statLabel: "higher cost of late corrections",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: DollarSign,
    title: "Revenue Leakage",
    description:
      "Overpayments, phantom employees, and benefit miscalculations drain profitability silently.",
    stat: "3.2%",
    statLabel: "average payroll revenue leakage",
    color: "text-rose-400",
    bgColor: "bg-rose-500/10",
  },
];

export default function ProblemSection() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current || prefersReducedMotion) return;

    const cards = cardsRef.current.querySelectorAll(".problem-card");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    }, cardsRef);

    return () => ctx.revert();
  }, []);

  return (
    <ScrollSection
      id="problem"
      className="bg-[var(--lp-bg)]"
      ariaLabel="The payroll problem"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--lp-accent-bright)] mb-4">
            The Problem
          </p>
          <AnimatedText
            as="h2"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--lp-text)] mb-6"
          >
            Payroll Complexity Is a Ticking Time Bomb
          </AnimatedText>
          <p className="text-lg text-[var(--lp-text-muted)] max-w-2xl mx-auto">
            Most enterprises don&apos;t discover payroll errors until it&apos;s
            too late. The cost compounds with every missed pay cycle.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto"
        >
          {PAIN_POINTS.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="problem-card glass gradient-border rounded-2xl p-6 md:p-8 transition-all duration-300 hover:bg-white/[0.03] group opacity-0"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-11 h-11 rounded-xl ${point.bgColor} flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon
                      className={`w-5 h-5 ${point.color}`}
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[var(--lp-text)] mb-2">
                      {point.title}
                    </h3>
                    <p className="text-sm text-[var(--lp-text-muted)] leading-relaxed mb-4">
                      {point.description}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className={`text-2xl font-bold ${point.color}`}>
                        {point.stat}
                      </span>
                      <span className="text-xs text-[var(--lp-text-muted)]">
                        {point.statLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ScrollSection>
  );
}
