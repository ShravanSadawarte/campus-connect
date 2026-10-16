"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Compass, LayoutDashboard, Ticket, Users, User } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

const TABS = [
  { href: "/", label: "Home", icon: LayoutDashboard },
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/my-events", label: "Tickets", icon: Ticket },
  { href: "/clubs", label: "Clubs", icon: Users },
  { href: "/profile", label: "Profile", icon: User },
];

export function AppShell({
  children,
  searchValue,
  onSearch,
  searchPlaceholder,
}: {
  children: React.ReactNode;
  searchValue?: string;
  onSearch?: (v: string) => void;
  searchPlaceholder?: string;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="lg:pl-[264px]">
        <Header
          onMenu={() => setMobileOpen(true)}
          searchValue={searchValue}
          onSearch={onSearch}
          searchPlaceholder={searchPlaceholder}
        />
        <main className="mx-auto max-w-[1200px] px-4 pb-24 pt-5 sm:px-6 lg:pb-12">{children}</main>
      </div>

      {/* Mobile bottom nav */}
      <nav
        className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur lg:hidden"
        aria-label="Mobile"
      >
        <div className="grid grid-cols-5">
          {TABS.map((t) => {
            const active = t.href === "/" ? pathname === "/" : pathname.startsWith(t.href);
            const Icon = t.icon;
            return (
              <Link
                key={t.href}
                href={t.href}
                className={`flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-bold ${
                  active ? "text-brand-600" : "text-slate-400"
                }`}
              >
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                {t.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
