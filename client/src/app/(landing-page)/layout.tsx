import { Footer } from "@/app/(landing-page)/_components/layout/footer";
import Header from "@/app/(landing-page)/_components/layout/header";

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
