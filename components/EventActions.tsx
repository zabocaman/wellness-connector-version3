"use client";

import { Bookmark, Check, Flag, HeartHandshake } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useApp } from "@/components/AppProvider";

export function EventActions({
  eventId,
  community,
}: {
  eventId: string;
  community: boolean;
}) {
  const router = useRouter();
  const {
    user,
    savedEvents,
    subscribedEvents,
    toggleSaved,
    toggleSubscribed,
  } = useApp();
  const [reporting, setReporting] = useState(false);
  const [reported, setReported] = useState(false);
  const active = community
    ? subscribedEvents.includes(eventId)
    : savedEvents.includes(eventId);

  const handlePrimary = () => {
    if (!user) {
      router.push(`/sign-in?next=/events/${eventId}`);
      return;
    }
    if (community) toggleSubscribed(eventId);
    else toggleSaved(eventId);
  };

  return (
    <>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={handlePrimary} className="button-primary">
          {active ? (
            <Check size={17} aria-hidden="true" />
          ) : community ? (
            <HeartHandshake size={17} aria-hidden="true" />
          ) : (
            <Bookmark size={17} aria-hidden="true" />
          )}
          {active
            ? community
              ? "Subscribed"
              : "Saved"
            : community
              ? "Subscribe to updates"
              : "Save this event"}
        </button>
        <button
          type="button"
          className="button-secondary"
          onClick={() => setReporting(true)}
        >
          <Flag size={15} aria-hidden="true" />
          Report
        </button>
      </div>

      {reporting && (
        <div
          className="fixed inset-0 z-[70] grid place-items-center bg-ink/45 p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="report-title"
        >
          <div className="w-full max-w-md rounded-[26px] bg-white p-7 shadow-soft">
            {reported ? (
              <>
                <span className="mb-5 grid h-11 w-11 place-items-center rounded-full bg-mist text-forest">
                  <Check size={19} aria-hidden="true" />
                </span>
                <h2 id="report-title" className="mb-3 text-3xl">
                  Thanks for letting us know.
                </h2>
                <p className="mb-6 text-sm leading-6 text-ink/65">
                  We will review this listing. If anyone is in immediate danger,
                  contact local emergency services.
                </p>
                <button
                  type="button"
                  className="button-primary w-full"
                  onClick={() => {
                    setReporting(false);
                    setReported(false);
                  }}
                >
                  Close
                </button>
              </>
            ) : (
              <>
                <h2 id="report-title" className="mb-3 text-3xl">
                  Report this event
                </h2>
                <p className="mb-5 text-sm leading-6 text-ink/65">
                  Choose the closest reason. Reports are private and reviewed by
                  a moderator.
                </p>
                <label className="mb-5 block">
                  <span className="mb-2 block text-xs font-bold">Reason</span>
                  <select className="field">
                    <option>Safety concern</option>
                    <option>Misleading information</option>
                    <option>Inappropriate content</option>
                    <option>Event is no longer available</option>
                    <option>Something else</option>
                  </select>
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    className="button-secondary flex-1"
                    onClick={() => setReporting(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="button-primary flex-1"
                    onClick={() => setReported(true)}
                  >
                    Send report
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
