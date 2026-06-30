import { PolicyPage } from "@/components/PolicyPage";

export default function TermsPage() {
  return (
    <PolicyPage
      eyebrow="Terms"
      title="A simple agreement for the MVP."
      intro="Wellness Connector is a discovery and community marketplace prototype, not a healthcare provider or emergency service."
      sections={[
        ["Discovery only", "Listings and quiz matches are informational. They are not medical advice, therapy, diagnosis, or a guarantee of outcomes."],
        ["Host responsibility", "Hosts are responsible for accurate information, safe conduct, permissions, insurance, and applicable local requirements."],
        ["Guest judgment", "Guests choose whether an event is appropriate for them and should contact hosts about accommodations or concerns."],
        ["Moderation", "Listings may be reviewed, paused, or removed when they conflict with community guidelines or appear misleading or unsafe."],
      ]}
    />
  );
}
