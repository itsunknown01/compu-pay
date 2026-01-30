"use client";

import { usePayrunRisks } from "@/hooks";
import { RiskList } from "@/components/risk/risk-list";
import { Button } from "@/components/ui/button";
import { ChevronLeft, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface PayrunRisksViewProps {
  payRunId: string;
}

export function PayrunRisksView({ payRunId }: PayrunRisksViewProps) {
  const { data: risks, isLoading, error } = usePayrunRisks(payRunId);

  return (
    <div className="container max-w-5xl py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/dashboard/payruns/${payRunId}`}>
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Risk Analysis</h1>
          <p className="text-muted-foreground">
            AI-powered risk detection for Pay Run #{payRunId.slice(0, 8)}
          </p>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center p-12 border border-destructive/20 rounded-lg bg-destructive/5 text-destructive">
          <AlertTriangle className="h-10 w-10 mb-4" />
          <h3 className="text-lg font-semibold">Failed to load risks</h3>
          <p className="text-sm">{error.message}</p>
        </div>
      ) : (
        <RiskList risks={risks || []} />
      )}
    </div>
  );
}
