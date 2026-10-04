/** Celebration hero + photo gallery (includes newly added gallery shots). */
export const GALLERY_PHOTOS = [
  "/IMG_7011.jpeg",
  "/IMG_7010.jpeg",
  "/IMG_7009.jpeg",
  "/IMG_7023.jpeg",
  "/IMG_7070.jpeg",
  "/IMG_7068.jpeg",
  "/IMG_7069.jpeg",
  "/IMG_7064.jpeg",
  "/IMG_7067.jpeg",
  "/IMG_7072.jpeg",
  "/IMG_7071.jpeg",
] as const;

export type GalleryPhotoSrc = (typeof GALLERY_PHOTOS)[number];

/** @deprecated Use GALLERY_PHOTOS — kept for existing imports */
export const WEDDING_PHOTOS = GALLERY_PHOTOS;
export type WeddingPhotoSrc = GalleryPhotoSrc;

export const GROOM_PORTRAIT: GalleryPhotoSrc = "/IMG_7010.jpeg";
export const BRIDE_PORTRAIT: GalleryPhotoSrc = "/IMG_7011.jpeg";
/** About the Couple — bride letter section (studio portrait). */
export const ABOUT_BRIDE_IMAGE: GalleryPhotoSrc = "/IMG_7011.jpeg";
export const SITE_ICON: GalleryPhotoSrc = "/IMG_7010.jpeg";

/** Hero background slideshow — face-forward shots with tuned crop anchors. */
export const HERO_PHOTOS = [
  { src: "/IMG_7011.jpeg", objectPosition: "50% 25%" },
  { src: "/IMG_7010.jpeg", objectPosition: "50% 40%" },
  { src: "/IMG_7009.jpeg", objectPosition: "60% 40%" },
  { src: "/IMG_7023.jpeg", objectPosition: "55% 35%" },
  { src: "/IMG_7070.jpeg", objectPosition: "50% 30%" },
  { src: "/IMG_7072.jpeg", objectPosition: "50% 30%" },
  { src: "/IMG_7068.jpeg", objectPosition: "55% 30%" },
] as const;

/** Circular portraits beside the hero title. */
export const HERO_PORTRAITS = {
  bride: {
    src: BRIDE_PORTRAIT,
    alt: "Feranmi",
    objectPosition: "51% 20%",
  },
  groom: {
    src: GROOM_PORTRAIT,
    alt: "Ademola",
    objectPosition: "10% 45%",
  },
} as const;

/**
 * Landing page orbit rings only — separate from gallery.
 * Do not add gallery-only photos here.
 */
export const LANDING_RING_PHOTOS = [
  { src: "/IMG_7010.jpeg", alt: "Ademola" },
  { src: "/IMG_7011.jpeg", alt: "Feranmi" },
  { src: "/IMG_7009.jpeg", alt: "Together" },
  { src: "/IMG_7070.jpeg", alt: "Wedding moment" },
  { src: "/IMG_7072.jpeg", alt: "Joy" },
  { src: "/IMG_7068.jpeg", alt: "Celebration" },
] as const;

/** Gallery captions — one per photo, same order as `GALLERY_PHOTOS`. */
export const GALLERY_CAPTIONS: readonly string[] = [
  "Held close, hearts aligned—this is the joy we prayed for.",
  "Every glance between us writes another line of our love story.",
  "Golden moments like these remind us how blessed we are.",
  "By candlelight, a love that only grows warmer.",
  "Eyes closed, hearts open—resting in each other.",
  "Crowned in purple, wrapped in love.",
  "Her grace, his pride—forever side by side.",
  "Tradition, laughter, and the person who feels like home.",
  "Poised, radiant, and ready for forever.",
  "Double denim, double the fun—our best friend energy.",
  "Two seats, one heart, endless conversations.",
];
