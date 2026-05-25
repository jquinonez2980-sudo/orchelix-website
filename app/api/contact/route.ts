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
const FROM_ADDRESS = "Orchelix <noreply@orchelix.com>";

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
    hour: "2-digit", minute: "2-digit", timeZone: "America/Toronto",
  });

  // isLast removes the bottom border so it doesn't double up with the card border
  const fieldRow = (label: string, value: string, isLast = false) =>
    value.trim()
      ? `<tr>
          <td style="padding:14px 20px;${isLast ? "" : "border-bottom:1px solid #EEF2F6;"}
                     width:110px;vertical-align:top;
                     font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
                     font-size:10px;font-weight:700;color:#94A3B8;
                     letter-spacing:0.12em;text-transform:uppercase;white-space:nowrap;">
            ${label}
          </td>
          <td style="padding:14px 20px;${isLast ? "" : "border-bottom:1px solid #EEF2F6;"}
                     vertical-align:top;
                     font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
                     font-size:14px;font-weight:500;color:#0A2540;line-height:1.55;">
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
  <style>
    @media only screen and (max-width:600px) {
      .ow { padding:12px 8px !important; }
      .hp { padding:20px 22px 0 !important; }
      .bp { padding:24px 22px !important; }
      .cp { padding:20px 22px !important; }
      .fp { padding:18px 22px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#EEF2F6;">

  <table class="ow" width="100%" cellpadding="0" cellspacing="0" role="presentation"
         style="background:#EEF2F6;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation"
               style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;
                      box-shadow:0 4px 24px rgba(10,37,64,0.14),0 1px 4px rgba(10,37,64,0.06);">

          <!-- ── HEADER ── -->
          <tr>
            <td class="hp" style="background:#0A2540;padding:26px 36px 0;">

              <!-- Logo + NEW LEAD badge -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="vertical-align:middle;padding-bottom:26px;">
                    <span style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
                                 font-size:22px;font-weight:700;color:#FFFFFF;
                                 letter-spacing:-0.03em;">Orchelix</span>
                    <span style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
                                 font-size:11px;font-weight:600;color:#14B8A6;
                                 letter-spacing:0.14em;text-transform:uppercase;
                                 margin-left:10px;vertical-align:middle;">AI Consulting</span>
                  </td>
                  <td align="right" style="vertical-align:middle;padding-bottom:26px;">
                    <table cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td style="background:rgba(20,184,166,0.14);
                                   border:1px solid rgba(20,184,166,0.32);
                                   border-radius:999px;padding:6px 14px;">
                          <span style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
                                       font-size:10px;font-weight:700;color:#2DD4BF;
                                       letter-spacing:0.16em;text-transform:uppercase;">
                            &#9679;&nbsp; New Lead
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Teal accent line -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="height:2px;background:#14B8A6;font-size:0;line-height:0;">&nbsp;</td>
                </tr>
              </table>

              <!-- Hero: name + summary line -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="padding:28px 0 32px;">
                    <p style="margin:0 0 6px;
                               font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
                               font-size:10px;font-weight:700;color:#14B8A6;
                               letter-spacing:0.16em;text-transform:uppercase;">
                      New submission
                    </p>
                    <h1 style="margin:0 0 10px;
                                font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
                                font-size:30px;font-weight:700;color:#FFFFFF;
                                letter-spacing:-0.025em;line-height:1.1;">
                      ${name}
                    </h1>
                    <p style="margin:0;
                               font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
                               font-size:13px;color:rgba(255,255,255,0.48);line-height:1.6;">
                      ${company ? `${company}&nbsp;&nbsp;&middot;&nbsp;&nbsp;` : ""}${email}${phone ? `&nbsp;&nbsp;&middot;&nbsp;&nbsp;${phone}` : ""}
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ── BODY ── -->
          <tr>
            <td class="bp" style="background:#FFFFFF;padding:32px 36px;">

              <p style="margin:0 0 14px;
                         font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
                         font-size:10px;font-weight:700;color:#94A3B8;
                         letter-spacing:0.14em;text-transform:uppercase;">
                Submission details
              </p>

              <!-- Details card -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                     style="border:1px solid #E8EDF2;border-radius:10px;overflow:hidden;">
                ${fieldRow("Name",     name,    false)}
                ${fieldRow("Company",  company, false)}
                ${fieldRow("Email",    `<a href="mailto:${email}" style="color:#0D9488;text-decoration:none;">${email}</a>`, false)}
                ${phone   ? fieldRow("Phone",    `<a href="tel:${phone}" style="color:#0D9488;text-decoration:none;">${phone}</a>`, false) : ""}
                ${fieldRow("Use case", useCase, true)}
              </table>

              ${message ? `
              <!-- Message card -->
              <p style="margin:28px 0 14px;
                         font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
                         font-size:10px;font-weight:700;color:#94A3B8;
                         letter-spacing:0.14em;text-transform:uppercase;">
                Message
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                     style="border:1px solid #E8EDF2;border-radius:10px;overflow:hidden;">
                <tr>
                  <td style="padding:20px 22px;background:#F8FAFC;">
                    <p style="margin:0;
                               font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
                               font-size:14px;color:#3F5570;line-height:1.75;font-style:italic;">
                      &ldquo;${message.replace(/\n/g, "<br>")}&rdquo;
                    </p>
                  </td>
                </tr>
              </table>` : ""}

            </td>
          </tr>

          <!-- ── CTA ── -->
          <tr>
            <td class="cp" style="background:#F8FAFC;padding:24px 36px;border-top:1px solid #E8EDF2;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="border-radius:10px;background:#0A2540;text-align:center;">
                    <a href="mailto:${email}?subject=Re%3A%20Your%20Orchelix%20inquiry"
                       style="display:block;padding:16px 24px;
                              font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
                              font-size:14px;font-weight:600;color:#FFFFFF;
                              text-decoration:none;letter-spacing:0.01em;">
                      Reply to ${name} &rarr;
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:12px 0 0;text-align:center;
                         font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
                         font-size:12px;color:#94A3B8;line-height:1.5;">
                Clicking reply sends directly to <strong style="color:#6D7F95;">${email}</strong>
              </p>
            </td>
          </tr>

          <!-- ── FOOTER ── -->
          <tr>
            <td class="fp" style="background:#081D33;padding:22px 36px;border-top:2px solid #14B8A6;">
              <p style="margin:0 0 4px;
                         font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
                         font-size:12px;font-weight:600;color:rgba(255,255,255,0.55);">
                Orchelix AI Consulting Inc.
              </p>
              <p style="margin:0;
                         font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
                         font-size:11px;color:rgba(255,255,255,0.28);line-height:1.7;">
                Greater Toronto Area, Ontario, Canada
                &nbsp;&middot;&nbsp;
                <a href="https://orhelix.com" style="color:rgba(255,255,255,0.35);text-decoration:none;">orhelix.com</a>
                &nbsp;&middot;&nbsp; Submitted ${submittedAt}
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
