import dynamic from "next/dynamic";
import HeroCinematic from "./_components/sections/hero-cinematic";

// Dynamic imports for below-fold sections to reduce initial bundle
const ProblemSection = dynamic(
  () => import("./_components/sections/problem-section"),
  { ssr: true },
);
const IntelligenceSection = dynamic(
  () => import("./_components/sections/intelligence-section"),
  { ssr: true },
);
const ProcessSection = dynamic(
  () => import("./_components/sections/process-section"),
  { ssr: true },
);
const MetricsSection = dynamic(
  () => import("./_components/sections/metrics-section"),
  { ssr: true },
);
const SocialProofSection = dynamic(
  () => import("./_components/sections/social-proof-section"),
  { ssr: true },
);
const CtaSection = dynamic(() => import("./_components/sections/cta-section"), {
  ssr: true,
});

export default function Home() {
  return (
    <main id="main-content" className="focus:outline-none" tabIndex={-1}>
      {/* Hero — static import for LCP */}
      <HeroCinematic />

      {/* Cinematic story flow */}
      <ProblemSection />
      <IntelligenceSection />
      <ProcessSection />
      <MetricsSection />
      <SocialProofSection />
      <CtaSection />
    </main>
  );
}
