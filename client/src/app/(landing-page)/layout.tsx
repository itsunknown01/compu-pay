import { Footer } from "@/app/(landing-page)/_components/layout/footer";
import Header from "@/app/(landing-page)/_components/layout/header";

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="landing-page dark min-h-screen bg-[#06060e] text-white">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
