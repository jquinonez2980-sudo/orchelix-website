/* A transparent SVG laid exactly over `industries-visual.png` — house, gear,
   factory, shield, connected by the artwork's own line. The artwork is
   untouched; this only adds motion on top of it.

   Not a processing pipeline like how-it-works: there's no input/output
   here, just "this reaches every kind of business." So one pulse travels
   the full chain start to finish, flashing each icon magenta as it arrives,
   then pauses and loops — no receive/emit colour split, every node is
   equally the point.

   Coordinates are measured, not guessed: scanned `industries-visual.png`
   (1641×287) for the line's y (≈142) and each icon's own column bounds,
   then took the gaps between those columns as the three travel segments.
   `viewBox="0 0 1641 287"` matches the file's pixel grid 1:1. Keyframes live
   in globals.css next to the how-it-works pulses; this file is only the
   markup. */

export default function IndustriesPulseOverlay() {
  return (
    <svg
      viewBox="0 0 1641 287"
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      {/* Arrival glows — one per icon the pulse reaches after icon 1. */}
      <circle cx="582" cy="152" r="110" fill="var(--lg-foil)" className="lg-ind-glow-2" />
      <circle cx="1020" cy="135" r="110" fill="var(--lg-foil)" className="lg-ind-glow-3" />
      <circle cx="1442" cy="153" r="110" fill="var(--lg-foil)" className="lg-ind-glow-4" />

      {/* Three travelling pulses, one per segment: house→gear, gear→factory,
          factory→shield. Same accent throughout — no node here is more
          "processed" than another. */}
      <circle cx="204" cy="142" r="9" fill="var(--lg-foil)" className="lg-ind-pulse-1" />
      <circle cx="681" cy="142" r="9" fill="var(--lg-foil)" className="lg-ind-pulse-2" />
      <circle cx="1128" cy="142" r="9" fill="var(--lg-foil)" className="lg-ind-pulse-3" />
    </svg>
  );
}
