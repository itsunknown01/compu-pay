"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Membership } from "@/lib/types";



interface User {
  id: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  memberships: Membership[];
  activeTenantId: string | null;

  
  login: (token: string, memberships: Membership[]) => void;
  logout: () => void;
  setActiveTenant: (tenantId: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      user: null,
      memberships: [],
      activeTenantId: null,

      login: (token, memberships) => {
        
        const user = decodeUserFromToken(token);
        const activeTenantId =
          memberships[0]?.tenantId || "default-tenant-id-for-dev"; 

        set({
          isAuthenticated: true,
          token,
          user,
          memberships,
          activeTenantId,
        });
      },

      logout: () => {
        set({
          isAuthenticated: false,
          token: null,
          user: null,
          memberships: [],
          activeTenantId: null,
        });
      },

      setActiveTenant: (tenantId) => {
        set({ activeTenantId: tenantId });
      },
    }),
    {
      name: "compupay-auth",
      storage: createJSONStorage(() => sessionStorage), 
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        user: state.user,
        memberships: state.memberships,
        activeTenantId: state.activeTenantId,
      }),
    },
  ),
);


function decodeUserFromToken(token: string): User | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payload = parts[1];
    const decoded = atob(payload);
    const data = JSON.parse(decoded);

    return {
      id: data.sub || "",
      email: data.email || "",
    };
  } catch {
    return null;
  }
}


export function useAuthToken(): string | null {
  return useAuthStore((state) => state.token);
}


export function useIsAuthenticated(): boolean {
  return useAuthStore((state) => state.isAuthenticated);
}


export function useActiveTenantId(): string | null {
  return useAuthStore((state) => state.activeTenantId);
}
