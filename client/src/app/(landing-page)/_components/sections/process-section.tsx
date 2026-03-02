"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import ScrollSection from "../scroll-section";
import AnimatedText from "../animated-text";
import { Upload, Cpu, CheckCircle2 } from "lucide-react";

const prefersReducedMotion =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

const STEPS = [
  {
    number: "01",
    icon: Upload,
    title: "Connect Your Payroll",
    description:
      "Integrate with your existing payroll system in minutes. We support all major providers including ADP, Gusto, and Workday.",
    detail: "5-minute setup • No migration needed",
  },
  {
    number: "02",
    icon: Cpu,
    title: "AI Scans Every Run",
    description:
      "Our intelligence engine analyzes calculations, tax withholdings, and compliance rules before each payroll processes.",
    detail: "1,200+ risk patterns checked",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Pay with Confidence",
    description:
      "Receive actionable alerts for issues and a clean bill of health when everything checks out. Zero surprises.",
    detail: "99.9% accuracy guaranteed",
  },
];

export default function ProcessSection() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!stepsRef.current || prefersReducedMotion) return;

    const steps = stepsRef.current.querySelectorAll(".process-step");

    const ctx = gsap.context(() => {
      // Progress line animation
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 70%",
              end: "bottom 60%",
              scrub: 0.8,
            },
          },
        );
      }

      // Step cards stagger
      gsap.fromTo(
        steps,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        },
      );
    }, stepsRef);

    return () => ctx.revert();
  }, []);

  return (
    <ScrollSection
      id="process"
      className="bg-[var(--lp-bg)]"
      ariaLabel="How it works"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--lp-accent-bright)] mb-4">
            How It Works
          </p>
          <AnimatedText
            as="h2"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--lp-text)] mb-6"
          >
            Three Steps to Risk-Free Payroll
          </AnimatedText>
          <p className="text-lg text-[var(--lp-text-muted)] max-w-2xl mx-auto">
            Get started in minutes. No complex onboarding, no learning curve.
          </p>
        </div>

        <div className="max-w-3xl mx-auto relative">
          {/* Vertical progress line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-white/5 hidden md:block">
            <div
              ref={lineRef}
              className="w-full h-full bg-gradient-to-b from-[var(--lp-accent)] to-[var(--lp-accent-bright)] origin-top"
            />
          </div>

          {/* Steps */}
          <div ref={stepsRef} className="space-y-8 md:space-y-12">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  className="process-step flex gap-6 md:gap-8 items-start opacity-0"
                >
                  {/* Number circle */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-[var(--lp-accent)]/10 border border-[var(--lp-accent)]/20 flex items-center justify-center">
                      <span className="text-lg md:text-xl font-bold font-display text-[var(--lp-accent-bright)]">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="glass gradient-border rounded-2xl p-6 md:p-8 flex-1 transition-all duration-300 hover:bg-white/[0.03] group">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon
                        className="w-5 h-5 text-[var(--lp-accent-bright)]"
                        aria-hidden="true"
                      />
                      <h3 className="text-lg font-semibold text-[var(--lp-text)]">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-sm text-[var(--lp-text-muted)] leading-relaxed mb-3">
                      {step.description}
                    </p>
                    <span className="text-xs text-[var(--lp-accent-bright)] font-medium">
                      {step.detail}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ScrollSection>
  );
}
