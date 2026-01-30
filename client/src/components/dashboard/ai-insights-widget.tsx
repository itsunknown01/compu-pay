import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Zap,
  Loader2,
} from "lucide-react";
import { ConfidenceIndicator } from "@/components/ai/confidence-indicator";
import Link from "next/link";
import { useAIStats } from "@/hooks/use-ai-stats";

export function AIInsightsWidget() {
  const { data, loading } = useAIStats();

  if (loading) {
    return (
      <Card className="md:col-span-7 flex items-center justify-center p-8 h-[200px] w-full animate-pulse border-border/60">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </Card>
    );
  }

  if (!data) return null;

  const { systemHealth, activeRisks, insights } = data;

  return (
    <div className="grid gap-4 md:grid-cols-7 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* System Health Score Card */}
      <Card className="md:col-span-2 bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/20 dark:to-background border-indigo-100 dark:border-indigo-900/50 shadow-sm relative overflow-hidden group">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,transparent)] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),transparent)] pointer-events-none" />

        <CardHeader className="pb-2 relative z-10">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <Sparkles className="h-5 w-5 text-indigo-500 fill-indigo-500/20" />
            AI Monitor
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative flex items-center justify-center">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  className="text-muted/20"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="58"
                  cx="64"
                  cy="64"
                />
                <circle
                  className="text-indigo-500 transition-all duration-1000 ease-out"
                  strokeWidth="8"
                  strokeDasharray={365}
                  strokeDashoffset={365 - (365 * systemHealth) / 100}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="58"
                  cx="64"
                  cy="64"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-bold tracking-tighter">
                  {systemHealth}%
                </span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                  Health
                </span>
              </div>
            </div>

            <div className="mt-6 w-full space-y-3">
              <div className="flex justify-between text-sm px-2">
                <span className="text-muted-foreground">Active Risks</span>
                <span
                  className={`font-medium ${activeRisks > 0 ? "text-orange-500" : "text-green-500"}`}
                >
                  {activeRisks} Detected
                </span>
              </div>
              <div className="flex justify-between text-sm px-2">
                <span className="text-muted-foreground">Compliance</span>
                <span className="font-medium text-green-500">Passing</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights List Card */}
      <Card className="md:col-span-5 shadow-sm border-border/60">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg flex items-center gap-2 font-semibold">
            <Zap className="h-5 w-5 text-amber-500 fill-amber-500/20" />
            Recent AI Insights
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs hover:bg-muted/50"
          >
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {insights.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-all duration-200 border border-transparent hover:border-border/50"
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-1 shrink-0">
                    {item.type === "risk" && (
                      <div className="p-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30">
                        <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                      </div>
                    )}
                    {item.type === "compliance" && (
                      <div className="p-1.5 rounded-full bg-green-100 dark:bg-green-900/30">
                        <ShieldCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                    )}
                    {item.type === "optimization" && (
                      <div className="p-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30">
                        <TrendingUpIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-tight text-foreground/90">
                      {item.message}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">
                        {item.time}
                      </span>
                      <ConfidenceIndicator
                        score={item.confidence}
                        className="scale-75 origin-left"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity -ml-2 sm:ml-0"
                >
                  <Link href={item.link}>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function TrendingUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
