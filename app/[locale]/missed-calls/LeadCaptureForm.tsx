"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const FOIL = "var(--lg-foil)";

const BUSINESS_TYPES = [
  { value: "", label: "What kind of business? (optional)" },
  { value: "barbershop_salon", label: "Barbershop / salon" },
  { value: "clinic_dental", label: "Clinic / dental" },
  { value: "hvac_trades", label: "HVAC / trades" },
  { value: "real_estate", label: "Real estate / property" },
  { value: "other", label: "Other" },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  fontFamily: "var(--font-display)",
  fontSize: 15,
  color: "var(--lg-ink)",
  background: "transparent",
  border: 0,
  borderBottom: "1px solid var(--lg-hair)",
  borderRadius: 0,
  padding: "13px 14px",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  fontWeight: 500,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "rgba(234,242,255,0.5)",
  marginBottom: 6,
};

/* Cold Meta traffic -> name + email -> tagged meta_missed_calls -> /try-esmi.
   A failed submit must never trap someone who just wants to see the demo —
   the "Continue to demo without signing up" link stays visible whenever the
   form errors, so the ad spend still converts to a demo view either way. */
export default function LeadCaptureForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const canSubmit = firstName.trim().length > 0 && emailLooksValid && !submitting;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/leads/meta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName.trim(),
          email: email.trim(),
          business_type: businessType || null,
          source: "meta_missed_calls",
          utm_source: searchParams.get("utm_source"),
          utm_campaign: searchParams.get("utm_campaign"),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Something went wrong — please try again.");
      }

      router.push("/try-esmi?from=meta_missed_calls");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong — please try again.");
      setSubmitting(false);
    }
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 440,
        margin: "0 auto",
        textAlign: "left",
        background: "transparent",
        border: 0,
        borderTop: "2px solid var(--lg-rule)",
        borderRadius: 0,
        padding: "1.8rem 0 0",
      }}
    >
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: 14 }}>
          <label htmlFor="lc-first-name" style={labelStyle}>
            First name
          </label>
          <input
            id="lc-first-name"
            name="first_name"
            type="text"
            autoComplete="given-name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Ana"
            style={inputStyle}
            disabled={submitting}
          />
        </div>

        <div style={{ marginBottom: 14 }}>
          <label htmlFor="lc-email" style={labelStyle}>
            Email
          </label>
          <input
            id="lc-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@yourbusiness.com"
            style={inputStyle}
            disabled={submitting}
          />
        </div>

        <div style={{ marginBottom: 18 }}>
          <label htmlFor="lc-business-type" style={labelStyle}>
            Business type
          </label>
          <select
            id="lc-business-type"
            name="business_type"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            style={{ ...inputStyle, color: businessType ? "var(--lg-ink)" : "var(--lg-ink-3)" }}
            disabled={submitting}
          >
            {BUSINESS_TYPES.map((t) => (
              <option key={t.value} value={t.value} style={{ color: "var(--lg-field-2)" }}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="lg-stamp lg-foil-surface"
          style={{
            width: "100%",
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 15,
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
            padding: "0.95rem 1.7rem",
            borderRadius: 0,
            border: 0,
            color: "var(--lg-foil-ink)",
            cursor: canSubmit ? "pointer" : "not-allowed",
            opacity: canSubmit ? 1 : 0.45,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {submitting ? "Getting your demo ready…" : "Get my live demo"}
        </button>

        {error && (
          <div style={{ marginTop: 14, paddingLeft: "0.9rem", borderLeft: "2px solid var(--lg-ink)" }}>
            <p
              role="alert"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 13,
                color: "var(--lg-ink)",
                margin: "0 0 6px",
              }}
            >
              {error}
            </p>
            <a
              href="/try-esmi"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 13,
                color: FOIL,
                textDecoration: "underline",
              }}
            >
              Continue to demo without signing up
            </a>
          </div>
        )}
      </form>
    </div>
  );
}
