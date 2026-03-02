"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowRight, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useHeader } from "./header-provider";
import { navigationItems } from "@/constant";

export default function MobileMenu() {
  const router = useRouter();
  const { isMobileMenuOpen, setIsMobileMenuOpen, handleNavClick } = useHeader();

  return (
    <div className="lg:hidden flex items-center">
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <button
            className="p-2 text-white/70 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[var(--lp-accent)]"
            aria-label="Open mobile menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-[300px] sm:w-[360px] bg-[#0d0d1a] border-l border-white/[0.06]"
        >
          <SheetTitle className="text-left mb-8 text-white font-display text-lg">
            Navigation
          </SheetTitle>
          <nav
            className="flex flex-col gap-1"
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
                  className="flex items-center gap-3 px-3 py-3 text-sm font-medium text-white/60 hover:text-white hover:bg-white/[0.04] transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--lp-accent)]"
                  aria-label={`Navigate to ${item.label}`}
                >
                  <Icon className="h-4 w-4 text-[var(--lp-accent-bright)]" />
                  <span>{item.label}</span>
                </a>
              );
            })}

            <div className="mt-6 pt-6 border-t border-white/[0.06] space-y-3">
              <button
                className="w-full px-4 py-2.5 text-sm font-medium text-white/70 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/[0.04] text-left"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  router.push("/login");
                }}
              >
                Sign In
              </button>
              <button
                className="w-full group inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[var(--lp-accent)] text-white text-sm font-semibold transition-all duration-300 hover:bg-[var(--lp-accent-bright)]"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  router.push("/register");
                }}
              >
                Get Started
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
