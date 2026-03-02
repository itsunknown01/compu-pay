"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Bell,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Info,
} from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

const NOTIFICATIONS = [
  {
    id: 1,
    type: "critical",
    title: "High Severity Risk Detected",
    description:
      "AI engine flagged unusual overtime spikes for 3 employees in current pay-run PR-1049.",
    time: "10 mins ago",
    icon: ShieldAlert,
    read: false,
  },
  {
    id: 2,
    type: "warning",
    title: "Pending Compliance Review",
    description:
      "New California tax regulation rules require your approval for Q3.",
    time: "2 hours ago",
    icon: AlertTriangle,
    read: false,
  },
  {
    id: 3,
    type: "success",
    title: "Payrun Approved",
    description:
      "Payrun PR-1048 has been successfully finalized and queued for ACH processing.",
    time: "Yesterday",
    icon: CheckCircle2,
    read: true,
  },
  {
    id: 4,
    type: "info",
    title: "System Update",
    description:
      "CompuPay has been updated to v1.2 with improved neural net inference speeds.",
    time: "Mon 9:00 AM",
    icon: Info,
    read: true,
  },
];

function getPageTitle(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length <= 1) return "Dashboard";

  const titles: Record<string, string> = {
    payruns: "Payruns",
    employees: "Employees",
    compliance: "Compliance",
    audit: "Audit Log",
    preview: "Preview",
    risks: "Risks",
    account: "Account",
    settings: "Settings",
  };

  const lastSegment = segments[segments.length - 1];

  if (lastSegment.length > 20) {
    const parentSegment = segments[segments.length - 2];
    return titles[parentSegment] || "Details";
  }

  return titles[lastSegment] || "Dashboard";
}

export default function DashboardHeader() {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <header
      className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border"
      role="banner"
    >
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-4" />
          <h1 className="text-lg font-semibold font-display">{pageTitle}</h1>
        </div>

        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label="View notifications"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center animate-in fade-in"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className="w-80 p-0 border-[var(--lp-accent)]/20 shadow-xl shadow-[var(--lp-accent)]/5 bg-background/95 backdrop-blur-md hidden sm:block"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
                <h4 className="text-sm font-semibold font-display text-[var(--lp-text)]">
                  Notifications
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-xs text-[var(--lp-accent-bright)] hover:text-[var(--lp-accent)] hover:bg-transparent"
                >
                  Mark all as read
                </Button>
              </div>
              <ScrollArea className="h-[300px]">
                <div className="divide-y divide-border/50">
                  {NOTIFICATIONS.map((notif) => {
                    const Icon = notif.icon;
                    return (
                      <div
                        key={notif.id}
                        className={`flex items-start gap-3 p-4 transition-colors hover:bg-white/[0.02] cursor-default ${
                          !notif.read ? "bg-[var(--lp-accent)]/[0.03]" : ""
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {notif.type === "critical" && (
                            <Icon className="h-4 w-4 text-red-500" />
                          )}
                          {notif.type === "warning" && (
                            <Icon className="h-4 w-4 text-amber-500" />
                          )}
                          {notif.type === "success" && (
                            <Icon className="h-4 w-4 text-green-500" />
                          )}
                          {notif.type === "info" && (
                            <Icon className="h-4 w-4 text-blue-500" />
                          )}
                        </div>
                        <div className="space-y-1 flex-1">
                          <p
                            className={`text-sm font-medium leading-none ${!notif.read ? "text-[var(--lp-text)]" : "text-[var(--lp-text)]/80"}`}
                          >
                            {notif.title}
                          </p>
                          <p
                            className={`text-xs leading-relaxed ${!notif.read ? "text-[var(--lp-text)]/90" : "text-[var(--lp-text-muted)]"}`}
                          >
                            {notif.description}
                          </p>
                          <p className="text-[10px] text-[var(--lp-text-muted)] mt-1.5 font-medium">
                            {notif.time}
                          </p>
                        </div>
                        {!notif.read && (
                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--lp-accent-bright)] mt-1.5 shrink-0 shadow-[0_0_8px_var(--lp-accent-bright)]" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
              <div className="p-2 border-t border-border/50">
                <Button
                  variant="ghost"
                  className="w-full text-xs text-[var(--lp-text-muted)] hover:text-[var(--lp-text)]"
                >
                  View all notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
