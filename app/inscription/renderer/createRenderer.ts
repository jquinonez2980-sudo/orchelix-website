/* WebGPU factory with an offscreen probe.
   SceneCanvas currently uses R3F's WebGL renderer because Three's
   WebGPURenderer-on-WebGL2 fallback produces an empty frame.
   This module attaches only when the probe reports a real WebGPU backend. */

import * as THREE from "three";
import { inscription, setInscription } from "../store";
import { themeFor } from "../theme";

type GLFactoryProps = {
  canvas: HTMLCanvasElement | OffscreenCanvas;
};

export type CreatedRenderer = THREE.WebGLRenderer;

function applyCommon(renderer: {
  setClearColor?: (color: THREE.ColorRepresentation, alpha?: number) => void;
  setClearAlpha?: (alpha: number) => void;
  toneMapping: THREE.ToneMapping;
  toneMappingExposure: number;
  outputColorSpace?: string;
}) {
  const theme = themeFor(inscription.mode);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = theme.exposure;
  if (typeof renderer.setClearColor === "function") {
    renderer.setClearColor(theme.clear, 1);
  }
  if ("outputColorSpace" in renderer) {
    renderer.outputColorSpace = THREE.SRGBColorSpace;
  }
}

export async function createRenderer(props: GLFactoryProps): Promise<CreatedRenderer> {
  const canvas = props.canvas as HTMLCanvasElement;
  const quality = inscription.quality;

  const navGpu =
    "gpu" in navigator
      ? (navigator as Navigator & { gpu?: { requestAdapter: () => Promise<unknown> } }).gpu
      : undefined;
  const gpuAdapter =
    quality.allowWebGPU && navGpu ? await navGpu.requestAdapter().catch(() => null) : null;

  if (gpuAdapter) {
    try {
      const { WebGPURenderer } = await import("three/webgpu");
      const probe = document.createElement("canvas");
      const test = new WebGPURenderer({
        canvas: probe,
        antialias: false,
        alpha: false,
      });
      await test.init();
      const backend = test.backend as { isWebGPUBackend?: boolean };
      const realGpu = Boolean(backend?.isWebGPUBackend);
      test.dispose();
      probe.remove();

      if (realGpu) {
        const gpu = new WebGPURenderer({
          canvas,
          antialias: quality.antialias,
          alpha: false,
          powerPreference: "high-performance",
          trackTimestamp: false,
        });
        await gpu.init();
        applyCommon(gpu);
        setInscription("backend", "webgpu");
        return gpu as unknown as CreatedRenderer;
      }
    } catch (error) {
      console.warn("[inscription] WebGPU init failed, falling back to WebGL.", error);
    }
  }

  const gl = new THREE.WebGLRenderer({
    canvas,
    antialias: quality.antialias,
    alpha: false,
    powerPreference: "high-performance",
    stencil: false,
    depth: true,
    preserveDrawingBuffer: true,
  });
  applyCommon(gl);
  setInscription("backend", "webgl");
  return gl;
}
