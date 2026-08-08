import type { Metadata } from "next";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";
import ContactForm from "@/app/components/sections/ContactForm";
import JsonLd from "@/app/components/JsonLd";

const SITE_URL = "https://www.orchelix.com";
const PAGE_PATH = "/es/recepcionista-ia";

export const metadata: Metadata = {
  title: "Recepcionista con IA para tu Negocio — Esmi",
  description:
    "Esmi es una recepcionista con IA que contesta cada llamada 24/7, califica prospectos, agenda citas y responde preguntas — bilingüe (EN/ES), con transferencia a un humano cuando hace falta. Reserva una demo.",
  alternates: {
    canonical: PAGE_PATH,
    languages: {
      "en-US": "/ai-receptionist",
      "es-ES": PAGE_PATH,
      "x-default": "/ai-receptionist",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: `${SITE_URL}${PAGE_PATH}`,
    title: "Recepcionista con IA para tu Negocio — Esmi de Orchelix",
    description:
      "Una recepcionista virtual con IA que contesta llamadas 24/7, califica prospectos y agenda citas. Bilingüe, con transferencia a un humano.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Recepcionista con IA para tu Negocio — Esmi de Orchelix",
    description:
      "Una recepcionista virtual con IA que contesta llamadas 24/7, califica prospectos y agenda citas. Bilingüe, con transferencia a un humano.",
  },
};

/* ─── FAQ (alimenta el acordeón visible y el schema FAQPage) ──────────────── */

const FAQS: { q: string; a: string }[] = [
  {
    q: "¿Qué es una recepcionista con IA?",
    a: "Una recepcionista con IA es un agente telefónico virtual que contesta tus llamadas entrantes automáticamente — saluda a quien llama, responde preguntas comunes, califica prospectos y agenda citas — sin que una persona levante el teléfono. Esmi funciona 24/7 y transfiere a tu equipo cuando una llamada necesita un humano.",
  },
  {
    q: "¿En qué se diferencia de un servicio de contestación tradicional?",
    a: "Un servicio de contestación tradicional toma mensajes y los reenvía; tú todavía tienes que devolver la llamada. Esmi resuelve toda la interacción en tiempo real — responde preguntas, califica a quien llama y agenda la cita en tu calendario antes de colgar — así no queda nada pendiente de seguimiento.",
  },
  {
    q: "¿La recepcionista con IA puede agendar citas?",
    a: "Sí. Esmi consulta tu calendario en vivo, ofrece los horarios disponibles, agenda la cita y envía una confirmación por SMS — todo en la misma llamada. Sin transferir a tu personal.",
  },
  {
    q: "¿Esmi habla español?",
    a: "Sí. Esmi es bilingüe (español e inglés) y puede cambiar de idioma a mitad de la llamada, algo clave para atender al sur de Florida y a mercados bilingües.",
  },
  {
    q: "¿Qué pasa cuando una llamada necesita un humano?",
    a: "Esmi transfiere a tu equipo y entrega todo el contexto de la llamada — quién llama, qué necesita y un resumen — para que la persona que continúa no empiece desde cero.",
  },
  {
    q: "¿Cuánto tarda la implementación?",
    a: "Esmi normalmente está en funcionamiento en 2 a 3 semanas. La configuramos con tus guiones, tu calendario y tus preguntas frecuentes, y la probamos contigo antes de salir en vivo.",
  },
  {
    q: "¿Quien llama sabrá que habla con una IA?",
    a: "Esmi está diseñada para sonar natural y servicial, y somos transparentes sobre cómo se presenta. Tú controlas el saludo y el tono para que refleje tu marca.",
  },
  {
    q: "¿Cuánto cuesta una recepcionista con IA?",
    a: "Esmi se ofrece como un servicio mensual gestionado y flexible, sin contratos a largo plazo. Consulta los paquetes actuales en nuestra página de precios o reserva una demo para una cotización ajustada a tu volumen de llamadas.",
  },
];

/* ─── Schema ──────────────────────────────────────────────────────────────── */

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Esmi — Recepcionista con IA",
  serviceType: "Recepcionista Virtual con IA",
  description:
    "Recepcionista con IA que contesta llamadas 24/7, califica prospectos, agenda citas y responde preguntas — bilingüe (EN/ES) con transferencia a un humano.",
  url: `${SITE_URL}${PAGE_PATH}`,
  inLanguage: "es",
  provider: { "@id": `${SITE_URL}/#org` },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Sur de Florida" },
    { "@type": "AdministrativeArea", name: "Norteamérica" },
  ],
  availableLanguage: ["Spanish", "English"],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "es",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/es` },
    { "@type": "ListItem", position: 2, name: "Recepcionista con IA", item: `${SITE_URL}${PAGE_PATH}` },
  ],
};

/* ─── Página ──────────────────────────────────────────────────────────────── */

export default function RecepcionistaIaPage() {
  return (
    <>
      <JsonLd data={[serviceJsonLd, faqJsonLd, breadcrumbJsonLd]} />
      <Nav />
      <main id="main-content">
        <Hero />
        <Problem />
        <HowItWorks />
        <Benefits />
        <CtaBand />
        <Testimonials />
        <PricingTeaser />
        <Faq />
        <ContactForm locale="es" />
      </main>
      <Footer />
    </>
  );
}

/* ─── Bits compartidos ────────────────────────────────────────────────────── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em]"
      style={{ fontFamily: "var(--font-mono)", color: "var(--teal-700)" }}
    >
      <span className="inline-block h-px w-[18px] bg-current opacity-70" />
      {children}
    </span>
  );
}

/* ─── Hero ────────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-24 pb-20 sm:px-8 sm:pt-28 sm:pb-24 lg:px-10 lg:pt-[132px] lg:pb-[112px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 80% at 88% 22%, rgba(20,184,166,0.10), transparent 60%),
            radial-gradient(circle at 1px 1px, rgba(10,37,64,0.05) 1px, transparent 1.5px)
          `,
          backgroundSize: "auto, 28px 28px",
          maskImage: "radial-gradient(ellipse 100% 80% at 50% 30%, black 30%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 100% 80% at 50% 30%, black 30%, transparent 90%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-[820px] text-center">
        <Eyebrow>Recepcionista Virtual con IA · EN / ES</Eyebrow>
        <h1
          className="mt-6 mb-6 text-balance text-[40px] leading-[1.04] font-medium tracking-[-0.032em] sm:text-[54px] lg:text-[64px] lg:leading-[1.02]"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
        >
          Una{" "}
          <span style={{ color: "var(--teal-700)" }}>recepcionista con IA</span>{" "}
          que contesta cada llamada, de día y de noche.
        </h1>
        <p
          className="mx-auto mb-9 max-w-[600px] text-[17px] leading-[1.6] sm:text-[19px]"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
        >
          Esmi contesta tus teléfonos 24/7, califica cada prospecto, agenda citas
          directo en tu calendario y responde tus preguntas frecuentes — de forma
          bilingüe, y con transferencia a un humano en el momento en que se necesita.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="/book"
            className="inline-flex h-12 items-center rounded-xl px-6 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
            style={{
              fontFamily: "var(--font-display)",
              background: "var(--navy-600)",
              boxShadow: "0 1px 0 rgba(255,255,255,0.08) inset, 0 4px 20px rgba(10,37,64,0.18)",
            }}
          >
            Reservar demo <span className="ml-1.5 opacity-65">→</span>
          </a>
          <a
            href="/try-esmi"
            className="inline-flex h-12 items-center rounded-xl border px-6 text-[15px] font-medium transition-colors hover:bg-white"
            style={{ fontFamily: "var(--font-display)", borderColor: "var(--line-strong)", color: "var(--ink)" }}
          >
            Probar Esmi en vivo
          </a>
        </div>
        <div
          className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] font-medium"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}
        >
          <span>Contesta al primer timbre</span>
          <span className="inline-block h-1 w-1 rounded-full bg-teal-500" />
          <span>24/7 · noches · fines de semana</span>
          <span className="inline-block h-1 w-1 rounded-full bg-teal-500" />
          <span>En vivo en 2–3 semanas</span>
        </div>
      </div>
    </section>
  );
}

