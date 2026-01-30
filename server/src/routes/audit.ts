import { Router, Request, Response } from "express";
import prisma from "../utils/prisma";

const router = Router();


router.get("/logs", async (req: Request, res: Response) => {
  try {
    const tenantId = req.tenantId as string; 
    if (!tenantId)
      return res.status(400).json({ error: "Tenant context missing" });

    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 20;
    const skip = (page - 1) * pageSize;

    
    const action = req.query.action as string;
    const resourceType = req.query.resourceType as string;
    const startDate = req.query.startDate as string;
    const endDate = req.query.endDate as string;

    const where: any = { tenantId };

    if (action) where.action = { startsWith: String(action) };
    if (resourceType) where.resourceType = String(resourceType);
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(String(startDate));
      if (endDate) where.createdAt.lte = new Date(String(endDate));
    }

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
      }),
      prisma.auditLog.count({ where }),
    ]);

    res.json({
      data: logs,
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


router.get("/logs/:id", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const tenantId = req.tenantId as string;

    if (!tenantId)
      return res.status(400).json({ error: "Tenant context missing" });

    const log = await prisma.auditLog.findFirst({
      where: { id, tenantId },
    });

    if (!log) return res.status(404).json({ error: "Audit log not found" });

    res.json(log);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
