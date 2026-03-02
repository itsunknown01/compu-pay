import { Worker } from "bullmq";
import { Prisma } from "@prisma/client";
import prisma from "./utils/prisma";
import { calculateNetPay } from "./core/payroll";
import { RiskEngine } from "./core/risk-engine";
import dotenv from "dotenv";
dotenv.config();

import IORedis from "ioredis";

const connection = new IORedis(
  process.env.REDIS_URL || "redis://127.0.0.1:6379",
  {
    maxRetriesPerRequest: null,
  },
);

const worker = new Worker(
  "payroll-queue",
  async (job) => {
    console.log(`Processing job for PayRun: ${job.data.payRunId}`);

    const tenantId = String(job.data.tenantId);
    const payRunId = String(job.data.payRunId);

    try {
      const employees = await prisma.employee.findMany({
        where: { tenantId },
      });

      const items: any[] = [];

      for (const emp of employees) {
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

      await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        await tx.payRunItem.deleteMany({
          where: { payRunId },
        });

        await tx.payRunItem.createMany({
          data: items,
        });

        await tx.payRun.update({
          where: { id: payRunId },
          data: { status: "PREVIEWED" },
        });
      });

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
