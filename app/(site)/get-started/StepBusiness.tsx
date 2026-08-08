"use client";

import { useEffect, useState } from "react";
import { checkSlug } from "@/app/lib/esmiPlatform";
import { Field, PrimaryButton, inputCls, selectCls } from "./wizardUi";

/* Step 1. The slug lives here rather than on its own step because it's
   derived from the company name — splitting them means editing in two places.

   Slug state machine: as long as the user hasn't hand-edited it, it tracks
   the company name (debounced, server-suggested so collisions resolve to
   "-2" before submit). Once touched, it's theirs and we only validate. */

export type BusinessValues = {
  company_name: string;
  tenant_id: string;
  business_tz: string;
};

type SlugState =
  | { kind: "idle" }
  | { kind: "checking" }
  | { kind: "ok"; slug: string }
  | { kind: "taken"; suggestion: string | null }
  | { kind: "invalid" }
  | { kind: "error"; message: string };

const DEBOUNCE_MS = 400;

function timezones(): string[] {
  try {
    const all = Intl.supportedValuesOf("timeZone");
    if (all.length) return all;
  } catch {
    /* older browsers — fall through */
  }
  return [
    "America/Toronto",
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
    "America/Vancouver",
    "America/Mexico_City",
    "Europe/London",
    "Europe/Madrid",
  ];
}

function guessTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Toronto";
  } catch {
    return "America/Toronto";
  }
}

export function initialBusiness(): BusinessValues {
  return { company_name: "", tenant_id: "", business_tz: guessTimezone() };
}

export default function StepBusiness({
  values,
  onChange,
  onNext,
}: {
  values: BusinessValues;
  onChange: (v: BusinessValues) => void;
  onNext: () => void;
}) {
  const [slugTouched, setSlugTouched] = useState(false);
  const [slugState, setSlugState] = useState<SlugState>({ kind: "idle" });
  // Lazy useState, not useRef: this is read during render, and Intl's zone
  // list is long enough to be worth building only once.
  const [zones] = useState<string[]>(timezones);

  const { company_name, tenant_id } = values;

  /* One debounced effect covers both modes: untouched slugs ask the server
     for a suggestion from the company name, touched ones ask whether the
     typed slug is free. Same endpoint, and it already resolves collisions. */
  useEffect(() => {
    const name = company_name.trim();
    const slug = tenant_id.trim();
    if (!name && !slug) {
      setSlugState({ kind: "idle" });
      return;
    }

    let active = true;
    setSlugState({ kind: "checking" });
    const t = setTimeout(() => {
      checkSlug(slugTouched ? { slug, company_name: name } : { company_name: name })
        .then((res) => {
          if (!active) return;
          if (!slugTouched) {
            const next = res.suggestion ?? "";
            if (next && next !== tenant_id) {
              onChange({ ...values, tenant_id: next });
            }
            setSlugState(next ? { kind: "ok", slug: next } : { kind: "idle" });
            return;
          }
          if (!res.valid) setSlugState({ kind: "invalid" });
          else if (res.available) setSlugState({ kind: "ok", slug });
          else setSlugState({ kind: "taken", suggestion: res.suggestion });
        })
        .catch((e: Error) => {
          if (active) setSlugState({ kind: "error", message: e.message });
        });
    }, DEBOUNCE_MS);

    return () => {
      active = false;
      clearTimeout(t);
    };
    // `values`/`onChange` are intentionally out: including them re-runs this
    // on every keystroke of unrelated fields (and on our own tenant_id write).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company_name, tenant_id, slugTouched]);

  const canContinue =
    company_name.trim().length > 0 &&
    values.business_tz.length > 0 &&
    slugState.kind === "ok";

  return (
    <div className="space-y-5">
      <Field label="Business name" required>
        <input
          className={inputCls}
          value={company_name}
          onChange={(e) => onChange({ ...values, company_name: e.target.value })}
          placeholder="Bella Vista Barbers"
          autoFocus
        />
      </Field>

      <Field
        label="Your Esmi address"
        required
        hint={
          slugState.kind === "checking"
            ? "Checking availability…"
            : "This is permanent — it identifies your business everywhere in Esmi and can't be changed later."
        }
        error={
          slugState.kind === "taken"
            ? `That's taken.${slugState.suggestion ? ` Try “${slugState.suggestion}”.` : ""}`
            : slugState.kind === "invalid"
              ? "Use lowercase letters, numbers, and hyphens only."
              : slugState.kind === "error"
                ? slugState.message
                : null
        }
      >
        <div className="flex items-center gap-1 rounded-lg border border-line bg-surface-2 px-3">
          <span className="shrink-0 text-sm text-ink-3">orchelix.com/</span>
          <input
            className="h-11 w-full bg-transparent text-sm font-medium text-ink placeholder:text-ink-3 focus:outline-none"
            value={tenant_id}
            onChange={(e) => {
              setSlugTouched(true);
              onChange({ ...values, tenant_id: e.target.value.toLowerCase() });
            }}
            placeholder="bella-vista-barbers"
            spellCheck={false}
            aria-label="Your Esmi address"
          />
          {slugState.kind === "ok" && (
            <span className="shrink-0 text-sm text-teal-600" aria-label="Available">
              ✓
            </span>
          )}
        </div>
      </Field>

      <Field label="Timezone" required hint="Used for your hours and bookings.">
        <select
          className={selectCls}
          value={values.business_tz}
          onChange={(e) => onChange({ ...values, business_tz: e.target.value })}
        >
          {zones.map((tz) => (
            <option key={tz} value={tz}>
              {tz.replace(/_/g, " ")}
            </option>
          ))}
        </select>
      </Field>

      <div className="flex justify-end pt-2">
        <PrimaryButton onClick={onNext} disabled={!canContinue}>
          Continue
        </PrimaryButton>
      </div>
    </div>
  );
}
