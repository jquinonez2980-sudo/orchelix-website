"use client";

import { Card } from "./wizardUi";

/* Terminal state. Deliberately does NOT say "you're live" or "setup complete"
   — the tenant sits at onboarding_status 'review' and tenants.tenant_is_active()
   refuses it real traffic until an Orchelix admin approves. The copy has to
   match that exactly, or the first missed call becomes a support ticket. */

function Check() {
  return (
    <span
      aria-hidden
      className="flex h-6 w-6 shrink-0 items-center justify-center border border-navy-600 bg-navy-600 text-xs font-semibold text-white"
      style={{ borderRadius: 0 }}
    >
      ✓
    </span>
  );
}

function Pending() {
  return (
    <span
      aria-hidden
      className="flex h-6 w-6 shrink-0 items-center justify-center border border-line bg-surface-2 text-xs font-semibold text-ink-3"
      style={{ borderRadius: 0 }}
    >
      •
    </span>
  );
}

export default function Submitted({
  tenantId,
  enteredOrg,
}: {
  tenantId: string;
  enteredOrg: boolean;
}) {
  return (
    <main className="mx-auto max-w-xl px-4 py-10 sm:px-6 sm:py-16">
      <Card>
        <div className="flex items-start gap-3">
          <Check />
          <div>
            <h1 className="font-display text-xl font-semibold tracking-tight text-ink">
              Application submitted
            </h1>
            <p className="mt-1.5 text-sm leading-6 text-ink-2">
              Your workspace is ready at{" "}
              <span className="font-mono font-medium text-ink">{tenantId}</span>.
              You can start setting things up right away.
            </p>
          </div>
        </div>

        <ul className="mt-6 space-y-4 border-t border-line pt-5">
          <li className="flex items-start gap-3">
            <Check />
            <div>
              <p className="text-sm font-medium text-ink">Account created</p>
              <p className="mt-0.5 text-xs leading-5 text-ink-3">
                Your dashboard is open — add your hours, services, and knowledge
                base whenever you like.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Pending />
            <div>
              <p className="text-sm font-medium text-ink">Orchelix review</p>
              <p className="mt-0.5 text-xs leading-5 text-ink-3">
                Our team checks your details and sets up your phone number,
                voice assistant, and calendar. We&apos;ll email you when
                it&apos;s done — usually within one business day.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Pending />
            <div>
              <p className="text-sm font-medium text-ink">Going live</p>
              <p className="mt-0.5 text-xs leading-5 text-ink-3">
                Until we activate your account, Esmi will not answer calls or
                chats for your business. Nothing is billed before then.
              </p>
            </div>
          </li>
        </ul>

        <div className="mt-6 flex flex-wrap gap-3 border-t border-line pt-5">
          <a
            href="/dashboard/onboarding/voice"
            className="inline-flex rounded-lg bg-navy-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-700"
          >
            Preview your voice &amp; greeting
          </a>
          <a
            href="/dashboard"
            className="inline-flex rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-ink-2 transition hover:bg-surface-2"
          >
            Go to your dashboard
          </a>
          {!enteredOrg && (
            <p className="mt-2 text-xs text-ink-3">
              If your dashboard asks you to choose a business, pick{" "}
              <span className="font-mono">{tenantId}</span> from the switcher.
            </p>
          )}
        </div>
      </Card>
    </main>
  );
}
