"use client";

import { MapPin, Users, CalendarClock, Check } from "lucide-react";
import type { Club } from "@/lib/types";
import { useApp } from "@/lib/store";

export function ClubCard({ club }: { club: Club }) {
  const { isJoined, toggleJoin } = useApp();
  const joined = isJoined(club.id);

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card transition-all hover:-translate-y-0.5 hover:shadow-pop">
      <div className="relative">
        <img src={club.image} alt={club.name} className="h-[150px] w-full object-cover" loading="lazy" />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11.5px] font-bold text-slate-700 shadow">
          {club.category}
        </span>
        {joined && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-[11px] font-extrabold text-white shadow">
            <Check size={12} strokeWidth={3} /> Joined
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2.5">
          <span
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-[16px] font-extrabold text-white"
            style={{ backgroundColor: club.color }}
          >
            {club.name.charAt(0)}
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-[15px] font-extrabold text-slate-900">{club.name}</h3>
            <p className="flex items-center gap-1 text-[12px] font-medium text-slate-500">
              <Users size={13} /> {club.members.toLocaleString()} members
            </p>
          </div>
        </div>
        <p className="line-clamp-2 mt-2.5 text-[13px] leading-relaxed text-slate-500">{club.description}</p>
        <div className="mt-2 space-y-1 text-[12.5px] font-medium text-slate-500">
          <p className="flex items-center gap-1.5">
            <CalendarClock size={14} className="text-slate-400" /> {club.meeting}
          </p>
          <p className="flex items-center gap-1.5">
            <MapPin size={14} className="text-slate-400" /> {club.location}
          </p>
        </div>
        <button
          onClick={() => toggleJoin(club.id)}
          aria-pressed={joined}
          className={`mt-4 h-10 w-full rounded-xl text-[13.5px] font-bold transition-colors ${
            joined
              ? "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              : "bg-brand-600 text-white hover:bg-brand-700"
          }`}
        >
          {joined ? "Leave Club" : "Join Club"}
        </button>
      </div>
    </div>
  );
}
