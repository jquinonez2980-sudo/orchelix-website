import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "@/app/components/sections/Nav";
import Hero from "@/app/components/sections/Hero";
import HearCall from "@/app/components/sections/HearCall";
import Problem from "@/app/components/sections/Problem";
import Solutions from "@/app/components/sections/Solutions";
import HowItWorks from "@/app/components/sections/HowItWorks";
import Why from "@/app/components/sections/Why";
import Operators from "@/app/components/sections/Operators";
import FinalCTA from "@/app/components/sections/FinalCTA";
import Footer from "@/app/components/sections/Footer";
import TickRail from "@/app/components/sections/TickRail";
import InscriptionRoot from "@/app/inscription/InscriptionRoot";
import { isLocale, localizedHref } from "@/app/i18n/config";
import { getDictionary } from "@/app/i18n/dictionaries";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  /* Self-referencing canonical plus a reciprocal hreflang pair, so the two
     language versions are understood as alternates rather than duplicates. */
  return {
    alternates: {
      canonical: localizedHref("/", locale),
      languages: { en: "/", es: "/es" },
    },
  };
}

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);

  return (
    <InscriptionRoot>
      <Nav locale={locale} t={t} />
      <main id="main-content">
        <TickRail
          ticks={[
            { id: "top", label: t.home.rail.top },
            { id: "hear-esmi", label: t.home.rail.hear },
            { id: "problem", label: t.home.rail.problem },
            { id: "solutions", label: t.home.rail.solutions },
            { id: "how", label: t.home.rail.how },
            { id: "why", label: t.home.rail.why },
            { id: "operators", label: t.home.rail.operators },
            { id: "book", label: t.home.rail.book },
          ]}
        />
        <Hero locale={locale} t={t} />
        <HearCall locale={locale} t={t} />
        <Problem t={t} />
        <Solutions locale={locale} t={t} />
        <HowItWorks t={t} />
        <Why t={t} />
        <Operators t={t} />
        <FinalCTA locale={locale} t={t} />
      </main>
      <Footer locale={locale} t={t} />
    </InscriptionRoot>
  );
}
