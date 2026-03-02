"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bell, Moon, Sun, Monitor, ShieldCheck, Mail } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-display text-[var(--lp-text)]">
          Settings
        </h2>
      </div>

      <div className="grid gap-6">
        {/* Appearance Settings */}
        <Card className="bg-background/40 backdrop-blur-md border-[var(--lp-accent)]/20 shadow-xl shadow-[var(--lp-accent)]/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[var(--lp-text)]">
              <Monitor className="h-5 w-5 text-[var(--lp-accent-bright)]" />
              Appearance
            </CardTitle>
            <CardDescription className="text-[var(--lp-text-muted)]">
              CompuPay is currently locked to the Cinematic Dark Theme for
              optimal viewing.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex items-center justify-center p-4 w-32 rounded-lg border-2 border-[var(--lp-accent)] bg-background/50 opacity-100 relative overflow-hidden">
                <Moon className="h-6 w-6 text-[var(--lp-accent-bright)] mb-2" />
                <span className="absolute bottom-2 text-xs font-semibold">
                  Cinematic
                </span>
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--lp-accent)]/20 to-transparent pointer-events-none" />
              </div>
              <div className="flex items-center justify-center p-4 w-32 rounded-lg border border-border bg-muted/20 opacity-40 cursor-not-allowed grayscale">
                <Sun className="h-6 w-6 text-muted-foreground mb-2" />
                <span className="absolute bottom-2 text-xs text-muted-foreground">
                  Light (Disabled)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-background/40 backdrop-blur-md border-[var(--lp-accent)]/20 shadow-xl shadow-[var(--lp-accent)]/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[var(--lp-text)]">
              <Bell className="h-5 w-5 text-[var(--lp-accent-bright)]" />
              Notifications
            </CardTitle>
            <CardDescription className="text-[var(--lp-text-muted)]">
              Configure how you receive alerts and reports.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base text-[var(--lp-text)]">
                    Payroll Risk Alerts
                  </Label>
                  <p className="text-sm text-[var(--lp-text-muted)]">
                    Receive immediate notifications when AI detects
                    high-severity risks.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-border/50" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base text-[var(--lp-text)]">
                    Compliance Rule Updates
                  </Label>
                  <p className="text-sm text-[var(--lp-text-muted)]">
                    Get alerted when tax laws or state compliance rules change
                    in your region.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-border/50" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base text-[var(--lp-text)]">
                    Email Summaries
                  </Label>
                  <p className="text-sm text-[var(--lp-text-muted)]">
                    Weekly digest of your total payroll processed and active
                    compliance scores.
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-background/40 backdrop-blur-md border-[var(--lp-accent)]/20 shadow-xl shadow-[var(--lp-accent)]/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[var(--lp-text)]">
              <ShieldCheck className="h-5 w-5 text-[var(--lp-accent-bright)]" />
              Security
            </CardTitle>
            <CardDescription className="text-[var(--lp-text-muted)]">
              Manage your security preferences and active sessions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium text-[var(--lp-text)]">
                  Two-Factor Authentication
                </p>
                <p className="text-sm text-[var(--lp-text-muted)]">
                  Currently disabled. We recommend enabling 2FA for payroll
                  admins.
                </p>
              </div>
              <Button
                variant="outline"
                className="border-[var(--lp-accent)]/30 text-[var(--lp-text)] hover:bg-[var(--lp-accent)]/10"
              >
                Enable 2FA
              </Button>
            </div>

            <Separator className="bg-border/50" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="font-medium text-[var(--lp-text)]">
                  Session Management
                </p>
                <p className="text-sm text-[var(--lp-text-muted)]">
                  Log out of all other active sessions across devices.
                </p>
              </div>
              <Button variant="destructive" className="sm:w-auto w-full">
                Sign out all sessions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
