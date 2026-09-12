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
    id: "img-1",
    title: "Networking Gala Night",
    image: "/images/gallery/image-01.jpg",
    category: "social",
  },
  {
    id: "img-2",
    title: "Opening Ceremony Address",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    category: "ceremonies",
  },
  {
    id: "img-3",
    title: "Interactive Leadership Workshop",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    category: "workshops",
  },
  {
    id: "img-4",
    title: "Grand Opening Ceremony",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    category: "ceremonies",
  },
  {
    id: "img-5",
    title: "Delegate Networking Session",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
    category: "networking",
  },
  {
    id: "img-6",
    title: "Keynote Leadership Panel",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
    category: "workshops",
  },
  {
    id: "img-7",
    title: "Celebration Dinner",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80",
    category: "social",
  },
  {
    id: "img-8",
    title: "Closing Ceremony & Awards",
    image: "https://images.unsplash.com/photo-1469488865564-c2de10f69f96?auto=format&fit=crop&w=800&q=80",
    category: "ceremonies",
  },
];
