import { create } from "zustand";

interface PayrunState {
  page: number;
  pageSize: number;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  reset: () => void;
}

export const usePayrunStore = create<PayrunState>((set) => ({
  page: 1,
  pageSize: 10,
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: 1 }), 
  reset: () => set({ page: 1, pageSize: 10 }),
}));
