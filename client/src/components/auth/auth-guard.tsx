"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth-store";
import { Skeleton } from "@/components/ui/skeleton";

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * AuthGuard - Client-side authentication wrapper
 *
 * Checks if user is authenticated via the auth store.
 * If not authenticated, redirects to login page.
 *
 * Shows loading state while checking to prevent flash of content.
 */
export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    // Small delay to allow hydration of persisted state
    const checkAuth = () => {
      if (!isAuthenticated || !token) {
        router.replace("/login?reason=unauthenticated");
      } else {
        setIsLoading(false);
      }
    };

    // Check after a brief delay to allow store hydration
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, [isAuthenticated, token, router]);

  // Show loading skeleton while checking auth
  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full">
        <div className="w-64 border-r p-4 space-y-4">
          <Skeleton className="h-8 w-32" />
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </div>
        <div className="flex-1 p-8 space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-96" />
          <div className="grid gap-4 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

/**
 * Hook to get current session info
 */
export function useSession() {
  const user = useAuthStore((state) => state.user);
  const memberships = useAuthStore((state) => state.memberships);
  const activeTenantId = useAuthStore((state) => state.activeTenantId);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return {
    user,
    memberships,
    activeTenantId,
    isAuthenticated,
  };
}
