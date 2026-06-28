import type { Event, EventCategory } from "@/types";

export const events: Event[] = [
  {
    id: "1",
    slug: "nfl-brasil-2026",
    title: "NFL Brasil 2026",
    subtitle: "Philadelphia Eagles vs Green Bay Packers",
    description:
      "Viva a experiência mais aguardada do futebol americano em solo brasileiro. Ingresso, hotel, transfer e atendimento dedicado incluídos.",
    date: "2026-09-05",
    location: "São Paulo",
    country: "Brasil",
    category: "nfl",
    coverImage:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200",
    featured: true,
    status: "open",
    createdAt: "2026-01-01",
    updatedAt: "2026-01-01",
  },
  {
    id: "2",
    slug: "formula1-monaco-2026",
    title: "F1 Grand Prix de Monaco",
    subtitle: "O circuito mais icônico do mundo",
    description:
      "A Fórmula 1 em Mônaco é única. Ruas estreitas, iate, hospitalidade exclusiva e a adrenalina do circuito mais glamouroso da história.",
    date: "2026-05-24",
    location: "Monte Carlo",
    country: "Monaco",
    category: "formula1",
    coverImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200",
    featured: true,
    status: "open",
    createdAt: "2026-01-01",
    updatedAt: "2026-01-01",
  },
  {
    id: "3",
    slug: "champions-league-final-2026",
    title: "Champions League Final",
    subtitle: "Final UEFA Champions League 2026",
    description:
      "A maior final do futebol europeu. Dois dias em Londres com ingresso, hotel premium e experiência VIP no Wembley Stadium.",
    date: "2026-06-01",
    location: "Londres",
    country: "Inglaterra",
    category: "futebol",
    coverImage:
      "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=1200",
    featured: true,
    status: "soon",
    createdAt: "2026-01-01",
    updatedAt: "2026-01-01",
  },
  {
    id: "4",
    slug: "super-bowl-lxi",
    title: "Super Bowl LXI",
    subtitle: "The Biggest Game on Earth",
    description:
      "O maior evento esportivo do planeta. Pacote completo com ingressos, hospedagem em hotel oficial, shows do intervalo e muito mais.",
    date: "2027-02-07",
    location: "Los Angeles",
    country: "EUA",
    category: "nfl",
    coverImage:
      "https://images.unsplash.com/photo-1580974852861-c381510bc98a?q=80&w=1200",
    featured: false,
    status: "soon",
    createdAt: "2026-01-01",
    updatedAt: "2026-01-01",
  },
  {
    id: "5",
    slug: "us-open-2026",
    title: "US Open 2026",
    subtitle: "Grand Slam de Nova York",
    description:
      "O último Grand Slam do ano no USTA Billie Jean King National Tennis Center. Pacote com ingressos, hotel em Manhattan e city tour.",
    date: "2026-08-31",
    location: "Nova York",
    country: "EUA",
    category: "tenis",
    coverImage:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=1200",
    featured: false,
    status: "open",
    createdAt: "2026-01-01",
    updatedAt: "2026-01-01",
  },
  {
    id: "6",
    slug: "nba-finals-2026",
    title: "NBA Finals 2026",
    subtitle: "A grande final da NBA",
    description:
      "Viva os últimos jogos da temporada mais emocionante da NBA com ingresso, hotel e experiência premium em uma cidade americana.",
    date: "2026-06-15",
    location: "A definir",
    country: "EUA",
    category: "nba",
    coverImage:
      "https://images.unsplash.com/photo-1546519638405-a1d748e3f3b1?q=80&w=1200",
    featured: false,
    status: "soon",
    createdAt: "2026-01-01",
    updatedAt: "2026-01-01",
  },
];

export const categories: { value: EventCategory | "todos"; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "futebol", label: "Futebol" },
  { value: "formula1", label: "Fórmula 1" },
  { value: "nfl", label: "NFL" },
  { value: "nba", label: "NBA" },
  { value: "tenis", label: "Tênis" },
  { value: "outros", label: "Outros" },
];

export const statusConfig = {
  open: { label: "Vagas abertas", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
  soldout: { label: "Esgotado", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
  soon: { label: "Em breve", color: "text-white/50", bg: "bg-white/5 border-white/10" },
} as const;
