import { Queue } from "bullmq";

export const payrollQueue = new Queue("payroll-queue", {
  connection: {
    url: process.env.REDIS_URL || "redis://127.0.0.1:6379",
  },
});
