"use client";

import { Badge } from "@/components/ui/badge";
import { RiskSeverity } from "@/lib/types";
export type { RiskSeverity };

interface SeverityBadgeProps {
  severity: RiskSeverity;
}

const severityConfig: Record<
  RiskSeverity,
  { label: string; className: string }
> = {
  CRITICAL: {
    label: "Critical Risk",
    className: "bg-destructive hover:bg-destructive/90 animate-pulse",
  },
  HIGH: { label: "High Risk", className: "bg-red-600 hover:bg-red-700" },
  MEDIUM: {
    label: "Medium Risk",
    className: "bg-orange-500 hover:bg-orange-600",
  },
  LOW: {
    label: "Low Risk",
    className: "bg-yellow-500 hover:bg-yellow-600 text-black",
  },
};


export function SeverityBadge({ severity }: SeverityBadgeProps) {
  const config = severityConfig[severity] || {
    label: severity,
    className: "bg-gray-500",
  };

  return <Badge className={config.className}>{config.label}</Badge>;
}
