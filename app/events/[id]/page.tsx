"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  Clock,
  MapPin,
  Share2,
  Ticket,
  Users,
  Building2,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { CategoryBadge, EventCard } from "@/components/EventCard";
import { EVENTS } from "@/lib/data";
import { useApp } from "@/lib/store";

export default function EventDetailsPage() {
  const params = useParams<{ id: string }>();
  const event = EVENTS.find((e) => e.id === params.id);
  const { isRegistered, toggleRegister, registeredIds } = useApp();
  const [showConfirm, setShowConfirm] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!event) {
    return (
      <AppShell>
        <Link href="/discover" className="text-[13.5px] font-bold text-brand-600">
          ← Back to Discover
        </Link>
        <h1 className="mt-2 text-[20px] font-extrabold">Event not found</h1>
      </AppShell>
    );
  }

  const registered = isRegistered(event.id);
  const related = EVENTS.filter((e) => e.id !== event.id && e.category === event.category).slice(0, 3);
  const pct = Math.round((event.attendees / event.capacity) * 100);

  const handleRegister = () => {
    if (registered) {
      toggleRegister(event.id); // cancel
      return;
    }
    toggleRegister(event.id);
    setShowConfirm(true);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <AppShell>
      <Link
        href="/discover"
        className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft size={16} /> Back to events
      </Link>

      <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card">
        <div className="relative">
          <img src={event.image} alt={event.title} className="h-[220px] w-full object-cover sm:h-[340px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          <div className="absolute left-4 top-4 flex gap-2">
            <CategoryBadge label={event.category} />
            <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11.5px] font-bold text-slate-700">
              {event.price}
            </span>
          </div>
          <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-5">
            <h1 className="max-w-[720px] text-[20px] font-extrabold leading-tight text-white sm:text-[30px]">
              {event.title}
            </h1>
            <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] font-medium text-white/85">
              <span className="flex items-center gap-1.5">
                <CalendarDays size={15} /> {event.fullDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={15} /> {event.time}
              </span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_340px]">
          <div className="p-5 sm:p-6">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wide text-slate-400">
                  <MapPin size={13} /> Venue
                </p>
                <p className="mt-1 text-[13.5px] font-bold text-slate-900">{event.venue}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wide text-slate-400">
                  <Users size={13} /> Capacity
                </p>
                <p className="mt-1 text-[13.5px] font-bold text-slate-900">
                  {event.attendees}/{event.capacity} going
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full rounded-full bg-brand-600" style={{ width: `${pct}%` }} />
                </div>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wide text-slate-400">
                  <Building2 size={13} /> Organizer
                </p>
                <p className="mt-1 text-[13.5px] font-bold text-slate-900">{event.organizer}</p>
                <p className="text-[12px] text-slate-500">{event.organizerRole}</p>
              </div>
            </div>

            <h2 className="mt-6 text-[16px] font-extrabold text-slate-900">About this event</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-slate-600">{event.description}</p>

            <h2 className="mt-6 text-[16px] font-extrabold text-slate-900">Agenda</h2>
            <ul className="mt-2 space-y-2">
              {event.agenda.map((a) => (
                <li
                  key={a}
                  className="flex gap-2.5 rounded-xl border border-slate-100 bg-slate-50/60 px-3.5 py-2.5 text-[13.5px] font-medium text-slate-700"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <aside className="border-t border-slate-100 bg-slate-50/60 p-5 sm:p-6 lg:border-l lg:border-t-0">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              {registered ? (
                <div className="rounded-xl bg-emerald-50 p-3 text-center">
                  <p className="flex items-center justify-center gap-1.5 text-[14px] font-extrabold text-emerald-700">
                    <BadgeCheck size={17} /> You&apos;re registered!
                  </p>
                  <p className="mt-1 text-[12.5px] text-emerald-700/80">
                    Ticket #{registeredIds.indexOf(event.id) + 1}0{event.id.length}7 • Show this at check-in
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-[13px] font-semibold text-slate-500">Registration</p>
                  <p className="mt-0.5 text-[22px] font-extrabold text-slate-900">
                    {event.price} <span className="text-[13px] font-medium text-slate-400">/ person</span>
                  </p>
                </>
              )}
              <button
                onClick={handleRegister}
                className={`mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl text-[14px] font-bold transition-colors ${
                  registered
                    ? "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    : "bg-brand-600 text-white hover:bg-brand-700"
                }`}
              >
                <Ticket size={17} /> {registered ? "Cancel registration" : "Register now"}
              </button>
              <button
                onClick={handleShare}
                className="mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-[13.5px] font-bold text-slate-700 hover:bg-slate-50"
              >
                <Share2 size={16} /> {copied ? "Link copied!" : "Share event"}
              </button>
              <p className="mt-3 text-center text-[12px] text-slate-400">
                {event.capacity - event.attendees} spots left • No duplicate registrations
              </p>
            </div>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-[13.5px] font-extrabold text-slate-900">Organizer</p>
              <div className="mt-2 flex items-center gap-2.5">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-900 text-[15px] font-extrabold text-white">
                  {event.organizer.charAt(0)}
                </span>
                <div>
                  <p className="text-[13.5px] font-bold text-slate-900">{event.organizer}</p>
                  <p className="text-[12px] text-slate-500">{event.organizerRole}</p>
                </div>
              </div>
              <button className="mt-3 h-10 w-full rounded-xl bg-slate-100 text-[13px] font-bold text-slate-700 hover:bg-slate-200">
                Contact organizer
              </button>
            </div>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-7">
          <h2 className="text-[16px] font-extrabold text-slate-900">More {event.category} events</h2>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {related.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </section>
      )}

      {/* Confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-slate-900/50 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-[380px] rounded-2xl bg-white p-6 text-center shadow-pop">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-2xl">🎉</div>
            <h3 className="mt-3 text-[18px] font-extrabold text-slate-900">Registration confirmed!</h3>
            <p className="mt-1 text-[13.5px] text-slate-500">
              You&apos;re going to <span className="font-bold text-slate-700">{event.title}</span>. Find your ticket in
              My Events.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link
                href="/my-events"
                className="rounded-xl bg-slate-900 py-2.5 text-[13.5px] font-bold text-white hover:bg-slate-800"
              >
                View tickets
              </Link>
              <button
                onClick={() => setShowConfirm(false)}
                className="rounded-xl bg-slate-100 py-2.5 text-[13.5px] font-bold text-slate-700 hover:bg-slate-200"
              >
                Stay here
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
