"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, CalendarDays, Ticket, Users, Sparkles, MapPin, Clock } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { CategoryBadge, EventCard, StatCard } from "@/components/EventCard";
import { CLUBS, CURRENT_STUDENT, EVENTS } from "@/lib/data";
import { useApp } from "@/lib/store";

export default function DashboardPage() {
  const { registeredIds, joinedClubIds } = useApp();
  const [query, setQuery] = useState("");

  const filteredFeatured = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = EVENTS.filter((e) => e.featured);
    if (!q) return base;
    return base.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q)
    );
  }, [query]);

  const upcoming = useMemo(() => EVENTS.slice(0, 5), []);
  const popularClubs = useMemo(() => [...CLUBS].sort((a, b) => b.members - a.members).slice(0, 3), []);

  return (
    <AppShell searchValue={query} onSearch={setQuery} searchPlaceholder="Search events, clubs…">
      {/* Welcome */}
      <section className="overflow-hidden rounded-2xl bg-slate-900 p-5 text-white sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-1.5 text-[12.5px] font-bold uppercase tracking-wider text-indigo-300">
              <Sparkles size={14} /> Fall semester • Week 7
            </p>
            <h1 className="mt-1.5 text-[22px] font-extrabold tracking-tight sm:text-[28px]">
              Welcome back, {CURRENT_STUDENT.name.split(" ")[0]} 👋
            </h1>
            <p className="mt-1 max-w-[560px] text-[13.5px] leading-relaxed text-slate-300">
              You have <span className="font-bold text-white">{registeredIds.length} upcoming registrations</span> and{" "}
              {joinedClubIds.length} club{joinedClubIds.length === 1 ? "" : "s"} joined. Here&apos;s what&apos;s happening
              on campus this week.
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Link
              href="/discover"
              className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-[13.5px] font-bold text-slate-900 hover:bg-slate-100"
            >
              Discover events <ArrowRight size={16} />
            </Link>
            <Link
              href="/my-events"
              className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-4 py-2.5 text-[13.5px] font-bold text-white ring-1 ring-white/20 hover:bg-white/20"
            >
              My tickets
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard
          icon={<CalendarDays size={20} className="text-indigo-700" />}
          label="Upcoming events"
          value={String(EVENTS.length)}
          sub="Across 8 categories this month"
          accent="bg-indigo-100"
        />
        <StatCard
          icon={<Ticket size={20} className="text-emerald-700" />}
          label="My registrations"
          value={String(registeredIds.length)}
          sub="Tickets saved to your profile"
          accent="bg-emerald-100"
        />
        <StatCard
          icon={<Users size={20} className="text-violet-700" />}
          label="Clubs joined"
          value={String(joinedClubIds.length)}
          sub={`of ${CLUBS.length} active clubs`}
          accent="bg-violet-100"
        />
      </section>

      {/* Featured */}
      <section className="mt-7">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[17px] font-extrabold tracking-tight text-slate-900">Featured events</h2>
            <p className="text-[13px] text-slate-500">Handpicked for you based on your interests</p>
          </div>
          <Link
            href="/discover"
            className="flex items-center gap-1 text-[13px] font-bold text-brand-600 hover:text-brand-700"
          >
            View all <ArrowRight size={15} />
          </Link>
        </div>
        {filteredFeatured.length === 0 ? (
          <p className="mt-3 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center text-[13.5px] text-slate-500">
            No featured events match “{query}”.
          </p>
        ) : (
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {filteredFeatured.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        )}
      </section>

      {/* Two-column: Upcoming + side */}
      <section className="mt-7 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-card sm:p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-extrabold text-slate-900">Upcoming on campus</h2>
            <Link href="/discover" className="text-[13px] font-bold text-brand-600 hover:text-brand-700">
              See all
            </Link>
          </div>
          <div className="mt-3 divide-y divide-slate-100">
            {upcoming.map((e) => (
              <Link key={e.id} href={`/events/${e.id}`} className="group flex items-center gap-3 py-3">
                <div className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-xl bg-brand-50 text-center">
                  <div>
                    <p className="text-[11px] font-extrabold uppercase leading-none text-brand-600">
                      {e.date.split(",")[0]}
                    </p>
                    <p className="mt-0.5 text-[16px] font-extrabold leading-none text-slate-900">
                      {e.date.split(" ")[1]}
                    </p>
                  </div>
                </div>
                <img src={e.image} alt="" className="hidden h-[52px] w-[76px] rounded-xl object-cover sm:block" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-bold text-slate-900 group-hover:text-brand-700">{e.title}</p>
                  <p className="mt-0.5 flex items-center gap-2 truncate text-[12.5px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock size={13} /> {e.time.split("–")[0].trim()}
                    </span>
                    <span className="flex items-center gap-1 truncate">
                      <MapPin size={13} /> <span className="truncate">{e.venue}</span>
                    </span>
                  </p>
                </div>
                <CategoryBadge label={e.category} />
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-card sm:p-5">
            <h3 className="text-[15px] font-extrabold text-slate-900">Popular clubs</h3>
            <p className="text-[12.5px] text-slate-500">Most joined this semester</p>
            <div className="mt-3 space-y-3">
              {popularClubs.map((c) => (
                <div key={c.id} className="flex items-center gap-2.5">
                  <span
                    className="grid h-9 w-9 place-items-center rounded-xl text-[14px] font-extrabold text-white"
                    style={{ backgroundColor: c.color }}
                  >
                    {c.name.charAt(0)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13.5px] font-bold text-slate-900">{c.name}</p>
                    <p className="text-[12px] text-slate-500">{c.members.toLocaleString()} members</p>
                  </div>
                  <Link href="/clubs" className="text-[12.5px] font-bold text-brand-600 hover:text-brand-700">
                    View
                  </Link>
                </div>
              ))}
            </div>
            <Link
              href="/clubs"
              className="mt-4 block rounded-xl bg-slate-900 py-2.5 text-center text-[13px] font-bold text-white hover:bg-slate-800"
            >
              Browse all clubs
            </Link>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-[13.5px] font-extrabold text-amber-900">⏰ Reminder</p>
            <p className="mt-1 text-[13px] leading-relaxed text-amber-800">
              Career Fair is Oct 23. Print 5 resumes and book a mock interview slot from My Events.
            </p>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
