"use client";

import { useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { CalculatorCopy } from "@/app/i18n/calculator";
import { DEFAULTS, STARTER_MONTHLY, WEEKS_PER_MONTH } from "@/app/i18n/calculator";
import { track } from "@/app/lib/analytics";

/* The calculator itself.

   Three decisions worth writing down, because each one is the opposite of
   what a lead-generation calculator usually does:

   1. NO GATE. The result renders as the visitor types. Asking for an email
      before showing a number they can work out themselves is a tax on the
      only thing that makes the page worth linking to, and it is why almost
      every ROI calculator on the internet ranks for nothing.
   2. NO STORAGE OF INPUTS. State is React state and nothing else. The four
      numbers are never posted and never persisted, and the copy says so.
      There is exactly one beacon on this page: `calc_interact`, fired once
      when the visitor first touches any control, carrying NO properties —
      no values, no derived verdict, nothing about what was typed. Pageviews
      alone cannot separate a tool that works from one nobody touches, which
      is why it exists. Do not give it arguments, or the copy becomes a lie.
   3. NO ANIMATED COUNT-UP. The figures change on the same frame as the input.
      A number that races up to its value is decoration pretending to be
      feedback, and it puts the page's one moment in the wrong place. */

const FIELD_GAP = "1.9rem";

const labelStyle: CSSProperties = {
  display: "block",
  fontFamily: "var(--font-mono)",
  fontSize: 11,
  fontWeight: 500,
  letterSpacing: "0.13em",
  textTransform: "uppercase",
  color: "var(--lg-ink-3)",
  marginBottom: 10,
};

const helpStyle: CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: 13,
  lineHeight: 1.5,
  color: "var(--lg-ink-3)",
  margin: "8px 0 0",
};

const numberStyle: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontStretch: "86%",
  fontWeight: 700,
  fontSize: 22,
  letterSpacing: "-0.01em",
  color: "var(--lg-ink)",
  background: "transparent",
  border: 0,
  borderBottom: "1px solid var(--lg-hair-2)",
  borderRadius: 0,
  padding: "6px 2px",
  width: "100%",
  outline: "none",
  MozAppearance: "textfield",
};

function Money({
  value,
  currency,
  size = 22,
  foil = false,
}: {
  value: number;
  currency: string;
  size?: number;
  foil?: boolean;
}) {
  return (
    <span
      style={{
        fontFamily: "var(--font-display)",
        fontStretch: "84%",
        fontWeight: 700,
        fontSize: size,
        lineHeight: 1.05,
        letterSpacing: "-0.02em",
        color: foil ? "var(--lg-foil)" : "var(--lg-ink)",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {currency}
      {Math.round(value).toLocaleString("en-US")}
    </span>
  );
}

function Field({
  id,
  label,
  help,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
}: {
  id: string;
  label: string;
  help: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div style={{ marginBottom: FIELD_GAP }}>
      <label htmlFor={id} style={labelStyle}>
        {label}
      </label>

      <div className="flex items-baseline gap-1.5">
        {prefix ? (
          <span
            aria-hidden="true"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 22,
              color: "var(--lg-ink-3)",
            }}
          >
            {prefix}
          </span>
        ) : null}
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          step={step}
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => {
            const n = Number(e.target.value);
            onChange(Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : min);
          }}
          style={numberStyle}
        />
        {suffix ? (
          <span
            aria-hidden="true"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 22,
              color: "var(--lg-ink-3)",
            }}
          >
            {suffix}
          </span>
        ) : null}
      </div>

      {/* The slider drives the same state as the field above it and is
          labelled by the same text. Keyboard users get the number input;
          this is for the thumb, on a phone, where typing four values is
          the reason people abandon calculators. */}
      <input
        type="range"
        aria-label={label}
        min={min}
        max={max}
        step={step}
        value={Number.isFinite(value) ? value : min}
        onChange={(e) => onChange(Number(e.target.value))}
        className="lg-calc-range"
        style={{ width: "100%", marginTop: 12, accentColor: "var(--lg-foil)" }}
      />

      <p style={helpStyle}>{help}</p>
    </div>
  );
}

function Readout({
  label,
  children,
  rule = false,
}: {
  label: string;
  children: ReactNode;
  rule?: boolean;
}) {
  return (
    <div
      style={{
        padding: "1.05rem 0",
        borderBottom: `1px solid var(--lg-hair-2)`,
        ...(rule ? { borderTop: "2px solid var(--lg-foil)" } : {}),
      }}
    >
      <dt
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--lg-ink-3)",
          marginBottom: 8,
        }}
      >
        {label}
      </dt>
      <dd style={{ margin: 0 }}>{children}</dd>
    </div>
  );
}

