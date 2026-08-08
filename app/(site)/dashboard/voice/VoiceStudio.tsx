"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import {
  applyVoiceSync,
  fetchConfig,
  updateConfig,
  VOICE_SPEED_MAX,
  VOICE_SPEED_MIN,
  VOICE_SYNC_ALLOWED_TENANTS,
  type ConfigResponse,
  type ConfigUpdate,
  type LanguagePref,
  type PlatformConfig,
} from "@/app/lib/esmiPlatform";
import { useActiveOrgSlug } from "../useActiveOrgSlug";
import VoicePreviewPlayer from "./VoicePreviewPlayer";
import QualityStudio from "./QualityStudio";

/* Four real entries: voice_library.py (Python backend) maps these to real
   ElevenLabs voiceIds. The rest of the Section 3.3 8-voice roster is still a
   design placeholder — none of those other ids exist in
   voice_library.VOICE_LIBRARY yet, and selecting one would 503 from
   POST /platform/voice/preview ("no ElevenLabs voice is mapped"). Add a row
   here only once its mapping is real and test-called (see that file's own
   comment for the process). */
const VOICE_CATALOG = [
  {
    id: "esmi-default",
    name: "Esmi",
    personality: "Current & Familiar",
    tagline: "The current Esmi voice — already live on your assistant.",
    popular: false,
  },
  {
    id: "sofia",
    name: "Sofia",
    personality: "Calm & Professional",
    tagline: "Steady and reassuring — a calm, professional front desk voice.",
    popular: true,
  },
  {
    id: "ava",
    name: "Ava",
    personality: "Soft & Caring",
    tagline: "Gentle and warm — puts callers at ease right away.",
    popular: true,
  },
  {
    id: "noah",
    name: "Noah",
    personality: "Neutral & Trustworthy",
    tagline: "Even-keeled and dependable — a safe, professional default.",
    popular: false,
  },
] as const;

const LANGUAGE_OPTIONS: { value: LanguagePref; label: string; helper: string }[] = [
  { value: "auto", label: "Auto", helper: "Esmi matches the caller's language." },
  { value: "en", label: "English", helper: "Opens in English unless the caller speaks Spanish." },
  { value: "es", label: "Spanish", helper: "Opens in Spanish unless the caller speaks English." },
];

/* ── shared chrome ───────────────────────────────────────────────────────
   One flat panel per concern instead of a single card subdivided by
   dividers — the old shape nested a bordered box inside a bordered box on
   every section. Eyebrow labels (mono, uppercase, tracked) are the same
   register the try-esmi player uses for its meta line, which is what keeps
   the two surfaces reading as one product. */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-ink-4">
      {children}
    </span>
  );
}

