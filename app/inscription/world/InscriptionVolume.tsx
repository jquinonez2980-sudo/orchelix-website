"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  applyLedgerTheme,
  buildRulingGeometry,
  createLedgerMaterials,
} from "../materials/ledger";
import { inscription, lerp } from "../store";
import { currentTheme, setRelightMaterials } from "../relight";
import { themeFor } from "../theme";
import { writing } from "../writing/WritingDirector";
import { isNarrowView } from "../ScrollDirector";
import { PAGE, VOLUME } from "./volumeLayout";
import VoiceFilaments from "./VoiceFilament";
import InscribedRows from "./InscribedRows";
import StampDie, { dieRoot } from "./StampDie";

const SIZE = VOLUME;

export default function InscriptionVolume() {
  const group = useRef<THREE.Group>(null);
  const rulingMat = useRef<THREE.LineBasicMaterial>(null);
  const handle = useMemo(() => createLedgerMaterials(inscription.backend), []);
  const rulingGeo = useMemo(
    () => buildRulingGeometry(PAGE.w, PAGE.h, 0.012),
    [],
  );
  const edge = useMemo(() => {
    const box = new THREE.BoxGeometry(SIZE.w, SIZE.h, SIZE.d);
    const edges = new THREE.EdgesGeometry(box, 15);
    box.dispose();
    return edges;
  }, []);

  useLayoutEffect(() => {
    const apply = () => {
      const theme = currentTheme();
      applyLedgerTheme(handle, theme, inscription.quality.transmission);
      if (rulingMat.current) {
        rulingMat.current.color.set(theme.ruling.color);
        rulingMat.current.opacity = theme.ruling.opacity;
      }
    };
    setRelightMaterials(apply);
    apply();
    return () => setRelightMaterials(null);
  }, [handle]);

  useEffect(() => {
    return () => {
      handle.dispose();
      rulingGeo.dispose();
      edge.dispose();
    };
  }, [handle, rulingGeo, edge]);

  useFrame((_, dt) => {
    const theme = currentTheme();
    applyLedgerTheme(handle, theme, inscription.quality.transmission);
    if (rulingMat.current) {
      rulingMat.current.color.set(theme.ruling.color);
      rulingMat.current.opacity = theme.ruling.opacity;
    }

    const g = group.current;
    if (!g) return;
    const reduced = inscription.quality.reducedMotion;
    const p = reduced ? 0 : inscription.progress;
    const beat = inscription.beat;
    const narrow = isNarrowView();
    const yaw = narrow
      ? beat === 2
        ? 0.26
        : beat === 4
          ? 0.2
          : 0.36 - p * 0.08
      : beat === 2
        ? 0.48
        : beat === 4
          ? 0.36
          : 0.72 - p * 0.26;
    const pitch = narrow
      ? beat === 2
        ? -0.08
        : beat === 4
          ? -0.06
          : -0.1 + p * 0.03
      : beat === 2
        ? -0.14
        : beat === 4
          ? -0.1
          : -0.2 + p * 0.06;
    const k = 1 - Math.exp(-dt * 5.2);
    g.rotation.y = lerp(g.rotation.y, yaw, k);
    g.rotation.x = lerp(g.rotation.x, pitch, k);
    g.position.x = lerp(g.position.x, narrow ? -0.04 : 0.35 - p * 0.16, k);
    g.position.y = lerp(
      g.position.y,
      (narrow ? (beat === 4 ? 0.46 : 0.22) : 0.08) - writing.impact * 0.018,
      k,
    );
  });

  return (
    <group ref={group} position={[0.35, 0.08, 0]}>
      <mesh
        material={handle.pages}
        castShadow={false}
        receiveShadow={false}
        position={[0, 0, -0.012]}
        onBeforeRender={() => {
          if (dieRoot.current) dieRoot.current.visible = false;
        }}
      >
        <boxGeometry args={[SIZE.w * 0.78, SIZE.h * 0.8, 0.028]} />
      </mesh>

      <lineSegments geometry={rulingGeo}>
        <lineBasicMaterial
          ref={rulingMat}
          color={themeFor(inscription.mode).ruling.color}
          transparent
          opacity={themeFor(inscription.mode).ruling.opacity}
          depthWrite={false}
        />
      </lineSegments>

      <mesh
        material={handle.glass}
        castShadow={false}
        receiveShadow={false}
        onAfterRender={() => {
          if (dieRoot.current) dieRoot.current.visible = writing.stamp > 0.01;
        }}
      >
        <boxGeometry args={[SIZE.w, SIZE.h, SIZE.d]} />
      </mesh>
      <lineSegments geometry={edge}>
        <lineBasicMaterial
          color={themeFor(inscription.mode).ruling.color}
          transparent
          opacity={0.42}
          depthWrite={false}
        />
      </lineSegments>
      <InscribedRows />
      <VoiceFilaments />
      <StampDie />
    </group>
  );
}
