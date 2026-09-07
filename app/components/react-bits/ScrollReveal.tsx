'use client';

/**
 * React Bits — ScrollReveal (simplified, motion-based owned copy).
 * Subtle fade/rise for section copy. Static when prefers-reduced-motion.
 */

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function ScrollReveal({ children, className = '', delay = 0 }: ScrollRevealProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
