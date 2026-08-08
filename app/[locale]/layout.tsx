import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Shell, { SITE_URL } from "@/app/shell";
import { LOCALES, isLocale } from "@/app/i18n/config";
import { getDictionary } from "@/app/i18n/dictionaries";

/* Root layout for the localized marketing surface.

   English is the default and is served unprefixed — proxy.ts rewrites `/` to
   `/en` internally, so the address bar keeps the clean URL while this segment
   still receives a `locale` param. Spanish is prefixed at `/es`. */

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.home.title, template: "%s | Orchelix" },
    description: t.home.description,
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_US" : "en_CA",
      alternateLocale: locale === "es" ? ["en_CA", "en_US"] : ["es_US"],
      url: locale === "es" ? `${SITE_URL}/es` : SITE_URL,
      siteName: "Orchelix",
      title: t.home.title,
      description: t.home.description,
      images: [{ url: "/og-image.jpg", width: 1408, height: 736, alt: "Orchelix" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.home.title,
      description: t.home.description,
      images: ["/og-image.jpg"],
    },
    icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

/* `LayoutProps` is a Next 16 global helper that types the params for this
   exact route — hand-writing the shape fails the generated route validator. */
export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  /* A bad locale 404s rather than rendering an English page under a foreign
     prefix — a wrong-language page that returns 200 is worse than a miss. */
  if (!isLocale(locale)) notFound();

  return (
    <Shell lang={locale} skipLabel={locale === "es" ? "Ir al contenido" : "Skip to main content"}>
      {children}
    </Shell>
  );
}
