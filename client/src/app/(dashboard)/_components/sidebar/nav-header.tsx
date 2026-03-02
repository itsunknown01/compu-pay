"use client";

import Link from "next/link";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

export default function NavHeader() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-primary-foreground font-display font-extrabold text-sm leading-none">
                C
              </span>
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
