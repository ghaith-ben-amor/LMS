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
    id: "speaker-01",
    name: "Ahmed Ben Salah",
    position: "Entrepreneur & Innovator",
    organization: "TechVentures Tunisia",
    description: "Founder of multiple successful startups. Passionate about empowering the next generation of African and MENA leaders.",
    image: "/images/speakers/speaker-01.jpg",
    imagePosition: "object-center",
    category: "keynote",
    social: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "speaker-02",
    name: "Dr. Sarah M. Johnson",
    position: "Leadership Director",
    organization: "Global Leadership Institute",
    description: "Renowned expert in transformational leadership with over 15 years of experience mentoring young leaders across the globe.",
    image: "/images/speakers/speaker-02.jpg",
    imagePosition: "object-top",
    category: "keynote",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    id: "speaker-03",
    name: "Prof. Karim Bennani",
    position: "Psychology & Behavior",
    organization: "University of Tunis",
    description: "Behavioral psychologist exploring the neuroscience behind personal transformation and authentic self-expression behind social masks.",
    image: "/images/speakers/speaker-03.jpg",
    imagePosition: "object-center",
    category: "panelist",
    social: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "speaker-04",
    name: "Marcus Williams",
    position: "Executive Coach & Strategist",
    organization: "Transform International",
    description: "Executive coach specializing in identity, self-discovery, emotional intelligence, and authentic leadership development.",
    image: "/images/speakers/speaker-04.jpg",
    imagePosition: "object-top",
    category: "workshop",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    id: "speaker-05",
    name: "Yassine Mansour",
    position: "Youth Empowerment Leader",
    organization: "Future Leaders Initiative",
    description: "Dedicated to unlocking youth potential, driving social change, and fostering resilient global mindsets.",
    image: "/images/speakers/speaker-05.jpg",
    imagePosition: "object-center",
    category: "panelist",
    social: {
      linkedin: "https://linkedin.com",
    },
  },
];
