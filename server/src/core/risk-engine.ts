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

    
    const items = await prisma.payRunItem.findMany({
      where: { payRunId },
      include: { employee: true },
    });

    const risks: any[] = [];

    
    for (const item of items) {
      
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

    
    const { InferenceEngine } = await import("./ai/inference");

    
    
    
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
            
            
          };
        } catch (e) {
          console.error("AI Analysis failed", e);
          return risk;
        }
      }),
    );

    
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
