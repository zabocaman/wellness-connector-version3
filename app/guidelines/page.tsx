import { HeartHandshake } from "lucide-react";
import { PolicyPage } from "@/components/PolicyPage";

export default function GuidelinesPage() {
  return (
    <PolicyPage
      eyebrow="Community care"
      title="Guidelines for gathering well"
      intro="Wellness Connector is built for low-pressure, respectful community experiences. These guidelines apply to hosts, guests, and partners."
      sections={[
        ["Be clear", "Describe the activity, cost, host, setting, and expectations accurately. Update or cancel listings promptly."],
        ["Respect boundaries", "Ask before offering advice or physical assistance. Participation, conversation, and sharing are always optional."],
        ["Keep it non-clinical", "Do not diagnose, promise health outcomes, or present an event as a substitute for qualified medical or mental health care."],
        ["Build access in", "Share honest accessibility information and welcome accommodation questions without making assumptions."],
        ["Protect the space", "No harassment, discrimination, pressure-based selling, or sharing another person's story without consent."],
        ["Report concerns", "Use the report option on any listing. Immediate danger should be directed to local emergency services."],
      ]}
      icon={HeartHandshake}
    />
  );
}
