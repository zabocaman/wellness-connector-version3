import Link from "next/link";
import {
  ArrowRight,
  Check,
  Flag,
  HeartHandshake,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { EventGrid } from "@/components/EventGrid";
import { communityEvents } from "@/lib/events";

export default function CommunityPage() {
  return (
    <>
      <section className="bg-[#e8efeb]">
        <div className="page-shell grid gap-10 py-14 sm:py-20 lg:grid-cols-[1fr_.72fr] lg:items-center">
          <div>
            <p className="eyebrow">Made by neighbours</p>
            <h1 className="mb-6 max-w-4xl text-5xl leading-[1.02] sm:text-7xl">
              Small gatherings.
              <br />
              <span className="italic text-forest">Real connection.</span>
            </h1>
            <p className="section-copy mb-8">
              Find walks, creative circles, shared meals, and gentle group
              activities posted by members of the Toronto community.
            </p>
            <Link href="/community/new" className="button-primary">
              Post a community event
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="rounded-[30px] border border-white/70 bg-white/60 p-7 sm:p-9">
            <span className="mb-7 grid h-12 w-12 place-items-center rounded-2xl bg-forest text-white">
              <HeartHandshake size={22} aria-hidden="true" />
            </span>
            <h2 className="mb-5 text-3xl">A few ways we look out for each other</h2>
            <ul className="space-y-4 text-sm leading-6 text-ink/70">
              {[
                "Clear host, location, and group-size details",
                "Community guidelines for every listing",
                "Private reporting reviewed by a moderator",
                "No medical claims or pressure-based selling",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <Check
                    size={17}
                    className="mt-1 shrink-0 text-forest"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="page-shell py-16 sm:py-24">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Upcoming</p>
            <h2 className="section-title mb-0">Community events</h2>
          </div>
          <p className="mb-0 max-w-md text-sm leading-6 text-ink/60">
            Subscribe to get host updates. We send practical information, not
            engagement reminders.
          </p>
        </div>
        <EventGrid events={communityEvents} action="subscribe" />
      </section>

      <section className="border-t border-ink/8 bg-cream py-16">
        <div className="page-shell grid gap-6 md:grid-cols-3">
          {[
            {
              icon: UsersRound,
              title: "Meet in public",
              body: "When appropriate, choose public places and tell someone where you are going.",
            },
            {
              icon: ShieldCheck,
              title: "Trust your judgment",
              body: "It is always okay to leave, decline, or ask a host for more information.",
            },
            {
              icon: Flag,
              title: "Tell us",
              body: "Report anything misleading, unsafe, or inconsistent with the listing.",
            },
          ].map((item) => (
            <article key={item.title} className="rounded-2xl bg-white p-6">
              <item.icon
                size={21}
                className="mb-5 text-forest"
                aria-hidden="true"
              />
              <h3 className="mb-2 text-base font-bold">{item.title}</h3>
              <p className="mb-0 text-sm leading-6 text-ink/60">{item.body}</p>
            </article>
          ))}
        </div>
        <p className="page-shell mt-6 mb-0 text-xs leading-5 text-ink/50">
          Community events are posted by members. Please use your judgment,
          meet in public places when appropriate, and report anything that
          feels unsafe.
        </p>
      </section>
    </>
  );
}
