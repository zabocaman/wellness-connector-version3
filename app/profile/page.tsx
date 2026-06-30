"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  CalendarCheck,
  LogOut,
  Plus,
  RotateCcw,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useApp } from "@/components/AppProvider";
import { EventCard } from "@/components/EventCard";
import { events } from "@/lib/events";
import { archetypes } from "@/lib/quiz";

export default function ProfilePage() {
  const {
    ready,
    user,
    quizResult,
    savedEvents,
    subscribedEvents,
    postedEvents,
    signOut,
  } = useApp();

  if (!ready) {
    return (
      <section className="page-shell min-h-[600px] py-20">
        <p className="text-sm text-ink/50">Opening your space…</p>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="bg-cream py-20">
        <div className="page-shell text-center">
          <span className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-full bg-mist text-forest">
            <UserRound size={20} aria-hidden="true" />
          </span>
          <h1 className="mb-4 text-5xl">This space is yours.</h1>
          <p className="mx-auto mb-7 max-w-lg text-ink/60">
            Sign in with Google or Facebook to see saved events, subscriptions,
            your archetype, and community posts.
          </p>
          <Link href="/sign-in?next=/profile" className="button-primary">
            Sign in
          </Link>
        </div>
      </section>
    );
  }

  const saved = events.filter((event) => savedEvents.includes(event.id));
  const subscribed = events.filter((event) =>
    subscribedEvents.includes(event.id),
  );
  const archetype = quizResult ? archetypes[quizResult] : null;

  return (
    <>
      <section className="border-b border-ink/8 bg-cream">
        <div className="page-shell py-12 sm:py-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-forest text-lg font-bold text-white">
                {user.name
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <div>
                <p className="mb-1 text-sm text-ink/55">Welcome back</p>
                <h1 className="mb-0 text-4xl sm:text-5xl">{user.name}</h1>
              </div>
            </div>
            <button
              type="button"
              onClick={() => void signOut()}
              className="button-quiet self-start text-ink/55 sm:self-auto"
            >
              <LogOut size={15} aria-hidden="true" />
              Sign out
            </button>
          </div>
        </div>
      </section>

      <section className="page-shell py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[310px_1fr]">
          <aside className="space-y-5">
            <div className="rounded-[26px] bg-ink p-6 text-white">
              <div className="mb-8 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-sage">
                  Your archetype
                </span>
                <Sparkles size={17} className="text-sage" aria-hidden="true" />
              </div>
              {archetype ? (
                <>
                  <h2 className="mb-3 text-3xl leading-tight text-white">
                    {archetype.shortName}
                  </h2>
                  <p className="mb-6 text-sm leading-6 text-white/60">
                    {archetype.description}
                  </p>
                  <Link
                    href="/quiz"
                    className="inline-flex items-center gap-2 text-sm font-bold text-white"
                  >
                    <RotateCcw size={14} aria-hidden="true" />
                    Retake quiz
                  </Link>
                </>
              ) : (
                <>
                  <h2 className="mb-3 text-3xl text-white">Find your starting point</h2>
                  <p className="mb-6 text-sm leading-6 text-white/60">
                    Nine simple questions. About two minutes.
                  </p>
                  <Link
                    href="/quiz"
                    className="button-primary bg-white text-ink hover:bg-mist"
                  >
                    Take the quiz
                  </Link>
                </>
              )}
            </div>
            <div className="rounded-[26px] border border-ink/10 p-6">
              <h2 className="mb-4 text-base font-bold">Profile</h2>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="mb-1 text-xs text-ink/45">Email</dt>
                  <dd className="mb-0 truncate font-semibold">{user.email}</dd>
                </div>
                <div>
                  <dt className="mb-1 text-xs text-ink/45">Sign-in provider</dt>
                  <dd className="mb-0 capitalize font-semibold">{user.provider}</dd>
                </div>
              </dl>
            </div>
          </aside>

          <div className="space-y-14">
            <DashboardSection
              icon={Bookmark}
              title="Saved events"
              count={saved.length}
              empty="No saved events yet. When something feels like a good fit, keep it here."
              cta={{ label: "Browse events", href: "/events" }}
            >
              {saved.length > 0 && (
                <div className="grid gap-5 md:grid-cols-2">
                  {saved.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              )}
            </DashboardSection>

            <DashboardSection
              icon={CalendarCheck}
              title="Community subscriptions"
              count={subscribed.length}
              empty="Subscribe to a community event to keep its practical updates in one place."
              cta={{ label: "Explore community", href: "/community" }}
            >
              {subscribed.length > 0 && (
                <div className="grid gap-5 md:grid-cols-2">
                  {subscribed.map((event) => (
                    <EventCard key={event.id} event={event} action="subscribe" />
                  ))}
                </div>
              )}
            </DashboardSection>

            <DashboardSection
              icon={Plus}
              title="Your posted events"
              count={postedEvents.length}
              empty="Have a walk, workshop, or gathering to share? Community listings are reviewed before going live."
              cta={{ label: "Post an event", href: "/community/new" }}
            >
              {postedEvents.length > 0 && (
                <div className="space-y-3">
                  {postedEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex flex-col gap-4 rounded-2xl border border-ink/10 p-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <span className="mb-2 block text-xs font-bold text-forest">
                          {event.category}
                        </span>
                        <h3 className="mb-1 text-base font-bold">{event.title}</h3>
                        <p className="mb-0 text-xs text-ink/50">
                          {event.date} · {event.location}
                        </p>
                      </div>
                      <span className="tag self-start bg-sand/60">
                        {event.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </DashboardSection>
          </div>
        </div>
      </section>
    </>
  );
}

function DashboardSection({
  icon: Icon,
  title,
  count,
  empty,
  cta,
  children,
}: {
  icon: typeof Bookmark;
  title: string;
  count: number;
  empty: string;
  cta: { label: string; href: string };
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="mb-0 inline-flex items-center gap-3 text-2xl font-bold tracking-[-0.025em]">
          <Icon size={20} className="text-forest" aria-hidden="true" />
          {title}
          <span className="grid h-6 min-w-6 place-items-center rounded-full bg-cream px-1.5 text-xs">
            {count}
          </span>
        </h2>
        <Link href={cta.href} className="button-quiet hidden sm:inline-flex">
          {cta.label}
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
      {count === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink/15 bg-cream/45 p-7">
          <p className="mb-4 max-w-xl text-sm leading-6 text-ink/55">{empty}</p>
          <Link href={cta.href} className="button-quiet -ml-4">
            {cta.label}
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      ) : (
        children
      )}
    </section>
  );
}
