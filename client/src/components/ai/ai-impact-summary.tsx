import { ArrowRight, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { AIExplanationPanel } from "./ai-explanation-panel";

interface ImpactMetric {
  label: string;
  before: number;
  after: number;
  format?: "currency" | "percent" | "number";
}

interface AIImpactSummaryProps {
  metrics: ImpactMetric[];
  explanation: string;
  confidence: number;
  className?: string;
}

export function AIImpactSummary({
  metrics,
  explanation,
  confidence,
  className,
}: AIImpactSummaryProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, idx) => {
          const delta = metric.after - metric.before;
          const percentage =
            metric.before !== 0 ? (delta / metric.before) * 100 : 0;
          const isPositive = delta > 0;
          const isNeutral = delta === 0;

          return (
            <div
              key={idx}
              className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
            >
              <p className="text-xs font-medium text-muted-foreground mb-2">
                {metric.label}
              </p>
              <div className="flex items-baseline justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground line-through opacity-70">
                    {formatValue(metric.before, metric.format)}
                  </span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  <span className="text-lg font-bold">
                    {formatValue(metric.after, metric.format)}
                  </span>
                </div>
              </div>

              {!isNeutral && (
                <div
                  className={cn(
                    "flex items-center gap-1 mt-2 text-xs font-medium",
                    isPositive ? "text-green-500" : "text-red-500",
                  )}
                >
                  {isPositive ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  <span>
                    {isPositive ? "+" : ""}
                    {formatValue(delta, metric.format)}({isPositive ? "+" : ""}
                    {percentage.toFixed(1)}%)
                  </span>
                </div>
              )}
              {isNeutral && (
                <div className="flex items-center gap-1 mt-2 text-xs font-medium text-muted-foreground">
                  <Minus className="h-3 w-3" />
                  <span>No Change</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {}
      <AIExplanationPanel
        title="Impact Analysis"
        explanation={explanation}
        confidence={confidence}
        variant="info"
      />
    </div>
  );
}

function formatValue(
  value: number,
  format: "currency" | "percent" | "number" = "number",
) {
  if (format === "currency") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  }
  if (format === "percent") {
    return new Intl.NumberFormat("en-US", {
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value / 100);
  }
  return new Intl.NumberFormat("en-US").format(value);
}
