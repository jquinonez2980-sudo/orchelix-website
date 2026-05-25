/**
 * Contact form submission handler — sends email via Resend.
 *
 * SETUP (one-time):
 *   1. Create a free account at https://resend.com
 *   2. Verify your sending domain (orchelix.com) in Resend → Domains
 *   3. Create an API key → Resend → API Keys → Create API Key
 *   4. In Vercel → Project → Settings → Environment Variables, add:
 *        RESEND_API_KEY = re_xxxxxxxxxxxxxxxxxxxx
 *      and redeploy.
 */

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO_ADDRESS = "info@orchelix.com";
const FROM_ADDRESS = "Orchelix Website <noreply@orchelix.com>";

function buildHtml(fields: {
  name: string;
  company: string;
  email: string;
  phone: string;
  useCase: string;
  message: string;
}): string {
  const { name, company, email, phone, useCase, message } = fields;

  const row = (label: string, value: string) =>
    value
      ? `<tr>
          <td style="padding:10px 0;border-bottom:1px solid #E8EDF2;width:130px;vertical-align:top;
                     font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
                     font-size:13px;font-weight:600;color:#0A2540;white-space:nowrap;">
            ${label}
          </td>
          <td style="padding:10px 0 10px 16px;border-bottom:1px solid #E8EDF2;vertical-align:top;
                     font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
                     font-size:14px;color:#3F5570;line-height:1.5;">
            ${value.replace(/\n/g, "<br>")}
          </td>
        </tr>`
      : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>New lead — Orchelix</title>
</head>
<body style="margin:0;padding:0;background:#F4F6F9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
         style="background:#F4F6F9;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation"
               style="max-width:600px;width:100%;border-radius:12px;overflow:hidden;
                      box-shadow:0 2px 12px rgba(10,37,64,0.10);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0A2540 0%,#0D2E4D 100%);
                       padding:28px 36px;border-bottom:3px solid #14B8A6;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td>
                    <span style="font-size:20px;font-weight:700;color:#FFFFFF;
                                 letter-spacing:-0.02em;">Orchelix</span>
                    <span style="font-size:11px;font-weight:500;color:rgba(255,255,255,0.5);
                                 letter-spacing:0.14em;text-transform:uppercase;
                                 margin-left:10px;">AI Consulting</span>
                  </td>
                  <td align="right">
                    <span style="display:inline-block;background:rgba(20,184,166,0.18);
                                 color:#14B8A6;font-size:11px;font-weight:600;
                                 letter-spacing:0.1em;text-transform:uppercase;
                                 padding:5px 12px;border-radius:999px;
                                 border:1px solid rgba(20,184,166,0.30);">
                      New Lead
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#FFFFFF;padding:36px 36px 28px;">
              <p style="margin:0 0 6px;font-size:22px;font-weight:600;color:#0A2540;
                         letter-spacing:-0.018em;">
                ${name} wants to connect
              </p>
              <p style="margin:0 0 28px;font-size:14px;color:#6D7F95;line-height:1.5;">
                Submitted via the Orchelix website contact form.
                Reply directly to this email to reach ${name}.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                ${row("Name", name)}
                ${row("Company", company)}
                ${row("Email", `<a href="mailto:${email}" style="color:#0D9488;text-decoration:none;">${email}</a>`)}
                ${row("Phone", phone ? `<a href="tel:${phone}" style="color:#0D9488;text-decoration:none;">${phone}</a>` : "")}
                ${row("Use case", useCase)}
                ${row("Message", message)}
              </table>
            </td>
          </tr>

          <!-- Quick-reply CTA -->
          <tr>
            <td style="background:#F8FAFC;padding:20px 36px;border-top:1px solid #E8EDF2;">
              <table cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="border-radius:8px;background:#0A2540;">
                    <a href="mailto:${email}?subject=Re: Your Orchelix inquiry"
                       style="display:inline-block;padding:11px 22px;
                              font-size:13px;font-weight:600;color:#FFFFFF;
                              text-decoration:none;letter-spacing:0.01em;">
                      Reply to ${name} →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#F0F3F7;padding:16px 36px;border-top:1px solid #E2E8F0;">
              <p style="margin:0;font-size:11px;color:#94A3B8;line-height:1.6;">
                This message was sent from the contact form at orhelix.com.<br>
                Orchelix AI Consulting Inc. · Greater Toronto Area, Ontario, Canada
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
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
    "Submitted via orhelix.com contact form.",
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

  // 4. Check API key before touching Resend
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set — add it in Vercel → Settings → Environment Variables and redeploy.");
    return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
  }

  // 5. Send via Resend
  try {
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [TO_ADDRESS],
      replyTo: email,
      subject: `New lead: ${name}${company ? ` — ${company}` : ""}`,
      html: buildHtml({ name, company, email, phone, useCase, message }),
      text: buildText({ name, company, email, phone, useCase, message }),
    });

    if (error) {
      // Log the full Resend error (name + message + statusCode) for Vercel function logs
      console.error(
        `[contact] Resend rejected the request — name: ${error.name}, message: ${error.message}`,
      );
      return NextResponse.json(
        { error: "Failed to send your message. Please email us directly at info@orchelix.com." },
        { status: 500 },
      );
    }

    console.log(`[contact] Email sent — Resend ID: ${data?.id}, to: ${email}`);
    return NextResponse.json({ ok: true });

  } catch (err) {
    // Network failure, timeout, or unexpected Resend SDK error
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[contact] Unexpected error calling Resend: ${message}`);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again or email us at info@orchelix.com." },
      { status: 500 },
    );
  }
}
