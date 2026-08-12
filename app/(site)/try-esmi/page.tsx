import type { Metadata } from "next";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";
import EsmiChat from "./EsmiChat";
import PublicVoicePreview from "./PublicVoicePreview";
import JsonLd from "@/app/components/JsonLd";
import {
  Section,
  PageTitle,
  SectionTitle,
  Prose,
  Stamp,
  QuietAction,
  RuledList,
  Band,
  EntryList,
} from "@/app/components/ledger";
import { getDictionary } from "@/app/i18n/dictionaries";
import type { Locale } from "@/app/i18n/config";

/* Ruled Record demo page. Supports ?lang=es for full Spanish chrome so the
   bilingual product claim is demonstrated on the strongest proof surface,
   not only on marketing body copy. */

const SITE_URL = "https://www.orchelix.com";

export const metadata: Metadata = {
  title: "Try Esmi — Live AI Receptionist Demo",
  description:
    "Hear a real Esmi call, then talk to the same bilingual (EN/ES) agent yourself. See how it answers, qualifies, and books — and what it writes down afterwards.",
  alternates: { canonical: "/try-esmi" },
};

type Copy = {
  title: string;
  lede: string;
  book: string;
  stack: string;
  orCall: string;
  chatTitle: (company?: string) => string;
  chatBody: (company?: string) => string;
  producesTitle: string;
  producesLede: string;
  produces: [string, string][];
  handlesTitle: string;
  handles: { title: string; desc: string; meta: string }[];
  opsTitle: string;
  ops: [string, string][];
  closeTitle: string;
  closeLede: string;
};

const EN: Copy = {
  title: "Hear Esmi take a call",
  lede: "Esmi is answering calls in production today. A real recording first, then the same agent live in a chat you can type into. No form, no scheduling — the product doing its job, and the record it leaves behind.",
  book: "Book a pilot",
  stack: "See the agent stack",
  orCall: "Or call it yourself — +1 561 566 1066",
  chatTitle: (c) => (c ? `Ask Esmi about ${c}` : "Now ask it yourself"),
  chatBody: (c) =>
    c
      ? "This demo is configured with that business's hours, services, and booking rules — the same way a pilot would be."
      : "This is the same agent that answers the phone, running against a sample business. Ask it for an appointment, in English or Spanish.",
  producesTitle: "What every call leaves behind",
  producesLede:
    "The conversation is the visible part. The record is the part that matters at month-end, in a dispute, or when an auditor asks what happened.",
  produces: [
    ["Transcript", "Full text of both sides, in whichever language was spoken"],
    ["Reason", "Why the caller rang, written in their own words"],
    ["Disposition", "Booked, routed, answered, or closed — and by which rule"],
    ["Recording", "Kept under your retention rule, deleted on your schedule"],
    ["Handoff", "When a human takes over, they inherit the whole conversation"],
  ],
  handlesTitle: "What Esmi handles",
  handles: [
    {
      title: "Books appointments end to end",
      desc: "Esmi reads your live calendar, offers the slots you actually have, books the visit, and sends a bilingual SMS confirmation — on the same call, with no staff handoff.",
      meta: "Calendar · SMS",
    },
    {
      title: "Qualifies new leads",
      desc: "It asks the questions your sales team would ask, scores the lead against your criteria, and writes a one-paragraph brief into your CRM before the caller hangs up.",
      meta: "Scoring · CRM",
    },
    {
      title: "Escalates urgency",
      desc: "When a caller is hurt, angry, or in real distress, Esmi recognises the signal in both languages and pages the right on-call person instead of taking a message.",
      meta: "Routing · On-call",
    },
  ],
  opsTitle: "How Esmi is operated",
  ops: [
    ["Languages", "English and Spanish, natively"],
    ["Privacy", "PIPEDA-aligned for Canadian operations"],
    ["Residency", "Data residency available on request"],
    ["Oversight", "Every action reversible by a person"],
  ],
  closeTitle: "Put it on your own line",
  closeLede:
    "Fourteen days, your real number, a senior consultant on the setup — and every call on the record from the first ring.",
};

