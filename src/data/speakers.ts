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
  {
    id: "speaker-06",
    name: "Seif Ben Hassouna",
    position: "LCVP IGT / LCP",
    organization: "AIESEC",
    description: "Local Committee Vice President for Incoming Global Talent and Local Committee President, leading international talent programs with passion.",
    image: "/images/speakers/speaker-06.jpg",
    imagePosition: "object-center",
    category: "workshop",
    social: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "speaker-07",
    name: "Aya Taieb",
    position: "Alumna",
    organization: "AIESEC",
    description: "AIESEC alumna bringing years of experience, mentorship and global leadership wisdom to inspire the next generation of young leaders.",
    image: "/images/speakers/speaker-07.jpg",
    imagePosition: "object-top",
    category: "panelist",
    social: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "speaker-08",
    name: "Sirine Farhat",
    position: "LCVP IGV",
    organization: "AIESEC",
    description: "Local Committee Vice President for Incoming Global Volunteering, connecting youth with transformative volunteer experiences across the globe.",
    image: "/images/speakers/speaker-08.jpg",
    imagePosition: "object-top",
    category: "workshop",
    social: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "speaker-09",
    name: "Moataz Hamdi",
    position: "LCVP F&L",
    organization: "AIESEC",
    description: "Local Committee Vice President for Finance & Legality, ensuring organizational excellence and sustainable leadership within AIESEC.",
    image: "/images/speakers/speaker-09.jpg",
    imagePosition: "object-top",
    category: "panelist",
    social: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "speaker-10",
    name: "Adama Awewi",
    position: "MCVP BD",
    organization: "AIESEC",
    description: "Member Committee Vice President for Business Development, driving strategic partnerships and organizational growth across the network.",
    image: "/images/speakers/speaker-10.jpg",
    imagePosition: "object-top",
    category: "keynote",
    social: {
      linkedin: "https://linkedin.com",
    },
  },
];
