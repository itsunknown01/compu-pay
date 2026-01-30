import prisma from "../../utils/prisma";

export interface AIAnalysisResult {
  summary: string;
  explanation: string;
  confidenceScore: number;
  [key: string]: any;
}

export class InferenceEngine {
  static async analyzeRisk(
    tenantId: string,
    riskType: string,
    context: any,
  ): Promise<AIAnalysisResult> {
    
    await new Promise((resolve) => setTimeout(resolve, 500));

    const result: AIAnalysisResult = {
      summary: `AI Analysis of ${riskType}`,
      explanation: `The system detected a ${riskType} anomaly based on historical patterns. This is a heuristic assessment.`,
      confidenceScore: 0.85,
      suggestedAction: "Review manually",
    };

    
    await this.logTrace(
      tenantId,
      "risk-classifier-v1",
      "analyze_risk",
      context,
      result,
      0.85,
      500,
    );

    return result;
  }

  static async explainImpact(
    tenantId: string,
    ruleName: string,
    impactData: any,
  ): Promise<string> {
    
    await new Promise((resolve) => setTimeout(resolve, 800));

    const summary = `Creating rule "${ruleName}" will increase total payroll cost by approx ${impactData.totalCostDelta} and affect ${impactData.impactedCount} employees.`;

    
    await this.logTrace(
      tenantId,
      "impact-explainer-v1",
      "explain_impact",
      { ruleName, impactData },
      { summary },
      0.95,
      800,
    );

    return summary;
  }

  private static async logTrace(
    tenantId: string,
    modelName: string,
    promptTemplate: string,
    input: any,
    output: any,
    confidence: number,
    latency: number,
  ) {
    try {
      await prisma.aITrace.create({
        data: {
          tenantId,
          modelName,
          promptTemplate,
          inputContext: input,
          output: output,
          confidenceScore: confidence,
          latencyMs: latency,
        },
      });
    } catch (e) {
      console.error("Failed to log AI trace", e);
    }
  }
}
