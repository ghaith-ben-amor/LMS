import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LMS 2K26 — Behind the Mask, Discover Yourself",
  description: "LMS 2K26 is a leadership experience where connection, discovery and transformation come together behind the mask. Join us in Hammamet, Tunisia for an unforgettable masquerade-themed conference.",
  keywords: "LMS, leadership, conference, masquerade, Tunisia, personal development",
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
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-black text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
