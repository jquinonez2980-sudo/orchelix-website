"use client";

import type { PlanKey } from "../lib/esmiPlatform";
import type { BusinessValues } from "./StepBusiness";
import type { ContactValues } from "./StepContact";
import {
  ErrorNote,
  GhostButton,
  NotLiveYetNotice,
  PrimaryButton,
} from "./wizardUi";

/* Step 3. Plan is genuinely optional — "Not sure yet" sends requested_plan:
   null, which the backend accepts. Whatever is picked here is only a REQUEST:
   every tenant is created on `managed` and an Orchelix admin assigns the real
   plan at approval time. The copy says so, so nobody thinks they've just
   bought something. */

const PLAN_CARDS: { key: PlanKey; name: string; minutes: string; blurb: string }[] = [
  {
    key: "local",
    name: "Esmi Local",
    minutes: "300 minutes / mo",
    blurb: "One location, straightforward booking and FAQs.",
  },
  {
    key: "pro",
    name: "Esmi Pro",
    minutes: "750 minutes / mo",
    blurb: "Busier phones, lead qualification, follow-up.",
  },
  {
    key: "enterprise",
    name: "Esmi Enterprise",
    minutes: "2,000 minutes / mo",
    blurb: "Multiple locations or high call volume.",
  },
];

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-2">
      <dt className="shrink-0 text-sm text-ink-3">{label}</dt>
      <dd className="text-right text-sm text-ink">{value || "—"}</dd>
    </div>
  );
}

export default function StepPlanReview({
  business,
  contact,
  plan,
  onPlanChange,
  onBack,
  onSubmit,
  submitting,
  error,
}: {
  business: BusinessValues;
  contact: ContactValues;
  plan: PlanKey | null;
  onPlanChange: (p: PlanKey | null) => void;
  onBack: () => void;
  onSubmit: () => void;
  submitting: boolean;
  error: string | null;
}) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-ink">
          Which plan looks right?
          <span className="ml-1 text-xs font-normal text-ink-3">(optional)</span>
        </p>
        <p className="mt-1 text-xs text-ink-3">
          Just a starting point — Orchelix confirms pricing with you before
          anything is billed.
        </p>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {PLAN_CARDS.map((p) => {
            const selected = plan === p.key;
            return (
              <button
                key={p.key}
                type="button"
                onClick={() => onPlanChange(selected ? null : p.key)}
                aria-pressed={selected}
                className={`rounded-xl border p-4 text-left transition ${
                  selected
                    ? "border-navy-400 bg-navy-50 ring-1 ring-navy-200"
                    : "border-line bg-surface hover:border-line-strong"
                }`}
              >
                <span className="block text-sm font-semibold text-ink">{p.name}</span>
                <span className="mt-0.5 block text-xs font-medium text-teal-700">
                  {p.minutes}
                </span>
                <span className="mt-1 block text-xs leading-5 text-ink-3">
                  {p.blurb}
                </span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => onPlanChange(null)}
            aria-pressed={plan === null}
            className={`rounded-xl border p-4 text-left transition ${
              plan === null
                ? "border-navy-400 bg-navy-50 ring-1 ring-navy-200"
                : "border-line bg-surface hover:border-line-strong"
            }`}
          >
            <span className="block text-sm font-semibold text-ink">Not sure yet</span>
            <span className="mt-1 block text-xs leading-5 text-ink-3">
              We&apos;ll recommend one after we talk.
            </span>
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-line bg-surface-2 p-4">
        <p className="text-sm font-medium text-ink">Review</p>
        <dl className="mt-1 divide-y divide-line">
          <Row label="Business" value={business.company_name} />
          <Row label="Timezone" value={business.business_tz.replace(/_/g, " ")} />
          <Row label="Contact" value={contact.contact_name} />
          <Row label="Email" value={contact.contact_email} />
          <Row label="Phone" value={contact.contact_phone} />
          <Row
            label="Plan requested"
            value={plan ? PLAN_CARDS.find((p) => p.key === plan)!.name : "Not sure yet"}
          />
        </dl>

        {/* Called out separately from the rows above because it's the one
            thing on this screen that can't be changed after submitting. */}
        <div className="mt-3 rounded-lg border border-line bg-surface px-3 py-2.5">
          <p className="text-xs uppercase tracking-wide text-ink-3">
            Your permanent Esmi address
          </p>
          <p className="mt-0.5 font-mono text-sm font-semibold text-ink">
            {business.tenant_id}
          </p>
          <p className="mt-1 text-xs text-ink-3">
            This can&apos;t be changed later. Go back if it isn&apos;t right.
          </p>
        </div>
      </div>

      <NotLiveYetNotice />

      {error && <ErrorNote>{error}</ErrorNote>}

      <div className="flex justify-between">
        <GhostButton onClick={onBack} disabled={submitting}>
          Back
        </GhostButton>
        <PrimaryButton onClick={onSubmit} disabled={submitting}>
          {submitting ? "Submitting…" : "Submit application"}
        </PrimaryButton>
      </div>
    </div>
  );
}
