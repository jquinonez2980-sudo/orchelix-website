import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";
import VerticalPage from "@/app/components/sections/VerticalSections";
import { isLocale, localesFor, localizedHref } from "@/app/i18n/config";
import { getDictionary } from "@/app/i18n/dictionaries";

export function generateStaticParams() {
  return localesFor("/home-services").map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return {
    title: t.pages.verticals.homeServices.title,
    description: t.pages.verticals.homeServices.description,
    alternates: {
      canonical: localizedHref("/home-services", locale),
      languages: { en: "/home-services", es: "/es/home-services" },
    },
  };
}

export default async function HomeServicesPage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);

  return (
    <>
      <Nav locale={locale} t={t} />
      <VerticalPage v={t.pages.verticals.homeServices} t={t} locale={locale} />
      <Footer locale={locale} t={t} />
    </>
  );
}
