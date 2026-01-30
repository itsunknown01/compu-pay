import { Decimal } from "@prisma/client/runtime/library";






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
  const grossPay = salary / 12; 
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
