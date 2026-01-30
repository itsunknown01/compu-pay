import { CheckCircle } from "lucide-react";

export default function LoginTrustIndicators() {
  return (
    <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-muted-foreground">
      <div className="flex items-center space-x-2">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <span>SOC 2 Certified</span>
      </div>
      <div className="flex items-center space-x-2">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <span>GDPR Compliant</span>
      </div>
      <div className="flex items-center space-x-2">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <span>99.9% Uptime</span>
      </div>
    </div>
  );
}
