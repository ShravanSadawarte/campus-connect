"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { ClubCard } from "@/components/ClubCard";
import { EmptyState } from "@/components/EventCard";
import { CLUBS, CLUB_CATEGORIES } from "@/lib/data";

export default function ClubsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CLUBS.filter((c) => {
      const matchCat = category === "All" || c.category === category;
      const matchQ =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [query, category]);

  return (
    <AppShell searchValue={query} onSearch={setQuery} searchPlaceholder="Search clubs…">
      <h1 className="text-[22px] font-extrabold tracking-tight text-slate-900">Student Clubs</h1>
      <p className="mt-0.5 text-[13.5px] text-slate-500">
        {results.length} club{results.length === 1 ? "" : "s"} • Join or leave instantly, membership saves automatically
      </p>

      <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1" aria-label="Filter clubs by category">
        {CLUB_CATEGORIES.map((c) => (
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
            title="No clubs found"
            body="Try a different keyword or category."
            action={
              <button
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                }}
                className="rounded-xl bg-brand-600 px-4 py-2.5 text-[13.5px] font-bold text-white hover:bg-brand-700"
              >
                Clear filters
              </button>
            }
          />
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((c) => (
            <ClubCard key={c.id} club={c} />
          ))}
        </div>
      )}
    </AppShell>
  );
}
