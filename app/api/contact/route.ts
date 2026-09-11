/**
 * Contact form submission handler — sends email via Resend (app/lib/email.ts).
 *
 * SETUP (one-time): see RESEND_DOMAIN_SETUP.md at the repo root. Short version:
 * RESEND_API_KEY alone is not enough — the `orchelix.com` sending domain must
 * also be added and VERIFIED in the Resend dashboard, or every send here 502s.
 */

import { NextRequest, NextResponse } from "next/server";
import { MAIL_TO_INFO, sendTransactionalEmail } from "../../lib/email";
import { esc, layout, link, row } from "../../lib/emailLayout";

function buildHtml(fields: {
  name: string;
  company: string;
  email: string;
  phone: string;
  useCase: string;
  message: string;
}): string {
  const { name, company, email, phone, useCase, message } = fields;

  const submittedAt = new Date().toLocaleString("en-CA", {
    year: "numeric", month: "long", day: "numeric",
    hour: "2-digit", minute: "2-digit", timeZone: "America/New_York",
  });

  const e = esc(email);
  const subline = [company, email, phone].filter(Boolean).map(esc).join("&nbsp;&nbsp;·&nbsp;&nbsp;");

  return layout({
    title: "New lead — Orchelix",
    kicker: "New lead · Contact form",
    heading: esc(name),
    subline,
    rows:
      row("Name", esc(name)) +
      row("Company", esc(company)) +
      row("Email", link(`mailto:${e}`, e)) +
      (phone ? row("Phone", link(`tel:${esc(phone.replace(/[^\d+]/g, ""))}`, esc(phone))) : "") +
      row("Use case", esc(useCase)) +
      row("Submitted", esc(submittedAt) + " ET"),
    message: message ? esc(message).replace(/\n/g, "<br>") : undefined,
    replyHref: `mailto:${e}?subject=Re%3A%20Your%20Orchelix%20inquiry`,
    replyLabel: `Reply to ${esc(name)}`,
    footnote: `Replying goes straight to ${e}.`,
  });
}

function buildText(fields: {
  name: string; company: string; email: string;
  phone: string; useCase: string; message: string;
}): string {
  const { name, company, email, phone, useCase, message } = fields;
  return [
    "NEW LEAD — ORCHELIX",
    "=".repeat(40),
    `Name:     ${name}`,
    company ? `Company:  ${company}` : null,
    `Email:    ${email}`,
    phone ? `Phone:    ${phone}` : null,
    `Use case: ${useCase}`,
    message ? `\nMessage:\n${message}` : null,
    "\n" + "=".repeat(40),
    "Submitted via orchelix.com contact form.",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function POST(req: NextRequest) {
  // 1. Parse body — bad JSON is a client error, not a server error
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // 2. Extract and sanitise fields
  const name    = (body.name    as string | undefined)?.trim() ?? "";
  const company = (body.company as string | undefined)?.trim() ?? "";
  const email   = (body.email   as string | undefined)?.trim() ?? "";
  const phone   = (body.phone   as string | undefined)?.trim() ?? "";
  const useCase = (body.useCase as string | undefined)?.trim() ?? "";
  const message = (body.message as string | undefined)?.trim() ?? "";

  // 3. Validate required fields — tell the caller exactly what's missing
  const missing: string[] = [];
  if (!name)    missing.push("name");
  if (!email)   missing.push("email");
  if (!useCase) missing.push("useCase");
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required field(s): ${missing.join(", ")}.` },
      { status: 400 },
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  // 4. Send via the shared Resend helper (app/lib/email.ts)
  const result = await sendTransactionalEmail({
    to: MAIL_TO_INFO,
    replyTo: email,
    subject: `New lead: ${name}${company ? ` — ${company}` : ""}`,
    html: buildHtml({ name, company, email, phone, useCase, message }),
    text: buildText({ name, company, email, phone, useCase, message }),
    logTag: "[contact]",
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json({ ok: true });
}