const ES: Copy = {
  title: "Escucha a Esmi contestar",
  lede: "Esmi ya contesta llamadas en producción. Primero una grabación real; después el mismo agente en un chat donde puedes escribir. Sin formulario ni cita — el producto haciendo su trabajo, y el registro que deja.",
  book: "Agenda un piloto",
  stack: "Ver el stack de agentes",
  orCall: "O llámalo tú — +1 561 566 1066",
  chatTitle: (c) => (c ? `Pregúntale a Esmi sobre ${c}` : "Ahora pregúntale tú"),
  chatBody: (c) =>
    c
      ? "Esta demo usa los horarios, servicios y reglas de reserva de ese negocio — igual que un piloto real."
      : "Es el mismo agente del teléfono, con un negocio de muestra. Pide una cita en inglés o en español.",
  producesTitle: "Lo que deja cada llamada",
  producesLede:
    "La conversación es la parte visible. El registro es lo que importa a fin de mes, en una disputa, o cuando un auditor pregunta qué pasó.",
  produces: [
    ["Transcripción", "Texto completo de ambos lados, en el idioma que se habló"],
    ["Motivo", "Por qué llamó la persona, en sus propias palabras"],
    ["Disposición", "Agendada, derivada, resuelta o cerrada — y por qué regla"],
    ["Grabación", "Bajo tu política de retención, borrada en tu calendario"],
    ["Traspaso", "Si interviene un humano, hereda toda la conversación"],
  ],
  handlesTitle: "Qué resuelve Esmi",
  handles: [
    {
      title: "Agenda citas de punta a punta",
      desc: "Lee tu calendario en vivo, ofrece los huecos que sí tienes, reserva la visita y manda un SMS bilingüe — en la misma llamada, sin pasar a un empleado.",
      meta: "Calendario · SMS",
    },
    {
      title: "Califica prospectos nuevos",
      desc: "Hace las preguntas de tu equipo de ventas, puntúa el lead y escribe un resumen de un párrafo en el CRM antes de colgar.",
      meta: "Puntuación · CRM",
    },
    {
      title: "Escala urgencias",
      desc: "Si la persona está herida, enojada o en apuros, Esmi lo reconoce en ambos idiomas y avisa a quien está de guardia en lugar de tomar un recado.",
      meta: "Derivación · Guardia",
    },
  ],
  opsTitle: "Cómo se opera Esmi",
  ops: [
    ["Idiomas", "Inglés y español, de forma nativa"],
    ["Privacidad", "Alineado con PIPEDA en operaciones canadienses"],
    ["Residencia", "Residencia de datos disponible a solicitud"],
    ["Control", "Cada acción reversible por una persona"],
  ],
  closeTitle: "Ponlo en tu propia línea",
  closeLede:
    "Catorce días, tu número real, un consultor senior en el montaje — y cada llamada en el registro desde el primer timbrazo.",
};

