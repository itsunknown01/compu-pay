import {
    Shield,
    Users,
    Zap
} from "lucide-react";

export default function LoginFeatures() {
    const features = [
        {
          icon: Zap,
          title: "AI-Powered Automation",
          description:
            "Intelligent payroll processing with machine learning algorithms",
        },
        {
          icon: Shield,
          title: "Enterprise Security",
          description:
            "Bank-level encryption and compliance with SOX, GDPR standards",
        },
        {
          icon: Users,
          title: "Multi-Location Support",
          description: "Manage payroll across multiple locations and departments",
        },
      ];

    return (
        <div className="space-y-6 mb-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="flex items-start space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                <Icon
                  className="h-5 w-5 text-primary"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
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
    )
}