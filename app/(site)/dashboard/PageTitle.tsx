import type { ReactNode } from "react";

/* The dashboard's page heading — one component, one size.
 *
 * WHY THIS EXISTS: seventeen routes hand-set their own `<h1>` and drifted into
 * six different treatments. Seven of them were sentence case, which DESIGN.md's
 * Condensed Caps Rule rules out in one sentence: "There is no sentence-case
 * display size in this system." Three different sizes shipped alongside them.
 * Navigating between two routes changed the size and the case of the heading.
 *
 * DESIGN.md names this exact fix — "don't hand-write a clamp() for a heading,
 * use PageTitle or SectionTitle" — and records that hand-declaring the clamp
 * inline "is how the type ramp drifted in the first place."
 *
 * WHY NOT THE MARKETING `PageTitle`: that one wraps its heading in `PlusFrame`
 * and carries `lg-poster`, a poster treatment for a page whose job is to be
 * looked at. An Operate surface is a page whose job is to be worked, and the
 * heading is a label on a register, not a poster. Same call as `Action.tsx`,
 * which mirrors the marketing `Stamp` rather than importing it.
 *
 * The values are the Headline row of the type ramp, verbatim: Archivo 700 on
 * the `wdth` axis, `clamp(1.85rem, 3.2vw, 2.9rem)`, line-height 1.02, tracking
 * -0.022em, uppercase. Don't re-declare them at a call site.
 */

export default function PageTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-display font-bold uppercase text-[clamp(1.85rem,3.2vw,2.9rem)] leading-[1.02] tracking-[-0.022em] text-ink">
      {children}
    </h1>
  );
}

/* The standfirst under a PageTitle. Body face, sentence case, held to a ~60ch
   measure — DESIGN.md sets prose at 60ch and forbids body copy in the
   condensed display face. This shipped in five different variants (`mt-1`,
   `mt-1.5`, `mt-2`, with and without `leading-6`, at three measures), which is
   the same drift as the heading and gets the same treatment. */
export function PageLede({ children }: { children: ReactNode }) {
  return <p className="mt-1 max-w-[60ch] text-sm leading-6 text-ink-2">{children}</p>;
}
