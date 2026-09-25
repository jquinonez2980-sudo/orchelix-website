import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight, CalendarCheck, Globe, Headphones, Mail, Phone, UserPlus } from "lucide-react";
import "./card.css";
import { RING_PATHS, RING_STROKE, RING_VIEWBOX } from "./assets";
import CardActions from "./CardActions";
import CardTilt from "./CardTilt";

/* Jorge's digital business card — orchelix.com/jorge.

   The printed card's QR code points here, so this page is the other half of
   the physical card: open it, tap "Save contact", and the phone has the
   whole record (the .vcf in /public carries the ring avatar as its photo).

   Rebuilt 2026-09-25 in the vivid palette. The card itself is a lit glass
   pass floating over the night sky: it swings into place on load, the
   gradient ring draws itself, a holographic sheen follows the pointer (and
   drifts on its own on a phone), and the actions sit beneath it as one glass
   list. The number on the card is the Esmi line, so the Call row says so —
   the card demonstrates the product the moment someone dials it.

   Nothing here depends on JavaScript except the tilt, Share and Show QR,
   which enhance a page that already works: every action is a plain link.
   Reduced motion: everything is simply there, still. */

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

/* Paints the phone's chrome to the page's own night so it reads as one
   object edge to edge. */
export const viewport: Viewport = { themeColor: "#060a14" };

const PHONE = "+1 561 566 1066";
const PHONE_HREF = "tel:+15615661066";
const EMAIL = "info@orchelix.com";

export default function DigitalCard() {
  return (
    <main id="main-content" data-surface="site" className="dc">
      <div className="dc__sky" aria-hidden="true" />

      <div className="dc__stack">
        <CardTilt>
          <div className="dc__pass">
            <span className="dc__sheen" aria-hidden="true" />
            <div className="dc__pass-top">
              <svg
                className="dc__ring"
                viewBox={RING_VIEWBOX}
                fill="none"
                stroke="url(#dc-ring-grad)"
                strokeWidth={RING_STROKE}
                strokeLinecap="round"
                strokeLinejoin="round"
                role="img"
                aria-label="Orchelix"
              >
                <defs>
                  <linearGradient id="dc-ring-grad" x1="0" y1="0" x2="90.93" y2="100" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#3b82f6" />
                    <stop offset="0.55" stopColor="#22d3ee" />
                    <stop offset="1" stopColor="#a5f3fc" />
                  </linearGradient>
                </defs>
                {RING_PATHS.map((d, i) => (
                  <path key={i} d={d} pathLength={1} style={{ "--i": i } as CSSProperties} />
                ))}
              </svg>
              <p className="dc__org">
                Orchelix <span>AI Consulting</span>
              </p>
            </div>

            <div className="dc__who">
              <h1 className="dc__name">Jorge Quiñonez</h1>
              <p className="dc__title">Founder &amp; CEO</p>
            </div>

            <div className="dc__pass-foot">
              <span>EN · ES</span>
              <span>West Palm Beach · Ontario</span>
            </div>
          </div>
        </CardTilt>

        {/* No `download` attribute: served as text/vcard, iOS opens its own
            "Add contact" sheet, which is the point. Android saves the file
            and offers to open it in Contacts. */}
        <a className="dc__save dc__in" href="/jorge.vcf" style={{ "--d": 1 } as CSSProperties}>
          <UserPlus aria-hidden="true" />
          Save contact
        </a>

        <ul className="dc__rows dc__in" style={{ "--d": 2 } as CSSProperties}>
          <li>
            <a href={PHONE_HREF}>
              <span className="dc__icon" aria-hidden="true"><Phone /></span>
              <span className="dc__text">
                <span className="dc__label">Call</span>
                <span className="dc__value">{PHONE}</span>
                <span className="dc__note">
                  <i aria-hidden="true" /> Answered 24/7 by Esmi, our AI receptionist
                </span>
              </span>
              <ArrowUpRight className="dc__go" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a href={`mailto:${EMAIL}`}>
              <span className="dc__icon" aria-hidden="true"><Mail /></span>
              <span className="dc__text">
                <span className="dc__label">Email</span>
                <span className="dc__value">{EMAIL}</span>
              </span>
              <ArrowUpRight className="dc__go" aria-hidden="true" />
            </a>
          </li>
          <li>
            <Link href="/book">
              <span className="dc__icon" aria-hidden="true"><CalendarCheck /></span>
              <span className="dc__text">
                <span className="dc__label">Book</span>
                <span className="dc__value">A 14-day pilot</span>
              </span>
              <ArrowUpRight className="dc__go" aria-hidden="true" />
            </Link>
          </li>
          <li>
            <Link href="/try-esmi">
              <span className="dc__icon" aria-hidden="true"><Headphones /></span>
              <span className="dc__text">
                <span className="dc__label">Hear Esmi</span>
                <span className="dc__value">Her real voice, live</span>
              </span>
              <ArrowUpRight className="dc__go" aria-hidden="true" />
            </Link>
          </li>
          <li>
            <Link href="/">
              <span className="dc__icon" aria-hidden="true"><Globe /></span>
              <span className="dc__text">
                <span className="dc__label">Web</span>
                <span className="dc__value">orchelix.com</span>
              </span>
              <ArrowUpRight className="dc__go" aria-hidden="true" />
            </Link>
          </li>
        </ul>

        <div className="dc__in" style={{ "--d": 3 } as CSSProperties}>
          <CardActions />
        </div>
      </div>
    </main>
  );
}
