# Resend domain verification — orchelix.com

**Status: NOT verified.** Every transactional email this site sends (the `/contact`
form and the `/missed-calls` lead form) currently fails with this exact error from
Resend:

```
Resend rejected the request — name: validation_error, message: The orchelix.com
domain is not verified. Please, add and verify your domain on https://resend.com/domains
```

`RESEND_API_KEY` being set in Vercel is **not** the same thing as the domain being
verified. The key lets the app authenticate to Resend; the sending domain still has to
be proven owned via DNS records before Resend will actually deliver mail sent
`from: noreply@orchelix.com`. That's the entire root cause — nothing else is broken.

Both `app/api/contact/route.ts` and `app/api/leads/meta/route.ts` send through one
shared helper, `app/lib/email.ts`, which sends from **`MAIL_FROM = "Orchelix
<noreply@orchelix.com>"`**. Whatever domain you verify in Resend must match that
exactly. If that address ever changes (e.g. to a subdomain), update `MAIL_FROM` in that
one file — both routes pick it up automatically.

This is a DNS change. It cannot be completed by an agent working in this repo — it
needs your Resend login. Everything below is the one-time fix for whoever has that
access.

---

## 1. Add the domain in Resend

1. https://resend.com/domains → **Add Domain**
2. Enter `orchelix.com` — the apex domain, matching `MAIL_FROM` above. (Only use a
   subdomain like `notifications.orchelix.com` instead if you also change `MAIL_FROM`
   to match — don't verify a domain the code doesn't actually send from.)
3. Resend generates a table of DNS records to add: typically one DKIM `TXT` record at
   `resend._domainkey.orchelix.com`, plus an `MX` + `TXT` pair scoped to a
   Resend-managed subdomain it picks for bounce handling. This does **not** touch the
   existing apex `MX` records (Google Workspace, `info@orchelix.com` etc.) — Resend's
   own records live on a different subdomain.

## 2. Records to add

Copy the **exact** values Resend shows on the Add Domain screen into this table before
adding them anywhere — don't reuse values from another domain or a screenshot from
Resend's docs, they're unique per account/domain.

| Type | Host / Name | Value | TTL |
|---|---|---|---|
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

## 3. Where to add them: Vercel, not a separate registrar

`orchelix.com` uses Vercel's own nameservers (`ns1.vercel-dns.com` /
`ns2.vercel-dns.com` — confirmed via `nslookup -type=NS orchelix.com`), so DNS is
managed **inside Vercel**, not at a registrar or Cloudflare. This is already the same
place Clerk's `clk._domainkey` / `clk2._domainkey` CNAME records live for this exact
domain, so this is a known-working pattern here, not new territory.

**Dashboard:** Vercel → your team → **Domains** → `orchelix.com` → **DNS Records** →
Add Record. Enter each row from the table above exactly as Resend shows it.

**CLI equivalent**, from a machine with the Vercel CLI logged into this account:

```
vercel dns add orchelix.com <name> <type> <value>
```

Example shape (fill in the real value from step 2 — this is illustrative only):

```
vercel dns add orchelix.com resend._domainkey TXT "p=MIGfMA0GCSq..."
```

MX/SRV records take an extra priority argument — run `vercel dns add --help` for that
form if Resend's table includes one.

## 4. Verify in Resend

Back in Resend → Domains → `orchelix.com` → **Verify**. DNS propagation is usually
minutes, occasionally a few hours. Resend shows **Verified** once it can see the
records — that's the signal this is actually fixed, not just "records added."

## 5. Confirm the Vercel side is otherwise correct

- `RESEND_API_KEY` set on the **`orchelix-website`** Vercel project (the one bound to
  `www.orchelix.com`) — already confirmed present. This was never the problem.
- `MAIL_FROM` in `app/lib/email.ts` matches the domain you just verified.

## 6. Smoke test (after Resend shows Verified)

```
curl -s -w '\nHTTP:%{http_code}\n' -X POST https://www.orchelix.com/api/leads/meta \
  -H 'Content-Type: application/json' \
  -d '{"first_name":"Smoke Test","email":"you@yourinbox.example"}'
```

Expect `HTTP:200` and `{"ok":true}`, and a "New Meta lead" email in `info@orchelix.com`
within a minute or two. Repeat against `/api/contact` with
`{"name":"...","email":"...","useCase":"smoke test"}` to confirm the older form too, and
try a real submit on `/missed-calls` and `/contact` in the browser for good measure.

If either route still fails after Resend shows Verified, check the Vercel function
logs:

```
vercel logs www.orchelix.com --since 15m
```

and look for the `[contact]` or `[leads/meta]` line — `app/lib/email.ts` logs Resend's
exact `error.name` / `error.message` on every failure (never the API key), which is
almost always enough to tell you what's still wrong.
