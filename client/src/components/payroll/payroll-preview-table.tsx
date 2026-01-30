"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PayrollPreviewTableProps {
  data: Record<string, unknown>[]; // Replace with specific preview item type if available
  loading?: boolean;
}

/**
 * PayrollPreviewTable - Displays the calculated payroll preview
 *
 * Shows detailed breakdown of:
 * - Gross Pay
 * - Taxes
 * - Deductions
 * - Net Pay
 */
export function PayrollPreviewTable({
  data,
  loading,
}: PayrollPreviewTableProps) {
  // This would typically take a list of generated payslips/preview items
  // For this phase, we'll placeholder it as the backend preview structure is needed

  if (loading) {
    return <div className="p-4 text-center">Loading preview data...</div>;
  }

  if (!data || data.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        No preview data available yet. Run a calculation first.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead className="text-right">Gross Pay</TableHead>
            <TableHead className="text-right">Taxes</TableHead>
            <TableHead className="text-right">Net Pay</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Placeholder rows */}
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell className="text-right">$5,000.00</TableCell>
            <TableCell className="text-right">$1,200.00</TableCell>
            <TableCell className="text-right font-medium">$3,800.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
