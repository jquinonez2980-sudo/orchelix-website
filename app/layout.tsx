import type { Metadata } from "next";
import "./globals.css";
import { Montserrat, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

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

const SITE_URL = "https://orchelix.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Orchelix | AI Agents for Revenue Operations",
    template: "%s | Orchelix",
  },
  description:
    "Multi-agent AI systems that qualify leads, handle calls, close deals, and run financial operations — with human oversight and senior consultants.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: SITE_URL,
    siteName: "Orchelix",
    title: "Orchelix | AI Agents for Revenue Operations",
    description:
      "Multi-agent systems for lead qualification, call handling, deal closing, and financial close. Human-in-the-loop with senior consultants.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Orchelix - Orchestrating the Future of AI" }],
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
  "@type": "Organization",
  name: "Orchelix AI Consulting Inc.",
  url: SITE_URL,
  logo: `${SITE_URL}/orchelix-lockup-horizontal.png`,
  description:
    "AI agents for revenue operations — AI receptionist, sales automation, and financial operations for SMEs.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toronto",
    addressRegion: "ON",
    addressCountry: "CA",
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
