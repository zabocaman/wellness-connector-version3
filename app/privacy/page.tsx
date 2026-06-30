import { PolicyPage } from "@/components/PolicyPage";

export default function PrivacyPage() {
  return (
    <PolicyPage
      eyebrow="Privacy"
      title="Your preferences are personal."
      intro="This MVP uses the minimum information needed to save your choices and support community safety. The production service should pair these principles with a reviewed privacy policy."
      sections={[
        ["What we store", "Profile basics from your chosen OAuth provider, your archetype, saved events, subscriptions, and events you submit."],
        ["What stays local", "Without configured Supabase credentials, MVP data stays in this browser's local storage and uses an isolated demo profile."],
        ["What we avoid", "No password database, medical records, diagnoses, precise background location tracking, or sale of sensitive preference data."],
        ["Your choices", "You can sign out at any time. Production settings should include export and deletion controls before launch."],
      ]}
    />
  );
}
