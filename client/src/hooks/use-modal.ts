"use client";

import { create } from "zustand";
import { LucideIcon } from "lucide-react";

export type ModalType =
  | "schedule_demo"
  | "product_detail"
  | "request_info"
  | "service_detail"
  | "free_trial"
  | "ai_insights";

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  category: string;
  features: string[];
  color: string;
}

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  progress: number;
  price: string;
  rating: number;
}

interface ModalData {
  product?: Product;
  service?: Service;
}

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data: ModalData;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  isOpen: false,
  type: null,
  data: {},
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false }),
}));
