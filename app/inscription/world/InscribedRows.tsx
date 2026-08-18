"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { FIRST_BOOKED, NIGHT_ENTRIES } from "../data/nightRegister";
import { windows, writing } from "../writing/WritingDirector";
import { inscription } from "../store";
import { currentTheme, onRelightSnap } from "../relight";
import { FACE_Z, rowPitch, rowTextY, rowX0, rowX1 } from "./volumeLayout";

function rowTexSize() {
  const scale = inscription.quality.texScale;
  if (scale >= 0.9) return { w: 2048, h: 128 };
  if (scale >= 0.6) return { w: 1280, h: 96 };
  return { w: 1024, h: 80 };
}

function typeAlpha(index: number, write: number, stamped: boolean) {
  if (write <= 0) return 0;
  const beat = inscription.beat;
  const booked = stamped && index === FIRST_BOOKED;
  if (beat <= 2) return 0.62;
  if (beat === 3) return 0.32;
  if (beat >= 4) {
    const span = Math.max(0.04, windows.p5 - windows.p4);
    const recede = Math.min(1, Math.max(0, (inscription.progress - windows.p4) / span));
    const t = recede * recede;
    const peak = booked ? 0.22 : 0.07;
    return peak + (0.04 - peak) * t;
  }
  return 0.18;
}

function paint(
  ctx: CanvasRenderingContext2D,
  index: number,
  write: number,
  ink: string,
  ink2: string,
  stamped: boolean,
) {
  const entry = NIGHT_ENTRIES[index];
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  ctx.clearRect(0, 0, w, h);
  if (write <= 0.01) return;
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, w * write, h);
  ctx.clip();
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.textBaseline = "middle";
  ctx.lineJoin = "round";
  ctx.miterLimit = 2;

  const s = w / 2560;
  const fs = (px: number) => Math.max(18, Math.round(px * s));
  const x = (n: number) => n * s;
  const draw = (text: string, px: number, py: number) => {
    ctx.fillText(text, px, py);
  };

  ctx.font = `600 ${fs(78)}px "Azeret Mono", ui-monospace, monospace`;
  ctx.fillStyle = ink;
  draw(entry.time, x(32), h / 2);

  ctx.fillStyle = ink2;
  draw("·", x(248), h / 2);

  ctx.font =
    entry.lang === "ES"
      ? `700 ${fs(72)}px "Azeret Mono", ui-monospace, monospace`
      : `500 ${fs(72)}px "Azeret Mono", ui-monospace, monospace`;
  ctx.fillStyle = ink;
  draw(entry.lang, x(292), h / 2);
  if (entry.lang === "ES") {
    ctx.fillRect(x(292), h / 2 + x(30), x(68), Math.max(2, x(3)));
  }

  ctx.fillStyle = ink2;
  ctx.font = `600 ${fs(78)}px "Azeret Mono", ui-monospace, monospace`;
  draw("·", x(400), h / 2);

  ctx.save();
  ctx.beginPath();
  ctx.rect(x(448), 0, w - x(448) - x(300), h);
  ctx.clip();
  ctx.font = `500 ${fs(68)}px "Azeret Mono", ui-monospace, monospace`;
  ctx.fillStyle = ink;
  draw(entry.reason, x(456), h / 2);
  ctx.restore();

  ctx.textAlign = "right";
  ctx.font = `600 ${fs(64)}px "Azeret Mono", ui-monospace, monospace`;
  ctx.fillStyle = ink;
  draw(entry.disposition, w - x(28), h / 2);
  if (stamped && entry.disposition === "BOOKED") {
    ctx.fillStyle = "#B7135A";
    ctx.fillRect(w - x(248), h / 2 + x(30), x(216), Math.max(2, x(4)));
  }
  ctx.restore();
}

export default function InscribedRows() {
  const gl = useThree((s) => s.gl);
  const canvases = useMemo(
    () =>
      NIGHT_ENTRIES.map(() => {
        const { w, h } = rowTexSize();
        const c = document.createElement("canvas");
        c.width = w;
        c.height = h;
        return c;
      }),
    [],
  );
  const textures = useMemo(
    () =>
      canvases.map((c) => {
        const t = new THREE.CanvasTexture(c);
        t.colorSpace = THREE.SRGBColorSpace;
        t.generateMipmaps = false;
        t.minFilter = THREE.LinearFilter;
        t.magFilter = THREE.LinearFilter;
        t.anisotropy = 16;
        t.premultiplyAlpha = true;
        t.needsUpdate = true;
        return t;
      }),
    [canvases],
  );
  const last = useRef<string[]>(NIGHT_ENTRIES.map(() => ""));
  const mats = useRef<(THREE.MeshBasicMaterial | null)[]>([]);

  const paintAll = () => {
    const theme = currentTheme();
    const stamped = writing.stamped;
    for (let i = 0; i < NIGHT_ENTRIES.length; i++) {
      const write = writing.rows[i]?.write ?? 0;
      const quant = write < 0.01 ? 0 : write > 0.98 ? 1 : Math.round(write * 28) / 28;
      last.current[i] = `${quant}|${theme.type.ink}|${stamped ? 1 : 0}`;
      const ctx = canvases[i].getContext("2d");
      if (!ctx) continue;
      paint(ctx, i, quant, theme.type.ink, theme.type.ink2, stamped);
      textures[i].needsUpdate = true;
      const mat = mats.current[i];
      if (mat) mat.opacity = typeAlpha(i, quant, stamped);
    }
  };

  useEffect(() => {
    const renderer = gl as THREE.WebGLRenderer;
    const max = renderer.capabilities?.getMaxAnisotropy?.() ?? 8;
    for (const t of textures) t.anisotropy = Math.min(16, max);
    const unsnap = onRelightSnap(paintAll);
    return () => {
      unsnap();
      for (const t of textures) t.dispose();
    };
  }, [textures, gl, canvases]);

  useFrame(() => {
    const theme = currentTheme();
    const stamped = writing.stamped;
    for (let i = 0; i < NIGHT_ENTRIES.length; i++) {
      const write = writing.rows[i]?.write ?? 0;
      const quant = write < 0.01 ? 0 : write > 0.98 ? 1 : Math.round(write * 28) / 28;
      const mat = mats.current[i];
      if (mat) mat.opacity = typeAlpha(i, quant, stamped);
      const key = `${quant}|${theme.type.ink}|${stamped ? 1 : 0}`;
      if (key === last.current[i]) continue;
      last.current[i] = key;
      const ctx = canvases[i].getContext("2d");
      if (!ctx) continue;
      paint(ctx, i, quant, theme.type.ink, theme.type.ink2, stamped);
      textures[i].needsUpdate = true;
    }
  });

  const x0 = rowX0();
  const x1 = rowX1();
  const width = x1 - x0;
  const mid = (x0 + x1) / 2;
  const h = rowPitch() * 0.92;

  return (
    <group>
      {NIGHT_ENTRIES.map((_, i) => (
        <mesh key={i} position={[mid, rowTextY(i), FACE_Z]} renderOrder={2}>
          <planeGeometry args={[width, h]} />
          <meshBasicMaterial
            ref={(el) => {
              mats.current[i] = el;
            }}
            map={textures[i]}
            transparent
            opacity={0}
            depthWrite={false}
            toneMapped={false}
            premultipliedAlpha
          />
        </mesh>
      ))}
    </group>
  );
}
