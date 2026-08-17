"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useSyncExternalStore } from "react";
import { Environment } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { getInscriptionSnapshot, inscription, subscribeInscription } from "../store";
import { applyBoundRoom, bindRelightScene, currentTheme } from "../relight";
import { DARK_THEME, themeFor } from "../theme";

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

function fillStudio(scene: THREE.Scene, mode: "light" | "dark") {
  const p = roomPalette(mode);
  const night = mode === "dark";
  const added: THREE.Object3D[] = [];
  const wall = new THREE.Mesh(
    new THREE.SphereGeometry(40, 24, 24),
    new THREE.MeshBasicMaterial({ color: p.wall, side: THREE.BackSide }),
  );
  scene.add(wall);
  added.push(wall);

  const window = new THREE.Mesh(
    new THREE.PlaneGeometry(night ? 9 : 16, night ? 5.2 : 10),
    new THREE.MeshBasicMaterial({ color: p.window }),
  );
  window.position.set(-11, night ? 5.2 : 6.5, 3.5);
  window.lookAt(0, 1, 0);
  scene.add(window);
  added.push(window);

  const lamp = new THREE.Mesh(
    new THREE.SphereGeometry(night ? 1.35 : 4.2, 16, 16),
    new THREE.MeshBasicMaterial({ color: p.lamp }),
  );
  lamp.position.set(night ? -1.4 : -6.5, night ? 4.6 : 10.2, night ? 3.2 : 3.4);
  scene.add(lamp);
  added.push(lamp);

  const bounce = new THREE.Mesh(
    new THREE.SphereGeometry(1.6, 16, 16),
    new THREE.MeshBasicMaterial({ color: p.bounce }),
  );
  bounce.position.set(6.2, 1.1, -4.2);
  scene.add(bounce);
  added.push(bounce);

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(70, 70),
    new THREE.MeshBasicMaterial({ color: p.floor }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -8;
  scene.add(floor);
  added.push(floor);

  return added;
}

function StudioShell({ mode }: { mode: "light" | "dark" }) {
  const p = roomPalette(mode);
  const night = mode === "dark";
  return (
    <group>
      <mesh scale={80}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial color={p.wall} side={THREE.BackSide} />
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

function bakeStudio(
  gl: THREE.WebGLRenderer,
  mode: "light" | "dark",
) {
  const env = new THREE.Scene();
  const added = fillStudio(env, mode);
  const pmrem = new THREE.PMREMGenerator(gl);
  const tex = pmrem.fromScene(env, 0.06).texture;
  for (const obj of added) {
    env.remove(obj);
    const mesh = obj as THREE.Mesh;
    mesh.geometry.dispose();
    (mesh.material as THREE.Material).dispose();
  }
  pmrem.dispose();
  return tex;
}

export default function Atmosphere() {
  const mode = useSyncExternalStore(
    subscribeInscription,
    () => getInscriptionSnapshot().mode,
    () => "dark" as const,
  );
  const backend = useSyncExternalStore(
    subscribeInscription,
    () => getInscriptionSnapshot().backend,
    () => "none" as const,
  );
  const key = useRef<THREE.DirectionalLight>(null);
  const fill = useRef<THREE.AmbientLight>(null);
  const hemi = useRef<THREE.HemisphereLight>(null);
  const desk = useRef<THREE.SpotLight>(null);
  const rim = useRef<THREE.DirectionalLight>(null);
  const table = useRef<THREE.MeshStandardMaterial>(null);
  /* Seeded from the dark rig's clear so the very first frame is already night.
     A light seed shows one paper-white frame before the effect below runs. */
  const bg = useMemo(() => new THREE.Color(DARK_THEME.clear), []);
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  const camera = useThree((s) => s.camera);
  const envMaps = useRef<{ light: THREE.Texture; dark: THREE.Texture } | null>(null);

  const applyLights = (nextMode: "light" | "dark" = inscription.mode) => {
    const theme = currentTheme();
    const night = nextMode === "dark";
    if (key.current) {
      key.current.color.set(theme.key.color);
      key.current.intensity = theme.key.intensity;
      key.current.position.set(theme.key.position[0], theme.key.position[1], theme.key.position[2]);
    }
    if (fill.current) {
      fill.current.color.set(theme.fill.color);
      fill.current.intensity = theme.fill.intensity;
    }
    if (hemi.current) {
      hemi.current.color.set(theme.hemi.sky);
      hemi.current.groundColor.set(theme.hemi.ground);
      hemi.current.intensity = theme.hemi.intensity;
    }
    if (desk.current) {
      desk.current.visible = true;
      desk.current.intensity = night ? 2.6 : 0.32;
      desk.current.color.set(night ? "#e0cba8" : "#fff8ee");
    }
    if (rim.current) {
      rim.current.visible = night;
      rim.current.intensity = night ? 0.9 : 0;
      rim.current.color.set(night ? "#b7c8d8" : "#eef2f6");
    }
    if (table.current) {
      table.current.color.set(night ? "#0C1016" : "#E8EAED");
      table.current.roughness = night ? 0.9 : 0.82;
    }
  };

  useLayoutEffect(() => {
    bindRelightScene({
      gl: gl as THREE.WebGLRenderer,
      scene,
      camera,
      applyLights,
      env: envMaps.current ?? undefined,
    });
    applyBoundRoom(mode, false);
    return () => {
      bindRelightScene(null);
    };
  }, [mode, gl, scene, camera]);

  useEffect(() => {
    if (backend === "webgpu" || !inscription.quality.env) return;
    const webgl = gl as THREE.WebGLRenderer;
    if (!envMaps.current) {
      envMaps.current = {
        light: bakeStudio(webgl, "light"),
        dark: bakeStudio(webgl, "dark"),
      };
      webgl.setRenderTarget(null);
    }
    bindRelightScene({
      gl: webgl,
      scene,
      camera,
      applyLights,
      env: envMaps.current,
    });
    scene.environment = envMaps.current[mode];
  }, [backend, gl, scene, camera, mode]);

  useEffect(() => {
    return () => {
      if (!envMaps.current) return;
      envMaps.current.light.dispose();
      envMaps.current.dark.dispose();
      envMaps.current = null;
    };
  }, []);

  useFrame(() => {
    const theme = currentTheme();
    const clear = themeFor(inscription.mode).clear;
    scene.fog ??= new THREE.FogExp2(theme.fog, theme.fogDensity);
    const fog = scene.fog as THREE.FogExp2;
    fog.color.set(clear);
    fog.density = theme.fogDensity;
    bg.set(clear);
    scene.background = bg;

    if ("setClearColor" in gl && typeof gl.setClearColor === "function") {
      gl.setClearColor(clear, 1);
    }
    if ("toneMappingExposure" in gl) {
      (gl as THREE.WebGLRenderer).toneMappingExposure = theme.exposure;
    }

    if (key.current) {
      key.current.color.set(theme.key.color);
      key.current.intensity = theme.key.intensity;
      key.current.position.set(theme.key.position[0], theme.key.position[1], theme.key.position[2]);
    }
    if (fill.current) {
      fill.current.color.set(theme.fill.color);
      fill.current.intensity = theme.fill.intensity;
    }
    if (hemi.current) {
      hemi.current.color.set(theme.hemi.sky);
      hemi.current.groundColor.set(theme.hemi.ground);
      hemi.current.intensity = theme.hemi.intensity;
    }
    if (desk.current) {
      const night = inscription.mode === "dark";
      desk.current.visible = true;
      desk.current.intensity = night ? 2.6 : 0.32;
      desk.current.color.set(night ? "#e0cba8" : "#fff8ee");
    }
    if (rim.current) {
      const night = inscription.mode === "dark";
      rim.current.visible = night;
      rim.current.intensity = night ? 0.9 : 0;
      rim.current.color.set(night ? "#b7c8d8" : "#eef2f6");
    }
    if (table.current) {
      const night = inscription.mode === "dark";
      table.current.color.set(night ? "#0C1016" : "#E8EAED");
      table.current.roughness = night ? 0.9 : 0.82;
    }
    if ("environmentIntensity" in scene) {
      (scene as THREE.Scene & { environmentIntensity: number }).environmentIntensity =
        Math.max(theme.envIntensity, 0.28);
    }
  });

  return (
    <>
      <hemisphereLight ref={hemi} args={["#F2F4F6", "#C5C8CD", 0.52]} />
      <ambientLight ref={fill} intensity={0.26} />
      <directionalLight ref={key} position={[-3.1, 5.4, 2.2]} intensity={2.7} />
      <directionalLight ref={rim} position={[3.4, 1.4, -2.1]} intensity={0} color="#8fa3bb" />
      <spotLight
        ref={desk}
        position={[0.55, 2.55, 1.7]}
        angle={0.46}
        penumbra={0.82}
        distance={7}
        decay={2}
        intensity={0.55}
        color="#f2efe8"
      >
        <object3D attach="target" position={[1.02, -0.2, 0]} />
      </spotLight>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.7, -1.16, 0.15]} receiveShadow={false}>
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial
          ref={table}
          color="#c5c9cf"
          roughness={0.72}
          metalness={0}
          envMapIntensity={0.35}
        />
      </mesh>
      {backend === "webgpu" && inscription.quality.env ? (
        <Environment key={mode} frames={1} resolution={256} environmentIntensity={1}>
          <StudioShell mode={mode} />
        </Environment>
      ) : null}
    </>
  );
}
