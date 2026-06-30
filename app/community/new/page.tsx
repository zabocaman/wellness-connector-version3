"use client";

import Link from "next/link";
import { ArrowLeft, Check, LockKeyhole, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useApp } from "@/components/AppProvider";
import type { EventCategory } from "@/lib/types";

const categoryOptions: EventCategory[] = [
  "Movement",
  "Mindfulness",
  "Creative",
  "Social",
  "Outdoor",
  "Support Group",
  "Food & Nutrition",
];

export default function PostCommunityEventPage() {
  const router = useRouter();
  const { user, addPostedEvent } = useApp();
  const [submittedTitle, setSubmittedTitle] = useState<string | null>(null);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = String(data.get("title"));
    addPostedEvent({
      id: `posted-${Date.now()}`,
      title,
      category: data.get("category") as EventCategory,
      date: String(data.get("date")),
      location: String(data.get("location")),
      status: "Pending review",
    });
    setSubmittedTitle(title);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!user) {
    return (
      <section className="bg-cream py-16 sm:py-24">
        <div className="page-shell">
          <div className="mx-auto max-w-xl rounded-[30px] border border-ink/10 bg-white p-7 text-center shadow-soft sm:p-11">
            <span className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-mist text-forest">
              <LockKeyhole size={22} aria-hidden="true" />
            </span>
            <p className="eyebrow">One small step first</p>
            <h1 className="mb-4 text-4xl leading-tight sm:text-5xl">
              Sign in to post a community event.
            </h1>
            <p className="mb-8 text-sm leading-6 text-ink/60">
              A profile helps people know who is hosting and lets our moderation
              team contact you if details need clarification.
            </p>
            <Link href="/sign-in?next=/community/new" className="button-primary">
              Continue to sign in
            </Link>
            <Link href="/community" className="button-quiet mt-3 block">
              Back to community events
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (submittedTitle) {
    return (
      <section className="bg-cream py-16 sm:py-24">
        <div className="page-shell">
          <div className="mx-auto max-w-xl rounded-[30px] border border-ink/10 bg-white p-7 text-center shadow-soft sm:p-11">
            <span className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-mist text-forest">
              <Check size={23} strokeWidth={2.5} aria-hidden="true" />
            </span>
            <p className="eyebrow">Submitted for review</p>
            <h1 className="mb-4 text-4xl leading-tight">
              “{submittedTitle}” is in good hands.
            </h1>
            <p className="mb-8 text-sm leading-6 text-ink/60">
              We will review the details for clarity and community safety. For
              this MVP, you can track it as “Pending review” in your profile.
            </p>
            <button
              type="button"
              onClick={() => router.push("/profile")}
              className="button-primary"
            >
              View my events
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-cream py-10 sm:py-16">
      <div className="page-shell">
        <div className="mx-auto max-w-3xl">
          <Link href="/community" className="button-quiet -ml-4 mb-5">
            <ArrowLeft size={16} aria-hidden="true" />
            Community
          </Link>
          <p className="eyebrow">Share something good</p>
          <h1 className="mb-4 text-5xl leading-tight sm:text-6xl">
            Post a community event
          </h1>
          <p className="mb-9 max-w-2xl text-base leading-7 text-ink/65">
            Give people enough detail to feel comfortable before they arrive.
            Listings are reviewed before they go live.
          </p>

          <form onSubmit={submit} className="soft-card space-y-8 p-6 sm:p-10">
            <FormSection
              title="The basics"
              description="What is happening, and when?"
            >
              <Field label="Event title" htmlFor="title">
                <input
                  id="title"
                  name="title"
                  className="field"
                  placeholder="e.g. Saturday Sketch & Stroll"
                  required
                />
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Category" htmlFor="category">
                  <select
                    id="category"
                    name="category"
                    className="field"
                    required
                  >
                    {categoryOptions.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Date and time" htmlFor="date">
                  <input
                    id="date"
                    name="date"
                    type="datetime-local"
                    className="field"
                    required
                  />
                </Field>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Location or online link" htmlFor="location">
                  <input
                    id="location"
                    name="location"
                    className="field"
                    placeholder="Public location or meeting link"
                    required
                  />
                </Field>
                <Field label="Price" htmlFor="price" hint="Enter 0 if free">
                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    className="field"
                    defaultValue="0"
                    required
                  />
                </Field>
              </div>
            </FormSection>

            <FormSection
              title="Help people feel prepared"
              description="Plain language is perfect."
            >
              <Field label="Short description" htmlFor="description">
                <textarea
                  id="description"
                  name="description"
                  className="field min-h-28 resize-y"
                  placeholder="What will happen, and what makes it welcoming?"
                  required
                />
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Who this is for" htmlFor="audience">
                  <textarea
                    id="audience"
                    name="audience"
                    className="field min-h-24 resize-y"
                    required
                  />
                </Field>
                <Field label="What to expect" htmlFor="expectations">
                  <textarea
                    id="expectations"
                    name="expectations"
                    className="field min-h-24 resize-y"
                    required
                  />
                </Field>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Maximum attendees" htmlFor="max">
                  <input
                    id="max"
                    name="max"
                    type="number"
                    min="2"
                    className="field"
                    required
                  />
                </Field>
                <Field
                  label="Contact or booking link"
                  htmlFor="booking"
                  hint="Optional"
                >
                  <input
                    id="booking"
                    name="booking"
                    type="url"
                    className="field"
                    placeholder="https://"
                  />
                </Field>
              </div>
              <Field
                label="Accessibility notes"
                htmlFor="accessibility"
                hint="Share what you know; avoid making assumptions"
              >
                <textarea
                  id="accessibility"
                  name="accessibility"
                  className="field min-h-24 resize-y"
                  placeholder="Entrance, seating, washrooms, captions, scent, transit..."
                  required
                />
              </Field>
            </FormSection>

            <label className="flex gap-3 rounded-2xl bg-cream p-5 text-sm leading-6 text-ink/70">
              <input
                type="checkbox"
                required
                className="mt-1 h-4 w-4 shrink-0 accent-forest"
              />
              <span>
                I agree to the{" "}
                <Link href="/guidelines" className="font-bold text-forest underline">
                  community guidelines
                </Link>
                , will not make medical claims, and will keep event information
                accurate.
              </span>
            </label>

            <button type="submit" className="button-primary w-full sm:w-auto">
              <Send size={16} aria-hidden="true" />
              Submit for review
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="space-y-5 border-b border-ink/10 pb-8 last:border-0">
      <legend className="mb-5 w-full">
        <span className="block text-xl font-bold">{title}</span>
        <span className="mt-1 block text-sm font-normal text-ink/55">
          {description}
        </span>
      </legend>
      {children}
    </fieldset>
  );
}

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-2 flex items-end justify-between gap-3 text-xs font-bold">
        {label}
        {hint && <span className="font-normal text-ink/45">{hint}</span>}
      </span>
      {children}
    </label>
  );
}
