import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { AISummaryResponse } from "@/lib/types";

export function useAIStats() {
  const queryInfo = useQuery({
    queryKey: ["ai-stats"],
    queryFn: async () => {
      const { data, error } = await apiClient<AISummaryResponse>(
        "/dashboard/ai-summary",
      );
      if (error) {
        throw new Error(error.error || "Failed to fetch AI stats");
      }
      return data;
    },
  });

  return {
    data: queryInfo.data,
    loading: queryInfo.isLoading,
    error: queryInfo.error,
  };
}
