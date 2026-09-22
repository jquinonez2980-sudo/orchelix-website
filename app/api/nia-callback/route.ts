/**
 * POST /api/nia-callback — the "Have Nia call me" box on /book.
 *
 * Forwards a consented lead to Nia's backend (ai-receptionist, POST
 * /closer/leads). The operator secret stays server-side: the browser never
 * sees CLOSER_API_SECRET, and Nia's backend keeps no public write route.
 *
 * Queuing a lead does not dial it. Nia's dial gate still checks consent, DNC,
 * calling hours and attempts before every call.
 *
 * SETUP (Vercel project settings → Environment Variables):
 *   CLOSER_API_SECRET  same value as CLOSER_API_SECRET on Railway
 *   RAILWAY_API_URL    optional; defaults to the production backend
 */

import { NextRequest, NextResponse } from "next/server";
import { buildNiaLead } from "../../lib/niaCallback";

const BACKEND =
  process.env.RAILWAY_API_URL ?? "https://ai-receptionist-production-5375.up.railway.app";

/* Best-effort throttle per IP. Serverless instances don't share memory, so
   this only slows a single abuser down; Nia's gate is the real control. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function throttled(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: a hidden field people never see. Bots fill it; pretend success.
  if (String(body.website ?? "").trim()) {
    return NextResponse.json({ ok: true, queued: false });
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (throttled(ip)) {
    return NextResponse.json({ error: "Too many requests — try again later." }, { status: 429 });
  }

  const built = buildNiaLead({
    name: body.name,
    company: body.company,
    phone: body.phone,
    industry: body.industry,
    consent: body.consent,
  });
  if (!built.ok) {
    if (built.reason === "outside_markets") {
      // Not an error for the visitor: the booking request still went through.
      return NextResponse.json({ ok: true, queued: false, reason: built.reason });
    }
    return NextResponse.json({ error: built.reason }, { status: 400 });
  }

  const secret = process.env.CLOSER_API_SECRET;
  if (!secret) {
    console.error("[nia-callback] CLOSER_API_SECRET is not set — lead not queued");
    return NextResponse.json({ error: "Callback is not configured." }, { status: 503 });
  }

  try {
    const res = await fetch(`${BACKEND}/closer/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Closer-Secret": secret },
      body: JSON.stringify(built.lead),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error(`[nia-callback] backend returned ${res.status}`);
      return NextResponse.json({ error: "Could not queue the call." }, { status: 502 });
    }
  } catch (err) {
    console.error("[nia-callback] backend unreachable", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Could not queue the call." }, { status: 502 });
  }

  return NextResponse.json({ ok: true, queued: true });
}
