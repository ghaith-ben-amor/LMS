/**
 * Program Schedule Data
 * Seed data for Delegate Conference Schedule
 */

export interface ScheduleItem {
  id: string;
  time: string;
  activity: string;
  description: string;
  location: string;
  duration?: string;
  speaker?: string;
}

export interface DaySchedule {
  day: string;
  date: string;
  events: ScheduleItem[];
}

export const programSchedule: DaySchedule[] = [
  {
    day: "DAY 01",
    date: "October 2, 2026",
    events: [
      {
        id: "d1-1",
        time: "08:00",
        activity: "Registration & Welcome",
        description: "Delegate check-in, welcome kit distribution, and registration at the main hall.",
        location: "Main Hall",
        duration: "2 hours",
      },
      {
        id: "d1-2",
        time: "10:00",
        activity: "Opening Ceremony",
        description: "Inaugural address and official kickoff of the LMS 2K26 Delegate Experience.",
        location: "Grand Ballroom",
        duration: "1 hour",
      },
      {
        id: "d1-3",
        time: "11:00",
        activity: "Ice Breaking & Team Synergy",
        description: "Engaging icebreaker activities designed to connect 200+ delegates.",
        location: "Various Rooms",
        duration: "1.5 hours",
      },
      {
        id: "d1-4",
        time: "12:30",
        activity: "Networking Lunch",
        description: "Casual dining and networking with fellow delegates.",
        location: "Dining Hall",
        duration: "1.5 hours",
      },
      {
        id: "d1-5",
        time: "14:00",
        activity: "Leadership Workshop",
        description: "Discover the core principles of strategic leadership and self-mastery.",
        location: "Workshop Rooms",
        duration: "2 hours",
        speaker: "Dr. Sarah M. Johnson",
      },
      {
        id: "d1-6",
        time: "16:00",
        activity: "Coffee Break & Connections",
        description: "Refreshments and informal peer connections.",
        location: "Lounge Area",
        duration: "30 minutes",
      },
      {
        id: "d1-7",
        time: "16:30",
        activity: "Networking Gala Night",
        description: "An elegant evening of dinner, music, and meaningful connection.",
        location: "Grand Ballroom",
        duration: "3 hours",
      },
    ],
  },
  {
    day: "DAY 02",
    date: "October 3, 2026",
    events: [
      {
        id: "d2-1",
        time: "09:00",
        activity: "Keynote Address",
        description: "Inspiring insights from a global thought leader on youth leadership.",
        location: "Grand Ballroom",
        duration: "1 hour",
        speaker: "Ahmed Ben Salah",
      },
      {
        id: "d2-2",
        time: "10:00",
        activity: "Strategic Skill Building",
        description: "Interactive session on discovering your core strengths and leadership vision.",
        location: "Workshop Room A",
        duration: "1.5 hours",
        speaker: "Emma Laurent",
      },
      {
        id: "d2-3",
        time: "11:30",
        activity: "Specialized Breakout Tracks",
        description: "Choose specialized leadership tracks aligned with your goals.",
        location: "Multiple Rooms",
        duration: "1.5 hours",
      },
      {
        id: "d2-4",
        time: "13:00",
        activity: "Lunch & Peer Exchange",
        description: "Enjoy a meal while connecting with new delegates.",
        location: "Dining Hall",
        duration: "1.5 hours",
      },
      {
        id: "d2-5",
        time: "14:30",
        activity: "Communication & Public Speaking",
        description: "Master public speaking, persuasion, and executive presence.",
        location: "Workshop Rooms",
        duration: "2 hours",
        speaker: "Lisa Chen",
      },
      {
        id: "d2-6",
        time: "16:30",
        activity: "Delegate Leadership Challenge",
        description: "Participate in real-time team simulations that test problem-solving.",
        location: "Challenge Room",
        duration: "1.5 hours",
      },
      {
        id: "d2-7",
        time: "18:00",
        activity: "Celebration Dinner",
        description: "Delegates dinner and evening entertainment.",
        location: "Terrace & Ballroom",
        duration: "2.5 hours",
      },
    ],
  },
  {
    day: "DAY 03",
    date: "October 4, 2026",
    events: [
      {
        id: "d3-1",
        time: "09:00",
        activity: "Reflection & Growth Plan",
        description: "Develop a personal 90-day post-conference action plan.",
        location: "Auditorium",
        duration: "1.5 hours",
      },
      {
        id: "d3-2",
        time: "10:30",
        activity: "Executive Panel Discussion",
        description: "Senior leaders and alumni discuss emerging career and societal trends.",
        location: "Grand Ballroom",
        duration: "1.5 hours",
      },
      {
        id: "d3-3",
        time: "12:00",
        activity: "Farewell Lunch",
        description: "Final networking lunch with fellow delegates and facilitators.",
        location: "Dining Hall",
        duration: "1.5 hours",
      },
      {
        id: "d3-4",
        time: "13:30",
        activity: "Delegate Speed Networking",
        description: "Fast-paced one-on-one networking rounds to connect with every delegate.",
        location: "Various Rooms",
        duration: "1.5 hours",
      },
      {
        id: "d3-5",
        time: "15:00",
        activity: "Leadership Graduation Ceremony",
        description: "The grand finale celebrating delegate achievements and growth.",
        location: "Grand Ballroom",
        duration: "1.5 hours",
      },
      {
        id: "d3-6",
        time: "16:30",
        activity: "Closing Ceremony & Departure",
        description: "Final closing remarks, group photo, and official conclusion of LMS 2K26.",
        location: "Grand Ballroom",
        duration: "1 hour",
      },
    ],
  },
];
