import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ConfidenceIndicatorProps {
  score: number; // 0 to 1
  className?: string;
  showLabel?: boolean;
}

export function ConfidenceIndicator({
  score,
  className,
  showLabel = true,
}: ConfidenceIndicatorProps) {
  // Determine color and label based on score
  let colorClass = "text-red-500";
  let bgClass = "bg-red-500";
  let label = "Low Confidence";

  if (score >= 0.9) {
    colorClass = "text-green-500";
    bgClass = "bg-green-500";
    label = "High Confidence";
  } else if (score >= 0.7) {
    colorClass = "text-yellow-500";
    bgClass = "bg-yellow-500";
    label = "Medium Confidence";
  }

  const percentage = Math.round(score * 100);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1.5 cursor-help">
              <Zap className={cn("h-4 w-4", colorClass)} />
              {showLabel && (
                <span className={cn("text-xs font-medium", colorClass)}>
                  {percentage}% {label}
                </span>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>AI Confidence Score: {percentage}%</p>
            <p className="text-xs text-muted-foreground mt-1">
              Based on historical data and rule matching
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Visual meter */}
      <div className="h-1.5 w-16 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            bgClass,
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
