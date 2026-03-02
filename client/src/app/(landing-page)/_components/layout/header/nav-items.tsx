"use client";

import { navigationItems } from "@/constant";
import { useHeader } from "./header-provider";

export default function NavItems() {
  const { handleNavClick } = useHeader();
  return (
    <nav
      className="hidden lg:flex items-center gap-1"
      role="navigation"
      aria-label="Main navigation"
    >
      {navigationItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={(e) => {
            e.preventDefault();
            handleNavClick(item.href);
          }}
          className="relative px-3 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-[var(--lp-accent)] focus:ring-offset-2 focus:ring-offset-[#06060e]"
          aria-label={`Navigate to ${item.label}`}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
