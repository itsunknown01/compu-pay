"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ArrowRight, Shield, Brain, BarChart3 } from "lucide-react";
import Link from "next/link";

const prefersReducedMotion =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

// ─── Parallax Layer ───────────────────────────────────────────
function ParallaxLayer({
  speed,
  children,
  className = "",
}: {
  speed: number;
  children: React.ReactNode;
  className?: string;
}) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!layerRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(layerRef.current, {
        y: speed * 200,
        ease: "none",
        scrollTrigger: {
          trigger: layerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, layerRef);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={layerRef} className={`absolute inset-0 ${className}`}>
      {children}
    </div>
  );
}

// ─── Floating Orbs ────────────────────────────────────────────
function GlowOrb({
  size,
  position,
  color,
  delay = 0,
}: {
  size: string;
  position: string;
  color: string;
  delay?: number;
}) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-20 ${size} ${position}`}
      style={{
        background: color,
        animationDelay: `${delay}s`,
      }}
      aria-hidden="true"
    />
  );
}

// ─── Stats Badge ──────────────────────────────────────────────
function StatBadge({
  icon: Icon,
  value,
  label,
  delay,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="glass gradient-border rounded-xl px-4 py-3 flex items-center gap-3 opacity-0"
    >
      <div className="w-9 h-9 rounded-lg bg-[var(--lp-accent)]/10 flex items-center justify-center flex-shrink-0">
        <Icon
          className="w-4 h-4 text-[var(--lp-accent-bright)]"
          aria-hidden="true"
        />
      </div>
      <div>
        <div className="text-lg font-bold text-white leading-tight">
          {value}
        </div>
        <div className="text-xs text-[var(--lp-text-muted)]">{label}</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// HERO COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function HeroCinematic() {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const dashRef = useRef<HTMLDivElement>(null);

  // ─── Entrance animations ───────────────────────────────────
  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.3,
      });

      // Badge entrance
      tl.fromTo(
        ".hero-badge",
        { y: -10, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5 },
      );

      // Headline words stagger
      tl.fromTo(
        ".hero-word",
        { y: 60, opacity: 0, rotateX: 20 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.7,
          stagger: 0.08,
        },
        "-=0.2",
      );

      // Subheadline
      tl.fromTo(
        subRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4",
      );

      // CTA buttons
      tl.fromTo(
        ".hero-cta-btn",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.12 },
        "-=0.3",
      );

      // Dashboard panel
      tl.fromTo(
        dashRef.current,
        { y: 60, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" },
        "-=0.4",
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // ─── Headline text (real DOM for LCP) ──────────────────────
  const headlineWords =
    "Payroll Intelligence That Prevents Costly Mistakes".split(" ");

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* ── Layer 0: Deep background gradient mesh ── */}
      <ParallaxLayer speed={-0.15} className="z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#06060e] via-[#0a0a1f] to-[#06060e]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.12),transparent)]" />
      </ParallaxLayer>

      {/* ── Layer 1: Grid pattern ── */}
      <ParallaxLayer speed={-0.08} className="z-[1]">
        <div className="absolute inset-0 grid-pattern opacity-60" />
      </ParallaxLayer>

      {/* ── Layer 2: Floating glow orbs ── */}
      <ParallaxLayer speed={0.12} className="z-[2]">
        <GlowOrb
          size="w-[500px] h-[500px]"
          position="top-[-10%] left-[-10%]"
          color="radial-gradient(circle, rgba(99,102,241,0.3), transparent 70%)"
          delay={0}
        />
        <GlowOrb
          size="w-[400px] h-[400px]"
          position="bottom-[10%] right-[-5%]"
          color="radial-gradient(circle, rgba(52,211,153,0.2), transparent 70%)"
          delay={2}
        />
        <GlowOrb
          size="w-[300px] h-[300px]"
          position="top-[40%] right-[20%]"
          color="radial-gradient(circle, rgba(129,140,248,0.15), transparent 70%)"
          delay={4}
        />
      </ParallaxLayer>

      {/* ── Layer 3: Content ── */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* ── Left: Copy ── */}
              <div className="space-y-8 text-center lg:text-left">
                {/* Badge */}
                <div className="hero-badge inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-[var(--lp-accent-bright)] opacity-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--lp-success)] animate-pulse" />
                  AI-Powered Payroll Intelligence
                </div>

                {/* Headline — real DOM text */}
                <h1
                  ref={headlineRef}
                  id="hero-heading"
                  className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.08] tracking-tight"
                  style={{ perspective: "800px" }}
                >
                  {headlineWords.map((word, i) => (
                    <span
                      key={i}
                      className="hero-word inline-block opacity-0"
                      style={{
                        willChange: "transform, opacity",
                        color:
                          word === "Intelligence" || word === "Prevents"
                            ? "var(--lp-accent-bright)"
                            : "var(--lp-text)",
                      }}
                    >
                      {word}
                      {i < headlineWords.length - 1 ? "\u00A0" : ""}
                    </span>
                  ))}
                </h1>

                {/* Subheadline */}
                <p
                  ref={subRef}
                  className="text-lg sm:text-xl text-[var(--lp-text-muted)] max-w-xl mx-auto lg:mx-0 leading-relaxed opacity-0"
                >
                  Detect payroll risks, compliance issues, and calculation
                  errors before payroll runs. Protect your business with
                  enterprise-grade AI.
                </p>

                {/* CTA Buttons */}
                <div
                  ref={ctaRef}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <Link
                    href="/register"
                    className="hero-cta-btn group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[var(--lp-accent)] text-white font-semibold text-sm transition-all duration-300 hover:bg-[var(--lp-accent-bright)] hover:shadow-[0_0_40px_rgba(99,102,241,0.3)] opacity-0"
                  >
                    Start Free Trial
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="#demo"
                    className="hero-cta-btn inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl glass text-[var(--lp-text)] font-semibold text-sm transition-all duration-300 hover:bg-white/5 opacity-0"
                  >
                    Watch Demo
                  </Link>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
                  <StatBadge
                    icon={Shield}
                    value="99.9%"
                    label="Accuracy Rate"
                    delay={1.2}
                  />
                  <StatBadge
                    icon={Brain}
                    value="10K+"
                    label="Risks Detected"
                    delay={1.4}
                  />
                  <StatBadge
                    icon={BarChart3}
                    value="75%"
                    label="Time Saved"
                    delay={1.6}
                  />
                </div>
              </div>

              {/* ── Right: Dashboard Mockup ── */}
              <div ref={dashRef} className="relative opacity-0 hidden lg:block">
                <div className="relative glass rounded-2xl p-1 glow-accent">
                  {/* Window chrome */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="ml-3 text-xs text-[var(--lp-text-muted)]">
                      CompuPay Dashboard
                    </span>
                  </div>

                  {/* Dashboard content */}
                  <div className="p-5 space-y-4">
                    {/* Status row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[var(--lp-accent)]/15 flex items-center justify-center">
                          <Brain className="w-4 h-4 text-[var(--lp-accent-bright)]" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            AI Risk Scan Active
                          </div>
                          <div className="text-xs text-[var(--lp-text-muted)]">
                            Processing 1,247 employees
                          </div>
                        </div>
                      </div>
                      <div className="text-xs font-medium text-[var(--lp-success)] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--lp-success)] animate-pulse" />
                        Live
                      </div>
                    </div>

                    {/* Metrics grid */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        {
                          label: "Payroll Total",
                          value: "$2.4M",
                          trend: "+2.1%",
                        },
                        { label: "Risks Found", value: "3", trend: "Critical" },
                        {
                          label: "Compliance",
                          value: "100%",
                          trend: "Passing",
                        },
                      ].map((m, i) => (
                        <div
                          key={i}
                          className="rounded-lg bg-white/[0.03] p-3 border border-white/5"
                        >
                          <div className="text-[10px] text-[var(--lp-text-muted)] mb-1">
                            {m.label}
                          </div>
                          <div className="text-lg font-bold">{m.value}</div>
                          <div
                            className={`text-[10px] mt-1 ${i === 1 ? "text-amber-400" : "text-[var(--lp-success)]"}`}
                          >
                            {m.trend}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Fake chart area */}
                    <div className="relative rounded-lg bg-white/[0.02] border border-white/5 p-4 h-32 overflow-hidden">
                      <div className="text-[10px] text-[var(--lp-text-muted)] mb-2">
                        Risk Detection Timeline
                      </div>
                      {/* SVG chart mockup */}
                      <svg
                        viewBox="0 0 400 80"
                        className="w-full h-16"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                      >
                        <defs>
                          <linearGradient
                            id="heroChartGrad"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor="var(--lp-accent)"
                              stopOpacity="0.3"
                            />
                            <stop
                              offset="100%"
                              stopColor="var(--lp-accent)"
                              stopOpacity="0"
                            />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0 60 Q50 55 100 45 T200 30 T300 25 T400 15"
                          fill="none"
                          stroke="var(--lp-accent-bright)"
                          strokeWidth="2"
                          opacity="0.8"
                        />
                        <path
                          d="M0 60 Q50 55 100 45 T200 30 T300 25 T400 15 V80 H0 Z"
                          fill="url(#heroChartGrad)"
                        />
                      </svg>

                      {/* Scan line effect */}
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="w-full h-8 bg-gradient-to-b from-[var(--lp-accent)]/5 to-transparent animate-scanline" />
                      </div>
                    </div>

                    {/* Alert row */}
                    <div className="flex items-center gap-3 rounded-lg bg-amber-500/[0.06] border border-amber-500/10 p-3">
                      <Shield className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <div>
                        <div className="text-xs font-medium text-amber-300">
                          3 Risks Require Review
                        </div>
                        <div className="text-[10px] text-[var(--lp-text-muted)]">
                          Overtime miscalculation detected in Q2 payroll
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating accent glow behind dashboard */}
                <div
                  className="absolute -inset-4 bg-[var(--lp-accent)]/[0.04] rounded-3xl blur-2xl -z-10"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#06060e] to-transparent z-20 pointer-events-none" />
    </section>
  );
}
