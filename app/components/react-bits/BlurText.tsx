'use client';

/**
 * React Bits — BlurText (TS + Tailwind), adapted for Orchelix.
 * Source: https://github.com/DavidHDev/react-bits (DavidHDev)
 * Owned copy in-repo. Respects prefers-reduced-motion.
 */

import { motion, type Transition, type Easing } from 'motion/react';
import { useEffect, useRef, useState, useMemo } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Array<Record<string, string | number>>;
  easing?: Easing | Easing[];
  onAnimationComplete?: () => void;
  stepDuration?: number;
  as?: 'p' | 'span' | 'h1' | 'h2';
};

const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([...Object.keys(from), ...steps.flatMap((s) => Object.keys(s))]);
  const keyframes: Record<string, Array<string | number>> = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes;
};

export default function BlurText({
  text = '',
  delay = 120,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.28,
  as = 'p',
}: BlurTextProps) {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!ref.current || reduced) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current as Element);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin, reduced]);

  const defaultFrom = useMemo(
    () =>
      direction === 'top'
        ? { filter: 'blur(8px)', opacity: 0, y: -18 }
        : { filter: 'blur(8px)', opacity: 0, y: 18 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      { filter: 'blur(3px)', opacity: 0.6, y: direction === 'top' ? 3 : -3 },
      { filter: 'blur(0px)', opacity: 1, y: 0 },
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;
  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  const Tag = as === 'span' ? 'span' : as === 'h1' ? 'h1' : as === 'h2' ? 'h2' : 'p';

  if (reduced) {
    return (
      <Tag ref={ref as never} className={className}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag ref={ref as never} className={`blur-text ${className} flex flex-wrap`}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);
        const spanTransition: Transition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing,
        };

        return (
          <motion.span
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
            style={{ display: 'inline-block', willChange: 'transform, filter, opacity' }}
          >
            {segment === ' ' ? '\u00A0' : segment}
            {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </motion.span>
        );
      })}
    </Tag>
  );
}
