"use client";

import Link from "next/link";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import type { CampusEvent } from "@/lib/types";
import { useApp } from "@/lib/store";

const CATEGORY_STYLES: Record<string, string> = {
  Tech: "bg-indigo-100 text-indigo-700",
  Music: "bg-pink-100 text-pink-700",
  Sports: "bg-emerald-100 text-emerald-700",
  Arts: "bg-violet-100 text-violet-700",
  Career: "bg-amber-100 text-amber-800",
  Food: "bg-orange-100 text-orange-700",
  Social: "bg-sky-100 text-sky-700",
  Workshop: "bg-teal-100 text-teal-700",
};

export function CategoryBadge({ label }: { label: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11.5px] font-bold ${
        CATEGORY_STYLES[label] ?? "bg-slate-100 text-slate-600"
      }`}
    >
      {label}
    </span>
  );
}

export function StatCard({
  icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  accent: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-card sm:p-5">
      <div className="flex items-center gap-3">
        <span className={`grid h-11 w-11 place-items-center rounded-xl ${accent}`}>{icon}</span>
        <p className="text-[13px] font-semibold text-slate-500">{label}</p>
      </div>
      <p className="mt-3 text-[28px] font-extrabold tracking-tight text-slate-900">{value}</p>
      <p className="mt-0.5 text-[12.5px] font-medium text-slate-500">{sub}</p>
    </div>
  );
}

export function EventCard({ event, compact = false }: { event: CampusEvent; compact?: boolean }) {
  const { isRegistered } = useApp();
  const registered = isRegistered(event.id);
  const pct = Math.round((event.attendees / event.capacity) * 100);

  return (
    <Link
      href={`/events/${event.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card transition-all hover:-translate-y-0.5 hover:shadow-pop"
    >
      <div className="relative">
        <img src={event.image} alt={event.title} className="h-[168px] w-full object-cover" loading="lazy" />
        <div className="absolute left-3 top-3 flex gap-2">
          <CategoryBadge label={event.category} />
        </div>
        {registered && (
          <span className="absolute right-3 top-3 rounded-full bg-emerald-500 px-2.5 py-1 text-[11px] font-extrabold text-white shadow">
            ✓ Registered
          </span>
        )}
      </div>
      <div className={`flex flex-1 flex-col ${compact ? "p-3.5" : "p-4"}`}>
        <h3 className="line-clamp-2 text-[15px] font-extrabold leading-snug text-slate-900 group-hover:text-brand-700">
          {event.title}
        </h3>
        <div className="mt-2.5 space-y-1.5 text-[12.5px] font-medium text-slate-500">
          <p className="flex items-center gap-1.5">
            <CalendarDays size={14} className="shrink-0 text-slate-400" /> {event.fullDate}
          </p>
          <p className="flex items-center gap-1.5">
            <Clock size={14} className="shrink-0 text-slate-400" /> {event.time}
          </p>
          <p className="flex items-center gap-1.5">
            <MapPin size={14} className="shrink-0 text-slate-400" /> <span className="truncate">{event.venue}</span>
          </p>
        </div>
        <div className="mt-3 border-t border-slate-100 pt-3">
          <div className="flex items-center justify-between text-[12px] font-semibold text-slate-500">
            <span className="flex items-center gap-1">
              <Users size={14} /> {event.attendees}/{event.capacity}
            </span>
            <span className="text-brand-600">{event.price}</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-brand-600" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-2xl">🔍</div>
      <h3 className="mt-4 text-[16px] font-extrabold text-slate-900">{title}</h3>
      <p className="mt-1 max-w-[380px] text-[13.5px] text-slate-500">{body}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
