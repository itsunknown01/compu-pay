"use client";

import { useAuthStore } from "@/lib/auth-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function AccountPage() {
  const { user, memberships } = useAuthStore();

  const initials = user?.email
    ? user.email.split("@")[0].substring(0, 2).toUpperCase()
    : "AD";

  const primaryRole = memberships[0]?.role || "ADMIN";

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-display text-[var(--lp-text)]">
          Account Profile
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-background/40 backdrop-blur-md border-[var(--lp-accent)]/20 shadow-xl shadow-[var(--lp-accent)]/5">
          <CardHeader>
            <CardTitle className="text-[var(--lp-text)]">
              Profile Information
            </CardTitle>
            <CardDescription className="text-[var(--lp-text-muted)]">
              Manage your personal details and how your profile appears to
              others.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-x-6">
              <Avatar className="h-24 w-24 ring-2 ring-[var(--lp-accent)]/30 ring-offset-2 ring-offset-background">
                <AvatarImage src="" />
                <AvatarFallback className="text-2xl bg-[var(--lp-accent)]/10 text-[var(--lp-accent-bright)]">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="border-[var(--lp-accent)]/30 hover:bg-[var(--lp-accent)]/10 text-[var(--lp-text)]"
                >
                  Change Avatar
                </Button>
                <p className="text-xs text-[var(--lp-text-muted)]">
                  JPG, GIF or PNG. 1MB max.
                </p>
              </div>
            </div>

            <Separator className="bg-border/50" />

            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-[var(--lp-text)]">
                    First name
                  </Label>
                  <Input
                    id="firstName"
                    defaultValue="Aryaman"
                    className="bg-background/50 border-[var(--lp-accent)]/20 focus-visible:ring-[var(--lp-accent)]/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-[var(--lp-text)]">
                    Last name
                  </Label>
                  <Input
                    id="lastName"
                    defaultValue="Gohain"
                    className="bg-background/50 border-[var(--lp-accent)]/20 focus-visible:ring-[var(--lp-accent)]/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[var(--lp-text)]">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="bg-muted/30 text-muted-foreground border-[var(--lp-accent)]/20"
                />
                <p className="text-[11px] text-[var(--lp-text-muted)]">
                  Your email is managed by your identity provider and cannot be
                  changed here.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button className="bg-[var(--lp-accent)] text-white hover:bg-[var(--lp-accent-bright)]">
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-background/40 backdrop-blur-md border-[var(--lp-accent)]/20 shadow-xl shadow-[var(--lp-accent)]/5">
          <CardHeader>
            <CardTitle className="text-[var(--lp-text)]">
              Workspace Memberships
            </CardTitle>
            <CardDescription className="text-[var(--lp-text-muted)]">
              The workspaces you belong to and your roles.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border border-[var(--lp-accent)]/20 bg-background/50">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none text-[var(--lp-text)]">
                  Aryaman Workspace
                </p>
                <p className="text-xs text-[var(--lp-text-muted)]">
                  Primary Tenant
                </p>
              </div>
              <Badge
                variant="outline"
                className="bg-[var(--lp-accent)]/10 text-[var(--lp-accent-bright)] border-[var(--lp-accent)]/30"
              >
                {primaryRole}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
