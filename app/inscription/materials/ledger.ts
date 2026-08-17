import * as THREE from "three";
import type { Backend } from "../store";
import { LIGHT_THEME, type SceneTheme } from "../theme";

export type LedgerHandle = {
  glass: THREE.MeshPhysicalMaterial;
  pages: THREE.MeshPhysicalMaterial;
  paperMap: THREE.CanvasTexture | null;
  paperRough: THREE.CanvasTexture | null;
  contact: THREE.CanvasTexture | null;
  dispose: () => void;
};

function makePaperMaps() {
  if (typeof document === "undefined") {
    return { map: null, rough: null, contact: null };
  }
  const size = 512;
  const paper = document.createElement("canvas");
  paper.width = size;
  paper.height = size;
  const ctx = paper.getContext("2d");
  if (!ctx) return { map: null, rough: null, contact: null };
  const pix = ctx.createImageData(size, size);
  for (let i = 0; i < pix.data.length; i += 4) {
    const n = 232 + Math.random() * 14;
    const laid = ((i / 4) % size) % 11 === 0 ? 4 : 0;
    pix.data[i] = n + laid;
    pix.data[i + 1] = n - 1;
    pix.data[i + 2] = n - 4;
    pix.data[i + 3] = 255;
  }
  ctx.putImageData(pix, 0, 0);
  const map = new THREE.CanvasTexture(paper);
  map.colorSpace = THREE.SRGBColorSpace;
  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(2.4, 3.2);
  map.anisotropy = 8;

  const roughCanvas = document.createElement("canvas");
  roughCanvas.width = size;
  roughCanvas.height = size;
  const rctx = roughCanvas.getContext("2d");
  if (rctx) {
    const rp = rctx.createImageData(size, size);
    for (let i = 0; i < rp.data.length; i += 4) {
      const n = 188 + Math.random() * 28;
      rp.data[i] = n;
      rp.data[i + 1] = n;
      rp.data[i + 2] = n;
      rp.data[i + 3] = 255;
    }
    rctx.putImageData(rp, 0, 0);
  }
  const rough = new THREE.CanvasTexture(roughCanvas);
  rough.wrapS = rough.wrapT = THREE.RepeatWrapping;
  rough.repeat.set(2.4, 3.2);

  const blot = document.createElement("canvas");
  blot.width = 256;
  blot.height = 256;
  const bctx = blot.getContext("2d");
  if (bctx) {
    const g = bctx.createRadialGradient(128, 128, 12, 128, 128, 124);
    g.addColorStop(0, "rgba(0,0,0,0.42)");
    g.addColorStop(0.45, "rgba(0,0,0,0.14)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    bctx.fillStyle = g;
    bctx.fillRect(0, 0, 256, 256);
  }
  const contact = new THREE.CanvasTexture(blot);
  contact.colorSpace = THREE.SRGBColorSpace;

  return { map, rough, contact };
}

const GLASS_BASE: THREE.MeshPhysicalMaterialParameters = {
  color: LIGHT_THEME.ledger.tint,
  metalness: 0,
  roughness: LIGHT_THEME.ledger.roughness,
  ior: LIGHT_THEME.ledger.ior,
  transmission: LIGHT_THEME.ledger.transmission,
  thickness: LIGHT_THEME.ledger.thickness,
  attenuationColor: LIGHT_THEME.ledger.attenuation,
  attenuationDistance: LIGHT_THEME.ledger.attenuationDistance,
  clearcoat: LIGHT_THEME.ledger.clearcoat,
  clearcoatRoughness: LIGHT_THEME.ledger.clearcoatRoughness,
  specularIntensity: 1,
  specularColor: "#ffffff",
  envMapIntensity: 1.8,
  transparent: true,
  opacity: 1,
  side: THREE.FrontSide,
};

const PAGE_BASE: THREE.MeshPhysicalMaterialParameters = {
  color: LIGHT_THEME.pages.color,
  metalness: 0,
  roughness: LIGHT_THEME.pages.roughness,
  clearcoat: 0.15,
  clearcoatRoughness: 0.6,
  envMapIntensity: 0.35,
};

export function applyLedgerTheme(
  handle: LedgerHandle,
  theme: SceneTheme,
  transmission: boolean,
) {
  const g = handle.glass;
  g.color.set(theme.ledger.tint);
  g.roughness = theme.ledger.roughness;
  g.ior = theme.ledger.ior;
  g.transmission = transmission ? theme.ledger.transmission : 0.08;
  g.opacity = transmission ? 1 : 0.22;
  g.transparent = true;
  g.depthWrite = !transmission;
  g.thickness = theme.ledger.thickness;
  g.attenuationColor.set(theme.ledger.attenuation);
  g.attenuationDistance = theme.ledger.attenuationDistance;
  g.clearcoat = theme.ledger.clearcoat;
  g.clearcoatRoughness = theme.ledger.clearcoatRoughness;
  g.envMapIntensity = theme.envIntensity < 0.5 ? 4.4 : 1.05;
  g.specularIntensity = 1;
  g.specularColor.set("#ffffff");
  if ("dispersion" in g) {
    (g as THREE.MeshPhysicalMaterial & { dispersion: number }).dispersion = transmission ? 0.03 : 0;
  }
  g.needsUpdate = true;

  handle.pages.color.set(theme.pages.color);
  handle.pages.roughness = theme.pages.roughness;
  handle.pages.envMapIntensity = Math.max(theme.envIntensity * 0.45, 0.12);
  handle.pages.needsUpdate = true;
}

export function makeRimMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color("#F2F5F8") },
      power: { value: 2.6 },
      strength: { value: 0.48 },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.FrontSide,
    toneMapped: false,
    vertexShader: `
      varying vec3 vN;
      varying vec3 vV;
      void main() {
        vec4 w = modelMatrix * vec4(position, 1.0);
        vN = normalize(mat3(modelMatrix) * normal);
        vV = cameraPosition - w.xyz;
        gl_Position = projectionMatrix * viewMatrix * w;
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      uniform float power;
      uniform float strength;
      varying vec3 vN;
      varying vec3 vV;
      void main() {
        float f = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), power);
        float a = f * strength;
        gl_FragColor = vec4(color * a, a);
      }
    `,
  });
}

