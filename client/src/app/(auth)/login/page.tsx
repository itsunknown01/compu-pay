import LoginForm from "@/app/(auth)/_components/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginHeading from "../_components/heading";
import LoginFeatures from "../_components/login-features";
import LoginTrustIndicators from "../_components/login-trust-indicators";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 lg:p-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-radial-gradient -z-10" />
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-[120px]"
        aria-hidden="true"
      />

      <main className="relative w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left — Branding */}
          <section className="text-center lg:text-left space-y-8">
            <LoginHeading />
            <div className="hidden lg:block space-y-8">
              <LoginFeatures />
              <LoginTrustIndicators />
            </div>
          </section>

          {/* Right — Login card */}
          <section className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
            <Card className="border-border shadow-2xl bg-card/80 backdrop-blur-xl">
              <CardHeader className="text-center pb-6 space-y-2">
                <CardTitle className="text-2xl font-bold font-display tracking-tight">
                  Sign In
                </CardTitle>
                <CardDescription className="text-base">
                  Enter your credentials to access your CompuPay dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LoginForm />
              </CardContent>
            </Card>

            {/* Trust badge */}
            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Protected by enterprise-grade security encryption.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
