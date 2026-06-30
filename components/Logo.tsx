import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2.5 rounded-lg"
      aria-label="Wellness Connector home"
    >
      <span className="relative grid h-9 w-9 place-items-center rounded-full bg-forest text-white">
        <svg
          viewBox="0 0 32 32"
          className="h-6 w-6"
          aria-hidden="true"
          fill="none"
        >
          <path
            d="M16 25c-1-7 2-12 8-15 1 7-2 12-8 15Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 25c1-6-2-10-8-12-1 6 2 10 8 12Zm0 0v4"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {!compact && (
        <span className="text-[15px] font-bold tracking-[-0.02em] text-ink sm:text-base">
          Wellness Connector
        </span>
      )}
    </Link>
  );
}