function prettifyTenant(slug: string): string {
  return slug
    .split(/[-_]/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default async function TryEsmiPage({
  searchParams,
}: {
  searchParams: Promise<{ tenant?: string; company?: string; lang?: string }>;
}) {
  const sp = await searchParams;
  const locale: Locale = sp.lang === "es" ? "es" : "en";
  const copy = locale === "es" ? ES : EN;
  const navT = await getDictionary(locale);

  const tenantId =
    typeof sp.tenant === "string" && sp.tenant.trim() ? sp.tenant.trim() : undefined;
  const companyName =
    typeof sp.company === "string" && sp.company.trim()
      ? sp.company.trim()
      : tenantId
        ? prettifyTenant(tenantId)
        : undefined;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "es" ? "Prueba Esmi" : "Try Esmi — AI Receptionist Demo",
        item: `${SITE_URL}/try-esmi`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <Nav locale={locale} t={navT} />
      <main id="main-content">
        <Section tone="field">
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center">
            <div>
              <PageTitle max="13ch">{copy.title}</PageTitle>
              <Prose size="1.0625rem" max="42ch" style={{ marginTop: "1.7rem" }}>
                {copy.lede}
              </Prose>
              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                <Stamp href={locale === "es" ? "/es/book" : "/book"}>{copy.book}</Stamp>
                <QuietAction href={locale === "es" ? "/es/solutions" : "/solutions"}>
                  {copy.stack}
                </QuietAction>
              </div>
              <a
                href="tel:+15615661066"
                className="lg-fig lg-quiet"
                style={{
                  display: "inline-block",
                  marginTop: "1.6rem",
                  fontSize: "0.8125rem",
                  letterSpacing: "0.05em",
                  color: "var(--lg-ink-2)",
                  textDecoration: "none",
                }}
              >
                {copy.orCall}
              </a>
              {/* Language switcher for this surface (not full i18n path yet) */}
              <p className="lg-fig mt-4" style={{ fontSize: "0.6875rem", letterSpacing: "0.1em" }}>
                <a
                  href={locale === "es" ? "/try-esmi" : "/try-esmi?lang=es"}
                  className="lg-quiet"
                  style={{ color: "var(--lg-ink-3)", textTransform: "uppercase" }}
                >
                  {locale === "es" ? "English" : "Español"}
                </a>
              </p>
            </div>
            <div className="lg-margin-rule lg:pl-8">
              <PublicVoicePreview initialLang={locale} />
            </div>
          </div>
        </Section>

        <Section tone="field-2" id="chat">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
            <div>
              <SectionTitle max="15ch">{copy.chatTitle(companyName)}</SectionTitle>
              <Prose size="1rem" max="40ch" style={{ marginTop: "1.4rem" }}>
                {copy.chatBody(companyName)}
              </Prose>
            </div>
            <EsmiChat
              defaultLocale={locale}
              tenantId={tenantId}
              companyName={companyName}
            />
          </div>
        </Section>

        <Section tone="field">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div>
              <SectionTitle max="16ch">{copy.producesTitle}</SectionTitle>
              <Prose size="1rem" max="42ch" style={{ marginTop: "1.4rem" }}>
                {copy.producesLede}
              </Prose>
            </div>
            <RuledList items={copy.produces} labelWidth="8.5rem" />
          </div>
        </Section>

        <Section tone="stock">
          <SectionTitle tone="stock" max="18ch">
            {copy.handlesTitle}
          </SectionTitle>
          <div className="mt-12">
            <EntryList tone="stock" entries={copy.handles} />
          </div>
        </Section>

        <Section tone="field-2" tight>
          <SectionTitle max="20ch">{copy.opsTitle}</SectionTitle>
          <div className="mt-10">
            <Band cols={4} items={copy.ops} />
          </div>
        </Section>

        <Section tone="field-3" style={{ borderTop: "2px solid var(--lg-foil)" }}>
          <div className="grid items-end gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div>
              <SectionTitle scale="display" max="16ch">
                {copy.closeTitle}
              </SectionTitle>
              <Prose size="1.0625rem" max="48ch" style={{ marginTop: "1.5rem" }}>
                {copy.closeLede}
              </Prose>
            </div>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:justify-end">
              <Stamp href={locale === "es" ? "/es/book" : "/book"} size="1rem">
                {copy.book}
              </Stamp>
              <a
                href="tel:+15615661066"
                className="lg-fig lg-quiet"
                style={{
                  fontSize: "0.8125rem",
                  letterSpacing: "0.08em",
                  color: "var(--lg-ink-2)",
                  textDecoration: "none",
                }}
              >
                +1 561 566 1066
              </a>
            </div>
          </div>
        </Section>
      </main>
      <Footer locale={locale} t={navT} />
    </>
  );
}
