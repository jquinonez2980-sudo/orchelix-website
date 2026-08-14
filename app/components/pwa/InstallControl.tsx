"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Download, X } from "lucide-react";
import { useDashI18n } from "@/app/(site)/dashboard/i18n";
import {
  dismissInstall,
  isIosSafari,
  isStandaloneDisplay,
  wasInstallDismissed,
  type BeforeInstallPromptEvent,
} from "@/app/lib/pwa";

const copy = {
  en: {
    install: "Install",
    installAria: "Install Esmi Dashboard",
    dismissAria: "Dismiss install prompt",
    iosTitle: "Add to Home Screen",
    iosAria: "How to add Esmi to your Home Screen",
    iosBody:
      "Tap Share, then Add to Home Screen. Esmi opens like an app — no browser chrome.",
    iosClose: "Close",
  },
  es: {
    install: "Instalar",
    installAria: "Instalar Esmi Dashboard",
    dismissAria: "Cerrar la sugerencia de instalación",
    iosTitle: "Añadir a inicio",
    iosAria: "Cómo añadir Esmi a la pantalla de inicio",
    iosBody:
      "Toca Compartir y luego Añadir a pantalla de inicio. Esmi abre como una app, sin el navegador.",
    iosClose: "Cerrar",
  },
} as const;

export default function InstallControl() {
  const { locale } = useDashI18n();
  const t = copy[locale] ?? copy.en;
  const tipId = useId();

  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [standalone, setStandalone] = useState(false);
  const [dismissed, setDismissed] = useState(true);
  const [ios, setIos] = useState(false);
  const [iosOpen, setIosOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStandalone(isStandaloneDisplay());
    setDismissed(wasInstallDismissed());
    setIos(isIosSafari());

    const onPrompt = (event: Event) => {
      event.preventDefault();
      setDeferred(event as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setDeferred(null);
      dismissInstall();
      setDismissed(true);
      setIosOpen(false);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  useEffect(() => {
    if (!iosOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIosOpen(false);
    };
    const onPointer = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setIosOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [iosOpen]);

  const onInstall = useCallback(async () => {
    if (!deferred) return;
    await deferred.prompt();
    try {
      await deferred.userChoice;
    } catch {
      /* choice is optional */
    }
    setDeferred(null);
  }, [deferred]);

  const onDismiss = useCallback(() => {
    dismissInstall();
    setDismissed(true);
    setDeferred(null);
    setIosOpen(false);
  }, []);

  if (standalone || dismissed) return null;

  const showChromeInstall = Boolean(deferred);
  const showIosHint = ios && !deferred;
  if (!showChromeInstall && !showIosHint) return null;

  return (
    <div ref={rootRef} className="relative flex items-center gap-0.5">
      {showChromeInstall ? (
        <button
          type="button"
          onClick={() => void onInstall()}
          aria-label={t.installAria}
          className="lg-fig inline-flex h-10 items-center gap-1.5 px-2 text-xs font-medium uppercase tracking-wide text-ink-3 hover:text-ink"
          style={{ letterSpacing: "0.1em" }}
        >
          <Download className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
          <span className="hidden sm:inline">{t.install}</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setIosOpen((open) => !open)}
          aria-label={t.iosAria}
          aria-expanded={iosOpen}
          aria-controls={tipId}
          className="lg-fig inline-flex h-10 items-center gap-1.5 px-2 text-xs font-medium uppercase tracking-wide text-ink-3 hover:text-ink"
          style={{ letterSpacing: "0.1em" }}
        >
          <Download className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
          <span className="hidden sm:inline">{t.iosTitle}</span>
        </button>
      )}
      <button
        type="button"
        onClick={onDismiss}
        aria-label={t.dismissAria}
        className="inline-flex h-8 w-8 items-center justify-center text-ink-3 hover:text-ink"
      >
        <X className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
      </button>
      {showIosHint && iosOpen && (
        <div
          id={tipId}
          role="dialog"
          aria-label={t.iosTitle}
          className="absolute right-0 top-full z-30 mt-2 w-72 border border-line bg-surface px-4 py-3"
          style={{ borderTop: "2px solid var(--lg-rule)" }}
        >
          <p className="font-display text-sm font-semibold uppercase tracking-tight text-ink">
            {t.iosTitle}
          </p>
          <p className="mt-1.5 text-sm leading-6 text-ink-2">{t.iosBody}</p>
          <button
            type="button"
            onClick={() => setIosOpen(false)}
            className="lg-fig mt-3 text-xs font-medium uppercase tracking-wide text-ink-3 hover:text-ink"
            style={{ letterSpacing: "0.1em" }}
          >
            {t.iosClose}
          </button>
        </div>
      )}
    </div>
  );
}
