"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Bookmark,
  CalendarDays,
  Check,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useApp } from "@/components/AppProvider";
import type { WellnessEvent } from "@/lib/types";

export function EventCard({
  event,
  action = "save",
}: {
  event: WellnessEvent;
  action?: "save" | "subscribe";
}) {
  const router = useRouter();
  const {
    user,
    savedEvents,
    subscribedEvents,
    toggleSaved,
    toggleSubscribed,
  } = useApp();
  const active =
    action === "save"
      ? savedEvents.includes(event.id)
      : subscribedEvents.includes(event.id);

  const handleAction = () => {
    if (!user) {
      router.push(`/sign-in?next=/events/${event.id}`);
      return;
    }
    if (action === "save") toggleSaved(event.id);
    else toggleSubscribed(event.id);
  };

  return (
    <article className="group overflow-hidden rounded-[24px] border border-ink/10 bg-white transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className={`event-art art-${event.accent} p-5`}>
        <div className="relative z-10 flex items-start justify-between gap-3">
          <span className="tag bg-white/80 backdrop-blur">
            {event.sponsored ? (
              <>
                <Sparkles size={12} aria-hidden="true" />
                Sponsored partner
              </>
            ) : (
              event.category
            )}
          </span>
          <button
            type="button"
            onClick={handleAction}
            className={`grid h-10 w-10 place-items-center rounded-full border border-white/60 backdrop-blur transition ${
              active
                ? "bg-forest text-white"
                : "bg-white/80 text-forest hover:bg-white"
            }`}
            aria-label={
              active
                ? `${action === "save" ? "Remove" : "Unsubscribe from"} ${event.title}`
                : `${action === "save" ? "Save" : "Subscribe to"} ${event.title}`
            }
          >
            {active ? <Check size={17} /> : <Bookmark size={17} />}
          </button>
        </div>
        <div className="absolute bottom-5 left-5 z-10 rounded-2xl bg-ink/90 px-4 py-3 text-white">
          <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-white/65">
            {event.date.split(",")[0]}
          </span>
          <span className="font-display text-2xl">
            {event.date.split(" ").at(-1)}
          </span>
        </div>
      </div>
      <div className="p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap gap-2 text-xs text-ink/60">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={14} aria-hidden="true" />
            {event.time}
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={14} aria-hidden="true" />
            {event.location}
          </span>
        </div>
        <h3 className="mb-2 text-xl font-bold leading-snug tracking-[-0.025em] text-ink">
          <Link
            href={`/events/${event.id}`}
            className="rounded-md before:absolute before:inset-0"
          >
            {event.title}
          </Link>
        </h3>
        <p className="mb-5 line-clamp-2 text-sm leading-6 text-ink/65">
          {event.description}
        </p>
        <div className="flex items-center justify-between border-t border-ink/8 pt-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-mist font-bold text-forest">
              {event.hostInitials}
            </span>
            <span className="max-w-[150px] truncate text-ink/65">
              {event.host}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-ink">
              {event.price === 0 ? "Free" : `$${event.price}`}
            </span>
            <ArrowUpRight
              size={17}
              className="text-forest transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
