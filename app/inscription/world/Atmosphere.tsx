"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useSyncExternalStore } from "react";
import { Environment } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { getInscriptionSnapshot, inscription, subscribeInscription } from "../store";
import { applyBoundRoom, bindRelightScene, currentTheme } from "../relight";
import { themeFor } from "../theme";

function StudioShell({ mode }: { mode: "light" | "dark" }) {
  const wall = mode === "dark" ? "#080b10" : "#d8dbe0";
  const lamp = mode === "dark" ? "#8aa0b8" : "#ffffff";
  const bounce = mode === "dark" ? "#141820" : "#9aa0a8";

  return (
    <group>
      <mesh scale={80}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial color={wall} side={THREE.BackSide} />
      </mesh>
      <mesh position={[-7.5, 9.5, 3]}>
        <sphereGeometry args={[mode === "dark" ? 1.4 : 3.4, 16, 16]} />
        <meshBasicMaterial color={lamp} />
      </mesh>
      <mesh position={[6.5, 1.2, -4.5]}>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshBasicMaterial color={bounce} />
      </mesh>
    </group>
  );
}

function bakeStudio(
  gl: THREE.WebGLRenderer,
  mode: "light" | "dark",
) {
  const env = new THREE.Scene();
  const wall = new THREE.Mesh(
    new THREE.SphereGeometry(40, 24, 24),
    new THREE.MeshBasicMaterial({
      color: mode === "dark" ? "#080b10" : "#d8dbe0",
      side: THREE.BackSide,
    }),
  );
  env.add(wall);
  const lamp = new THREE.Mesh(
    new THREE.SphereGeometry(mode === "dark" ? 1.4 : 3.4, 16, 16),
    new THREE.MeshBasicMaterial({ color: mode === "dark" ? "#8aa0b8" : "#ffffff" }),
  );
  lamp.position.set(-7.5, 9.5, 3);
  env.add(lamp);
  const bounce = new THREE.Mesh(
    new THREE.SphereGeometry(1.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: mode === "dark" ? "#141820" : "#9aa0a8" }),
  );
  bounce.position.set(6.5, 1.2, -4.5);
  env.add(bounce);
  const pmrem = new THREE.PMREMGenerator(gl);
  const tex = pmrem.fromScene(env, 0.04).texture;
  wall.geometry.dispose();
  (wall.material as THREE.Material).dispose();
  lamp.geometry.dispose();
  (lamp.material as THREE.Material).dispose();
  bounce.geometry.dispose();
  (bounce.material as THREE.Material).dispose();
  pmrem.dispose();
  return tex;
}

export default function Atmosphere() {
  const mode = useSyncExternalStore(
    subscribeInscription,
    () => getInscriptionSnapshot().mode,
    () => "light" as const,
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
  const bg = useMemo(() => new THREE.Color("#F4F5F6"), []);
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
      desk.current.visible = night;
      desk.current.intensity = night ? 0.45 : 0;
      desk.current.color.set("#8aa0b8");
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
      desk.current.visible = night;
      desk.current.intensity = night ? 0.45 : 0;
      desk.current.color.set("#8aa0b8");
    }
    if ("environmentIntensity" in scene) {
      (scene as THREE.Scene & { environmentIntensity: number }).environmentIntensity =
        theme.envIntensity;
    }
  });

  return (
    <>
      <hemisphereLight ref={hemi} args={["#F2F4F6", "#C5C8CD", 0.52]} />
      <ambientLight ref={fill} intensity={0.26} />
      <directionalLight ref={key} position={[-3.1, 5.4, 2.2]} intensity={2.7} />
      <spotLight
        ref={desk}
        position={[-0.55, 2.9, 1.35]}
        angle={0.36}
        penumbra={0.88}
        distance={6}
        decay={2}
        intensity={0}
        color="#8aa0b8"
        visible={false}
      />
      {backend === "webgpu" && inscription.quality.env ? (
        <Environment key={mode} frames={1} resolution={256} environmentIntensity={1}>
          <StudioShell mode={mode} />
        </Environment>
      ) : null}
    </>
  );
}
