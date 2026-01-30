"use client";

import { Calculator } from "lucide-react";
import Link from "next/link";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

/**
 * NavHeader - Sidebar header with CompuPay branding
 */
export default function NavHeader() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Calculator className="h-4 w-4" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">CompuPay</span>
                <span className="text-xs text-muted-foreground">
                  Payroll Management
                </span>
              </div>
            )}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
