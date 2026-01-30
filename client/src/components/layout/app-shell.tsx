import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
  className?: string;
}


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
