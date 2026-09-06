# LMS 2K26 - Behind the Mask, Discover Yourself

A premium, production-quality website for a student leadership conference featuring a sophisticated masquerade theme with elegant animations and responsive design.

## 🎭 Project Overview

LMS 2K26 is a fully-featured conference website built with modern web technologies. It showcases:

- **Elegant Hero Section** - Cinematic fullscreen introduction with animated mask visuals
- **Masquerade Experience** - Interactive 3-stage journey (The Mask → The Mirror → The Reveal)
- **Complete Event Management** - Program schedule, speaker profiles, venue information, and partner listings
- **Immersive Animations** - Smooth transitions, scroll-triggered reveals, and parallax effects
- **Responsive Design** - Optimized for desktop (1920px, 1440px), tablet (1024px, 768px), and mobile (390px, 375px)
- **Dynamic Countdown** - Live countdown timer to the event
- **Modern Visual Identity** - Deep blacks, burgundy, ivory, and gold color palette

## 🛠️ Tech Stack

- **Framework**: Next.js 16.3.4 with TypeScript
- **Styling**: Tailwind CSS 4 with custom theme configuration
- **Animations**: Framer Motion + GSAP
- **Icons**: Lucide React
- **Database/State**: Data files in `/src/data/` for easy management
- **Deployment Ready**: Optimized for Vercel, Netlify, or any Node.js hosting

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm 9+

### Step 1: Navigate to the project
```bash
cd lms-website
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Run the development server
```bash
npm run dev
```

The website will be available at **http://localhost:3000**

### Step 4: Build for production
```bash
npm run build
npm start
```

## 📁 Project Structure

```
lms-website/
├── app/
│   ├── globals.css          # Global styles with custom CSS variables
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Main homepage
│   └── favicon.ico
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Navbar.tsx       # Navigation with mobile menu
│   │   ├── Hero.tsx         # Hero section with mask animation
│   │   ├── About.tsx        # About section with statistics
│   │   ├── Masquerade.tsx   # 3-stage interactive experience
│   │   ├── Experience.tsx   # Experience cards (4 rooms)
│   │   ├── Program.tsx      # Event schedule with day tabs
│   │   ├── Speakers.tsx     # Speaker cards with social links
│   │   ├── Venue.tsx        # Venue information and features
│   │   ├── Partners.tsx     # Partner logos by category
│   │   ├── Gallery.tsx      # Masonry image gallery
│   │   ├── Legacy.tsx       # Previous editions timeline
│   │   ├── FinalReveal.tsx  # Cinematic finale section
│   │   └── Footer.tsx       # Footer with links and contact
│   ├── data/                # Content management files
│   │   ├── event-config.ts  # Main event configuration
│   │   ├── speakers.ts      # Speaker data
│   │   ├── program.ts       # Schedule data
│   │   ├── partners.ts      # Partner listings
│   │   ├── gallery.ts       # Gallery images
│   │   └── legacy.ts        # Previous editions
│   └── lib/
│       ├── animations.ts    # Framer Motion animation presets
│       └── utils.ts         # Utility functions (countdown, etc.)
├── public/
│   └── images/              # Image placeholder directories
│       ├── speakers/
│       ├── gallery/
│       ├── partners/
│       ├── editions/
│       └── venue/
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

## 🎨 Customization Guide

### Event Information
Edit `/src/data/event-config.ts` to update:
- Event name, dates, and location
- Countdown date
- Event description and statistics
- Social media links and contact information

### Speakers
Edit `/src/data/speakers.ts` to add/modify speakers with names, positions, and descriptions.

### Program Schedule
Edit `/src/data/program.ts` to update the 3-day schedule with activities, times, and locations.

### Partners
Edit `/src/data/partners.ts` to organize partners by category (main, gold, silver, media).

### Gallery Images
Edit `/src/data/gallery.ts` to add images. Images are displayed in a masonry layout.

### Colors & Theme
Customize colors in `/app/globals.css` or `tailwind.config.js`.

## 🖼️ Adding Images

Replace placeholder images in the `/public/images/` directories:

1. **Speakers**: `/public/images/speakers/speaker-01.jpg` through `speaker-06.jpg`
2. **Gallery**: `/public/images/gallery/image-01.jpg` through `image-12.jpg`
3. **Partners**: `/public/images/partners/` (logo files)
4. **Editions**: `/public/images/editions/` (previous event photos)
5. **Venue**: `/public/images/venue/venue.jpg`

## 🌐 Deployment

### Deploy to Vercel (Recommended)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Next.js configuration
5. Deploy with one click

### Deploy to Custom Server (Node.js)
```bash
npm run build
npm start
```

## 📱 Responsive Design Testing

The website is optimized for:
- **Desktop**: 1920px, 1440px
- **Tablet**: 1024px, 768px
- **Mobile**: 390px, 375px

## ✨ Features

- Smooth scroll animations and transitions
- Interactive 3-stage masquerade experience
- Live countdown timer
- Responsive mobile menu
- Optimized performance
- SEO-friendly structure
- Accessibility compliant

## 📞 Support

For questions:
- Email: contact@lms2k26.tn
- Website: lms2k26.tn

**Ready to launch! 🎭✨**
