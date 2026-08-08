"use client";

import { Field, GhostButton, PrimaryButton, inputCls } from "./wizardUi";

export type ContactValues = {
  contact_name: string;
  contact_email: string;
  contact_phone: string;
};

/* Mirrors platform_api/signup.py's _EMAIL_RE closely enough to catch typos
   client-side; the backend remains the authority and will 400 on anything
   this lets through. */
const EMAIL_RE = /^[^@\s]+@[^@\s.]+\.[^@\s]+$/;

export function initialContact(email: string, name: string): ContactValues {
  return { contact_name: name, contact_email: email, contact_phone: "" };
}

export default function StepContact({
  values,
  onChange,
  onBack,
  onNext,
}: {
  values: ContactValues;
  onChange: (v: ContactValues) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const emailOk = EMAIL_RE.test(values.contact_email.trim());
  const showEmailError = values.contact_email.length > 0 && !emailOk;

  return (
    <div className="space-y-5">
      <Field label="Your name" required>
        <input
          className={inputCls}
          value={values.contact_name}
          onChange={(e) => onChange({ ...values, contact_name: e.target.value })}
          placeholder="Ana Ruiz"
          autoFocus
        />
      </Field>

      <Field
        label="Email"
        required
        hint="Where booking and escalation notices go, and how we'll reach you about this application."
        error={showEmailError ? "That doesn't look like a valid email address." : null}
      >
        <input
          className={inputCls}
          type="email"
          value={values.contact_email}
          onChange={(e) => onChange({ ...values, contact_email: e.target.value })}
          placeholder="you@yourbusiness.com"
        />
      </Field>

      <Field
        label="Phone"
        hint="The number a caller should be transferred to if Esmi needs to hand off."
      >
        <input
          className={inputCls}
          type="tel"
          value={values.contact_phone}
          onChange={(e) => onChange({ ...values, contact_phone: e.target.value })}
          placeholder="+1 416 555 0110"
        />
      </Field>

      <div className="flex justify-between pt-2">
        <GhostButton onClick={onBack}>Back</GhostButton>
        <PrimaryButton
          onClick={onNext}
          disabled={!values.contact_name.trim() || !emailOk}
        >
          Continue
        </PrimaryButton>
      </div>
    </div>
  );
}
