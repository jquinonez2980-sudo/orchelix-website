"use client";

/* The About opening visual — the idea of the old about-visual.png (a stack
   of cubes with one lit piece inside it) rebuilt live, in the site's blue
   and cyan instead of graphite and magenta.

   Fourteen glass cubes drop in and assemble into a stepped pyramid; the
   stack turns slowly and leans toward the pointer; the lit cube at the apex
   lifts off the structure and hovers there — the senior consultant on top
   of the software.

   CSS 3D, no canvas: every face is a DOM element with preserve-3d. Cubes sit
   a small gap apart so no two faces are coplanar (coplanar faces z-fight),
   and faces that touch a neighbour in the same tier are not drawn at all.

   Reduced motion: the assembled stack, still. */

import { useEffect, useRef, type CSSProperties } from "react";

type Cube = { x: number; y: number; z: number; accent?: boolean };

const CUBES: Cube[] = [
  // Base: 3 × 3
  ...[-1, 0, 1].flatMap((x) => [-1, 0, 1].map((z) => ({ x, y: 0, z }))),
  // Middle: 2 × 2, offset half a cube
  { x: -0.5, y: 1, z: -0.5 },
  { x: 0.5, y: 1, z: -0.5 },
  { x: -0.5, y: 1, z: 0.5 },
  { x: 0.5, y: 1, z: 0.5 },
  // Apex — the lit one, hovering
  { x: 0, y: 2, z: 0, accent: true },
];

type Face = "front" | "back" | "left" | "right" | "top" | "bottom";
const FACES: Face[] = ["front", "back", "left", "right", "top", "bottom"];

function hidden(c: Cube, f: Face) {
  if (c.accent) return false; // it moves, so every side can be seen
  if (f === "bottom") return true; // nothing ever sees underneath
  const same = CUBES.filter((o) => o !== c && o.y === c.y);
  const at = (dx: number, dz: number) => same.some((o) => o.x === c.x + dx && o.z === c.z + dz);
  if (f === "front") return at(0, 1);
  if (f === "back") return at(0, -1);
  if (f === "right") return at(1, 0);
  if (f === "left") return at(-1, 0);
  return false;
}

export default function AboutCubeStack({ max = 440 }: { max?: number }) {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const cur = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onMove = (e: PointerEvent) => {
      const box = scene.getBoundingClientRect();
      const clamp = (v: number) => Math.max(-1, Math.min(1, v));
      target.x = clamp(((e.clientX - box.left) / box.width - 0.5) * 2);
      target.y = clamp(((e.clientY - box.top) / box.height - 0.5) * 2);
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const tick = () => {
      cur.x += (target.x - cur.x) * 0.08;
      cur.y += (target.y - cur.y) * 0.08;
      scene.style.setProperty("--acs-lean-x", `${(-cur.y * 8).toFixed(2)}deg`);
      scene.style.setProperty("--acs-lean-y", `${(cur.x * 14).toFixed(2)}deg`);
      raf = Math.abs(target.x - cur.x) + Math.abs(target.y - cur.y) > 0.002 ? requestAnimationFrame(tick) : 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="acs" style={{ maxWidth: max }} aria-hidden="true">
      <div className="acs-glow" />
      <div className="acs-floor" />
      <div className="acs-scene" ref={sceneRef}>
        <div className="acs-lean">
          <div className="acs-world">
            {CUBES.map((c, i) => (
              <div
                key={i}
                className={`acs-cube${c.accent ? " acs-cube--accent" : ""}`}
                style={
                  {
                    "--x": c.x,
                    "--y": c.y,
                    "--z": c.z,
                    /* Bottom tier lands first, back to front, then up. */
                    "--d": `${c.y * 420 + (c.z + 1) * 90 + (c.x + 1) * 45}ms`,
                  } as CSSProperties
                }
              >
                <div className="acs-drop">
                  <div className="acs-lift">
                    {FACES.filter((f) => !hidden(c, f)).map((f) => (
                      <span key={f} className={`acs-f acs-f--${f}`} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
