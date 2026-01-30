import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorDisplayProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

/**
 * ErrorDisplay - Reusable error message component
 *
 * Features:
 * - Alert styling
 * - Optional retry button
 * - Customizable title
 */
export function ErrorDisplay({
  title = "Error",
  message,
  onRetry,
}: ErrorDisplayProps) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <span>{message}</span>
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="ml-4"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}
