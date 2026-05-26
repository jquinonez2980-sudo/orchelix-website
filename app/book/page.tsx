"use client";

import { useState } from "react";
import Nav from "../components/sections/Nav";
import Footer from "../components/sections/Footer";

/* ── promise list items ─────────────────────────────── */
const PROMISES = [
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>
      </svg>
    ),
    text: <><strong>30 minutes</strong> — your time is worth more to us than a long discovery call.</>,
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/>
      </svg>
    ),
    text: <><strong>You&apos;ll talk to a senior operator</strong> — not a tier-one rep. Same person who&apos;d own your deployment.</>,
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 12 2 2 4-4"/><circle cx="12" cy="12" r="9"/>
      </svg>
    ),
    text: <><strong>You&apos;ll leave with a one-page proposal</strong> — the workflow, the scorecard, the timeline. Decide on your own time.</>,
  },
  {
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>
      </svg>
    ),
    text: <><strong>EN · ES · FR</strong> — schedule with a bilingual consultant if you prefer.</>,
  },
];

/* ── what to expect cards ───────────────────────────── */
const EXPECT = [
  {
    when: "Minutes 0 – 5",
    h: "Your workflow, in your words.",
    p: "A senior consultant asks about the one workflow that costs you the most time or revenue right now. That's the whole intake.",
  },
  {
    when: "Minutes 5 – 20",
    h: "A live agent, on a real call.",
    p: "We dial in a sample inbound call, lead, or ledger to a production Orchelix agent — so you see the audit trail, not just a polished demo video.",
  },
  {
    when: "Minutes 20 – 28",
    h: "A specific recommendation.",
    p: "Your consultant proposes one workflow to pilot, a 14-day timeline, and the scorecard we'd both grade success against. Tailored to your business, not a template.",
  },
  {
    when: "After the call",
    h: "A one-page proposal — no hard sell.",
    p: "We email a single page: scope, timeline, scorecard, and price. Decide on your own time. If it's not the right fit, we'll say so first.",
  },
];

/* ── testimonials ───────────────────────────────────── */
const TESTIMONIALS = [
  {
    stat: "412",
    quote: "The receptionist agent picked up 412 calls in its first month — bilingually, on weekends, and without missing a single appointment. It paid for itself before the pilot ended.",
    initials: "MS",
    name: "Marisol Santiago",
    role: "Office manager · Riverstone Clinic",
  },
  {
    stat: "3.4×",
    quote: "Nuestro cierre mensual pasó de dos semanas a tres días — y por primera vez en cinco años, dormimos durante el fin de mes.",
    quoteEn: "\"Our month-end close went from two weeks to three days — and for the first time in five years, we slept through the close.\"",
    initials: "JC",
    name: "Javier Cárdenas",
    role: "Controller · Northstar Accounting",
  },
];

const LOGOS = ["NORTHSTAR Accounting", "Riverstone Clinic", "Bloom & Co.", "Maplewood HVAC", "Iglesia Pueblo"];
const COMPLIANCE = ["PIPEDA-aligned", "SOC 2 in-progress", "EN · ES · FR", "Canadian data residency"];

/* ── page ───────────────────────────────────────────── */
export default function BookPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity();
      return;
    }
    setSubmitted(true);
  }

  return (
    <>
      <Nav />
      <main id="top">
        <DemoHero submitted={submitted} onSubmit={handleSubmit} />
        <ExpectSection />
        <ProofBand />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

/* ── hero + form ────────────────────────────────────── */
function DemoHero({
  submitted,
  onSubmit,
}: {
  submitted: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <section
      style={{
        padding: "80px 0 100px",
        background: "linear-gradient(180deg, var(--surface-2) 0%, #fff 100%)",
      }}
    >
      <div
        style={{ maxWidth: 1200, margin: "0 auto" }}
        className="px-6 sm:px-8 lg:px-10"
      >
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left: copy */}
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <Eyebrow>Book a demo</Eyebrow>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(34px, 5vw, 52px)",
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
                color: "var(--ink)",
                margin: 0,
              }}
            >
              See how Orchelix would work{" "}
              <span style={{ color: "var(--teal-600)" }}>for your business</span>.
            </h1>

            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: 18,
                lineHeight: 1.6,
                color: "var(--ink-2)",
                margin: 0,
                maxWidth: 520,
              }}
            >
              A 30-minute call with a senior consultant — not a sales engineer and not a deck.
              We&apos;ll watch a live agent handle a real workflow, then talk through the one
              we&apos;d pilot for you.
            </p>

            {/* Promise list */}
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 16 }}>
              {PROMISES.map((p, i) => (
                <li key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span
                    style={{
                      flexShrink: 0,
                      marginTop: 3,
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "var(--teal-50)",
                      border: "1px solid var(--teal-100)",
                      color: "var(--teal-600)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {p.icon}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 15,
                      lineHeight: 1.55,
                      color: "var(--ink-2)",
                    }}
                  >
                    {p.text}
                  </span>
                </li>
              ))}
            </ul>

            {/* Consultant card */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginTop: 8,
                padding: "16px 20px",
                borderRadius: 14,
                background: "#fff",
                border: "1px solid var(--line)",
                boxShadow: "0 1px 0 rgba(255,255,255,0.8) inset, 0 2px 8px -2px rgba(10,37,64,0.06)",
                maxWidth: 420,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--navy-600) 0%, var(--teal-500) 100%)",
                  color: "#fff",
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 15,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  letterSpacing: "0.02em",
                }}
              >
                DR
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 14,
                    color: "var(--ink)",
                    lineHeight: 1.2,
                  }}
                >
                  Daniela Reyes
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 12.5,
                    color: "var(--ink-3)",
                    lineHeight: 1.3,
                  }}
                >
                  Senior consultant · West Palm Beach, FL · responds within 4h
                </span>
              </div>
            </div>
          </div>

          {/* Right: form card */}
          <div>
            <FormCard submitted={submitted} onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── form card ──────────────────────────────────────── */
