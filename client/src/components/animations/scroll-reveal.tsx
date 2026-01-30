'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  distance?: number;
  duration?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  distance = 50,
  duration = 0.6, 
  once = true
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '0px 0px -50px 0px' });

  const getInitial = () => {
    switch (direction) {
      case 'up':
        return { y: distance, opacity: 0 };
      case 'down':
        return { y: -distance, opacity: 0 };
      case 'left':
        return { x: distance, opacity: 0 };
      case 'right':
        return { x: -distance, opacity: 0 };
      case 'fade':
        return { opacity: 0 };
      default:
        return { opacity: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={getInitial()}
      animate={isInView ? { x: 0, y: 0, opacity: 1 } : undefined}
      transition={{
        duration,
        delay: delay / 1000, 
        ease: 'easeOut'
      }}
    >
      {children}
    </motion.div>
  );
}