import {
  AudioLines,
  BarChart3,
  BookOpen,
  CalendarDays,
  CreditCard,
  Home,
  Inbox,
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

export const NAV_ITEMS: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: Home },
  { label: "Calls", href: "/dashboard/calls", icon: Phone },
  { label: "Chats", href: "/dashboard/chats", icon: MessageSquare },
  { label: "Appointments", href: "/dashboard/appointments", icon: CalendarDays },
  { label: "Leads", href: "/dashboard/leads", icon: Inbox },
  { label: "Knowledge", href: "/dashboard/knowledge", icon: BookOpen },
  { label: "Voice", href: "/dashboard/voice", icon: AudioLines },
  { label: "Usage", href: "/dashboard/usage", icon: BarChart3 },
  { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
  { label: "Team", href: "/dashboard/team", icon: Users },
  { label: "Admin", href: "/dashboard/admin/tenants", icon: ShieldCheck, staffOnly: true },
  {
    label: "Onboarding",
    href: "/dashboard/admin/onboarding",
    icon: UserPlus,
    staffOnly: true,
  },
];

export function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}
