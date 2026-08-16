import * as THREE from "three";
import type { Backend } from "../store";
import { LIGHT_THEME, type SceneTheme } from "../theme";

export type LedgerHandle = {
  glass: THREE.MeshPhysicalMaterial;
  pages: THREE.MeshPhysicalMaterial;
  dispose: () => void;
};

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
  specularColor: "#f4f1ea",
  envMapIntensity: 1.1,
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
  g.envMapIntensity = theme.envIntensity;
  g.needsUpdate = true;

  handle.pages.color.set(theme.pages.color);
  handle.pages.roughness = theme.pages.roughness;
  handle.pages.envMapIntensity = theme.envIntensity * 0.3;
  handle.pages.needsUpdate = true;
}

export function createLedgerMaterials(_backend: Backend): LedgerHandle {
  /* MeshPhysicalMaterial is mapped to MeshPhysicalNodeMaterial on
     WebGPURenderer, so one authoring path covers both backends. */
  const glass = new THREE.MeshPhysicalMaterial(GLASS_BASE);
  const pages = new THREE.MeshPhysicalMaterial(PAGE_BASE);
  return {
    glass,
    pages,
    dispose() {
      glass.dispose();
      pages.dispose();
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
