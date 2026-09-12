/**
 * Partners & Sponsors Data
 */

export interface Partner {
  id: string;
  name: string;
  category: "main" | "gold" | "silver" | "media";
  logo: string;
  website: string;
}

export const partners: Partner[] = [
  // Main Partner
  {
    id: "main-1",
    name: "AIESEC University",
    category: "main",
    logo: "/images/aiesec_university_logo.png",
    website: "https://aiesec.org",
  },
  // Gold Partners
  {
    id: "gold-1",
    name: "Global Leadership Forum",
    category: "gold",
    logo: "/images/partners/gold-01.png",
    website: "https://example.com",
  },
  {
    id: "gold-2",
    name: "Tunisia Tech Ventures",
    category: "gold",
    logo: "/images/partners/gold-02.png",
    website: "https://example.com",
  },
  {
    id: "gold-3",
    name: "Heritage Resort Hammamet",
    category: "gold",
    logo: "/images/partners/gold-03.png",
    website: "https://example.com",
  },
  // Silver Partners
  {
    id: "silver-1",
    name: "Apex Youth Academy",
    category: "silver",
    logo: "/images/partners/silver-01.png",
    website: "https://example.com",
  },
  {
    id: "silver-2",
    name: "Vanguard Media Group",
    category: "silver",
    logo: "/images/partners/silver-02.png",
    website: "https://example.com",
  },
  {
    id: "silver-3",
    name: "Pulse Energy",
    category: "silver",
    logo: "/images/partners/silver-03.png",
    website: "https://example.com",
  },
  // Media Partners
  {
    id: "media-1",
    name: "Express FM Tunisia",
    category: "media",
    logo: "/images/partners/media-01.png",
    website: "https://example.com",
  },
  {
    id: "media-2",
    name: "Youth Times Africa",
    category: "media",
    logo: "/images/partners/media-02.png",
    website: "https://example.com",
  },
];
