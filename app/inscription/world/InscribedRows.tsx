"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { NIGHT_ENTRIES } from "../data/nightRegister";
import { writing } from "../writing/WritingDirector";
import { currentTheme, onRelightSnap } from "../relight";
import { FACE_Z, rowX0, rowX1, rowY } from "./volumeLayout";

const TEX_W = 2560;
const TEX_H = 192;

function paint(
  ctx: CanvasRenderingContext2D,
  index: number,
  write: number,
  ink: string,
  ink2: string,
  stamped: boolean,
) {
  const entry = NIGHT_ENTRIES[index];
  const w = TEX_W;
  const h = TEX_H;
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

  const draw = (text: string, x: number, y: number) => {
    ctx.lineWidth = 1.15;
    ctx.strokeStyle = ctx.fillStyle as string;
    ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);
  };

  ctx.font = '600 92px "Azeret Mono", ui-monospace, monospace';
  ctx.fillStyle = ink;
  draw(entry.time, 32, h / 2);

  ctx.fillStyle = ink2;
  draw("·", 292, h / 2);

  ctx.font =
    entry.lang === "ES"
      ? '700 84px "Azeret Mono", ui-monospace, monospace'
      : '500 84px "Azeret Mono", ui-monospace, monospace';
  ctx.fillStyle = ink;
  draw(entry.lang, 338, h / 2);
  if (entry.lang === "ES") {
    ctx.fillRect(338, h / 2 + 38, 92, 4);
  }

  ctx.fillStyle = ink2;
  ctx.font = '600 92px "Azeret Mono", ui-monospace, monospace';
  draw("·", 458, h / 2);

  ctx.save();
  ctx.beginPath();
  ctx.rect(500, 0, w - 500 - 360, h);
  ctx.clip();
  ctx.font = '500 78px "Azeret Mono", ui-monospace, monospace';
  ctx.fillStyle = ink;
  draw(entry.reason, 508, h / 2);
  ctx.restore();

  ctx.textAlign = "right";
  ctx.font = '600 76px "Azeret Mono", ui-monospace, monospace';
  ctx.fillStyle = ink;
  draw(entry.disposition, w - 36, h / 2);
  if (stamped && entry.disposition === "BOOKED") {
    ctx.fillStyle = "#B7135A";
    ctx.fillRect(w - 292, h / 2 + 38, 250, 5);
  }
  ctx.restore();
}

export default function InscribedRows() {
  const gl = useThree((s) => s.gl);
  const canvases = useMemo(
    () =>
      NIGHT_ENTRIES.map(() => {
        const c = document.createElement("canvas");
        c.width = TEX_W;
        c.height = TEX_H;
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
      if (mat) mat.opacity = quant > 0 ? 1 : 0;
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
      const key = `${quant}|${theme.type.ink}|${stamped ? 1 : 0}`;
      if (key === last.current[i]) continue;
      last.current[i] = key;
      const ctx = canvases[i].getContext("2d");
      if (!ctx) continue;
      paint(ctx, i, quant, theme.type.ink, theme.type.ink2, stamped);
      textures[i].needsUpdate = true;
      const mat = mats.current[i];
      if (mat) mat.opacity = quant > 0 ? 1 : 0;
    }
  });

  const x0 = rowX0();
  const x1 = rowX1();
  const width = x1 - x0;
  const mid = (x0 + x1) / 2;

  return (
    <group>
      {NIGHT_ENTRIES.map((_, i) => (
        <mesh key={i} position={[mid, rowY(i), FACE_Z]} renderOrder={2}>
          <planeGeometry args={[width, 0.12]} />
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
