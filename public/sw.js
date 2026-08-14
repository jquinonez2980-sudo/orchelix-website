/* Esmi Dashboard service worker.
 *
 * Scope is registered as `/dashboard` from the dashboard shell. This file
 * lives at `/sw.js` so the script URL is not behind Clerk and so the max
 * scope (`/`) can narrow to `/dashboard` (covers `/dashboard` itself —
 * `/dashboard/` would miss the trailingSlash:false start URL).
 *
 * Hard rule: never put `/api/platform/*` (or any `/api/*`) in a cache.
 * Tenant data in Cache Storage is a cross-device leak if the device is
 * shared, and Clerk cookies make those responses user-specific.
 */
"use strict";

const CACHE_VERSION = "esmi-dashboard-v1";
const OFFLINE_URL = "/esmi-offline.html";
const PRECACHE_URLS = [
  OFFLINE_URL,
  "/esmi-dashboard.webmanifest",
  "/esmi-app-192.png",
  "/esmi-app-maskable-512.png",
];

function isSameOrigin(url) {
  return url.origin === self.location.origin;
}

function isPlatformApi(url) {
  return url.pathname === "/api/platform" || url.pathname.startsWith("/api/platform/");
}

function isAnyApi(url) {
  return url.pathname === "/api" || url.pathname.startsWith("/api/");
}

function isDashboardPath(url) {
  return url.pathname === "/dashboard" || url.pathname.startsWith("/dashboard/");
}

function isHashedNextAsset(url) {
  return url.pathname.startsWith("/_next/static/");
}

function isNavigation(request) {
  return request.mode === "navigate" || request.destination === "document";
}

/* Push payload fields are caller-supplied strings. showNotification treats
   them as text (not HTML), but we still strip controls and refuse anything
   that is not a same-origin /dashboard path. */
function safeText(value, fallback, max) {
  if (typeof value !== "string") return fallback;
  const cleaned = value.replace(/[\u0000-\u001F\u007F]/g, "").trim();
  if (!cleaned) return fallback;
  return cleaned.slice(0, max);
}

function safeDashboardUrl(value) {
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

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_VERSION);
      await cache.addAll(PRECACHE_URLS);
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key !== CACHE_VERSION)
          .map((key) => caches.delete(key)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  let url;
  try {
    url = new URL(request.url);
  } catch {
    return;
  }

  if (!isSameOrigin(url)) return;

  /* Authenticated API — network only. Never match, never put. */
  if (isPlatformApi(url) || isAnyApi(url)) {
    event.respondWith(fetch(request, { cache: "no-store" }));
    return;
  }

  /* Content-hashed webpack/turbopack assets. Safe to cache-first. */
  if (request.method === "GET" && isHashedNextAsset(url)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  /* Dashboard documents: network-first so hard reload and client-side
     entry both see live HTML. Offline → static fallback, never a cached
     authenticated page. */
  if (isNavigation(request) && isDashboardPath(url)) {
    event.respondWith(networkFirstDashboard(request));
    return;
  }

  /* RSC / prefetch / everything else: do not intercept. Next 16 owns these. */
});

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_VERSION);
  const cached = await cache.match(request);
  if (cached) return cached;
  const fresh = await fetch(request);
  if (fresh.ok) {
    cache.put(request, fresh.clone());
  }
  return fresh;
}

async function networkFirstDashboard(request) {
  try {
    return await fetch(request);
  } catch {
    const cache = await caches.open(CACHE_VERSION);
    const offline = await cache.match(OFFLINE_URL);
    if (offline) return offline;
    return new Response("Offline", {
      status: 503,
      statusText: "Offline",
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}

self.addEventListener("push", (event) => {
  event.waitUntil(showPushNotification(event));
});

async function showPushNotification(event) {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      try {
        data = { body: event.data.text() };
      } catch {
        data = {};
      }
    }
  }
  if (!data || typeof data !== "object") data = {};

  const title = safeText(data.title, "Esmi", 120);
  const body = safeText(data.body, "", 280);
  const tag = safeText(data.tag, "esmi", 80);
  const url = safeDashboardUrl(data.url);

  await self.registration.showNotification(title, {
    body,
    tag,
    data: { url },
    icon: "/esmi-app-192.png",
    badge: "/esmi-app-96.png",
    lang: "en",
  });
}

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = safeDashboardUrl(
    event.notification.data && event.notification.data.url,
  );
  event.waitUntil(focusOrOpenDashboard(target));
});

async function focusOrOpenDashboard(path) {
  const windows = await self.clients.matchAll({
    type: "window",
    includeUncontrolled: true,
  });
  for (const client of windows) {
    let clientUrl;
    try {
      clientUrl = new URL(client.url);
    } catch {
      continue;
    }
    if (!isDashboardPath(clientUrl)) continue;
    if (typeof client.focus === "function") {
      await client.focus();
    }
    if (typeof client.navigate === "function" && clientUrl.pathname !== path) {
      try {
        await client.navigate(path);
      } catch {
        /* older clients expose focus but not navigate */
      }
    }
    return;
  }
  if (self.clients.openWindow) {
    await self.clients.openWindow(path);
  }
}
