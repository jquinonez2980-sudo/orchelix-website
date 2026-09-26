// Generated from app/lib/products.json — do not hand-edit product facts here.
// To change a price, name, sizes, or copy, edit products.json and this
// module will pick it up automatically (it's a type-safe view over that file,
// not a separate copy).
import raw from "@/app/lib/products.json";

type RawProduct = {
  sku: string;
  name: string;
  fit: string;
  price: number;
  currency: string;
  color: string;
  image: string;
  front: string;
  back: string;
  sizes?: string[];
};

export interface Product extends RawProduct {
  /** Intrinsic pixel size of `image`, so the detail page can show it uncropped. */
  imageWidth: number;
  imageHeight: number;
}

interface RawCatalog {
  brand: string;
  url: string;
  rules: string[];
  products: RawProduct[];
}

const catalog = raw as RawCatalog;

// Real dimensions of each file in public/shop/images/. The detail page renders
// images at their natural aspect ratio, so next/image needs the true size to
// reserve space without letterboxing. Add an entry when adding an image.
const IMAGE_SIZES: Record<string, { width: number; height: number }> = {
  "images/quiet-unisex.jpg": { width: 1792, height: 1008 },
  "images/quiet-women.jpg": { width: 1792, height: 1008 },
  "images/drop-unisex.jpg": { width: 1792, height: 1008 },
  "images/drop-women.jpg": { width: 1792, height: 1008 },
  "images/spec-unisex.jpg": { width: 1792, height: 1008 },
  "images/spec-women.jpg": { width: 1792, height: 1008 },
  "images/kids-line.jpg": { width: 1792, height: 1008 },
  "images/crewneck-quiet.jpg": { width: 1792, height: 1008 },
  "images/caps-tote-pin.jpg": { width: 1408, height: 1408 },
  "images/studio-kit.jpg": { width: 960, height: 2080 },
};

// images/foo.jpg in products.json -> /shop/images/foo.jpg under /public
function publicImagePath(image: string): string {
  return "/shop/" + image.replace(/^\.?\/*/, "");
}

export const ALL_PRODUCTS: Product[] = catalog.products.map((p) => {
  const size = IMAGE_SIZES[p.image];
  if (!size) {
    // Fail the build rather than ship a product image with a guessed shape.
    throw new Error(`No IMAGE_SIZES entry for ${p.image} (${p.sku}).`);
  }
  return {
    ...p,
    image: publicImagePath(p.image),
    imageWidth: size.width,
    imageHeight: size.height,
  };
});

// The first drop: only these SKUs can be bought. Everything else in
// products.json stays visible on /shop as "Soon" with no checkout path.
// Per HOW-TO-SELL.md "Suggested first live catalog" and the build brief.
//
// ORX-CAP-Q (Quiet Cap) and ORX-PIN (Mark Pin) were in that first catalog but
// are held as "Soon" pending their own product images. Both currently share
// images/caps-tote-pin.jpg, a collage of two caps, the tote and the pin, which
// doesn't show a buyer the one item they'd be paying for. Add them back here
// once each has its own photograph.
//
// ORX-S-U (Spec Tee) is held as "Soon" too: it has no print artwork (the
// MARK 00 diagram it prints doesn't exist in brand/) and it isn't in the
// printer quote. The launch set is the three tees in that quote package.
// Add it back once the artwork exists and the printer has quoted it.
export const LAUNCH_SKUS = [
  "ORX-Q-U",
  "ORX-D-U",
  "ORX-Q-W",
] as const;

export type LaunchSku = (typeof LAUNCH_SKUS)[number];

export function isLaunchSku(sku: string): sku is LaunchSku {
  return (LAUNCH_SKUS as readonly string[]).includes(sku);
}

export function getProduct(sku: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.sku === sku);
}

// en-US so a CAD price reads "CA$48", not a bare "$48" a US visitor would
// take for US dollars.
export function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

// One-sentence description per SKU, using the exact copy lines from the brief.
const DESCRIPTIONS: Record<string, string> = {
  "ORX-Q-U": "Small mark at the chest. Site on the back.",
  "ORX-D-U": "Large graphite mark. Site on the back.",
  "ORX-S-U": "The mark as a drawing. Site on the back.",
  "ORX-Q-W": "Small mark at the chest. Site on the back.",
  "ORX-D-W": "Large graphite mark. Site on the back.",
  "ORX-S-W": "The mark as a drawing. Site on the back.",
  "ORX-K-LINE": "Scaled mark. Site on the back.",
  "ORX-CREW-Q": "Small mark at the chest. Site on the back.",
  "ORX-CAP-Q": "Mark only.",
  "ORX-CAP-D": "Mark only.",
  "ORX-TOTE": "Wire mark on the front. Site on the back.",
  "ORX-PIN": "The wire O.",
  "ORX-NOTE": "Foil mark on the cover. Site on the back.",
};

export function getDescription(sku: string): string {
  return DESCRIPTIONS[sku] ?? "";
}
