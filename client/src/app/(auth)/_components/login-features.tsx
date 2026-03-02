import { Shield, Users, Zap } from "lucide-react";

export default function LoginFeatures() {
  const features = [
    {
      icon: Zap,
      title: "AI-Powered Detection",
      description: "ML models scan every payroll calculation before processing",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "SOC 2 certified with bank-level encryption and compliance",
    },
    {
      icon: Users,
      title: "Multi-Location Support",
      description: "Manage payroll across 50+ jurisdictions seamlessly",
    },
  ];

  return (
    <div className="space-y-5 mb-8">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <div key={index} className="flex items-start gap-4">
            <div className="p-2.5 bg-primary/10 rounded-xl shrink-0">
              <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-0.5">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
