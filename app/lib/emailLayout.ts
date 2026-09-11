/* Shared layout for Orchelix's internal notification emails (contact form,
   Meta ad leads). Brought in line with the site on 2026-09-11 — warm paper,
   a near-black night header, one flat royal blue for the action, square
   corners, labels in wide tracked caps, values in a serif.

   Email is not the web. What that changes, deliberately:
   - Every colour is a solid hex. The site's inks are alphas of #12141A over
     paper; mail clients composite rgba() inconsistently, so each one is
     pre-composited onto the ground it sits on (values noted beside them).
   - Archivo is requested from Google Fonts for the clients that honour it
     (Apple Mail, iOS); everyone else falls back to Helvetica/Arial. Body
     values fall back from Literata to Georgia.
   - Tables and inline styles only. No shadows, no radius, no rgba.

   Everything a visitor typed is escaped with `esc` before it reaches the
   HTML. The previous templates interpolated raw form input, so a submitted
   name or message could inject markup — links included — into the inbox. */

export const esc = (s: string): string =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );

const C = {
  paper: "#F5F1EA",      // --lg-field
  stock: "#F8F4ED",      // --lg-stock, the card body
  night: "#14171C",      // --lg-night-field
  ink: "#12141A",        // --lg-ink
  ink3: "#696969",       // --lg-ink-3 on stock (5.3:1)
  hair: "#DCD9D4",       // --lg-hair on stock
  rule: "#908F8E",       // --lg-rule on stock
  nightInk: "#E8EAEE",   // --lg-night-ink
  nightInk2: "#C6C8CC",  // --lg-night-ink-2 on night
  nightInk3: "#B1B3B7",  // --lg-night-ink-3 on night
  blue: "#3657B1",       // --lg-foil
  white: "#FFFFFF",      // --lg-foil-ink
};

const SANS = "'Archivo','Helvetica Neue',Helvetica,Arial,sans-serif";
const SERIF = "'Literata',Georgia,'Times New Roman',serif";
/* font-stretch is honoured where Archivo loads and ignored elsewhere. */
const WIDE = "font-stretch:125%;";

const label = (text: string, color = C.ink3) =>
  `<span style="font-family:${SANS};${WIDE}font-size:10px;font-weight:500;color:${color};letter-spacing:0.18em;text-transform:uppercase;">${text}</span>`;

/** One row of the ruled register: label left, value right. `value` is HTML
    the caller has already escaped. Empty values render nothing. */
export function row(labelText: string, value: string): string {
  if (!value.trim()) return "";
  return `<tr>
    <td style="padding:13px 16px 13px 0;border-bottom:1px solid ${C.hair};width:118px;vertical-align:top;white-space:nowrap;">${label(labelText)}</td>
    <td style="padding:11px 0;border-bottom:1px solid ${C.hair};vertical-align:top;font-family:${SERIF};font-size:15px;line-height:1.55;color:${C.ink};">${value}</td>
  </tr>`;
}

export const link = (href: string, text: string) =>
  `<a href="${href}" style="color:${C.ink};text-decoration:underline;text-decoration-color:${C.blue};">${text}</a>`;

export function layout(opts: {
  title: string;        // <title>, plain text
  kicker: string;       // small caps above the name, plain text
  heading: string;      // escaped HTML
  subline: string;      // escaped HTML
  rows: string;         // output of row()
  message?: string;     // escaped HTML, optional
  replyHref: string;    // escaped mailto:
  replyLabel: string;   // escaped HTML
  footnote: string;     // escaped HTML
}): string {
  const { title, kicker, heading, subline, rows, message, replyHref, replyLabel, footnote } = opts;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${esc(title)}</title>
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@125,300;125,500&family=Literata:wght@400&display=swap" rel="stylesheet">
  <style>
    @media only screen and (max-width:600px) {
      .ow { padding:0 !important; }
      .px { padding-left:22px !important; padding-right:22px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:${C.paper};">
  <table class="ow" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:${C.paper};padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;border:1px solid ${C.hair};">

        <!-- Night header: lockup, then who wrote in -->
        <tr><td class="px" style="background:${C.night};padding:28px 36px 34px;">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation"><tr>
            <td style="vertical-align:middle;">
              <img src="https://www.orchelix.com/email-logo.png" alt="Orchelix" width="170" height="40" style="display:block;width:170px;height:40px;border:0;">
            </td>
            <td align="right" style="vertical-align:middle;">${label(esc(kicker), C.nightInk3)}</td>
          </tr></table>
          <h1 style="margin:34px 0 10px;font-family:${SANS};${WIDE}font-size:26px;font-weight:300;line-height:1.2;color:${C.nightInk};letter-spacing:0.07em;text-transform:uppercase;">${heading}</h1>
          <p style="margin:0;font-family:${SERIF};font-size:14px;line-height:1.6;color:${C.nightInk2};">${subline}</p>
        </td></tr>

        <!-- The record -->
        <tr><td class="px" style="background:${C.stock};padding:32px 36px 8px;">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-top:2px solid ${C.rule};">
            ${rows}
          </table>
          ${
            message
              ? `<p style="margin:28px 0 10px;">${label("Message")}</p>
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation"><tr>
            <td style="border-left:2px solid ${C.blue};padding:4px 0 4px 18px;font-family:${SERIF};font-size:15px;line-height:1.7;color:${C.ink};">${message}</td>
          </tr></table>`
              : ""
          }
        </td></tr>

        <!-- The one action -->
        <tr><td class="px" style="background:${C.stock};padding:26px 36px 32px;">
          <table cellpadding="0" cellspacing="0" role="presentation"><tr>
            <td style="background:${C.blue};">
              <a href="${replyHref}" style="display:inline-block;padding:15px 26px;font-family:${SANS};${WIDE}font-size:12px;font-weight:500;color:${C.white};letter-spacing:0.14em;text-transform:uppercase;text-decoration:none;">${replyLabel}</a>
            </td>
          </tr></table>
        </td></tr>

        <!-- Colophon -->
        <tr><td class="px" style="background:${C.night};padding:20px 36px;">
          <p style="margin:0;font-family:${SANS};${WIDE}font-size:10px;line-height:1.9;color:${C.nightInk3};letter-spacing:0.14em;text-transform:uppercase;">
            Orchelix AI Consulting Inc. &nbsp;·&nbsp; West Palm Beach · Ontario &nbsp;·&nbsp; <a href="https://www.orchelix.com" style="color:${C.nightInk3};text-decoration:none;">orchelix.com</a>
          </p>
          <p style="margin:4px 0 0;font-family:${SERIF};font-size:12px;line-height:1.6;color:${C.nightInk3};">${footnote}</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
