import FeatureSection from "@/app/(landing-page)/_components/sections/feature-section";
import HeroSection from "@/app/(landing-page)/_components/sections/hero-section";
import ServiceSection from "@/app/(landing-page)/_components/sections/service-section";
import ContactSection from "@/app/(landing-page)/_components/sections/contact";
import { ProductGrid } from "./_components/sections/product-grid";
import { HeroScrollDemo } from "./_components/sections/hero-scroll";
import {
  HERO_DATA,
  FEATURES_DATA,
  PRODUCTS_DATA,
  SERVICES_DATA,
  CONTACT_DATA,
} from "@/lib/landing-data";

export default function Home() {
  return (
    <main id="main-content" className="focus:outline-none" tabIndex={-1}>
      <HeroSection data={HERO_DATA} />
      <HeroScrollDemo />
      <ProductGrid data={PRODUCTS_DATA} />
      <FeatureSection data={FEATURES_DATA} />
      <ServiceSection data={SERVICES_DATA} />
      <ContactSection data={CONTACT_DATA} />
    </main>
  );
}
