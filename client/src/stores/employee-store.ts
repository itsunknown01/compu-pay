import { create } from "zustand";

interface EmployeeState {
  page: number;
  pageSize: number;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  reset: () => void;
}

export const useEmployeeStore = create<EmployeeState>((set) => ({
  page: 1,
  pageSize: 20,
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: 1 }), 
  reset: () => set({ page: 1, pageSize: 20 }),
}));
