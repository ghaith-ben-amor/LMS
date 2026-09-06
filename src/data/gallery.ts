/**
 * Gallery Images Data
 */

export interface GalleryImage {
  id: string;
  title: string;
  image: string;
  category?: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: "img-1",
    title: "Opening Ceremony",
    image: "/images/gallery/image-01.jpg",
    category: "ceremonies",
  },
  {
    id: "img-2",
    title: "Networking Session",
    image: "/images/gallery/image-02.jpg",
    category: "networking",
  },
  {
    id: "img-3",
    title: "Workshop Activity",
    image: "/images/gallery/image-03.jpg",
    category: "workshops",
  },
  {
    id: "img-4",
    title: "Masquerade Night",
    image: "/images/gallery/image-04.jpg",
    category: "social",
  },
  {
    id: "img-5",
    title: "Leadership Session",
    image: "/images/gallery/image-05.jpg",
    category: "workshops",
  },
  {
    id: "img-6",
    title: "Panel Discussion",
    image: "/images/gallery/image-06.jpg",
    category: "panels",
  },
  {
    id: "img-7",
    title: "Celebration Dinner",
    image: "/images/gallery/image-07.jpg",
    category: "social",
  },
  {
    id: "img-8",
    title: "Closing Ceremony",
    image: "/images/gallery/image-08.jpg",
    category: "ceremonies",
  },
  {
    id: "img-9",
    title: "Participant Groups",
    image: "/images/gallery/image-09.jpg",
    category: "networking",
  },
  {
    id: "img-10",
    title: "The Reveal Moment",
    image: "/images/gallery/image-10.jpg",
    category: "ceremonies",
  },
  {
    id: "img-11",
    title: "Interactive Challenge",
    image: "/images/gallery/image-11.jpg",
    category: "workshops",
  },
  {
    id: "img-12",
    title: "Evening Reception",
    image: "/images/gallery/image-12.jpg",
    category: "social",
  },
];
