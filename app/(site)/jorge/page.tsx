import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import "./card.css";
import { RING_PATHS, RING_STROKE, RING_VIEWBOX } from "./assets";
import CardActions from "./CardActions";

/* Jorge's digital business card — orchelix.com/jorge.

   The printed card's QR code points here, so this page is the other half of
   the physical card: open it, tap "Save contact", and the phone has the
   whole record (the .vcf in /public carries the ring mark as its photo).

   One screen, no chrome. It is the only page on the site that runs on the
   night ground from edge to edge, because on a phone held out across a
   table it reads as a card, not as a website. The ring draws itself once on
   load — a stroke reveal, the same Strike idea the site uses — and holds.
   With reduced motion it is simply there. Nothing here depends on
   JavaScript except Share and Show QR, which enhance a page that already
   works: every action is a plain link. */

export const metadata: Metadata = {
  title: "Jorge Quiñonez — Orchelix",
  description:
    "Founder & CEO, Orchelix AI Consulting. Save the contact, call, email, or book a pilot.",
  alternates: { canonical: "/jorge" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Jorge Quiñonez — Founder & CEO, Orchelix",
    description: "AI agents that answer, qualify, and book around the clock — in English and Spanish.",
    url: "/jorge",
    images: [{ url: "/og-image.jpg", width: 1280, height: 720 }],
  },
};

/* Paints the phone's chrome to the card's own ground so the page reads as one
   object edge to edge. Typed, and a plain `viewport` object rather than
   `generateViewport` — nothing here depends on params. */
export const viewport: Viewport = { themeColor: "#121317" };

const PHONE = "+1 561 566 1066";
const PHONE_HREF = "tel:+15615661066";
const EMAIL = "info@orchelix.com";

export default function DigitalCard() {
  return (
    <main id="main-content" data-surface="site" className="dc">
      <div className="dc__card">
        <svg
          className="dc__ring"
          viewBox={RING_VIEWBOX}
          fill="none"
          stroke="currentColor"
          strokeWidth={RING_STROKE}
          strokeLinecap="round"
          strokeLinejoin="round"
          role="img"
          aria-label="Orchelix"
        >
          {RING_PATHS.map((d, i) => (
            <path key={i} d={d} pathLength={1} style={{ "--i": i } as CSSProperties} />
          ))}
        </svg>

        <p className="dc__org">
          Orchelix <span>AI Consulting</span>
        </p>

        <h1 className="dc__name">Jorge Quiñonez</h1>
        <p className="dc__title">Founder &amp; CEO</p>

        {/* No `download` attribute: served as text/vcard, iOS opens its own
            "Add contact" sheet, which is the point. Android saves the file
            and offers to open it in Contacts. */}
        <a className="dc__save" href="/jorge.vcf">
          Save contact
        </a>

        <ul className="dc__rows">
          <li>
            <a href={PHONE_HREF}>
              <span className="dc__label">Call</span>
              <span className="dc__value">{PHONE}</span>
            </a>
          </li>
          <li>
            <a href={`mailto:${EMAIL}`}>
              <span className="dc__label">Email</span>
              <span className="dc__value">{EMAIL}</span>
            </a>
          </li>
          <li>
            <Link href="/book">
              <span className="dc__label">Book</span>
              <span className="dc__value">A 14-day pilot</span>
            </Link>
          </li>
          <li>
            <Link href="/">
              <span className="dc__label">Web</span>
              <span className="dc__value">orchelix.com</span>
            </Link>
          </li>
        </ul>

        <CardActions />

        <p className="dc__foot">
          <span>English · Español</span>
          <span>West Palm Beach · Ontario</span>
        </p>
      </div>
    </main>
  );
}
