export interface Destino {
  slug: string;
  cidade: string;
  pais: string;
  bandeira: string;
  descricao: string;
  imagem: string;
  eventos: number;
  destaques: string[];
  continente: Continente;
}

export type Continente = "americas" | "europa" | "asia" | "todos";

export const destinos: Destino[] = [
  {
    slug: "sao-paulo",
    cidade: "São Paulo",
    pais: "Brasil",
    bandeira: "🇧🇷",
    descricao:
      "A maior cidade da América Latina recebe os maiores eventos esportivos do mundo. Da NFL à Fórmula E, São Paulo é palco de experiências históricas.",
    imagem: "/images/destino-saopaulo.jpg",
    eventos: 4,
    destaques: ["NFL Brasil", "Fórmula E", "MotoGP", "UFC"],
    continente: "americas",
  },
  {
    slug: "nova-york",
    cidade: "Nova York",
    pais: "Estados Unidos",
    bandeira: "🇺🇸",
    descricao:
      "A cidade que nunca dorme e que concentra alguns dos maiores eventos esportivos do planeta. US Open, NBA, NFL e muito mais.",
    imagem:
      "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?q=80&w=1200",
    eventos: 5,
    destaques: ["US Open", "NBA Knicks", "NY Giants", "NY Yankees"],
    continente: "americas",
  },
  {
    slug: "los-angeles",
    cidade: "Los Angeles",
    pais: "Estados Unidos",
    bandeira: "🇺🇸",
    descricao:
      "Hollywood, praias e esporte de alto nível. LA é sede do Super Bowl LXI e palco das maiores franquias dos EUA.",
    imagem:
      "https://images.unsplash.com/photo-1444723121867-7a241cacace9?q=80&w=1200",
    eventos: 3,
    destaques: ["Super Bowl LXI", "NBA Lakers", "NFL Rams"],
    continente: "americas",
  },
  {
    slug: "monaco",
    cidade: "Monte Carlo",
    pais: "Monaco",
    bandeira: "🇲🇨",
    descricao:
      "O principado mais glamouroso da Europa é palco do Grand Prix mais icônico da Fórmula 1. Uma experiência que une esporte, luxo e exclusividade.",
    imagem: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?q=80&w=800&auto=format&fit=crop",
    eventos: 1,
    destaques: ["F1 Grand Prix", "Iate Club", "Cassino de Monte Carlo"],
    continente: "europa",
  },
  {
    slug: "londres",
    cidade: "Londres",
    pais: "Inglaterra",
    bandeira: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    descricao:
      "Capital do futebol mundial, sede de Wembley e do estádio de Wimbledon. Londres é um destino obrigatório para qualquer amante do esporte.",
    imagem:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200",
    eventos: 4,
    destaques: ["Wimbledon", "Premier League", "NFL London", "Rugby"],
    continente: "europa",
  },
  {
    slug: "paris",
    cidade: "Paris",
    pais: "França",
    bandeira: "🇫🇷",
    descricao:
      "A cidade luz recebe Roland Garros, etapas da Fórmula 1 e grandes eventos da UEFA. Esporte e cultura francesa em uma única experiência.",
    imagem:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200",
    eventos: 3,
    destaques: ["Roland Garros", "F1 França", "PSG Champions"],
    continente: "europa",
  },
  {
    slug: "barcelona",
    cidade: "Barcelona",
    pais: "Espanha",
    bandeira: "🇪🇸",
    descricao:
      "Casa do FC Barcelona e do emblemático Camp Nou. Barcelona une arquitetura, gastronomia e um dos maiores clubes do futebol mundial.",
    imagem:
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=1200",
    eventos: 2,
    destaques: ["FC Barcelona", "MotoGP Catalunya", "Champions League"],
    continente: "europa",
  },
  {
    slug: "dubai",
    cidade: "Dubai",
    pais: "Emirados Árabes",
    bandeira: "🇦🇪",
    descricao:
      "O futuro do entretenimento esportivo de luxo. Dubai sedia eventos únicos com hospitalidade cinco estrelas e infraestrutura de outro nível.",
    imagem:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200",
    eventos: 2,
    destaques: ["F1 Abu Dhabi", "WWE Crown Jewel", "Golf"],
    continente: "asia",
  },
];

export const continentes: { value: Continente | "todos"; label: string }[] = [
  { value: "todos", label: "Todos os destinos" },
  { value: "americas", label: "Américas" },
  { value: "europa", label: "Europa" },
  { value: "asia", label: "Ásia & Oriente Médio" },
];
