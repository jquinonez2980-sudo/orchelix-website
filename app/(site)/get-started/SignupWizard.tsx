"use client";

import { useCallback, useEffect, useState } from "react";
import { useClerk } from "@clerk/nextjs";
import {
  createClerkOrg,
  fetchMySignup,
  recordClerkOrg,
  submitSignup,
  type MySignup,
  type PlanKey,
} from "@/app/lib/esmiPlatform";
import StepBusiness, { initialBusiness, type BusinessValues } from "./StepBusiness";
import StepContact, { initialContact, type ContactValues } from "./StepContact";
import StepPlanReview from "./StepPlanReview";
import Submitted from "./Submitted";
import { track } from "@/app/lib/analytics";
import { Card, ErrorNote, PrimaryButton, Stepper } from "./wizardUi";

/* Submission is three network calls plus a client-side org switch:

     1  POST /api/platform/signup              reserve tenant + seed config
     2  POST .../signup/clerk-org-create       create the Clerk org (slug = tenant_id)
     3  POST .../signup/{tid}/clerk-org        record it -> onboarding_status 'review'
     4  setActive({ organization })            drop them into their new org

   Steps 1 and 2 both have durable side effects, so partial failure is a real
   state, not an edge case. If 2 fails we still call 3 with { error } so the
   provisioning step lands `failed` in the admin queue instead of sitting at
   `pending` forever — and because the tenant row now exists, a fresh attempt
   would hit the backend's one-application-per-user 409. That's what
   `needs_clerk_org` from /signup/mine is for: on mount we ask where the user
   actually is and resume from there rather than dead-ending them. */

type Phase =
  | { kind: "loading" }
  | { kind: "form" }
  | { kind: "resume"; mine: MySignup }
  | { kind: "submitted"; tenantId: string; enteredOrg: boolean };

export default function SignupWizard({
  defaultEmail,
  defaultName,
}: {
  defaultEmail: string;
  defaultName: string;
}) {
  const { setActive } = useClerk();

  const [phase, setPhase] = useState<Phase>({ kind: "loading" });
  const [step, setStep] = useState(0);
  const [business, setBusiness] = useState<BusinessValues>(initialBusiness);
  const [contact, setContact] = useState<ContactValues>(() =>
    initialContact(defaultEmail, defaultName),
  );
  const [plan, setPlan] = useState<PlanKey | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetchMySignup()
      .then((mine) => {
        if (!active) return;
        if (!mine.tenant) {
          setPhase({ kind: "form" });
        } else if (mine.needs_clerk_org) {
          setPhase({ kind: "resume", mine });
        } else {
          setPhase({
            kind: "submitted",
            tenantId: mine.tenant.tenant_id,
            enteredOrg: Boolean(mine.tenant.clerk_org_id),
          });
        }
      })
      .catch((e: Error) => {
        if (!active) return;
        // Can't tell whether they've applied — let them proceed. A duplicate
        // submit is refused server-side with a clear 409, which is a better
        // outcome than blocking a first-time applicant behind a read error.
        setError(e.message);
        setPhase({ kind: "form" });
      });
    return () => {
      active = false;
    };
  }, []);

  /* Steps 2-4. Split out because the resume path re-enters here with a tenant
     that already exists, skipping step 1 entirely. */
  const finishOrgSetup = useCallback(
    async (tenantId: string, companyName: string) => {
      let orgId: string;
      try {
        const org = await createClerkOrg(tenantId, companyName);
        orgId = org.clerk_org_id;
      } catch (e) {
        const message = (e as Error).message;
        // Best-effort: tell the backend so the step shows as failed for staff.
        await recordClerkOrg(tenantId, { error: message }).catch(() => {});
        throw new Error(
          `${message} Your application is saved — reload this page to pick up where you left off.`,
        );
      }

      await recordClerkOrg(tenantId, { clerk_org_id: orgId });

      // Non-fatal: membership can take a moment to propagate. If it doesn't
      // take, they can still pick the org from the dashboard switcher.
      let enteredOrg = false;
      try {
        await setActive({ organization: orgId });
        enteredOrg = true;
      } catch {
        enteredOrg = false;
      }
      return enteredOrg;
    },
    [setActive],
  );

  async function handleSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await submitSignup({
        company_name: business.company_name.trim(),
        tenant_id: business.tenant_id.trim(),
        business_tz: business.business_tz,
        contact_name: contact.contact_name.trim(),
        contact_email: contact.contact_email.trim(),
        contact_phone: contact.contact_phone.trim(),
        requested_plan: plan,
      });
      // Use the slug the SERVER reserved, never the local one — they differ
      // whenever a collision was resolved between the last check and submit.
      const tenantId = res.next?.slug || res.tenant_id;
      const enteredOrg = await finishOrgSetup(tenantId, business.company_name.trim());
      track("get_started_submit");
      setPhase({ kind: "submitted", tenantId, enteredOrg });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleResume(mine: MySignup) {
    if (!mine.tenant) return;
    setSubmitting(true);
    setError(null);
    try {
      const enteredOrg = await finishOrgSetup(
        mine.tenant.tenant_id,
        mine.tenant.company_name ?? mine.tenant.tenant_id,
      );
      setPhase({ kind: "submitted", tenantId: mine.tenant.tenant_id, enteredOrg });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  if (phase.kind === "loading") {
    return (
      <main className="mx-auto max-w-xl px-4 py-16 sm:px-6">
        <p className="text-sm text-ink-3">Loading…</p>
      </main>
    );
  }

  if (phase.kind === "submitted") {
    return <Submitted tenantId={phase.tenantId} enteredOrg={phase.enteredOrg} />;
  }

  if (phase.kind === "resume") {
    const name = phase.mine.tenant?.company_name ?? phase.mine.tenant?.tenant_id;
    return (
      <main className="mx-auto max-w-xl px-4 py-10 sm:px-6 sm:py-16">
        <Card>
          <h1 className="font-display text-xl font-semibold tracking-tight text-ink">
            Let&apos;s finish setting up {name}
          </h1>
          <p className="mt-2 text-sm leading-6 text-ink-2">
            Your application is saved, but we didn&apos;t finish creating your
            workspace last time. Pick up where you left off — nothing needs
            re-entering.
          </p>
          {error && (
            <div className="mt-4">
              <ErrorNote>{error}</ErrorNote>
            </div>
          )}
          <div className="mt-5">
            <PrimaryButton
              onClick={() => handleResume(phase.mine)}
              disabled={submitting}
            >
              {submitting ? "Finishing…" : "Finish setup"}
            </PrimaryButton>
          </div>
        </Card>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-10 sm:px-6 sm:py-16">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">
          Get started with Esmi
        </h1>
        <p className="mt-1.5 text-sm leading-6 text-ink-2">
          Tell us about your business. Orchelix reviews every application before
          your line goes live.
        </p>
      </div>

      <Stepper current={step} />

      <Card>
        {step === 0 && (
          <StepBusiness
            values={business}
            onChange={setBusiness}
            onNext={() => setStep(1)}
          />
        )}
        {step === 1 && (
          <StepContact
            values={contact}
            onChange={setContact}
            onBack={() => setStep(0)}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <StepPlanReview
            business={business}
            contact={contact}
            plan={plan}
            onPlanChange={setPlan}
            onBack={() => setStep(1)}
            onSubmit={handleSubmit}
            submitting={submitting}
            error={error}
          />
        )}
      </Card>
    </main>
  );
}
