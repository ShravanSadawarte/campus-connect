"use client";

import Link from "next/link";
import { Mail, GraduationCap, CalendarDays, MapPin, Settings, Ticket, Users } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ClubCard } from "@/components/ClubCard";
import { EventCard } from "@/components/EventCard";
import { CLUBS, CURRENT_STUDENT, EVENTS } from "@/lib/data";
import { useApp } from "@/lib/store";

export default function ProfilePage() {
  const { registeredIds, joinedClubIds } = useApp();
  const myEvents = EVENTS.filter((e) => registeredIds.includes(e.id));
  const myClubs = CLUBS.filter((c) => joinedClubIds.includes(c.id));

  return (
    <AppShell>
      {/* Profile header */}
      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card">
        <div className="h-[110px] bg-gradient-to-r from-brand-600 via-[#6d28d9] to-[#0ea5e9]" />
        <div className="px-5 pb-5 sm:px-6">
          <div className="-mt-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-3.5">
              <img
                src={CURRENT_STUDENT.avatar}
                alt={CURRENT_STUDENT.name}
                className="h-20 w-20 rounded-2xl border-4 border-white object-cover shadow-card"
              />
              <div className="pb-0.5">
                <h1 className="text-[20px] font-extrabold tracking-tight text-slate-900">{CURRENT_STUDENT.name}</h1>
                <p className="text-[13px] font-medium text-slate-500">
                  {CURRENT_STUDENT.id} • {CURRENT_STUDENT.year}
                </p>
              </div>
            </div>
            <button className="inline-flex items-center gap-1.5 self-start rounded-xl bg-slate-900 px-4 py-2.5 text-[13px] font-bold text-white hover:bg-slate-800 sm:self-auto">
              <Settings size={15} /> Edit profile
            </button>
          </div>

          <p className="mt-3 max-w-[640px] text-[13.5px] leading-relaxed text-slate-600">{CURRENT_STUDENT.bio}</p>

          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] font-medium text-slate-500">
            <span className="flex items-center gap-1.5">
              <GraduationCap size={15} className="text-slate-400" /> {CURRENT_STUDENT.major}
            </span>
            <span className="flex items-center gap-1.5">
              <Mail size={15} className="text-slate-400" /> {CURRENT_STUDENT.email}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays size={15} className="text-slate-400" /> {CURRENT_STUDENT.joinedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={15} className="text-slate-400" /> North Campus Dorms
            </span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2.5">
            <div className="rounded-xl bg-slate-50 p-3 text-center">
              <p className="flex items-center justify-center gap-1 text-[12px] font-bold uppercase tracking-wide text-slate-400">
                <Ticket size={13} /> Events
              </p>
              <p className="mt-0.5 text-[20px] font-extrabold text-slate-900">{myEvents.length}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 text-center">
              <p className="flex items-center justify-center gap-1 text-[12px] font-bold uppercase tracking-wide text-slate-400">
                <Users size={13} /> Clubs
              </p>
              <p className="mt-0.5 text-[20px] font-extrabold text-slate-900">{myClubs.length}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 text-center">
              <p className="text-[12px] font-bold uppercase tracking-wide text-slate-400">Year</p>
              <p className="mt-0.5 text-[20px] font-extrabold text-slate-900">Jr</p>
            </div>
          </div>
        </div>
      </section>

      {/* Registered events */}
      <section className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-extrabold text-slate-900">Registered events ({myEvents.length})</h2>
          <Link href="/discover" className="text-[13px] font-bold text-brand-600 hover:text-brand-700">
            Find more
          </Link>
        </div>
        {myEvents.length === 0 ? (
          <p className="mt-3 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center text-[13.5px] text-slate-500">
            No registrations yet. <Link href="/discover" className="font-bold text-brand-600">Discover events →</Link>
          </p>
        ) : (
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {myEvents.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        )}
      </section>

      {/* Joined clubs */}
      <section className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-extrabold text-slate-900">Joined clubs ({myClubs.length})</h2>
          <Link href="/clubs" className="text-[13px] font-bold text-brand-600 hover:text-brand-700">
            Browse clubs
          </Link>
        </div>
        {myClubs.length === 0 ? (
          <p className="mt-3 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center text-[13.5px] text-slate-500">
            You haven&apos;t joined any clubs yet. <Link href="/clubs" className="font-bold text-brand-600">Explore clubs →</Link>
          </p>
        ) : (
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {myClubs.map((c) => (
              <ClubCard key={c.id} club={c} />
            ))}
          </div>
        )}
      </section>
    </AppShell>
  );
}
