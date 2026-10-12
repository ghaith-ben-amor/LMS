/**
 * Speakers Data - LMS 2K26 Keynote Speakers & Facilitators
 */

export interface Speaker {
  id: string;
  name: string;
  position: string;
  organization: string;
  description: string;
  image: string;
  imagePosition?: string;
  category: "keynote" | "workshop" | "panelist";
  social?: {
    linkedin?: string;
    twitter?: string;
  };
}

export const speakers: Speaker[] = [
  {
    id: "speaker-04",
    name: "Med Aziz Bokhriss",
    position: "Chair",
    organization: "LMS 2K26",
    description: "Leading the LMS 2K26 conference with vision and excellence, driving the event to inspire and empower the next generation of leaders.",
    image: "/images/speakers/speaker-04.jpg",
    imagePosition: "object-top",
    category: "keynote",
    social: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "speaker-03",
    name: "Ahmed Belhssan",
    position: "LCP University",
    organization: "AIESEC",
    description: "Local Committee President dedicated to developing youth leadership and creating impactful global opportunities within his university.",
    image: "/images/speakers/speaker-03.jpg",
    imagePosition: "object-center",
    category: "keynote",
    social: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "speaker-01",
    name: "Med Amine Othmen",
    position: "LCP",
    organization: "Hadrumet",
    description: "Local Committee President at AIESEC Hadrumet, passionate about empowering the next generation of African and MENA leaders.",
    image: "/images/speakers/speaker-01.jpg",
    imagePosition: "object-center",
    category: "keynote",
    social: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "speaker-02",
    name: "Farah Hamda",
    position: "MCVP IGV",
    organization: "AIESEC",
    description: "Member Committee Vice President for Incoming Global Volunteering, committed to connecting youth with meaningful volunteer experiences.",
    image: "/images/speakers/speaker-02.jpg",
    imagePosition: "object-top",
    category: "panelist",
    social: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "speaker-05",
    name: "Belhassen Jebali",
    position: "LCVP OGT",
    organization: "AIESEC",
    description: "Local Committee Vice President for Outgoing Global Talent, driving international talent exchange and global career opportunities for youth.",
    image: "/images/speakers/speaker-05.jpg",
    imagePosition: "object-center",
    category: "panelist",
    social: {
      linkedin: "https://linkedin.com",
    },
  },
];
