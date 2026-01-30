"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
          <div className="mb-4 rounded-full bg-red-100 p-3 text-red-600 dark:bg-red-900/30">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h1 className="mb-2 text-2xl font-bold">System Error</h1>
          <p className="mb-6 text-muted-foreground max-w-md">
            A critical system error occurred. We apologize for the
            inconvenience.
          </p>
          <Button onClick={() => reset()}>Try again</Button>

          {error.digest && (
            <p className="mt-8 text-xs text-muted-foreground font-mono">
              Error ID: {error.digest}
            </p>
          )}
        </div>
      </body>
    </html>
  );
}
