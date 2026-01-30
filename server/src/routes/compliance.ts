import { Router, Request, Response } from "express";
import prisma from "../utils/prisma";
import { z } from "zod";
import { Simulator } from "../core/simulator";

const router = Router();

const ruleSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  changes: z.object({
    taxRate: z.number().optional(),
  }),
  effectiveDate: z.string().datetime(),
});


router.post("/rules", async (req: Request, res: Response) => {
  try {
    const { name, description, changes, effectiveDate } = ruleSchema.parse(
      req.body,
    );
    const tenantId = req.tenantId;

    if (!tenantId)
      return res.status(400).json({ error: "Tenant context missing" });

    const rule = await prisma.complianceRule.create({
      data: {
        tenantId: tenantId as any,
        name,
        description,
        changes,
        effectiveDate: new Date(effectiveDate),
        status: "DRAFT",
      },
    });

    
    const { logAction } = await import("../utils/audit");
    await logAction(
      tenantId as string,
      (req as any).user?.id || "system",
      "RULE_CREATE",
      "COMPLIANCE_RULE",
      rule.id,
      { name: rule.name },
      req.ip,
    );

    res.status(201).json(rule);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: (error as any).errors });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post("/rules/:id/simulate", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { payRunId } = req.body;
    const tenantId = req.tenantId;

    if (!tenantId)
      return res.status(400).json({ error: "Tenant context missing" });

    
    const simulation = await Simulator.simulate(
      String(id),
      String(payRunId),
      String(tenantId),
    );

    res.json(simulation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.put("/rules/:id/activate", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const tenantId = req.tenantId as string;
    if (!tenantId)
      return res.status(400).json({ error: "Tenant context missing" });

    const rule = await prisma.complianceRule.update({
      where: { id, tenantId },
      data: { status: "ACTIVE" },
    });

    
    const { logAction } = await import("../utils/audit");
    await logAction(
      tenantId as string,
      (req as any).user?.id || "system",
      "RULE_ACTIVATE",
      "COMPLIANCE_RULE",
      id,
      { status: "ACTIVE" },
      req.ip,
    );

    res.json(rule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/rules/:id", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const tenantId = req.tenantId as string;
    if (!tenantId)
      return res.status(400).json({ error: "Tenant context missing" });

    const rule = await prisma.complianceRule.findFirst({
      where: { id, tenantId },
    });

    if (!rule) return res.status(404).json({ error: "Rule not found" });
    res.json(rule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/rules", async (req: Request, res: Response) => {
  try {
    const tenantId = req.tenantId;
    if (!tenantId)
      return res.status(400).json({ error: "Tenant context missing" });

    const rules = await prisma.complianceRule.findMany({
      where: { tenantId: tenantId as any },
    });
    res.json(rules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