export default function Calculator({ c }: { c: CalculatorCopy }) {
  const [callsPerWeek, setCalls] = useState(DEFAULTS.callsPerWeek);
  const [missedPct, setMissed] = useState(DEFAULTS.missedPct);
  const [jobValue, setJobValue] = useState(DEFAULTS.jobValue);
  const [closePct, setClose] = useState(DEFAULTS.closePct);

  /* Fires at most once per mount, and only on real input — never on load,
     so it measures use rather than arrival. No properties: see note 2. */
  const engaged = useRef(false);
  const markEngaged = () => {
    if (engaged.current) return;
    engaged.current = true;
    track("calc_interact");
  };

  const r = useMemo(() => {
    const missedPerMonth = callsPerWeek * (missedPct / 100) * WEEKS_PER_MONTH;
    const jobsLost = missedPerMonth * (closePct / 100);
    const perMonth = jobsLost * jobValue;
    return {
      missedPerMonth,
      jobsLost,
      perMonth,
      perYear: perMonth * 12,
      worthIt: perMonth > STARTER_MONTHLY,
    };
  }, [callsPerWeek, missedPct, jobValue, closePct]);

  const isDefault =
    callsPerWeek === DEFAULTS.callsPerWeek &&
    missedPct === DEFAULTS.missedPct &&
    jobValue === DEFAULTS.jobValue &&
    closePct === DEFAULTS.closePct;

  return (
    <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
      {/* ── Inputs ── */}
      <div>
        <div style={{ borderTop: "2px solid var(--lg-rule)", paddingTop: "1.8rem" }}>
          <Field
            id="calc-calls"
            label={c.callsLabel}
            help={c.callsHelp}
            value={callsPerWeek}
            onChange={(n) => {
              markEngaged();
              setCalls(n);
            }}
            min={1}
            max={500}
          />
          <Field
            id="calc-missed"
            label={c.missedLabel}
            help={c.missedHelp}
            value={missedPct}
            onChange={(n) => {
              markEngaged();
              setMissed(n);
            }}
            min={0}
            max={100}
            suffix="%"
          />
          <Field
            id="calc-value"
            label={c.valueLabel}
            help={c.valueHelp}
            value={jobValue}
            onChange={(n) => {
              markEngaged();
              setJobValue(n);
            }}
            min={0}
            max={50000}
            step={25}
            prefix={c.currency}
          />
          <Field
            id="calc-close"
            label={c.closeLabel}
            help={c.closeHelp}
            value={closePct}
            onChange={(n) => {
              markEngaged();
              setClose(n);
            }}
            min={0}
            max={100}
            suffix="%"
          />
        </div>

        {!isDefault && (
          <button
            type="button"
            onClick={() => {
              setCalls(DEFAULTS.callsPerWeek);
              setMissed(DEFAULTS.missedPct);
              setJobValue(DEFAULTS.jobValue);
              setClose(DEFAULTS.closePct);
            }}
            className="lg-quiet"
            style={{
              fontFamily: "var(--font-display)",
              fontStretch: "88%",
              fontWeight: 600,
              fontSize: "0.8125rem",
              letterSpacing: "0.04em",
              color: "var(--lg-ink-3)",
              background: "transparent",
              border: 0,
              padding: 0,
              cursor: "pointer",
            }}
          >
            {c.resetLabel}
          </button>
        )}
      </div>

      {/* ── Result ──
          `aria-live="polite"` rather than assertive: the figures change on
          every keystroke and every slider tick, and assertive would make a
          screen reader interrupt itself continuously while someone drags. */}
      <div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontStretch: "84%",
            fontWeight: 700,
            fontSize: "clamp(1.6rem, 2.6vw, 2.1rem)",
            lineHeight: 1.04,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            color: "var(--lg-ink)",
            margin: "0 0 1.4rem",
          }}
        >
          {c.resultHeading}
        </h2>

        <dl className="m-0" aria-live="polite" aria-atomic="true">
          <Readout label={c.perMonth} rule>
            <Money value={r.perMonth} currency={c.currency} size={46} foil />
          </Readout>
          <Readout label={c.perYear}>
            <Money value={r.perYear} currency={c.currency} size={28} />
          </Readout>
          <Readout label={c.missedPerMonth}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontStretch: "86%",
                fontWeight: 700,
                fontSize: 20,
                color: "var(--lg-ink)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {Math.round(r.missedPerMonth).toLocaleString("en-US")}
            </span>
          </Readout>
          <Readout label={c.jobsLost}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontStretch: "86%",
                fontWeight: 700,
                fontSize: 20,
                color: "var(--lg-ink)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {Math.round(r.jobsLost).toLocaleString("en-US")}
            </span>
          </Readout>
          <Readout label={c.costOfCover}>
            <Money value={STARTER_MONTHLY} currency={c.currency} size={20} />
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 13,
                lineHeight: 1.55,
                color: "var(--lg-ink-3)",
                margin: "10px 0 0",
                maxWidth: "42ch",
              }}
            >
              {c.costOfCoverNote}
            </p>
          </Readout>
        </dl>

        {/* The verdict, stated either way.
            A calculator that can only ever conclude "you should buy this"
            is not a calculator. When the arithmetic says otherwise, the page
            says so — which is the only reason to believe it when it does not. */}
        <div
          style={{
            marginTop: "1.6rem",
            paddingLeft: "1rem",
            borderLeft: `2px solid ${r.worthIt ? "var(--lg-foil)" : "var(--lg-hair-2)"}`,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--lg-ink-3)",
              margin: "0 0 8px",
            }}
          >
            {c.netHeading}
          </p>
          <p
            className="lg-prose"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              lineHeight: 1.6,
              color: "var(--lg-ink-2)",
              margin: 0,
              maxWidth: "44ch",
            }}
          >
            {r.worthIt ? c.netPositive : c.netNegative}
          </p>
        </div>
      </div>
    </div>
  );
}
