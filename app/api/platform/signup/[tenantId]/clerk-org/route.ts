import { NextRequest } from "next/server";
import { proxyPlatformSignupPOST } from "../../../../../lib/platformProxy";

export const dynamic = "force-dynamic";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ tenantId: string }> },
) {
  const { tenantId } = await params;
  return proxyPlatformSignupPOST(
    req,
    `/platform/signup/${encodeURIComponent(tenantId)}/clerk-org`,
  );
}
