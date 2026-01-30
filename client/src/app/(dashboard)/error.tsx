"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * DashboardError - Route-level error boundary for dashboard
 *
 * Features:
 * - Catches and displays errors gracefully
 * - Provides retry functionality
 * - Logs error for debugging
 * - Never exposes sensitive error details to user
 */
export default function DashboardError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to error reporting service in production
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-md text-center space-y-6">
        <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-destructive" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Something went wrong
          </h1>
          <p className="text-muted-foreground">
            We encountered an error while loading this page. This issue has been
            logged and our team has been notified.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} variant="default">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try again
          </Button>
          <Button variant="outline" asChild>
            <a href="/dashboard">Go to Dashboard</a>
          </Button>
        </div>

        {/* Error digest for support reference (non-sensitive) */}
        {error.digest && (
          <p className="text-xs text-muted-foreground">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
