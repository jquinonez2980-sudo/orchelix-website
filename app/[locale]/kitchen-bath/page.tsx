import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";
import VerticalPage from "@/app/components/sections/VerticalSections";
import { isLocale, localesFor, localizedHref } from "@/app/i18n/config";
import { getDictionary } from "@/app/i18n/dictionaries";

export function generateStaticParams() {
  return localesFor("/kitchen-bath").map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getDictionary(locale);
  return {
    title: t.pages.verticals.kitchenBath.title,
    description: t.pages.verticals.kitchenBath.description,
    alternates: {
      canonical: localizedHref("/kitchen-bath", locale),
      languages: { en: "/kitchen-bath", es: "/es/kitchen-bath" },
    },
  };
}

export default async function KitchenBathPage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);

  return (
    <>
      <Nav locale={locale} t={t} />
      <VerticalPage v={t.pages.verticals.kitchenBath} t={t} locale={locale} />
      <Footer locale={locale} t={t} />
    </>
  );
}
