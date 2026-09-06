/**
 * Program Schedule Data
 * Add/update schedule for each day
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
    date: "March 15, 2026",
    events: [
      {
        id: "d1-1",
        time: "08:00",
        activity: "Registration",
        description: "Welcome and registration at the venue entrance.",
        location: "Main Hall",
        duration: "2 hours",
      },
      {
        id: "d1-2",
        time: "10:00",
        activity: "Opening Ceremony",
        description: "Inaugural address and introduction to the LMS 2K26 experience.",
        location: "Grand Ballroom",
        duration: "1 hour",
      },
      {
        id: "d1-3",
        time: "11:00",
        activity: "Ice Breaking Activities",
        description: "Engaging icebreaker sessions to help participants connect.",
        location: "Various Rooms",
        duration: "1.5 hours",
      },
      {
        id: "d1-4",
        time: "12:30",
        activity: "Lunch Break",
        description: "Networking lunch in a casual atmosphere.",
        location: "Dining Hall",
        duration: "1.5 hours",
      },
      {
        id: "d1-5",
        time: "14:00",
        activity: "Leadership Workshop",
        description: "Discover the fundamentals of authentic leadership.",
        location: "Workshop Rooms",
        duration: "2 hours",
        speaker: "Dr. Sarah M. Johnson",
      },
      {
        id: "d1-6",
        time: "16:00",
        activity: "Coffee Break",
        description: "Informal networking and refreshments.",
        location: "Lounge Area",
        duration: "30 minutes",
      },
      {
        id: "d1-7",
        time: "16:30",
        activity: "Masquerade Night",
        description: "An elegant evening of celebration, connection, and mystery.",
        location: "Grand Ballroom",
        duration: "3 hours",
      },
    ],
  },
  {
    day: "DAY 02",
    date: "March 16, 2026",
    events: [
      {
        id: "d2-1",
        time: "09:00",
        activity: "Keynote Address",
        description: "Inspiring insights from a global thought leader.",
        location: "Grand Ballroom",
        duration: "1 hour",
        speaker: "Ahmed Ben Salah",
      },
      {
        id: "d2-2",
        time: "10:00",
        activity: "Self-Discovery Session",
        description: "Deep dive into personal values and authentic self.",
        location: "Mirror Room",
        duration: "1.5 hours",
        speaker: "Emma Laurent",
      },
      {
        id: "d2-3",
        time: "11:30",
        activity: "Breakout Sessions",
        description: "Choose specialized tracks aligned with your interests.",
        location: "Multiple Rooms",
        duration: "1.5 hours",
      },
      {
        id: "d2-4",
        time: "13:00",
        activity: "Lunch & Networking",
        description: "Enjoy a meal while connecting with new friends.",
        location: "Dining Hall",
        duration: "1.5 hours",
      },
      {
        id: "d2-5",
        time: "14:30",
        activity: "Communication & Presence",
        description: "Develop your communication skills and leadership presence.",
        location: "Workshop Rooms",
        duration: "2 hours",
        speaker: "Lisa Chen",
      },
      {
        id: "d2-6",
        time: "16:30",
        activity: "Challenges & Surprises",
        description: "Participate in engaging challenges that test your limits.",
        location: "Secret Room",
        duration: "1.5 hours",
      },
      {
        id: "d2-7",
        time: "18:00",
        activity: "Evening Reception",
        description: "Celebration dinner and entertainment.",
        location: "Terrace & Ballroom",
        duration: "2.5 hours",
      },
    ],
  },
  {
    day: "DAY 03",
    date: "March 17, 2026",
    events: [
      {
        id: "d3-1",
        time: "09:00",
        activity: "Reflection & Integration",
        description: "Process and integrate your LMS 2K26 experience.",
        location: "Auditorium",
        duration: "1.5 hours",
      },
      {
        id: "d3-2",
        time: "10:30",
        activity: "Panel Discussion",
        description: "Hear from speakers and experts on emerging leadership trends.",
        location: "Grand Ballroom",
        duration: "1.5 hours",
      },
      {
        id: "d3-3",
        time: "12:00",
        activity: "Lunch Break",
        description: "Final networking lunch.",
        location: "Dining Hall",
        duration: "1.5 hours",
      },
      {
        id: "d3-4",
        time: "13:30",
        activity: "Networking Speed Dating",
        description: "One-on-one connections with fellow participants.",
        location: "Various Rooms",
        duration: "1.5 hours",
      },
      {
        id: "d3-5",
        time: "15:00",
        activity: "The Reveal Ceremony",
        description: "The grand finale celebrating your transformation journey.",
        location: "Grand Ballroom",
        duration: "1.5 hours",
      },
      {
        id: "d3-6",
        time: "16:30",
        activity: "Closing Remarks & Goodbye",
        description: "Final words and departure of LMS 2K26.",
        location: "Grand Ballroom",
        duration: "1 hour",
      },
    ],
  },
];
