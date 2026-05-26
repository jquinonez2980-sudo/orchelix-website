import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";
import ContactForm from "@/app/components/sections/ContactForm";
import EsmiChat from "@/app/try-esmi/EsmiChat";

export const metadata: Metadata = {
  title: "Orchelix | Agentes de IA para Operaciones de Ingresos",
  description:
    "Sistema multi-agente que califica prospectos, atiende llamadas, cierra ventas y gestiona el cierre financiero — con supervisión humana y consultores senior.",
  alternates: { canonical: "/es" },
  openGraph: {
    locale: "es_MX",
    title: "Orchelix | Agentes de IA para Operaciones de Ingresos",
    description:
      "Sistema multi-agente de IA para operaciones de ingresos — recepcionista virtual, automatización de ventas y operaciones financieras para PYMEs.",
  },
};

export default function EsPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <EsHero />
        <EsTrust />
        <EsSolutions />
        <EsHowItWorks />
        <EsWhy />
        <EsEsmiSection />
        <ContactForm locale="es" />
        <EsFinalCTA />
      </main>
      <Footer />
    </>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────────────────── */

function EsHero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden"
      style={{ minHeight: "clamp(600px, 90vh, 920px)" }}
    >
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-main.png"
          alt="Profesional de negocios usando agentes de IA de Orchelix con paneles de análisis"
          fill
          priority
          quality={75}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
          style={{ objectFit: "cover", objectPosition: "65% center" }}
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `linear-gradient(105deg,
            rgba(6,18,36,0.97) 0%,
            rgba(6,18,36,0.93) 28%,
            rgba(6,18,36,0.72) 48%,
            rgba(6,18,36,0.18) 66%,
            transparent 78%
          )`,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-28"
        style={{ background: "linear-gradient(to top, rgba(6,18,36,0.55), transparent)" }}
      />

      <div
        className="relative z-10 mx-auto flex max-w-[1200px] flex-col justify-center px-6 py-28 sm:px-8 sm:py-32 lg:px-10 lg:py-[148px]"
        style={{ minHeight: "inherit" }}
      >
        <div className="max-w-[580px]">
          <span
            className="inline-flex items-center gap-2.5 text-[11px] leading-none font-medium uppercase tracking-[0.18em] text-teal-400"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span className="inline-block h-px w-[18px] bg-current opacity-70" />
            Operaciones de ingresos multi-agente
          </span>

          <h1
            className="mt-7 mb-8 text-balance text-[42px] leading-[1.04] font-medium tracking-[-0.032em] text-white sm:text-[60px] sm:leading-[1.02] sm:tracking-[-0.035em] lg:text-[76px] lg:leading-[1.01] lg:tracking-[-0.038em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Agentes de IA que{" "}
            <span
              className="bg-gradient-to-br from-teal-300 via-teal-400 to-teal-500 bg-clip-text font-normal italic"
              style={{ WebkitTextFillColor: "transparent", paddingRight: "0.1em" }}
            >
              de verdad mueven
            </span>{" "}
            tus operaciones de ingresos.
          </h1>

          <p
            className="mb-10 max-w-[500px] text-[17px] leading-[1.6] text-white/70 sm:text-[18px] lg:text-[19px]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Un sistema multi-agente que califica prospectos, atiende llamadas, cierra
            ventas y gestiona el cierre financiero — para que tu equipo invierta su
            tiempo en lo que realmente importa.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/book"
              className="inline-flex h-12 items-center rounded-xl bg-white px-6 text-[15px] font-medium transition-opacity hover:opacity-90"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--navy-700)",
                boxShadow: "0 1px 0 rgba(255,255,255,0.15) inset, 0 4px 20px rgba(0,0,0,0.30)",
              }}
            >
              Reserva una demo <span className="ml-1.5 opacity-65">→</span>
            </a>
            <a
              href="/es#como-funciona"
              className="inline-flex h-12 items-center rounded-xl border border-white/25 px-6 text-[15px] font-medium text-white/90 transition-colors hover:bg-white/10"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Cómo funciona
            </a>
          </div>

          <div
            className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] leading-none font-medium tracking-[0.02em] text-white/45"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <a
              href="tel:+15615661066"
              className="text-white/60 hover:text-white/90 transition-colors"
              style={{ textDecoration: "none", letterSpacing: "0.04em" }}
            >
              (561)&nbsp;566-1066
            </a>
            <span className="inline-block h-1 w-1 rounded-full bg-teal-500" />
            <span>Bilingüe&nbsp;EN&nbsp;·&nbsp;ES</span>
            <span className="inline-block h-1 w-1 rounded-full bg-teal-500" />
            <span>SOC&nbsp;2&nbsp;en&nbsp;proceso</span>
            <span className="inline-block h-1 w-1 rounded-full bg-teal-500" />
            <span>Cumple&nbsp;con&nbsp;PIPEDA</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Trust ─────────────────────────────────────────────────────────────────── */

