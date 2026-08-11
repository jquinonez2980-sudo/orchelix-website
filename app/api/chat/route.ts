import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const RAILWAY_URL =
  process.env.RAILWAY_API_URL ??
  "https://ai-receptionist-production-5375.up.railway.app";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Vercel's edge sets x-forwarded-for to the real visitor IP on the incoming
  // request; this server-to-server fetch to Railway would otherwise show every
  // visitor as this same serverless function's egress IP, collapsing Esmi's
  // per-visitor rate limit into one shared bucket. Forwarded only when the
  // request also carries CHAT_PROXY_SECRET (see api.py's _rate_limit_key).
  const clientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  // Attribution (chat_sessions.user_agent / .referrer) describes the visitor,
  // but this is a server-to-server fetch: without forwarding, Railway would see
  // Node's own fetch user-agent and no referer at all. Both are echoes of the
  // browser's request and carry no secret.
  const userAgent = req.headers.get("user-agent") ?? "";
  const referer = req.headers.get("referer") ?? "";

  let upstream: Response;
  try {
    upstream = await fetch(`${RAILWAY_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Chat-Secret": process.env.CHAT_PROXY_SECRET ?? "",
        "X-Client-IP": clientIp,
        ...(userAgent ? { "User-Agent": userAgent } : {}),
        ...(referer ? { Referer: referer } : {}),
      },
      body: JSON.stringify(body),
      // @ts-expect-error — Node 18 fetch supports duplex but types lag
      duplex: "half",
    });
  } catch {
    return new Response(
      `data: ${JSON.stringify({ type: "error", message: "Could not reach Esmi — please try again shortly." })}\n\n`,
      {
        status: 502,
        headers: { "Content-Type": "text/event-stream" },
      }
    );
  }

  if (!upstream.ok || !upstream.body) {
    return new Response(
      `data: ${JSON.stringify({ type: "error", message: "Esmi backend returned an error." })}\n\n`,
      {
        status: upstream.status,
        headers: { "Content-Type": "text/event-stream" },
      }
    );
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "X-Accel-Buffering": "no",
    },
  });
}
