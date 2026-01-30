"use client";

import { useComplianceStore } from "@/stores/compliance-store";
import { useRunSimulation } from "@/hooks/use-compliance";
import { SimulationDeltaView } from "@/components/compliance/simulation-delta-view";
import { Button } from "@/components/ui/button";
import { ChevronLeft, PlayCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface PayrunComplianceViewProps {
  payRunId: string;
}

export function PayrunComplianceView({ payRunId }: PayrunComplianceViewProps) {
  const { activeSimulation, setActiveSimulation } = useComplianceStore();
  const runSimulation = useRunSimulation();

  const handleSimulate = async () => {
    try {
      const result = await runSimulation.mutateAsync({
        ruleId: "ALL", 
        payRunId,
      });
      setActiveSimulation(result);
      toast.success("Simulation completed successfully");
    } catch {
      toast.error("Simulation failed");
    }
  };

  const resetSimulation = () => {
    setActiveSimulation(null);
  };

  return (
    <div className="container max-w-5xl py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/dashboard/payruns/${payRunId}`}>
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Compliance Simulator
          </h1>
          <p className="text-muted-foreground">
            Test regulatory impact before applying changes to Pay Run #
            {payRunId.slice(0, 8)}
          </p>
        </div>
      </div>

      {}
      {!activeSimulation && (
        <div className="flex flex-col items-center justify-center p-12 border border-dashed rounded-lg bg-muted/5">
          <div className="text-center space-y-4 max-w-lg">
            <h3 className="text-lg font-semibold">Ready to Simulate</h3>
            <p className="text-muted-foreground">
              Running a simulation will calculate the cost impact of active
              compliance rules against this pay run. Our AI will also generate a
              plain-language explanation of the changes.
            </p>
            <Button
              size="lg"
              onClick={handleSimulate}
              disabled={runSimulation.isPending}
            >
              {runSimulation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Simulating...
                </>
              ) : (
                <>
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Run Simulation
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {}
      {activeSimulation && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Simulation Results</h2>
            <Button variant="outline" onClick={resetSimulation}>
              Reset
            </Button>
          </div>

          <SimulationDeltaView simulation={activeSimulation} />

          <div className="flex justify-end gap-4 p-4 border rounded-lg bg-muted/30">
            <div className="flex items-center text-sm text-muted-foreground">
              <span>
                Simulation generated{" "}
                {new Date(activeSimulation.createdAt).toLocaleTimeString()}
              </span>
            </div>
            <Button
              variant="default"
              onClick={() => toast.success("Changes acknowledged")}
            >
              Acknowledge & Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
