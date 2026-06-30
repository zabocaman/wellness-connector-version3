"use client";

import {
  ChevronDown,
  Filter,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { EventGrid } from "@/components/EventGrid";
import { events } from "@/lib/events";
import type { EventCategory } from "@/lib/types";

const categories: ("All" | EventCategory)[] = [
  "All",
  "Movement",
  "Mindfulness",
  "Creative",
  "Social",
  "Outdoor",
  "Support Group",
  "Food & Nutrition",
];

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [price, setPrice] = useState("All");
  const [format, setFormat] = useState("All");
  const [comfort, setComfort] = useState("All");
  const [location, setLocation] = useState("All");
  const [beginnerOnly, setBeginnerOnly] = useState(false);
  const [includeSponsored, setIncludeSponsored] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim();
    return events.filter((event) => {
      if (
        term &&
        !`${event.title} ${event.description} ${event.host} ${event.location}`
          .toLowerCase()
          .includes(term)
      )
        return false;
      if (category !== "All" && event.category !== category) return false;
      if (format !== "All" && event.format !== format) return false;
      if (comfort !== "All" && event.comfort !== comfort) return false;
      if (location !== "All" && event.location !== location) return false;
      if (beginnerOnly && !event.beginnerFriendly) return false;
      if (!includeSponsored && event.sponsored) return false;
      if (price === "Free" && event.price !== 0) return false;
      if (price === "Under $15" && event.price >= 15) return false;
      if (price === "Under $30" && event.price >= 30) return false;
      if (price === "Premium" && event.price < 30) return false;
      return true;
    });
  }, [
    search,
    category,
    price,
    format,
    comfort,
    location,
    beginnerOnly,
    includeSponsored,
  ]);

  const activeFilters = [
    category !== "All",
    price !== "All",
    format !== "All",
    comfort !== "All",
    location !== "All",
    beginnerOnly,
    !includeSponsored,
  ].filter(Boolean).length;

  const reset = () => {
    setCategory("All");
    setPrice("All");
    setFormat("All");
    setComfort("All");
    setLocation("All");
    setBeginnerOnly(false);
    setIncludeSponsored(true);
  };

  return (
    <>
      <section className="border-b border-ink/8 bg-cream">
        <div className="page-shell py-14 sm:py-20">
          <div className="max-w-3xl">
            <p className="eyebrow">Explore Toronto</p>
            <h1 className="mb-5 text-5xl leading-[1.02] text-ink sm:text-7xl">
              Find something that feels doable.
            </h1>
            <p className="section-copy">
              Clear details, friendly hosts, and no pressure. Filter by what
              matters to you and start with one good fit.
            </p>
          </div>
          <label className="mt-9 flex max-w-3xl items-center gap-3 rounded-2xl border border-ink/10 bg-white px-5 shadow-sm focus-within:border-forest focus-within:ring-2 focus-within:ring-sage/30">
            <Search size={20} className="text-ink/45" aria-hidden="true" />
            <span className="sr-only">Search events</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by activity, host, or neighbourhood"
              className="h-14 w-full bg-transparent text-sm outline-none placeholder:text-ink/40 sm:text-base"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="grid h-9 w-9 place-items-center rounded-full hover:bg-cream"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </label>
        </div>
      </section>

      <section className="page-shell py-10 sm:py-14">
        <div className="mb-7 flex items-center justify-between gap-4">
          <p className="mb-0 text-sm text-ink/60">
            <strong className="text-ink">{filtered.length}</strong>{" "}
            {filtered.length === 1 ? "experience" : "experiences"}
          </p>
          <button
            type="button"
            className="button-secondary lg:hidden"
            onClick={() => setFiltersOpen((current) => !current)}
            aria-expanded={filtersOpen}
          >
            <Filter size={16} aria-hidden="true" />
            Filters {activeFilters > 0 && `(${activeFilters})`}
          </button>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[235px_1fr]">
          <aside
            className={`${filtersOpen ? "block" : "hidden"} rounded-2xl border border-ink/10 bg-cream/60 p-5 lg:sticky lg:top-24 lg:block lg:border-0 lg:bg-transparent lg:p-0`}
            aria-label="Event filters"
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-sm font-bold">
                <SlidersHorizontal size={16} aria-hidden="true" />
                Filters
              </span>
              {activeFilters > 0 && (
                <button
                  type="button"
                  onClick={reset}
                  className="text-xs font-bold text-forest hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>
            <div className="space-y-5">
              <SelectFilter
                label="Category"
                value={category}
                onChange={(value) =>
                  setCategory(value as (typeof categories)[number])
                }
                options={categories}
              />
              <SelectFilter
                label="Price"
                value={price}
                onChange={setPrice}
                options={["All", "Free", "Under $15", "Under $30", "Premium"]}
              />
              <SelectFilter
                label="Format"
                value={format}
                onChange={setFormat}
                options={["All", "In-person", "Online", "Hybrid"]}
              />
              <SelectFilter
                label="Comfort level"
                value={comfort}
                onChange={setComfort}
                options={["All", "Solo-friendly", "Small group", "Social"]}
              />
              <SelectFilter
                label="Location"
                value={location}
                onChange={setLocation}
                options={[
                  "All",
                  ...Array.from(new Set(events.map((event) => event.location))),
                ]}
              />
              <div className="space-y-3 border-t border-ink/10 pt-5">
                <CheckFilter
                  label="Beginner-friendly only"
                  checked={beginnerOnly}
                  onChange={setBeginnerOnly}
                />
                <CheckFilter
                  label="Include partner events"
                  checked={includeSponsored}
                  onChange={setIncludeSponsored}
                />
              </div>
            </div>
          </aside>

          <div>
            {filtered.length > 0 ? (
              <EventGrid events={filtered} />
            ) : (
              <div className="rounded-[28px] border border-dashed border-ink/20 bg-cream/50 px-6 py-20 text-center">
                <h2 className="mb-3 text-2xl font-bold">No exact matches yet</h2>
                <p className="mx-auto mb-6 max-w-md text-sm leading-6 text-ink/60">
                  Try broadening a filter. A good place to start is “All” plus
                  one thing that matters most.
                </p>
                <button type="button" onClick={reset} className="button-secondary">
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function SelectFilter({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-ink/70">{label}</span>
      <span className="relative block">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="field appearance-none pr-10"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink/45"
          aria-hidden="true"
        />
      </span>
    </label>
  );
}

function CheckFilter({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-ink/70">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 rounded border-ink/25 accent-forest"
      />
      {label}
    </label>
  );
}
