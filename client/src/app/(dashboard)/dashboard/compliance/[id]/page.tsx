"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Play, CheckCircle, Archive } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  useComplianceRule,
  useRunSimulation,
  useActivateRule,
  usePayruns,
} from "@/hooks";
import type { Simulation } from "@/lib/types";
import {
  RuleStatusBadge,
  SimulationDeltaView,
  ApprovalConfirmation,
} from "@/components/compliance";

export default function ComplianceRuleDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: rule, isLoading, error } = useComplianceRule(id);
  const runSimulation = useRunSimulation();
  const activateRule = useActivateRule();

  const { data: payrunsData } = usePayruns(1, 5);
  const [simulationResult, setSimulationResult] = useState<Simulation | null>(
    null,
  );

  const handleRunSimulation = async () => {
    const latestPayRun = payrunsData?.data?.[0];

    if (!latestPayRun) {
      toast.error("No active pay run found to simulate against");
      return;
    }

    try {
      const result = await runSimulation.mutateAsync({
        ruleId: id,
        payRunId: latestPayRun.id,
      });
      setSimulationResult(result);
      toast.success("Simulation complete!");
    } catch {
      toast.error("Failed to run simulation");
    }
  };

  const handleActivateRule = async () => {
    try {
      await activateRule.mutateAsync(id);
      toast.success("Rule activated successfully");
    } catch {
      toast.error("Failed to activate rule");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error || !rule) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive mb-4">Failed to load rule</p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">{rule.name}</h1>
              <RuleStatusBadge status={rule.status} />
            </div>
            <p className="text-muted-foreground">
              Effective: {format(new Date(rule.effectiveDate), "MMM d, yyyy")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {rule.status === "DRAFT" && (
            <>
              <Button
                variant="outline"
                onClick={handleRunSimulation}
                disabled={runSimulation.isPending}
              >
                <Play className="mr-2 h-4 w-4" />
                {runSimulation.isPending ? "Running..." : "Run Simulation"}
              </Button>
              <ApprovalConfirmation
                title="Activate Compliance Rule"
                description="This will apply the rule to all future payroll calculations. This action cannot be easily undone."
                onConfirm={() => {
                  void handleActivateRule();
                }}
                loading={activateRule.isPending}
              >
                <Button className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Activate Rule
                </Button>
              </ApprovalConfirmation>
            </>
          )}
          {rule.status === "ACTIVE" && (
            <Button variant="outline">
              <Archive className="mr-2 h-4 w-4" />
              Archive
            </Button>
          )}
        </div>
      </div>

      <Separator />

      {/* Rule Details */}
      <Card>
        <CardHeader>
          <CardTitle>Rule Configuration</CardTitle>
          <CardDescription>
            {rule.description || "No description provided."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-md">
            <p className="text-sm font-medium mb-2 text-muted-foreground">
              Changes Definition
            </p>
            <pre className="text-xs font-mono overflow-auto max-h-48">
              {JSON.stringify(rule.changes, null, 2)}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Simulation Results */}
      {simulationResult && (
        <SimulationDeltaView simulation={simulationResult} />
      )}
    </div>
  );
}
