import type { Metadata } from "next";
import { Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LMS 2K26 — Behind the Mask, Discover Yourself",
  description: "LMS 2K26 is a leadership experience where connection, discovery and transformation come together behind the mask. Join us in Hammamet, Tunisia for an unforgettable masquerade-themed conference.",
  keywords: "LMS 2K26, AIESEC, leadership, conference, masquerade, Tunisia, personal development, Hammamet",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lms2k26.tn",
    title: "LMS 2K26 — Behind the Mask, Discover Yourself",
    description: "A leadership experience where connection, discovery and transformation come together.",
    siteName: "LMS 2K26",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${plusJakartaSans.variable} scroll-smooth`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-sans bg-[#050507] text-[#F9F6F0] antialiased overflow-x-hidden selection:bg-amber-500/30 selection:text-amber-200">
        {children}
      </body>
    </html>
  );
}

