"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";
import React, { useRef } from "react";

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  offset?: number;
}

export default function ParallaxSection({
  children,
  className,
  speed = 0.5,
  offset = 0,
}: ParallaxSectionProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, (value) => value * -speed + offset);

  return (
    <motion.div
      ref={elementRef}
      className={cn("relative overflow-hidden", className)}
      style={{ y }}
    >
      {children}
    </motion.div>
  );
}
