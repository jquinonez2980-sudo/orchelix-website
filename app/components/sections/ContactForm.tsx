"use client";
import { useState } from "react";

const USE_CASES = [
  "Virtual Receptionist & Call Automation",
  "Revenue-Ops & Lead Qualification",
  "Accounting & Finance OS",
  "Multiple Agents / Full Stack",
  "General Inquiry",
];

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

function ThankYou() {
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
        Message received!
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
        We&apos;ll be in touch within one business day. In the meantime, feel free to try Esmi or book a demo directly.
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 8 }}>
        <a
          href="/try-esmi"
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
          Try Esmi
        </a>
        <a
          href="/book"
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
          Book a demo
        </a>
      </div>
    </div>
  );
}

export default function ContactForm() {
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
      setErr("Something went wrong — please email us at info@orchelix.com");
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
              Get in touch
            </span>
            <h2 style={sectionH2}>Ready to see what an agent can do for your business?</h2>
            <p style={sectionP}>
              Tell us about your operation and we&apos;ll reach out within one business day to discuss next steps.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
              {["14-day pilot", "No long contracts", "Senior consultant included"].map(chip => (
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
              <ThankYou />
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
                  <Field label="Name *" id="cf-name" name="name" required placeholder="Alex Chen" />
                  <Field label="Company" id="cf-company" name="company" placeholder="Acme Inc." />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <Field label="Work email *" id="cf-email" name="email" type="email" required placeholder="alex@acme.com" />
                  <Field label="Phone" id="cf-phone" name="phone" type="tel" placeholder="+1 (416) 555-0100" />
                </div>
                <SelectField label="What can we help with? *" id="cf-useCase" name="useCase" required>
                  <option value="">Select a use case…</option>
                  {USE_CASES.map(u => <option key={u} value={u}>{u}</option>)}
                </SelectField>
                <div>
                  <label htmlFor="cf-message" style={labelStyle}>Message (optional)</label>
                  <textarea
                    id="cf-message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your volume, challenges, or questions…"
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
                  {sending ? "Sending…" : "Send message →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
