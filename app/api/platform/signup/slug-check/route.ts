import { NextRequest } from "next/server";
import { proxyPlatformSignupGET } from "../../../../lib/platformProxy";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  return proxyPlatformSignupGET(req, "/platform/signup/slug-check", [
    "company_name",
    "slug",
  ]);
}
