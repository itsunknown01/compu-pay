"use client";

import { useHeader } from "./header-provider";
import Image from "next/image";

export default function HeaderIcon() {
  const { handleNavClick } = useHeader();

  return (
    <div className="shrink-0">
      <a
        href="#hero"
        onClick={(e) => {
          e.preventDefault();
          handleNavClick("#hero");
        }}
        className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-[var(--lp-accent)] rounded-sm"
        aria-label="Go to homepage"
      >
        {/* Logo mark */}
        <div className="w-8 h-8 rounded-lg bg-background border border-[var(--lp-accent)]/20 flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-110 overflow-hidden shrink-0">
          <Image
            src="/logo.png"
            alt="CompuPay Logo"
            width={32}
            height={32}
            className="object-cover"
          />
        </div>
        <span className="font-display text-lg font-bold text-white tracking-tight">
          Compu<span className="text-[var(--lp-accent-bright)]">Pay</span>
        </span>
      </a>
    </div>
  );
}
