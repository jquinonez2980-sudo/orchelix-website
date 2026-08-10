"use client";

/* Real WebGL 3D backdrop for the hero — actual Three.js geometry, not a CSS
   trick. No solid shape: a starburst of gold line segments radiating from
   a centre point out to a scatter of glowing "call" nodes. Idles with a
   slow turn and tilts further toward the cursor on mouse move; a slow
   breathing scale + forward Z push makes the lines angled toward the
   camera visibly lengthen and rush at the viewer each cycle.

   Deliberately no post-processing/bloom pipeline: this ships without being
   visually tested first, so fewer moving parts means fewer silent failure
   modes. Additive blending on the node points stands in for glow.

   `three` is loaded via dynamic import inside the effect rather than a
   top-level import — it's a large library with no reason to sit in every
   page's bundle, and dynamic import also keeps it out of the SSR pass
   entirely (this component's whole body only ever runs client-side). */

import { useEffect, useRef } from "react";
import type * as ThreeNS from "three";

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const THREE = (await import("three")) as typeof ThreeNS;
      if (cancelled || !mount) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.set(0, 0, 9);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mount.appendChild(renderer.domElement);

      // No solid geometry at all — a starburst of individual line segments
      // radiating from the centre out to each "call" node. The lines
      // themselves are the object; the ones angled toward the camera are
      // the ones that visibly lengthen and rush forward on the pulse below,
      // which is the actual "coming at you" cue, not a shaded solid turning.
      const NODE_COUNT = 34;
      const nodePositions = new Float32Array(NODE_COUNT * 3);
      const linePositions = new Float32Array(NODE_COUNT * 2 * 3);
      for (let i = 0; i < NODE_COUNT; i++) {
        const r = 1.9 + Math.random() * 0.7;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        nodePositions[i * 3] = x;
        nodePositions[i * 3 + 1] = y;
        nodePositions[i * 3 + 2] = z;
        // Segment i: origin → node i. LineSegments reads two verts per line.
        linePositions[i * 6] = 0;
        linePositions[i * 6 + 1] = 0;
        linePositions[i * 6 + 2] = 0;
        linePositions[i * 6 + 3] = x;
        linePositions[i * 6 + 4] = y;
        linePositions[i * 6 + 5] = z;
      }

      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xd9a21b,
        transparent: true,
        opacity: 0.6,
      });
      const lines = new THREE.LineSegments(lineGeo, lineMat);

      const nodeGeo = new THREE.BufferGeometry();
      nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));
      const nodeMat = new THREE.PointsMaterial({
        color: 0xefbb3c,
        size: 0.05,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const nodes = new THREE.Points(nodeGeo, nodeMat);

      // Grouped so position/scale (the "toward the viewer" pulse) move
      // both as one object; each still spins on its own local rotation.
      const group = new THREE.Group();
      group.add(lines, nodes);
      scene.add(group);

      let targetX = 0;
      let targetY = 0;
      function onMove(e: MouseEvent) {
        const rect = mount!.getBoundingClientRect();
        targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      }
      if (!reduced) window.addEventListener("mousemove", onMove);

      function resize() {
        const w = mount!.clientWidth || 1;
        const h = mount!.clientHeight || 1;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
      const ro = new ResizeObserver(resize);
      ro.observe(mount);
      resize();

      const clock = new THREE.Clock();
      let frameId = 0;
      function animate() {
        const t = clock.getElapsedTime();
        if (!reduced) {
          // Slow, deliberate turn — the mouse nudges it further off-axis
          // rather than driving the rotation outright.
          lines.rotation.y = t * 0.05 + targetX * 0.5;
          lines.rotation.x = t * 0.025 + targetY * 0.3;
          nodes.rotation.y = lines.rotation.y;
          nodes.rotation.x = lines.rotation.x;

          // The "coming at you" cue: the whole starburst swells and pushes
          // forward on the same slow sine, so the lines angled toward the
          // camera visibly lengthen and rush at the viewer each cycle,
          // then withdraw. Bigger swing than the solid-object version had
          // — a line's whole read IS its length, so it needs a bigger
          // stretch to sell "reaching toward you" than a shaded surface did.
          const pulse = Math.sin(t * 0.45) * 0.5 + 0.5; // 0 → 1 → 0
          const scale = 1 + pulse * 0.45;
          group.scale.setScalar(scale);
          group.position.z = pulse * 2.2;
        }
        renderer.render(scene, camera);
        frameId = requestAnimationFrame(animate);
      }
      animate();

      cleanup = () => {
        window.removeEventListener("mousemove", onMove);
        ro.disconnect();
        cancelAnimationFrame(frameId);
        lineGeo.dispose();
        lineMat.dispose();
        nodeGeo.dispose();
        nodeMat.dispose();
        renderer.dispose();
        if (renderer.domElement.parentElement === mount) {
          mount.removeChild(renderer.domElement);
        }
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="hidden lg:block"
      style={{
        /* Bounded to roughly where the register sits (that column is
           ~1.28fr of a 2fr grid, right-aligned) — the object stays behind
           that one panel's corner instead of spanning the full section,
           including the space under the headline where it had no business
           being. Hidden below `lg` — the register itself reflows to full
           width there, so there's no fixed "corner" left to anchor to,
           and a stray WebGL layer under stacked mobile content is more
           likely to look like a bug than an effect. */
        position: "absolute",
        top: "4%",
        right: "2%",
        width: "56%",
        height: "88%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
