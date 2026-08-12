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
            <h1 className="font-display text-xl font-semibold tracking-tight text-ink uppercase">
              Application submitted
            </h1>
            <p className="mt-1.5 text-sm leading-6 text-ink-2">
              Your operator workspace is ready at{" "}
              <span className="font-mono font-medium text-ink">{tenantId}</span>.
              Set it up now — the night register stays empty of real traffic
              until Orchelix activates your line.
            </p>
          </div>
        </div>

        <ol className="mt-6 space-y-4 border-t border-line pt-5" style={{ listStyle: "none", paddingLeft: 0 }}>
          <li className="flex items-start gap-3">
            <Check />
            <div>
              <p className="text-sm font-medium text-ink">01 · Account created</p>
              <p className="mt-0.5 text-xs leading-5 text-ink-3">
                Dashboard open — hours, knowledge, and voice preview are yours to
                fill.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Pending />
            <div>
              <p className="text-sm font-medium text-ink">02 · Orchelix review</p>
              <p className="mt-0.5 text-xs leading-5 text-ink-3">
                A senior consultant checks details and wires your number,
                assistant, and calendar. Usually one business day.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Pending />
            <div>
              <p className="text-sm font-medium text-ink">03 · Live register</p>
              <p className="mt-0.5 text-xs leading-5 text-ink-3">
                When activated, every call lands on the operator register — with
                transcript, reason, and disposition. Nothing is billed before
                then.
              </p>
            </div>
          </li>
        </ol>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-5">
          <a
            href="/dashboard/onboarding/voice"
            className="lg-stamp lg-foil-surface inline-flex px-5 py-2.5 text-sm font-semibold"
            style={{
              fontFamily: "var(--font-display)",
              fontStretch: "88%",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              borderRadius: 0,
              color: "var(--lg-foil-ink)",
              textDecoration: "none",
            }}
          >
            Preview voice &amp; greeting
          </a>
          <a
            href="/dashboard"
            className="inline-flex border border-line px-5 py-2.5 text-sm font-medium text-ink-2 transition hover:bg-surface-2"
            style={{
              fontFamily: "var(--font-display)",
              fontStretch: "88%",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              borderRadius: 0,
              textDecoration: "none",
            }}
          >
            Open night register
          </a>
          <a
            href="/dashboard/knowledge"
            className="text-sm font-medium text-ink-2 underline hover:text-ink"
          >
            Add knowledge
          </a>
        </div>
        {!enteredOrg && (
          <p className="mt-4 text-xs text-ink-3">
            If the dashboard asks you to choose a business, pick{" "}
            <span className="font-mono">{tenantId}</span> from the switcher.
          </p>
        )}
      </Card>
    </main>
  );
}
