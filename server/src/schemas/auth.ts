import { z } from "zod";

export const registerSchema = z.object({
  tenantName: z.string().min(1, "Tenant name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  tenantId: z.string().optional(),
});
