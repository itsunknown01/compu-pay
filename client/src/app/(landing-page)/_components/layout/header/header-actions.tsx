"use client";

import { LayoutDashboard, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { useIsAuthenticated } from "@/lib/auth-store";

export default function HeaderActions() {
  const router = useRouter();
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className="hidden md:flex items-center space-x-4">
      <ThemeToggle />
      {isAuthenticated ? (
        <Button
          size="sm"
          className="transition-all duration-200 hover:scale-105"
          onClick={() => router.push("/overview")}
        >
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
      ) : (
        <Button
          size="sm"
          className="transition-all duration-200 hover:scale-105"
          onClick={() => router.push("/login")}
        >
          <LogIn className="mr-2 h-4 w-4" />
          Sign In
        </Button>
      )}
    </div>
  );
}
