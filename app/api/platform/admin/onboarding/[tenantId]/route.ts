import { NextRequest } from "next/server";
import { proxyPlatformAdminGET } from "../../../../../lib/platformProxy";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ tenantId: string }> },
) {
  const { tenantId } = await params;
  return proxyPlatformAdminGET(
    req,
    `/platform/admin/onboarding/${encodeURIComponent(tenantId)}`,
  );
}
