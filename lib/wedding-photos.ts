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
  "/IMG_7012.jpeg",
  "/IMG_7013.jpeg",
  "/PABL0905.jpg",
  "/PABL0976s.jpg",
  "/PABL0991.jpg",
  "/PABL1041j.jpg",
  "/PABL1041u.jpg",
  "/PABL1095h.jpg",
  "/PABL1268.jpg",
  "/PABL1310.jpg",
  "/PABL1371.jpg",
  "/PABL1401.jpg",
  "/PABL1404v.jpg",
  "/PABL1449.jpg",
  "/PABL9297C.jpg",
  "/PABL9419.jpg",
  "/PABL9445.jpg",
  "/PABL9464.jpg",
  "/PABL9526.jpg",
] as const;

export type GalleryPhotoSrc = (typeof GALLERY_PHOTOS)[number];

/** @deprecated Use GALLERY_PHOTOS — kept for existing imports */
export const WEDDING_PHOTOS = GALLERY_PHOTOS;
export type WeddingPhotoSrc = GalleryPhotoSrc;

export const GROOM_PORTRAIT: GalleryPhotoSrc = "/IMG_7010.jpeg";
export const BRIDE_PORTRAIT: GalleryPhotoSrc = "/IMG_7011.jpeg";
/** About the Couple — photo beside the groom's letter. */
export const ABOUT_GROOM_IMAGE: GalleryPhotoSrc = "/PABL9526.jpg";
/** About the Couple — photo beside the bride's letter. */
export const ABOUT_BRIDE_IMAGE: GalleryPhotoSrc = "/PABL9445.jpg";
export const SITE_ICON: GalleryPhotoSrc = "/IMG_7011.jpeg";

/** Hero background slideshow — face-forward shots with tuned crop anchors. */
export const HERO_PHOTOS = [
  { src: "/PABL1268.jpg", objectPosition: "50% 32%" },
  { src: "/PABL0905.jpg", objectPosition: "50% 48%" },
  { src: "/PABL0991.jpg", objectPosition: "55% 40%" },
  { src: "/PABL1041j.jpg", objectPosition: "50% 40%" },
  { src: "/PABL1041u.jpg", objectPosition: "50% 38%" },
  { src: "/PABL1095h.jpg", objectPosition: "50% 36%" },
  { src: "/PABL1310.jpg", objectPosition: "50% 38%" },
  { src: "/PABL1371.jpg", objectPosition: "50% 38%" },
  { src: "/PABL1401.jpg", objectPosition: "50% 38%" },
  { src: "/IMG_7068.jpeg", objectPosition: "55% 30%" },
  { src: "/IMG_7011.jpeg", objectPosition: "50% 25%" },
  { src: "/IMG_7010.jpeg", objectPosition: "50% 40%" },
  { src: "/IMG_7009.jpeg", objectPosition: "60% 52%" },
  { src: "/IMG_7023.jpeg", objectPosition: "55% 48%" },
  { src: "/IMG_7070.jpeg", objectPosition: "50% 30%" },
  { src: "/PABL1449.jpg", objectPosition: "50% 48%" },
  { src: "/PABL9419.jpg", objectPosition: "50% 28%" },
  { src: "/PABL9526.jpg", objectPosition: "48% 30%" },
] as const;

/** Circular portraits beside the hero title — traditional portraits. */
export const HERO_PORTRAITS = {
  bride: {
    src: "/IMG_7069.jpeg" as GalleryPhotoSrc,
    alt: "Feranmi",
    objectPosition: "50% 22%",
    scale: 1,
    transformOrigin: "50% 40%",
  },
  groom: {
    src: "/IMG_7070.jpeg" as GalleryPhotoSrc,
    alt: "Ademola",
    objectPosition: "50% 28%",
    scale: 1.72,
    transformOrigin: "34% 30%",
  },
} as const;

/**
 * Landing page orbit rings. Traditional and other portraits alternate,
 * and each circle steps through this list.
 */
export const LANDING_RING_PHOTOS = [
  { src: "/IMG_7070.jpeg", alt: "Together", objectPosition: "50% 28%" },
  { src: "/IMG_7011.jpeg", alt: "Feranmi", objectPosition: "50% 38%" },
  { src: "/PABL1268.jpg", alt: "Together", objectPosition: "50% 18%" },
  { src: "/PABL9526.jpg", alt: "Together", objectPosition: "50% 32%" },
  { src: "/IMG_7069.jpeg", alt: "Feranmi", objectPosition: "50% 22%" },
  { src: "/IMG_7010.jpeg", alt: "Ademola", objectPosition: "42% 42%" },
  { src: "/PABL0991.jpg", alt: "Together", objectPosition: "50% 12%" },
  { src: "/IMG_7072.jpeg", alt: "Joy", objectPosition: "50% 28%" },
  { src: "/IMG_7068.jpeg", alt: "Together", objectPosition: "50% 28%" },
  { src: "/IMG_7009.jpeg", alt: "Together", objectPosition: "55% 42%" },
  { src: "/IMG_7067.jpeg", alt: "Feranmi", objectPosition: "50% 8%" },
  { src: "/PABL9419.jpg", alt: "Together", objectPosition: "50% 28%" },
  { src: "/PABL1041u.jpg", alt: "Together", objectPosition: "50% 22%" },
  { src: "/IMG_7023.jpeg", alt: "Together", objectPosition: "50% 40%" },
  { src: "/PABL1401.jpg", alt: "Together", objectPosition: "50% 18%" },
  { src: "/IMG_7013.jpeg", alt: "Feranmi", objectPosition: "50% 40%" },
  { src: "/PABL0905.jpg", alt: "Together", objectPosition: "50% 12%" },
  { src: "/IMG_7071.jpeg", alt: "Together", objectPosition: "50% 32%" },
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
  "Eyes locked, hearts certain—this is where forever begins.",
  "A kiss on the hand, a promise for a lifetime.",
  "Back to back, still choosing each other—our kind of forever.",
  "Grace in every step, purple in every light.",
  "A quiet look that says everything words cannot.",
  "Hand in hand, walking the path we prayed for.",
  "Side by side, sure of the road ahead.",
  "Together through every doorway of this new chapter.",
  "Framed by love, held in a glance.",
  "Wherever we walk, we walk as one.",
  "Laughter in the garden—this is our joy.",
  "Barefoot and beaming, hand in hand toward forever.",
  "A smile at the doorway, ready for all that is coming.",
  "Home is wherever we sit together.",
  "Even behind the camera, you are my favourite view.",
  "Foreheads close, hearts closer.",
  "Held from behind, safe in the love we chose.",
  "His smile, our beginning.",
  "In your arms, the world feels exactly right.",
];