export function applyRimTheme(mat: THREE.ShaderMaterial, night: boolean) {
  mat.uniforms.color.value.set(night ? "#C9D6E4" : "#E8EEF4");
  mat.uniforms.power.value = night ? 2.15 : 3.4;
  mat.uniforms.strength.value = night ? 0.95 : 0;
  mat.visible = night;
}

export function createLedgerMaterials(_backend: Backend): LedgerHandle {
  /* MeshPhysicalMaterial is mapped to MeshPhysicalNodeMaterial on
     WebGPURenderer, so one authoring path covers both backends. */
  const glass = new THREE.MeshPhysicalMaterial(GLASS_BASE);
  const maps = makePaperMaps();
  const pages = new THREE.MeshPhysicalMaterial({
    ...PAGE_BASE,
    map: maps.map ?? undefined,
    roughnessMap: maps.rough ?? undefined,
  });
  return {
    glass,
    pages,
    paperMap: maps.map,
    paperRough: maps.rough,
    contact: maps.contact,
    dispose() {
      glass.dispose();
      pages.dispose();
      maps.map?.dispose();
      maps.rough?.dispose();
      maps.contact?.dispose();
    },
  };
}

export function buildRulingGeometry(
  width: number,
  height: number,
  depth: number,
  rows = 14,
) {
  const positions: number[] = [];
  const x0 = -width / 2 + 0.08;
  const x1 = width / 2 - 0.08;
  const y0 = -height / 2 + 0.12;
  const y1 = height / 2 - 0.14;
  const z = depth / 2 + 0.001;

  const push = (ax: number, ay: number, az: number, bx: number, by: number, bz: number) => {
    positions.push(ax, ay, az, bx, by, bz);
  };

  push(x0, y1, z, x1, y1, z);
  push(x0, y1 - 0.028, z, x1, y1 - 0.028, z);

  for (let i = 1; i <= rows; i++) {
    const y = y1 - 0.12 - ((y1 - 0.12 - y0) * i) / rows;
    push(x0, y, z, x1, y, z);
  }

  const margin = x0 + 0.22;
  push(margin, y0, z, margin, y1, z);
  push(x0, y0, z, x0, y1, z);

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  return geo;
}
