"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Membership } from "@/lib/types";

/**
 * Auth Store - Client-side auth state management
 *
 * IMPORTANT SECURITY NOTES:
 * - This stores the JWT token in sessionStorage (cleared on browser close)
 * - For production, consider using httpOnly cookies set by the backend
 * - The token is used for API calls via Authorization header
 * - Sensitive data should never be stored client-side
 */

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

  // Actions
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
        // Decode basic user info from JWT (non-sensitive)
        const user = decodeUserFromToken(token);
        const activeTenantId =
          memberships[0]?.tenantId || "default-tenant-id-for-dev"; // Fallback for dev

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
      storage: createJSONStorage(() => sessionStorage), // Use sessionStorage for security
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

/**
 * Decode user info from JWT token (does NOT verify signature)
 * Only for reading non-sensitive data like user ID.
 */
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

/**
 * Hook to get current auth token (for API calls)
 */
export function useAuthToken(): string | null {
  return useAuthStore((state) => state.token);
}

/**
 * Hook to check if user is authenticated
 */
export function useIsAuthenticated(): boolean {
  return useAuthStore((state) => state.isAuthenticated);
}

/**
 * Hook to get active tenant ID (for API calls)
 */
export function useActiveTenantId(): string | null {
  return useAuthStore((state) => state.activeTenantId);
}
