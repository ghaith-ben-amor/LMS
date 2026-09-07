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
  category: "keynote" | "workshop" | "panelist";
  social?: {
    linkedin?: string;
    twitter?: string;
  };
}

export const speakers: Speaker[] = [
  {
    id: "speaker-01",
    name: "Dr. Sarah M. Johnson",
    position: "Leadership Director",
    organization: "Global Leadership Institute",
    description: "Renowned expert in transformational leadership with over 15 years of experience mentoring young leaders across the globe.",
    image: "/images/speakers/speaker-01.jpg",
    category: "keynote",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    id: "speaker-02",
    name: "Ahmed Ben Salah",
    position: "Entrepreneur & Innovator",
    organization: "TechVentures Tunisia",
    description: "Founder of multiple successful startups. Passionate about empowering the next generation of African and MENA leaders.",
    image: "/images/speakers/speaker-02.jpg",
    category: "keynote",
    social: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "speaker-03",
    name: "Emma Laurent",
    position: "Personal Development Coach",
    organization: "Transform International",
    description: "Executive coach specializing in identity, self-discovery, emotional intelligence, and authentic leadership development.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    category: "workshop",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    id: "speaker-04",
    name: "Prof. Karim Bennani",
    position: "Psychology & Behavior",
    organization: "University of Tunis",
    description: "Behavioral psychologist exploring the neuroscience behind personal transformation and authentic self-expression behind social masks.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
    category: "panelist",
    social: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "speaker-05",
    name: "Lisa Chen",
    position: "Communications Expert",
    organization: "Global Communications Forum",
    description: "Specialist in authentic communication, stage presence, and public influence in the digital age.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
    category: "workshop",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    id: "speaker-06",
    name: "Marcus Williams",
    position: "Youth Empowerment Leader",
    organization: "Future Leaders Initiative",
    description: "Dedicated to unlocking youth potential, driving social change, and fostering resilient global mindsets.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
    category: "panelist",
    social: {
      linkedin: "https://linkedin.com",
    },
  },
];
