"use client";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { LogIn, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useHeader } from "./header-provider";
import { navigationItems } from "@/constant";

export default function MobileMenu() {
  const router = useRouter();
  const { isMobileMenuOpen, setIsMobileMenuOpen, handleNavClick } = useHeader();

  return (
    <div className="md:hidden flex items-center space-x-2">
      <ThemeToggle />
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            aria-label="Open mobile menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <SheetTitle className="text-left mb-6">Navigation Menu</SheetTitle>
          <nav
            className="flex flex-col space-y-4"
            role="navigation"
            aria-label="Mobile navigation"
          >
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-sm p-2"
                  aria-label={`Navigate to ${item.label}`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </a>
              );
            })}
            <div className="pt-4 border-t border-border">
              <Button
                className="w-full"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  router.push("/login");
                }}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
