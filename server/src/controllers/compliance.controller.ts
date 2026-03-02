import { Request, Response } from "express";
import prisma from "../utils/prisma";
import { z } from "zod";
import { Simulator } from "../core/simulator";
import { ruleSchema } from "../schemas/compliance";
import { logAction } from "../utils/audit";
import {
  sendSuccess,
  sendCreated,
  sendBadRequest,
  sendNotFound,
  sendServerError,
} from "../helpers/response";

export const createRule = async (req: Request, res: Response) => {
  try {
    const { name, description, changes, effectiveDate } = ruleSchema.parse(
      req.body,
    );
    const tenantId = req.tenantId;

    if (!tenantId) {
      return sendBadRequest(res, "Tenant context missing");
    }

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

    await logAction(
      tenantId as string,
      (req as any).user?.id || "system",
      "RULE_CREATE",
      "COMPLIANCE_RULE",
      rule.id,
      { name: rule.name },
      req.ip,
    );

    return sendCreated(res, "Rule created successfully", rule);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return sendBadRequest(res, "Validation failed", (error as any).errors);
    }
    return sendServerError(res, "Failed to create rule", error);
  }
};

export const simulateRule = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { payRunId } = req.body;
    const tenantId = req.tenantId;

    if (!tenantId) {
      return sendBadRequest(res, "Tenant context missing");
    }

    const simulation = await Simulator.simulate(
      String(id),
      String(payRunId),
      String(tenantId),
    );

    return sendSuccess(res, "Simulation completed", simulation);
  } catch (error) {
    return sendServerError(res, "Failed to simulate rule", error);
  }
};

export const activateRule = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const tenantId = req.tenantId as string;
    if (!tenantId) {
      return sendBadRequest(res, "Tenant context missing");
    }

    const rule = await prisma.complianceRule.update({
      where: { id, tenantId },
      data: { status: "ACTIVE" },
    });

    await logAction(
      tenantId as string,
      (req as any).user?.id || "system",
      "RULE_ACTIVATE",
      "COMPLIANCE_RULE",
      id,
      { status: "ACTIVE" },
      req.ip,
    );

    return sendSuccess(res, "Rule activated successfully", rule);
  } catch (error) {
    return sendServerError(res, "Failed to activate rule", error);
  }
};

export const getRuleById = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const tenantId = req.tenantId as string;
    if (!tenantId) {
      return sendBadRequest(res, "Tenant context missing");
    }

    const rule = await prisma.complianceRule.findFirst({
      where: { id, tenantId },
    });

    if (!rule) return sendNotFound(res, "Rule not found");
    return sendSuccess(res, "Rule fetched successfully", rule);
  } catch (error) {
    return sendServerError(res, "Failed to fetch rule", error);
  }
};

export const getRules = async (req: Request, res: Response) => {
  try {
    const tenantId = req.tenantId;
    if (!tenantId) {
      return sendBadRequest(res, "Tenant context missing");
    }

    const rules = await prisma.complianceRule.findMany({
      where: { tenantId: tenantId as any },
    });
    return sendSuccess(res, "Rules fetched successfully", rules);
  } catch (error) {
    return sendServerError(res, "Failed to fetch rules", error);
  }
};
