/**
 * Gallery Images Data - LMS 2K26 Visual Memories
 */

export interface GalleryImage {
  id: string;
  title: string;
  image: string;
  category: "ceremonies" | "workshops" | "networking" | "social";
}

export const galleryImages: GalleryImage[] = [
  {
    id: "img-uploaded-1",
    title: "Delegates Synergy & Team Spirit",
    image: "/images/gallery/gallery-01.jpg",
    category: "social",
  },
  {
    id: "img-uploaded-2",
    title: "Interactive Assembly & Sessions",
    image: "/images/gallery/gallery-02.jpg",
    category: "workshops",
  },
  {
    id: "img-uploaded-3",
    title: "Leadership Address & Keynote",
    image: "/images/gallery/gallery-03.jpg",
    category: "ceremonies",
  },
  {
    id: "img-uploaded-4",
    title: "Delegate Celebration & Energy",
    image: "/images/gallery/gallery-04.jpg",
    category: "social",
  },
  {
    id: "img-uploaded-5",
    title: "Atmospheric Main Stage Session",
    image: "/images/gallery/gallery-05.jpg",
    category: "networking",
  },
  {
    id: "img-uploaded-6",
    title: "University Delegate Address",
    image: "/images/gallery/gallery-06.jpg",
    category: "ceremonies",
  },
  {
    id: "img-uploaded-7",
    title: "Youth Leaders Assembly",
    image: "/images/gallery/gallery-07.jpg",
    category: "social",
  },
  {
    id: "img-uploaded-8",
    title: "Grand Entrance & Celebration",
    image: "/images/gallery/gallery-08.jpg",
    category: "ceremonies",
  },
  {
    id: "img-uploaded-9",
    title: "High Energy Delegate Moment",
    image: "/images/gallery/gallery-09.jpg",
    category: "social",
  },
  {
    id: "img-uploaded-10",
    title: "Team Unity & Solidarity",
    image: "/images/gallery/gallery-10.jpg",
    category: "networking",
  },
  {
    id: "img-uploaded-11",
    title: "Delegates Atmosphere & Moments",
    image: "/images/gallery/gallery-11.jpg",
    category: "social",
  },
];
