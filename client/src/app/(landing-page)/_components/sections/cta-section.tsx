"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import ScrollSection from "../scroll-section";
import AnimatedText from "../animated-text";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const prefersReducedMotion =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

export default function CtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const els = sectionRef.current!.querySelectorAll(".cta-animate");

      gsap.fromTo(
        els,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <ScrollSection
      id="cta"
      className="bg-[var(--lp-bg)]"
      ariaLabel="Get started with CompuPay"
    >
      <div ref={sectionRef} className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-4xl mx-auto">
          {/* Background glow */}
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(99,102,241,0.1),transparent)] rounded-3xl"
            aria-hidden="true"
          />

          <div className="relative glass rounded-3xl p-10 md:p-16 text-center">
            <div className="cta-animate opacity-0">
              <AnimatedText
                as="h2"
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--lp-text)] mb-6"
                start="top 90%"
              >
                Stop Guessing. Start Knowing.
              </AnimatedText>
            </div>

            <p className="cta-animate text-lg text-[var(--lp-text-muted)] max-w-xl mx-auto mb-10 opacity-0">
              Join enterprises that have eliminated payroll surprises. Start
              your free trial today — no credit card required.
            </p>

            <div className="cta-animate flex flex-col sm:flex-row gap-4 justify-center opacity-0">
              <Link
                href="/register"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[var(--lp-accent)] text-white font-semibold text-sm transition-all duration-300 hover:bg-[var(--lp-accent-bright)] hover:shadow-[0_0_60px_rgba(99,102,241,0.3)]"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#demo"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl glass text-[var(--lp-text)] font-semibold text-sm transition-all duration-300 hover:bg-white/5"
              >
                Schedule Demo
              </Link>
            </div>

            <p className="cta-animate mt-6 text-xs text-[var(--lp-text-muted)] opacity-0">
              Free 14-day trial • No credit card • Enterprise ready
            </p>
          </div>
        </div>
      </div>
    </ScrollSection>
  );
}
