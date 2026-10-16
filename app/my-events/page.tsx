"use client";

import Link from "next/link";
import { Ticket, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { EventCard, EmptyState } from "@/components/EventCard";
import { EVENTS } from "@/lib/data";
import { useApp } from "@/lib/store";

export default function MyEventsPage() {
  const { registeredIds, toggleRegister } = useApp();
  const mine = EVENTS.filter((e) => registeredIds.includes(e.id));

  return (
    <AppShell>
      <h1 className="text-[22px] font-extrabold tracking-tight text-slate-900">My Events</h1>
      <p className="mt-0.5 text-[13.5px] text-slate-500">
        {mine.length} registration{mine.length === 1 ? "" : "s"} • Your tickets live here
      </p>

      {mine.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            title="No registrations yet"
            body="You haven't registered for any events. Discover what's happening on campus and grab a spot."
            action={
              <Link
                href="/discover"
                className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2.5 text-[13.5px] font-bold text-white hover:bg-brand-700"
              >
                <Ticket size={16} /> Discover events <ArrowRight size={15} />
              </Link>
            }
          />
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {mine.map((e) => (
            <div key={e.id} className="relative">
              <EventCard event={e} />
              <button
                onClick={() => toggleRegister(e.id)}
                className="absolute bottom-3 right-3 rounded-lg bg-slate-100 px-3 py-1.5 text-[12px] font-bold text-slate-600 hover:bg-slate-200"
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      )}
    </AppShell>
  );
}
