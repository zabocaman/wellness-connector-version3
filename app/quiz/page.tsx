"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { useApp } from "@/components/AppProvider";
import { EventGrid } from "@/components/EventGrid";
import { events } from "@/lib/events";
import {
  archetypes,
  calculateArchetype,
  quizQuestions,
} from "@/lib/quiz";
import type { ArchetypeId } from "@/lib/types";

export default function QuizPage() {
  const { setQuizResult, user } = useApp();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<ArchetypeId | null>(null);

  const question = quizQuestions[step];
  const selected = answers[step];
  const progress = ((step + 1) / quizQuestions.length) * 100;

  const choose = (optionIndex: number) => {
    setAnswers((current) => {
      const next = [...current];
      next[step] = optionIndex;
      return next;
    });
  };

  const next = () => {
    if (selected === undefined) return;
    if (step < quizQuestions.length - 1) {
      setStep((current) => current + 1);
      return;
    }
    const archetype = calculateArchetype(answers);
    setResult(archetype);
    setQuizResult(archetype);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const restart = () => {
    setAnswers([]);
    setStep(0);
    setResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (result) {
    const archetype = archetypes[result];
    const recommended = events
      .filter((event) => archetype.categories.includes(event.category))
      .slice(0, 3);

    return (
      <>
        <section className="bg-cream">
          <div className="page-shell py-14 sm:py-20">
            <div className="mx-auto max-w-4xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-mist px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-forest">
                <Sparkles size={14} aria-hidden="true" />
                Your wellness archetype
              </div>
              <div className="grid gap-8 rounded-[34px] border border-ink/10 bg-white p-7 shadow-soft sm:p-11 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <p className="eyebrow">A starting point, not a label</p>
                  <h1 className="mb-5 text-5xl leading-[1.03] text-ink sm:text-7xl">
                    {archetype.name}
                  </h1>
                  <p className="mb-7 max-w-2xl text-lg leading-8 text-ink/68">
                    {archetype.description}
                  </p>
                  <div>
                    <p className="mb-3 text-sm font-bold text-ink">
                      You may enjoy
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {archetype.activities.map((activity) => (
                        <span key={activity} className="tag">
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-3 lg:items-end">
                  <button type="button" onClick={restart} className="button-quiet">
                    <RotateCcw size={15} aria-hidden="true" />
                    Retake quiz
                  </button>
                  {!user && (
                    <Link href="/sign-in?next=/profile" className="button-primary">
                      Save to my profile
                    </Link>
                  )}
                </div>
              </div>
              <p className="mt-4 text-center text-xs leading-5 text-ink/50">
                This result is based only on your preferences. It is not a
                health assessment or diagnosis.
              </p>
            </div>
          </div>
        </section>
        <section className="page-shell py-20 sm:py-24">
          <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Matched for you</p>
              <h2 className="section-title mb-0">Three gentle ways to begin.</h2>
            </div>
            <Link href="/events" className="button-quiet self-start">
              Browse all events
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <EventGrid events={recommended} />
        </section>
      </>
    );
  }

  return (
    <section className="min-h-[760px] bg-cream py-10 sm:py-16">
      <div className="page-shell">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex items-center justify-between gap-4 text-sm">
            <Link href="/" className="button-quiet -ml-4">
              <ArrowLeft size={16} aria-hidden="true" />
              Home
            </Link>
            <span className="font-semibold text-ink/55">
              {step + 1} of {quizQuestions.length}
            </span>
          </div>
          <div
            className="mb-7 h-1.5 overflow-hidden rounded-full bg-ink/10"
            aria-label={`Quiz progress: question ${step + 1} of ${quizQuestions.length}`}
            role="progressbar"
            aria-valuenow={step + 1}
            aria-valuemin={1}
            aria-valuemax={quizQuestions.length}
          >
            <div
              className="h-full rounded-full bg-forest transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="soft-card p-6 sm:p-10">
            <p className="eyebrow">{question.eyebrow}</p>
            <h1 className="mb-8 max-w-2xl text-4xl leading-tight text-ink sm:text-5xl">
              {question.prompt}
            </h1>
            <fieldset>
              <legend className="sr-only">Choose one answer</legend>
              <div className="grid gap-3">
                {question.options.map((option, index) => {
                  const active = selected === index;
                  return (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => choose(index)}
                      aria-pressed={active}
                      className={`flex min-h-[68px] items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left text-base font-semibold transition sm:px-6 ${
                        active
                          ? "border-forest bg-mist/65 text-ink"
                          : "border-ink/10 bg-white text-ink/75 hover:border-sage hover:bg-cream/50"
                      }`}
                    >
                      <span>{option.label}</span>
                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border ${
                          active
                            ? "border-forest bg-forest text-white"
                            : "border-ink/15 text-transparent"
                        }`}
                      >
                        <Check size={14} strokeWidth={3} aria-hidden="true" />
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
            <div className="mt-8 flex items-center justify-between gap-4 border-t border-ink/10 pt-6">
              <button
                type="button"
                className="button-quiet -ml-4 disabled:cursor-not-allowed disabled:opacity-35"
                disabled={step === 0}
                onClick={() => setStep((current) => current - 1)}
              >
                <ArrowLeft size={16} aria-hidden="true" />
                Back
              </button>
              <button
                type="button"
                className="button-primary disabled:cursor-not-allowed disabled:opacity-40"
                disabled={selected === undefined}
                onClick={next}
              >
                {step === quizQuestions.length - 1 ? "See my result" : "Continue"}
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
          <p className="mt-5 text-center text-xs leading-5 text-ink/50">
            Your answers stay on this device unless you choose to save them to
            your profile.
          </p>
        </div>
      </div>
    </section>
  );
}
