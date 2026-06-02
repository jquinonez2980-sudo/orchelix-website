import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Demo",
  description:
    "Book a 30-minute strategy call with a senior Orchelix consultant. See how AI agents and an AI receptionist can run lead qualification, calls, and operations for your business.",
  alternates: { canonical: "/book" },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