function FormCard({
  submitted,
  onSubmit,
}: {
  submitted: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const cardStyle: React.CSSProperties = {
    background: "#fff",
    border: "1px solid var(--line)",
    borderRadius: 20,
    boxShadow: "0 1px 0 rgba(255,255,255,0.8) inset, 0 8px 40px -8px rgba(10,37,64,0.12), 0 2px 8px -2px rgba(10,37,64,0.06)",
    overflow: "hidden",
  };

  if (submitted) {
    return (
      <div id="form" style={{ ...cardStyle, padding: "60px 40px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "var(--teal-50)",
            border: "1px solid var(--teal-100)",
            color: "var(--teal-600)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l5 5 9-11"/>
          </svg>
        </div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 24,
            color: "var(--ink)",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          Got it — we&apos;ll be in touch.
        </h3>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 15,
            lineHeight: 1.6,
            color: "var(--ink-2)",
            margin: 0,
            maxWidth: 360,
          }}
        >
          A senior consultant will reply within one business day with two or three times that match your preference.
          Watch for an email from <strong>info@orchelix.com</strong>.
        </p>
      </div>
    );
  }

  return (
    <form id="form" noValidate onSubmit={onSubmit} style={cardStyle}>
      {/* Header */}
      <div
        style={{
          padding: "24px 32px",
          borderBottom: "1px solid var(--line)",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 17,
              color: "var(--ink)",
              lineHeight: 1.25,
            }}
          >
            Tell us about your business
          </span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 13,
              color: "var(--ink-3)",
              lineHeight: 1.4,
            }}
          >
            We&apos;ll come back within one business day to schedule.
          </span>
        </div>
        <span
          style={{
            flexShrink: 0,
            fontFamily: "var(--font-mono)",
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--teal-700)",
            background: "var(--teal-50)",
            border: "1px solid var(--teal-100)",
            borderRadius: 999,
            padding: "7px 13px",
            whiteSpace: "nowrap",
          }}
        >
          30 min · no obligation
        </span>
      </div>

      {/* Fields */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2"
        style={{ padding: "28px 32px", gap: 20 }}
      >
        <Field label="Full name" htmlFor="f-name">
          <input
            id="f-name"
            name="name"
            type="text"
            placeholder="Carolina Mendez"
            required
            autoComplete="name"
            style={inputStyle}
          />
        </Field>

        <Field label="Work email" htmlFor="f-email">
          <input
            id="f-email"
            name="email"
            type="email"
            placeholder="carolina@yourcompany.com"
            required
            autoComplete="email"
            style={inputStyle}
          />
        </Field>

        <Field label="Company" htmlFor="f-company">
          <input
            id="f-company"
            name="company"
            type="text"
            placeholder="Riverstone Clinic"
            required
            autoComplete="organization"
            style={inputStyle}
          />
        </Field>

        <Field
          label={<>Phone <span style={{ fontWeight: 400, color: "var(--ink-3)", fontSize: 12 }}>Optional</span></>}
          htmlFor="f-phone"
        >
          <input
            id="f-phone"
            name="phone"
            type="tel"
            placeholder="+1 (416) 555-0148"
            autoComplete="tel"
            style={inputStyle}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Industry" htmlFor="f-industry">
            <select id="f-industry" name="industry" style={{ ...inputStyle, cursor: "pointer" }}>
              <option value="">Select your industry…</option>
              <option>Professional services (legal, accounting, consulting)</option>
              <option>Healthcare &amp; dental</option>
              <option>Home services &amp; HVAC</option>
              <option>Faith &amp; non-profit</option>
              <option>Retail &amp; e-commerce</option>
              <option>Real estate &amp; property</option>
              <option>Other</option>
            </select>
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="What are you looking to automate?" htmlFor="f-workflow">
            <textarea
              id="f-workflow"
              name="workflow"
              placeholder="A few sentences about the workflow you'd like an agent to run — e.g. 'we miss 30% of after-hours calls', or 'month-end close takes two weeks'."
              required
              rows={4}
              style={{ ...inputStyle, resize: "vertical", minHeight: 100 }}
            />
            <span
              style={{
                display: "block",
                marginTop: 6,
                fontFamily: "var(--font-display)",
                fontSize: 12,
                color: "var(--ink-3)",
                lineHeight: 1.4,
              }}
            >
              No need to be polished — your senior consultant reads this before the call.
            </span>
          </Field>
        </div>

        <div className="sm:col-span-2">
          <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
            <legend
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: 13.5,
                color: "var(--ink)",
                marginBottom: 10,
                display: "block",
              }}
            >
              Preferred demo time
            </legend>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {[
                { id: "t1", value: "this-week", label: "This week" },
                { id: "t2", value: "next-week", label: "Next week", defaultChecked: true },
                { id: "t3", value: "two-weeks", label: "In 2 weeks" },
                { id: "t4", value: "flexible", label: "Flexible — propose a time" },
              ].map(opt => (
                <label
                  key={opt.id}
                  htmlFor={opt.id}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    fontFamily: "var(--font-display)",
                    fontSize: 13.5,
                    color: "var(--ink-2)",
                    cursor: "pointer",
                    padding: "9px 14px",
                    borderRadius: 9,
                    border: "1px solid var(--line)",
                    background: "#fff",
                    userSelect: "none",
                  }}
                >
                  <input
                    id={opt.id}
                    type="radio"
                    name="time"
                    value={opt.value}
                    defaultChecked={opt.defaultChecked}
                    style={{ accentColor: "var(--navy-600)" }}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </div>

      {/* Submit */}
      <div
        style={{
          padding: "0 32px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <button
          type="submit"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 15,
            padding: "16px 28px",
            borderRadius: 12,
            background: "var(--navy-600)",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            alignSelf: "flex-start",
            boxShadow: "0 1px 0 rgba(255,255,255,0.08) inset, 0 4px 12px -2px rgba(10,37,64,0.22)",
            transition: "background 200ms",
          }}
        >
          Book the call →
        </button>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 12.5,
            color: "var(--ink-3)",
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          We&apos;ll only use your details to schedule and prepare. No marketing list, no resale —
          see our <a href="#privacy" style={{ color: "var(--teal-700)", textDecoration: "underline" }}>privacy policy</a>.
        </p>
      </div>
    </form>
  );
}

