"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  ArrowLeft,
  Play,
  CheckCircle,
  FileText,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { usePayrun, useTriggerPreview, useApprovePayrun } from "@/hooks";
import { PayrunStatusBadge, PayrollPreviewTable } from "@/components/payroll";
import { AsyncJobStatus } from "@/components/ui/async-job-status";
import { ImmutableNotice } from "@/components/ui/immutable-notice";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface PayrunDetailsViewProps {
  payRunId: string;
}

export function PayrunDetailsView({ payRunId }: PayrunDetailsViewProps) {
  const router = useRouter();
  const { data: payrun, isLoading, error } = usePayrun(payRunId);
  const triggerPreview = useTriggerPreview();
  const approvePayrun = useApprovePayrun();

  const [jobId, setJobId] = useState<string | null>(null);

  const handleTriggerPreview = async () => {
    try {
      const result = await triggerPreview.mutateAsync(payRunId);
      setJobId(result.jobId || "mock-job-id");
      toast.info("Payroll calculation started...");
    } catch {
      toast.error("Failed to start calculation");
    }
  };

  const handleApprove = async () => {
    try {
      await approvePayrun.mutateAsync(payRunId);
      toast.success("Payrun approved successfully");
    } catch {
      toast.error("Failed to approve payrun");
    }
  };

  const handleJobComplete = () => {
    setJobId(null);
    toast.success("Calculation complete!");
    // Trigger re-fetch logic handled by useAsyncJob or simply invalidate queries via the mutation hooks
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error || !payrun) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <AlertTriangle className="h-10 w-10 text-destructive mb-4" />
        <h2 className="text-xl font-semibold">Failed to load payrun</h2>
        <p className="text-muted-foreground mb-4">
          {error?.message || "Payrun not found"}
        </p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  const isLocked = payrun.status === "APPROVED" || payrun.status === "QUEUED";

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">
                Payrun Details
              </h1>
              <PayrunStatusBadge status={payrun.status} />
            </div>
            <p className="text-muted-foreground">
              Period: {format(new Date(payrun.periodStart), "MMM d, yyyy")} -{" "}
              {format(new Date(payrun.periodEnd), "MMM d, yyyy")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {payrun.status === "DRAFT" && !jobId && (
            <Button onClick={handleTriggerPreview}>
              <Play className="mr-2 h-4 w-4" />
              Run Calculation
            </Button>
          )}
          {payrun.status === "REVIEWED" && (
            <Button
              onClick={handleApprove}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve Payrun
            </Button>
          )}
        </div>
      </div>

      {isLocked && (
        <ImmutableNotice message="This payrun has been approved and is locked for processing." />
      )}

      {/* Async Job Status */}
      {jobId && (
        <AsyncJobStatus
          jobId={jobId}
          title="Calculating Payroll"
          description="Validating rules, calculating taxes, and checking for risks..."
          onComplete={handleJobComplete}
          onError={() => setJobId(null)}
        />
      )}

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$Mock 125,000</div>
            <p className="text-xs text-muted-foreground">
              +2.5% from last period
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Employees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Active included</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pay Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {format(new Date(payrun.periodEnd), "MMM d")}
            </div>
            <p className="text-xs text-muted-foreground">Scheduled deposit</p>
          </CardContent>
        </Card>
      </div>

      {/* Risk Alert Section */}
      <div className="rounded-lg border p-4 bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            <div>
              <h3 className="font-semibold">Compliance check required</h3>
              <p className="text-sm text-muted-foreground">
                Review potential risks before approval.
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => router.push(`/dashboard/payruns/${payRunId}/risks`)}
          >
            View Risks
          </Button>
        </div>
      </div>

      <Separator />

      {/* Preview Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Payroll Breakdown
          </h3>
        </div>

        {payrun.status === "PREVIEWED" ||
        payrun.status === "REVIEWED" ||
        payrun.status === "APPROVED" ? (
          <PayrollPreviewTable
            data={[{ id: 1 }]} // Mock data trigger
            loading={false}
          />
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
              <p>No preview generated yet.</p>
              <p className="text-sm">
                Run the calculation to see the breakdown.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
