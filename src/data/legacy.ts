/**
 * LMS Legacy Editions
 */

export interface LegacyEdition {
  id: string;
  year: number;
  edition: string;
  theme: string;
  description: string;
  image: string;
  participants?: number;
}

export const legacyEditions: LegacyEdition[] = [
  {
    id: "lms-2k26",
    year: 2026,
    edition: "LMS 2K26",
    theme: "Behind the Mask",
    description: "Our flagship masquerade-themed leadership experience bringing together young leaders for transformation and discovery.",
    image: "/images/editions/lms-2k26.jpg",
    participants: 200,
  },
  {
    id: "lms-2k25",
    year: 2025,
    edition: "LMS 2K25",
    theme: "Illuminate",
    description: "A year focused on finding and sharing your inner light, connecting with authentic purpose.",
    image: "/images/editions/lms-2k25.jpg",
    participants: 180,
  },
  {
    id: "lms-2k24",
    year: 2024,
    edition: "LMS 2K24",
    theme: "Nexus",
    description: "Bringing together leaders to create a network of positive change and innovation.",
    image: "/images/editions/lms-2k24.jpg",
    participants: 150,
  },
  {
    id: "lms-2k23",
    year: 2023,
    edition: "LMS 2K23",
    theme: "Ascend",
    description: "Our inaugural edition, launching the LMS movement with a focus on personal growth.",
    image: "/images/editions/lms-2k23.jpg",
    participants: 120,
  },
];
