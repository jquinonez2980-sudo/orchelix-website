'use client';

/**
 * React Bits — SpotlightCard (TS + Tailwind), adapted for Orchelix light B2B.
 * Source: https://github.com/DavidHDev/react-bits (DavidHDev)
 * Owned copy. Tactile hover spotlight; static when prefers-reduced-motion.
 */

import React, { useRef, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface Position {
  x: number;
  y: number;
}

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: string;
  style?: React.CSSProperties;
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(13, 92, 99, 0.12)',
  style,
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const reduced = usePrefersReducedMotion();

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!divRef.current || isFocused || reduced) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={() => {
        setIsFocused(true);
        if (!reduced) setOpacity(0.55);
      }}
      onBlur={() => {
        setIsFocused(false);
        setOpacity(0);
      }}
      onMouseEnter={() => {
        if (!reduced) setOpacity(0.55);
      }}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden ${className}`}
      style={style}
    >
      {!reduced ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out"
          style={{
            opacity,
            background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 72%)`,
          }}
        />
      ) : null}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
