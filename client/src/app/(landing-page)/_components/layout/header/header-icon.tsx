"use client";

import Image from "next/image";
import { useHeader } from "./header-provider";

export default function HeaderIcon() {
  const { handleNavClick } = useHeader();

  return (
    <div className="flex-shrink-0">
      <a
        href="#home"
        onClick={(e) => {
          e.preventDefault();
          handleNavClick("#home");
        }}
        className="text-xl lg:text-2xl font-bold text-primary hover:text-primary/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-sm"
        aria-label="Go to homepage"
      >
        <Image
          src="/payrollAI.png"
          width={50}
          height={50}
          alt="logo"
          className="object-contain bg-transparent"
        />
      </a>
    </div>
  );
}
