'use client';

import React, { useRef, useState } from 'react';
import { useInView, useMotionValue, useAnimationFrame } from 'framer-motion';

interface CountUpAnimationProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export function CountUpAnimation({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = ''
}: CountUpAnimationProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(0);
  const [count, setCount] = useState(0);

  useAnimationFrame((t) => {
    if (!isInView) return;

    const progress = Math.min(t / duration, 1);
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = end * easeOutQuart;

    motionValue.set(current);
    setCount(current);
  });

  const formatNumber = (num: number) => num.toFixed(decimals);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
}
