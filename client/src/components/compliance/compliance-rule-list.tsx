"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useComplianceRules } from "@/hooks";
import { DataTable } from "@/components/ui/data-table";
import { RuleStatusBadge } from "./rule-status-badge";
import type { ComplianceRule } from "@/lib/types";

import { useComplianceStore } from "@/stores/compliance-store";

/**
 * ComplianceRuleList - Displays paginated list of compliance rules
 */
export function ComplianceRuleList() {
  const router = useRouter();
  const { page, setPage, pageSize } = useComplianceStore();
  const { data, isLoading, error } = useComplianceRules();

  const columns = [
    {
      key: "name",
      header: "Rule Name",
      render: (rule: ComplianceRule) => (
        <span className="font-medium">{rule.name}</span>
      ),
    },
    {
      key: "description",
      header: "Description",
      render: (rule: ComplianceRule) => (
        <span className="text-muted-foreground text-sm truncate max-w-xs block">
          {rule.description || "—"}
        </span>
      ),
    },
    {
      key: "effectiveDate",
      header: "Effective Date",
      render: (rule: ComplianceRule) => (
        <span className="text-sm">
          {format(new Date(rule.effectiveDate), "MMM d, yyyy")}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (rule: ComplianceRule) => (
        <RuleStatusBadge status={rule.status} />
      ),
    },
  ];

  const handleRowClick = (rule: ComplianceRule) => {
    router.push(`/dashboard/dashboard/compliance/${rule.id}`);
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
      emptyMessage="No compliance rules found. Create your first rule to get started."
      keyExtractor={(rule) => rule.id}
      onRowClick={handleRowClick}
    />
  );
}
