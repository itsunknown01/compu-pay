import { Worker } from "bullmq";
import { Prisma } from "@prisma/client";
import prisma from "./utils/prisma";
import { calculateNetPay } from "./core/payroll";
import { RiskEngine } from "./core/risk-engine";
import dotenv from "dotenv";
dotenv.config();

const connection = {
  url: process.env.REDIS_URL || "redis://127.0.0.1:6379",
};

const worker = new Worker(
  "payroll-queue",
  async (job) => {
    console.log(`Processing job for PayRun: ${job.data.payRunId}`);

    // Explicitly cast to string to ensure types
    const tenantId = String(job.data.tenantId);
    const payRunId = String(job.data.payRunId);

    try {
      // 1. Fetch Employees
      const employees = await prisma.employee.findMany({
        where: { tenantId },
      });

      // Fallback to any[] to avoid missing generated type issues
      const items: any[] = [];

      // 2. Calculate for each
      for (const emp of employees) {
        // Convert Decimal to number for calculation
        const salary = Number(emp.salaryAmount);
        const result = calculateNetPay(salary, emp.taxStatus);

        items.push({
          payRunId,
          employeeId: emp.id,
          grossPay: result.grossPay,
          taxDeductions: result.taxDeductions,
          netPay: result.netPay,
        });
      }

      // 3. Save Results (Transaction)
      // ... transaction handles payRunItem creation and status update ...
      await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        // Clear existing items if re-run
        await tx.payRunItem.deleteMany({
          where: { payRunId },
        });

        // Clear existing risks if re-run
        // Note: Prisma doesn't have a direct 'risk' delegate on tx if not typed, but we can use prisma.risk outside or ignore for now if risk engine runs after.
        // Actually, better to run risk engine strictly *after* calculation is committed.

        await tx.payRunItem.createMany({
          data: items,
        });

        await tx.payRun.update({
          where: { id: payRunId },
          data: { status: "PREVIEWED" },
        });
      });

      // 4. Run Risk Engine (Post-Calculation)
      await RiskEngine.analyze(payRunId, tenantId);

      // 4. Run Risk Engine (Post-Calculation)
      await RiskEngine.analyze(payRunId, tenantId);

      console.log(`Job completed for PayRun: ${payRunId}`);
    } catch (error) {
      console.error("Job failed:", error);
      throw error;
    }
  },
  { connection },
);

console.log("Worker started...");
