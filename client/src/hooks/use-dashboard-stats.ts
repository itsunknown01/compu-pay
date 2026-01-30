import { usePayruns } from "@/hooks";
import { useMemo } from "react";

export interface DashboardStats {
  totalPayruns: number;
  pendingApproval: number;
  approved: number;
  drafts: number;
}

export function useDashboardStats() {
  const { data, isLoading, error } = usePayruns(1, 100); // Fetching more to get better stats representation locally

  const stats: DashboardStats = useMemo(() => {
    if (!data?.data) {
      return {
        totalPayruns: 0,
        pendingApproval: 0,
        approved: 0,
        drafts: 0,
      };
    }

    return {
      totalPayruns: data.total,
      pendingApproval: data.data.filter((p) => p.status === "REVIEWED").length,
      approved: data.data.filter((p) => p.status === "APPROVED").length,
      drafts: data.data.filter((p) => p.status === "DRAFT").length,
    };
  }, [data]);

  return {
    stats,
    isLoading,
    error,
  };
}
