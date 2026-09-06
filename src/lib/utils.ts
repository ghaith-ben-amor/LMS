/**
 * General utility functions
 */

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const calculateCountdown = (targetDate: string): CountdownTime => {
  const now = new Date().getTime();
  const countDownDate = new Date(targetDate).getTime();
  const distance = countDownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

export const formatPhoneNumber = (phone: string): string => {
  // Simple placeholder - customize as needed
  return phone;
};

export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
