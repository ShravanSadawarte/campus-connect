"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Bell, ChevronDown, LogOut, Menu, Search, Settings, User as UserIcon } from "lucide-react";
import { useApp } from "@/lib/store";
import { CURRENT_STUDENT } from "@/lib/data";

export function NotificationPanel({ onClose }: { onClose?: () => void }) {
  const { notifications, markAllRead, markRead } = useApp();
  return (
    <div className="w-[340px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-pop">
      <div className="flex items-center justify-between px-4 py-3.5">
        <p className="text-[14.5px] font-extrabold text-slate-900">Notifications</p>
        <button onClick={markAllRead} className="text-[12.5px] font-bold text-brand-600 hover:text-brand-700">
          Mark all read
        </button>
      </div>
      <div className="max-h-[380px] divide-y divide-slate-100 overflow-y-auto">
        {notifications.map((n) => (
          <button
            key={n.id}
            onClick={() => markRead(n.id)}
            className={`flex w-full gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50 ${
              n.unread ? "bg-brand-50/50" : ""
            }`}
          >
            <span
              className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full text-[13px] font-bold ${
                n.kind === "event"
                  ? "bg-violet-100 text-violet-700"
                  : n.kind === "club"
                  ? "bg-emerald-100 text-emerald-700"
                  : n.kind === "reminder"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {n.kind === "event" ? "Ev" : n.kind === "club" ? "Cl" : n.kind === "reminder" ? "Re" : "Sy"}
            </span>
            <span className="min-w-0">
              <span className="flex items-center gap-2">
                <span className="truncate text-[13.5px] font-bold text-slate-900">{n.title}</span>
                {n.unread && <span className="h-2 w-2 shrink-0 rounded-full bg-brand-600" />}
              </span>
              <span className="mt-0.5 line-clamp-2 block text-[12.5px] leading-snug text-slate-500">{n.body}</span>
              <span className="mt-1 block text-[11.5px] font-medium text-slate-400">{n.time}</span>
            </span>
          </button>
        ))}
      </div>
      <div className="border-t border-slate-100 bg-slate-50/60 px-4 py-2.5 text-center text-[12px] font-semibold text-slate-500">
        You're all caught up
      </div>
    </div>
  );
}

export function Header({
  onMenu,
  searchValue,
  onSearch,
  searchPlaceholder = "Search events, clubs…",
}: {
  onMenu: () => void;
  searchValue?: string;
  onSearch?: (v: string) => void;
  searchPlaceholder?: string;
}) {
  const { unreadCount } = useApp();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setNotifOpen(false);
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center gap-3 px-4 sm:px-6">
        <button
          onClick={onMenu}
          aria-label="Open menu"
          className="rounded-xl border border-slate-200 p-2.5 text-slate-700 hover:bg-slate-50 lg:hidden"
        >
          <Menu size={20} />
        </button>

        <div className="relative hidden flex-1 items-center sm:flex">
          <Search size={18} className="pointer-events-none absolute left-3.5 text-slate-400" />
          <input
            value={searchValue ?? ""}
            onChange={(e) => onSearch?.(e.target.value)}
            placeholder={searchPlaceholder}
            aria-label="Search"
            className="h-11 w-full max-w-[460px] rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-[14px] text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-100"
          />
        </div>

        {/* Mobile search */}
        <div className="relative flex flex-1 items-center sm:hidden">
          <Search size={17} className="pointer-events-none absolute left-3 text-slate-400" />
          <input
            value={searchValue ?? ""}
            onChange={(e) => onSearch?.(e.target.value)}
            placeholder="Search…"
            aria-label="Search"
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-[13.5px] focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-100"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => {
                setNotifOpen((v) => !v);
                setProfileOpen(false);
              }}
              aria-label="Notifications"
              aria-expanded={notifOpen}
              className={`relative rounded-xl border p-2.5 transition-colors ${
                notifOpen ? "border-brand-200 bg-brand-50 text-brand-700" : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Bell size={19} />
              {unreadCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-[20px] place-items-center rounded-full bg-rose-500 px-1 text-[11px] font-extrabold text-white">
                  {unreadCount}
                </span>
              )}
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-[calc(100%+10px)] z-40">
                <NotificationPanel />
              </div>
            )}
          </div>

          <div className="relative" ref={profileRef}>
            <button
              onClick={() => {
                setProfileOpen((v) => !v);
                setNotifOpen(false);
              }}
              aria-label="Profile menu"
              aria-expanded={profileOpen}
              className="flex items-center gap-2 rounded-xl border border-slate-200 py-1.5 pl-1.5 pr-2.5 hover:bg-slate-50"
            >
              <img src={CURRENT_STUDENT.avatar} alt={CURRENT_STUDENT.name} className="h-8 w-8 rounded-lg object-cover" />
              <span className="hidden text-left leading-tight md:block">
                <span className="block max-w-[120px] truncate text-[13px] font-bold text-slate-900">
                  {CURRENT_STUDENT.name}
                </span>
                <span className="block text-[11.5px] text-slate-500">{CURRENT_STUDENT.major}</span>
              </span>
              <ChevronDown size={16} className="text-slate-400" />
            </button>
            {profileOpen && (
              <div className="absolute right-0 top-[calc(100%+10px)] z-40 w-[240px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-pop">
                <div className="flex items-center gap-3 px-4 py-3.5">
                  <img src={CURRENT_STUDENT.avatar} alt="" className="h-10 w-10 rounded-xl object-cover" />
                  <div className="min-w-0">
                    <p className="truncate text-[13.5px] font-bold text-slate-900">{CURRENT_STUDENT.name}</p>
                    <p className="truncate text-[12px] text-slate-500">{CURRENT_STUDENT.email}</p>
                  </div>
                </div>
                <div className="border-t border-slate-100 p-1.5">
                  <Link
                    href="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13.5px] font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <UserIcon size={17} /> View profile
                  </Link>
                  <Link
                    href="/my-events"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13.5px] font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <Settings size={17} /> My registrations
                  </Link>
                  <button className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-[13.5px] font-semibold text-rose-600 hover:bg-rose-50">
                    <LogOut size={17} /> Sign out (demo)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
