import { NextRequest } from "next/server";
import { proxyPlatformSignupPOST } from "../../../lib/platformProxy";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  return proxyPlatformSignupPOST(req, "/platform/signup");
}