function Panel({
  label,
  hint,
  children,
  className = "",
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-xl border border-line bg-surface p-5 shadow-sm ${className}`}>
      <div className="flex items-baseline justify-between gap-4">
        <Eyebrow>{label}</Eyebrow>
        {hint && <span className="text-xs text-ink-4">{hint}</span>}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function VoiceCard({
  selected,
  name,
  personality,
  tagline,
  popular,
  onSelect,
}: {
  selected: boolean;
  name: string;
  personality: string;
  tagline: string;
  popular?: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex w-full items-start gap-3 rounded-lg border p-3.5 text-left transition-colors duration-150 ${
        selected
          ? "border-teal-400 bg-teal-50 ring-1 ring-teal-400/40"
          : "border-line bg-surface hover:border-line-strong hover:bg-surface-2"
      }`}
    >
      <span
        aria-hidden
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors duration-150 ${
          selected ? "bg-teal-500 text-white" : "bg-surface-2 text-ink-3"
        }`}
      >
        {selected ? <Check className="h-4 w-4" strokeWidth={2.5} /> : name.charAt(0)}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-ink">{name}</span>
        {/* Personality + Popular ride the same quiet meta line — neither is
            loud enough to compete with the voice name itself. */}
        <span className="mt-0.5 block text-[11px] uppercase tracking-[0.07em] text-ink-4">
          {personality}
          {popular && <span className="text-teal-600"> · Popular</span>}
        </span>
        <span className="mt-1.5 block text-xs leading-5 text-ink-3">{tagline}</span>
      </span>
    </button>
  );
}

function Segmented({
  value,
  onChange,
}: {
  value: LanguagePref;
  onChange: (v: LanguagePref) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Language preference"
      className="inline-flex rounded-lg border border-line bg-surface-2 p-0.5"
    >
      {LANGUAGE_OPTIONS.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            aria-pressed={active}
            className={`rounded-[6px] px-3.5 py-1.5 text-xs font-medium transition-colors duration-150 ${
              active
                ? "bg-surface text-ink shadow-sm"
                : "text-ink-3 hover:text-ink"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function SpeedSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const pct = ((value - VOICE_SPEED_MIN) / (VOICE_SPEED_MAX - VOICE_SPEED_MIN)) * 100;
  return (
    <div>
      <div className="flex items-center gap-4">
        <input
          type="range"
          aria-label="Speech speed"
          min={VOICE_SPEED_MIN}
          max={VOICE_SPEED_MAX}
          step={0.01}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="vs-range flex-1"
          // The played portion of the track — see .vs-range in globals.css,
          // where the thumb lives (pseudo-elements can't be styled inline).
          style={
            {
              "--vs-track": `linear-gradient(to right, var(--teal-500) ${pct}%, var(--surface-2) ${pct}%)`,
            } as React.CSSProperties
          }
        />
        <span className="w-14 shrink-0 text-right font-mono text-sm tabular-nums text-ink">
          {value.toFixed(2)}×
        </span>
      </div>
      <div className="mt-1.5 flex justify-between text-[11px] text-ink-4">
        <span>Slower</span>
        <span>Natural</span>
        <span>Faster</span>
      </div>
    </div>
  );
}

// Only used when the greeting field is empty — Settings' Greeting section
// (app/dashboard/settings/SettingsForm.tsx) edits the same backend field;
// this page previews it, it doesn't introduce a second copy of it.
function placeholderGreeting(companyName: string, lang: LanguagePref): string {
  const name = companyName.trim() || "us";
  return lang === "es"
    ? `Gracias por llamar a ${name}, habla Esmi. ¿En qué le puedo ayudar?`
    : `Thanks for calling ${name}, this is Esmi. How can I help you today?`;
}

export default function VoiceStudio() {
  const [data, setData] = useState<ConfigResponse | null>(null);
  const [form, setForm] = useState<PlatformConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [applying, setApplying] = useState(false);
  const [applyError, setApplyError] = useState<string | null>(null);
  const [applyMessage, setApplyMessage] = useState<string | null>(null);
  const orgSlug = useActiveOrgSlug();

  const load = () => {
    setLoading(true);
    setLoadError(null);
    fetchConfig()
      .then((d) => {
        setData(d);
        setForm(structuredClone(d.config));
        setLoading(false);
      })
      .catch((e: Error) => {
        setLoadError(e.message);
        setLoading(false);
      });
  };

  useEffect(load, [orgSlug]);

  if (loading) {
    return (
      <div className="space-y-5">
        <div className="h-[76px] animate-pulse rounded-xl bg-surface-2" />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-7">
            <div className="h-56 animate-pulse rounded-xl bg-surface-2" />
            <div className="h-44 animate-pulse rounded-xl bg-surface-2" />
          </div>
          <div className="h-96 animate-pulse rounded-xl bg-surface-2 lg:col-span-5" />
        </div>
      </div>
    );
  }

  if (loadError || !data || !form) {
    return (
      <div className="rounded-xl border border-line bg-surface p-6 text-center shadow-sm">
        <p className="font-display text-base font-semibold text-ink">
          Couldn&apos;t load voice settings
        </p>
        <p className="mt-2 text-sm text-ink-3">{loadError}</p>
        <button
          type="button"
          onClick={load}
          className="mt-4 rounded-md bg-navy-600 px-4 py-2 text-sm font-medium text-white hover:bg-navy-500"
        >
          Try again
        </button>
      </div>
    );
  }

  const dirty =
    form.voice_id !== data.config.voice_id ||
    form.speed !== data.config.speed ||
    form.language_pref !== data.config.language_pref ||
    form.greeting !== data.config.greeting;

  const previewText = form.greeting.trim() || placeholderGreeting(form.company_name, form.language_pref);
  const wordCount = form.greeting.trim() ? form.greeting.trim().split(/\s+/).length : 0;
  const languageHelper =
    LANGUAGE_OPTIONS.find((o) => o.value === form.language_pref)?.helper ?? "";

  const tenantSyncAllowed =
    !!orgSlug && (VOICE_SYNC_ALLOWED_TENANTS as readonly string[]).includes(orgSlug);
  // Apply pushes whatever is currently SAVED (server reads voice_id/speed
  // from the tenant's own config, never from this form) — so it must be
  // impossible to click while there's an unsaved draft the button's own
  // "live Esmi updated" promise wouldn't actually cover yet.
  const applyDisabled = dirty || applying || !tenantSyncAllowed || !form.voice_id;
  const applyTooltip = !tenantSyncAllowed
    ? "Voice sync isn't enabled for this business yet — ask Orchelix."
    : dirty
      ? "Save your changes first."
      : !form.voice_id
        ? "Choose a voice first."
        : undefined;

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    const update: ConfigUpdate = {
      voice_id: form.voice_id,
      speed: form.speed,
      language_pref: form.language_pref,
      greeting: form.greeting,
      expected_version: data.version ?? undefined,
    };
    try {
      const result = await updateConfig(update);
      setData(result);
      setForm(structuredClone(result.config));
      setSavedAt(Date.now());
      // A fresh save invalidates whatever the last Apply reported — it was
      // about a now-superseded saved state.
      setApplyMessage(null);
      setApplyError(null);
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleApply = async () => {
    setApplying(true);
    setApplyError(null);
    setApplyMessage(null);
    try {
      const result = await applyVoiceSync();
      setApplyMessage(result.message);
    } catch (e) {
      setApplyError(e instanceof Error ? e.message : "Apply failed");
    } finally {
      setApplying(false);
    }
  };

  /* One status line for the action bar, in priority order: errors first,
     then the draft state, then the last successful outcome. Replaces the
     old row of four independently-rendered spans, which could stack two or
     three messages side by side and read as noise. */
  let statusNode: React.ReactNode = null;
  if (saveError) {
    statusNode = <span className="text-rose-600">{saveError}</span>;
  } else if (applyError) {
    statusNode = <span className="text-rose-600">{applyError}</span>;
  } else if (dirty) {
    statusNode = (
      <span className="flex items-center gap-2 text-ink-3">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-amber-400" />
        Unsaved changes
      </span>
    );
  } else if (applyMessage) {
    statusNode = <span className="text-teal-700">{applyMessage}</span>;
  } else if (savedAt) {
    statusNode = (
      <span className="flex items-center gap-2 text-teal-700">
        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
        Saved
      </span>
    );
  }

  return (
    <div className="space-y-5">
      {/* Zones A–C share a wrapper so the sticky action bar below stops
          sticking at the end of the voice config, rather than floating over
          Quality Studio too (a sticky element's scope is its parent box). */}
      <div className="space-y-5">
        {/* ── Zone A: transport. Sticks just under the 64px dashboard topbar
               so the greeting you're editing is always one keystroke from
               audible. */}
        <div className="sticky top-16 z-10 -mx-4 bg-paper px-4 py-2 backdrop-blur sm:-mx-6 sm:px-6">
          <VoicePreviewPlayer
            voiceId={form.voice_id || VOICE_CATALOG[0].id}
            voiceName={
              VOICE_CATALOG.find((v) => v.id === form.voice_id)?.name ?? VOICE_CATALOG[0].name
            }
            speed={form.speed}
            language={form.language_pref}
            text={previewText}
            draft={dirty}
          />
        </div>

        {/* ── Zone B: greeting (focus) + delivery, voice library as a rail */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-7">
            <Panel label="Greeting" hint={`${form.greeting.length}/500`}>
              <textarea
                rows={6}
                maxLength={500}
                aria-label="Phone greeting"
                /* font-[family-name:…], not the `font-display` class used
                   elsewhere in the dashboard: that class isn't a generated
                   Tailwind utility here (only --font-mono is in @theme), and
                   a <textarea> doesn't inherit body's font-family, so without
                   this the writing surface renders in the browser default. */
                className="vs-surface w-full resize-none rounded-lg border border-line bg-surface-2 px-3.5 py-3 font-[family-name:var(--font-display)] text-[15px] leading-7 text-ink transition-colors duration-150 focus:border-teal-400 focus:bg-surface focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                value={form.greeting}
                onChange={(e) => setForm({ ...form, greeting: e.target.value })}
                placeholder={placeholderGreeting(form.company_name, form.language_pref)}
              />
              <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="text-xs leading-5 text-ink-3">
                  Esmi opens with this on the first reply of a new call or chat. Leave it
                  blank to use the default above.
                </p>
                <p
                  className={`text-xs leading-5 ${wordCount > 40 ? "text-amber-700" : "text-ink-4"}`}
                >
                  {wordCount > 40
                    ? "Long for the phone — try tightening it."
                    : "Aim for ~30–40 words (~12 seconds)."}
                </p>
              </div>
            </Panel>

            <Panel label="Delivery">
              <SpeedSlider value={form.speed} onChange={(speed) => setForm({ ...form, speed })} />
              <p className="mt-2 text-xs leading-5 text-ink-3">
                Most businesses sound best at Natural (1.00×).
              </p>

              <div className="mt-5 border-t border-line pt-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="text-sm font-medium text-ink">Language</span>
                  <Segmented
                    value={form.language_pref}
                    onChange={(language_pref) => setForm({ ...form, language_pref })}
                  />
                </div>
                <p className="mt-2 text-xs leading-5 text-ink-3">
                  {languageHelper} This is what Esmi opens with before it hears the caller
                  speak.
                </p>
              </div>
            </Panel>
          </div>

          <div className="lg:col-span-5">
            <Panel label="Voice library">
              {!form.voice_id && (
                <p className="mb-3 text-xs leading-5 text-ink-3">
                  You haven&apos;t chosen a voice yet — start with the current Esmi voice.
                </p>
              )}
              <div className="space-y-2.5">
                {VOICE_CATALOG.map((v) => (
                  <VoiceCard
                    key={v.id}
                    selected={form.voice_id === v.id}
                    name={v.name}
                    personality={v.personality}
                    tagline={v.tagline}
                    popular={v.popular}
                    onSelect={() => setForm({ ...form, voice_id: v.id })}
                  />
                ))}
              </div>
              <p className="mt-3 text-xs text-ink-4">More voices are coming soon.</p>
            </Panel>
          </div>
        </div>

        {/* ── Zone C: actions. Sticky at the bottom so Save is reachable from
               anywhere in the page, not just after scrolling past it. */}
        <div className="sticky bottom-0 z-10 -mx-4 border-t border-line bg-surface px-4 py-3.5 backdrop-blur sm:-mx-6 sm:px-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            {statusNode && <div className="order-2 text-sm sm:order-1">{statusNode}</div>}

            <div className="order-1 ml-auto flex shrink-0 items-center gap-2.5 sm:order-2">
              <button
                type="button"
                disabled={applyDisabled}
                onClick={handleApply}
                title={applyTooltip}
                className="rounded-lg border border-teal-600 px-3.5 py-2 text-sm font-medium text-teal-700 transition-colors duration-150 hover:bg-teal-50 disabled:cursor-not-allowed disabled:border-line disabled:text-ink-4 disabled:hover:bg-transparent"
              >
                {applying ? "Applying…" : "Apply to live Esmi"}
              </button>
              <button
                type="button"
                disabled={!dirty || saving}
                onClick={handleSave}
                className="rounded-lg bg-navy-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:bg-navy-500 disabled:opacity-40 disabled:hover:bg-navy-600"
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>

          <p className="mt-2 text-[11px] leading-5 text-ink-4">
            {tenantSyncAllowed
              ? "Save writes your settings. Apply to live Esmi is the separate step that pushes them to your phone number — it never happens automatically on Save."
              : "Saving here doesn't change what callers hear yet — voice sync isn't enabled for this business yet, so an Orchelix team member pushes voice changes to your live phone number separately."}
          </p>
        </div>
      </div>

      {/* ── Zone D: secondary section, same design system */}
      <div className="pt-3">
        <QualityStudio />
      </div>
    </div>
  );
}
