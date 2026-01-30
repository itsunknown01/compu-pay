import { Router, Request, Response } from "express";
import prisma from "../utils/prisma";

const router = Router();

router.get("/ai-summary", async (req: Request, res: Response) => {
  try {
    const tenantId = req.tenantId;
    if (!tenantId) {
      return res.status(400).json({ error: "Tenant context missing" });
    }

    // 1. Fetch active risks (unresolved)
    // In a real app, risks might have a status. For now, we'll fetch all risks for active payruns.
    // Assuming risks are always "active" if they exist, or we filter by severity.
    const activeRisks = await prisma.risk.findMany({
      where: {
        tenantId: tenantId as any,
        // In reality, we'd filter by status != 'RESOLVED'.
        // For MVP, valid risks are considered active.
      },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    const activeRiskCount = await prisma.risk.count({
      where: { tenantId: tenantId as any },
    });

    // 2. Fetch recent compliance rules (as a proxy for compliance activity)
    const recentRules = await prisma.complianceRule.findMany({
      where: { tenantId: tenantId as any },
      orderBy: { createdAt: "desc" },
      take: 3,
    });

    // 3. Calculate System Health Score
    // Base 100
    // -10 for each CRITICAL risk
    // -5 for each HIGH risk
    // -2 for each MEDIUM risk
    const allRisks = await prisma.risk.findMany({
      where: { tenantId: tenantId as any },
      select: { severity: true },
    });

    let healthScore = 100;
    allRisks.forEach((r) => {
      if (r.severity === "CRITICAL") healthScore -= 10;
      else if (r.severity === "HIGH") healthScore -= 5;
      else if (r.severity === "MEDIUM") healthScore -= 2;
    });
    healthScore = Math.max(0, Math.min(100, healthScore)); // Clamp 0-100

    // 4. Transform to Insights format
    interface InsightItem {
      id: string;
      type: string;
      message: string;
      confidence: number;
      link: string;
      time: string;
      createdAt: Date;
    }

    const insights: InsightItem[] = [];

    // Map Risks to Insights
    activeRisks.forEach((risk) => {
      insights.push({
        id: risk.id,
        type: "risk",
        message: `${risk.severity} Risk: ${risk.type}`, // using 'type' as summary based on schema
        confidence: (risk as any).confidence || 0.9, // Mock if missing column
        link: `/dashboard/payruns/${risk.payRunId}/risks`,
        time: new Date(risk.createdAt).toLocaleDateString(),
        createdAt: risk.createdAt,
      });
    });

    // Map Rules to Insights
    recentRules.forEach((rule) => {
      insights.push({
        id: rule.id,
        type: "compliance",
        message: `New Rule: ${rule.name}`,
        confidence: 1.0, // Rules are deterministic
        link: `/dashboard/compliance`,
        time: new Date(rule.createdAt).toLocaleDateString(),
        createdAt: rule.createdAt,
      });
    });

    // Sort combined insights by date
    insights.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    res.json({
      systemHealth: healthScore,
      activeRisks: activeRiskCount,
      insights: insights.slice(0, 5), // Top 5
    });
  } catch (error) {
    console.error("Failed to fetch AI summary", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
