/**
 * LMS 2K26 Event Configuration
 * All event-related data is centralized here for easy updates
 */

export const eventConfig = {
  // Event Info
  event: {
    name: "LMS 2K26",
    tagline: "Behind the Mask, Discover Yourself.",
    taglineAlt: "Behind the Mask, Discover Yourself.",
    description: "A leadership and personal development experience where connection, discovery and transformation come together.",
    year: 2026,
    location: "Hammamet, Tunisia",
  },

  // Countdown Date (ISO string format)
  countdownDate: "2026-03-15T08:00:00Z",

  // Social Media
  social: {
    instagram: "https://www.instagram.com/lms.2k26/",
    facebook: "https://facebook.com/lms2k26",
    linkedin: "https://linkedin.com/company/lms2k26",
  },

  // Contact Info
  contact: {
    email: "contact@lms2k26.tn",
    phone: "+216 XX XXX XXX",
  },

  // Hero Section
  hero: {
    title: "LMS 2K26",
    subtitle: "BEHIND THE MASK,\nDISCOVER YOURSELF.",
    location: "Hammamet, Tunisia",
    cta: "JOIN THE EXPERIENCE",
  },

  // Statistics
  stats: [
    { number: 200, label: "Participants" },
    { number: 20, label: "Activities" },
    { number: 10, label: "Speakers" },
    { number: 1, label: "Unforgettable Experience" },
  ],

  // About Section
  about: {
    title: "MORE THAN AN EVENT.",
    subtitle: "A MOMENT TO DISCOVER.",
    description: "LMS 2K26 is more than just a conference. It's an invitation to step behind the mask and discover the leader within. Through carefully designed activities, meaningful connections, and transformative experiences, we create a space where every participant finds their voice and embraces their potential.",
  },

  // Masquerade Stages
  masqueradeStages: [
    {
      number: "01",
      title: "THE MASK",
      description: "Who we show to the world. The identity we present, the roles we play, the expectations we meet.",
    },
    {
      number: "02",
      title: "THE MIRROR",
      description: "Who we discover within ourselves. The reflection of our true values, hidden strengths, and authentic desires.",
    },
    {
      number: "03",
      title: "THE REVEAL",
      description: "Who we become through the experience. The transformation that occurs when we embrace our full selves.",
    },
  ],

  // Experience Sections
  experiences: [
    {
      id: "ballroom",
      title: "THE BALLROOM",
      subtitle: "Networking & Connection",
      description: "A space for meaningful connections. Meet fellow leaders, share ideas, and build lasting relationships in an atmosphere of elegance and openness.",
      icon: "Users",
    },
    {
      id: "mirror",
      title: "THE MIRROR ROOM",
      subtitle: "Self-Discovery & Reflection",
      description: "Dive deep into self-awareness. Through guided workshops and introspection, discover your values, strengths, and the leader you're meant to be.",
      icon: "Eye",
    },
    {
      id: "stage",
      title: "THE STAGE",
      subtitle: "Leadership & Expression",
      description: "Express your voice. Share your perspectives, present ideas, and develop the communication skills that define great leaders.",
      icon: "Megaphone",
    },
    {
      id: "secret",
      title: "THE SECRET ROOM",
      subtitle: "Challenges & Surprises",
      description: "Embrace the unexpected. Participate in unique challenges and experiences designed to push your boundaries and reveal new capabilities.",
      icon: "Sparkles",
    },
  ],
};
