import { Router, Request, Response } from "express";
import prisma from "../utils/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { Prisma } from "@prisma/client";

const router = Router();


const registerSchema = z.object({
  tenantName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  tenantId: z.string().optional(),
});


router.post("/register", async (req: Request, res: Response) => {
  try {
    const { tenantName, email, password } = registerSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
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

    res.status(201).json({
      message: "Registered successfully",
      tenantId: result.tenant.id,
      userId: result.user.id,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      
      return res.status(400).json({ errors: (error as any).errors });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email },
      include: { memberships: true },
    });

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: "Invalid credentials" });
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

    res.json({ token, memberships });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: (error as any).errors });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
