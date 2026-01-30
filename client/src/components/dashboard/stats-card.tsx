import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
  loading?: boolean;
  className?: string; // Allow custom styling injection
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  loading,
  className,
}: StatsCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-3 w-24" />
          </div>
        ) : (
          <div className="space-y-1">
            <div className="text-2xl font-bold tracking-tight">{value}</div>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
