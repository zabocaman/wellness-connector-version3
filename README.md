# Wellness Connector

A calm, mobile-first MVP for discovering local wellness experiences, finding a
personal Wellness Archetype, and joining community-led events.

## What is included

- Responsive homepage and navigation
- Nine-question archetype quiz with five result types
- Searchable, filterable Toronto event directory
- Event details, save/subscribe actions, and reporting flow
- Clearly labelled partner events
- Community event browsing and moderated submission flow
- Google/Facebook-only authentication structure
- Personal dashboard for quiz, saved, subscribed, and posted events
- Seed event data and a Supabase-ready relational schema
- Accessible labels, focus states, semantic structure, and reduced-motion support

The app works without credentials using a local demo profile and browser storage.
That makes every MVP flow testable immediately. When Supabase environment values
are present, Google and Facebook buttons use Supabase OAuth instead.

## Run locally

Requirements: Node.js 20 or newer and pnpm.

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

Production checks:

```bash
pnpm typecheck
pnpm build
pnpm start
```

Because this project uses `output: "export"`, `pnpm build` writes the static
site to `out/`. Preview that folder with any static file server.

## Deploy to GitHub Pages

The included workflow at `.github/workflows/deploy-pages.yml` builds and
deploys the app whenever `main` changes.

1. Open the repository's **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Merge or push the workflow to `main`.
4. Watch the **Deploy Next.js to GitHub Pages** workflow under **Actions**.

For this repository, the deployed site is:

```text
https://zabocaman.github.io/wellness-connector-version3/
```

The build automatically uses `/wellness-connector` as its asset and route base
path on GitHub Actions while keeping local development at `/`.

## Configure Supabase and OAuth

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL editor.
3. Copy `.env.example` to `.env.local` and add:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. In Supabase Authentication, enable **Google** and **Facebook** only.
5. Add each provider's client ID and secret.
6. Add these redirect URLs in Supabase:

```text
http://localhost:3000/profile
https://zabocaman.github.io/wellness-connector-version3/profile/
https://your-production-domain.com/profile
```

7. Add the Supabase callback URL shown in the provider setup screen to the
   Google and Meta developer consoles.

Never expose provider client secrets in `NEXT_PUBLIC_*` variables. They belong
in Supabase's provider settings.

## Data and implementation notes

- Static seed events live in `lib/events.ts`.
- Quiz questions and deterministic scoring live in `lib/quiz.ts`.
- The OAuth/local demo adapter and personal state live in
  `components/AppProvider.tsx`.
- The production schema includes profiles, events, saved events,
  subscriptions, quiz results, event reports, moderation status, and
  row-level-security policies.
- The current UI uses local browser storage for saves, subscriptions, quiz
  results, and draft community submissions. Replace those state writes with
  Supabase table operations for a deployed multi-user pilot.

## Safety positioning

Wellness Connector is a discovery and community marketplace, not a clinical
service. The UI avoids medical claims and includes community guidelines,
reporting, partner disclosure, privacy language, accessibility details, and the
required care/crisis disclaimer.
