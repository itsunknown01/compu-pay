import { Bot, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConfidenceIndicator } from "./confidence-indicator";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface AIExplanationPanelProps {
  explanation?: string;
  confidence?: number;
  isLoading?: boolean;
  className?: string;
  title?: string;
  variant?: "default" | "warning" | "info";
}

export function AIExplanationPanel({
  explanation,
  confidence,
  isLoading,
  className,
  title = "AI Insight",
  variant = "default",
}: AIExplanationPanelProps) {
  if (isLoading) {
    return (
      <Card className={cn("border-muted-foreground/20", className)}>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    );
  }

  if (!explanation) return null;

  const variantStyles = {
    default: "bg-muted/30 border-muted-foreground/20",
    warning: "bg-yellow-500/10 border-yellow-500/20",
    info: "bg-blue-500/10 border-blue-500/20",
  };

  return (
    <Card
      className={cn(
        "transition-all duration-300",
        variantStyles[variant],
        className,
      )}
    >
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2">
          {variant === "default" && (
            <Sparkles className="h-4 w-4 text-purple-500" />
          )}
          {variant === "warning" && <Bot className="h-4 w-4 text-yellow-500" />}
          {variant === "info" && <Bot className="h-4 w-4 text-blue-500" />}
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </div>
        {confidence !== undefined && (
          <ConfidenceIndicator score={confidence} showLabel={false} />
        )}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
          {explanation}
        </p>
        <div className="mt-3 flex items-center gap-1.5 text-[10px] text-muted-foreground/60 uppercase tracking-wider">
          <Bot className="h-3 w-3" />
          <span>AI-Assisted Insight</span>
        </div>
      </CardContent>
    </Card>
  );
}
