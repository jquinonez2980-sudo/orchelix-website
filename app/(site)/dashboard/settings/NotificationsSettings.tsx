"use client";

import { useCallback, useEffect, useState } from "react";
import { SectionTitle } from "../PageTitle";
import { useDashI18n } from "../i18n";
import { useActiveOrgSlug } from "../useActiveOrgSlug";
import {
  isIosDevice,
  isStandaloneDisplay,
  supportsNotificationsAPI,
} from "@/app/lib/pwa";
import {
  fetchPushKey,
  getExistingSubscription,
  subscribeThisDevice,
  unsubscribeThisDevice,
} from "@/app/lib/push";

type PermissionState = NotificationPermission | "unsupported";
type Availability = "checking" | "ready" | "unavailable";

const copy = {
  en: {
    title: "Notifications",
    lede:
      "A phone alert when Esmi flags a hot lead or cannot transfer a caller. Nothing else — not bookings, not chat transcripts, not marketing.",
    enable: "Turn on this device",
    disable: "Turn off this device",
    working: "Working…",
    permissionLabel: "Browser permission",
    permissionDefault: "Not asked yet — we only ask when you turn this on.",
    permissionGranted: "Allowed",
    permissionDenied: "Blocked",
    deniedHelp:
      "This browser will not ask again. Open the lock icon in the address bar → Site settings → Notifications → Allow, then come back here.",
    unsupported:
      "This browser cannot receive web push. Use current Chrome, Edge, Firefox, or Safari 16.4+.",
    unavailable:
      "Push notifications are not available yet. You can leave this page — nothing here is broken on your side.",
    iosStandalone:
      "On iPhone and iPad, add Esmi to your Home Screen first (Share → Add to Home Screen), then turn notifications on from the installed app.",
    deviceLabel: "This device",
    on: "On for this device",
    off: "Off on this device",
    error: "Could not update notifications.",
  },
  es: {
    title: "Notificaciones",
    lede:
      "Un aviso en el teléfono cuando Esmi marca un prospecto caliente o no puede transferir una llamada. Nada más — ni reservas, ni transcripciones, ni marketing.",
    enable: "Activar en este dispositivo",
    disable: "Desactivar en este dispositivo",
    working: "Un momento…",
    permissionLabel: "Permiso del navegador",
    permissionDefault: "Aún no se ha pedido — solo lo pedimos cuando lo activas.",
    permissionGranted: "Permitido",
    permissionDenied: "Bloqueado",
    deniedHelp:
      "Este navegador no volverá a preguntar. Abre el candado en la barra de direcciones → Configuración del sitio → Notificaciones → Permitir, y vuelve aquí.",
    unsupported:
      "Este navegador no puede recibir web push. Usa Chrome, Edge, Firefox o Safari 16.4+ actuales.",
    unavailable:
      "Las notificaciones push aún no están disponibles. Puedes salir de esta página — de tu lado no hay nada roto.",
    iosStandalone:
      "En iPhone e iPad, primero añade Esmi a la pantalla de inicio (Compartir → Añadir a pantalla de inicio) y luego activa las notificaciones desde la app instalada.",
    deviceLabel: "Este dispositivo",
    on: "Activas en este dispositivo",
    off: "Inactivas en este dispositivo",
    error: "No se pudieron actualizar las notificaciones.",
  },
} as const;

