"use client";

import { cn } from "@/lib/utils";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface HeaderContextState {
  isScrolled: boolean;
  setIsScrolled: (scroll: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (mobile: boolean) => void;
  handleNavClick: (href: string) => void;
}

interface HeaderProviderProps {
  children: React.ReactNode;
  className?: string;
}

export const HeaderContext = createContext<HeaderContextState | null>(null);

export default function HeaderProvider({
  children,
  className,
}: HeaderProviderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  }, []);

  const value = {
    isScrolled,
    setIsScrolled,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    handleNavClick,
  };

  return (
    <HeaderContext.Provider value={value}>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-[#06060e]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-transparent",
          className,
        )}
        role="banner"
      >
        {children}
      </header>
    </HeaderContext.Provider>
  );
}

export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error("useHeader must be used within a HeaderProvider");
  }
  return context;
};
