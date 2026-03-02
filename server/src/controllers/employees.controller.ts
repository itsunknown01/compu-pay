import { Request, Response } from "express";
import prisma from "../utils/prisma";
import {
  sendSuccess,
  sendBadRequest,
  sendNotFound,
  sendServerError,
} from "../helpers/response";

export const getEmployees = async (req: Request, res: Response) => {
  try {
    const tenantId = req.tenantId as string;
    if (!tenantId) {
      return sendBadRequest(res, "Tenant context missing");
    }

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

    return sendSuccess(res, "Employees fetched successfully", {
      data: employees,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    return sendServerError(res, "Failed to fetch employees", error);
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const tenantId = req.tenantId as string;
    if (!tenantId) {
      return sendBadRequest(res, "Tenant context missing");
    }

    const employee = await prisma.employee.findFirst({
      where: { id, tenantId },
    });

    if (!employee) return sendNotFound(res, "Employee not found");
    return sendSuccess(res, "Employee fetched successfully", employee);
  } catch (error) {
    return sendServerError(res, "Failed to fetch employee", error);
  }
};
