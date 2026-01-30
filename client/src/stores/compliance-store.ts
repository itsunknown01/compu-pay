import { create } from "zustand";

import { Simulation } from "@/lib/types";

interface ComplianceState {
  page: number;
  pageSize: number;
  activeSimulation: Simulation | null;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setActiveSimulation: (simulation: Simulation | null) => void;
  reset: () => void;
}

export const useComplianceStore = create<ComplianceState>((set) => ({
  page: 1,
  pageSize: 10,
  activeSimulation: null,
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: 1 }), // Reset to page 1 on page size change
  setActiveSimulation: (activeSimulation) => set({ activeSimulation }),
  reset: () => set({ page: 1, pageSize: 10, activeSimulation: null }),
}));
