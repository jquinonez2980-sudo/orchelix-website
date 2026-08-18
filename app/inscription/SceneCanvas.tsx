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
        stencil: false,
        depth: true,
        /* Extra backbuffer is a copy every frame. Screen-record can live
           without it; TBT cannot. */
        preserveDrawingBuffer: false,
      }}
      dpr={dpr}
      camera={{ fov: 26, near: 0.1, far: 48, position: [1.88, 0.38, 5.45] }}
      frameloop="demand"
      linear={false}
      flat={false}
      onCreated={(state) => {
        const gl = state.gl as { isWebGPURenderer?: boolean };
        if (inscription.backend === "none") {
          setInscription("backend", gl.isWebGPURenderer ? "webgpu" : "webgl");
        }

        const renderer = state.gl as {
          transmissionResolutionScale?: number;
          shadowMap?: { enabled: boolean };
        };
        if (renderer.shadowMap) renderer.shadowMap.enabled = false;

        /* Assign transmission scale only after the renderer has a real
           viewport. Writing it on the first frame has produced a 0×0
           target that then draws nothing. */
        const scale = inscription.quality.transmissionScale;
        const applyScale = () => {
          if (
            "transmissionResolutionScale" in renderer &&
            typeof scale === "number" &&
            scale > 0 &&
            scale < 1
          ) {
            renderer.transmissionResolutionScale = scale;
          }
          setInscription("ready", true);
          state.invalidate();
        };
        requestAnimationFrame(() => requestAnimationFrame(applyScale));

        const canvas = state.gl.domElement;
        const onLost = (event: Event) => {
          event.preventDefault();
          setInscription("ready", false);
          setInscription("quality", {
            ...inscription.quality,
            tier: "off",
            transmission: false,
            env: false,
            fps: 0,
          });
        };
        canvas.addEventListener("webglcontextlost", onLost, { passive: false });
      }}
      fallback={null}
    >
      <ThemeBridge />
      <Atmosphere />
      <InscriptionVolume />
    </Canvas>
  );
}
