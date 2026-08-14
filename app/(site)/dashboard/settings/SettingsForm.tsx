"use client";

import Action from "../Action";

import { useEffect, useState } from "react";
import {
  fetchConfig,
  updateConfig,
  type ConfigResponse,
  type ConfigUpdate,
  type LocationSettings,
  type PlatformConfig,
  type ServiceSettings,
} from "@/app/lib/esmiPlatform";
import { useDashI18n } from "../i18n";
import { useActiveOrgSlug } from "../useActiveOrgSlug";

const WEEKDAYS_EN = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const WEEKDAYS_ES = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const inputCls =
  "h-9 w-full rounded-md border border-line bg-surface px-2.5 text-sm text-ink " +
  "focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500";
const labelCls = "flex flex-col gap-1 text-xs font-medium text-ink-3";

/* Full IANA list where the browser exposes it, with a short fallback for
   engines that don't implement supportedValuesOf. Computed once at module
   load — the list is static for the life of the page. */
const TIMEZONES: string[] = (() => {
  try {
    const all = Intl.supportedValuesOf("timeZone");
    if (all.length) return all;
  } catch {
    /* older engine — fall through */
  }
  return [
    "America/Toronto",
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Phoenix",
    "America/Los_Angeles",
    "America/Vancouver",
    "America/Mexico_City",
    "Europe/London",
    "Europe/Madrid",
  ];
})();

/* Shown only when the timezone actually changed. business_hours are stored as
   clock times, so re-reading them in another zone silently moves every future
   appointment Esmi offers — while events already on the calendar keep their
   absolute times and don't move. That divergence is the thing a tenant has to
   understand before saving, so Save stays disabled until they tick the box. */
function TimezoneConfirm({
  from,
  to,
  checked,
  onChange,
}: {
  from: string;
  to: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
      <p className="text-sm font-semibold text-amber-900">
        Changing your timezone changes when Esmi books
      </p>
      <p className="mt-1.5 text-xs leading-5 text-amber-800">
        Your opening hours are stored as clock times, not fixed moments. Saving
        this reads them in <strong className="font-semibold">{to}</strong> instead
        of <strong className="font-semibold">{from}</strong> — so a 9:00 AM open
        still says 9:00 AM, but it&apos;s a different moment in the day than it is
        now.
      </p>
      <p className="mt-1.5 text-xs leading-5 text-amber-800">
        Appointments already booked keep their original times and won&apos;t move.
        Only the availability Esmi offers from here on follows the new timezone.
      </p>
      <label className="mt-3 flex cursor-pointer items-start gap-2 text-xs font-medium text-amber-900">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
        />
        <span>I understand — change the timezone to {to}</span>
      </label>
    </div>
  );
}

function slugify(name: string, taken: Set<string>): string {
  const base = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "service";
  let id = base;
  let n = 2;
  while (taken.has(id)) {
    id = `${base}-${n++}`;
  }
  return id;
}

/* ── small controls ─────────────────────────────────────────────────────── */

function HoursRange({
  value,
  onChange,
}: {
  value: [number, number];
  onChange: (v: [number, number]) => void;
}) {
  const { t } = useDashI18n();
  return (
    <div className="flex items-center gap-2">
      <label className={labelCls}>
        {t.ui.open}
        <input
          type="number"
          min={0}
          max={24}
          value={value[0]}
          onChange={(e) => onChange([Number(e.target.value), value[1]])}
          className={`${inputCls} w-20`}
        />
      </label>
      <span className="mt-4 text-ink-4">–</span>
      <label className={labelCls}>
        {t.ui.close}
        <input
          type="number"
          min={0}
          max={24}
          value={value[1]}
          onChange={(e) => onChange([value[0], Number(e.target.value)])}
          className={`${inputCls} w-20`}
        />
      </label>
    </div>
  );
}

