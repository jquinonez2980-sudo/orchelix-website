import { NextRequest } from "next/server";
import { proxyPlatformAdminPATCH } from "../../../../../../lib/platformProxy";

export const dynamic = "force-dynamic";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ tenantId: string }> },
) {
  const { tenantId } = await params;
  return proxyPlatformAdminPATCH(
    req,
    `/platform/admin/tenants/${encodeURIComponent(tenantId)}/stripe`,
  );
}
