import { CheckCircle } from "lucide-react";

export default function LoginTrustIndicators() {
  return (
    <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <CheckCircle className="h-4 w-4 text-emerald-400" />
        <span>SOC 2 Certified</span>
      </div>
      <div className="flex items-center gap-2">
        <CheckCircle className="h-4 w-4 text-emerald-400" />
        <span>GDPR Compliant</span>
      </div>
      <div className="flex items-center gap-2">
        <CheckCircle className="h-4 w-4 text-emerald-400" />
        <span>99.9% Uptime</span>
      </div>
    </div>
  );
}
