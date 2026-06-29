/* ─── Event ─────────────────────────────────────────────────────────────────── */
export interface Event {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  location: string;
  country: string;
  category: EventCategory;
  coverImage: string;
  featured: boolean;
  status: "open" | "soldout" | "soon";
  createdAt: string;
  updatedAt: string;
}

export type EventCategory =
  | "futebol"
  | "formula1"
  | "nfl"
  | "nba"
  | "tenis"
  | "flag"
  | "outros";

/* ─── Testimonial ────────────────────────────────────────────────────────────── */
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  event: string;
  rating: number;
}

/* ─── Contact Form ───────────────────────────────────────────────────────────── */
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  event?: string;
  message: string;
}
