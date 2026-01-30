import { Decimal } from "@prisma/client/runtime/library";

// We need to match Prisma Decimal type or use string/number and convert.
// Since this is core logic, best to work with numbers/Big.js, but Prisma uses Decimal.js.
// For simplicity in this plan, accessing Decimal from prisma client runtime or just using number for mock.
// "Decimal" is strictly typed in Prisma.

export interface CalculationResult {
  grossPay: number;
  taxDeductions: number;
  netPay: number;
}

export const calculateNetPay = (
  salary: number,
  taxStatus: string,
  overrides?: { taxRate?: number },
): CalculationResult => {
  const grossPay = salary / 12; // Monthly
  let taxRate = 0;

  if (overrides?.taxRate !== undefined) {
    taxRate = overrides.taxRate;
  } else if (taxStatus === "STANDARD") {
    taxRate = 0.3;
  } else if (taxStatus === "EXEMPT") {
    taxRate = 0.0;
  }

  const taxDeductions = grossPay * taxRate;
  const netPay = grossPay - taxDeductions;

  return {
    grossPay: parseFloat(grossPay.toFixed(2)),
    taxDeductions: parseFloat(taxDeductions.toFixed(2)),
    netPay: parseFloat(netPay.toFixed(2)),
  };
};
