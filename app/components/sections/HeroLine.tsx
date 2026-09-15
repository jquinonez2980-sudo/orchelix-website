"use client";

/* The live line — the hero's proof.

   Every competitor can write "answers every call." Only this one can print
   the number and let a visitor test it before reading another word. So the
   number is set as the second focal point of the band, at the Headline
   clamp, in tabular figures: large enough to dial from a laptop screen, one
   tap on a phone.

   Built as a ruled block, not a button: a 2px rule, a label row, the entry,
   a note. The stamp below stays the band's one foil surface — the number
   carries no fill, and its hover is a Rule drawing under the figures.

   This is a Client Component for one reason: the tap is the hero's most
   valuable event and it is tracked. The markup is identical on the server,
   so the number is in the HTML with JavaScript off. */

import { track } from "@/app/lib/analytics";

const TEL = "+15615661066";
const DISPLAY = { country: "+1", number: "561 566 1066" };

export default function HeroLine({
  head,
  note,
  label,
}: {
  head: string;
  note: string;
  label: string;
}) {
  return (
    <div className="lg-line">
      <p className="lg-line__head">
        <span>{head}</span>
        {/* Notation, not a sentence: the lede above already says it in
            words. The languages are the ones Esmi answers in natively; French
            is an add-on and stays off this line. */}
        <span className="lg-fig">
          24/7
          <span aria-hidden="true" className="lg-hero-sep" />
          EN
          <span aria-hidden="true" className="lg-hero-sep" />
          ES
        </span>
      </p>
      <a
        className="lg-line__number lg-fig"
        href={`tel:${TEL}`}
        aria-label={label}
        onClick={() => track("hero_call")}
      >
        <span className="lg-line__country">{DISPLAY.country}</span>
        {DISPLAY.number}
      </a>
      <p className="lg-line__note">{note}</p>
    </div>
  );
}
