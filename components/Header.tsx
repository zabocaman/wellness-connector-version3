"use client";

import Link from "next/link";
import { Menu, UserRound, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { useApp } from "@/components/AppProvider";

const links = [
  { href: "/", label: "Home" },
  { href: "/quiz", label: "Quiz" },
  { href: "/events", label: "Events" },
  { href: "/community", label: "Community" },
  { href: "/partners", label: "Partners" },
];

export function Header() {
  const pathname = usePathname();
  const { user } = useApp();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/8 bg-[#fffdfa]/95 backdrop-blur">
      <div className="page-shell flex h-[72px] items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2.5 text-sm font-medium transition hover:bg-mist/50 ${
                  active ? "bg-mist/65 text-forest" : "text-ink/70"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden lg:block">
          <Link
            href={user ? "/profile" : "/sign-in"}
            className={user ? "button-secondary" : "button-primary"}
          >
            <UserRound size={16} aria-hidden="true" />
            {user ? "My space" : "Sign in"}
          </Link>
        </div>
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 lg:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <nav
          className="border-t border-ink/8 bg-[#fffdfa] px-5 pb-6 pt-3 lg:hidden"
          aria-label="Mobile primary"
        >
          <div className="mx-auto flex max-w-[1180px] flex-col">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-ink/8 px-2 py-4 text-base font-semibold"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={user ? "/profile" : "/sign-in"}
              onClick={() => setOpen(false)}
              className="button-primary mt-5"
            >
              {user ? "Open my space" : "Sign in"}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
