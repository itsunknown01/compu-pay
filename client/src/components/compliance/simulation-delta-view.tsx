"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, TrendingDown, Users } from "lucide-react";
import type { Simulation } from "@/lib/types";
import { AIExplanationPanel } from "@/components/ai/ai-explanation-panel";

interface SimulationDeltaViewProps {
  simulation: Simulation;
}


export function SimulationDeltaView({ simulation }: SimulationDeltaViewProps) {
  const results = simulation.results || {};
  const totalCostDelta = results.totalCostDelta || 0;
  const impactedCount = results.impactedCount || 0;

  const isPositive = totalCostDelta > 0;
  const costDeltaFormatted = `${isPositive ? "+" : ""}$${Math.abs(totalCostDelta).toLocaleString()}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          Simulation Results
          <Badge variant="outline" className="ml-2 text-xs">
            Preview
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {}
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
          <div className="flex items-center gap-3">
            {isPositive ? (
              <TrendingUp className="h-6 w-6 text-red-500" />
            ) : (
              <TrendingDown className="h-6 w-6 text-green-500" />
            )}
            <div>
              <p className="text-sm text-muted-foreground">Cost Impact</p>
              <p
                className={`text-2xl font-bold ${isPositive ? "text-red-500" : "text-green-500"}`}
              >
                {costDeltaFormatted}
              </p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
        </div>

        {}
        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">
                Employees Impacted
              </p>
              <p className="text-2xl font-bold">{impactedCount}</p>
            </div>
          </div>
        </div>

        {}
        {Object.keys(results).filter(
          (k) => !["totalCostDelta", "impactedCount"].includes(k),
        ).length > 0 && (
          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-2 text-muted-foreground">
              Additional Details
            </p>
            <pre className="bg-muted p-3 rounded-md text-xs font-mono overflow-auto max-h-32">
              {JSON.stringify(
                Object.fromEntries(
                  Object.entries(results).filter(
                    ([k]) => !["totalCostDelta", "impactedCount"].includes(k),
                  ),
                ),
                null,
                2,
              )}
            </pre>
          </div>
        )}
      </CardContent>
      {}
      {(simulation.explanation || simulation.confidence !== undefined) && (
        <div className="border-t bg-muted/20 p-6">
          <AIExplanationPanel
            title="AI Compliance Impact Analysis"
            explanation={simulation.explanation}
            confidence={simulation.confidence}
            variant="info"
          />
        </div>
      )}
    </Card>
  );
}
