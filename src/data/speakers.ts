/**
 * Speakers Data
 * Add/update speakers here for easy management
 */

export interface Speaker {
  id: string;
  name: string;
  position: string;
  organization: string;
  description: string;
  image: string;
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
    description: "Founder of multiple successful startups. Passionate about empowering the next generation of African leaders.",
    image: "/images/speakers/speaker-02.jpg",
    social: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "speaker-03",
    name: "Emma Laurent",
    position: "Personal Development Coach",
    organization: "Transform International",
    description: "Executive coach specializing in identity, self-discovery, and authentic leadership development.",
    image: "/images/speakers/speaker-03.jpg",
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
    description: "Behavioral psychologist exploring the science behind personal transformation and authentic self-expression.",
    image: "/images/speakers/speaker-04.jpg",
    social: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "speaker-05",
    name: "Lisa Chen",
    position: "Communications Expert",
    organization: "Global Communications Forum",
    description: "Specialist in authentic communication and leadership presence in the digital age.",
    image: "/images/speakers/speaker-05.jpg",
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
    description: "Dedicated to unlocking the potential in young adults and fostering authentic leadership.",
    image: "/images/speakers/speaker-06.jpg",
    social: {
      linkedin: "https://linkedin.com",
    },
  },
];