function WeekdayPicker({
  value,
  onChange,
}: {
  value: number[];
  onChange: (v: number[]) => void;
}) {
  const { locale } = useDashI18n();
  const WEEKDAYS = locale === "es" ? WEEKDAYS_ES : WEEKDAYS_EN;
  const set = new Set(value);
  return (
    <div className="flex flex-wrap gap-1.5">
      {WEEKDAYS.map((label, i) => {
        const on = set.has(i);
        return (
          <button
            key={i}
            type="button"
            onClick={() => {
              const next = new Set(set);
              if (on) next.delete(i);
              else next.add(i);
              onChange([...next].sort());
            }}
            className={`rounded-full px-3 py-1.5 text-xs font-medium ring-1 ring-inset transition ${
              on
                ? "bg-teal-50 text-teal-800 ring-teal-200"
                : "bg-surface text-ink-3 ring-line hover:bg-surface-2"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-line px-4 py-5 first:border-t-0 sm:px-6">
      <h2 className="font-display text-base font-semibold text-ink">{title}</h2>
      {description && <p className="mt-1 text-sm text-ink-3">{description}</p>}
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

/* ── location card ──────────────────────────────────────────────────────── */

function LocationCard({
  id,
  loc,
  onChange,
}: {
  id: string;
  loc: LocationSettings;
  onChange: (next: LocationSettings) => void;
}) {
  return (
    <div className="rounded-md border border-line p-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className={labelCls}>
          Location name
          <input
            className={inputCls}
            value={loc.name}
            onChange={(e) => onChange({ ...loc, name: e.target.value })}
          />
        </label>
        <label className={labelCls}>
          Phone
          <input
            className={inputCls}
            value={loc.phone}
            onChange={(e) => onChange({ ...loc, phone: e.target.value })}
          />
        </label>
        <label className={`${labelCls} sm:col-span-2`}>
          Address
          <input
            className={inputCls}
            value={loc.address}
            onChange={(e) => onChange({ ...loc, address: e.target.value })}
          />
        </label>
      </div>
      <div className="mt-4 flex flex-wrap items-end gap-6">
        <div>
          <span className="mb-1 block text-xs font-medium text-ink-3">Hours</span>
          <HoursRange
            value={loc.business_hours}
            onChange={(v) => onChange({ ...loc, business_hours: v })}
          />
        </div>
        <div>
          <span className="mb-1 block text-xs font-medium text-ink-3">Open days</span>
          <WeekdayPicker
            value={loc.business_days}
            onChange={(v) => onChange({ ...loc, business_days: v })}
          />
        </div>
      </div>
      <p className="mt-3 text-xs text-ink-4">
        Per-day hour overrides (id: {id}) carry over from the current config and
        aren&apos;t editable here yet — ask Orchelix if one needs to change.
      </p>
    </div>
  );
}

/* ── service row ────────────────────────────────────────────────────────── */

function ServiceRow({
  service,
  locationIds,
  onChange,
  onRemove,
}: {
  service: ServiceSettings;
  locationIds: string[];
  onChange: (next: ServiceSettings) => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-md border border-line p-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_auto]">
        <label className={labelCls}>
          Service name
          <input
            className={inputCls}
            value={service.name}
            onChange={(e) => onChange({ ...service, name: e.target.value })}
          />
        </label>
        <label className={labelCls}>
          Duration (min)
          <input
            type="number"
            min={5}
            max={480}
            className={`${inputCls} w-28`}
            value={service.duration_min}
            onChange={(e) => onChange({ ...service, duration_min: Number(e.target.value) })}
          />
        </label>
        {locationIds.length === 0 && (
          <label className={labelCls}>
            Price
            <input
              className={`${inputCls} w-28`}
              value={service.price}
              onChange={(e) => onChange({ ...service, price: e.target.value })}
              placeholder="$40"
            />
          </label>
        )}
      </div>
      {locationIds.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-3">
          {locationIds.map((lid) => (
            <label key={lid} className={labelCls}>
              Price ({lid})
              <input
                className={`${inputCls} w-28`}
                value={service.price_by_location[lid] ?? ""}
                onChange={(e) =>
                  onChange({
                    ...service,
                    price_by_location: { ...service.price_by_location, [lid]: e.target.value },
                  })
                }
                placeholder="$40"
              />
            </label>
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={onRemove}
        className="mt-3 text-xs font-medium text-rose-600 hover:underline"
      >
        Remove service
      </button>
    </div>
  );
}

/* ── main form ──────────────────────────────────────────────────────────── */

export default function SettingsForm({ onSaved }: { onSaved?: () => void } = {}) {
  const { t } = useDashI18n();
  const [data, setData] = useState<ConfigResponse | null>(null);
  const [form, setForm] = useState<PlatformConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  // Reset whenever the timezone returns to its saved value or a save lands, so
  // an acknowledgement can never carry over to a later, different change.
  const [tzConfirmed, setTzConfirmed] = useState(false);
  const orgSlug = useActiveOrgSlug();

  const load = () => {
    setLoading(true);
    setLoadError(null);
    fetchConfig()
      .then((d) => {
        setData(d);
        setForm(structuredClone(d.config));
        setLoading(false);
      })
      .catch((e: Error) => {
        setLoadError(e.message);
        setLoading(false);
      });
  };

  useEffect(load, [orgSlug]);

  if (loading) {
    return (
      <div className="space-y-4 rounded-lg border border-line bg-surface p-6 shadow-sm">
        <div className="h-4 w-40 rounded bg-surface-2" />
        <div className="h-9 w-full rounded bg-surface-2" />
        <div className="h-9 w-full rounded bg-surface-2" />
      </div>
    );
  }

  if (loadError || !data || !form) {
    return (
      <div className="rounded-lg border border-line bg-surface p-6 text-center shadow-sm">
        <p className="font-display text-base font-semibold text-ink">
          Couldn&apos;t load settings
        </p>
        <p className="mt-2 text-sm text-ink-3">{loadError}</p>
        <button
          type="button"
          onClick={load}
          className="border border-[var(--lg-rule)] px-4 py-2 font-display text-[0.75rem] uppercase tracking-[0.08em] text-[var(--lg-ink)] transition-colors duration-150 hover:bg-[var(--lg-field-2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lg-foil)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--lg-field)]"
        >
          Try again
        </button>
      </div>
    );
  }

  const locationIds = Object.keys(form.locations);
  const dirty = JSON.stringify(form) !== JSON.stringify(data.config);

  const tzChanged = form.business_tz.trim() !== data.config.business_tz;
  // Gate the whole save, not just the timezone field: a single PUT publishes
  // one config version, so letting the other edits through would carry the
  // unacknowledged timezone with them.
  const tzBlocked = tzChanged && !tzConfirmed;

  const setLocation = (id: string, next: LocationSettings) =>
    setForm((f) => (f ? { ...f, locations: { ...f.locations, [id]: next } } : f));

  const setService = (id: string, next: ServiceSettings) =>
    setForm((f) => (f ? { ...f, services: { ...f.services, [id]: next } } : f));

  const removeService = (id: string) =>
    setForm((f) => {
      if (!f) return f;
      const services = { ...f.services };
      delete services[id];
      return { ...f, services };
    });

  const addService = () =>
    setForm((f) => {
      if (!f) return f;
      const id = slugify("New service", new Set(Object.keys(f.services)));
      return {
        ...f,
        services: {
          ...f.services,
          [id]: {
            name: "New service",
            duration_min: 30,
            price: "",
            price_by_location: {},
            name_es: "",
          },
        },
      };
    });

  const handleSave = async () => {
    if (!form) return;
    setSaving(true);
    setSaveError(null);
    const update: ConfigUpdate = {
      company_name: form.company_name,
      business_tz: form.business_tz.trim(),
      greeting: form.greeting,
      transfer_phone: form.transfer_phone,
      emails: form.emails,
      services: form.services,
      expected_version: data.version ?? undefined,
    };
    if (form.has_locations) {
      update.locations = Object.fromEntries(
        Object.entries(form.locations).map(([id, loc]) => [
          id,
          {
            name: loc.name,
            address: loc.address,
            phone: loc.phone,
            business_hours: loc.business_hours,
            business_days: loc.business_days,
          },
        ]),
      );
    } else {
      update.business_hours = form.business_hours;
      update.business_days = form.business_days;
    }

    try {
      const result = await updateConfig(update);
      setData(result);
      setForm(structuredClone(result.config));
      setSavedAt(Date.now());
      setTzConfirmed(false);
      onSaved?.();
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface shadow-sm">
      <Section title={t.ui.businessProfile}>
        <label className={labelCls}>
          {t.ui.businessName}
          <input
            className={inputCls}
            value={form.company_name}
            onChange={(e) => setForm({ ...form, company_name: e.target.value })}
          />
        </label>

        {/* datalist rather than a <select>: ~400 zones is unusable as a plain
            dropdown, and this gives native type-to-filter with no dependency
            and no custom combobox to keep accessible. */}
        <label className={`${labelCls} mt-4`}>
          {t.ui.timezone}
          <input
            className={inputCls}
            list="tz-options"
            value={form.business_tz}
            onChange={(e) => setForm({ ...form, business_tz: e.target.value })}
            spellCheck={false}
            autoComplete="off"
          />
          <datalist id="tz-options">
            {TIMEZONES.map((tz) => (
              <option key={tz} value={tz} />
            ))}
          </datalist>
        </label>
        <p className="mt-1 text-xs text-ink-3">{t.ui.timezoneHint}</p>

        {tzChanged && (
          <TimezoneConfirm
            from={data.config.business_tz}
            to={form.business_tz}
            checked={tzConfirmed}
            onChange={setTzConfirmed}
          />
        )}
      </Section>

      <Section title={t.ui.greeting} description={t.ui.greetingDesc}>
        <textarea
          rows={3}
          maxLength={500}
          className={`${inputCls} h-auto`}
          value={form.greeting}
          onChange={(e) => setForm({ ...form, greeting: e.target.value })}
          placeholder={t.ui.greetingPlaceholder}
        />
      </Section>

      <Section title={t.ui.escalation} description={t.ui.escalationDesc}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className={labelCls}>
            {t.ui.transferPhone}
            <input
              className={inputCls}
              value={form.transfer_phone}
              onChange={(e) => setForm({ ...form, transfer_phone: e.target.value })}
              placeholder="647-555-0100"
            />
          </label>
          <label className={labelCls}>
            {t.ui.escalationEmail}
            <input
              type="email"
              className={inputCls}
              value={form.emails.escalation_to}
              onChange={(e) =>
                setForm({ ...form, emails: { ...form.emails, escalation_to: e.target.value } })
              }
            />
          </label>
        </div>
        <div className="rounded-md bg-surface-2 p-3 text-sm">
          <p className="font-medium text-ink-2">{t.ui.whenEscalate}</p>
          <ul className="mt-1.5 list-disc space-y-1 pl-4 text-ink-3">
            <li>{t.ui.escBullet1}</li>
            <li>{t.ui.escBullet2}</li>
            <li>{t.ui.escBullet3}</li>
          </ul>
          <p className="mt-2 text-xs text-ink-4">{t.ui.escNote}</p>
        </div>
      </Section>

      <Section title={t.ui.bookingNotifications}>
        <label className={labelCls}>
          {t.ui.bookingTo}
          <input
            type="email"
            className={inputCls}
            value={form.emails.booking_to}
            onChange={(e) =>
              setForm({ ...form, emails: { ...form.emails, booking_to: e.target.value } })
            }
          />
        </label>
      </Section>

      {form.has_locations ? (
        <Section title={t.ui.locationsHours}>
          <div className="space-y-4">
            {Object.entries(form.locations).map(([id, loc]) => (
              <LocationCard key={id} id={id} loc={loc} onChange={(next) => setLocation(id, next)} />
            ))}
          </div>
        </Section>
      ) : (
        <Section title={t.ui.hours}>
          <div className="flex flex-wrap items-end gap-6">
            <div>
              <span className="mb-1 block text-xs font-medium text-ink-3">{t.ui.hours}</span>
              <HoursRange
                value={form.business_hours}
                onChange={(v) => setForm({ ...form, business_hours: v })}
              />
            </div>
            <div>
              <span className="mb-1 block text-xs font-medium text-ink-3">{t.ui.openDays}</span>
              <WeekdayPicker
                value={form.business_days}
                onChange={(v) => setForm({ ...form, business_days: v })}
              />
            </div>
          </div>
        </Section>
      )}

      <Section title={t.ui.services}>
        <div className="space-y-4">
          {Object.entries(form.services).map(([id, svc]) => (
            <ServiceRow
              key={id}
              service={svc}
              locationIds={locationIds}
              onChange={(next) => setService(id, next)}
              onRemove={() => removeService(id)}
            />
          ))}
          {Object.keys(form.services).length === 0 && (
            <p className="text-sm text-ink-3">{t.ui.noServices}</p>
          )}
          <button
            type="button"
            onClick={addService}
            className="text-[0.8125rem] font-medium text-[var(--lg-ink-2)] underline-offset-4 hover:text-[var(--lg-ink)] hover:underline"
          >
            {t.ui.addService}
          </button>
        </div>
      </Section>

      <div className="flex items-center gap-3 border-t border-line bg-surface-2 px-4 py-4 sm:px-6">
        {/* The one primary on this page. Everything else is secondary or
            quiet — see Action.tsx on the Stamp Scarcity Rule. */}
        <Action
          weight="primary"
          disabled={!dirty || tzBlocked}
          pending={saving}
          pendingLabel={t.ui.saving}
          onClick={handleSave}
        >
          {t.ui.saveChanges}
        </Action>
        {tzBlocked && (
          <span className="text-sm text-amber-800">{t.ui.confirmTz}</span>
        )}
        {saveError && <span className="text-sm text-rose-600">{saveError}</span>}
        {!saveError && savedAt && !dirty && (
          <span className="text-sm text-[var(--lg-ink-2)]">{t.ui.saved}</span>
        )}
        {dirty && !saving && <span className="text-sm text-ink-4">{t.ui.unsaved}</span>}
      </div>
    </div>
  );
}
