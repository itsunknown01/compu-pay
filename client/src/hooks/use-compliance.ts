"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { useAuthStore } from "@/lib/auth-store";
import type {
  ComplianceRule,
  Simulation,
  PaginatedResponse,
} from "@/lib/types";
import { useComplianceStore } from "@/stores/compliance-store";



const all = ["compliance"] as const;
const rules = () => [...all, "rules"] as const;

export const complianceKeys = {
  all,
  rules,
  rulesList: (page: number, pageSize: number) =>
    [...rules(), { page, pageSize }] as const,
  rule: (id: string) => [...rules(), id] as const,
  simulations: () => [...all, "simulations"] as const,
};


export function useComplianceRules() {
  const token = useAuthStore((state) => state.token);
  const { page, pageSize } = useComplianceStore();

  return useQuery({
    queryKey: complianceKeys.rulesList(page, pageSize),
    queryFn: async () => {
      const response = await api.get<PaginatedResponse<ComplianceRule>>(
        `/compliance/rules?page=${page}&pageSize=${pageSize}`,
        { token: token! },
      );
      if (response.error) throw new Error(response.error.error);
      return response.data!;
    },
    enabled: !!token,
    placeholderData: (previousData) => previousData,
  });
}


export function useCreateComplianceRule() {
  const token = useAuthStore((state) => state.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (rule: {
      name: string;
      description?: string;
      changes: Record<string, unknown>;
      effectiveDate: string;
    }) => {
      const response = await api.post<ComplianceRule>(
        "/compliance/rules",
        rule,
        { token: token! },
      );
      if (response.error) throw new Error(response.error.error);
      return response.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: complianceKeys.rules() });
    },
  });
}


export function useRunSimulation() {
  const token = useAuthStore((state) => state.token);

  return useMutation({
    mutationFn: async ({
      ruleId,
      payRunId,
    }: {
      ruleId: string;
      payRunId: string;
    }) => {
      const response = await api.post<Simulation>(
        `/compliance/rules/${ruleId}/simulate`,
        { payRunId },
        { token: token! },
      );
      if (response.error) throw new Error(response.error.error);
      return response.data!;
    },
  });
}


export function useComplianceRule(id: string) {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: complianceKeys.rule(id),
    queryFn: async () => {
      const response = await api.get<ComplianceRule>(
        `/compliance/rules/${id}`,
        {
          token: token!,
        },
      );
      if (response.error) throw new Error(response.error.error);
      return response.data!;
    },
    enabled: !!token && !!id,
  });
}


export function useActivateRule() {
  const token = useAuthStore((state) => state.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.post<ComplianceRule>(
        `/compliance/rules/${id}/activate`,
        {},
        { token: token! },
      );
      if (response.error) throw new Error(response.error.error);
      return response.data!;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: complianceKeys.rules() });
      queryClient.invalidateQueries({ queryKey: complianceKeys.rule(data.id) });
    },
  });
}
