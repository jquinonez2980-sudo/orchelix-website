/* The pricing opening chart — three ascending bars, the tallest in magenta.
   Sits above the fold like the other two opening visuals, so it gets the
   same on-load Settle treatment rather than a scroll reveal (RevealObserver
   skips anything already on screen at mount).

   Unlike the constellation or the how-it-works pulses, this isn't a loop —
   a bar chart's honest motion is growing once, from the baseline, and then
   holding. Three stacked copies of the SAME source image (no redrawing),
   each clipped to exactly one bar's column via `clip-path: inset()`, with
   only the bottom inset animated so that column's own bar rises from the
   baseline to its real height. The column bounds were measured directly off
   `pricing-visual.png` (990×808) by scanning for each bar's own x-range and
   top edge — not eyeballed.

   Plain <img>, not next/image: a first pass ran this through next/image
   with `placeholder="blur"` on three overlapping, differently-clipped
   copies of the same picture, which is exactly the kind of thing that
   looks fine in isolation and wrong once you actually load the page. Three
   identical raw <img> tags pointed at the same file guarantee byte-
   identical rendering across all three layers — no optimizer resizing, no
   blur-up flash, no room for the three copies to disagree with each other. */

import type { StaticImageData } from "next/image";

const BARS = [
  // left, right, top are fixed; bottom animates zero -> full in globals.css.
  { className: "lg-grow-bar-1" },
  { className: "lg-grow-bar-2" },
  { className: "lg-grow-bar-3" },
] as const;

export default function PricingGrowthChart({
  src,
  max,
}: {
  src: StaticImageData;
  max: number;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: max,
        aspectRatio: `${src.width} / ${src.height}`,
      }}
    >
      {BARS.map((bar) => (
        <img
          key={bar.className}
          src={src.src}
          alt=""
          aria-hidden="true"
          loading="eager"
          className={bar.className}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
      ))}
    </div>
  );
}
