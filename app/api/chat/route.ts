import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const RAILWAY_URL =
  process.env.RAILWAY_API_URL ??
  "https://ai-receptionist-production-5375.up.railway.app";

export async function POST(req: NextRequest) {
  const body = await req.json();

  let upstream: Response;
  try {
    upstream = await fetch(`${RAILWAY_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
