/**
 * Shared transactional-email sender — the one place app/api/contact and
 * app/api/leads/meta call Resend through, so the from/to addresses and error
 * handling can't drift between the two routes the way they had started to.
 *
 * Root-cause note (2026-08): both routes were returning 500/502 in production
 * because the `orchelix.com` sending domain has never been added + verified
 * in the Resend dashboard — RESEND_API_KEY being set is not the same thing.
 * See RESEND_DOMAIN_SETUP.md at the repo root for the one-time fix (DNS,
 * outside what code can do). This helper detects that specific failure and
 * reports it distinctly (503, "temporarily unavailable") from a generic
 * Resend error (502) or a missing API key (503), all fail-soft — callers
 * decide their own UX (both current callers keep a skip-the-form path).
 */

import { Resend } from "resend";

// Single canonical sending identity. If this ever needs to change (e.g. to a
// subdomain like notifications.orchelix.com — see RESEND_DOMAIN_SETUP.md),
// change it here once; every caller picks it up.
export const MAIL_FROM = "Orchelix <noreply@orchelix.com>";
export const MAIL_TO_INFO = "info@orchelix.com";

export type SendEmailResult =
  | { ok: true; id: string | undefined }
  | { ok: false; status: 502 | 503; error: string };

export async function sendTransactionalEmail(params: {
  to: string | string[];
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
  /** Bracketed log prefix, e.g. "[contact]" / "[leads/meta]" — keeps each
      route's Vercel function logs greppable by name. */
  logTag: string;
}): Promise<SendEmailResult> {
  const { to, replyTo, subject, html, text, logTag } = params;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      `${logTag} RESEND_API_KEY is not set — add it in Vercel → Settings → Environment Variables and redeploy.`,
    );
    return { ok: false, status: 503, error: "Email service is not configured." };
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: MAIL_FROM,
      to: Array.isArray(to) ? to : [to],
      replyTo,
      subject,
      html,
      text,
    });

    if (error) {
      // Never log the API key — only Resend's own error name/message, which
      // don't contain it.
      console.error(`${logTag} Resend rejected the request — name: ${error.name}, message: ${error.message}`);

      const domainNotVerified =
        error.name === "validation_error" && /domain is not verified/i.test(error.message ?? "");
      if (domainNotVerified) {
        console.error(
          `${logTag} Sending domain is not verified in Resend — see RESEND_DOMAIN_SETUP.md for the fix.`,
        );
        return {
          ok: false,
          status: 503,
          error: "Email delivery is temporarily unavailable. Please try again shortly.",
        };
      }
      return {
        ok: false,
        status: 502,
        error: `Failed to send your message. Please email us directly at ${MAIL_TO_INFO}.`,
      };
    }

    console.log(`${logTag} Email sent — Resend ID: ${data?.id}`);
    return { ok: true, id: data?.id };
  } catch (err) {
    // Network failure, timeout, or unexpected Resend SDK error.
    const message = err instanceof Error ? err.message : String(err);
    console.error(`${logTag} Unexpected error calling Resend: ${message}`);
    return {
      ok: false,
      status: 502,
      error: `An unexpected error occurred. Please try again or email us at ${MAIL_TO_INFO}.`,
    };
  }
}
