/* A transparent SVG laid exactly over `how-it-works-diagram.png` — the
   artwork itself is untouched, this only adds the two travelling, glowing
   pulses (and the AI node's own glow) on top of it.

   The coordinates below aren't guessed: they were measured directly off the
   source PNG (1331×409) by scanning for the thin connecting-line pixels
   between the circles — x381→488 is the document→AI gap, x843→949 is the
   AI→table gap, both sitting on the line at y≈204. `viewBox="0 0 1331 409"`
   matches the file's own pixel grid 1:1, so those measured coordinates can
   be used verbatim with no unit conversion, and the overlay tracks the
   image at any rendered size since both scale together.

   Same "one accent for the AI moment" rule as the register on the
   homepage: pulse A (input) glows in a faint ink tone, the AI node flashes
   magenta as it "processes," and pulse B (output) glows magenta the whole
   way out. Keyframes live in globals.css next to Settle/Strike; this file
   is only the markup. Pure SVG + CSS, no client component. */

export default function FlowPulseOverlay() {
  return (
    <svg
      viewBox="0 0 1331 409"
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      {/* AI node — a soft blurred wash over the artwork's own brain/chip
          icon, not a shape of its own, so nothing is redrawn or covered. */}
      <circle cx="665" cy="204" r="150" fill="var(--lg-foil)" className="lg-flow-ai-glow" />

      <circle cx="381" cy="204" r="11" fill="var(--lg-ink-2)" className="lg-flow-pulse-a" />
      <circle cx="843" cy="204" r="11" fill="var(--lg-foil)" className="lg-flow-pulse-b" />
    </svg>
  );
}
