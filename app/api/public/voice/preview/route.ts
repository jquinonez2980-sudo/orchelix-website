import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const RAILWAY_URL =
  process.env.RAILWAY_API_URL ??
  "https://ai-receptionist-production-5375.up.railway.app";

/* Public try-esmi voice preview proxy (docs/ESMI_DASHBOARD_UX.md Section 6).
   No Clerk session, no platform secret — this is the one platform surface
   anyone can call. Still a server-to-server proxy (not a direct browser ->
   Railway call) for the same reason app/api/chat/route.ts is: it forwards
   the real visitor IP (Vercel sets x-forwarded-for on the incoming request)
   plus the shared CHAT_PROXY_SECRET so Railway's rate limiter
   (rate_limit.py) can key on the actual visitor instead of this function's
   own egress IP — reusing the SAME secret /chat already uses (one shared
   "this came from our own site" proof, not a second one provisioned just
   for this route) — see rate_limit.py's _rate_limit_key docstring. */
export async function POST(req: NextRequest) {
  const body = await req.text();

  const clientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  let upstream: Response;
  try {
    upstream = await fetch(`${RAILWAY_URL}/platform/public/voice/preview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Chat-Secret": process.env.CHAT_PROXY_SECRET ?? "",
        "X-Client-IP": clientIp,
      },
      body,
    });
  } catch {
    return Response.json(
      { error: "Could not reach Esmi — please try again shortly." },
      { status: 502 },
    );
  }

  const respBody = await upstream.text();
  return new Response(respBody, {
    status: upstream.status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}
