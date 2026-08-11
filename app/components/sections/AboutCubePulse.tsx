/* The About opening visual — the ORIGINAL about-visual.png, untouched, with
   five real pieces of it breathing in and out: the magenta accent cube plus
   four more (the apex, the cube beside it, and both bottom corners).

   None of these are redraws. Each `/about-cube-*.png` is an alpha-masked
   cutout pulled straight out of the source PNG and positioned at the exact
   percentage box it occupies in the full image, so at rest — scale 1, no
   motion — every cutout sits invisibly over its own position and the whole
   thing is indistinguishable from the plain original. Only the pulse
   reveals that they're separate pieces.

   Two extraction methods, chosen per piece for reliability, not
   uniformity: the magenta cube is isolated by colour threshold (it's the
   only globally unique hue in the image). The other four are isolated by a
   plain "not white" threshold inside a hand-measured box tight enough to
   exclude their neighbours — colour segmentation doesn't work on cubes that
   share the same graphite family, and an edge-detection pass tried first
   fragmented into confetti on the paper-grain texture, so this is the
   robust fallback: corner-ish cubes bounded mostly by background on two or
   three sides, where a tight rectangle reliably captures just the one
   piece. The apex and the cube beside it each carry a tiny sliver of a
   neighbour at one corner where a perfectly clean cut wasn't possible —
   negligible at the box's few-percent scale this pulses at.

   Staggered animation-delay per piece (see `.lg-cube-pulse-*` in
   globals.css) so the five breathe out of phase — a scattered, living
   structure, not five things pulsing in unison. */

import Image, { type StaticImageData } from "next/image";

const PIECES = [
  { src: "/about-cube-accent.png", left: "39.65%", top: "30.14%", width: "29.45%", height: "26.67%", cls: "lg-cube-pulse-1" },
  { src: "/about-cube-apex.png", left: "30.38%", top: "4.96%", width: "33.27%", height: "22.46%", cls: "lg-cube-pulse-2" },
  { src: "/about-cube-topright.png", left: "62.82%", top: "15.69%", width: "20.08%", height: "22.46%", cls: "lg-cube-pulse-3" },
  { src: "/about-cube-corner-bl.png", left: "2.06%", top: "64.66%", width: "32.24%", height: "26.01%", cls: "lg-cube-pulse-4" },
  { src: "/about-cube-corner-br.png", left: "64.37%", top: "64.99%", width: "33.27%", height: "25.68%", cls: "lg-cube-pulse-5" },
] as const;

export default function AboutCubePulse({
  src,
  max,
}: {
  src: StaticImageData;
  max: number;
}) {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: max, lineHeight: 0 }}>
      <Image
        src={src}
        alt=""
        aria-hidden="true"
        placeholder="blur"
        loading="eager"
        sizes={`${max}px`}
        style={{ width: "100%", maxWidth: max, height: "auto", display: "block" }}
      />
      {PIECES.map((p) => (
        <img
          key={p.src}
          src={p.src}
          alt=""
          aria-hidden="true"
          className={`lg-cube-pulse ${p.cls}`}
          style={{
            position: "absolute",
            left: p.left,
            top: p.top,
            width: p.width,
            height: p.height,
          }}
        />
      ))}
    </div>
  );
}
