"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import {
  applyLedgerTheme,
  applyRimTheme,
  buildRulingGeometry,
  createLedgerMaterials,
  makeRimMaterial,
} from "../materials/ledger";
import { inscription, lerp } from "../store";
import { currentTheme, isRelighting, setRelightMaterials } from "../relight";
import { themeFor } from "../theme";
import { writing } from "../writing/WritingDirector";
import { isNarrowView } from "../ScrollDirector";
import { dimLamp, setLampFromWorld } from "../lampScreen";
import { FACE_Z, PAGE, VOLUME, rowTextY, rowX0, rowX1, volumeWorldX } from "./volumeLayout";
import VoiceFilaments from "./VoiceFilament";
import InscribedRows from "./InscribedRows";
import StampDie, { dieRoot } from "./StampDie";

const SIZE = VOLUME;

const lampPoint = new THREE.Vector3();

export default function InscriptionVolume() {
  const group = useRef<THREE.Group>(null);
  const rulingMat = useRef<THREE.LineBasicMaterial>(null);
  const contactMat = useRef<THREE.MeshBasicMaterial>(null);
  const camera = useThree((s) => s.camera);
  const handle = useMemo(
    () => createLedgerMaterials(inscription.backend, inscription.quality.texScale),
    [],
  );
  const rulingGeo = useMemo(
    () => buildRulingGeometry(PAGE.w, PAGE.h, FACE_Z * 2),
    [],
  );
  const glassGeo = useMemo(() => {
    const segs = inscription.quality.tier === "low" ? 2 : 4;
    return new RoundedBoxGeometry(SIZE.w, SIZE.h, SIZE.d, segs, 0.03);
  }, []);
  const pageGeo = useMemo(() => {
    const segs = inscription.quality.tier === "low" ? 1 : 2;
    return new RoundedBoxGeometry(SIZE.w * 0.76, SIZE.h * 0.8, 0.042, segs, 0.008);
  }, []);
  const rimMat = useMemo(() => makeRimMaterial(), []);

  useLayoutEffect(() => {
    const apply = () => {
      const theme = currentTheme();
      applyLedgerTheme(handle, theme, inscription.quality.transmission);
      applyRimTheme(rimMat, inscription.mode === "dark");
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
      glassGeo.dispose();
      pageGeo.dispose();
      rimMat.dispose();
    };
  }, [handle, rulingGeo, glassGeo, pageGeo, rimMat]);

  useFrame((_, dt) => {
    if (isRelighting()) {
      const theme = currentTheme();
      applyLedgerTheme(handle, theme, inscription.quality.transmission);
      if (rulingMat.current) {
        rulingMat.current.color.set(theme.ruling.color);
        rulingMat.current.opacity = theme.ruling.opacity;
      }
      if (contactMat.current) {
        contactMat.current.opacity = inscription.mode === "dark" ? 0.4 : 0.16;
      }
      applyRimTheme(rimMat, inscription.mode === "dark");
    }

    const g = group.current;
    if (!g) return;
    const reduced = inscription.quality.reducedMotion;
    const p = reduced ? 0 : inscription.progress;
    const beat = inscription.beat;
    const narrow = isNarrowView();
    const yaw = narrow
      ? 0.16
      : beat === 1
        ? 0.52
        : beat === 2
          ? 0.48
          : beat === 4
            ? 0.36
            : 0.72 - p * 0.26;
    const pitch = narrow
      ? -0.06
      : beat === 1
        ? -0.12
        : beat === 2
          ? -0.14
          : beat === 4
            ? -0.1
            : -0.2 + p * 0.06;
    const k = 1 - Math.exp(-dt * 5.2);
    g.rotation.y = narrow ? yaw : lerp(g.rotation.y, yaw, k);
    g.rotation.x = narrow ? pitch : lerp(g.rotation.x, pitch, k);
    const first = writing.rows[0]?.write ?? 0;
    const x = volumeWorldX({ beat, progress: p, firstWrite: first, narrow });
    /* Narrow must snap. A lerp from the desktop start (1.02) leaves the
       ledger sitting to the right of the camera aim, then further right
       as beats change. */
    g.position.x = narrow ? x : lerp(g.position.x, x, k);
    const y = (narrow ? 0.04 : beat === 1 ? -0.13 : 0.08) - writing.impact * 0.045;
    g.position.y = narrow ? y : lerp(g.position.y, y, k);

    if (inscription.mode !== "dark") {
      dimLamp();
    } else {
      g.updateMatrixWorld();
      const lead = writing.active[writing.active.length - 1];
      if (lead !== undefined) {
        const write = writing.rows[lead]?.write ?? 0;
        lampPoint.set(
          rowX0() + (rowX1() - rowX0()) * write,
          rowTextY(lead),
          FACE_Z,
        );
        lampPoint.applyMatrix4(g.matrixWorld);
        setLampFromWorld(camera, lampPoint, 1);
      } else {
        lampPoint.set(PAGE.w * 0.22, 0.08, FACE_Z);
        lampPoint.applyMatrix4(g.matrixWorld);
        setLampFromWorld(camera, lampPoint, 0.92);
      }
    }
  });

  return (
    <group ref={group} position={[1.02, -0.13, 0]}>
      <mesh
        geometry={pageGeo}
        material={handle.pages}
        castShadow={false}
        receiveShadow={false}
        position={[0, 0, -0.01]}
        onBeforeRender={() => {
          if (dieRoot.current) dieRoot.current.visible = false;
        }}
      />

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
        geometry={glassGeo}
        material={handle.glass}
        castShadow={false}
        receiveShadow={false}
        onAfterRender={() => {
          if (dieRoot.current) dieRoot.current.visible = writing.stamp > 0.01;
        }}
      />
      <mesh geometry={glassGeo} material={rimMat} renderOrder={5} />
      {handle.contact ? (
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -SIZE.h / 2 - 0.012, 0.02]}
          renderOrder={0}
        >
          <planeGeometry args={[SIZE.w * 1.28, SIZE.d * 2.4]} />
          <meshBasicMaterial
            ref={contactMat}
            map={handle.contact}
            transparent
            opacity={0.4}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ) : null}
      <InscribedRows />
      <VoiceFilaments />
      <StampDie />
    </group>
  );
}
