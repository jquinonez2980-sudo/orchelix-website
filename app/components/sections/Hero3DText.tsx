"use client";

/* Real 3D depth on the headline itself, not a decorative object floating
   near it. A perspective wrapper tilts the whole line block toward the
   cursor (same technique as TiltCard, but driven by mouse position across
   the whole viewport rather than hover-only — the letters should react
   even when the cursor is over the body copy or the register beside them).

   The depth is a stack of solid text-shadow layers reading as the extruded
   "wall" behind each letterform. Its direction and length are recomputed
   from the live tilt on every frame, so the extrusion looks like it's
   actually responding to viewing angle rather than sitting at one fixed
   painted angle. A slow independent pulse pushes the whole block forward
   on translateZ and thickens the extrusion slightly, so there's still a
   "coming at you" cue even before the cursor moves. */

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

const MAX_TILT = 9;
const REST_TILT = { x: 3, y: -4 };
const EXTRUDE_LAYERS = 14;
const EXTRUDE_STEP = 1.35; // px per layer at rest

export default function Hero3DText({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  const [tilt, setTilt] = useState(REST_TILT);
  const [pulse, setPulse] = useState(0);
  const [reduced, setReduced] = useState(false);
  const rafRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);

    function onMove(e: MouseEvent) {
      const px = e.clientX / window.innerWidth;
      const py = e.clientY / window.innerHeight;
      setTilt({ x: (0.5 - py) * MAX_TILT * 2, y: (px - 0.5) * MAX_TILT * 2 });
    }

    let raf = 0;
    if (!mq.matches) {
      window.addEventListener("mousemove", onMove);
      const start = performance.now();
      const tick = (now: number) => {
        const t = (now - start) / 1000;
        setPulse(Math.sin(t * 0.6) * 0.5 + 0.5);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      rafRef.current = raf;
    }

    return () => {
      mq.removeEventListener("change", onChange);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const rotX = reduced ? 0 : tilt.x;
  const rotY = reduced ? 0 : tilt.y;
  const z = reduced ? 0 : 18 + pulse * 22;

  // Extrusion direction leans with the tilt and lengthens slightly on the
  // forward pulse — selling the push toward the viewer as the letters
  // themselves thickening, not just a translated block.
  const dirX = reduced ? 1 : 1 + rotY * 0.05;
  const dirY = reduced ? 1 : 1 - rotX * 0.05;
  const step = EXTRUDE_STEP * (1 + pulse * 0.35);

  const shadows: string[] = [];
  for (let i = EXTRUDE_LAYERS; i >= 1; i--) {
    const depth = i / EXTRUDE_LAYERS;
    const ox = i * step * dirX;
    const oy = i * step * dirY;
    // A gold sliver right behind the front face reads as a lit edge; the
    // rest of the stack darkens toward the base of the extrusion.
    const color =
      i === EXTRUDE_LAYERS
        ? "rgba(217,162,27,0.55)"
        : `rgba(2,10,20,${0.35 + depth * 0.45})`;
    shadows.push(`${ox}px ${oy}px 0 ${color}`);
  }
  // Soft contact shadow past the solid stack so the block reads as lifted
  // off the field rather than just outlined against it.
  shadows.push(
    `${step * (EXTRUDE_LAYERS + 5) * dirX}px ${step * (EXTRUDE_LAYERS + 5) * dirY}px 18px rgba(2,10,20,0.55)`
  );

  return (
    <div style={{ perspective: reduced ? "none" : "1000px" }}>
      <h1
        style={{
          ...style,
          transform: reduced ? "none" : `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(${z}px)`,
          transformStyle: "preserve-3d",
          transition: "transform 260ms cubic-bezier(0.16,1,0.3,1)",
          textShadow: shadows.join(", "),
          willChange: reduced ? undefined : "transform",
        }}
      >
        {children}
      </h1>
    </div>
  );
}
