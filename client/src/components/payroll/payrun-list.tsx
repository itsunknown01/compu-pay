"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { usePayruns } from "@/hooks";
import { DataTable } from "@/components/ui/data-table";
import { PayrunStatusBadge } from "@/components/payroll/payrun-status-badge";
import type { PayRun } from "@/lib/types";
import { usePayrunStore } from "@/stores/payrun-store";


export function PayrunList() {
  const router = useRouter();
  const { page, setPage, pageSize } = usePayrunStore();
  const { data, isLoading, error } = usePayruns();

  const columns = [
    {
      key: "id",
      header: "ID",
      render: (payrun: PayRun) => (
        <span className="font-mono text-xs">{payrun.id.slice(0, 8)}...</span>
      ),
    },
    {
      key: "period",
      header: "Pay Period",
      render: (payrun: PayRun) => (
        <span>
          {format(new Date(payrun.periodStart), "MMM d")} -{" "}
          {format(new Date(payrun.periodEnd), "MMM d, yyyy")}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (payrun: PayRun) => <PayrunStatusBadge status={payrun.status} />,
    },
  ];

  const handleRowClick = (payrun: PayRun) => {
    router.push(`/dashboard/payruns/${payrun.id}`);
  };

  return (
    <DataTable
      data={data?.data || []}
      columns={columns}
      loading={isLoading}
      error={error?.message || null}
      page={page}
      pageSize={pageSize}
      total={data?.total || 0}
      onPageChange={setPage}
      onRowClick={handleRowClick}
      emptyMessage="No payruns found. Create your first payrun to get started."
      keyExtractor={(payrun) => payrun.id}
    />
  );
}
