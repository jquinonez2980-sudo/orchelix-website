"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { writing } from "../writing/WritingDirector";
import { currentTheme } from "../relight";
import { inscription } from "../store";
import { ENTRY_COUNT, FACE_Z, VOLUME, rowTextY, rowX0, rowX1 } from "./volumeLayout";

const SEGMENTS = 28;
const POOL = 3;
const HALF = 0.00135;
const AXIS = new THREE.Vector3(1, 0, 0);

function makeCurve(index: number) {
  const y = rowTextY(index);
  const x0 = rowX0();
  const x1 = rowX1();
  const left = -VOLUME.w / 2;
  return new THREE.CatmullRomCurve3([
    new THREE.Vector3(left - 0.82, y, FACE_Z),
    new THREE.Vector3(left - 0.06, y, FACE_Z),
    new THREE.Vector3(x0, y, FACE_Z),
    new THREE.Vector3(x1, y, FACE_Z),
  ]);
}

function headT(approach: number, write: number) {
  if (write <= 0) return approach * 0.52;
  return 0.52 + write * 0.48;
}

function makeRibbon() {
  const geo = new THREE.BufferGeometry();
  const count = SEGMENTS * 2;
  geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
  geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
  const idx: number[] = [];
  for (let i = 0; i < SEGMENTS - 1; i++) {
    const a = i * 2;
    idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
  }
  geo.setIndex(idx);
  return geo;
}

export default function VoiceFilaments() {
  const curves = useMemo(
    () => Array.from({ length: ENTRY_COUNT }, (_, i) => makeCurve(i)),
    [],
  );
  const geos = useMemo(() => Array.from({ length: POOL }, () => makeRibbon()), []);
  const mats = useMemo(
    () =>
      Array.from({ length: POOL }, () =>
        new THREE.MeshBasicMaterial({
          vertexColors: true,
          transparent: true,
          depthWrite: false,
          toneMapped: false,
          side: THREE.DoubleSide,
        }),
      ),
    [],
  );
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const heads = useRef<(THREE.Mesh | null)[]>([]);
  const light = useRef<THREE.PointLight>(null);
  const point = useMemo(() => new THREE.Vector3(), []);
  const tangent = useMemo(() => new THREE.Vector3(), []);
  const tint = useMemo(() => new THREE.Color(), []);

  useEffect(() => {
    return () => {
      for (const g of geos) g.dispose();
      for (const m of mats) m.dispose();
    };
  }, [geos, mats]);

  useFrame(() => {
    const theme = currentTheme();
    tint.set(theme.filament.color);
    const night = inscription.mode === "dark";
    const live = writing.active.slice(0, POOL);

    for (let slot = 0; slot < POOL; slot++) {
      const mesh = meshes.current[slot];
      const head = heads.current[slot];
      const index = live[slot];
      const on = index !== undefined;
      if (mesh) mesh.visible = on;
      if (head) head.visible = on;
      if (!on || index === undefined) continue;

      const row = writing.rows[index];
      const tHead = headT(row.approach, row.write);
      const tailLen = 0.16 + (1 - row.write) * 0.12;
      const tTail = Math.max(0, tHead - tailLen);
      const geo = geos[slot];
      const pos = geo.attributes.position as THREE.BufferAttribute;
      const col = geo.attributes.color as THREE.BufferAttribute;
      const curve = curves[index];

      for (let s = 0; s < SEGMENTS; s++) {
        const u = s / (SEGMENTS - 1);
        const t = tTail + (tHead - tTail) * u;
        curve.getPoint(t, point);
        const fade = u;
        pos.setXYZ(s * 2, point.x, point.y + HALF, point.z);
        pos.setXYZ(s * 2 + 1, point.x, point.y - HALF, point.z);
        col.setXYZ(s * 2, tint.r * fade, tint.g * fade, tint.b * fade);
        col.setXYZ(s * 2 + 1, tint.r * fade, tint.g * fade, tint.b * fade);
      }
      pos.needsUpdate = true;
      col.needsUpdate = true;
      geo.computeBoundingSphere();
      mats[slot].opacity = night ? 0.88 : 0.74;

      curve.getPoint(tHead, point);
      curve.getTangent(tHead, tangent).normalize();
      if (head) {
        head.position.copy(point);
        if (tangent.lengthSq() > 1e-8) {
          head.quaternion.setFromUnitVectors(AXIS, tangent);
        }
        const hm = head.material as THREE.MeshBasicMaterial;
        hm.color.copy(tint);
        hm.opacity = night ? 0.95 : 0.82;
      }
    }

    const lead = live[live.length - 1];
    if (light.current) {
      const on = night && lead !== undefined;
      light.current.visible = on;
      light.current.intensity = on ? theme.filament.emission * 0.7 : 0;
      if (on && heads.current[live.length - 1]) {
        light.current.position.copy(heads.current[live.length - 1]!.position);
      }
    }
  });

  return (
    <group>
      {geos.map((geo, i) => (
        <mesh
          key={i}
          ref={(el) => {
            meshes.current[i] = el;
          }}
          geometry={geo}
          material={mats[i]}
          visible={false}
          renderOrder={3}
        />
      ))}
      {Array.from({ length: POOL }, (_, i) => (
        <mesh
          key={`h${i}`}
          ref={(el) => {
            heads.current[i] = el;
          }}
          visible={false}
          renderOrder={4}
        >
          <boxGeometry args={[0.018, 0.0042, 0.0024]} />
          <meshBasicMaterial
            color={currentTheme().filament.color}
            transparent
            toneMapped={false}
            depthWrite={false}
          />
        </mesh>
      ))}
      <pointLight
        ref={light}
        color="#c8d0d8"
        distance={1.4}
        decay={2}
        intensity={0}
        visible={false}
      />
    </group>
  );
}


