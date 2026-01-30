import { create } from "zustand";

export interface AuditFilters {
  action?: string;
  resourceType?: string;
  startDate?: string;
  endDate?: string;
}

interface AuditState {
  page: number;
  filters: AuditFilters;
  setPage: (page: number) => void;
  setFilters: (filters: AuditFilters) => void;
  reset: () => void;
}

export const useAuditStore = create<AuditState>((set) => ({
  page: 1,
  filters: {},
  setPage: (page) => set({ page }),
  setFilters: (filters) => set({ filters, page: 1 }), 
  reset: () => set({ page: 1, filters: {} }),
}));
