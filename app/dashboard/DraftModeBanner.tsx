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

  const copy = COPY[status.onboarding_status ?? ""] ?? FALLBACK;

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
        </div>
      </div>
    </div>
  );
}
