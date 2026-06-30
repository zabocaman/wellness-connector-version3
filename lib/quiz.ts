import type { ArchetypeId, EventCategory } from "@/lib/types";

type QuizOption = {
  label: string;
  detail?: string;
  scores: Partial<Record<ArchetypeId, number>>;
};

export type QuizQuestion = {
  id: string;
  eyebrow: string;
  prompt: string;
  options: QuizOption[];
};

export const archetypes: Record<
  ArchetypeId,
  {
    name: string;
    shortName: string;
    description: string;
    activities: string[];
    categories: EventCategory[];
    color: string;
  }
> = {
  grounded: {
    name: "The Grounded Reset Seeker",
    shortName: "Grounded Reset",
    description:
      "You recharge through softness, space, and a slower pace. Gentle practices that settle your nervous system and ask very little of you are a strong place to begin.",
    activities: ["Breathwork", "Nature walks", "Restorative yoga", "Quiet circles"],
    categories: ["Mindfulness", "Outdoor", "Support Group"],
    color: "sage",
  },
  social: {
    name: "The Social Wellness Explorer",
    shortName: "Social Explorer",
    description:
      "Connection helps you feel more like yourself. Welcoming group experiences, shared rituals, and low-pressure ways to meet people can make wellness feel natural.",
    activities: ["Community walks", "Potlucks", "Beginner groups", "Social workshops"],
    categories: ["Social", "Outdoor", "Food & Nutrition"],
    color: "blue",
  },
  creative: {
    name: "The Creative Recharger",
    shortName: "Creative Recharger",
    description:
      "Making, noticing, and expressing help you reset. You may feel most restored in spaces where there is room to explore without needing to perform.",
    activities: ["Journaling", "Collage", "Music circles", "Storytelling"],
    categories: ["Creative", "Mindfulness"],
    color: "peach",
  },
  movement: {
    name: "The Movement Motivator",
    shortName: "Movement Motivator",
    description:
      "Movement helps shift your energy and clear your head. Supportive, adaptable classes and outdoor activities can give you the lift you are looking for.",
    activities: ["Gentle yoga", "Walking groups", "Dance", "Mobility classes"],
    categories: ["Movement", "Outdoor"],
    color: "sand",
  },
  builder: {
    name: "The Mindful Builder",
    shortName: "Mindful Builder",
    description:
      "You feel better with a little structure. Practical workshops, repeatable routines, and supportive accountability can turn a good intention into something sustainable.",
    activities: ["Habit workshops", "Meal prep", "Weekly circles", "Guided planning"],
    categories: ["Mindfulness", "Food & Nutrition", "Support Group"],
    color: "lilac",
  },
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "need",
    eyebrow: "Right now",
    prompt: "What would feel most supportive this week?",
    options: [
      { label: "A chance to slow down", scores: { grounded: 3, creative: 1 } },
      { label: "A bit more connection", scores: { social: 3, builder: 1 } },
      { label: "A healthy energy shift", scores: { movement: 3, social: 1 } },
      { label: "A simple plan I can follow", scores: { builder: 3, grounded: 1 } },
    ],
  },
  {
    id: "social-energy",
    eyebrow: "Your energy",
    prompt: "How does being around new people sound today?",
    options: [
      { label: "Comforting—I would enjoy company", scores: { social: 3 } },
      { label: "Okay in a small, guided group", scores: { creative: 2, builder: 2 } },
      { label: "I would rather keep interaction optional", scores: { grounded: 3 } },
      { label: "Great if we are doing something active", scores: { movement: 3, social: 1 } },
    ],
  },
  {
    id: "reset",
    eyebrow: "Your rhythm",
    prompt: "What usually helps you come back to yourself?",
    options: [
      { label: "Quiet, breathing, or being outside", scores: { grounded: 3 } },
      { label: "Talking and laughing with someone", scores: { social: 3 } },
      { label: "Making or writing something", scores: { creative: 3 } },
      { label: "Moving my body", scores: { movement: 3 } },
    ],
  },
  {
    id: "pace",
    eyebrow: "A comfortable pace",
    prompt: "Choose the kind of activity that sounds easiest to start.",
    options: [
      { label: "Slow and restorative", scores: { grounded: 3 } },
      { label: "Playful and expressive", scores: { creative: 3, social: 1 } },
      { label: "Active but beginner-friendly", scores: { movement: 3 } },
      { label: "Practical and step-by-step", scores: { builder: 3 } },
    ],
  },
  {
    id: "budget",
    eyebrow: "Keep it realistic",
    prompt: "What budget feels comfortable for one activity?",
    options: [
      { label: "Free is best", scores: { social: 1, grounded: 1, movement: 1 } },
      { label: "Up to $15", scores: { creative: 1, movement: 1 } },
      { label: "Up to $30 for something useful", scores: { builder: 2, creative: 1 } },
      { label: "Flexible if it is a strong fit", scores: { builder: 1 } },
    ],
  },
  {
    id: "format",
    eyebrow: "Where it happens",
    prompt: "Which setting feels most inviting?",
    options: [
      { label: "A park or walking route", scores: { grounded: 2, movement: 2 } },
      { label: "A cosy community room", scores: { social: 2, creative: 2 } },
      { label: "Online, from my own space", scores: { grounded: 2, builder: 1 } },
      { label: "A studio with clear guidance", scores: { movement: 2, builder: 2 } },
    ],
  },
  {
    id: "confidence",
    eyebrow: "Trying something new",
    prompt: "What would make a new experience feel easier?",
    options: [
      { label: "Knowing I can observe quietly", scores: { grounded: 3 } },
      { label: "A host who introduces people", scores: { social: 3 } },
      { label: "Having something to make or do", scores: { creative: 3 } },
      { label: "Clear steps and expectations", scores: { builder: 3, movement: 1 } },
    ],
  },
  {
    id: "outcome",
    eyebrow: "Looking ahead",
    prompt: "What would make you glad you went?",
    options: [
      { label: "I feel calmer", scores: { grounded: 3 } },
      { label: "I spoke to someone new", scores: { social: 3 } },
      { label: "I feel inspired", scores: { creative: 3 } },
      { label: "I feel stronger or more energized", scores: { movement: 3 } },
    ],
  },
  {
    id: "follow-through",
    eyebrow: "Making it last",
    prompt: "How do you like to build a wellness habit?",
    options: [
      { label: "One gentle choice at a time", scores: { grounded: 2 } },
      { label: "With people who expect me", scores: { social: 2, movement: 1 } },
      { label: "By keeping it fresh and interesting", scores: { creative: 2 } },
      { label: "With a repeatable routine", scores: { builder: 3 } },
    ],
  },
];

export function calculateArchetype(answers: number[]): ArchetypeId {
  const totals: Record<ArchetypeId, number> = {
    grounded: 0,
    social: 0,
    creative: 0,
    movement: 0,
    builder: 0,
  };

  answers.forEach((optionIndex, questionIndex) => {
    const option = quizQuestions[questionIndex]?.options[optionIndex];
    if (!option) return;
    Object.entries(option.scores).forEach(([key, value]) => {
      totals[key as ArchetypeId] += value ?? 0;
    });
  });

  return (Object.entries(totals) as [ArchetypeId, number][]).sort(
    (a, b) => b[1] - a[1],
  )[0][0];
}
