export type EventCategory =
  | "Movement"
  | "Mindfulness"
  | "Creative"
  | "Social"
  | "Outdoor"
  | "Support Group"
  | "Food & Nutrition";

export type WellnessEvent = {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  date: string;
  time: string;
  location: string;
  format: "In-person" | "Online" | "Hybrid";
  price: number;
  host: string;
  hostInitials: string;
  sponsored: boolean;
  sponsorName?: string;
  community: boolean;
  size: "Small group" | "Medium group" | "Large group";
  comfort: "Solo-friendly" | "Small group" | "Social";
  beginnerFriendly: boolean;
  accessibility: string;
  audience: string;
  expectations: string;
  maxAttendees: number;
  spotsLeft: number;
  bookingUrl: string;
  accent: "sage" | "blue" | "sand" | "peach" | "lilac";
};

export type ArchetypeId =
  | "grounded"
  | "social"
  | "creative"
  | "movement"
  | "builder";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  provider: "google" | "facebook";
  avatar?: string;
};

export type PostedEvent = {
  id: string;
  title: string;
  category: EventCategory;
  date: string;
  location: string;
  status: "Pending review" | "Active";
};
