import { NextRequest } from "next/server";
import { proxyPlatformGET } from "../../../../../lib/platformProxy";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ version: string }> },
) {
  const { version } = await params;
  return proxyPlatformGET(req, `/platform/config/versions/${encodeURIComponent(version)}`);
}
