"use client";
import { useState } from "react";

const USE_CASES = [
  "Virtual Receptionist & Call Automation",
  "Revenue-Ops & Lead Qualification",
  "Accounting & Finance OS",
  "Multiple Agents / Full Stack",
  "General Inquiry",
];

const USE_CASES_ES = [
  "Recepcionista Virtual y Automatización de Llamadas",
  "Operaciones de Ventas y Calificación de Prospectos",
  "Contabilidad y Finanzas OS",
  "Múltiples Agentes / Suite Completa",
  "Consulta General",
];

const T = {
  en: {
    eyebrow: "Get in touch",
    h2: "Ready to see what an agent can do for your business?",
    body: "Tell us about your operation and we'll reach out within one business day to discuss next steps.",
    chips: ["14-day pilot", "No long contracts", "Senior consultant included"],
    labelName: "Name *", labelCompany: "Company", labelEmail: "Work email *",
    labelPhone: "Phone", labelUseCase: "What can we help with? *", labelMessage: "Message (optional)",
    phName: "Alex Chen", phCompany: "Acme Inc.", phEmail: "alex@acme.com",
    phPhone: "+1 (561) 555-0100", phMessage: "Tell us about your volume, challenges, or questions…",
    useCaseDefault: "Select a use case…",
    useCases: USE_CASES,
    submit: "Send message →", sending: "Sending…",
    error: "Something went wrong — please email us at info@orchelix.com",
    tyTitle: "Message received!",
    tyBody: "We'll be in touch within one business day. In the meantime, feel free to try Esmi or book a demo directly.",
    tyCta1: "Try Esmi", tyCta2: "Book a demo",
    tyCta1Href: "/try-esmi", tyCta2Href: "/book",
  },
  es: {
    eyebrow: "Contáctanos",
    h2: "¿Listo para ver lo que un agente puede hacer por tu negocio?",
    body: "Cuéntanos sobre tu operación y te contactamos en menos de un día hábil para hablar sobre los próximos pasos.",
    chips: ["Piloto de 14 días", "Sin contratos largos", "Consultor senior incluido"],
    labelName: "Nombre *", labelCompany: "Empresa", labelEmail: "Correo electrónico *",
    labelPhone: "Teléfono", labelUseCase: "¿En qué podemos ayudarte? *", labelMessage: "Mensaje (opcional)",
    phName: "Carlos Ramírez", phCompany: "Mi Empresa S.A.", phEmail: "carlos@empresa.com",
    phPhone: "+1 (561) 566-1066", phMessage: "Cuéntanos sobre tu volumen de llamadas, tus desafíos o tus preguntas…",
    useCaseDefault: "Selecciona un caso de uso…",
    useCases: USE_CASES_ES,
    submit: "Enviar mensaje →", sending: "Enviando…",
    error: "Algo salió mal — escríbenos directamente a info@orchelix.com",
    tyTitle: "¡Mensaje recibido!",
    tyBody: "Te contactamos en menos de un día hábil. Mientras tanto, puedes probar Esmi o reservar una demo.",
    tyCta1: "Probar Esmi", tyCta2: "Reservar demo",
    tyCta1Href: "/es#demo", tyCta2Href: "/book",
  },
} as const;

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-display)",
  fontWeight: 500,
  fontSize: 13,
  lineHeight: 1,
  color: "var(--ink-2)",
  marginBottom: 8,
};

const inputStyle: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: 15,
  lineHeight: 1.4,
  color: "var(--ink)",
  background: "#fff",
  border: "1px solid var(--line)",
  borderRadius: 10,
  padding: "12px 14px",
  width: "100%",
  boxSizing: "border-box",
};

const sectionH2: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontWeight: 600,
  fontSize: 38,
  lineHeight: 1.1,
  letterSpacing: "-0.026em",
  color: "var(--ink)",
  margin: 0,
};

const sectionP: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontWeight: 400,
  fontSize: 17,
  lineHeight: 1.6,
  color: "var(--ink-2)",
  margin: 0,
  maxWidth: 480,
};

function Field({
  label, id, name, type = "text", required, placeholder,
}: {
  label: string; id: string; name: string; type?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} style={labelStyle}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="contact-input"
        style={inputStyle}
      />
    </div>
  );
}

function SelectField({
  label, id, name, required, children,
}: {
  label: string; id: string; name: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} style={labelStyle}>{label}</label>
      <select
        id={id}
        name={name}
        required={required}
        className="contact-input"
        style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
      >
        {children}
      </select>
    </div>
  );
}

