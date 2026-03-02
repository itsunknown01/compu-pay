import { Request, Response } from "express";
import prisma from "../utils/prisma";
import { z } from "zod";
import { payrollQueue } from "../utils/queue";
import { draftSchema } from "../schemas/payroll";
import { CircuitBreaker } from "../utils/circuit-breaker";
import { logAction } from "../utils/audit";
import {
  sendSuccess,
  sendCreated,
  sendBadRequest,
  sendNotFound,
  sendServerError,
} from "../helpers/response";

export const getPayRuns = async (req: Request, res: Response) => {
  try {
    const tenantId = req.tenantId as string;
    if (!tenantId) {
      return sendBadRequest(res, "Tenant context missing");
    }

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

    return sendSuccess(res, "PayRuns fetched successfully", {
      data: payRuns,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    return sendServerError(res, "Failed to fetch payruns", error);
  }
};

export const getPayRunById = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const tenantId = req.tenantId as string;
    if (!tenantId) {
      return sendBadRequest(res, "Tenant context missing");
    }

    const payRun = await prisma.payRun.findFirst({
      where: { id, tenantId },
    });

    if (!payRun) {
      return sendNotFound(res, "PayRun not found");
    }

    return sendSuccess(res, "PayRun fetched successfully", payRun);
  } catch (error) {
    return sendServerError(res, "Failed to fetch payrun", error);
  }
};

export const getPayRunRisks = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const tenantId = req.tenantId;
    if (!tenantId) {
      return sendBadRequest(res, "Tenant context missing");
    }

    const risks = await prisma.risk.findMany({
      where: { payRunId: String(id) } as any,
    });

    return sendSuccess(res, "Risks fetched successfully", risks);
  } catch (error) {
    return sendServerError(res, "Failed to fetch risks", error);
  }
};

export const createDraft = async (req: Request, res: Response) => {
  try {
    const { periodStart, periodEnd } = draftSchema.parse(req.body);
    const tenantId = req.tenantId;

    if (!tenantId) {
      return sendBadRequest(res, "Tenant context missing");
    }

    const payRun = await prisma.payRun.create({
      data: {
        tenantId,
        periodStart: new Date(periodStart),
        periodEnd: new Date(periodEnd),
        status: "DRAFT",
      },
    });

    return sendCreated(res, "Draft created successfully", payRun);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return sendBadRequest(res, "Validation failed", (error as any).errors);
    }
    return sendServerError(res, "Failed to create draft", error);
  }
};

export const queuePreview = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const tenantId = req.tenantId;

    if (!id) return sendBadRequest(res, "ID required");
    if (!tenantId) return sendBadRequest(res, "Tenant context missing");

    const payRun = await prisma.payRun.findFirst({
      where: { id, tenantId },
    });

    if (!payRun) return sendNotFound(res, "PayRun not found");
    if (payRun.status === "APPROVED") {
      return sendBadRequest(res, "Already approved");
    }

    await prisma.payRun.update({
      where: { id: id },
      data: { status: "QUEUED" },
    });

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

    return res
      .status(202)
      .json({ message: "Calculation queued", status: "QUEUED" });
  } catch (error) {
    return sendServerError(res, "Failed to queue preview", error);
  }
};

export const approvePayRun = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const tenantId = req.tenantId;

    if (!id) return sendBadRequest(res, "ID required");
    if (!tenantId) return sendBadRequest(res, "Tenant context missing");

    const payRun = await prisma.payRun.findFirst({
      where: { id, tenantId },
    });

    if (!payRun) return sendNotFound(res, "PayRun not found");
    if (payRun.status !== "PREVIEWED" && payRun.status !== "REVIEWED") {
      return sendBadRequest(res, "PayRun must be previewed/reviewed first");
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

    await logAction(
      tenantId as string,
      (req as any).user?.id || "system",
      "PAYROLL_APPROVE",
      "PAYRUN",
      id,
      { status: "APPROVED" },
      req.ip,
    );

    return sendSuccess(res, "PayRun approved successfully", approved);
  } catch (error) {
    return sendServerError(res, "Failed to approve payrun", error);
  }
};
