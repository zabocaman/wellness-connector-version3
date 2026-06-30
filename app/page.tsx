import Link from "next/link";
import {
  ArrowRight,
  Check,
  Compass,
  HeartHandshake,
  Leaf,
  MapPin,
  SlidersHorizontal,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { EventGrid } from "@/components/EventGrid";
import { featuredEvents, partnerEvents } from "@/lib/events";

const steps = [
  {
    number: "01",
    icon: SlidersHorizontal,
    title: "Tell us what feels good",
    body: "Answer a few gentle questions about your energy, comfort, budget, and interests.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Meet your archetype",
    body: "Get a simple starting point—not a label—with activity ideas that fit your season.",
  },
  {
    number: "03",
    icon: MapPin,
    title: "Find one thing nearby",
    body: "Browse local, online, and community-led experiences with clear expectations.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="overflow-hidden bg-cream">
        <div className="page-shell grid min-h-[690px] items-center gap-14 py-14 lg:grid-cols-[1.08fr_.92fr] lg:py-20">
          <div className="relative z-10 max-w-3xl">
            <div className="eyebrow inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-sage" />
              Wellness, without the overwhelm
            </div>
            <h1 className="mb-6 text-[clamp(3.3rem,6.8vw,5.9rem)] leading-[0.94] text-ink">
              Discover wellness
              <br />
              experiences that fit
              <br />
              <span className="italic text-forest">your life.</span>
            </h1>
            <p className="mb-8 max-w-xl text-lg leading-8 text-ink/68 sm:text-xl">
              Take a short quiz, find your wellness archetype, and connect with
              local events, communities, and self-care experiences near you.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/quiz" className="button-primary">
                Find my wellness style
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link href="/events" className="button-secondary">
                Browse events
              </Link>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-ink/60">
              {["Free to explore", "Beginner-friendly", "Toronto pilot"].map(
                (item) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-mist text-forest">
                      <Check size={12} strokeWidth={3} aria-hidden="true" />
                    </span>
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[520px] lg:mr-0">
            <div className="hero-orbit" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[36px] bg-[#c8d9cb] p-5 shadow-soft sm:p-7">
              <div className="absolute -right-14 -top-16 h-56 w-56 rounded-full border border-white/55" />
              <div className="absolute -right-3 -top-3 h-28 w-28 rounded-full border border-white/55" />
              <div className="relative z-10 mb-16 flex items-center justify-between">
                <span className="tag bg-white/75">Your gentle guide</span>
                <span className="grid h-10 w-10 place-items-center rounded-full bg-forest text-white">
                  <Leaf size={18} aria-hidden="true" />
                </span>
              </div>
              <div className="relative z-10 rounded-[28px] bg-[#fffdfa]/95 p-5 sm:p-6">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-forest">
                  A match for today
                </p>
                <h2 className="mb-3 text-3xl leading-tight text-ink">
                  Sunday Morning
                  <br />
                  Wellness Walk
                </h2>
                <div className="mb-5 flex flex-wrap gap-2">
                  <span className="tag">Free</span>
                  <span className="tag">Beginner-friendly</span>
                  <span className="tag">Outdoors</span>
                </div>
                <div className="flex items-center justify-between border-t border-ink/10 pt-4 text-sm">
                  <span className="inline-flex items-center gap-2 text-ink/60">
                    <MapPin size={15} aria-hidden="true" />
                    Toronto Waterfront
                  </span>
                  <span className="font-bold text-forest">View event →</span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-4 z-20 hidden rounded-2xl border border-ink/10 bg-white p-4 shadow-soft sm:flex sm:items-center sm:gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-sky text-forest">
                <UsersRound size={18} aria-hidden="true" />
              </span>
              <div>
                <span className="block text-sm font-bold">Come as you are</span>
                <span className="text-xs text-ink/55">Most guests arrive solo</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/8 bg-white">
        <div className="page-shell grid gap-7 py-8 text-sm md:grid-cols-3 md:divide-x md:divide-ink/10">
          <div className="flex items-center gap-3 md:pr-7">
            <Compass className="text-forest" size={22} aria-hidden="true" />
            <p className="mb-0 leading-6 text-ink/65">
              <strong className="text-ink">Local first.</strong> Built around
              Toronto’s neighbourhoods and communities.
            </p>
          </div>
          <div className="flex items-center gap-3 md:px-7">
            <HeartHandshake
              className="text-forest"
              size={22}
              aria-hidden="true"
            />
            <p className="mb-0 leading-6 text-ink/65">
              <strong className="text-ink">People first.</strong> No streaks,
              feeds, or pressure to perform.
            </p>
          </div>
          <div className="flex items-center gap-3 md:pl-7">
            <Leaf className="text-forest" size={22} aria-hidden="true" />
            <p className="mb-0 leading-6 text-ink/65">
              <strong className="text-ink">Wellness, not medicine.</strong> A
              guide to community experiences.
            </p>
          </div>
        </div>
      </section>

      <section className="page-shell py-20 sm:py-28">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow">How it works</p>
          <h2 className="section-title mb-5">
            A small first step can change the shape of a week.
          </h2>
          <p className="section-copy">
            We help you move from “I should do something” to one realistic,
            welcoming experience.
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.number}
              className="rounded-[28px] border border-ink/10 bg-cream/60 p-7 sm:p-8"
            >
              <div className="mb-12 flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-mist text-forest">
                  <step.icon size={21} aria-hidden="true" />
                </span>
                <span className="font-display text-xl text-ink/35">
                  {step.number}
                </span>
              </div>
              <h3 className="mb-3 text-xl font-bold tracking-[-0.02em]">
                {step.title}
              </h3>
              <p className="mb-0 text-sm leading-6 text-ink/65">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f1f5f2] py-20 sm:py-24">
        <div className="page-shell">
          <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Near you</p>
              <h2 className="section-title mb-0">A few good places to begin.</h2>
            </div>
            <Link href="/events" className="button-quiet self-start sm:self-auto">
              See all events
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <EventGrid events={featuredEvents} />
        </div>
      </section>

      <section className="page-shell py-20 sm:py-28">
        <div className="grid gap-12 rounded-[34px] bg-ink p-7 text-white sm:p-12 lg:grid-cols-[.78fr_1.22fr] lg:items-center lg:p-14">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-sage">
              Community-powered
            </p>
            <h2 className="mb-5 text-4xl leading-tight text-white sm:text-5xl">
              Your kind of wellness may already be happening nearby.
            </h2>
            <p className="mb-7 max-w-lg text-base leading-7 text-white/65">
              Browse small walks, creative circles, workshops, and gatherings
              posted by community hosts. Or share one of your own.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/community"
                className="button-primary bg-[#e7eee9] text-ink hover:bg-white"
              >
                Explore community events
              </Link>
              <Link
                href="/community/new"
                className="button-secondary border-white/25 bg-transparent text-white hover:bg-white/10"
              >
                Post an event
              </Link>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Small groups", "Clear group size before you join"],
              ["Welcoming hosts", "Know who is holding the space"],
              ["Useful details", "Accessibility and expectations upfront"],
              ["Community care", "Guidelines and reporting on every event"],
            ].map(([title, body]) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <span className="mb-4 grid h-8 w-8 place-items-center rounded-full bg-white/10 text-sage">
                  <Check size={15} aria-hidden="true" />
                </span>
                <h3 className="mb-1 text-sm font-bold">{title}</h3>
                <p className="mb-0 text-xs leading-5 text-white/55">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/8 bg-cream py-20 sm:py-24">
        <div className="page-shell">
          <div className="mb-10 max-w-2xl">
            <div className="eyebrow inline-flex items-center gap-2">
              <Sparkles size={14} aria-hidden="true" />
              Partner-supported
            </div>
            <h2 className="section-title mb-5">
              Thoughtful local partners, clearly labelled.
            </h2>
            <p className="section-copy">
              Partner events help support this community. They never outrank a
              better match, and you can filter them out at any time.
            </p>
          </div>
          <EventGrid events={partnerEvents} />
          <Link href="/partners" className="button-quiet mt-8">
            How partnerships work
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
