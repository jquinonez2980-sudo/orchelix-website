"use client";

import { useAuth, useOrganization } from "@clerk/nextjs";
import { useEffect, useState } from "react";

/* Team Members — thin UI over Clerk's own Organization membership model.
   No backend involved: useOrganization()/useAuth() talk directly to Clerk,
   which already owns invites, roles, and removal for the active org (== the
   Esmi tenant, by this app's slug-equals-tenant-id convention). Nothing here
   is a parallel user system — it's a styled front end for Clerk's own APIs. */

const inputCls =
  "w-full rounded-md border border-line bg-surface px-2.5 py-2 text-sm text-ink " +
  "focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500";
const labelCls = "flex flex-col gap-1 text-xs font-medium text-ink-3";

const dateFmt = new Intl.DateTimeFormat(undefined, {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function fmtDate(d: Date | string | null | undefined): string {
  if (!d) return "—";
  const dt = new Date(d);
  return Number.isNaN(dt.getTime()) ? "—" : dateFmt.format(dt);
}

type RoleOption = { key: string; name: string };

function friendlyClerkError(e: unknown, fallback: string): string {
  if (e && typeof e === "object" && "errors" in e) {
    const errors = (e as { errors?: Array<{ message?: string; longMessage?: string }> }).errors;
    const msg = errors?.[0]?.longMessage || errors?.[0]?.message;
    if (msg) return msg;
  }
  return e instanceof Error ? e.message : fallback;
}

/* ── invite form ─────────────────────────────────────────────────────────── */

function InviteForm({
  roles,
  onInvited,
}: {
  roles: RoleOption[];
  onInvited: () => void;
}) {
  const { organization } = useOrganization();
  const [email, setEmail] = useState("");
  const [roleOverride, setRoleOverride] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const role = roleOverride || roles[0]?.key || "";

  const submit = async () => {
    if (!organization || !email.trim() || !role) return;
    setSending(true);
    setError(null);
    setSent(false);
    try {
      await organization.inviteMember({ emailAddress: email.trim(), role });
      setEmail("");
      setSent(true);
      onInvited();
    } catch (e) {
      setError(friendlyClerkError(e, "Failed to send invite"));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="rounded-lg border border-line bg-surface p-4 shadow-sm sm:p-6">
      <h2 className="font-display text-base font-semibold text-ink">Invite a team member</h2>
      <p className="mt-1 text-sm text-ink-3">
        They&apos;ll get an email invite to join this business&apos;s dashboard.
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <label className={`${labelCls} sm:flex-1`}>
          Email address
          <input
            type="email"
            className={inputCls}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setSent(false);
            }}
            placeholder="name@example.com"
          />
        </label>
        {roles.length > 0 && (
          <label className={labelCls}>
            Role
            <select
              className={inputCls}
              value={role}
              onChange={(e) => setRoleOverride(e.target.value)}
            >
              {roles.map((r) => (
                <option key={r.key} value={r.key}>
                  {r.name}
                </option>
              ))}
            </select>
          </label>
        )}
        <button
          type="button"
          disabled={sending || !email.trim() || !role}
          onClick={submit}
          className="h-9 shrink-0 rounded-md bg-navy-600 px-4 text-sm font-medium text-white hover:bg-navy-500 disabled:opacity-50"
        >
          {sending ? "Sending…" : "Send invite"}
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {!error && sent && <p className="mt-2 text-sm text-teal-700">Invite sent.</p>}
    </div>
  );
}

/* ── members list ────────────────────────────────────────────────────────── */

type MembershipLike = {
  id: string;
  role: string;
  roleName: string;
  createdAt: Date;
  publicUserData?: {
    firstName?: string | null;
    lastName?: string | null;
    identifier?: string;
  } | null;
  destroy: () => Promise<unknown>;
};

function memberName(m: MembershipLike): string {
  const first = m.publicUserData?.firstName ?? "";
  const last = m.publicUserData?.lastName ?? "";
  const full = `${first} ${last}`.trim();
  return full || m.publicUserData?.identifier || "Unknown";
}

function MemberRow({
  membership,
  canManage,
  isSelf,
  onChanged,
}: {
  membership: MembershipLike;
  canManage: boolean;
  isSelf: boolean;
  onChanged: () => void;
}) {
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = async () => {
    setRemoving(true);
    setError(null);
    try {
      await membership.destroy();
      onChanged();
    } catch (e) {
      setError(friendlyClerkError(e, "Failed to remove"));
      setRemoving(false);
    }
  };

  return (
    <div className="border-t border-line px-4 py-3 first:border-t-0 sm:px-6">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-ink">
            {memberName(membership)}
            {isSelf && <span className="ml-1.5 text-xs font-normal text-ink-4">(you)</span>}
          </p>
          <p className="truncate text-sm text-ink-3">{membership.publicUserData?.identifier}</p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="inline-flex items-center rounded-full bg-navy-50 px-2.5 py-0.5 text-xs font-medium text-navy-500 ring-1 ring-inset ring-navy-200">
            {membership.roleName}
          </span>
          {canManage && !isSelf && (
            <button
              type="button"
              disabled={removing}
              onClick={remove}
              className="text-xs font-medium text-red-600 hover:underline disabled:opacity-50"
            >
              {removing ? "Removing…" : "Remove"}
            </button>
          )}
        </div>
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

/* ── pending invitations ─────────────────────────────────────────────────── */

type InvitationLike = {
  id: string;
  emailAddress: string;
  roleName: string;
  createdAt: Date;
  revoke: () => Promise<unknown>;
};

function InvitationRow({
  invitation,
  canManage,
  onChanged,
}: {
  invitation: InvitationLike;
  canManage: boolean;
  onChanged: () => void;
}) {
  const [revoking, setRevoking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const revoke = async () => {
    setRevoking(true);
    setError(null);
    try {
      await invitation.revoke();
      onChanged();
    } catch (e) {
      setError(friendlyClerkError(e, "Failed to revoke"));
      setRevoking(false);
    }
  };

  return (
    <div className="border-t border-line px-4 py-3 first:border-t-0 sm:px-6">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-ink">{invitation.emailAddress}</p>
          <p className="text-xs text-ink-4">Invited {fmtDate(invitation.createdAt)}</p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="inline-flex items-center rounded-full bg-gold-50 px-2.5 py-0.5 text-xs font-medium text-gold-800 ring-1 ring-inset ring-gold-200">
            Pending · {invitation.roleName}
          </span>
          {canManage && (
            <button
              type="button"
              disabled={revoking}
              onClick={revoke}
              className="text-xs font-medium text-red-600 hover:underline disabled:opacity-50"
            >
              {revoking ? "Revoking…" : "Revoke"}
            </button>
          )}
        </div>
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

/* ── main ────────────────────────────────────────────────────────────────── */

export default function TeamManager() {
  const { has, isLoaded: authLoaded } = useAuth();
  const { organization, isLoaded, membership, memberships, invitations } = useOrganization({
    memberships: true,
    invitations: { status: ["pending"] },
  });
  const [roles, setRoles] = useState<RoleOption[]>([]);

  useEffect(() => {
    if (!organization) return;
    organization
      .getRoles()
      .then((res) => setRoles(res.data.map((r) => ({ key: r.key, name: r.name }))))
      .catch(() => setRoles([]));
  }, [organization]);

  if (!isLoaded || !authLoaded) {
    return (
      <div className="animate-pulse space-y-4 rounded-lg border border-line bg-surface p-6 shadow-sm">
        <div className="h-4 w-40 rounded bg-surface-2" />
        <div className="h-9 w-full rounded bg-surface-2" />
        <div className="h-9 w-full rounded bg-surface-2" />
      </div>
    );
  }

  if (!organization) {
    return (
      <p className="rounded-lg border border-line bg-surface px-6 py-16 text-center text-sm text-ink-3 shadow-sm">
        No organization selected.
      </p>
    );
  }

  const canManage = Boolean(has?.({ permission: "org:sys_memberships:manage" }));
  const refresh = () => {
    memberships?.revalidate?.();
    invitations?.revalidate?.();
  };

  const memberList = memberships?.data ?? [];
  const membersLoading = memberships?.isLoading ?? false;
  const invitationList = invitations?.data ?? [];

  return (
    <div>
      {canManage && <InviteForm roles={roles} onInvited={refresh} />}
      {!canManage && (
        <div className="rounded-lg border border-line bg-surface-2/50 px-4 py-3 text-sm text-ink-3">
          Only organization admins can invite or remove team members.
        </div>
      )}

      <div className={`overflow-hidden rounded-lg border border-line bg-surface shadow-sm ${canManage ? "mt-6" : "mt-4"}`}>
        <div className="border-b border-line px-4 py-4 sm:px-6">
          <h2 className="font-display text-base font-semibold text-ink">
            Members {!membersLoading ? `(${memberList.length})` : ""}
          </h2>
        </div>
        {membersLoading && <p className="px-4 py-6 text-sm text-ink-4 sm:px-6">Loading…</p>}
        {!membersLoading && memberList.length === 0 && (
          <p className="px-4 py-6 text-sm text-ink-4 sm:px-6">No members yet.</p>
        )}
        {!membersLoading &&
          memberList.map((m) => (
            <MemberRow
              key={m.id}
              membership={m}
              canManage={canManage}
              isSelf={m.id === membership?.id}
              onChanged={refresh}
            />
          ))}
      </div>

      {invitationList.length > 0 && (
        <div className="mt-6 overflow-hidden rounded-lg border border-line bg-surface shadow-sm">
          <div className="border-b border-line px-4 py-4 sm:px-6">
            <h2 className="font-display text-base font-semibold text-ink">
              Pending invitations ({invitationList.length})
            </h2>
          </div>
          {invitationList.map((i) => (
            <InvitationRow key={i.id} invitation={i} canManage={canManage} onChanged={refresh} />
          ))}
        </div>
      )}
    </div>
  );
}
