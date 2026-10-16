"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Compass,
  Ticket,
  Users,
  User,
  GraduationCap,
  X,
} from "lucide-react";

const NAV = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/discover", label: "Discover Events", icon: Compass },
  { href: "/my-events", label: "My Events", icon: Ticket },
  { href: "/clubs", label: "Clubs", icon: Users },
  { href: "/profile", label: "Profile", icon: User },
];

export function Sidebar({ mobileOpen, onClose }: { mobileOpen: boolean; onClose: () => void }) {
  const pathname = usePathname();

  const content = (
    <div className="flex h-full flex-col">
      <Link href="/" className="flex items-center gap-2.5 px-5 pt-6 pb-5" onClick={onClose}>
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-white shadow-card">
          <GraduationCap size={22} strokeWidth={2.2} />
        </span>
        <span className="leading-tight">
          <span className="block text-[17px] font-800 font-extrabold tracking-tight text-slate-900">
            CampusConnect
          </span>
          <span className="block text-[12px] font-medium text-slate-500">Student engagement</span>
        </span>
      </Link>

      <nav className="flex-1 space-y-1 px-3" aria-label="Primary">
        {NAV.map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[14px] font-semibold transition-colors ${
                active
                  ? "bg-brand-600 text-white shadow-[0_8px_20px_-8px_rgba(79,70,229,0.7)]"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Icon size={19} strokeWidth={active ? 2.4 : 2} />
              {item.label}
              {item.href === "/my-events" && (
                <span
                  className={`ml-auto rounded-full px-2 py-0.5 text-[11px] font-bold ${
                    active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  My
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4">
        <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-[#7c3aed] p-4 text-white">
          <p className="text-[13.5px] font-bold leading-snug">Fall Fest Week is live!</p>
          <p className="mt-1 text-[12.5px] leading-snug text-white/80">
            12 events across 5 days. Grab your squad.
          </p>
          <Link
            href="/discover"
            onClick={onClose}
            className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-white px-3 py-2 text-[13px] font-bold text-brand-700 hover:bg-brand-50"
          >
            Explore events
          </Link>
        </div>
        <p className="mt-3 px-1 text-[11.5px] text-slate-400">v1.0 • Interactive prototype</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[264px] border-r border-slate-200/80 bg-white lg:block">
        {content}
      </aside>

      {/* Mobile drawer */}
      <div className={`fixed inset-0 z-50 lg:hidden ${mobileOpen ? "" : "pointer-events-none"}`}>
        <div
          onClick={onClose}
          className={`absolute inset-0 bg-slate-900/40 transition-opacity ${mobileOpen ? "opacity-100" : "opacity-0"}`}
        />
        <aside
          className={`absolute inset-y-0 left-0 w-[300px] max-w-[85vw] bg-white shadow-pop transition-transform duration-200 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="absolute right-3 top-5 rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
          {content}
        </aside>
      </div>
    </>
  );
}
