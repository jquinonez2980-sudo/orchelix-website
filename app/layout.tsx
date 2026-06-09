import type { Metadata } from "next";
import "./globals.css";
import { Montserrat, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import JsonLd from "./components/JsonLd";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_URL = "https://www.orchelix.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Orchelix | AI Agents for Revenue Operations",
    template: "%s | Orchelix",
  },
  description:
    "Multi-agent AI systems that qualify leads, handle calls, close deals, and run financial operations — with human oversight and senior consultants.",
  // NOTE: Do not set `alternates.canonical` here. Metadata is shallowly merged
  // and inherited, so a canonical on the root layout would propagate to every
  // page that doesn't override it — pointing them all at "/" and causing Google
  // to drop them as "Alternative page with proper canonical tag". Each page
  // (including app/page.tsx for "/") declares its own self-referencing canonical.
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: SITE_URL,
    siteName: "Orchelix",
    title: "Orchelix | AI Agents for Revenue Operations",
    description:
      "Multi-agent systems for lead qualification, call handling, deal closing, and financial close. Human-in-the-loop with senior consultants.",
    images: [{ url: "/og-image.jpg", width: 1408, height: 736, alt: "Orchelix - Orchestrating the Future of AI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Orchelix | AI Agents for Revenue Operations",
    description:
      "Multi-agent systems for lead qualification, call handling, deal closing, and financial close. Human-in-the-loop with senior consultants.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${SITE_URL}/#org`,
      name: "Orchelix AI Consulting Inc.",
      url: SITE_URL,
      logo: `${SITE_URL}/orchelix-lockup-horizontal.png`,
      image: `${SITE_URL}/og-image.jpg`,
      description:
        "AI agents and AI receptionist services for small and mid-sized businesses in West Palm Beach and South Florida — lead qualification, call answering, and financial operations with human oversight.",
      telephone: "+15615661066",
      priceRange: "$$",
      knowsLanguage: ["en", "es"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "West Palm Beach",
        addressRegion: "FL",
        addressCountry: "US",
      },
      areaServed: [
        { "@type": "City", name: "West Palm Beach" },
        { "@type": "City", name: "Boca Raton" },
        { "@type": "City", name: "Fort Lauderdale" },
        { "@type": "City", name: "Miami" },
        { "@type": "AdministrativeArea", name: "Palm Beach County" },
        { "@type": "AdministrativeArea", name: "South Florida" },
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${jetbrainsMono.variable}`}
      style={{ fontFamily: "var(--font-display), ui-sans-serif, system-ui, sans-serif" }}
    >
      <head>
        <meta name="theme-color" content="#0A2540" />
        <JsonLd data={jsonLd} />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
