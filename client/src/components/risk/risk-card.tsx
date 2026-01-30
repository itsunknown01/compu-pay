import {
  AlertTriangle,
  Info,
  AlertOctagon,
  CheckCircle,
  LucideIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SeverityBadge } from "./severity-badge";
import { AIExplanationPanel } from "@/components/ai/ai-explanation-panel";
import { cn } from "@/lib/utils";
import { Risk, RiskSeverity } from "@/lib/types";

interface RiskCardProps {
  risk: Risk;
  className?: string;
}

export function RiskCard({ risk, className }: RiskCardProps) {
  const iconMap: Record<RiskSeverity, LucideIcon> = {
    CRITICAL: AlertOctagon,
    HIGH: AlertTriangle,
    MEDIUM: AlertTriangle,
    LOW: Info,
  };

  const Icon = iconMap[risk.severity];

  return (
    <Card
      className={cn("border-l-4", className, {
        "border-l-red-500": risk.severity === "CRITICAL",
        "border-l-orange-500": risk.severity === "HIGH",
        "border-l-yellow-500": risk.severity === "MEDIUM",
        "border-l-blue-500": risk.severity === "LOW",
      })}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn("p-2 rounded-full bg-muted", {
                "bg-red-100 text-red-600": risk.severity === "CRITICAL",
                "bg-orange-100 text-orange-600": risk.severity === "HIGH",
                "bg-yellow-100 text-yellow-600": risk.severity === "MEDIUM",
                "bg-blue-100 text-blue-600": risk.severity === "LOW",
              })}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">
                {risk.type}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                <span>{new Date(risk.createdAt).toLocaleDateString()}</span>
                {risk.metadata && "affectedCount" in risk.metadata && (
                  <>
                    <span>•</span>
                    <span>{String(risk.metadata.affectedCount)} affected</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <SeverityBadge severity={risk.severity} />
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <AIExplanationPanel
            title="AI Risk Analysis"
            explanation={risk.explanation}
            confidence={risk.confidence}
            variant={
              risk.severity === "CRITICAL" || risk.severity === "HIGH"
                ? "warning"
                : "default"
            }
          />
          {risk.suggestedAction && (
            <div className="flex gap-2 p-3 bg-muted/50 rounded-md">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
              <div className="text-sm">
                <span className="font-semibold text-foreground">
                  Suggested Action:{" "}
                </span>
                <span className="text-muted-foreground">
                  {risk.suggestedAction}
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
