"use client";

import { useEmployeeStore } from "@/stores/employee-store";
import { useEmployees } from "@/hooks";
import { DataTable } from "@/components/ui/data-table";
import type { Employee } from "@/lib/types";

export function EmployeeList() {
  const { page, setPage, pageSize } = useEmployeeStore();
  const { data, isLoading, error } = useEmployees();

  const columns = [
    {
      key: "name",
      header: "Name",
      render: (employee: Employee) => (
        <span className="font-medium">
          {employee.firstName} {employee.lastName}
        </span>
      ),
    },
    {
      key: "email",
      header: "Email",
      render: (employee: Employee) => (
        <span className="text-muted-foreground">{employee.email}</span>
      ),
    },
    {
      key: "salary",
      header: "Salary",
      render: (employee: Employee) => (
        <span className="font-mono">
          ${parseFloat(employee.salaryAmount).toLocaleString()}
        </span>
      ),
    },
    {
      key: "taxStatus",
      header: "Tax Status",
      render: (employee: Employee) => (
        <span
          className={employee.taxStatus === "EXEMPT" ? "text-amber-600" : ""}
        >
          {employee.taxStatus}
        </span>
      ),
    },
  ];

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
      emptyMessage="No employees found."
      keyExtractor={(employee) => employee.id}
    />
  );
}
