"use client";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell } from "lucide-react";
import { usePathname } from "next/navigation";


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

  return (
    <header
      className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b"
      role="banner"
    >
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-4" />
          <h1 className="text-lg font-semibold">{pageTitle}</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="View notifications"
          >
            <Bell className="h-5 w-5" />
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
            >
              3
            </Badge>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
