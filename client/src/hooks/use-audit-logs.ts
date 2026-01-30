import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { AuditLog, PaginatedResponse } from "@/lib/types";
import { useAuditStore } from "@/stores/audit-store";

export function useAuditLogs() {
  const { page, filters } = useAuditStore();
  const pageSize = 20;

  return useQuery({
    queryKey: ["audit-logs", page, pageSize, filters],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
      });

      if (filters.action && filters.action !== "ALL") {
        params.append("action", filters.action);
      }
      if (filters.resourceType && filters.resourceType !== "ALL") {
        params.append("resourceType", filters.resourceType);
      }
      if (filters.startDate) {
        params.append("startDate", filters.startDate);
      }
      if (filters.endDate) {
        params.append("endDate", filters.endDate);
      }

      const { data, error } = await apiClient<PaginatedResponse<AuditLog>>(
        `/audit/logs?${params.toString()}`,
      );

      if (error) {
        throw new Error(error.error || "Failed to fetch audit logs");
      }

      return data;
    },
    placeholderData: (previousData) => previousData, 
  });
}
