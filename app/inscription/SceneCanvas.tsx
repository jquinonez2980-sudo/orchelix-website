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
        /* Keep the last frame. Without it, Snipping Tool / Game Bar / a
           phone screen-record often grab a cleared buffer (or Windows
           refuses the capture as "blocked for security") the moment the
           tab blurs. The extra backbuffer is the cost of a recordable page. */
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
        /* The single biggest lever on a phone. Three renders the whole scene a
           second time into this target for every transmissive material, every
           frame; at 0.34 that second pass costs about a ninth of the pixels.
           Set here rather than in createRenderer because R3F owns the renderer
           instance when `gl` is a props object. */
        /* Only write a reduced scale. The default is 1, and assigning the
           property on the first frame (before Three has a real viewport)
           has produced a 0×0 transmission target that then draws nothing
           — including on desktop HIGH, where the scale is identity anyway.
           Reduced values stay for MID; HIGH leaves the renderer default. */
        const scale = inscription.quality.transmissionScale;
        const renderer = state.gl as { transmissionResolutionScale?: number };
        if (
          "transmissionResolutionScale" in renderer &&
          typeof scale === "number" &&
          scale > 0 &&
          scale < 1
        ) {
          renderer.transmissionResolutionScale = scale;
        }

        setInscription("ready", true);

        /* A lost context is the difference between a static poster and a black
           rectangle where the record should be. iOS drops contexts under
           memory pressure and on backgrounding, and without this the canvas
           stays mounted and paints nothing. Dropping the tier to "off" swaps
           in the poster, which is a real, readable fallback. */
        const canvas = state.gl.domElement;
        const onLost = (event: Event) => {
          event.preventDefault();
          setInscription("quality", {
            ...inscription.quality,
            tier: "off",
            transmission: false,
            env: false,
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
