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

/**
 * LoginPage - Server Component
 *
 * Renders the login page layout. The form itself is a Client Component.
 * Ensures responsiveness and visual hierarchy.
 */
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4 lg:p-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-radial-gradient -z-10" />

      <main className="relative w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Side - Branding & Features (Hidden on mobile? No, good to show) */}
          <section className="text-center lg:text-left space-y-8">
            <LoginHeading />
            <div className="hidden lg:block space-y-8">
              <LoginFeatures />
              <LoginTrustIndicators />
            </div>
            {/* Mobile-only shortened features could go here if needed, but for now we hide heavy text */}
          </section>

          {/* Right Side - Login Form */}
          <section className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
            <Card className="border-border/50 shadow-2xl backdrop-blur-sm bg-background/95">
              <CardHeader className="text-center pb-6 space-y-2">
                <CardTitle className="text-2xl font-bold tracking-tight">
                  Sign In
                </CardTitle>
                <CardDescription className="text-base">
                  Enter your credentials to access your PayrollAI dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LoginForm />
              </CardContent>
            </Card>

            {/* Security Notice */}
            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground/80 flex items-center justify-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                Protected by enterprise-grade security encryption.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
