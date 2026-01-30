"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Calculator,
  FileText,
  LayoutDashboard,
  Shield,
  Users,
} from "lucide-react";
import NavHeader from "./nav-header";
import NavMain from "./nav-main";
import NavUser from "./nav-user";

/**
 * DashboardSidebar - Main navigation sidebar for the dashboard
 *
 * Navigation structure matches the CompuPay spec:
 * - Dashboard (overview)
 * - Payruns (payroll runs list)
 * - Employees
 * - Compliance
 * - Audit
 */
export default function DashboardSidebar() {
  const data = {
    user: {
      name: "User",
      role: "Admin",
      avatar: "",
    },
    items: [
      {
        id: "/dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        description: "Overview and statistics",
      },
      {
        id: "/dashboard/payruns",
        label: "Payruns",
        icon: Calculator,
        description: "Manage payroll runs",
      },
      {
        id: "/dashboard/employees",
        label: "Employees",
        icon: Users,
        description: "Employee management",
      },
      {
        id: "/dashboard/compliance",
        label: "Compliance",
        icon: Shield,
        description: "Compliance rules",
      },
      {
        id: "/dashboard/audit",
        label: "Audit Log",
        icon: FileText,
        description: "Activity tracking",
      },
    ],
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-2">
        <NavHeader />
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <NavMain navigationItems={data.items} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
