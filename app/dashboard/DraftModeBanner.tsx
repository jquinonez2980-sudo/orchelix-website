"use client";

import { useEffect, useState } from "react";
import { fetchTenantStatus, type TenantStatus } from "../lib/esmiPlatform";

/* Persistent "not live yet" banner for tenants still in onboarding.

   Lives in the shell rather than on the Overview page so it appears on EVERY
   dashboard page — someone editing hours or uploading knowledge docs should
   not have to navigate back to Overview to be reminded their phone isn't
   answering yet.

   NOT dismissible on purpose. This is a statement of fact about the account's
   current capability, not a notification; hiding it would let someone browse
   a fully-populated-looking dashboard believing Esmi is taking their calls.
   It disappears by itself the moment an admin approves the tenant.

   Fail-quiet: any error (including the 400 an unknown/legacy tenant gets from
   require_tenant) renders nothing. A banner that can't confirm its own premise
   should not be guessing. */

/* Billing-state copy, checked only once onboarding is 'active'. A tenant can
   be fully onboarded and still off the air: suspended/archived block traffic
   too (tenants.BLOCKING_ACCOUNT_STATUSES). Without these, an admin could
   suspend an account and its owner would see a normal, healthy-looking
   dashboard while Esmi silently stopped answering. */
const ACCOUNT_COPY: Record<string, { title: string; body: string }> = {
  suspended: {
    title: "Your account is suspended",
    body: "Esmi isn't answering calls or chats for your business right now. Get in touch with Orchelix to get back online — your settings and history are all still here.",
  },
  archived: {
    title: "This account is closed",
    body: "Esmi isn't answering calls or chats for your business. Your settings and history are still here — contact Orchelix if you'd like to reopen it.",
  },
};

const COPY: Record<string, { title: string; body: string }> = {
  draft: {
    title: "Your application isn't finished",
    body: "Finish signing up to send your business to Orchelix for review.",
  },
  submitted: {
    title: "Waiting for Orchelix review",
    body: "We've got your application. Esmi won't answer calls or chats for your business until our team activates it — we'll email you when that's done.",
  },
  provisioning: {
    title: "Orchelix is setting up your account",
    body: "We're configuring your phone number, voice assistant, and calendar. Esmi won't answer calls or chats until that's finished and activated.",
  },
  review: {
    title: "Waiting for Orchelix review",
    body: "Your setup is being checked by our team. Esmi won't answer calls or chats for your business until it's activated — we'll email you when that's done.",
  },
  rejected: {
    title: "This account isn't active",
    body: "Orchelix didn't activate this business. Get in touch if you think that's a mistake.",
  },
};

const FALLBACK = {
  title: "This account isn't live yet",
  body: "Esmi won't answer calls or chats for your business until Orchelix activates it.",
};

export default function DraftModeBanner() {
  const [status, setStatus] = useState<TenantStatus | null>(null);

  useEffect(() => {
    let active = true;
    fetchTenantStatus()
      .then((s) => {
        if (active) setStatus(s);
      })
      .catch(() => {
        /* fail-quiet — see the note above */
      });
    return () => {
      active = false;
    };
  }, []);

  if (!status || status.can_serve_traffic) return null;

  /* Precedence: an unfinished onboarding is the more specific and more
     actionable explanation, so it wins. Billing copy only applies to a tenant
     that got all the way through approval and was later switched off. */
  const midOnboarding = Boolean(status.onboarding_status && status.onboarding_status !== "active");
  const copy = midOnboarding
    ? (COPY[status.onboarding_status as string] ?? FALLBACK)
    : (ACCOUNT_COPY[status.account_status ?? ""] ?? FALLBACK);

  // Onboarding voice gate (docs/ESMI_DASHBOARD_UX.md Section 7 Step 3) — a
  // reachable link from anywhere in the dashboard while onboarding is
  // incomplete, since this banner is the one thing every dashboard page
  // already renders for exactly this population.
  const showVoiceCta = midOnboarding && !status.onboarding_voice_previewed;

  return (
    <div
      role="status"
      className="border-b border-amber-200 bg-amber-50 px-4 py-3 sm:px-6"
    >
      <div className="mx-auto flex max-w-6xl items-start gap-3">
        <span
          aria-hidden
          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-400 text-[11px] font-bold text-amber-950"
        >
          !
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-amber-900">{copy.title}</p>
          <p className="mt-0.5 text-xs leading-5 text-amber-800">{copy.body}</p>
          {showVoiceCta && (
            <a
              href="/dashboard/onboarding/voice"
              className="mt-1.5 inline-block text-xs font-semibold text-amber-900 underline underline-offset-2"
            >
              Preview your voice &amp; greeting →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
