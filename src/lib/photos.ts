/**
 * Every photograph on the public site, with its licence and credit (spec: docs/spec/redesign-v3-motion.md).
 * All are Wikimedia Commons STAND-INS: licensed photographs of the kind of place, never presented as a
 * SiteBlitz client or as a real business shown in a demo. Replace them with commissioned or owner photos
 * when available; keep the credit line in sync (CC BY / CC BY-SA require author + licence + source).
 */

export type PhotoId =
  | "heroShop"
  | "heroShopPortrait"
  | "salonInterior"
  | "salonBasin"
  | "coachingClassroom"
  | "coachingChairs"
  | "showroomInterior"
  | "showroomDining";

export interface Photo {
  src: string;
  width: number;
  height: number;
  /** written for this site; the Commons titles name other people's places */
  alt: string;
  author: string;
  licence: "CC0" | "CC BY 2.0" | "CC BY-SA 3.0" | "CC BY-SA 4.0";
  source: string;
}

export const PHOTOS: Record<PhotoId, Photo> = {
  heroShop: {
    src: "/photos/hero-textile-shop.webp",
    width: 1920,
    height: 1280,
    alt: "Shelves of folded printed cotton fabric in a local textile shop",
    author: "Ninara",
    licence: "CC BY 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Textile_shop_in_Jaipur.jpg",
  },
  /* the same photograph, centre-cropped 9:16 for phones (a landscape frame cover-cropped to a tall screen was
     upscaled about 3x); credited through heroShop */
  heroShopPortrait: {
    src: "/photos/hero-textile-shop-portrait.webp",
    width: 1080,
    height: 1920,
    alt: "Shelves of folded printed cotton fabric in a local textile shop",
    author: "Ninara",
    licence: "CC BY 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Textile_shop_in_Jaipur.jpg",
  },
  salonInterior: {
    src: "/photos/salon-interior.webp",
    width: 1600,
    height: 900,
    alt: "A bright hair salon with tan styling chairs, mirrors and a wooden floor",
    author: "Daderot",
    licence: "CC0",
    source: "https://commons.wikimedia.org/wiki/File:Hair_salon_-_Arlington,_MA.jpg",
  },
  salonBasin: {
    src: "/photos/salon-basin.webp",
    width: 1600,
    height: 1200,
    alt: "A black hair-wash basin at a salon",
    author: "johnrosman",
    licence: "CC BY 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Inside_the_Hair_Salon_(5577833869).jpg",
  },
  coachingClassroom: {
    src: "/photos/coaching-classroom.webp",
    width: 1600,
    height: 1200,
    alt: "An empty classroom with white desks, folding chairs and a whiteboard",
    author: "Sasa 38300",
    licence: "CC BY-SA 3.0",
    source:
      "https://commons.wikimedia.org/wiki/File:HK_292_Tai_Po_Road_SCAD_Hong_Kong_classroom_interior_high_table_chairs_April-2012.JPG",
  },
  coachingChairs: {
    src: "/photos/coaching-chairs.webp",
    width: 1600,
    height: 1200,
    alt: "A study room after class, chairs stacked on the tables by the window",
    author: "Yitzilitt",
    licence: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Empty_classroom_with_chairs_on_table_in_Har_Nof.jpg",
  },
  showroomInterior: {
    src: "/photos/showroom-interior.webp",
    width: 1600,
    height: 1018,
    alt: "A furniture showroom with sofas, a dining set and lamps on display",
    author: "Downtowngal",
    licence: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Furniture_store_interior.jpg",
  },
  showroomDining: {
    src: "/photos/showroom-dining.webp",
    width: 1600,
    height: 1066,
    alt: "A round wooden dining table with upholstered chairs beside a lit glass cabinet",
    author: "Shixart1985",
    licence: "CC BY 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Dining_area_with_wooden_table_and_chairs_in_a_bright_room.jpg",
  },
};

/** The ids a page shows, in order, so its footer credits exactly those. */
export const SITE_PHOTO_IDS: readonly PhotoId[] = [
  "heroShop",
  "salonInterior",
  "coachingClassroom",
  "showroomInterior",
];
