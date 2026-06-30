"use client";

import { ArrowLeft, Check, Facebook, Leaf } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useApp } from "@/components/AppProvider";

export default function SignInPage() {
  const router = useRouter();
  const { signIn, user } = useApp();
  const [loading, setLoading] = useState<"google" | "facebook" | null>(null);

  const handleSignIn = async (provider: "google" | "facebook") => {
    setLoading(provider);
    const mode = await signIn(provider);
    if (mode === "oauth") return;
    const next =
      new URLSearchParams(window.location.search).get("next") ?? "/profile";
    router.push(next.startsWith("/") ? next : "/profile");
  };

  if (user) {
    return (
      <section className="bg-cream py-20">
        <div className="page-shell text-center">
          <span className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-full bg-mist text-forest">
            <Check size={20} aria-hidden="true" />
          </span>
          <h1 className="mb-4 text-5xl">You’re already signed in.</h1>
          <Link href="/profile" className="button-primary">
            Open my space
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[720px] bg-cream py-12 sm:py-20">
      <div className="page-shell">
        <div className="mx-auto grid max-w-4xl overflow-hidden rounded-[34px] border border-ink/10 bg-white shadow-soft lg:grid-cols-[.85fr_1.15fr]">
          <div className="relative hidden overflow-hidden bg-[#c8d9cb] p-9 lg:block">
            <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full border border-white/55" />
            <div className="absolute -bottom-8 -left-8 h-48 w-48 rounded-full border border-white/55" />
            <Leaf size={24} className="relative z-10 text-forest" aria-hidden="true" />
            <div className="absolute bottom-10 left-9 right-9 z-10">
              <p className="font-display mb-4 text-4xl leading-tight text-ink">
                Keep the good things close.
              </p>
              <p className="mb-0 text-sm leading-6 text-ink/65">
                Save events, subscribe to host updates, and carry your wellness
                archetype with you.
              </p>
            </div>
          </div>
          <div className="p-7 sm:p-12">
            <Link href="/" className="button-quiet -ml-4 mb-8">
              <ArrowLeft size={16} aria-hidden="true" />
              Home
            </Link>
            <p className="eyebrow">Welcome</p>
            <h1 className="mb-4 text-4xl leading-tight sm:text-5xl">
              Your calm corner of the community.
            </h1>
            <p className="mb-8 text-sm leading-6 text-ink/60">
              Choose one way to continue. We do not offer passwords or use your
              social account to post on your behalf.
            </p>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => void handleSignIn("google")}
                disabled={loading !== null}
                className="button-secondary w-full justify-start px-5 disabled:opacity-50"
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-sm font-bold text-[#4285F4] shadow-sm">
                  G
                </span>
                {loading === "google"
                  ? "Connecting…"
                  : "Continue with Google"}
              </button>
              <button
                type="button"
                onClick={() => void handleSignIn("facebook")}
                disabled={loading !== null}
                className="button-secondary w-full justify-start px-5 disabled:opacity-50"
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[#1877F2] text-white">
                  <Facebook size={15} fill="currentColor" />
                </span>
                {loading === "facebook"
                  ? "Connecting…"
                  : "Continue with Facebook"}
              </button>
            </div>
            <p className="mt-7 mb-0 text-xs leading-5 text-ink/45">
              By continuing, you agree to the Terms and acknowledge the Privacy
              Policy. In this local MVP, sign-in uses a clearly isolated demo
              profile until Supabase keys are added.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
