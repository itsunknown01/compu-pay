import { z } from "zod";

export const ruleSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  changes: z.object({
    taxRate: z.number().optional(),
  }),
  effectiveDate: z.string().datetime("Invalid date format"),
});
