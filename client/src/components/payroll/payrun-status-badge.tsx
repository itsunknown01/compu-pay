"use client";

import { Badge } from "@/components/ui/badge";
import type { PayRunStatus } from "@/lib/types";

const statusConfig: Record<
  PayRunStatus,
  {
    label: string;
    variant: "default" | "secondary" | "outline" | "destructive";
  }
> = {
  DRAFT: { label: "Draft", variant: "secondary" },
  QUEUED: { label: "Queued", variant: "outline" },
  PREVIEWED: { label: "Previewed", variant: "default" },
  REVIEWED: { label: "Reviewed", variant: "default" },
  APPROVED: { label: "Approved", variant: "default" },
};

interface PayrunStatusBadgeProps {
  status: PayRunStatus;
}

/**
 * PayrunStatusBadge - Visual indicator for payrun status
 *
 * Color coding:
 * - DRAFT: gray/secondary
 * - QUEUED: outline (processing)
 * - PREVIEWED: default blue
 * - REVIEWED: default blue
 * - APPROVED: green (success)
 */
export function PayrunStatusBadge({ status }: PayrunStatusBadgeProps) {
  const config = statusConfig[status] || {
    label: status,
    variant: "secondary" as const,
  };

  return (
    <Badge
      variant={config.variant}
      className={status === "APPROVED" ? "bg-green-500 hover:bg-green-600" : ""}
    >
      {config.label}
    </Badge>
  );
}
