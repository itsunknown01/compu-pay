"use client";

import { Badge } from "@/components/ui/badge";
import type { ComplianceRuleStatus } from "@/lib/types";

interface RuleStatusBadgeProps {
  status: ComplianceRuleStatus;
}

const statusConfig: Record<
  ComplianceRuleStatus,
  { label: string; className: string }
> = {
  ACTIVE: { label: "Active", className: "bg-green-500 hover:bg-green-600" },
  DRAFT: {
    label: "Draft",
    className: "bg-muted hover:bg-muted/80 text-muted-foreground",
  },
  ARCHIVED: { label: "Archived", className: "bg-gray-500 hover:bg-gray-600" },
};


export function RuleStatusBadge({ status }: RuleStatusBadgeProps) {
  const config = statusConfig[status] || {
    label: status,
    className: "bg-gray-500",
  };

  return <Badge className={config.className}>{config.label}</Badge>;
}