export default function NotificationsSettings() {
  const { locale } = useDashI18n();
  const t = copy[locale] ?? copy.en;
  const orgSlug = useActiveOrgSlug();

  const [availability, setAvailability] = useState<Availability>("checking");
  const [permission, setPermission] = useState<PermissionState>("default");
  const [subscribed, setSubscribed] = useState(false);
  const [iosNeedsStandalone, setIosNeedsStandalone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!supportsNotificationsAPI()) {
      setPermission("unsupported");
      setAvailability("ready");
      setSubscribed(false);
      return;
    }
    setPermission(Notification.permission);
    setIosNeedsStandalone(isIosDevice() && !isStandaloneDisplay());
    const key = await fetchPushKey();
    if (!key.ok && key.unavailable) {
      setAvailability("unavailable");
      return;
    }
    if (!key.ok) {
      setAvailability("unavailable");
      return;
    }
    setAvailability("ready");
    const sub = await getExistingSubscription();
    setSubscribed(Boolean(sub));
  }, []);

  useEffect(() => {
    void refresh();
  }, [orgSlug, refresh]);

  const onEnable = async () => {
    if (permission === "unsupported" || availability !== "ready") return;
    setBusy(true);
    setError(null);
    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      if (result !== "granted") return;
      const sub = await subscribeThisDevice();
      if (!sub.ok) {
        if (sub.unavailable) {
          setAvailability("unavailable");
        } else {
          setError(sub.error || t.error);
        }
        setSubscribed(false);
        return;
      }
      setSubscribed(true);
    } catch {
      setError(t.error);
    } finally {
      setBusy(false);
    }
  };

  const onDisable = async () => {
    setBusy(true);
    setError(null);
    try {
      const result = await unsubscribeThisDevice();
      if (!result.ok) {
        setError(result.error || t.error);
        return;
      }
      setSubscribed(false);
    } catch {
      setError(t.error);
    } finally {
      setBusy(false);
    }
  };

  const permissionLabel =
    permission === "granted"
      ? t.permissionGranted
      : permission === "denied"
        ? t.permissionDenied
        : permission === "unsupported"
          ? t.unsupported
          : t.permissionDefault;

  return (
    <section
      className="overflow-hidden border border-line bg-surface"
      style={{ borderTop: "2px solid var(--lg-rule)" }}
      aria-labelledby="notifications-heading"
    >
      <div className="px-4 py-5 sm:px-6">
        <SectionTitle id="notifications-heading">{t.title}</SectionTitle>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-ink-3">{t.lede}</p>

        {availability === "checking" && (
          <p className="mt-4 text-sm text-ink-3" aria-live="polite">
            {t.working}
          </p>
        )}

        {availability === "unavailable" && (
          <p className="mt-4 text-sm leading-6 text-ink-2" role="status">
            {t.unavailable}
          </p>
        )}

        {availability === "ready" && permission === "unsupported" && (
          <p className="mt-4 text-sm leading-6 text-ink-2" role="status">
            {t.unsupported}
          </p>
        )}

        {availability === "ready" && permission !== "unsupported" && (
          <div className="mt-4 space-y-4">
            <dl>
              <div className="flex flex-col gap-1 border-t border-line pt-4 sm:flex-row sm:items-baseline sm:justify-between">
                <dt className="lg-fig text-xs uppercase tracking-wide text-ink-3">
                  {t.permissionLabel}
                </dt>
                <dd className="text-sm text-ink">{permissionLabel}</dd>
              </div>
              <div className="mt-3 flex flex-col gap-1 border-t border-line pt-4 sm:flex-row sm:items-baseline sm:justify-between">
                <dt className="lg-fig text-xs uppercase tracking-wide text-ink-3">
                  {t.deviceLabel}
                </dt>
                <dd className="text-sm text-ink">{subscribed ? t.on : t.off}</dd>
              </div>
            </dl>

            {iosNeedsStandalone && (
              <p className="text-sm leading-6 text-ink-2">{t.iosStandalone}</p>
            )}

            {permission === "denied" && (
              <p className="text-sm leading-6 text-ink-2" role="status">
                {t.deniedHelp}
              </p>
            )}

            {permission !== "denied" && (
              <div className="flex flex-wrap items-center gap-3">
                {subscribed ? (
                  <button
                    type="button"
                    onClick={() => void onDisable()}
                    disabled={busy}
                    className="h-10 px-4 text-sm font-medium text-ink ring-1 ring-inset ring-line hover:bg-surface-2 disabled:opacity-50"
                  >
                    {busy ? t.working : t.disable}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => void onEnable()}
                    disabled={busy || iosNeedsStandalone}
                    className="h-10 border border-[var(--lg-rule)] px-4 text-[0.75rem] font-display uppercase tracking-[0.08em] text-[var(--lg-ink)] transition-colors duration-150 hover:bg-[var(--lg-field-2)] disabled:border-[var(--lg-hair)] disabled:text-[var(--lg-ink-3)] disabled:hover:bg-transparent"
                  >
                    {busy ? t.working : t.enable}
                  </button>
                )}
              </div>
            )}

            {error && (
              <p className="text-sm text-ink" role="alert">
                {error}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
