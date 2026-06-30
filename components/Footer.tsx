import Link from "next/link";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-cream">
      <div className="page-shell py-12 sm:py-16">
        <div className="grid gap-10 border-b border-ink/10 pb-10 md:grid-cols-[1fr_auto]">
          <div>
            <Logo />
            <p className="mt-4 max-w-md text-sm leading-6 text-ink/65">
              Find your people. Find your practice. Feel better together.
            </p>
          </div>
          <nav
            className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm text-ink/70 sm:grid-cols-4"
            aria-label="Footer"
          >
            <Link href="/events">Events</Link>
            <Link href="/community">Community</Link>
            <Link href="/privacy">Privacy</Link>
            <a href="mailto:hello@wellnessconnector.local">Contact</a>
            <Link href="/quiz">Quiz</Link>
            <Link href="/partners">Partners</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/guidelines">Guidelines</Link>
          </nav>
        </div>
        <div className="flex flex-col gap-4 pt-8 text-xs leading-5 text-ink/55 sm:flex-row sm:items-start sm:justify-between">
          <p className="max-w-3xl">
            Wellness Connector helps users discover community-based wellness
            experiences. It is not a replacement for medical care, therapy,
            crisis support, or professional diagnosis.
          </p>
          <p className="shrink-0">© 2026 Wellness Connector</p>
        </div>
      </div>
    </footer>
  );
}
