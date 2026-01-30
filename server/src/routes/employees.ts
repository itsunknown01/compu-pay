import { Router, Request, Response } from "express";
import prisma from "../utils/prisma";

const router = Router();

// List Employees
router.get("/", async (req: Request, res: Response) => {
  try {
    const tenantId = req.tenantId as string;
    if (!tenantId)
      return res.status(400).json({ error: "Tenant context missing" });

    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 20;
    const skip = (page - 1) * pageSize;

    const [employees, total] = await Promise.all([
      prisma.employee.findMany({
        where: { tenantId },
        skip,
        take: pageSize,
        orderBy: { lastName: "asc" },
      }),
      prisma.employee.count({ where: { tenantId } }),
    ]);

    res.json({
      data: employees,
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

// Get Single Employee
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const tenantId = req.tenantId as string;
    if (!tenantId)
      return res.status(400).json({ error: "Tenant context missing" });

    const employee = await prisma.employee.findFirst({
      where: { id, tenantId },
    });

    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
