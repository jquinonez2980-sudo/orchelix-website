"use client";

import { useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const CYAN = "#00F0FF";

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
  color: "#fff",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.14)",
  borderRadius: 10,
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
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 16,
        padding: "24px 24px 22px",
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
            style={{ ...inputStyle, color: businessType ? "#fff" : "rgba(234,242,255,0.5)" }}
            disabled={submitting}
          >
            {BUSINESS_TYPES.map((t) => (
              <option key={t.value} value={t.value} style={{ color: "#0A0F1C" }}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          style={{
            width: "100%",
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 15,
            padding: "15px 28px",
            borderRadius: 12,
            border: "none",
            background: canSubmit
              ? "linear-gradient(135deg, #00F0FF 0%, #38BDF8 100%)"
              : "rgba(255,255,255,0.08)",
            color: canSubmit ? "#04121A" : "rgba(234,242,255,0.4)",
            cursor: canSubmit ? "pointer" : "not-allowed",
            boxShadow: canSubmit ? "0 0 28px rgba(0,240,255,0.45)" : "none",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {submitting ? "Getting your demo ready…" : "Get my live demo →"}
        </button>

        {error && (
          <div style={{ marginTop: 14 }}>
            <p
              role="alert"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 13,
                color: "#FCA5A5",
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
                color: CYAN,
                textDecoration: "underline",
              }}
            >
              Continue to demo without signing up →
            </a>
          </div>
        )}
      </form>
    </div>
  );
}