/* ── field wrapper ──────────────────────────────────── */
function Field({
  label,
  htmlFor,
  children,
}: {
  label: React.ReactNode;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label
        htmlFor={htmlFor}
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: 13.5,
          color: "var(--ink)",
          lineHeight: 1.2,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: 14,
  color: "var(--ink)",
  background: "var(--surface-2)",
  border: "1px solid var(--line-strong)",
  borderRadius: 9,
  padding: "11px 14px",
  width: "100%",
  outline: "none",
  lineHeight: 1.4,
  boxSizing: "border-box",
};

/* ── expect section ─────────────────────────────────── */
function ExpectSection() {
  return (
    <section style={{ padding: "100px 0", background: "#fff" }}>
      <div
        style={{ maxWidth: 1200, margin: "0 auto" }}
        className="px-6 sm:px-8 lg:px-10"
      >
        <div style={{ maxWidth: 640, marginBottom: 64 }}>
          <Eyebrow navy>What to expect</Eyebrow>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(28px, 4vw, 42px)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "var(--ink)",
              margin: "16px 0 16px",
            }}
          >
            What actually happens in the call.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 17,
              lineHeight: 1.6,
              color: "var(--ink-2)",
              margin: 0,
            }}
          >
            No deck, no slides, no twenty-minute company introduction. Four things, in order — then your time back.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 20 }}>
          {EXPECT.map((card, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                border: "1px solid var(--line)",
                borderRadius: 16,
                padding: "28px 26px 30px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 24,
                  right: 24,
                  top: 0,
                  height: 2,
                  background: "linear-gradient(90deg, var(--navy-600), var(--teal-500))",
                  borderRadius: "0 0 4px 4px",
                }}
              />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    fontSize: 26,
                    color: "var(--navy-100)",
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    color: "var(--teal-700)",
                    background: "var(--teal-50)",
                    border: "1px solid var(--teal-100)",
                    borderRadius: 999,
                    padding: "5px 10px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {card.when}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 17,
                  lineHeight: 1.3,
                  letterSpacing: "-0.012em",
                  color: "var(--ink)",
                  margin: 0,
                }}
              >
                {card.h}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "var(--ink-2)",
                  margin: 0,
                }}
              >
                {card.p}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── proof band ─────────────────────────────────────── */
