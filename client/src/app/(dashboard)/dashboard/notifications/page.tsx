"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Bell,
  ShieldAlert,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const NOTIFICATIONS = [
  {
    id: 1,
    type: "critical",
    title: "High Severity Risk Detected",
    description:
      "AI engine flagged unusual overtime spikes for 3 employees in current pay-run PR-1049.",
    time: "10 minutes ago",
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
    time: "Yesterday, 4:15 PM",
    icon: CheckCircle2,
    read: true,
  },
  {
    id: 4,
    type: "info",
    title: "System Update",
    description:
      "CompuPay has been updated to v1.2 with improved neural net inference speeds.",
    time: "Monday, 9:00 AM",
    icon: Info,
    read: true,
  },
];

export default function NotificationsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 h-full flex flex-col">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-display text-[var(--lp-text)]">
          NotificationsInbox
        </h2>
        <Button
          variant="outline"
          className="text-xs border-[var(--lp-accent)]/30 hover:bg-[var(--lp-accent)]/10 text-[var(--lp-text)]"
        >
          Mark all as read
        </Button>
      </div>

      <Card className="flex-1 bg-background/40 backdrop-blur-md border-[var(--lp-accent)]/20 shadow-xl shadow-[var(--lp-accent)]/5 flex flex-col overflow-hidden max-h-[calc(100vh-12rem)]">
        <CardHeader className="border-b border-border/50 pb-4">
          <CardTitle className="flex items-center gap-2 text-[var(--lp-text)]">
            <Bell className="h-5 w-5 text-[var(--lp-accent-bright)]" />
            Recent Alerts
            <Badge
              variant="destructive"
              className="ml-2 bg-red-500/20 text-red-400 border-red-500/30"
            >
              2 New
            </Badge>
          </CardTitle>
          <CardDescription className="text-[var(--lp-text-muted)]">
            Stay updated with system alerts, compliance warnings, and workflow
            statuses.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="divide-y divide-border/50">
              {NOTIFICATIONS.map((notif) => {
                const Icon = notif.icon;
                return (
                  <div
                    key={notif.id}
                    className={`flex items-start gap-4 p-6 transition-colors hover:bg-white/[0.02] ${
                      !notif.read ? "bg-[var(--lp-accent)]/[0.03]" : ""
                    }`}
                  >
                    <div className="mt-1">
                      {notif.type === "critical" && (
                        <Icon className="h-6 w-6 text-red-400" />
                      )}
                      {notif.type === "warning" && (
                        <Icon className="h-6 w-6 text-amber-400" />
                      )}
                      {notif.type === "success" && (
                        <Icon className="h-6 w-6 text-green-400" />
                      )}
                      {notif.type === "info" && (
                        <Icon className="h-6 w-6 text-blue-400" />
                      )}
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <p
                          className={`text-sm font-medium ${!notif.read ? "text-[var(--lp-text)]" : "text-[var(--lp-text)]/80"}`}
                        >
                          {notif.title}
                        </p>
                        <span className="text-xs text-[var(--lp-text-muted)]">
                          {notif.time}
                        </span>
                      </div>
                      <p
                        className={`text-sm ${!notif.read ? "text-[var(--lp-text)]/90" : "text-[var(--lp-text-muted)]"}`}
                      >
                        {notif.description}
                      </p>
                    </div>
                    {!notif.read && (
                      <div className="w-2 h-2 rounded-full bg-[var(--lp-accent-bright)] mt-2 shadow-[0_0_10px_var(--lp-accent-bright)]" />
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
