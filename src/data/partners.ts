/**
 * Partners Data
 * Organize partners by category
 */

export interface Partner {
  id: string;
  name: string;
  category: "main" | "gold" | "silver" | "media";
  logo: string;
  website?: string;
}

export const partners: Partner[] = [
  // Main Partner
  {
    id: "main-1",
    name: "Main Partner",
    category: "main",
    logo: "/images/partners/main-partner.png",
    website: "https://example.com",
  },

  // Gold Partners
  {
    id: "gold-1",
    name: "Gold Partner 1",
    category: "gold",
    logo: "/images/partners/gold-partner-01.png",
    website: "https://example.com",
  },
  {
    id: "gold-2",
    name: "Gold Partner 2",
    category: "gold",
    logo: "/images/partners/gold-partner-02.png",
    website: "https://example.com",
  },
  {
    id: "gold-3",
    name: "Gold Partner 3",
    category: "gold",
    logo: "/images/partners/gold-partner-03.png",
    website: "https://example.com",
  },

  // Silver Partners
  {
    id: "silver-1",
    name: "Silver Partner 1",
    category: "silver",
    logo: "/images/partners/silver-partner-01.png",
    website: "https://example.com",
  },
  {
    id: "silver-2",
    name: "Silver Partner 2",
    category: "silver",
    logo: "/images/partners/silver-partner-02.png",
    website: "https://example.com",
  },
  {
    id: "silver-3",
    name: "Silver Partner 3",
    category: "silver",
    logo: "/images/partners/silver-partner-03.png",
    website: "https://example.com",
  },

  // Media Partners
  {
    id: "media-1",
    name: "Media Partner 1",
    category: "media",
    logo: "/images/partners/media-partner-01.png",
    website: "https://example.com",
  },
  {
    id: "media-2",
    name: "Media Partner 2",
    category: "media",
    logo: "/images/partners/media-partner-02.png",
    website: "https://example.com",
  },
];
