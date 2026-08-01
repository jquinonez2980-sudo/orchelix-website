import { NextRequest } from "next/server";
import { proxyPlatformGET } from "../../../../../../lib/platformProxy";

export const dynamic = "force-dynamic";

/* WhatsApp-friendly MP3 export for a single call recording.
   Clerk session + org slug → X-Tenant-Id; PLATFORM_API_SECRET injected
   server-side. Upstream returns JSON with a short-lived R2 presigned URL —
   the browser downloads audio from R2 directly (not through this proxy). */

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return proxyPlatformGET(
    req,
    `/platform/calls/${encodeURIComponent(id)}/recording/export`,
    ["format"],
  );
}
