"use client";

/* Mouse-tracked 3D tilt for the hero register. Pure CSS 3D transforms, not
   WebGL/Three.js: the panel stays real DOM (the actual call data), so it's
   still selectable and accessible, and there's no render loop or GPU
   context that can silently fail. Perspective + rotateX/rotateY makes the
   panel turn to face the cursor; translateZ plus a shadow that shifts
   opposite the tilt sells it as lifted off the field toward the viewer
   rather than printed flat on it.

   Idle state carries a small resting tilt so the depth reads even before
   the cursor arrives — a perfectly flat card gives no cue that it's meant
   to react to anything. */

import { useEffect, useRef, useState, type ReactNode } from "react";

const MAX_TILT = 16;
const REST_TILT = { x: -5, y: 7 };

export default function TiltCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState(REST_TILT);
  const [active, setActive] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (0.5 - py) * MAX_TILT * 2, y: (px - 0.5) * MAX_TILT * 2 });
  }

  function handleLeave() {
    setActive(false);
    if (!reduced) setTilt(REST_TILT);
  }

  const transform = reduced
    ? "none"
    : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${active ? 46 : 22}px)`;

  return (
    <div style={{ perspective: reduced ? "none" : "1400px" }}>
      <div
        ref={ref}
        className={className}
        onMouseMove={handleMove}
        onMouseEnter={() => !reduced && setActive(true)}
        onMouseLeave={handleLeave}
        style={{
          transform,
          transformStyle: "preserve-3d",
          transition: reduced
            ? "none"
            : active
              ? "transform 110ms cubic-bezier(0.2,0.6,0.2,1)"
              : "transform 550ms cubic-bezier(0.16,1,0.3,1)",
          boxShadow: reduced
            ? "0 24px 56px -20px rgba(2,8,18,0.65)"
            : `${-tilt.y * 2.2}px ${tilt.x * -2.2 + 34}px 64px -18px rgba(2,8,18,0.75)`,
          willChange: reduced ? undefined : "transform, box-shadow",
        }}
      >
        {children}
      </div>
    </div>
  );
}
