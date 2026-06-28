export interface Post {
  slug: string;
  titulo: string;
  resumo: string;
  conteudo: string;
  categoria: PostCategoria;
  imagem: string;
  autor: string;
  autorFoto: string;
  publicadoEm: string;
  tempoLeitura: number;
  destaque: boolean;
}

export type PostCategoria =
  | "eventos"
  | "dicas"
  | "documentacao"
  | "destinos"
  | "guias"
  | "experiencias";

export const posts: Post[] = [
  {
    slug: "como-se-preparar-para-a-nfl-no-brasil",
    titulo: "Como se preparar para a NFL no Brasil",
    resumo:
      "Tudo o que você precisa saber antes de viver a experiência do futebol americano em São Paulo: ingressos, setores, transporte e dicas exclusivas.",
    conteudo: "",
    categoria: "guias",
    imagem:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200",
    autor: "Blue Panda",
    autorFoto:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100",
    publicadoEm: "2026-06-10",
    tempoLeitura: 8,
    destaque: true,
  },
  {
    slug: "monaco-guia-completo-formula1",
    titulo: "Mônaco: o guia completo para o Grand Prix",
    resumo:
      "O Grand Prix de Mônaco é diferente de qualquer outra etapa da Fórmula 1. Descubra os melhores setores, hotéis, restaurantes e como aproveitar ao máximo.",
    conteudo: "",
    categoria: "destinos",
    imagem:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200",
    autor: "Blue Panda",
    autorFoto:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100",
    publicadoEm: "2026-05-20",
    tempoLeitura: 12,
    destaque: true,
  },
  {
    slug: "documentos-necessarios-para-viajar-aos-eua",
    titulo: "Documentos necessários para viajar aos EUA",
    resumo:
      "Passaporte, visto, ESTA — o que é obrigatório e como solicitar com antecedência para garantir sua experiência sem imprevistos.",
    conteudo: "",
    categoria: "documentacao",
    imagem:
      "https://images.unsplash.com/photo-1568992688065-536aad8a12f6?q=80&w=1200",
    autor: "Blue Panda",
    autorFoto:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100",
    publicadoEm: "2026-05-05",
    tempoLeitura: 6,
    destaque: false,
  },
  {
    slug: "champions-league-final-wembley-experiencia",
    titulo: "Como é viver uma final da Champions League em Wembley",
    resumo:
      "Hinos europeus, torcedores de todo o mundo, tensão até o último segundo. Um relato de quem esteve em Wembley em uma final histórica.",
    conteudo: "",
    categoria: "experiencias",
    imagem:
      "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=1200",
    autor: "Blue Panda",
    autorFoto:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100",
    publicadoEm: "2026-04-18",
    tempoLeitura: 10,
    destaque: false,
  },
  {
    slug: "5-dicas-para-sua-primeira-viagem-esportiva",
    titulo: "5 dicas essenciais para sua primeira viagem esportiva",
    resumo:
      "Se é a primeira vez que você vai a um grande evento esportivo no exterior, essas cinco dicas vão fazer toda a diferença na sua experiência.",
    conteudo: "",
    categoria: "dicas",
    imagem:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200",
    autor: "Blue Panda",
    autorFoto:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100",
    publicadoEm: "2026-03-30",
    tempoLeitura: 5,
    destaque: false,
  },
  {
    slug: "super-bowl-tudo-que-voce-precisa-saber",
    titulo: "Super Bowl: tudo que você precisa saber",
    resumo:
      "O maior evento esportivo do planeta vai muito além do jogo. Shows, festas, hospitality e uma semana inteira de experiências únicas.",
    conteudo: "",
    categoria: "eventos",
    imagem:
      "https://images.unsplash.com/photo-1580974852861-c381510bc98a?q=80&w=1200",
    autor: "Blue Panda",
    autorFoto:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100",
    publicadoEm: "2026-03-10",
    tempoLeitura: 9,
    destaque: false,
  },
];

export const categoriasBlog: { value: PostCategoria | "todos"; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "eventos", label: "Eventos" },
  { value: "experiencias", label: "Experiências" },
  { value: "destinos", label: "Destinos" },
  { value: "guias", label: "Guias" },
  { value: "dicas", label: "Dicas" },
  { value: "documentacao", label: "Documentação" },
];

export function formatarData(data: string): string {
  return new Date(data).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
