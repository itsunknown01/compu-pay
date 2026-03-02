"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import ScrollSection from "../scroll-section";
import AnimatedText from "../animated-text";
import { Brain, Scan, ShieldCheck, Zap } from "lucide-react";

const prefersReducedMotion =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

const CAPABILITIES = [
  {
    icon: Scan,
    label: "Risk Detection",
    description: "ML models scan every calculation before payroll runs",
  },
  {
    icon: ShieldCheck,
    label: "Compliance Engine",
    description: "Automated validation across 50+ tax jurisdictions",
  },
  {
    icon: Zap,
    label: "Instant Alerts",
    description: "Real-time notifications for anomalies and policy violations",
  },
  {
    icon: Brain,
    label: "Predictive Analytics",
    description: "Forecast risks before they materialize",
  },
];

export default function IntelligenceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const capsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Dashboard panel entrance
      gsap.fromTo(
        panelRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        },
      );

      // Capability cards stagger
      if (capsRef.current) {
        const cards = capsRef.current.querySelectorAll(".cap-card");
        gsap.fromTo(
          cards,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: capsRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Dashboard scan items data
  const scanItems = [
    { label: "Overtime calculation", status: "passed", confidence: "99.7%" },
    { label: "Tax withholding (CA)", status: "warning", confidence: "87.3%" },
    { label: "Benefits deduction", status: "passed", confidence: "99.9%" },
    { label: "Commission structure", status: "critical", confidence: "42.1%" },
    { label: "State tax (NY→CA)", status: "warning", confidence: "78.5%" },
  ];

  return (
    <ScrollSection
      id="intelligence"
      className="bg-[var(--lp-surface)]"
      ariaLabel="AI Intelligence"
    >
      <div ref={sectionRef} className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--lp-accent-bright)] mb-4">
            The Solution
          </p>
          <AnimatedText
            as="h2"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--lp-text)] mb-6"
          >
            AI That Thinks Before You Pay
          </AnimatedText>
          <p className="text-lg text-[var(--lp-text-muted)] max-w-2xl mx-auto">
            CompuPay&apos;s intelligence engine analyzes every payroll run in
            real-time, catching errors that humans miss.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Left: AI Scan Dashboard mockup */}
          <div
            ref={panelRef}
            className="lg:col-span-3 glass rounded-2xl overflow-hidden glow-accent opacity-0"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-[var(--lp-accent-bright)]" />
                <span className="text-sm font-medium">AI Risk Scanner</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-[var(--lp-success)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--lp-success)] animate-pulse" />
                Scanning
              </div>
            </div>

            {/* Scan items */}
            <div className="p-5 space-y-3">
              {scanItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5 transition-colors hover:bg-white/[0.04]"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        item.status === "passed"
                          ? "bg-emerald-400"
                          : item.status === "warning"
                            ? "bg-amber-400"
                            : "bg-red-400"
                      }`}
                    />
                    <span className="text-sm text-[var(--lp-text)]">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-mono ${
                        item.status === "passed"
                          ? "text-emerald-400"
                          : item.status === "warning"
                            ? "text-amber-400"
                            : "text-red-400"
                      }`}
                    >
                      {item.confidence}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        item.status === "passed"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : item.status === "warning"
                            ? "bg-amber-500/10 text-amber-400"
                            : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}

              {/* Scan progress bar */}
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-[10px] text-[var(--lp-text-muted)]">
                  <span>Scan Progress</span>
                  <span>1,247 / 1,247 employees</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--lp-accent)] to-[var(--lp-accent-bright)]"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Capabilities */}
          <div ref={capsRef} className="lg:col-span-2 space-y-4">
            {CAPABILITIES.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div
                  key={i}
                  className="cap-card glass gradient-border rounded-xl p-5 transition-all duration-300 hover:bg-white/[0.03] group opacity-0"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--lp-accent)]/10 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                      <Icon
                        className="w-5 h-5 text-[var(--lp-accent-bright)]"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--lp-text)] mb-1">
                        {cap.label}
                      </h3>
                      <p className="text-xs text-[var(--lp-text-muted)] leading-relaxed">
                        {cap.description}
                      </p>
                    </div>
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
