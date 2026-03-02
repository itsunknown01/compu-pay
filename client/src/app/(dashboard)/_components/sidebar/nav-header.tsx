"use client";

import Link from "next/link";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

import Image from "next/image";

export default function NavHeader() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background/50 border border-[var(--lp-accent)]/20 overflow-hidden shrink-0">
              <Image
                src="/logo.png"
                alt="CompuPay Logo"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-display font-semibold">
                  Compu<span className="text-primary">Pay</span>
                </span>
                <span className="text-xs text-muted-foreground">
                  Payroll Intelligence
                </span>
              </div>
            )}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
