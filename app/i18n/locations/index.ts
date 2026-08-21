import type { Locale } from "@/app/i18n/config";
import type { LocationPage } from "./types";
import LOCATIONS_EN from "./en";
import LOCATIONS_ES from "./es";

export type { LocationPage } from "./types";

/* Metro copy lives here rather than in the message catalogues, following the
   precedent set by app/i18n/industries/: eight metros times three context
   blocks, four sectors, and four questions is a large body of copy that two
   routes read and every other page would otherwise import. */

const BY_LOCALE: Record<Locale, LocationPage[]> = {
  en: LOCATIONS_EN,
  es: LOCATIONS_ES,
};

export function getLocations(locale: Locale): LocationPage[] {
  return BY_LOCALE[locale];
}

export function getLocation(locale: Locale, slug: string): LocationPage | undefined {
  return BY_LOCALE[locale].find((l) => l.slug === slug);
}

/* Slugs are locale-independent by design, so the route's static params come
   from one list. The Spanish set is written rather than translated, but it is
   written for the same eight metros — a Spanish page that exists at a slug the
   English set does not carry would break the language switcher, which derives
   the other locale's URL from the current path. */
export const LOCATION_SLUGS = LOCATIONS_EN.map((l) => l.slug);

/* Shared page chrome. The per-metro copy above is the page; these are the
   labels around it, and they are the only strings the two routes repeat. */
type Chrome = {
  hubTitle: string;
  hubDescription: string;
  hubHeading: string;
  hubLede: string;
  usHeading: string;
  caHeading: string;
  contextHeading: string;
  sectorsHeading: string;
  faqHeading: string;
  areaCodesLabel: string;
  regionLabel: string;
  languagesLabel: string;
  languagesValue: string;
  hoursLabel: string;
  hoursValue: string;
  otherMetrosHeading: string;
  closeHeading: string;
  closeBody: string;
  notListedHeading: string;
  notListedBody: string;
};

const CHROME: Record<Locale, Chrome> = {
  en: {
    hubTitle: "Where Orchelix works",
    hubDescription:
      "Orchelix builds bilingual AI receptionists for businesses in South Florida and Southern Ontario. Esmi answers a forwarded line, so it works anywhere — these are the markets we know the phone in.",
    hubHeading: "Two markets we know the phone in",
    hubLede:
      "Esmi answers a number, so geography is not a technical limit. It is an editorial one: these are the metros where we can tell you something true about why the phone rings the way it does, rather than swapping a city name into the same page eight times.",
    usHeading: "South Florida",
    caHeading: "Southern Ontario",
    contextHeading: "Why the phone behaves this way here",
    sectorsHeading: "What calls in this market",
    faqHeading: "Questions people ask first",
    areaCodesLabel: "Area codes",
    regionLabel: "Region",
    languagesLabel: "Languages",
    languagesValue: "English and Spanish, natively",
    hoursLabel: "Hours",
    hoursValue: "24/7, nights and weekends included",
    otherMetrosHeading: "Other metros",
    closeHeading: "Hear it before you buy it",
    closeBody:
      "There is a real recording on the demo page, and the same agent in a chat you can type into. No form, no scheduling — the product doing its job.",
    notListedHeading: "Not on this list?",
    notListedBody:
      "Esmi answers any line you can forward, so a metro missing from this page is a page we have not written, not a market we cannot serve. Tell us where you are on the pilot call.",
  },
  es: {
    hubTitle: "Dónde trabaja Orchelix",
    hubDescription:
      "Orchelix construye recepcionistas bilingües con IA para negocios del sur de Florida y el sur de Ontario. Esmi contesta una línea desviada, así que funciona en cualquier lugar: estos son los mercados donde conocemos el teléfono.",
    hubHeading: "Dos mercados donde conocemos el teléfono",
    hubLede:
      "Esmi contesta un número, así que la geografía no es un límite técnico. Es un límite editorial: estas son las ciudades donde podemos decirle algo cierto sobre por qué el teléfono suena como suena, en lugar de cambiarle el nombre de la ciudad a la misma página ocho veces.",
    usHeading: "Sur de Florida",
    caHeading: "Sur de Ontario",
    contextHeading: "Por qué el teléfono se comporta así aquí",
    sectorsHeading: "Quién llama en este mercado",
    faqHeading: "Preguntas que hacen primero",
    areaCodesLabel: "Códigos de área",
    regionLabel: "Región",
    languagesLabel: "Idiomas",
    languagesValue: "Español e inglés, de forma nativa",
    hoursLabel: "Horario",
    hoursValue: "24/7, noches y fines de semana incluidos",
    otherMetrosHeading: "Otras ciudades",
    closeHeading: "Escúchelo antes de comprarlo",
    closeBody:
      "Hay una grabación real en la página de demostración y el mismo agente en un chat donde puede escribir. Sin formulario y sin agendar: el producto haciendo su trabajo.",
    notListedHeading: "¿No está en la lista?",
    notListedBody:
      "Esmi contesta cualquier línea que usted pueda desviar, así que una ciudad que falte en esta página es una página que no hemos escrito, no un mercado que no podamos atender. Díganos dónde está en la llamada del piloto.",
  },
};

export function getLocationChrome(locale: Locale): Chrome {
  return CHROME[locale];
}
