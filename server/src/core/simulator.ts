import prisma from "../utils/prisma";
import { calculateNetPay } from "./payroll";

export class Simulator {
  static async simulate(ruleId: string, payRunId: string, tenantId: string) {
    // 1. Fetch Rule & PayRun
    const rule = await prisma.complianceRule.findUnique({
      where: { id: ruleId },
    });
    const items = await prisma.payRunItem.findMany({
      where: { payRunId },
      include: { employee: true },
    });

    if (!rule) throw new Error("Rule not found");
    if (rule.tenantId !== tenantId) throw new Error("Unauthorized");

    const changes = rule.changes as { taxRate?: number };

    let totalCostDelta = 0;
    let impactedCount = 0;

    // 2. Simulate for each item
    const results = items.map((item) => {
      const currentNet = Number(item.netPay);

      // Re-calculate with overrides
      const simResult = calculateNetPay(
        Number(item.employee.salaryAmount),
        item.employee.taxStatus,
        changes,
      );

      const newNet = simResult.netPay;
      const delta = newNet - currentNet;

      if (Math.abs(delta) > 0.01) {
        totalCostDelta += delta;
        impactedCount++;
      }

      return {
        employeeId: item.employeeId,
        currentNet,
        newNet,
        delta,
      };
    });

    // 3. Persist    // AI Explanation (Phase 8)
    const { InferenceEngine } = await import("./ai/inference");
    let aiSummary = null;
    try {
      aiSummary = await InferenceEngine.explainImpact(
        tenantId,
        rule.name,
        results,
      );
    } catch (e) {
      console.error("AI Explanation failed", e);
    }

    // 4. Store Result
    const simulation = await prisma.simulation.create({
      data: {
        ruleId,
        payRunId,
        results,
        aiSummary,
      },
    });

    return simulation;
  }
}