function ThankYou({ t }: { t: typeof T[keyof typeof T] }) {
  return (
    <div
      style={{
        padding: "48px 32px",
        border: "1px solid var(--teal-100)",
        borderRadius: 18,
        background: "var(--teal-50)",
        textAlign: "center",
        display: "grid",
        gap: 16,
        justifyItems: "center",
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: "#fff",
          border: "1px solid var(--teal-200)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px -4px rgba(20,184,166,0.20)",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--teal-600)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5"/>
        </svg>
      </div>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: 22,
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
          color: "var(--ink)",
          margin: 0,
        }}
      >
        {t.tyTitle}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          fontSize: 15,
          lineHeight: 1.65,
          color: "var(--ink-2)",
          margin: 0,
          maxWidth: 360,
        }}
      >
        {t.tyBody}
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 8 }}>
        <a
          href={t.tyCta1Href}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: 14,
            padding: "11px 20px",
            borderRadius: 10,
            border: "1px solid var(--teal-200)",
            background: "#fff",
            color: "var(--teal-700)",
            textDecoration: "none",
          }}
        >
          {t.tyCta1}
        </a>
        <a
          href={t.tyCta2Href}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: 14,
            padding: "11px 20px",
            borderRadius: 10,
            border: "1px solid transparent",
            background: "var(--navy-600)",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          {t.tyCta2}
        </a>
      </div>
    </div>
  );
}

export default function ContactForm({ locale = "en" }: { locale?: "en" | "es" }) {
  const t = T[locale];
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setErr("");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!r.ok) throw new Error();
      setSent(true);
    } catch {
      setErr(t.error);
    } finally {
      setSending(false);
    }
  }

  return (
    <section
      id="contact"
      className="py-20 sm:py-24 lg:py-32"
      style={{ borderTop: "1px solid var(--line)", background: "var(--surface-2)" }}
    >
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left */}
          <div style={{ display: "grid", gap: 18, alignContent: "start" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "var(--font-mono)",
                fontWeight: 500,
                fontSize: 11,
                lineHeight: 1,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--navy-500)",
              }}
            >
              <span style={{ width: 18, height: 1, background: "currentColor", opacity: 0.7, display: "inline-block" }} />
              {t.eyebrow}
            </span>
            <h2 style={sectionH2}>{t.h2}</h2>
            <p style={sectionP}>{t.body}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
              {t.chips.map(chip => (
                <span
                  key={chip}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 500,
                    fontSize: 11,
                    lineHeight: 1,
                    letterSpacing: "0.08em",
                    padding: "7px 13px",
                    borderRadius: 999,
                    border: "1px solid var(--line)",
                    color: "var(--ink-2)",
                    background: "#fff",
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div>
            {sent ? (
              <ThankYou t={t} />
            ) : (
              <form
                onSubmit={onSubmit}
                style={{
                  display: "grid",
                  gap: 14,
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: 18,
                  padding: "36px 32px",
                  boxShadow: "0 1px 0 rgba(10,37,64,0.02)",
                }}
                noValidate
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <Field label={t.labelName} id="cf-name" name="name" required placeholder={t.phName} />
                  <Field label={t.labelCompany} id="cf-company" name="company" placeholder={t.phCompany} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <Field label={t.labelEmail} id="cf-email" name="email" type="email" required placeholder={t.phEmail} />
                  <Field label={t.labelPhone} id="cf-phone" name="phone" type="tel" placeholder={t.phPhone} />
                </div>
                <SelectField label={t.labelUseCase} id="cf-useCase" name="useCase" required>
                  <option value="">{t.useCaseDefault}</option>
                  {t.useCases.map(u => <option key={u} value={u}>{u}</option>)}
                </SelectField>
                <div>
                  <label htmlFor="cf-message" style={labelStyle}>{t.labelMessage}</label>
                  <textarea
                    id="cf-message"
                    name="message"
                    rows={4}
                    placeholder={t.phMessage}
                    className="contact-input"
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>
                {err && (
                  <p role="alert" style={{ fontFamily: "var(--font-display)", fontSize: 14, color: "#c0392b", margin: 0 }}>
                    {err}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={sending}
                  style={{
                    marginTop: 4,
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: 15,
                    lineHeight: 1,
                    padding: "16px 28px",
                    borderRadius: 12,
                    border: "1px solid transparent",
                    background: sending ? "var(--ink-3)" : "var(--navy-600)",
                    color: "#fff",
                    cursor: sending ? "default" : "pointer",
                    transition: "background 200ms",
                    width: "100%",
                  }}
                >
                  {sending ? t.sending : t.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
