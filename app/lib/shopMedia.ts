/* How the shop shows its photographs, and how SKUs group into styles.

   Presentation only — product facts (names, prices, sizes, copy) stay in
   products.json. Nothing here can change what a buyer is charged.

   FRAMES. The source images are composites: every tee and the crewneck put
   the front and the back side by side (1792×1008), and the caps, tote and
   pin share one 2×2 grid (1408×1408). Every product tile is 8:9, exactly one
   half of a tee composite, so `object-position` 0% / 100% shows the front
   or the back, and a 2× scale anchored at a corner shows one quadrant of the
   grid. That gives each item its own picture without re-exporting files.

   STYLES. The unisex and women's cut of a tee are separate SKUs (and
   separate Stripe line items) but one garment to a shopper, so the shop
   shows one card per style with its fits listed inside it. */

import type { CSSProperties } from "react";
import { ALL_PRODUCTS, isLaunchSku, type Product } from "@/app/lib/products";

export type Frame = { position?: string; scale?: number; origin?: string };

const FRONT: Frame = { position: "0% 50%" };
const BACK: Frame = { position: "100% 50%" };
const quadrant = (origin: string): Frame => ({ position: "50% 50%", scale: 2, origin });

const FRAMES: Record<string, { front: Frame; back?: Frame }> = {
  "ORX-Q-U": { front: FRONT, back: BACK },
  "ORX-Q-W": { front: FRONT, back: BACK },
  "ORX-D-U": { front: FRONT, back: BACK },
  "ORX-D-W": { front: FRONT, back: BACK },
  "ORX-S-U": { front: FRONT, back: BACK },
  "ORX-S-W": { front: FRONT, back: BACK },
  "ORX-CREW-Q": { front: FRONT, back: BACK },
  "ORX-K-LINE": { front: { position: "50% 50%" } },
  "ORX-CAP-Q": { front: quadrant("0% 0%") },
  "ORX-CAP-D": { front: quadrant("100% 0%") },
  "ORX-TOTE": { front: quadrant("0% 100%") },
  "ORX-PIN": { front: quadrant("100% 100%") },
  "ORX-NOTE": { front: { position: "50% 54%" } },
};

export function framesFor(sku: string): { front: Frame; back?: Frame } {
  return FRAMES[sku] ?? { front: { position: "50% 50%" } };
}

export function frameStyle(f: Frame): CSSProperties {
  return {
    objectFit: "cover",
    objectPosition: f.position ?? "50% 50%",
    ...(f.scale ? { transform: `scale(${f.scale})`, transformOrigin: f.origin } : {}),
  };
}

/* Colourway swatches, keyed by the colour string in products.json. */
const SWATCHES: Record<string, string[]> = {
  Bone: ["#e8e3d6"],
  Black: ["#121212"],
  "Fog gray": ["#8b8e93"],
  "Bone canvas": ["#e3dccb"],
  "Black enamel": ["#121212"],
  "Bone / Black / Gray": ["#e8e3d6", "#121212", "#8b8e93"],
};
export function swatchesFor(color: string): string[] {
  return SWATCHES[color] ?? [];
}

export type Fit = { fit: string; sku: string; available: boolean };
export type Style = {
  id: string;
  name: string;
  color: string;
  price: number;
  currency: string;
  fits: Fit[];
  /** The SKU a style card links to: the first fit that can be bought. */
  lead: Product;
  available: boolean;
};

/* ORX-Q-U and ORX-Q-W are one style (ORX-Q); everything else is its own. */
const styleId = (sku: string) => sku.replace(/^(ORX-[QDS])-(U|W)$/, "$1");

export function allStyles(products: Product[] = ALL_PRODUCTS): Style[] {
  const byId = new Map<string, Product[]>();
  for (const p of products) {
    const id = styleId(p.sku);
    byId.set(id, [...(byId.get(id) ?? []), p]);
  }
  return [...byId.entries()].map(([id, group]) => {
    const fits = group.map((p) => ({ fit: p.fit, sku: p.sku, available: isLaunchSku(p.sku) }));
    const lead = group.find((p) => isLaunchSku(p.sku)) ?? group[0];
    return {
      id,
      name: lead.name,
      color: lead.color,
      price: lead.price,
      currency: lead.currency,
      fits,
      lead,
      available: fits.some((f) => f.available),
    };
  });
}

export function styleForSku(sku: string): Style | undefined {
  return allStyles().find((s) => s.fits.some((f) => f.sku === sku));
}
