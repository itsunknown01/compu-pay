import { RiskCard } from "./risk-card";
import { Risk, RiskSeverity } from "@/lib/types";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface RiskListProps {
  risks: Risk[];
}

export function RiskList({ risks }: RiskListProps) {
  if (!risks || risks.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed">
        <p className="text-muted-foreground">
          No risks detected for this payrun.
        </p>
      </div>
    );
  }

  
  const severityOrder: Record<RiskSeverity, number> = {
    CRITICAL: 0,
    HIGH: 1,
    MEDIUM: 2,
    LOW: 3,
  };
  const sortedRisks = [...risks].sort(
    (a, b) => severityOrder[a.severity] - severityOrder[b.severity],
  );

  const criticalCount = risks.filter((r) => r.severity === "CRITICAL").length;

  return (
    <div className="space-y-6">
      {criticalCount > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Action Required</AlertTitle>
          <AlertDescription>
            {criticalCount} critical risk{criticalCount > 1 ? "s" : ""}{" "}
            detected. You must resolve or explicitly override these risks before
            approving payroll.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4">
        {sortedRisks.map((risk) => (
          <RiskCard key={risk.id} risk={risk} />
        ))}
      </div>
    </div>
  );
}
