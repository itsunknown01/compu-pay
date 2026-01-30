import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * AppShell - Root wrapper component for consistent layout structure
 *
 * Provides:
 * - Consistent min-height for full viewport
 * - Flex column layout for header/content/footer structure
 * - Background and text color theming
 */
export function AppShell({ children, className }: AppShellProps) {
  return (
    <div
      className={cn(
        "flex min-h-screen flex-col bg-background text-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}
