import * as THREE from "three";
import { inscription, lerp } from "./store";
import { DARK_THEME, themeFor, type SceneTheme } from "./theme";

type RelightGL = {
  setClearColor?: (color: THREE.ColorRepresentation, alpha?: number) => void;
  setRenderTarget?: (target: THREE.WebGLRenderTarget | null) => void;
  toneMappingExposure?: number;
  render: (scene: THREE.Scene, camera: THREE.Camera) => void;
};

type RelightBind = {
  gl: RelightGL;
  scene: THREE.Scene;
  camera: THREE.Camera;
  applyLights?: (mode: "light" | "dark") => void;
  applyMaterials?: () => void;
  env?: { light: THREE.Texture; dark: THREE.Texture };
};

const room = new THREE.Color();
let bind: RelightBind | null = null;
const afterSnaps = new Set<() => void>();

export function onRelightSnap(fn: () => void) {
  afterSnaps.add(fn);
  return () => {
    afterSnaps.delete(fn);
  };
}

/* Mutable current theme. Sampled by the scene every frame so a mode
   change is a 600ms physical relight, not a remount. */

/* Seeded from the dark rig because night is the opening light. Seeding this
   from LIGHT_THEME would make every first paint a 600ms crossfade out of a
   daylight studio nobody asked to see — the relight is for a visitor pressing
   DAY/NIGHT, not for arrival. */
const current: SceneTheme = structuredClone(DARK_THEME);
const from = new THREE.Color();
const to = new THREE.Color();
const mixed = new THREE.Color();

function mixHex(a: string, b: string, t: number) {
  from.set(a);
  to.set(b);
  mixed.copy(from).lerp(to, t);
  return `#${mixed.getHexString()}`;
}

export function tickRelight(dt: number): SceneTheme {
  const target = themeFor(inscription.mode);
  const k = inscription.quality.reducedMotion ? 1 : 1 - Math.exp(-dt * 5);
  current.clear = target.clear;
  current.fog = target.fog;
  current.fogDensity = lerp(current.fogDensity, target.fogDensity, k);
  current.exposure = lerp(current.exposure, target.exposure, k);
  current.envIntensity = lerp(current.envIntensity, target.envIntensity, k);
  current.key.color = mixHex(current.key.color, target.key.color, k);
  current.key.intensity = lerp(current.key.intensity, target.key.intensity, k);
  current.key.position[0] = lerp(current.key.position[0], target.key.position[0], k);
  current.key.position[1] = lerp(current.key.position[1], target.key.position[1], k);
  current.key.position[2] = lerp(current.key.position[2], target.key.position[2], k);
  current.fill.color = mixHex(current.fill.color, target.fill.color, k);
  current.fill.intensity = lerp(current.fill.intensity, target.fill.intensity, k);
  current.hemi.sky = mixHex(current.hemi.sky, target.hemi.sky, k);
  current.hemi.ground = mixHex(current.hemi.ground, target.hemi.ground, k);
  current.hemi.intensity = lerp(current.hemi.intensity, target.hemi.intensity, k);
  current.ledger.tint = mixHex(current.ledger.tint, target.ledger.tint, k);
  current.ledger.roughness = lerp(current.ledger.roughness, target.ledger.roughness, k);
  current.ledger.ior = lerp(current.ledger.ior, target.ledger.ior, k);
  current.ledger.transmission = lerp(current.ledger.transmission, target.ledger.transmission, k);
  current.ledger.thickness = lerp(current.ledger.thickness, target.ledger.thickness, k);
  current.ledger.attenuation = mixHex(current.ledger.attenuation, target.ledger.attenuation, k);
  current.ledger.attenuationDistance = lerp(
    current.ledger.attenuationDistance,
    target.ledger.attenuationDistance,
    k,
  );
  current.ledger.clearcoat = lerp(current.ledger.clearcoat, target.ledger.clearcoat, k);
  current.ledger.clearcoatRoughness = lerp(
    current.ledger.clearcoatRoughness,
    target.ledger.clearcoatRoughness,
    k,
  );
  current.pages.color = mixHex(current.pages.color, target.pages.color, k);
  current.pages.roughness = lerp(current.pages.roughness, target.pages.roughness, k);
  current.ruling.color = mixHex(current.ruling.color, target.ruling.color, k);
  current.ruling.opacity = lerp(current.ruling.opacity, target.ruling.opacity, k);
  current.filament.color = mixHex(current.filament.color, target.filament.color, k);
  current.filament.emission = lerp(current.filament.emission, target.filament.emission, k);
  current.filament.width = lerp(current.filament.width, target.filament.width, k);
  current.type.ink = mixHex(current.type.ink, target.type.ink, k);
  current.type.ink2 = target.type.ink2;
  current.type.foil = mixHex(current.type.foil, target.type.foil, k);
  return current;
}

