"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { useAuthStore } from "@/lib/auth-store";
import type { Employee, PaginatedResponse } from "@/lib/types";

// Query keys for cache management
export const employeeKeys = {
  all: ["employees"] as const,
  lists: () => [...employeeKeys.all, "list"] as const,
  list: (page: number, pageSize: number) =>
    [...employeeKeys.lists(), { page, pageSize }] as const,
  details: () => [...employeeKeys.all, "detail"] as const,
  detail: (id: string) => [...employeeKeys.details(), id] as const,
};

import { useEmployeeStore } from "@/stores/employee-store";

/**
 * Hook to fetch paginated employees list
 */
export function useEmployees() {
  const token = useAuthStore((state) => state.token);
  const { page, pageSize } = useEmployeeStore();

  return useQuery({
    queryKey: employeeKeys.list(page, pageSize),
    queryFn: async () => {
      const response = await api.get<PaginatedResponse<Employee>>(
        `/employees?page=${page}&pageSize=${pageSize}`,
        { token: token! },
      );
      if (response.error) throw new Error(response.error.error);
      return response.data!;
    },
    enabled: !!token,
    placeholderData: (previousData) => previousData,
  });
}

/**
 * Hook to fetch a single employee by ID
 */
export function useEmployee(id: string | null) {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: employeeKeys.detail(id!),
    queryFn: async () => {
      const response = await api.get<Employee>(`/employees/${id}`, {
        token: token!,
      });
      if (response.error) throw new Error(response.error.error);
      return response.data!;
    },
    enabled: !!token && !!id,
  });
}
