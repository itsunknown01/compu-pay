"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LucideProps } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface NavigationItem {
  id: string;
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  description?: string;
}

interface NavMainProps {
  navigationItems: NavigationItem[];
}

/**
 * NavMain - Main navigation menu component
 *
 * Features:
 * - Active state based on current pathname
 * - Supports nested routes (e.g., /dashboard/payruns/123 marks /dashboard/payruns as active)
 * - Accessible with proper ARIA attributes
 * - Keyboard navigable
 */
export default function NavMain({ navigationItems }: NavMainProps) {
  const pathname = usePathname();

  const isActive = (itemPath: string) => {
    // Exact match for dashboard home
    if (itemPath === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(itemPath);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navigation</SidebarGroupLabel>
      <SidebarMenu>
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.id);

          return (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                tooltip={item.label}
                isActive={active}
                asChild
                className="h-10"
              >
                <Link href={item.id} aria-current={active ? "page" : undefined}>
                  <Icon className="mr-3 h-5 w-5" aria-hidden="true" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
