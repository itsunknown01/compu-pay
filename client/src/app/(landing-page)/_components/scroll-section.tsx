"use client";

import { cn } from "@/lib/utils";

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div";
  ariaLabel?: string;
}

export default function ScrollSection({
  children,
  className,
  id,
  as: Tag = "section",
  ariaLabel,
}: ScrollSectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "relative py-24 md:py-32 lg:py-40 overflow-hidden",
        className,
      )}
      aria-label={ariaLabel}
    >
      {children}
    </Tag>
  );
}
