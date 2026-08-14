/* Web-push client helpers. Talks only to same-origin /api/platform/push/*
   (the proxy injects tenant + secret). Never request notification permission
   from here — the settings UI does that behind a click. */

import { supportsNotificationsAPI } from "./pwa";
import { urlBase64ToUint8Array } from "./pushSafe";

export { safeDashboardUrl, safeNotificationText, urlBase64ToUint8Array } from "./pushSafe";

export const PUSH_WANTED_KEY = "esmi:push-wanted";

export type PushKeyResult =
  | { ok: true; publicKey: string }
  | { ok: false; unavailable: boolean; error: string };

export type PushSubscribeResult =
  | { ok: true }
  | { ok: false; error: string; unavailable?: boolean };

const UNAVAILABLE_STATUSES = new Set([404, 502, 503]);

async function readErrorDetail(res: Response): Promise<string> {
  let detail = `Request failed (${res.status})`;
  try {
    const body = (await res.json()) as { error?: unknown; detail?: unknown };
    if (typeof body?.error === "string") detail = body.error;
    if (typeof body?.detail === "string") detail = body.detail;
  } catch {
    /* keep default */
  }
  return detail;
}

export function wantsPush(): boolean {
  try {
    return window.localStorage.getItem(PUSH_WANTED_KEY) === "1";
  } catch {
    return false;
  }
}

export function setWantsPush(wanted: boolean): void {
  try {
    if (wanted) window.localStorage.setItem(PUSH_WANTED_KEY, "1");
    else window.localStorage.removeItem(PUSH_WANTED_KEY);
  } catch {
    /* private mode */
  }
}

export async function fetchPushKey(): Promise<PushKeyResult> {
  try {
    const res = await fetch("/api/platform/push/key", { cache: "no-store" });
    if (UNAVAILABLE_STATUSES.has(res.status)) {
      return { ok: false, unavailable: true, error: "Push is not configured." };
    }
    if (!res.ok) {
      return { ok: false, unavailable: false, error: await readErrorDetail(res) };
    }
    const body = (await res.json()) as { public_key?: unknown };
    if (typeof body.public_key !== "string" || !body.public_key.trim()) {
      return { ok: false, unavailable: true, error: "Push is not configured." };
    }
    return { ok: true, publicKey: body.public_key.trim() };
  } catch {
    return { ok: false, unavailable: true, error: "Push is not configured." };
  }
}

function subscriptionBody(sub: PushSubscription): {
  endpoint: string;
  keys: { p256dh: string; auth: string };
  user_agent: string;
} {
  const json = sub.toJSON();
  const p256dh = json.keys?.p256dh;
  const auth = json.keys?.auth;
  if (!json.endpoint || !p256dh || !auth) {
    throw new Error("This browser returned an incomplete push subscription.");
  }
  return {
    endpoint: json.endpoint,
    keys: { p256dh, auth },
    user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
  };
}

export async function savePushSubscription(sub: PushSubscription): Promise<void> {
  const res = await fetch("/api/platform/push/subscriptions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify(subscriptionBody(sub)),
  });
  if (UNAVAILABLE_STATUSES.has(res.status)) {
    const err = new Error("Push is not configured.") as Error & { unavailable?: boolean };
    err.unavailable = true;
    throw err;
  }
  if (!res.ok) throw new Error(await readErrorDetail(res));
}

export async function deletePushSubscription(endpoint: string): Promise<void> {
  const res = await fetch("/api/platform/push/subscriptions", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({ endpoint }),
  });
  if (res.status === 404) return;
  if (UNAVAILABLE_STATUSES.has(res.status)) return;
  if (!res.ok) throw new Error(await readErrorDetail(res));
}

export async function getExistingSubscription(): Promise<PushSubscription | null> {
  if (!supportsNotificationsAPI()) return null;
  const reg = await navigator.serviceWorker.ready;
  return reg.pushManager.getSubscription();
}

export async function subscribeThisDevice(): Promise<PushSubscribeResult> {
  if (!supportsNotificationsAPI()) {
    return { ok: false, error: "This browser does not support web push." };
  }
  const key = await fetchPushKey();
  if (!key.ok) {
    return { ok: false, error: key.error, unavailable: key.unavailable };
  }
  const reg = await navigator.serviceWorker.ready;
  const applicationServerKey = urlBase64ToUint8Array(key.publicKey);
  let sub: PushSubscription;
  try {
    sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey as BufferSource,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Could not subscribe this device.";
    return { ok: false, error: message };
  }
  try {
    await savePushSubscription(sub);
    setWantsPush(true);
    return { ok: true };
  } catch (e) {
    try {
      await sub.unsubscribe();
    } catch {
      /* best-effort rollback */
    }
    const unavailable = Boolean((e as { unavailable?: boolean })?.unavailable);
    const message = e instanceof Error ? e.message : "Could not save the subscription.";
    return { ok: false, error: message, unavailable };
  }
}

export async function unsubscribeThisDevice(): Promise<PushSubscribeResult> {
  setWantsPush(false);
  try {
    const sub = await getExistingSubscription();
    if (sub) {
      await deletePushSubscription(sub.endpoint);
      await sub.unsubscribe();
    }
    return { ok: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Could not turn notifications off.";
    return { ok: false, error: message };
  }
}

/* If the user previously enabled push and the browser dropped the
   subscription, recreate it. Never prompts — permission must already be
   granted. */
export async function restorePushSubscription(): Promise<void> {
  if (!wantsPush()) return;
  if (!supportsNotificationsAPI()) return;
  if (Notification.permission !== "granted") return;
  const existing = await getExistingSubscription();
  if (existing) return;
  await subscribeThisDevice();
}