/* ─── Problema ────────────────────────────────────────────────────────────── */

const PROBLEMS = [
  {
    h: "Las llamadas perdidas son ingresos perdidos",
    p: "Cuando nadie contesta, quien llama no deja mensaje — llama a tu competencia. Cada timbre sin respuesta es un cliente perdido.",
  },
  {
    h: "Las llamadas fuera de horario no llegan a nada",
    p: "La mayoría de las llamadas listas para agendar llegan fuera del horario de oficina. El buzón de voz no agenda la cita — solo la retrasa.",
  },
  {
    h: "Tu recepción está saturada",
    p: "El personal de recepción atiende visitas, papeleo y el teléfono a la vez. Contratar, capacitar y cubrir ausencias es caro y nunca alcanza.",
  },
  {
    h: "El seguimiento lento mata prospectos",
    p: "Un prospecto que espera horas por una llamada de vuelta ya se fue con otro. La velocidad de respuesta decide entre una cita y un rebote.",
  },
];

function Problem() {
  return (
    <section
      className="px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
      style={{ borderTop: "1px solid var(--line)", background: "var(--surface-2)" }}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto mb-12 max-w-[640px] text-center">
          <Eyebrow>El costo de un teléfono que suena</Eyebrow>
          <h2
            className="mt-4 text-[30px] font-semibold leading-[1.1] tracking-[-0.022em] sm:text-[38px]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            Un teléfono que nadie contesta es una fuga en tu negocio.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {PROBLEMS.map((item) => (
            <div
              key={item.h}
              className="rounded-[18px] border p-6 sm:p-7"
              style={{ borderColor: "var(--line)", background: "#fff" }}
            >
              <h3
                className="mb-2 text-[17px] font-semibold leading-snug"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
              >
                {item.h}
              </h3>
              <p
                className="text-[15px] leading-[1.6]"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
              >
                {item.p}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Cómo funciona ───────────────────────────────────────────────────────── */

const STEPS = [
  {
    n: "01",
    h: "Entrenamos a Esmi con tu negocio",
    p: "Tus servicios, horarios, preguntas frecuentes, guiones y calendario. Esmi aprende a sonar como tu recepción — en español e inglés.",
  },
  {
    n: "02",
    h: "Esmi contesta cada llamada",
    p: "De día o de noche, al primer timbre. Saluda, responde preguntas y califica prospectos con las preguntas que haría tu equipo.",
  },
  {
    n: "03",
    h: "Agenda y confirma",
    p: "Esmi ofrece horarios de tu calendario en vivo, agenda la cita y envía una confirmación bilingüe por SMS en la misma llamada.",
  },
  {
    n: "04",
    h: "Los humanos intervienen cuando importa",
    p: "Para algo delicado o complejo, Esmi transfiere a tu equipo con el resumen completo — nadie repite su historia.",
  },
];

function HowItWorks() {
  return (
    <section className="px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto mb-12 max-w-[640px] text-center">
          <Eyebrow>Cómo funciona Esmi</Eyebrow>
          <h2
            className="mt-4 text-[30px] font-semibold leading-[1.1] tracking-[-0.022em] sm:text-[38px]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            En vivo en semanas, no en meses.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div key={step.n} className="flex flex-col gap-3">
              <span
                className="text-[13px] font-medium tracking-[0.04em]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--teal-600)" }}
              >
                {step.n}
              </span>
              <span aria-hidden="true" className="block h-px w-full" style={{ background: "var(--line)" }} />
              <h3
                className="mt-1 text-[17px] font-semibold leading-snug"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
              >
                {step.h}
              </h3>
              <p
                className="text-[15px] leading-[1.6]"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
              >
                {step.p}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Beneficios ──────────────────────────────────────────────────────────── */

function Icon({ path }: { path: React.ReactNode }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}

const BENEFITS: { icon: React.ReactNode; h: string; p: string }[] = [
  {
    icon: <Icon path={<><path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 6v6l4 2" /></>} />,
    h: "Nunca pierdas una llamada",
    p: "Cobertura 24/7 al primer timbre — noches, fines de semana, feriados y desbordes cuando tu equipo está ocupado.",
  },
  {
    icon: <Icon path={<><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></>} />,
    h: "Califica cada prospecto",
    p: "Hace las preguntas que haría tu equipo de ventas, califica al prospecto y registra una nota en tu CRM antes de que cuelguen.",
  },
  {
    icon: <Icon path={<><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="m9 16 2 2 4-4" /></>} />,
    h: "Agenda citas de principio a fin",
    p: "Consulta tu calendario en vivo, ofrece los horarios correctos, agenda la cita y confirma por SMS — todo en una llamada.",
  },
  {
    icon: <Icon path={<><path d="M5 8h14M5 8a2 2 0 1 1 0-4h14a2 2 0 1 1 0 4M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8" /><path d="m9 14 2 2 4-4" /></>} />,
    h: "Bilingüe por defecto",
    p: "Fluida en español e inglés, cambiando de idioma a mitad de llamada — hecha para el sur de Florida y mercados bilingües.",
  },
  {
    icon: <Icon path={<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>} />,
    h: "Transferencia a un humano, incluida",
    p: "Transfiere a tu equipo con todo el contexto cuando una llamada necesita una persona. IA para lo rutinario, humanos para el resto.",
  },
  {
    icon: <Icon path={<><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></>} />,
    h: "Cada llamada, registrada",
    p: "Resúmenes, transcripciones y notas de prospectos llegan a donde tu equipo ya trabaja — nada se pierde en el camino.",
  },
];

function Benefits() {
  return (
    <section
      className="px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
      style={{ borderTop: "1px solid var(--line)", background: "var(--surface-2)" }}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto mb-12 max-w-[640px] text-center">
          <Eyebrow>Lo que obtienes</Eyebrow>
          <h2
            className="mt-4 text-[30px] font-semibold leading-[1.1] tracking-[-0.022em] sm:text-[38px]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            Una recepción que nunca duerme.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b) => (
            <div
              key={b.h}
              className="rounded-[18px] border p-6 sm:p-7"
              style={{ borderColor: "var(--line)", background: "#fff" }}
            >
              <span
                className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-[12px]"
                style={{ background: "var(--teal-50)", color: "var(--teal-700)", border: "1px solid var(--teal-100)" }}
              >
                {b.icon}
              </span>
              <h3
                className="mb-2 text-[17px] font-semibold leading-snug"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
              >
                {b.h}
              </h3>
              <p
                className="text-[15px] leading-[1.6]"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
              >
                {b.p}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Banda CTA ───────────────────────────────────────────────────────────── */

function CtaBand() {
  return (
    <section className="px-6 pb-4 pt-16 sm:px-8 lg:px-10 lg:pt-[72px]">
      <div className="mx-auto max-w-[1200px]">
        <div
          className="flex flex-col gap-7 sm:gap-8 lg:flex-row lg:items-center lg:gap-10"
          style={{
            background: "var(--navy-700)",
            backgroundImage: `
              radial-gradient(ellipse 60% 100% at 100% 50%, rgba(20,184,166,0.28), transparent 65%),
              linear-gradient(135deg, #0A2540 0%, #051A31 100%)
            `,
            borderRadius: 26,
            padding: "48px 32px",
            color: "#fff",
            border: "1px solid rgba(20,184,166,0.18)",
          }}
        >
          <div>
            <h2
              className="text-[26px] sm:text-[32px] lg:text-[36px]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600, lineHeight: 1.12, letterSpacing: "-0.026em", margin: 0, maxWidth: 560 }}
            >
              Empieza con una agente. Ve resultados en 30 días.
            </h2>
            <p
              style={{ fontFamily: "var(--font-display)", fontSize: 16, lineHeight: 1.6, color: "rgba(255,255,255,0.75)", margin: "14px 0 0", maxWidth: 480 }}
            >
              Implementa Esmi en menos de dos semanas con un consultor dedicado. Sin contratos largos. Cancela cuando quieras.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:ml-auto lg:shrink-0">
            <a
              href="/try-esmi"
              style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 15, padding: "15px 24px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.06)", color: "#fff", textDecoration: "none" }}
            >
              Probar Esmi en vivo
            </a>
            <a
              href="/book"
              style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 15, padding: "15px 24px", borderRadius: 12, background: "#fff", color: "var(--navy-600)", textDecoration: "none" }}
            >
              Reservar demo →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonios ──────────────────────────────────────────────────────────────
   CONTENIDO PROVISIONAL — reemplazar con citas reales y atribuibles de clientes
   antes de usarlo como prueba social. No se usan nombres de empresas ni logos
   ficticios a propósito; sustituye `quote` y `attribution` con consentimiento.  */

const TESTIMONIALS = [
  {
    quote:
      "[Provisional] Antes, fuera de horario solo había buzón de voz. Ahora cada llamada se contesta y se agenda — dejamos de perder prospectos los fines de semana.",
    attribution: "Dueño, negocio de servicios",
  },
  {
    quote:
      "[Provisional] La atención bilingüe sola ya se pagó. Los clientes que hablan español por fin reciben la misma experiencia.",
    attribution: "Líder de operaciones, consultorio con varias sedes",
  },
  {
    quote:
      "[Provisional] Califica a quien llama y deja un resumen limpio en nuestro CRM. Mi equipo deja de perseguir curiosos.",
    attribution: "Gerente de ventas, empresa de servicios en campo",
  },
];

function Testimonials() {
  return (
    <section className="px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto mb-12 max-w-[640px] text-center">
          <Eyebrow>Lo que dicen los dueños</Eyebrow>
          <h2
            className="mt-4 text-[30px] font-semibold leading-[1.1] tracking-[-0.022em] sm:text-[38px]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            Hecha para ganar confianza en la primera llamada.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.attribution}
              className="flex flex-col gap-4 rounded-[18px] border p-6 sm:p-7"
              style={{ borderColor: "var(--line)", background: "#fff" }}
            >
              <blockquote className="text-[16px] leading-[1.6]" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
                {t.quote}
              </blockquote>
              <figcaption className="text-[13px] font-medium tracking-[0.02em]" style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}>
                {t.attribution}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Precios (teaser) ────────────────────────────────────────────────────── */

function PricingTeaser() {
  return (
    <section
      className="px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
      style={{ borderTop: "1px solid var(--line)", background: "var(--surface-2)" }}
    >
      <div className="mx-auto max-w-[760px] text-center">
        <Eyebrow>Precios simples y flexibles</Eyebrow>
        <h2
          className="mt-4 mb-4 text-[30px] font-semibold leading-[1.1] tracking-[-0.022em] sm:text-[38px]"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
        >
          Un servicio mensual gestionado — sin contratos largos.
        </h2>
        <p
          className="mx-auto mb-8 max-w-[520px] text-[16px] leading-[1.6]"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
        >
          Empieza con Esmi y agrega más agentes a medida que creces. Monitoreo,
          optimización y un consultor senior incluidos. Cancela cuando quieras.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="/pricing"
            className="inline-flex h-12 items-center rounded-xl px-6 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
            style={{ fontFamily: "var(--font-display)", background: "var(--navy-600)" }}
          >
            Ver precios <span className="ml-1.5 opacity-65">→</span>
          </a>
          <a
            href="/book"
            className="inline-flex h-12 items-center rounded-xl border px-6 text-[15px] font-medium transition-colors hover:bg-white"
            style={{ fontFamily: "var(--font-display)", borderColor: "var(--line-strong)", color: "var(--ink)" }}
          >
            Obtener cotización
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ (details nativo — sin JS de cliente) ────────────────────────────── */

function Faq() {
  return (
    <section className="px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[820px]">
        <div className="mb-10 text-center">
          <Eyebrow>Preguntas frecuentes</Eyebrow>
          <h2
            className="mt-4 text-[30px] font-semibold leading-[1.1] tracking-[-0.022em] sm:text-[38px]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            Tus preguntas sobre la recepcionista con IA, respondidas.
          </h2>
        </div>
        <div className="flex flex-col divide-y" style={{ borderColor: "var(--line)" }}>
          {FAQS.map((faq) => (
            <details key={faq.q} className="group py-5" style={{ borderColor: "var(--line)" }}>
              <summary
                className="flex cursor-pointer list-none items-start justify-between gap-4 text-left"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="text-[15px] font-semibold leading-snug" style={{ color: "var(--ink)" }}>
                  {faq.q}
                </span>
                <span
                  className="mt-0.5 shrink-0 text-[18px] leading-none transition-transform group-open:rotate-45"
                  style={{ color: "var(--ink-3)" }}
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p
                className="mt-3 text-[14.5px] leading-[1.65]"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
              >
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
