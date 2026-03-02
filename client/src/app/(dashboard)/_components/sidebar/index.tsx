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

import { useAuthStore } from "@/lib/auth-store";

export default function DashboardSidebar() {
  const { user } = useAuthStore();

  const data = {
    user: {
      name: user?.email ? user.email.split("@")[0] : "Administrator",
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
      {
        id: "/dashboard/settings",
        label: "Settings",
        icon: Shield,
        description: "Workspace & profile config",
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
