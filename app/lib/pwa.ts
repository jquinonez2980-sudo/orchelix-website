/* Dashboard PWA helpers. Browser-only — service worker registration, install
   prompt capture, and standalone / iOS detection. No network, no secrets. */

export const INSTALL_DISMISS_KEY = "esmi:install-dismissed";
export const SW_URL = "/sw.js";
export const SW_SCOPE = "/dashboard";

export type BeforeInstallPromptEvent = Event & {
  readonly platforms: string[];
  prompt(): Promise<void>;
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export function isStandaloneDisplay(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(display-mode: standalone)").matches) return true;
  const nav = window.navigator as Navigator & { standalone?: boolean };
  return nav.standalone === true;
}

export function isIosDevice(): boolean {
  if (typeof window === "undefined") return false;
  const ua = window.navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua)) return true;
  /* iPadOS 13+ reports as Macintosh with touch. */
  return window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 1;
}

export function isIosSafari(): boolean {
  if (!isIosDevice()) return false;
  const ua = window.navigator.userAgent;
  const webkit = /WebKit/i.test(ua);
  const other = /CriOS|FxiOS|EdgiOS|OPiOS|DuckDuckGo/i.test(ua);
  return webkit && !other;
}

export function wasInstallDismissed(): boolean {
  try {
    return window.localStorage.getItem(INSTALL_DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}

export function dismissInstall(): void {
  try {
    window.localStorage.setItem(INSTALL_DISMISS_KEY, "1");
  } catch {
    /* private mode */
  }
}

export function registerDashboardSW(): void {
  if (typeof window === "undefined") return;
  if (!("serviceWorker" in navigator)) return;
  void navigator.serviceWorker.register(SW_URL, { scope: SW_SCOPE }).catch(() => {
    /* registration failure is non-fatal — the dashboard still works */
  });
}

export function supportsNotificationsAPI(): boolean {
  return (
    typeof window !== "undefined" &&
    "Notification" in window &&
    "serviceWorker" in navigator &&
    "PushManager" in window
  );
}
