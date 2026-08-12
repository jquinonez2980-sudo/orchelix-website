import "./globals.css";
import { Archivo, Literata, Azeret_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import JsonLd from "./components/JsonLd";
import RevealObserver from "./components/ledger/RevealObserver";

/* Shared root-layout shell.

   The app has two root layouts — `app/[locale]/layout.tsx` for the localized
   marketing surface and `app/(site)/layout.tsx` for everything else — because
   `<html lang>` has to vary by locale and a root layout cannot read a child
   segment's params (`unstable_rootParams` was removed in Next 16). Rather than
   maintain the fonts, contract, and analytics twice, both roots render this. */

/* Display: condensed heavy caps carry the ledger's column-head authority. */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display",
  display: "swap",
});

/* Body: a screen serif built for long reading — document texture, not UI gloss. */
const literata = Literata({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

/* Figures: real tabular numerals for the register. Measurement, not costume. */
const azeret = Azeret_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const SITE_URL = "https://www.orchelix.com";

/* The direction contract. Emitted into the built markup so it can be audited
   after the production build, not only read in source. */
const DIRECTION_CONTRACT = `<!--
THESIS: The audit trail is the interface. Refuses the category's centered hero +
three identical product cards, and its opposite, the cream editorial broadsheet.
OWN-WORLD: Ruled record — white field, graphite ruling, one magenta stamp,
tick marks, tabular registers. Archivo condensed caps / Literata / Azeret mono.
STORY: An operator sees Esmi answering calls in two languages, every row
timestamped with a reason and a disposition, and books a pilot.
FIRST VIEWPORT: White ruled field. Left column sets the offer and the stamped
primary action; right column is the call register at full scale with its own
notation legend. The register leads, the chrome recedes.
FORM: The Ruled Record — light rebrand 2026-08-10, seed key 8a1b2873.
FINISH: unreviewed and undocumented is unfinished; this build ends with the
finish review, the verdict, and DESIGN.md
-->`;

export const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${SITE_URL}/#org`,
      name: "Orchelix AI Consulting Inc.",
      url: SITE_URL,
      logo: `${SITE_URL}/orchelix-logo-full-color.png`,
      image: `${SITE_URL}/og-image.jpg`,
      description:
        "Multi-agent systems for revenue operations, deployed by senior consultants. Bilingual English and Spanish call handling with a reviewable audit trail. Operating in Canada and the United States.",
      telephone: "+15615661066",
      priceRange: "$$",
      knowsLanguage: ["en", "es", "fr"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "West Palm Beach",
        addressRegion: "FL",
        addressCountry: "US",
      },
      /* Dual jurisdiction: US principal service presence + Canadian entity. */
      location: [
        {
          "@type": "Place",
          name: "United States",
          address: {
            "@type": "PostalAddress",
            addressLocality: "West Palm Beach",
            addressRegion: "FL",
            addressCountry: "US",
          },
        },
        {
          "@type": "Place",
          name: "Canada",
          address: {
            "@type": "PostalAddress",
            addressRegion: "ON",
            addressCountry: "CA",
          },
        },
      ],
      areaServed: [
        { "@type": "Country", name: "Canada" },
        { "@type": "Country", name: "United States" },
        { "@type": "AdministrativeArea", name: "South Florida" },
        { "@type": "AdministrativeArea", name: "Ontario" },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Orchelix",
      publisher: { "@id": `${SITE_URL}/#org` },
      inLanguage: ["en", "es"],
    },
  ],
};

export const fontClassNames = `${archivo.variable} ${literata.variable} ${azeret.variable}`;

/** Renders `<html>`/`<body>`. Both root layouts delegate here. */
export default function Shell({
  lang,
  skipLabel,
  children,
}: {
  lang: string;
  skipLabel: string;
  children: React.ReactNode;
}) {
  return (
    <html lang={lang} className={fontClassNames}>
      <head>
        <meta name="theme-color" content="#FFFFFF" />
        <JsonLd data={orgJsonLd} />
      </head>
      <body>
        <div hidden dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }} />
        <a href="#main-content" className="skip-link">
          {skipLabel}
        </a>
        {children}
        {/* The site's only scroll-driven mechanism. Mounted once at the root
            so no page brings its own observer. */}
        <RevealObserver />
        <Analytics />
      </body>
    </html>
  );
}
