import { EventCard } from "@/components/EventCard";
import type { WellnessEvent } from "@/lib/types";

export function EventGrid({
  events,
  action = "save",
}: {
  events: WellnessEvent[];
  action?: "save" | "subscribe";
}) {
  return (
    <div
      className={`grid gap-5 md:grid-cols-2 ${
        events.length === 2 ? "lg:max-w-[820px] lg:grid-cols-2" : "lg:grid-cols-3"
      }`}
    >
      {events.map((event) => (
        <EventCard key={event.id} event={event} action={action} />
      ))}
    </div>
  );
}
