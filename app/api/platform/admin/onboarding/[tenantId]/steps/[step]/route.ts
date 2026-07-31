import { NextRequest } from "next/server";
import { proxyPlatformAdminPATCH } from "../../../../../../../lib/platformProxy";

export const dynamic = "force-dynamic";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ tenantId: string; step: string }> },
) {
  const { tenantId, step } = await params;
  return proxyPlatformAdminPATCH(
    req,
    `/platform/admin/onboarding/${encodeURIComponent(tenantId)}/steps/${encodeURIComponent(step)}`,
  );
}
