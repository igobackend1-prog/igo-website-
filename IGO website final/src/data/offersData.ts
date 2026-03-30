// Advertising / Offer Posters — data types and localStorage helpers

export interface OfferPoster {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  ctaLabel: string;
  ctaLink: string;
  image: string;          // base64 data URL or absolute/relative URL
  bgColor: string;        // fallback bg colour
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
  expiryDate: string | null;
  note: string;
}

export interface HistoryEntry {
  id: string;
  action: "published" | "updated" | "deleted" | "activated" | "deactivated" | "reordered";
  posterTitle: string;
  posterId: string;
  timestamp: string;
  changeNote: string;
  snapshot: OfferPoster | null;
}

const OFFERS_KEY  = "igo_offer_posters";
const HISTORY_KEY = "igo_ads_history";

export const getOffers = (): OfferPoster[] => {
  try { return JSON.parse(localStorage.getItem(OFFERS_KEY) || "[]"); }
  catch { return []; }
};

export const saveOffers = (offers: OfferPoster[]): void =>
  localStorage.setItem(OFFERS_KEY, JSON.stringify(offers));

export const getActiveOffers = (): OfferPoster[] => {
  const now = new Date();
  return getOffers()
    .filter(o => {
      if (!o.isActive) return false;
      if (o.expiryDate && new Date(o.expiryDate) < now) return false;
      return true;
    })
    .sort((a, b) => a.displayOrder - b.displayOrder);
};

export const getHistory = (): HistoryEntry[] => {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"); }
  catch { return []; }
};

export const addHistory = (entry: Omit<HistoryEntry, "id" | "timestamp">): void => {
  const history = getHistory();
  history.unshift({ ...entry, id: `h_${Date.now()}`, timestamp: new Date().toISOString() });
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 150)));
};

export const generateId = (): string =>
  `offer_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

/** Compress + resize image file to base64 JPEG (~1200px wide, quality 0.78) */
export const compressImage = (file: File, maxWidth = 1200, quality = 0.78): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ratio   = Math.min(maxWidth / img.width, 1);
        canvas.width  = img.width  * ratio;
        canvas.height = img.height * ratio;
        canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export const BADGE_OPTIONS = [
  "", "HOT DEAL", "NEW", "LIMITED", "SPECIAL", "SEASONAL", "FLASH SALE",
];

export const CTA_PRESETS = [
  { label: "Contact Us",    value: "/contact" },
  { label: "View Projects", value: "/projects" },
  { label: "View Products", value: "/products" },
  { label: "View Services", value: "/services" },
  { label: "View Offers",   value: "/offers" },
  { label: "Custom URL…",   value: "__custom__" },
];

// ─── Default seed posters (shown on first load before any uploads) ───────────
const SEED_KEY = "igo_offers_seeded_v2";

const DEFAULT_OFFERS: OfferPoster[] = [
  {
    id: "seed_0",
    title: "",
    subtitle: "",
    badge: "IGO GROUP",
    ctaLabel: "Discover More",
    ctaLink: "/about",
    image: "/assets/demo poster/main-page-image.png",
    bgColor: "#1a5c1a",
    isActive: true,
    displayOrder: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    expiryDate: null,
    note: "Primary IGO Group Brand Slide",
  },
  {
    id: "seed_1",
    title: "",
    subtitle: "",
    badge: "HOT DEAL",
    ctaLabel: "Book Now",
    ctaLink: "/contact",
    image: "/assets/demo%20poster/Copy%20of%20Website%20cover%20page.jpg.jpeg",
    bgColor: "#1a5c1a",
    isActive: true,
    displayOrder: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    expiryDate: null,
    note: "Ramadhan Sale — Holiday Stay offer",
  },
  {
    id: "seed_2",
    title: "",
    subtitle: "",
    badge: "SPECIAL",
    ctaLabel: "Save ₹75,000–5 Lakhs",
    ctaLink: "/contact",
    image: "/assets/demo%20poster/Copy%20of%20Website%20cover%20page%20(1).jpg.jpeg",
    bgColor: "#1a5c1a",
    isActive: true,
    displayOrder: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    expiryDate: null,
    note: "Ramzan savings — up to 5 Lakhs off",
  },
  {
    id: "seed_3",
    title: "",
    subtitle: "",
    badge: "LIMITED",
    ctaLabel: "Book Your Project",
    ctaLink: "/contact",
    image: "/assets/demo%20poster/WhatsApp%20Image%202026-03-23%20at%205.28.32%20PM.jpeg",
    bgColor: "#1a5c1a",
    isActive: true,
    displayOrder: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    expiryDate: null,
    note: "Ramadan Exclusive — Book & get special benefits",
  },
];

/** Seeds default demo posters into localStorage on first ever load. */
export const initDefaultOffers = (): void => {
  if (localStorage.getItem(SEED_KEY)) return;
  if (getOffers().length > 0) { localStorage.setItem(SEED_KEY, "1"); return; }
  saveOffers(DEFAULT_OFFERS);
  localStorage.setItem(SEED_KEY, "1");
};

export const exportHistoryCSV = (): void => {
  const rows = [
    ["ID", "Action", "Poster", "Timestamp", "Note"],
    ...getHistory().map(h => [h.id, h.action, h.posterTitle, h.timestamp, h.changeNote]),
  ];
  const csv  = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url  = URL.createObjectURL(blob);
  const a    = Object.assign(document.createElement("a"), {
    href: url,
    download: `igo_ads_history_${new Date().toISOString().slice(0, 10)}.csv`,
  });
  a.click();
  URL.revokeObjectURL(url);
};
