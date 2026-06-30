import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Eye,
  Handshake,
  Scale,
} from "lucide-react";
import { EventGrid } from "@/components/EventGrid";
import { partnerEvents } from "@/lib/events";

export default function PartnersPage() {
  return (
    <>
      <section className="bg-cream">
        <div className="page-shell py-14 sm:py-20">
          <div className="max-w-4xl">
            <p className="eyebrow">Partner events</p>
            <h1 className="mb-6 text-5xl leading-[1.02] sm:text-7xl">
              Support that stays
              <br />
              <span className="italic text-forest">in its place.</span>
            </h1>
            <p className="section-copy">
              Local studios and wellness businesses can sponsor a listing.
              Their support helps keep discovery open, while your match and
              trust always come first.
            </p>
          </div>
        </div>
      </section>

      <section className="page-shell py-16 sm:py-24">
        <div className="mb-10 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: Eye,
              title: "Always labelled",
              body: "You will see “Sponsored Partner Event” anywhere a paid listing appears.",
            },
            {
              icon: Scale,
              title: "Never ranked higher",
              body: "Payment does not make an event a better quiz match or override your filters.",
            },
            {
              icon: BadgeCheck,
              title: "Same standards",
              body: "Partners follow the same safety, accessibility, and no-medical-claims rules.",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-[26px] border border-ink/10 p-7"
            >
              <item.icon
                size={22}
                className="mb-7 text-forest"
                aria-hidden="true"
              />
              <h2 className="mb-2 text-xl font-bold">{item.title}</h2>
              <p className="mb-0 text-sm leading-6 text-ink/60">{item.body}</p>
            </article>
          ))}
        </div>

        <div className="mb-10 mt-20">
          <p className="eyebrow">Currently featured</p>
          <h2 className="section-title mb-0">Meet our local partners.</h2>
        </div>
        <EventGrid events={partnerEvents} />
      </section>

      <section className="bg-ink py-16 text-white">
        <div className="page-shell flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <Handshake size={24} className="mb-5 text-sage" aria-hidden="true" />
            <h2 className="mb-3 text-4xl text-white">Host something thoughtful?</h2>
            <p className="mb-0 leading-7 text-white/65">
              We are building a small founding partner group for the Toronto
              pilot. Tell us what you offer and how you make newcomers feel
              welcome.
            </p>
          </div>
          <a
            href="mailto:partners@wellnessconnector.local"
            className="button-primary shrink-0 bg-white text-ink hover:bg-mist"
          >
            Become a partner
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>
    </>
  );
}
