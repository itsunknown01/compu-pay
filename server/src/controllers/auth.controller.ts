import { Request, Response } from "express";
import prisma from "../utils/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { registerSchema, loginSchema } from "../schemas/auth";
import {
  sendCreated,
  sendBadRequest,
  sendServerError,
  sendUnauthorized,
  sendSuccess,
} from "../helpers/response";

export const register = async (req: Request, res: Response) => {
  try {
    const { tenantName, email, password } = registerSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return sendBadRequest(res, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const tenant = await tx.tenant.create({
          data: { name: tenantName },
        });

        const user = await tx.user.create({
          data: {
            email,
            passwordHash: hashedPassword,
          },
        });

        await tx.membership.create({
          data: {
            userId: user.id,
            tenantId: tenant.id,
            role: "ADMIN",
          },
        });

        return { tenant, user };
      },
    );

    return sendCreated(res, "Registered successfully", {
      tenantId: result.tenant.id,
      userId: result.user.id,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return sendBadRequest(res, "Validation failed", (error as any).errors);
    }
    return sendServerError(res, "Failed to register user", error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email },
      include: { memberships: true },
    });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return sendUnauthorized(res, "Invalid credentials");
    }

    const token = jwt.sign(
      { sub: user.id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "24h" },
    );

    const memberships = user.memberships.map((m: any) => ({
      tenantId: m.tenantId,
      role: m.role,
    }));

    return sendSuccess(res, "Login successful", { token, memberships });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return sendBadRequest(res, "Validation failed", (error as any).errors);
    }
    return sendServerError(res, "Failed to login", error);
  }
};
