/**
 * LMS Legacy Editions Data
 */

export interface LegacyEdition {
  id: string;
  year: number;
  edition: string;
  theme: string;
  description: string;
  image: string;
  participants: number;
}

export const legacyEditions: LegacyEdition[] = [
  {
    id: "lms-2k26",
    year: 2026,
    edition: "LMS 2K26",
    theme: "Lead With Purpose",
    description: "Our flagship leadership development summit bringing together young leaders for empowerment, vision, and growth in Hammamet.",
    image: "/images/editions/lms-2k26.jpg",
    participants: 200,
  },
  {
    id: "lms-2k25",
    year: 2025,
    edition: "LMS 2K25",
    theme: "Illuminate",
    description: "A year focused on finding and sharing your inner light, connecting with authentic purpose and collective leadership impact.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    participants: 180,
  },
  {
    id: "lms-2k24",
    year: 2024,
    edition: "LMS 2K24",
    theme: "Nexus",
    description: "Bringing together visionary youth leaders to create an interconnected network of positive social change and innovation.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    participants: 150,
  },
  {
    id: "lms-2k23",
    year: 2023,
    edition: "LMS 2K23",
    theme: "Ascend",
    description: "Our inaugural edition, launching the LMS movement with a focus on personal growth, self-mastery, and community building.",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
    participants: 120,
  },
];
