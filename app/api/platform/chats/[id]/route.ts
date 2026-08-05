import { NextRequest } from "next/server";
import { proxyPlatformGET } from "../../../../lib/platformProxy";

export const dynamic = "force-dynamic";

/* Chat session detail + full transcript. Same Clerk org slug → X-Tenant-Id,
   PLATFORM_API_SECRET server-side pattern as the rest of /api/platform/*. */

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return proxyPlatformGET(req, `/platform/chats/${encodeURIComponent(id)}`);
}
