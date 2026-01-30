"use client";

import {
  Calculator,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Clock,
  Plus,
} from "lucide-react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PayrunList } from "@/components/payroll";
import { AIInsightsWidget } from "@/components/dashboard/ai-insights-widget";
import { StatsCard } from "@/components/dashboard/stats-card";
import { useDashboardStats } from "@/hooks/use-dashboard-stats";


export function DashboardOverview() {
  const { stats, isLoading } = useDashboardStats();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Dashboard
          </h2>
          <p className="text-muted-foreground mt-1">
            Overview of your payroll operations.
          </p>
        </div>
        <Button asChild className="shrink-0 shadow-sm">
          <Link href="/dashboard/payruns/new">
            <Plus className="mr-2 h-4 w-4" />
            New Payrun
          </Link>
        </Button>
      </header>

      {}
      <section
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        aria-label="Key Performance Indicators"
      >
        <StatsCard
          title="Total Payruns"
          value={stats.totalPayruns}
          description="All time records"
          icon={Calculator}
          loading={isLoading}
        />
        <StatsCard
          title="Pending Review"
          value={stats.pendingApproval}
          description="Requires attention"
          icon={AlertTriangle}
          loading={isLoading}
          className={
            stats.pendingApproval > 0
              ? "border-orange-200 dark:border-orange-900 bg-orange-50/50 dark:bg-orange-950/10"
              : ""
          }
        />
        <StatsCard
          title="Approved"
          value={stats.approved}
          description="Ready for processing"
          icon={CheckCircle}
          loading={isLoading}
        />
        <StatsCard
          title="Drafts"
          value={stats.drafts}
          description="Works in progress"
          icon={Clock}
          loading={isLoading}
        />
      </section>

      {}
      <div className="grid gap-6 lg:grid-cols-7">
        {}
        <div className="lg:col-span-7">
          <AIInsightsWidget />
        </div>

        {}
        <section className="lg:col-span-7" aria-label="Recent Activity">
          <Card className="shadow-sm border-border/60">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
                Recent Payruns
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-muted-foreground hover:text-primary"
              >
                <Link href="/dashboard/payruns">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <PayrunList />
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
