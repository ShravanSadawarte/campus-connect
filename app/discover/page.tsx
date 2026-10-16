"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { EmptyState, EventCard } from "@/components/EventCard";
import { CATEGORIES, EVENTS } from "@/lib/data";

export default function DiscoverPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return EVENTS.filter((e) => {
      const matchCat = category === "All" || e.category === category;
      const matchQ =
        !q ||
        e.title.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.organizer.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [query, category]);

  return (
    <AppShell searchValue={query} onSearch={setQuery} searchPlaceholder="Search by title, venue, organizer…">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-[22px] font-extrabold tracking-tight text-slate-900">Discover Events</h1>
          <p className="mt-0.5 text-[13.5px] text-slate-500">
            {results.length} event{results.length === 1 ? "" : "s"} found
            {category !== "All" ? ` in ${category}` : ""}
            {query ? ` for “${query}”` : ""}
          </p>
        </div>
      </div>

      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Filter by category">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
            className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-bold transition-colors ${
              category === c
                ? "bg-slate-900 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {results.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            title="No events found"
            body={`We couldn't find anything matching your search. Try a different keyword or category.`}
            action={
              <button
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                }}
                className="rounded-xl bg-brand-600 px-4 py-2.5 text-[13.5px] font-bold text-white hover:bg-brand-700"
              >
                Clear search & filters
              </button>
            }
          />
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      )}
    </AppShell>
  );
}
