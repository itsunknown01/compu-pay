import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ModelVersionBadgeProps {
  version: string;
  className?: string;
}

export function ModelVersionBadge({
  version,
  className,
}: ModelVersionBadgeProps) {
  // Color coding based on model families (mock logic)
  const isGPT4 = version.toLowerCase().includes("gpt-4");
  const isClaude = version.toLowerCase().includes("claude");
  const isFineTuned = version.toLowerCase().includes("ft:");

  return (
    <Badge
      variant="secondary"
      className={cn(
        "font-mono text-[10px] tracking-tight",
        {
          "bg-green-100 text-green-700 hover:bg-green-200": isGPT4,
          "bg-purple-100 text-purple-700 hover:bg-purple-200": isClaude,
          "bg-blue-100 text-blue-700 hover:bg-blue-200": isFineTuned,
        },
        className,
      )}
    >
      v: {version}
    </Badge>
  );
}