function EsTrust() {
  const stats = [
    { num: "128", unit: "k",   label: "Llamadas atendidas por agentes Orchelix este año." },
    { num: "3",   unit: ".4×", label: "Más rápido el cierre mensual con Accounting OS." },
    { num: "94",  unit: "%",   label: "De prospectos calificados transferidos con contexto completo." },
    { num: "14",  unit: "d",   label: "De la primera llamada a tu primer agente en producción." },
  ];

  const industries = [
    "Arquitectura & Diseño de Interiores",
    "Piedra & Fabricación",
    "Servicios en Campo & Construcción",
    "Manufactura & Distribución",
    "Salud & Consultorios Médicos",
    "Legal & Servicios Profesionales",
  ];

  return (
    <section style={{ padding: "32px 0 88px" }}>
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <p
          style={{
            textAlign: "center",
            maxWidth: 700,
            margin: "0 auto 40px",
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: 17,
            lineHeight: 1.6,
            color: "var(--ink-2)",
          }}
        >
          Diseñado para operadores en Norteamérica — negocios liderados por sus dueños,
          corporaciones profesionales y organizaciones de servicio listas para crecer
          con automatización inteligente.
        </p>

        <div
          style={{
            display: "flex",
            gap: 40,
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            padding: "28px 0",
            borderTop: "1px solid var(--line)",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 500,
              fontSize: 11,
              lineHeight: 1,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--ink-3)",
            }}
          >
            Para
          </span>
          {industries.map(industry => (
            <span
              key={industry}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: 14,
                lineHeight: 1,
                letterSpacing: "-0.005em",
                color: "var(--ink-3)",
                opacity: 0.75,
              }}
            >
              {industry}
            </span>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-10">
          {stats.map(({ num, unit, label }) => (
            <div key={label}>
              <div
                className="text-[36px] sm:text-[48px]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  color: "var(--ink)",
                }}
              >
                {num}
                <span style={{ color: "var(--teal-500)", fontWeight: 500 }}>{unit}</span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: 1.5,
                  color: "var(--ink-2)",
                  marginTop: 14,
                  maxWidth: 240,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Solutions ─────────────────────────────────────────────────────────────── */

function EsSolutions() {
  const agents = [
    {
      badge: "EN VIVO",
      name: "Recepcionista Virtual",
      subtitle: "Atención al cliente · Automatización de llamadas",
      desc: "Atiende cada llamada en menos de 15 segundos — bilingüe, fines de semana, sin perder una sola cita. Se integra con tu calendario y CRM el primer día.",
      stats: [{ v: "12s", l: "Tiempo de atención" }, { v: "24/7", l: "Disponible" }],
      accent: "from-teal-500 to-teal-400",
    },
    {
      badge: "EN VIVO",
      name: "Agente de Ventas",
      subtitle: "Calificación de prospectos · CRM",
      desc: "Califica prospectos, mueve leads por el pipeline y alerta a tu equipo cuando hay un trato listo para cerrar — todo antes de que el teléfono deje de sonar.",
      stats: [{ v: "94%", l: "Tasa de entrega" }, { v: "<1m", l: "Brief al CRM" }],
      accent: "from-blue-500 to-teal-500",
    },
    {
      badge: "EN VIVO",
      name: "Accounting OS",
      subtitle: "Operaciones financieras · Cierre mensual",
      desc: "Conciliación automática, cierre mensual y alertas de anomalías — para que tu contador invierta su tiempo en análisis, no en hojas de cálculo.",
      stats: [{ v: "3.4×", l: "Más rápido" }, { v: "14d", l: "Primer cierre" }],
      accent: "from-navy-600 to-blue-600",
    },
  ];

  return (
    <section
      style={{
        background: "var(--surface-2)",
        padding: "100px 0 120px",
        borderTop: "1px solid var(--line)",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <div style={{ maxWidth: 560, marginBottom: 64 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "var(--font-mono)",
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--teal-700)",
            }}
          >
            <span style={{ width: 18, height: 1, background: "currentColor", opacity: 0.7, display: "inline-block" }} />
            Suite de agentes
          </span>
          <h2
            className="mt-4 text-[32px] leading-[1.1] font-semibold tracking-[-0.026em] sm:text-[42px]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)", marginBottom: 16 }}
          >
            Tres agentes.{" "}
            <span
              className="bg-gradient-to-br from-navy-600 via-teal-500 to-teal-400 bg-clip-text font-normal italic"
              style={{ WebkitTextFillColor: "transparent", paddingRight: "0.1em" }}
            >
              Una sola
            </span>{" "}
            operación.
          </h2>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 18, lineHeight: 1.6, color: "var(--ink-2)", margin: 0 }}>
            Cada agente está diseñado para un trabajo específico dentro de tus operaciones
            de ingresos. Implementados juntos, actúan como un equipo de operaciones completo.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((a) => (
            <div
              key={a.name}
              style={{
                background: "#fff",
                border: "1px solid var(--line)",
                borderRadius: 20,
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(10,37,64,0.05)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 24,
                  right: 24,
                  top: 0,
                  height: 2,
                  background: "linear-gradient(90deg, var(--teal-500), #3B8FD4)",
                  borderRadius: "0 0 4px 4px",
                }}
              />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 500,
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#0D766B",
                    background: "rgba(20,184,166,0.10)",
                    border: "1px solid rgba(20,184,166,0.25)",
                    borderRadius: 999,
                    padding: "4px 10px",
                  }}
                >
                  {a.badge}
                </span>
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 22,
                    lineHeight: 1.2,
                    letterSpacing: "-0.018em",
                    color: "var(--ink)",
                    margin: "0 0 6px",
                  }}
                >
                  {a.name}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--ink-3)",
                    margin: 0,
                  }}
                >
                  {a.subtitle}
                </p>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: "var(--ink-2)",
                  margin: 0,
                  flex: 1,
                }}
              >
                {a.desc}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  paddingTop: 16,
                  borderTop: "1px solid var(--line)",
                }}
              >
                {a.stats.map(s => (
                  <div key={s.l}>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: 24,
                        lineHeight: 1,
                        letterSpacing: "-0.025em",
                        color: "var(--teal-600)",
                      }}
                    >
                      {s.v}
                    </div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 12, color: "var(--ink-3)", marginTop: 3 }}>
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Roadmap tile */}
        <div
          style={{
            marginTop: 24,
            border: "1.5px dashed var(--line)",
            borderRadius: 20,
            padding: "28px 32px",
            display: "flex",
            alignItems: "center",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--ink-3)",
              background: "var(--surface-2)",
              border: "1px solid var(--line)",
              borderRadius: 999,
              padding: "5px 11px",
              flexShrink: 0,
            }}
          >
            Próximamente · 2026
          </span>
          <div>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 16,
                color: "var(--ink)",
                margin: "0 0 4px",
              }}
            >
              Agentes físicos e IA incorporada
            </p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 14, color: "var(--ink-3)", margin: 0 }}>
              Para manufactura, instalación en campo y operaciones de almacén.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works ──────────────────────────────────────────────────────────── */

function EsHowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Auditoría de operaciones",
      desc: "Mapeamos tus flujos actuales — llamadas, prospectos, cierres — e identificamos los tres puntos de mayor impacto para tu negocio.",
    },
    {
      n: "02",
      title: "Diseño del sistema",
      desc: "Configuramos los agentes con tus guiones, tu CRM, tu calendario y tus flujos de aprobación. Nada genérico, todo a tu medida.",
    },
    {
      n: "03",
      title: "Piloto supervisado",
      desc: "Los agentes trabajan en vivo con supervisión humana. Calibramos en tiempo real mientras aprendemos tu operación.",
    },
    {
      n: "04",
      title: "Operación continua",
      desc: "Monitoreo activo, actualizaciones del modelo y un consultor senior disponible cuando lo necesitas.",
    },
  ];

  return (
    <section
      id="como-funciona"
      style={{ padding: "100px 0 120px", background: "#fff", borderTop: "1px solid var(--line)" }}
    >
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-20 lg:items-start">
          <div style={{ position: "sticky", top: 100 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "var(--font-mono)",
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--teal-700)",
              }}
            >
              <span style={{ width: 18, height: 1, background: "currentColor", opacity: 0.7, display: "inline-block" }} />
              El proceso
            </span>
            <h2
              className="mt-4 text-[32px] leading-[1.1] font-semibold tracking-[-0.026em] sm:text-[42px]"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink)", margin: "16px 0 20px" }}
            >
              En producción{" "}
              <span
                className="bg-gradient-to-br from-navy-600 via-teal-500 to-teal-400 bg-clip-text font-normal italic"
                style={{ WebkitTextFillColor: "transparent", paddingRight: "0.1em" }}
              >
                en 14 días.
              </span>
            </h2>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)", margin: 0 }}>
              Un proceso probado para pasar de la primera llamada a un agente trabajando
              en tu operación real — en dos semanas.
            </p>
            <a
              href="/book"
              style={{
                display: "inline-flex",
                alignItems: "center",
                marginTop: 28,
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: 14,
                padding: "12px 20px",
                borderRadius: 10,
                background: "var(--navy-600)",
                color: "#fff",
                textDecoration: "none",
              }}
            >
              Reserva una demo →
            </a>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {steps.map((step, i) => (
              <div
                key={step.n}
                style={{
                  display: "flex",
                  gap: 24,
                  paddingBottom: i < steps.length - 1 ? 40 : 0,
                  position: "relative",
                }}
              >
                {i < steps.length - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      left: 19,
                      top: 40,
                      bottom: 0,
                      width: 1,
                      background: "var(--line)",
                    }}
                  />
                )}
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: "var(--surface-2)",
                    border: "1px solid var(--line)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontFamily: "var(--font-mono)",
                    fontWeight: 500,
                    fontSize: 12,
                    color: "var(--teal-700)",
                    letterSpacing: "0.04em",
                    zIndex: 1,
                  }}
                >
                  {step.n}
                </div>
                <div style={{ paddingTop: 8 }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: 18,
                      lineHeight: 1.3,
                      letterSpacing: "-0.014em",
                      color: "var(--ink)",
                      margin: "0 0 10px",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: 15, lineHeight: 1.65, color: "var(--ink-2)", margin: 0 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Why ───────────────────────────────────────────────────────────────────── */

function EsWhy() {
  const features = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      title: "Consultores, no un help desk",
      desc: "Trabajas directamente con operadores senior que han construido sistemas de ingresos reales — no con un equipo de soporte rotativo.",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>
        </svg>
      ),
      title: "Bilingüe por defecto",
      desc: "Inglés y español nativos. Cambio de idioma en medio de una llamada sin fricción ni demoras — desde el primer día.",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>
        </svg>
      ),
      title: "Cumplimiento desde el día uno",
      desc: "Privacidad y seguridad de datos incorporadas desde el inicio — alineadas con PIPEDA y las mejores prácticas de la industria.",
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"/>
          <path d="M12 8v4M12 16h.01"/>
        </svg>
      ),
      title: "Humano en el ciclo",
      desc: "Escalamiento a un operador real cuando el agente lo necesita. Siempre disponible, siempre en control — tu equipo nunca queda fuera del circuito.",
    },
  ];

  return (
    <section
      style={{
        background: "var(--surface-2)",
        padding: "100px 0 120px",
        borderTop: "1px solid var(--line)",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <div style={{ maxWidth: 560, marginBottom: 64 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "var(--font-mono)",
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--teal-700)",
            }}
          >
            <span style={{ width: 18, height: 1, background: "currentColor", opacity: 0.7, display: "inline-block" }} />
            Por qué Orchelix
          </span>
          <h2
            className="mt-4 text-[32px] leading-[1.1] font-semibold tracking-[-0.026em] sm:text-[42px]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)", margin: "16px 0 16px" }}
          >
            Sin tickets de soporte.{" "}
            <span
              className="bg-gradient-to-br from-navy-600 via-teal-500 to-teal-400 bg-clip-text font-normal italic"
              style={{ WebkitTextFillColor: "transparent", paddingRight: "0.1em" }}
            >
              Sin modelos genéricos.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon, title, desc }) => (
            <div
              key={title}
              style={{
                background: "#fff",
                border: "1px solid var(--line)",
                borderRadius: 18,
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                boxShadow: "0 1px 4px rgba(10,37,64,0.04)",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "linear-gradient(135deg, rgba(20,184,166,0.10) 0%, rgba(20,184,166,0.04) 100%)",
                  border: "1px solid rgba(20,184,166,0.18)",
                  color: "var(--teal-700)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {icon}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 16,
                  lineHeight: 1.3,
                  letterSpacing: "-0.012em",
                  color: "var(--ink)",
                  margin: 0,
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 14,
                  lineHeight: 1.65,
                  color: "var(--ink-2)",
                  margin: 0,
                }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Esmi Demo ─────────────────────────────────────────────────────────────── */

function EsEsmiSection() {
  return (
    <section
      id="demo"
      style={{ background: "#fff", padding: "100px 0 120px", borderTop: "1px solid var(--line)" }}
    >
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "var(--font-mono)",
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--navy-500)",
            }}
          >
            <span style={{ width: 18, height: 1, background: "currentColor", opacity: 0.7, display: "inline-block" }} />
            Demo en vivo
          </span>
          <h2
            className="mt-4 text-[32px] leading-[1.1] font-semibold tracking-[-0.026em] sm:text-[40px]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            Habla con Esmi — ahora mismo.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 17,
              lineHeight: 1.6,
              color: "var(--ink-2)",
              maxWidth: 540,
              margin: "12px auto 0",
            }}
          >
            Esta es la versión en vivo de Esmi. Escríbele en español para comenzar —
            o reserva una sesión para escucharla en tu línea.
          </p>
        </div>

        <div
          style={{
            borderRadius: 20,
            overflow: "hidden",
            border: "1px solid var(--line)",
            boxShadow:
              "0 1px 0 rgba(255,255,255,0.8) inset, 0 24px 64px -16px rgba(10,37,64,0.16), 0 6px 16px -4px rgba(10,37,64,0.08)",
          }}
        >
          {/* Chrome bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 20px",
              background: "#F4F6F9",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <div style={{ display: "flex", gap: 6 }}>
              {["#FF5F57", "#FFBD2E", "#28CA41"].map((c, i) => (
                <span
                  key={i}
                  style={{ width: 12, height: 12, borderRadius: "50%", background: c, display: "block" }}
                />
              ))}
            </div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--ink-3)",
                flex: 1,
                textAlign: "center",
              }}
            >
              esmi · <b style={{ color: "var(--ink-2)" }}>demo en vivo</b>
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.08em",
                color: "#22C55E",
                background: "rgba(34,197,94,0.10)",
                border: "1px solid rgba(34,197,94,0.20)",
                borderRadius: 999,
                padding: "4px 10px",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <span
                style={{ width: 5, height: 5, borderRadius: "50%", background: "#22C55E", display: "inline-block" }}
              />
              En vivo · EN · ES
            </span>
          </div>

          <div style={{ height: "clamp(480px, 65vh, 680px)" }}>
            <EsmiChat defaultLocale="es" />
          </div>
        </div>

        <p
          style={{
            textAlign: "center",
            fontFamily: "var(--font-display)",
            fontSize: 13.5,
            color: "var(--ink-3)",
            lineHeight: 1.6,
            marginTop: 20,
          }}
        >
          Este es el runtime en vivo de Esmi. Escribe para comenzar — o{" "}
          <a href="/book" style={{ color: "var(--teal-700)", textDecoration: "underline" }}>
            reserva una sesión personalizada
          </a>{" "}
          para escucharla en tu línea.
        </p>
      </div>
    </section>
  );
}

/* ─── Final CTA ─────────────────────────────────────────────────────────────── */

function EsFinalCTA() {
  return (
    <section style={{ padding: "80px 0 100px", background: "var(--surface-2)", borderTop: "1px solid var(--line)" }}>
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <div
          style={{
            borderRadius: 24,
            background: "linear-gradient(135deg, #06122A 0%, #0A2540 60%, #0D2E50 100%)",
            padding: "64px 56px",
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "radial-gradient(circle, rgba(94,234,212,0.05) 1px, transparent 1px)",
              backgroundSize: "36px 36px",
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: -100,
              left: "50%",
              transform: "translateX(-50%)",
              width: 600,
              height: 400,
              borderRadius: "50%",
              background: "radial-gradient(ellipse at center, rgba(20,184,166,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", maxWidth: 640, margin: "0 auto" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--teal-400)",
                marginBottom: 20,
              }}
            >
              <span style={{ width: 14, height: 1, background: "currentColor", opacity: 0.8, display: "inline-block" }} />
              ¿Listo para comenzar?
              <span style={{ width: 14, height: 1, background: "currentColor", opacity: 0.8, display: "inline-block" }} />
            </span>
            <h2
              className="text-[28px] leading-[1.1] font-semibold tracking-[-0.024em] sm:text-[38px]"
              style={{ fontFamily: "var(--font-display)", color: "#fff", margin: "0 0 20px" }}
            >
              Tu primer agente en producción en 14 días.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 17,
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.60)",
                margin: "0 0 36px",
              }}
            >
              Treinta minutos con un consultor senior. Analizamos tu operación, identificamos
              los puntos de mayor impacto y te enviamos una propuesta concreta al terminar.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              <a
                href="/book"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 15,
                  padding: "16px 32px",
                  borderRadius: 12,
                  background: "#fff",
                  color: "#06122A",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                Reserva una demo →
              </a>
              <a
                href="/es#demo"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: 15,
                  padding: "16px 32px",
                  borderRadius: 12,
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.20)",
                  color: "rgba(255,255,255,0.80)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                Prueba Esmi
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
