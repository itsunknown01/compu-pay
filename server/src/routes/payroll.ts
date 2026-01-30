import { Router, Request, Response } from "express";
import prisma from "../utils/prisma";
import { z } from "zod";
import { payrollQueue } from "../utils/queue";

const router = Router();

const draftSchema = z.object({
  periodStart: z
    .string()
    .datetime()
    .or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)), 
  periodEnd: z
    .string()
    .datetime()
    .or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
});


router.get("/", async (req: Request, res: Response) => {
  try {
    const tenantId = req.tenantId as string;
    if (!tenantId)
      return res.status(400).json({ error: "Tenant context missing" });

    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const skip = (page - 1) * pageSize;

    const [payRuns, total] = await Promise.all([
      prisma.payRun.findMany({
        where: { tenantId },
        skip,
        take: pageSize,
        orderBy: { periodStart: "desc" },
      }),
      prisma.payRun.count({ where: { tenantId } }),
    ]);

    res.json({
      data: payRuns,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const tenantId = req.tenantId as string;
    if (!tenantId)
      return res.status(400).json({ error: "Tenant context missing" });

    const payRun = await prisma.payRun.findFirst({
      where: { id, tenantId },
    });

    if (!payRun) return res.status(404).json({ error: "PayRun not found" });

    
    
    
    
    res.json(payRun);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/:id/risks", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const tenantId = req.tenantId;

    if (!tenantId)
      return res.status(400).json({ error: "Tenant context missing" });

    
    const risks = await prisma.risk.findMany({
      where: { payRunId: String(id) } as any,
    });

    res.json(risks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post("/draft", async (req: Request, res: Response) => {
  try {
    const { periodStart, periodEnd } = draftSchema.parse(req.body);
    const tenantId = req.tenantId;

    if (!tenantId)
      return res.status(400).json({ error: "Tenant context missing" });

    const payRun = await prisma.payRun.create({
      data: {
        tenantId,
        periodStart: new Date(periodStart),
        periodEnd: new Date(periodEnd),
        status: "DRAFT",
      },
    });

    res.status(201).json(payRun);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: (error as any).errors });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post("/:id/preview", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const tenantId = req.tenantId;

    if (!id) return res.status(400).json({ error: "ID required" });

    
    const payRun = await prisma.payRun.findFirst({
      where: { id, tenantId },
    });

    if (!payRun) return res.status(404).json({ error: "PayRun not found" });
    if (payRun.status === "APPROVED")
      return res.status(400).json({ error: "Already approved" });

    
    await prisma.payRun.update({
      where: { id: id },
      data: { status: "QUEUED" },
    });

    
    const { CircuitBreaker } = await import("../utils/circuit-breaker");
    
    const breaker = new CircuitBreaker({
      failureThreshold: 3,
      resetTimeout: 5000,
    });

    await breaker.execute(() =>
      payrollQueue.add("calculate-payrun", {
        tenantId,
        payRunId: id,
      }),
    );

    res.status(202).json({ message: "Calculation queued", status: "QUEUED" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post("/:id/approve", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const tenantId = req.tenantId;

    if (!id) return res.status(400).json({ error: "ID required" });

    const payRun = await prisma.payRun.findFirst({
      where: { id, tenantId },
    });

    if (!payRun) return res.status(404).json({ error: "PayRun not found" });
    if (payRun.status !== "PREVIEWED" && payRun.status !== "REVIEWED") {
      return res
        .status(400)
        .json({ error: "PayRun must be previewed/reviewed first" });
    }

    
    const criticalRisks = await prisma.risk.count({
      where: {
        payRunId: id,
        severity: "CRITICAL",
      },
    });

    if (criticalRisks > 0) {
      return res.status(409).json({
        error: "Cannot approve PayRun with CRITICAL risks",
        criticalRiskCount: criticalRisks,
      });
    }

    const approved = await prisma.payRun.update({
      where: { id: id },
      data: { status: "APPROVED" },
    });

    
    const { logAction } = await import("../utils/audit");
    await logAction(
      tenantId as string,
      
      (req as any).user?.id || "system",
      "PAYROLL_APPROVE",
      "PAYRUN",
      id,
      { status: "APPROVED" },
      req.ip,
    );

    res.json(approved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
