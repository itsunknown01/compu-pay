"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import ScrollSection from "../scroll-section";
import AnimatedText from "../animated-text";
import { Star } from "lucide-react";

const prefersReducedMotion =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

const LOGOS = [
  "Accenture",
  "Deloitte",
  "McKinsey",
  "Goldman Sachs",
  "JP Morgan",
  "Bloomberg",
  "Stripe",
  "Shopify",
];

const TESTIMONIALS = [
  {
    quote:
      "CompuPay caught a $340K overtime miscalculation that would have slipped through our manual review. The ROI was immediate.",
    author: "Sarah Chen",
    role: "VP of Finance",
    company: "TechVentures Inc.",
    rating: 5,
  },
  {
    quote:
      "We went from spending 3 days on payroll review to 4 hours. The AI detection is remarkably accurate across our 12 state operations.",
    author: "Marcus Williams",
    role: "Chief People Officer",
    company: "ScaleUp Corp",
    rating: 5,
  },
  {
    quote:
      "The compliance engine alone saved us from two potential audit penalties. Enterprise-grade is not an exaggeration.",
    author: "Priya Sharma",
    role: "Head of HR Operations",
    company: "GlobalLogic Partners",
    rating: 5,
  },
];

export default function SocialProofSection() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Logo marquee
      if (marqueeRef.current) {
        const marqueeInner = marqueeRef.current.querySelector(".marquee-inner");
        if (marqueeInner) {
          gsap.to(marqueeInner, {
            xPercent: -50,
            ease: "none",
            duration: 30,
            repeat: -1,
          });
        }
      }

      // Testimonial cards
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".testimonial-card");
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <ScrollSection
      id="social-proof"
      className="bg-[var(--lp-bg)]"
      ariaLabel="Social proof and testimonials"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--lp-accent-bright)] mb-4">
            Trusted By
          </p>
          <AnimatedText
            as="h2"
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--lp-text)] mb-6"
          >
            Enterprise Teams Trust CompuPay
          </AnimatedText>
        </div>

        {/* Logo Marquee */}
        <div
          ref={marqueeRef}
          className="relative overflow-hidden mb-16 md:mb-20"
          aria-hidden="true"
        >
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--lp-bg)] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--lp-bg)] to-transparent z-10" />

          <div className="marquee-inner flex gap-12 items-center w-max">
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <div
                key={i}
                className="text-lg font-semibold text-white/20 whitespace-nowrap tracking-wider"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto"
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="testimonial-card glass gradient-border rounded-2xl p-6 md:p-8 transition-all duration-300 hover:bg-white/[0.03] opacity-0"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                    aria-hidden="true"
                  />
                ))}
              </div>

              <blockquote className="text-sm text-[var(--lp-text)] leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div>
                <div className="text-sm font-semibold text-[var(--lp-text)]">
                  {t.author}
                </div>
                <div className="text-xs text-[var(--lp-text-muted)]">
                  {t.role}, {t.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollSection>
  );
}
