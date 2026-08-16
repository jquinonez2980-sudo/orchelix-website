import type { Object3D, Material, Texture, BufferGeometry, WebGLRenderer } from "three";

function disposeMaterial(material: Material | Material[]) {
  const list = Array.isArray(material) ? material : [material];
  for (const mat of list) {
    const record = mat as Material & Record<string, unknown>;
    for (const value of Object.values(record)) {
      if (value && typeof value === "object" && "isTexture" in value) {
        (value as Texture).dispose();
      }
    }
    mat.dispose();
  }
}

export function disposeObject(root: Object3D) {
  root.traverse((obj) => {
    const mesh = obj as Object3D & { geometry?: BufferGeometry; material?: Material | Material[] };
    mesh.geometry?.dispose();
    if (mesh.material) disposeMaterial(mesh.material);
  });
}

export function disposeRenderer(gl: WebGLRenderer | { dispose?: () => void }) {
  if ("dispose" in gl && typeof gl.dispose === "function") {
    gl.dispose();
  }
}
