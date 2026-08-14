"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import {
  fetchConfig,
  fetchTenantStatus,
  updateConfig,
  type ConfigResponse,
  type PlatformConfig,
  type TenantStatus,
} from "@/app/lib/esmiPlatform";
import VoicePreviewPlayer from "../../voice/VoicePreviewPlayer";
import { canContinue, CONTINUE_DISABLED_TOOLTIP } from "./gate";

/* Onboarding "Voice & greeting" gate (docs/ESMI_DASHBOARD_UX.md Section 7
   Step 3). Lite subset of Voice Studio (app/dashboard/voice/VoiceStudio.tsx)
   for a tenant still mid-onboarding: same fetchConfig/updateConfig draft-save
   path, same VoicePreviewPlayer — no "Apply to live Esmi" (that stays behind
   the allow-list and is a Voice Studio-only concept) and no Quality Studio.

   Gate logic itself lives in gate.ts as pure functions so it's testable
   without a DOM — this component just wires state to it. */

const DEFAULT_VOICE_ID = "esmi-default";

function placeholderGreeting(companyName: string): string {
  const name = companyName.trim() || "us";
  return `Thanks for calling ${name}, this is Esmi. How can I help you today?`;
}

function ChecklistRow({ done, label }: { done: boolean; label: string }) {
  return (
    <li className="flex items-center gap-2.5">
      <span
        aria-hidden
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
          done ? "bg-teal-500 text-white" : "border border-line bg-surface"
        }`}
      >
        {done && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
      </span>
      <span className={`text-sm ${done ? "text-ink" : "text-ink-3"}`}>{label}</span>
    </li>
  );
}

export default function VoiceOnboardingStep() {
  const router = useRouter();
  const [status, setStatus] = useState<TenantStatus | null>(null);
  const [data, setData] = useState<ConfigResponse | null>(null);
  const [form, setForm] = useState<PlatformConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [hasPreviewedOnce, setHasPreviewedOnce] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    Promise.all([fetchConfig(), fetchTenantStatus()])
      .then(([cfg, st]) => {
        if (!active) return;
        setData(cfg);
        setForm({ ...structuredClone(cfg.config), voice_id: cfg.config.voice_id || DEFAULT_VOICE_ID });
        setStatus(st);
        setHasPreviewedOnce(st.onboarding_voice_previewed);
        setLoading(false);
      })
      .catch((e: Error) => {
        if (!active) return;
        setLoadError(e.message);
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="space-y-4 rounded-lg border border-line bg-surface p-6 shadow-sm">
        <div className="h-4 w-40 rounded bg-surface-2" />
        <div className="h-24 w-full rounded bg-surface-2" />
      </div>
    );
  }

  if (loadError || !data || !form || !status) {
    return (
      <div className="rounded-lg border border-line bg-surface p-6 text-center shadow-sm">
        <p className="font-display text-base font-semibold text-ink">
          Couldn&apos;t load your voice settings
        </p>
        <p className="mt-2 text-sm text-ink-3">{loadError}</p>
      </div>
    );
  }

  // Already onboarded — this gate step isn't for them. Send them to the real
  // Voice Studio instead of showing a "first-run" step to an active tenant.
  if (status.onboarding_status === "active") {
    return (
      <div className="rounded-lg border border-line bg-surface p-6 text-center shadow-sm">
        <p className="font-display text-base font-semibold text-ink">
          Your voice is already set up
        </p>
        <p className="mt-2 text-sm text-ink-3">
          Manage voice, speed, and greeting from Voice &amp; Personality.
        </p>
        <a
          href="/dashboard/voice"
          className="mt-4 inline-flex rounded-md bg-navy-600 px-4 py-2 text-sm font-medium text-white hover:bg-navy-500"
        >
          Go to Voice &amp; Personality
        </a>
      </div>
    );
  }

  const previewText = form.greeting.trim() || placeholderGreeting(form.company_name);
  const dirty = form.voice_id !== data.config.voice_id || form.greeting !== data.config.greeting;
  const ready = canContinue({ voiceSelected: Boolean(form.voice_id), hasPreviewedOnce });

  const handleContinue = async () => {
    if (!ready) return;
    setSaving(true);
    setSaveError(null);
    try {
      if (dirty) {
        await updateConfig({
          voice_id: form.voice_id,
          greeting: form.greeting,
          expected_version: data.version ?? undefined,
        });
      }
      router.push("/dashboard/voice?onboarded=1");
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Couldn't save — try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">
          Make Esmi sound like your front desk
        </h1>
        <p className="mt-1.5 text-sm leading-6 text-ink-2">
          Choose a voice and write a short greeting. Then hit Preview — you&apos;ll hear
          exactly what callers hear.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-sm">
        <div className="border-t border-line px-4 py-5 first:border-t-0 sm:px-6">
          <h2 className="font-display text-base font-semibold text-ink">Phone greeting</h2>
          <p className="mt-1 text-sm text-ink-3">
            Esmi opens with this line. Leave it blank to use the default opening below.
          </p>
          <textarea
            rows={3}
            maxLength={500}
            className="mt-4 w-full rounded-md border border-line bg-surface px-2.5 py-2 text-sm text-ink focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            value={form.greeting}
            onChange={(e) => setForm({ ...form, greeting: e.target.value })}
            placeholder={placeholderGreeting(form.company_name)}
          />
          <p className="mt-1 text-xs text-ink-4">{form.greeting.length}/500</p>
        </div>

        <div className="border-t border-line px-4 py-5 sm:px-6">
          <VoicePreviewPlayer
            voiceId={form.voice_id}
            voiceName="Esmi"
            speed={form.speed}
            language={form.language_pref}
            text={previewText}
            draft={dirty}
            onPreviewSuccess={() => setHasPreviewedOnce(true)}
          />
        </div>

        <div className="border-t border-line bg-surface-2 px-4 py-5 sm:px-6">
          <ul className="space-y-2.5">
            <ChecklistRow done label="Voice selected" />
            <ChecklistRow done={hasPreviewedOnce} label="Greeting previewed at least once" />
          </ul>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-line px-4 py-4 sm:px-6">
          <button
            type="button"
            disabled={!ready || saving}
            onClick={handleContinue}
            title={!ready ? CONTINUE_DISABLED_TOOLTIP : undefined}
            className="rounded-md bg-navy-600 px-4 py-2 text-sm font-medium text-white hover:bg-navy-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Saving…" : "Continue"}
          </button>
          {!ready && <span className="text-xs text-ink-4">{CONTINUE_DISABLED_TOOLTIP}</span>}
          {saveError && <span className="text-sm text-rose-600">{saveError}</span>}
        </div>
      </div>
    </div>
  );
}
