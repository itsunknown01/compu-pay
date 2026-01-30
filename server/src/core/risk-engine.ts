import prisma from "../utils/prisma";
import { Prisma } from "@prisma/client";

export interface RiskAnalysisResult {
  riskCount: number;
  criticalCount: number;
}

export class RiskEngine {
  static async analyze(
    payRunId: string,
    tenantId: string,
  ): Promise<RiskAnalysisResult> {
    console.log(`Starting Risk Analysis for PayRun: ${payRunId}`);

    // 1. Fetch Data
    const items = await prisma.payRunItem.findMany({
      where: { payRunId },
      include: { employee: true },
    });

    const risks: any[] = [];

    // 2. Apply Rules
    for (const item of items) {
      // Rule 1: Negative Net Pay
      if (Number(item.netPay) < 0) {
        risks.push({
          tenantId,
          payRunId,
          type: "NEGATIVE_NET_PAY",
          severity: "CRITICAL",
          explanation: `Employee ${item.employee.email} has negative net pay: ${item.netPay}`,
          suggestedAction: "Check deductions and tax settings.",
        });
      }

      // Rule 2: Missing Tax Status (Technically handled by schema default, but good check)
      if (!item.employee.taxStatus) {
        risks.push({
          tenantId,
          payRunId,
          type: "MISSING_DATA",
          severity: "HIGH",
          explanation: `Employee ${item.employee.email} has no tax status.`,
          suggestedAction: "Update employee profile.",
        });
      }

      // Rule 3: Variance (Mock - check if Gross > 100k as a simple anomaly)
      // Real world would compare to previous run.
      if (Number(item.grossPay) > 10000) {
        risks.push({
          tenantId,
          payRunId,
          type: "HIGH_VARIANCE",
          severity: "MEDIUM",
          explanation: `High gross pay detected: ${item.grossPay}`,
          suggestedAction: "Verify salary amount.",
        });
      }
    }

    // 4. AI Analysis (Phase 8)
    const { InferenceEngine } = await import("./ai/inference");

    // Enhance risks with AI
    // In a real system, we might stream this or do it asynchronously
    // For now, we'll just enrich the explanation
    const enrichedRisks = await Promise.all(
      risks.map(async (risk) => {
        try {
          const analysis = await InferenceEngine.analyzeRisk(
            tenantId,
            risk.type,
            risk,
          );
          return {
            ...risk,
            explanation: `${risk.explanation} [AI: ${analysis.explanation}]`,
            // We could also update severity if AI disagrees, but strictly we shouldn't trust AI over deterministic rules
            // So we just append context.
          };
        } catch (e) {
          console.error("AI Analysis failed", e);
          return risk;
        }
      }),
    );

    // 5. Persist Risks
    if (enrichedRisks.length > 0) {
      await prisma.risk.createMany({
        data: enrichedRisks,
      });
    }

    const criticalCount = enrichedRisks.filter(
      (r) => r.severity === "CRITICAL",
    ).length;
    console.log(
      `Risk Analysis Complete. Found ${enrichedRisks.length} risks (${criticalCount} CRITICAL).`,
    );

    return {
      riskCount: enrichedRisks.length,
      criticalCount,
    };
  }
}