export function currentTheme() {
  return current;
}

export function bindRelightScene(next: RelightBind | null) {
  if (next === null) {
    bind = null;
    return;
  }
  bind = {
    ...next,
    applyMaterials: next.applyMaterials ?? bind?.applyMaterials,
  };
}

export function setRelightMaterials(fn: (() => void) | null) {
  if (bind) bind.applyMaterials = fn ?? undefined;
}

export function applyBoundRoom(mode: "light" | "dark", draw = true) {
  if (!bind) return;
  const t = themeFor(mode);
  const { gl, scene, camera } = bind;
  room.set(t.clear);
  scene.background = room;
  scene.fog = new THREE.FogExp2(t.clear, t.fogDensity);
  gl.setClearColor?.(t.clear, 1);
  if (gl.toneMappingExposure !== undefined) gl.toneMappingExposure = t.exposure;
  if (bind.env) scene.environment = bind.env[mode];
  if ("environmentIntensity" in scene) {
    (scene as THREE.Scene & { environmentIntensity: number }).environmentIntensity =
      t.envIntensity;
  }
  bind.applyLights?.(mode);
  bind.applyMaterials?.();
  for (const fn of afterSnaps) fn();
  if (!draw) return;
  if ("setRenderTarget" in gl && typeof gl.setRenderTarget === "function") {
    gl.setRenderTarget(null);
  }
  gl.render(scene, camera);
}

export function applyModeNow(mode: "light" | "dark") {
  snapToMode(mode);
  applyBoundRoom(mode);
}

export function snapToMode(mode: "light" | "dark") {
  const t = themeFor(mode);
  current.clear = t.clear;
  current.fog = t.fog;
  current.fogDensity = t.fogDensity;
  current.exposure = t.exposure;
  current.envIntensity = t.envIntensity;
  current.key.color = t.key.color;
  current.key.intensity = t.key.intensity;
  current.key.position[0] = t.key.position[0];
  current.key.position[1] = t.key.position[1];
  current.key.position[2] = t.key.position[2];
  current.fill.color = t.fill.color;
  current.fill.intensity = t.fill.intensity;
  current.hemi.sky = t.hemi.sky;
  current.hemi.ground = t.hemi.ground;
  current.hemi.intensity = t.hemi.intensity;
  current.ledger.tint = t.ledger.tint;
  current.ledger.roughness = t.ledger.roughness;
  current.ledger.ior = t.ledger.ior;
  current.ledger.transmission = t.ledger.transmission;
  current.ledger.thickness = t.ledger.thickness;
  current.ledger.attenuation = t.ledger.attenuation;
  current.ledger.attenuationDistance = t.ledger.attenuationDistance;
  current.ledger.clearcoat = t.ledger.clearcoat;
  current.ledger.clearcoatRoughness = t.ledger.clearcoatRoughness;
  current.pages.color = t.pages.color;
  current.pages.roughness = t.pages.roughness;
  current.ruling.color = t.ruling.color;
  current.ruling.opacity = t.ruling.opacity;
  current.filament.color = t.filament.color;
  current.filament.emission = t.filament.emission;
  current.filament.width = t.filament.width;
  current.type.ink = t.type.ink;
  current.type.ink2 = t.type.ink2;
  current.type.foil = t.type.foil;
}


