"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import {
  fetchConfig,
  updateConfig,
  VOICE_SPEED_MAX,
  VOICE_SPEED_MIN,
  type ConfigResponse,
  type ConfigUpdate,
  type LanguagePref,
  type PlatformConfig,
} from "../../lib/esmiPlatform";
import { useActiveOrgSlug } from "../useActiveOrgSlug";
import VoicePreviewPlayer from "./VoicePreviewPlayer";
import QualityStudioStub from "./QualityStudioStub";

const inputCls =
  "w-full rounded-md border border-line bg-surface px-2.5 py-2 text-sm text-ink " +
  "focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500";

/* Only one real entry: voice_library.py (Python backend) maps just
   "esmi-default" to a real ElevenLabs voiceId today. The Section 3.3 8-voice
   roster is a design placeholder — none of those ids exist in
   voice_library.VOICE_LIBRARY yet, and selecting one would 503 from
   POST /platform/voice/preview ("no ElevenLabs voice is mapped"). Add a row
   here only once its mapping is real and test-called (see that file's own
   comment for the process). */
const VOICE_CATALOG = [
  {
    id: "esmi-default",
    name: "Esmi",
    tagline: "The current Esmi voice — already live on your assistant.",
  },
] as const;

const LANGUAGE_OPTIONS: { value: LanguagePref; label: string; helper: string }[] = [
  { value: "auto", label: "Detect automatically", helper: "Esmi matches the caller's language." },
  { value: "en", label: "Prefer English", helper: "Opens in English unless the caller speaks Spanish." },
  { value: "es", label: "Prefer Spanish", helper: "Opens in Spanish unless the caller speaks English." },
];

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-line px-4 py-5 first:border-t-0 sm:px-6">
      <h2 className="font-display text-base font-semibold text-ink">{title}</h2>
      {description && <p className="mt-1 text-sm text-ink-3">{description}</p>}
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

function VoiceCard({
  selected,
  name,
  tagline,
  onSelect,
}: {
  selected: boolean;
  name: string;
  tagline: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-start gap-3 rounded-lg border p-4 text-left transition ${
        selected
          ? "border-teal-500 bg-teal-50 ring-2 ring-teal-200"
          : "border-line bg-surface hover:bg-surface-2"
      }`}
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
          selected ? "bg-teal-500 text-white" : "bg-surface-2 text-ink-3"
        }`}
      >
        {selected ? <Check className="h-4 w-4" strokeWidth={2.5} /> : name.charAt(0)}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-ink">{name}</p>
        <p className="mt-0.5 text-xs leading-5 text-ink-3">{tagline}</p>
      </div>
    </button>
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
      <div className="animate-pulse space-y-4 rounded-lg border border-line bg-surface p-6 shadow-sm">
        <div className="h-4 w-40 rounded bg-surface-2" />
        <div className="h-24 w-full rounded bg-surface-2" />
        <div className="h-9 w-full rounded bg-surface-2" />
      </div>
    );
  }

  if (loadError || !data || !form) {
    return (
      <div className="rounded-lg border border-line bg-surface p-6 text-center shadow-sm">
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
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {dirty && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          You have unsaved voice changes · the preview below reflects the draft, not what&apos;s saved.
        </div>
      )}

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

      <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-sm">
        <Section
          title="Esmi's voice"
          description="Pick a voice that matches your brand. You can change this anytime."
        >
          {!form.voice_id && (
            <p className="text-sm text-ink-3">
              You haven&apos;t chosen a voice yet — start with the current Esmi voice below.
            </p>
          )}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {VOICE_CATALOG.map((v) => (
              <VoiceCard
                key={v.id}
                selected={form.voice_id === v.id}
                name={v.name}
                tagline={v.tagline}
                onSelect={() => setForm({ ...form, voice_id: v.id })}
              />
            ))}
          </div>
          <p className="text-xs text-ink-4">More voices are coming soon.</p>
        </Section>

        <Section title="Speech speed">
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={VOICE_SPEED_MIN}
              max={VOICE_SPEED_MAX}
              step={0.01}
              value={form.speed}
              onChange={(e) => setForm({ ...form, speed: Number(e.target.value) })}
              className="h-2 flex-1 accent-teal-500"
            />
            <span className="w-14 shrink-0 text-right text-sm font-semibold text-ink">
              {form.speed.toFixed(2)}×
            </span>
          </div>
          <div className="flex justify-between text-xs text-ink-4">
            <span>Slower</span>
            <span>Natural</span>
            <span>Faster</span>
          </div>
          <p className="text-xs text-ink-3">Most businesses sound best at Natural (1.0×).</p>
        </Section>

        <Section
          title="Language preference"
          description="What Esmi opens with before it hears the caller speak."
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {LANGUAGE_OPTIONS.map((opt) => {
              const active = form.language_pref === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setForm({ ...form, language_pref: opt.value })}
                  className={`flex-1 min-w-[180px] rounded-md border px-3 py-2.5 text-left text-sm transition ${
                    active
                      ? "border-teal-500 bg-teal-50 text-teal-900"
                      : "border-line bg-surface text-ink-2 hover:bg-surface-2"
                  }`}
                >
                  <span className="font-medium">{opt.label}</span>
                  <span className="block text-xs text-ink-4">{opt.helper}</span>
                </button>
              );
            })}
          </div>
        </Section>

        <Section
          title="Phone greeting"
          description="Esmi opens with this line on the first reply of a new call or chat. Leave it blank to use the default opening above."
        >
          <textarea
            rows={3}
            maxLength={500}
            className={`${inputCls} h-auto`}
            value={form.greeting}
            onChange={(e) => setForm({ ...form, greeting: e.target.value })}
            placeholder={placeholderGreeting(form.company_name, form.language_pref)}
          />
          <div className="flex items-center justify-between text-xs text-ink-4">
            <span>{form.greeting.length}/500</span>
            {wordCount > 40 && (
              <span className="font-medium text-amber-700">
                This greeting may feel long on the phone — try tightening it, then re-preview.
              </span>
            )}
          </div>
          <p className="text-xs text-ink-3">
            Keep it under ~12 seconds spoken (~30–40 words). Callers hang up on long intros.
          </p>
        </Section>

        <div className="flex flex-wrap items-center gap-3 border-t border-line bg-surface-2/40 px-4 py-4 sm:px-6">
          <button
            type="button"
            disabled={!dirty || saving}
            onClick={handleSave}
            className="rounded-md bg-navy-600 px-4 py-2 text-sm font-medium text-white hover:bg-navy-500 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save voice settings"}
          </button>
          {saveError && <span className="text-sm text-rose-600">{saveError}</span>}
          {!saveError && savedAt && !dirty && (
            <span className="text-sm text-teal-700">Saved.</span>
          )}
          {dirty && !saving && <span className="text-sm text-ink-4">Unsaved changes</span>}
          <span className="basis-full text-xs text-ink-4 sm:basis-auto sm:ml-auto sm:max-w-xs sm:text-right">
            Saving here doesn&apos;t change what callers hear yet — an Orchelix team member pushes
            voice changes to your live phone number separately.
          </span>
        </div>
      </div>

      <QualityStudioStub />
    </div>
  );
}
