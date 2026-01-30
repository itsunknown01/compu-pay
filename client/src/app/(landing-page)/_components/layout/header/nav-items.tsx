"use client";

import { navigationItems } from "@/constant";
import { useHeader } from "./header-provider";

export default function NavItems() {
  const { handleNavClick } = useHeader();
  return (
    <nav
      className="hidden md:flex space-x-8"
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
          className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-sm px-2 py-1"
          aria-label={`Navigate to ${item.label}`}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
