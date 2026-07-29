import { NextRequest } from "next/server";
import { proxyPlatformUpload } from "../../../../lib/platformProxy";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  return proxyPlatformUpload(req, "/platform/knowledge/pdf");
}
