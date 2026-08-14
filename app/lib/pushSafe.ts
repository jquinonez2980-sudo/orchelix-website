/* Pure helpers shared by the push client and its node:test suite.
   Keep this file free of DOM / fetch so the test runner can import it. */

export function urlBase64ToUint8Array(base64url: string): Uint8Array {
  const trimmed = base64url.trim();
  const padding = "=".repeat((4 - (trimmed.length % 4)) % 4);
  const base64 = (trimmed + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i += 1) {
    out[i] = raw.charCodeAt(i);
  }
  return out;
}

export function safeDashboardUrl(value: unknown): string {
  if (typeof value !== "string") return "/dashboard";
  const trimmed = value.trim();
  if (!trimmed.startsWith("/dashboard")) return "/dashboard";
  if (trimmed.startsWith("//") || trimmed.includes("://") || trimmed.includes("\\")) {
    return "/dashboard";
  }
  if (trimmed.includes("?") || trimmed.includes("#")) {
    const path = trimmed.split(/[?#]/, 1)[0];
    if (path !== "/dashboard" && !path.startsWith("/dashboard/")) return "/dashboard";
  }
  return trimmed;
}

export function safeNotificationText(
  value: unknown,
  fallback: string,
  max = 200,
): string {
  if (typeof value !== "string") return fallback;
  const cleaned = value.replace(/[\u0000-\u001F\u007F]/g, "").trim();
  if (!cleaned) return fallback;
  return cleaned.slice(0, max);
}
