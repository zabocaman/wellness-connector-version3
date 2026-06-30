import { Check, ShieldCheck } from "lucide-react";

export function PolicyPage({
  eyebrow,
  title,
  intro,
  sections,
  icon: Icon = ShieldCheck,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: [string, string][];
  icon?: typeof ShieldCheck;
}) {
  return (
    <section className="bg-cream py-14 sm:py-20">
      <div className="page-shell">
        <div className="mx-auto max-w-3xl">
          <Icon size={24} className="mb-6 text-forest" aria-hidden="true" />
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mb-6 text-5xl leading-tight sm:text-6xl">{title}</h1>
          <p className="mb-12 text-lg leading-8 text-ink/65">{intro}</p>
          <div className="space-y-4">
            {sections.map(([heading, body]) => (
              <article
                key={heading}
                className="rounded-2xl border border-ink/10 bg-white p-6"
              >
                <h2 className="mb-2 flex items-center gap-2 text-lg font-bold">
                  <Check size={16} className="text-forest" aria-hidden="true" />
                  {heading}
                </h2>
                <p className="mb-0 text-sm leading-7 text-ink/60">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
