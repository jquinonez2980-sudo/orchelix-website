import {
  AudioLines,
  BarChart3,
  BookOpen,
  CalendarClock,
  CalendarDays,
  CreditCard,
  Home,
  Inbox,
  LineChart,
  MessageSquare,
  Phone,
  Settings,
  ShieldCheck,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  staffOnly?: boolean;
};

export type NavGroup = {
  id: string;
  /** Section label in the sidebar. Null = unlabelled primary block. */
  label: string | null;
  items: NavItem[];
};

/* Owner-operator IA: three groups instead of a flat 13-item list.
   Work = what Esmi did / needs attention. Configure = how Esmi behaves.
   Account = plan, usage, reporting. Internal is staff-only. */

export const NAV_GROUPS: NavGroup[] = [
  {
    id: "work",
    label: "Work",
    items: [
      { label: "Overview", href: "/dashboard", icon: Home },
      { label: "Calls", href: "/dashboard/calls", icon: Phone },
      { label: "Chats", href: "/dashboard/chats", icon: MessageSquare },
      { label: "Appointments", href: "/dashboard/appointments", icon: CalendarDays },
      { label: "Leads", href: "/dashboard/leads", icon: Inbox },
    ],
  },
  {
    id: "configure",
    label: "Configure",
    items: [
      { label: "Knowledge", href: "/dashboard/knowledge", icon: BookOpen },
      { label: "Voice", href: "/dashboard/voice", icon: AudioLines },
      { label: "Scheduling", href: "/dashboard/scheduling", icon: CalendarClock },
      { label: "Settings", href: "/dashboard/settings", icon: Settings },
      { label: "Team", href: "/dashboard/team", icon: Users },
    ],
  },
  {
    id: "account",
    label: "Account",
    items: [
      { label: "Usage", href: "/dashboard/usage", icon: BarChart3 },
      { label: "Analytics", href: "/dashboard/analytics", icon: LineChart },
      { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
    ],
  },
  {
    id: "internal",
    label: "Internal",
    items: [
      { label: "Admin", href: "/dashboard/admin/tenants", icon: ShieldCheck, staffOnly: true },
      {
        label: "Onboarding",
        href: "/dashboard/admin/onboarding",
        icon: UserPlus,
        staffOnly: true,
      },
    ],
  },
];

/** Flat list for anything that still needs every item without groups. */
export const NAV_ITEMS: NavItem[] = NAV_GROUPS.flatMap((g) => g.items);

export function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function visibleNavGroups(isOrchelixStaff: boolean): NavGroup[] {
  return NAV_GROUPS.map((group) => ({
    ...group,
    items: group.items.filter((i) => !i.staffOnly || isOrchelixStaff),
  })).filter((group) => group.items.length > 0);
}
