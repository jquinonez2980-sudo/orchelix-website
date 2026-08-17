"use client";

import { Canvas } from "@react-three/fiber";
import { inscription, setInscription } from "./store";
import ThemeBridge from "./ThemeBridge";
import Atmosphere from "./world/Atmosphere";
import InscriptionVolume from "./world/InscriptionVolume";

export default function SceneCanvas() {
  const { dpr } = inscription.quality;

  return (
    <Canvas
      className="ins-canvas"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      gl={{
        antialias: inscription.quality.antialias,
        alpha: false,
        powerPreference: "high-performance",
        preserveDrawingBuffer: true,
      }}
      dpr={dpr}
      camera={{ fov: 26, near: 0.1, far: 48, position: [1.88, 0.38, 5.45] }}
      frameloop="always"
      linear={false}
      flat={false}
      onCreated={(state) => {
        const gl = state.gl as { isWebGPURenderer?: boolean };
        if (inscription.backend === "none") {
          setInscription("backend", gl.isWebGPURenderer ? "webgpu" : "webgl");
        }
        setInscription("ready", true);
      }}
      fallback={null}
    >
      <ThemeBridge />
      <Atmosphere />
      <InscriptionVolume />
    </Canvas>
  );
}
