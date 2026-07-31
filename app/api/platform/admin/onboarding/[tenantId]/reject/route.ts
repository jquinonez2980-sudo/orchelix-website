import { NextRequest } from "next/server";
import { proxyPlatformAdminPOST } from "../../../../../../lib/platformProxy";

export const dynamic = "force-dynamic";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ tenantId: string }> },
) {
  const { tenantId } = await params;
  return proxyPlatformAdminPOST(
    req,
    `/platform/admin/onboarding/${encodeURIComponent(tenantId)}/reject`,
  );
}
