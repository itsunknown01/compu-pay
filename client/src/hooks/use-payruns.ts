"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { useAuthStore } from "@/lib/auth-store";
import type { PayRun, Risk, PaginatedResponse } from "@/lib/types";


export const payrunKeys = {
  all: ["payruns"] as const,
  lists: () => [...payrunKeys.all, "list"] as const,
  list: (page: number, pageSize: number) =>
    [...payrunKeys.lists(), { page, pageSize }] as const,
  details: () => [...payrunKeys.all, "detail"] as const,
  detail: (id: string) => [...payrunKeys.details(), id] as const,
  risks: (id: string) => [...payrunKeys.detail(id), "risks"] as const,
};

import { usePayrunStore } from "@/stores/payrun-store";

export function usePayruns(customPage?: number, customPageSize?: number) {
  const token = useAuthStore((state) => state.token);
  const store = usePayrunStore();

  const page = customPage ?? store.page;
  const pageSize = customPageSize ?? store.pageSize;

  return useQuery({
    queryKey: payrunKeys.list(page, pageSize),
    queryFn: async () => {
      const response = await api.get<PaginatedResponse<PayRun>>(
        `/payruns?page=${page}&pageSize=${pageSize}`,
        { token: token! },
      );
      if (response.error) throw new Error(response.error.error);
      return response.data!;
    },
    enabled: !!token,
    placeholderData: (previousData) => previousData,
  });
}


export function usePayrun(id: string | null) {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: payrunKeys.detail(id!),
    queryFn: async () => {
      const response = await api.get<PayRun>(`/payruns/${id}`, {
        token: token!,
      });
      if (response.error) throw new Error(response.error.error);
      return response.data!;
    },
    enabled: !!token && !!id,
  });
}


export function usePayrunRisks(payrunId: string | null) {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: payrunKeys.risks(payrunId!),
    queryFn: async () => {
      const response = await api.get<Risk[]>(`/payruns/${payrunId}/risks`, {
        token: token!,
      });
      if (response.error) throw new Error(response.error.error);
      return response.data!;
    },
    enabled: !!token && !!payrunId,
  });
}


export function useCreateDraftPayrun() {
  const token = useAuthStore((state) => state.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      periodStart,
      periodEnd,
    }: {
      periodStart: string;
      periodEnd: string;
    }) => {
      const response = await api.post<PayRun>(
        "/payruns/draft",
        { periodStart, periodEnd },
        { token: token! },
      );
      if (response.error) throw new Error(response.error.error);
      return response.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: payrunKeys.lists() });
    },
  });
}


export function useTriggerPreview() {
  const token = useAuthStore((state) => state.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payrunId: string) => {
      const response = await api.post<{ jobId: string }>(
        `/payruns/${payrunId}/preview`,
        {},
        { token: token! },
      );
      if (response.error) throw new Error(response.error.error);
      return response.data!;
    },
    onSuccess: (_, payrunId) => {
      queryClient.invalidateQueries({ queryKey: payrunKeys.detail(payrunId) });
    },
  });
}


export function useApprovePayrun() {
  const token = useAuthStore((state) => state.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payrunId: string) => {
      const response = await api.post<PayRun>(
        `/payruns/${payrunId}/approve`,
        {},
        { token: token! },
      );
      if (response.error) throw new Error(response.error.error);
      return response.data!;
    },
    onSuccess: (_, payrunId) => {
      queryClient.invalidateQueries({ queryKey: payrunKeys.detail(payrunId) });
      queryClient.invalidateQueries({ queryKey: payrunKeys.lists() });
    },
  });
}
