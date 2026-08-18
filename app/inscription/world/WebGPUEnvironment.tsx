"use client";

import { Environment } from "@react-three/drei";
import { useSyncExternalStore } from "react";
import { getInscriptionSnapshot, subscribeInscription } from "../store";

function roomPalette(mode: "light" | "dark") {
  const night = mode === "dark";
  return {
    wall: night ? "#07090d" : "#e4e6ea",
    lamp: night ? "#f0d7b0" : "#fffdf8",
    window: night ? "#b4c6d8" : "#ffffff",
    bounce: night ? "#1a1e26" : "#b4b8be",
    floor: night ? "#10141a" : "#e8eaed",
  };
}

function StudioShell({ mode }: { mode: "light" | "dark" }) {
  const p = roomPalette(mode);
  const night = mode === "dark";
  return (
    <group>
      <mesh scale={80}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial color={p.wall} side={1} />
      </mesh>
      <mesh position={[-11, night ? 5.2 : 6.5, 3.5]} lookAt={[0, 1, 0]}>
        <planeGeometry args={[night ? 9 : 16, night ? 5.2 : 10]} />
        <meshBasicMaterial color={p.window} />
      </mesh>
      <mesh position={[night ? -1.4 : -6.5, night ? 4.6 : 10.2, night ? 3.2 : 3.4]}>
        <sphereGeometry args={[night ? 1.35 : 4.2, 16, 16]} />
        <meshBasicMaterial color={p.lamp} />
      </mesh>
      <mesh position={[6.2, 1.1, -4.2]}>
        <sphereGeometry args={[1.6, 16, 16]} />
        <meshBasicMaterial color={p.bounce} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -8, 0]}>
        <planeGeometry args={[70, 70]} />
        <meshBasicMaterial color={p.floor} />
      </mesh>
    </group>
  );
}

export default function WebGPUEnvironment() {
  const mode = useSyncExternalStore(
    subscribeInscription,
    () => getInscriptionSnapshot().mode,
    () => "dark" as const,
  );
  if (!getInscriptionSnapshot().quality.env) return null;
  return (
    <Environment key={mode} frames={1} resolution={256} environmentIntensity={1}>
      <StudioShell mode={mode} />
    </Environment>
  );
}
