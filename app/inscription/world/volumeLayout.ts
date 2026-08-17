/* Shared ledger metrics. Volume, filaments, and inscribed type
   all read from here so rows land on the same ruling. */

export const VOLUME = { w: 1.46, h: 1.98, d: 0.34 };

/* Where the ledger stands in world space. Shared because the camera has to
   know it: the shots are authored to sit the volume right of centre so the
   desktop copy can hold the left half, and a narrow viewport has to undo that
   offset to bring the object back to the middle of the screen. */
export const VOLUME_ORIGIN = { x: 1.02, y: -0.13, z: 0 };
export const PAGE = { w: VOLUME.w * 0.88, h: VOLUME.h * 0.86 };
export const RULE_ROWS = 14;
export const ENTRY_COUNT = 10;

export function rowBounds() {
  const x0 = -PAGE.w / 2 + 0.08;
  const x1 = PAGE.w / 2 - 0.08;
  const y0 = -PAGE.h / 2 + 0.12;
  const y1 = PAGE.h / 2 - 0.14;
  return { x0, x1, y0, y1, margin: x0 + 0.22 };
}

export function rowPitch() {
  const { y0, y1 } = rowBounds();
  return (y1 - 0.12 - y0) / RULE_ROWS;
}

export function rowY(index: number) {
  const { y0, y1 } = rowBounds();
  const i = index + 1;
  return y1 - 0.12 - ((y1 - 0.12 - y0) * i) / RULE_ROWS;
}

/* Mid-cell, above the ruling — not sitting on the line. */
export function rowTextY(index: number) {
  return rowY(index) + rowPitch() * 0.42;
}

export function rowX0() {
  return rowBounds().margin;
}

export function rowX1() {
  return rowBounds().x1;
}

export const FACE_Z = 0.024;
export const SURFACE_Z = VOLUME.d / 2 - 0.018;
