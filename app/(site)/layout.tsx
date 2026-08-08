import type { Metadata } from "next";
import Shell, { SITE_URL } from "@/app/shell";

/* Root layout for everything that is not the localized marketing surface:
   the dashboard, the operator console, /try-esmi, the blog, the legal pages,
   the vertical landers, and the auth routes.

   These are English-only today, so `lang` is fixed here. When one of them is
   localized, move it under `app/[locale]/` rather than adding a second
   language to this tree — the whole point of the split is that there is one
   place a locale can come from. */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Orchelix | AI agents that run revenue operations",
    template: "%s | Orchelix",
  },
  description:
    "Multi-agent systems for revenue operations, deployed by senior consultants. Bilingual English and Spanish call handling with a reviewable audit trail.",
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <Shell lang="en" skipLabel="Skip to main content">
      {children}
    </Shell>
  );
}
