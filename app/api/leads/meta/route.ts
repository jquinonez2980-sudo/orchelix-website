/**
 * Meta ad lead capture — /missed-calls landing page form handler.
 *
 * Same provider as app/api/contact/route.ts (Resend) rather than inventing a
 * second email pipeline: one RESEND_API_KEY, one place that knows how to send
 * a lead notification.
 *
 * SETUP: none beyond what app/api/contact/route.ts already needs —
 * RESEND_API_KEY must be set in Vercel (it already is, for the contact form).
 *
 * FUTURE (non-goal for this ticket, wired for later): to forward leads into a
 * HighLevel / Loops sequence instead of (or in addition to) email, set
 * LEAD_WEBHOOK_URL to that provider's inbound webhook URL — see
 * forwardToWebhook() below. Left unset today; nothing here depends on it.
 */

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO_ADDRESS = "info@orchelix.com";
const FROM_ADDRESS = "Orchelix <noreply@orchelix.com>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const BUSINESS_TYPE_LABELS: Record<string, string> = {
  barbershop_salon: "Barbershop / salon",
  clinic_dental: "Clinic / dental",
  hvac_trades: "HVAC / trades",
  real_estate: "Real estate / property",
  other: "Other",
};

/* In-memory per-IP window — blunts a hot loop from one client, same caveat as
   platform_api/signup.py's _signup_hits on the backend: this resets per cold
   start and doesn't share state across Vercel's serverless instances, so it
   is NOT a durable guarantee. Good enough for a public ad-traffic form with
   no auth in front of it; a real abuse control belongs at the CDN/WAF layer
   if this ever needs one. */
const RATE_WINDOW_MS = 60_000;
const RATE_MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_MAX_PER_WINDOW;
}

function buildHtml(fields: {
  firstName: string;
  email: string;
  businessTypeLabel: string | null;
  source: string;
  utmSource: string | null;
  utmCampaign: string | null;
}): string {
  const { firstName, email, businessTypeLabel, source, utmSource, utmCampaign } = fields;
  const submittedAt = new Date().toLocaleString("en-CA", {
    year: "numeric", month: "long", day: "numeric",
    hour: "2-digit", minute: "2-digit", timeZone: "America/New_York",
  });

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:12px 20px;border-bottom:1px solid #EEF2F6;width:110px;vertical-align:top;
                 font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
                 font-size:10px;font-weight:700;color:#94A3B8;letter-spacing:0.12em;
                 text-transform:uppercase;white-space:nowrap;">${label}</td>
      <td style="padding:12px 20px;border-bottom:1px solid #EEF2F6;vertical-align:top;
                 font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
                 font-size:14px;font-weight:500;color:#0A2540;">${value}</td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#EEF2F6;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#EEF2F6;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" role="presentation"
             style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;
                    box-shadow:0 4px 24px rgba(10,37,64,0.14);">
        <tr>
          <td style="background:#0A2540;padding:26px 36px;">
            <span style="display:inline-block;background:rgba(0,240,255,0.14);border:1px solid rgba(0,240,255,0.32);
                         border-radius:999px;padding:6px 14px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
                         font-size:10px;font-weight:700;color:#00F0FF;letter-spacing:0.16em;text-transform:uppercase;">
              Meta ad lead
            </span>
            <h1 style="margin:16px 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
                       font-size:28px;font-weight:700;color:#FFFFFF;">${firstName}</h1>
            <p style="margin:6px 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
                      font-size:13px;color:rgba(255,255,255,0.5);">${email}</p>
          </td>
        </tr>
        <tr>
          <td style="background:#FFFFFF;padding:28px 36px;">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
                   style="border:1px solid #E8EDF2;border-radius:10px;overflow:hidden;">
              ${row("Source", source)}
              ${businessTypeLabel ? row("Business type", businessTypeLabel) : ""}
              ${utmSource ? row("UTM source", utmSource) : ""}
              ${utmCampaign ? row("UTM campaign", utmCampaign) : ""}
              ${row("Submitted", submittedAt)}
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#F8FAFC;padding:20px 36px;border-top:1px solid #E8EDF2;">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr><td style="border-radius:10px;background:#0A2540;text-align:center;">
                <a href="mailto:${email}" style="display:block;padding:14px 24px;
                   font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
                   font-size:14px;font-weight:600;color:#FFFFFF;text-decoration:none;">
                  Reply to ${firstName} &rarr;
                </a>
              </td></tr>
            </table>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/* Optional forward to a HighLevel / Loops (or any) inbound webhook. Never
   awaited into the response — a slow or dead webhook must not delay or fail
   the lead's redirect to the demo. Fully fail-soft, logs only. */
function forwardToWebhook(payload: Record<string, unknown>): void {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return;
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch((err) => {
    console.error(`[leads/meta] LEAD_WEBHOOK_URL forward failed: ${err instanceof Error ? err.message : err}`);
  });
}

export async function POST(req: NextRequest) {
  // Vercel sets x-forwarded-for to the real visitor IP (see app/api/chat/route.ts).
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many attempts — please try again in a minute." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const firstName = (body.first_name as string | undefined)?.trim() ?? "";
  const email = (body.email as string | undefined)?.trim() ?? "";
  const businessTypeRaw = (body.business_type as string | undefined)?.trim() || null;
  const source = (body.source as string | undefined)?.trim() || "meta_missed_calls";
  const utmSource = (body.utm_source as string | undefined)?.trim() || null;
  const utmCampaign = (body.utm_campaign as string | undefined)?.trim() || null;

  if (!firstName) {
    return NextResponse.json({ error: "First name is required." }, { status: 400 });
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  }
  // Unknown business_type values are dropped rather than rejected — a stale
  // ad creative pointing at an old option set shouldn't 400 a real lead.
  const businessTypeLabel = businessTypeRaw ? BUSINESS_TYPE_LABELS[businessTypeRaw] ?? null : null;

  const payload = {
    first_name: firstName,
    email,
    business_type: businessTypeRaw,
    source,
    utm_source: utmSource,
    utm_campaign: utmCampaign,
    submitted_at: new Date().toISOString(),
  };
  forwardToWebhook(payload);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[leads/meta] RESEND_API_KEY is not set — lead not emailed (webhook forward, if configured, still attempted).");
    return NextResponse.json({ error: "Lead capture is not configured." }, { status: 500 });
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [TO_ADDRESS],
      replyTo: email,
      subject: `New Meta lead: ${firstName}${businessTypeLabel ? ` — ${businessTypeLabel}` : ""}`,
      html: buildHtml({ firstName, email, businessTypeLabel, source, utmSource, utmCampaign }),
      text: [
        "NEW META AD LEAD",
        "=".repeat(40),
        `Name:          ${firstName}`,
        `Email:         ${email}`,
        businessTypeLabel ? `Business type: ${businessTypeLabel}` : null,
        `Source:        ${source}`,
        utmSource ? `UTM source:    ${utmSource}` : null,
        utmCampaign ? `UTM campaign:  ${utmCampaign}` : null,
      ].filter(Boolean).join("\n"),
    });

    if (error) {
      console.error(`[leads/meta] Resend rejected the request — name: ${error.name}, message: ${error.message}`);
      return NextResponse.json({ error: "Could not save your info right now." }, { status: 502 });
    }

    console.log(`[leads/meta] Lead captured — Resend ID: ${data?.id}, email: ${email}, source: ${source}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[leads/meta] Unexpected error calling Resend: ${message}`);
    return NextResponse.json({ error: "Could not save your info right now." }, { status: 502 });
  }
}
