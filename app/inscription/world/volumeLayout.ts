/* Shared ledger metrics. Volume, filaments, and inscribed type
   all read from here so rows land on the same ruling. */

export const VOLUME = { w: 1.46, h: 1.98, d: 0.2 };
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

export function rowY(index: number) {
  const { y0, y1 } = rowBounds();
  const i = index + 1;
  return y1 - 0.12 - ((y1 - 0.12 - y0) * i) / RULE_ROWS;
}

export function rowX0() {
  return rowBounds().margin;
}

export function rowX1() {
  return rowBounds().x1;
}

export const FACE_Z = 0.086;
