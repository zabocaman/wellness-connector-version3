import Link from "next/link";

export default function EventNotFound() {
  return (
    <section className="page-shell py-28 text-center">
      <p className="eyebrow">Event not found</p>
      <h1 className="mb-5 text-5xl">This listing may have moved.</h1>
      <p className="mx-auto mb-8 max-w-lg text-ink/60">
        Browse the current directory to find another experience that fits.
      </p>
      <Link href="/events" className="button-primary">
        Browse events
      </Link>
    </section>
  );
}
