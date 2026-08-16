"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { writing, FIRST_BOOKED } from "../writing/WritingDirector";
import { inscription } from "../store";
import { FACE_Z, rowX1, rowY } from "./volumeLayout";

const STEEL = "#9B184C";
const STEEL_LIT = "#D24A7C";
const FACE = "#4A1028";

function makeDieGeometry() {
  const profile = [
    [0.0, 0.118],
    [0.022, 0.118],
    [0.03, 0.114],
    [0.032, 0.108],
    [0.032, 0.062],
    [0.034, 0.052],
    [0.048, 0.046],
    [0.056, 0.04],
    [0.05, 0.032],
    [0.062, 0.02],
    [0.082, 0.01],
    [0.092, 0.004],
    [0.096, 0.001],
    [0.096, 0.0],
    [0.0, 0.0],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  return new THREE.LatheGeometry(profile, 96);
}

export const dieRoot = { current: null as THREE.Group | null };

export default function StampDie() {
  const group = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const stain = useRef<THREE.Mesh>(null);
  const flash = useRef<THREE.PointLight>(null);
  const geo = useMemo(() => makeDieGeometry(), []);
  const metal = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: STEEL,
        metalness: 1,
        roughness: 0.18,
        clearcoat: 0.55,
        clearcoatRoughness: 0.12,
        envMapIntensity: 1.35,
        specularIntensity: 1,
        specularColor: new THREE.Color("#f0c6d4"),
        transparent: true,
        opacity: 1,
        depthWrite: true,
      }),
    [],
  );
  const face = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: FACE,
        metalness: 0.94,
        roughness: 0.34,
        clearcoat: 0.2,
        clearcoatRoughness: 0.28,
        envMapIntensity: 0.7,
        transparent: true,
        opacity: 1,
        depthWrite: true,
      }),
    [],
  );

  useEffect(() => {
    return () => {
      geo.dispose();
      metal.dispose();
      face.dispose();
    };
  }, [geo, metal, face]);

  useFrame((_, dt) => {
    const g = group.current;
    dieRoot.current = g;
    if (!g) return;
    const t = writing.press;
    const live = writing.stamp > 0.01;
    g.visible = live;

    const row = FIRST_BOOKED < 0 ? 0 : FIRST_BOOKED;
    const y = rowY(row);
    const x = rowX1() - 0.14;
    const hover = y + 0.26;
    const pressed = y + 0.046;
    const goalY = hover + (pressed - hover) * t;
    const squash = writing.impact > 0 ? 1 - writing.impact * 0.06 : 1;

    g.position.x = x;
    g.position.z = FACE_Z + 0.036 + (1 - t) * 0.07;
    g.position.y += (goalY - g.position.y) * Math.min(1, dt * 28);
    g.rotation.z = 0.008 * (1 - t);
    g.scale.set(1, squash, 1);

    if (body.current) {
      body.current.rotation.x = 0.32 - t * 0.26;
    }

    if (stain.current) {
      const show = writing.stamped ? 1 : Math.max(0, t - 0.86) / 0.14;
      stain.current.visible = show > 0.02;
      const mat = stain.current.material as THREE.MeshBasicMaterial;
      mat.opacity = show * 0.55;
    }
    const night = inscription.mode === "dark";
    metal.color.set(night ? "#C43A72" : STEEL);
    metal.emissive.set(night ? "#B7135A" : "#000000");
    metal.emissiveIntensity = night ? 0.42 : 0;
    metal.envMapIntensity = night ? 0.62 : 1.35;
    face.color.set(night ? "#6A1438" : FACE);
    face.emissive.set(night ? "#8A1848" : "#000000");
    face.emissiveIntensity = night ? 0.22 : 0;

    if (flash.current) {
      const hold = night && live ? 0.7 : 0;
      flash.current.intensity = Math.max(writing.impact * 3.4, hold);
      flash.current.visible = flash.current.intensity > 0.04;
      flash.current.position.set(x, goalY, FACE_Z + 0.1);
    }
  });

  return (
    <group>
      <group ref={group} visible={false} position={[0, 0.8, FACE_Z]} renderOrder={6}>
        <group ref={body} rotation={[0.32, 0, 0]}>
          <mesh geometry={geo} material={metal} />
          <mesh position={[0, 0.0006, 0]} rotation={[Math.PI / 2, 0, 0]} material={face}>
            <circleGeometry args={[0.086, 48]} />
          </mesh>
          <mesh position={[0, 0.0003, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.078, 0.092, 48]} />
            <meshPhysicalMaterial
              color={STEEL_LIT}
              metalness={1}
              roughness={0.1}
              clearcoat={0.7}
              clearcoatRoughness={0.08}
              transparent
              opacity={1}
              depthWrite
            />
          </mesh>
        </group>
      </group>
      <pointLight
        ref={flash}
        color="#B7135A"
        distance={1.6}
        decay={2}
        intensity={0}
        visible={false}
      />
      <mesh
        ref={stain}
        position={[
          rowX1() - 0.14,
          rowY(FIRST_BOOKED < 0 ? 0 : FIRST_BOOKED) - 0.004,
          FACE_Z + 0.001,
        ]}
        visible={false}
      >
        <circleGeometry args={[0.042, 32]} />
        <meshBasicMaterial
          color="#B7135A"
          transparent
          opacity={0}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
