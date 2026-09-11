/* The Orchelix lockup: the helix mark plus the name, set live.

   The name used to be part of `orchelix-logo.svg` as SVG <text> in Inter —
   which an <img> cannot load, so it rendered in whatever sans the visitor's
   system had, bold, and matched nothing on the page. It is now real text in
   the site's display voice (Archivo wide and light, the same setting as the
   ORCHELIX wordmark in the homepage hero), so the chrome and the hero read as
   one name. Only the mark stays artwork.

   The text is aria-hidden: every caller wraps this in a link that already
   carries an accessible name ("Orchelix — Home"), and announcing both was
   the double-read the old `alt=""` was avoiding. */

import Image from "next/image";

export default function Lockup({ tagline = true }: { tagline?: boolean }) {
  return (
    <span className="lg-lockup">
      <Image
        src="/orchelix-mark.svg"
        alt=""
        aria-hidden="true"
        width={517}
        height={1045}
        unoptimized
        className="lg-lockup__mark"
      />
      <span className="lg-lockup__words" aria-hidden="true">
        <span className="lg-lockup__name">Orchelix</span>
        {tagline ? <span className="lg-lockup__tag">AI Consulting</span> : null}
      </span>
    </span>
  );
}