function ProofBand() {
  return (
    <section
      style={{
        padding: "80px 0",
        background: "linear-gradient(180deg, var(--navy-700, #0B1220) 0%, var(--navy-800, #060D18) 100%)",
        color: "#fff",
      }}
    >
      <div
        style={{ maxWidth: 1200, margin: "0 auto" }}
        className="px-6 sm:px-8 lg:px-10"
      >
        {/* Testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 32, marginBottom: 64 }}>
          {TESTIMONIALS.map((t, i) => (
            <article
              key={i}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 18,
                padding: "36px 32px",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 52,
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  background: "linear-gradient(135deg, #fff 0%, var(--teal-400, #2DD4BF) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {t.stat}
              </span>
              <blockquote
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 16,
                  lineHeight: 1.65,
                  color: "rgba(255,255,255,0.78)",
                  margin: 0,
                  padding: 0,
                  border: "none",
                  fontStyle: "normal",
                }}
              >
                {t.quote}
                {t.quoteEn && (
                  <span
                    style={{
                      display: "block",
                      marginTop: 10,
                      fontSize: 14,
                      color: "rgba(255,255,255,0.45)",
                      fontStyle: "italic",
                    }}
                  >
                    {t.quoteEn}
                  </span>
                )}
              </blockquote>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.10)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    color: "rgba(255,255,255,0.80)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: 13,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {t.initials}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14, color: "#fff" }}>
                    {t.name}
                  </span>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 12.5, color: "rgba(255,255,255,0.45)" }}>
                    {t.role}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Logos */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "10px 28px",
            paddingBottom: 32,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            marginBottom: 28,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            Trusted by operators
          </span>
          {LOGOS.map(logo => (
            <span
              key={logo}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 13,
                color: "rgba(255,255,255,0.40)",
                letterSpacing: "0.04em",
              }}
            >
              {logo}
            </span>
          ))}
        </div>

        {/* Compliance */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px" }}>
          {COMPLIANCE.map(item => (
            <span
              key={item}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.40)",
                textTransform: "uppercase",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── final cta ──────────────────────────────────────── */
function FinalCTA() {
  return (
    <section style={{ padding: "80px 0" }}>
      <div
        style={{ maxWidth: 1200, margin: "0 auto" }}
        className="px-6 sm:px-8 lg:px-10"
      >
        <div
          style={{
            borderRadius: 20,
            background: "linear-gradient(135deg, var(--navy-700, #0B1220) 0%, #0D1B30 100%)",
            padding: "48px 48px",
            display: "flex",
            flexDirection: "column",
            gap: 32,
            position: "relative",
            overflow: "hidden",
          }}
          className="lg:flex-row lg:items-center lg:justify-between"
        >
          {/* Subtle background mark */}
          <div
            style={{
              position: "absolute",
              right: -60,
              top: -60,
              width: 260,
              height: 260,
              backgroundImage: "url('/orchelix-mark.png')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              opacity: 0.04,
              pointerEvents: "none",
            }}
          />
          <div style={{ position: "relative", maxWidth: 520 }}>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "clamp(22px, 3vw, 30px)",
                lineHeight: 1.2,
                letterSpacing: "-0.022em",
                color: "#fff",
                margin: "0 0 14px",
              }}
            >
              Thirty minutes. One workflow. A real recommendation.
            </h3>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 16,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.60)",
                margin: 0,
              }}
            >
              Book the call. We&apos;ll come back within one business day with two or three times to
              choose from — and a consultant who reads your form before they show up.
            </p>
          </div>
          <div
            style={{ display: "flex", gap: 12, flexWrap: "wrap", position: "relative", flexShrink: 0 }}
          >
            <a
              href="mailto:info@orchelix.com"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: 15,
                padding: "15px 24px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.18)",
                color: "rgba(255,255,255,0.80)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                transition: "background 200ms",
              }}
            >
              Email instead
            </a>
            <a
              href="#form"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 15,
                padding: "15px 24px",
                borderRadius: 12,
                background: "#fff",
                color: "var(--navy-700, #0B1220)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
                transition: "opacity 200ms",
              }}
            >
              Book the call →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── shared helpers ─────────────────────────────────── */
function Eyebrow({ children, navy }: { children: React.ReactNode; navy?: boolean }) {
  return (
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
        color: navy ? "var(--navy-500)" : "var(--teal-700)",
      }}
    >
      <span style={{ width: 18, height: 1, background: "currentColor", opacity: 0.7, display: "inline-block" }} />
      {children}
    </span>
  );
}
