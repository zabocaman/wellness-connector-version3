import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Check,
  MapPin,
  Sparkles,
  UsersRound,
  WalletCards,
} from "lucide-react";
import { EventActions } from "@/components/EventActions";
import { EventGrid } from "@/components/EventGrid";
import { events, getEventById } from "@/lib/events";

export function generateStaticParams() {
  return events.map((event) => ({ id: event.id }));
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = getEventById(id);
  if (!event) notFound();

  const similar = events
    .filter(
      (candidate) =>
        candidate.id !== event.id && candidate.category === event.category,
    )
    .slice(0, 3);

  return (
    <>
      <section className="bg-cream">
        <div className="page-shell py-8 sm:py-12">
          <Link href="/events" className="button-quiet -ml-4 mb-6">
            <ArrowLeft size={16} aria-hidden="true" />
            Back to events
          </Link>
          <div className="grid overflow-hidden rounded-[34px] border border-ink/10 bg-white shadow-soft lg:grid-cols-[1.08fr_.92fr]">
            <div className={`event-art art-${event.accent} min-h-[360px] p-7 lg:min-h-[540px]`}>
              <div className="relative z-10">
                <span className="tag bg-white/80 backdrop-blur">
                  {event.sponsored ? (
                    <>
                      <Sparkles size={12} aria-hidden="true" />
                      Sponsored Partner Event
                    </>
                  ) : (
                    event.category
                  )}
                </span>
              </div>
              <div className="absolute bottom-7 left-7 z-10 right-7">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-ink/55">
                  {event.date}
                </p>
                <p className="font-display mb-0 max-w-lg text-5xl leading-[.98] text-ink sm:text-6xl">
                  {event.title}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between p-7 sm:p-10">
              <div>
                <p className="eyebrow">At a glance</p>
                <div className="divide-y divide-ink/10">
                  <DetailRow
                    icon={CalendarDays}
                    label="When"
                    value={`${event.date} · ${event.time}`}
                  />
                  <DetailRow
                    icon={MapPin}
                    label="Where"
                    value={`${event.location} · ${event.format}`}
                  />
                  <DetailRow
                    icon={WalletCards}
                    label="Price"
                    value={event.price === 0 ? "Free" : `$${event.price}`}
                  />
                  <DetailRow
                    icon={UsersRound}
                    label="Group"
                    value={`${event.size} · ${event.spotsLeft} spots left`}
                  />
                </div>
              </div>
              <div className="mt-8">
                <EventActions eventId={event.id} community={event.community} />
                <a
                  href={event.bookingUrl}
                  className="button-quiet mt-3"
                  target={event.bookingUrl === "#" ? undefined : "_blank"}
                  rel="noreferrer"
                >
                  Visit host booking page
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_330px]">
          <div className="space-y-12">
            <div>
              <p className="eyebrow">About this experience</p>
              <p className="max-w-3xl text-xl leading-9 text-ink/75">
                {event.description}
              </p>
            </div>
            <InfoSection title="Who it is for" body={event.audience} />
            <InfoSection title="What to expect" body={event.expectations} />
            <InfoSection title="Accessibility" body={event.accessibility} />
            <InfoSection
              title="Community guidelines"
              body="Be kind, respect personal boundaries, ask before offering advice, and keep anything shared in the group private. Hosts may ask anyone who makes the space feel unsafe to leave."
            />
          </div>
          <aside className="h-fit rounded-[26px] border border-ink/10 bg-cream p-6">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.14em] text-forest">
              Your host
            </p>
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-mist font-bold text-forest">
                {event.hostInitials}
              </span>
              <div>
                <h2 className="mb-1 text-base font-bold">{event.host}</h2>
                <p className="mb-0 text-xs text-ink/55">
                  Community host · identity checked
                </p>
              </div>
            </div>
            <div className="rounded-2xl bg-white p-4 text-sm leading-6 text-ink/65">
              <span className="mb-2 inline-flex items-center gap-2 font-bold text-ink">
                <Check size={15} className="text-forest" aria-hidden="true" />
                Clear before you go
              </span>
              <p className="mb-0">
                You can contact the host through the booking page if you need a
                specific accommodation.
              </p>
            </div>
            {event.sponsored && (
              <p className="mt-4 mb-0 text-xs leading-5 text-ink/50">
                {event.sponsorName} paid to feature this event. Partner status
                does not affect matching or community standards.
              </p>
            )}
          </aside>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="border-t border-ink/8 bg-[#f1f5f2] py-16 sm:py-20">
          <div className="page-shell">
            <h2 className="section-title mb-9">More like this</h2>
            <EventGrid events={similar} />
          </div>
        </section>
      )}
    </>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-[38px_72px_1fr] items-start gap-2 py-4 text-sm">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-mist text-forest">
        <Icon size={15} aria-hidden="true" />
      </span>
      <span className="pt-1.5 font-bold text-ink/50">{label}</span>
      <span className="pt-1.5 text-right font-semibold text-ink">{value}</span>
    </div>
  );
}

function InfoSection({ title, body }: { title: string; body: string }) {
  return (
    <div className="border-t border-ink/10 pt-8">
      <h2 className="mb-3 text-2xl font-bold tracking-[-0.025em]">{title}</h2>
      <p className="mb-0 max-w-3xl text-base leading-8 text-ink/65">{body}</p>
    </div>
  );
}
