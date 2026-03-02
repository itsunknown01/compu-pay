import prisma from "../utils/prisma";
import { calculateNetPay } from "./payroll";
import { InferenceEngine } from "./ai/inference";

export class Simulator {
  static async simulate(ruleId: string, payRunId: string, tenantId: string) {
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

    const results = items.map((item) => {
      const currentNet = Number(item.netPay);

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
