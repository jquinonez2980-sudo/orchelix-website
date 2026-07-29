import { NextRequest } from "next/server";
import { proxyPlatformPATCH } from "../../../../lib/platformProxy";

export const dynamic = "force-dynamic";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return proxyPlatformPATCH(req, `/platform/leads/${encodeURIComponent(id)}`);
}
