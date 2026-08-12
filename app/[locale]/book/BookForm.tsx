"use client";

import { useState } from "react";
import type { Messages } from "@/app/i18n/messages/en";
import { track } from "@/app/lib/analytics";

/* This form previously called `setSubmitted(true)` and nothing else — no
   network request at all — so every booking request was discarded while the
   visitor was told we would be in touch. It now POSTs to /api/contact, the
   same endpoint the contact form uses, and reports real failures.

   Copy arrives as a prop: catalogues are server-only and this is a client
   component. Only the `book.form` slice crosses the boundary, not the whole
   catalogue, so the RSC payload stays small. */

export type BookFormCopy = Messages["pages"]["book"]["form"];

type Status = "idle" | "sending" | "sent" | "error";

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-mono), ui-monospace, monospace",
  fontSize: "0.625rem",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--lg-ink-3)",
  marginBottom: "0.55rem",
};

const fieldStyle: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  border: 0,
  borderBottom: "1px solid var(--lg-hair)",
  borderRadius: 0,
  padding: "0.7rem 0",
  fontFamily: "var(--font-body), Georgia, serif",
  fontSize: "0.9375rem",
  color: "var(--lg-ink)",
  outline: "none",
};

function Field({
  label,
  htmlFor,
  children,
  span,
}: {
  label: React.ReactNode;
  htmlFor: string;
  children: React.ReactNode;
  span?: boolean;
}) {
  return (
    <div className={span ? "sm:col-span-2" : undefined}>
      <label htmlFor={htmlFor} style={labelStyle}>
        {label}
      </label>
      {children}
    </div>
  );
}

export default function BookForm({ t }: { t: BookFormCopy }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const industry = String(data.get("industry") || "").trim();
    const time = String(data.get("time") || "").trim();
    const workflow = String(data.get("workflow") || "").trim();

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") || "").trim(),
          company: String(data.get("company") || "").trim(),
          email: String(data.get("email") || "").trim(),
          phone: String(data.get("phone") || "").trim(),
          /* `useCase` is required by the endpoint. Industry is the closest
             equivalent the booking form collects; it falls back to a literal
             so a submission can never be rejected for a field the visitor
             was never shown as mandatory. */
          useCase: industry || "Pilot booking request",
          message: [
            workflow && `Workflow to automate:\n${workflow}`,
            time && `Preferred time: ${time}`,
          ]
            .filter(Boolean)
            .join("\n\n"),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "");
      }
      track("book_submit");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "");
    }
  }

  if (status === "sent") {
    return (
      <div style={{ borderTop: "2px solid var(--lg-foil)", paddingTop: "1.6rem" }}>
        <p
          className="lg-fig"
          style={{
            fontSize: "0.625rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--lg-foil)",
            margin: "0 0 0.9rem",
          }}
        >
          {t.received}
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1.0625rem",
            lineHeight: 1.62,
            color: "var(--lg-ink)",
            maxWidth: "44ch",
            margin: 0,
          }}
        >
          {t.receivedBody}
        </p>
        <p
          className="lg-fig"
          style={{
            fontSize: "0.6875rem",
            letterSpacing: "0.04em",
            color: "var(--lg-ink-2)",
            marginTop: "1.4rem",
            marginBottom: 0,
          }}
        >
          {t.soonerIsFine}{" "}
          <a href="tel:+15615661066" style={{ color: "var(--lg-ink)" }}>
            +1 561 566 1066
          </a>
        </p>
      </div>
    );
  }

  const busy = status === "sending";

  return (
    <form onSubmit={handleSubmit} noValidate style={{ borderTop: "2px solid var(--lg-rule)", paddingTop: "1.8rem" }}>
      <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
        <Field label={t.fullName} htmlFor="f-name">
          <input id="f-name" name="name" type="text" required autoComplete="name" style={fieldStyle} />
        </Field>

        <Field label={t.workEmail} htmlFor="f-email">
          <input id="f-email" name="email" type="email" required autoComplete="email" style={fieldStyle} />
        </Field>

        <Field label={t.company} htmlFor="f-company">
          <input id="f-company" name="company" type="text" autoComplete="organization" style={fieldStyle} />
        </Field>

        <Field
          label={
            <>
              {t.phone} <span style={{ opacity: 0.6 }}>— {t.optional}</span>
            </>
          }
          htmlFor="f-phone"
        >
          <input id="f-phone" name="phone" type="tel" autoComplete="tel" style={fieldStyle} />
        </Field>

        <Field label={t.industry} htmlFor="f-industry" span>
          <select id="f-industry" name="industry" style={{ ...fieldStyle, cursor: "pointer" }}>
            <option value="">{t.selectOne}</option>
            {t.industries.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </Field>

        <Field label={t.workflow} htmlFor="f-workflow" span>
          <textarea
            id="f-workflow"
            name="workflow"
            rows={4}
            placeholder={t.workflowPlaceholder}
            style={{ ...fieldStyle, resize: "vertical" }}
          />
        </Field>

        <fieldset className="sm:col-span-2" style={{ border: 0, margin: 0, padding: 0 }}>
          <legend style={{ ...labelStyle, padding: 0 }}>{t.bestTime}</legend>
          <div className="flex flex-wrap gap-x-7 gap-y-3">
            {t.times.map((label, i) => (
              <label
                key={label}
                className="lg-fig inline-flex cursor-pointer items-center gap-2"
                style={{ fontSize: "0.6875rem", letterSpacing: "0.06em", color: "var(--lg-ink)" }}
              >
                <input
                  type="radio"
                  name="time"
                  value={label}
                  defaultChecked={i === t.times.length - 1}
                  style={{ accentColor: "var(--lg-foil)" }}
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Drawn as a margin annotation, not in red. DESIGN.md's Red Is
          Structure rule reserves rule red for ruling and requires an error
          to be "drawn with a device, not by borrowing the rule". */}
      {status === "error" && (
        <div
          role="alert"
          style={{ marginTop: "1.8rem", paddingLeft: "0.9rem", borderLeft: "2px solid var(--lg-ink)" }}
        >
          <span
            className="lg-fig"
            style={{
              display: "block",
              fontSize: "0.625rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--lg-ink)",
              marginBottom: "0.35rem",
            }}
          >
            {t.notSent}
          </span>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              lineHeight: 1.6,
              color: "var(--lg-ink-2)",
            }}
          >
            {error ? `${error} ` : ""}
            {t.errorTail}
          </span>
        </div>
      )}

      <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
        <button
          type="submit"
          disabled={busy}
          className="lg-stamp lg-foil-surface inline-flex items-center"
          style={{
            fontFamily: "var(--font-display)",
            fontStretch: "88%",
            fontWeight: 700,
            fontSize: "0.9375rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--lg-foil-ink)",
            padding: "0.95rem 1.7rem",
            border: 0,
            cursor: busy ? "wait" : "pointer",
            opacity: busy ? 0.72 : 1,
          }}
        >
          {busy ? t.sending : t.submit}
        </button>

        <span
          className="lg-fig"
          style={{
            fontSize: "0.625rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--lg-ink-3)",
          }}
        >
          {t.noCard}
        </span>
      </div>
    </form>
  );
}
