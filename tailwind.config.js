/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#050507",
          card: "#0D0B10",
          surface: "#15121A",
          border: "rgba(255, 255, 255, 0.08)",
        },
        gold: {
          DEFAULT: "#D4AF37",
          light: "#F7E4BE",
          champagne: "#E6C687",
          dark: "#A88726",
          glow: "rgba(212, 175, 55, 0.25)",
        },
        burgundy: {
          DEFAULT: "#7A1C28",
          dark: "#4A0E17",
          light: "#A32B3A",
          hover: "#8C2130",
          glow: "rgba(122, 28, 40, 0.35)",
        },
        ivory: {
          DEFAULT: "#F9F6F0",
          muted: "#C5C0B6",
          dark: "#8E887D",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "slide-in": "slideIn 0.6s ease-out",
        "pulse-subtle": "pulseSubtle 4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          from: { opacity: "0", transform: "translateX(-24px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "0.5" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      boxShadow: {
        "gold-glow": "0 0 25px rgba(212, 175, 55, 0.25)",
        "burgundy-glow": "0 0 30px rgba(122, 28, 40, 0.35)",
        "card-luxury": "0 10px 40px -10px rgba(0, 0, 0, 0.8)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-velvet": "radial-gradient(ellipse at top, rgba(122, 28, 40, 0.25) 0%, rgba(5, 5, 7, 0.95) 70%, #050507 100%)",
        "gold-metallic": "linear-gradient(135deg, #F7E4BE 0%, #D4AF37 50%, #A88726 100%)",
        "burgundy-velvet": "linear-gradient(135deg, #A32B3A 0%, #7A1C28 50%, #4A0E17 100%)",
      },
    },
  },
  plugins: [],
};

