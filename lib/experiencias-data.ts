export interface Experiencia {
  slug: string;
  categoria: string;
  tituloParte1: string;
  tituloParte2: string;
  titulo: string;
  subtitulo: string;
  descricao: string;
  imagem: string;
  destaque: string;
  cor: string;
  conteudo: {
    intro: string;
    topicos: { titulo: string; texto: string }[];
    cta: string;
  };
  eventosRelacionados: string[];
}

export const experiencias: Experiencia[] = [
  {
    slug: "super-bowl",
    categoria: "NFL",
    tituloParte1: "Como é viver",
    tituloParte2: "um Super Bowl",
    titulo: "Como é viver um Super Bowl",
    subtitulo: "O maior espetáculo do entretenimento mundial",
    descricao:
      "O maior espetáculo do entretenimento mundial. Não é apenas um jogo, é uma semana inteira de emoções, shows, festas e cultura americana na sua forma mais intensa.",
    imagem: "/images/hero-superbowl.jpg",
    destaque: "Experiência completa de 7 dias",
    cor: "from-blue-900/80",
    conteudo: {
      intro:
        "O Super Bowl é mais do que um jogo de futebol americano. É o maior evento de entretenimento do planeta, uma semana inteira de festas, eventos exclusivos, shows históricos e a emoção do maior palco do esporte mundial.",
      topicos: [
        {
          titulo: "A semana do Super Bowl",
          texto:
            "Dias antes do jogo, a cidade sede se transforma. Experiências de fan engagement, festas exclusivas, eventos corporativos e a energia única de uma cidade inteira vibrando para o maior jogo do ano.",
        },
        {
          titulo: "O halftime show",
          texto:
            "O intervalo do Super Bowl é um dos maiores shows de música do mundo. Artistas icônicos se apresentam para mais de 100 milhões de telespectadores e você estará lá, ao vivo.",
        },
        {
          titulo: "A experiência Blue Panda",
          texto:
            "Ingressos nas melhores categorias, hotel premium, transfer exclusivo, concierge dedicado e acesso a eventos VIP durante toda a semana. Você cuida apenas de viver.",
        },
      ],
      cta: "Quero viver o Super Bowl",
    },
    eventosRelacionados: ["super-bowl-lxi"],
  },
  {
    slug: "formula1",
    categoria: "Fórmula 1",
    tituloParte1: "Como é a",
    tituloParte2: "F1 em Mônaco",
    titulo: "Como é a F1 em Mônaco",
    subtitulo: "O circuito mais glamouroso da história",
    descricao:
      "Ruas estreitas, iate no porto, o ronco dos motores a centímetros de você. Mônaco transforma o esporte em arte e você estará dentro dessa obra.",
    imagem: "/images/hero-f1.jpg",
    destaque: "O circuito mais glamouroso da história",
    cor: "from-red-900/80",
    conteudo: {
      intro:
        "Mônaco não é apenas uma corrida. É o encontro do automobilismo com o luxo mais absoluto. Iates no porto, galerias de arte, cassinos históricos e os melhores carros do planeta a poucos metros de você.",
      topicos: [
        {
          titulo: "O circuito das ruas",
          texto:
            "Diferente de qualquer outra etapa, Mônaco acontece nas ruas da cidade. Cada curva, cada reta, cada ultrapassagem é sentida de perto. A adrenalina é diferente de qualquer outro lugar.",
        },
        {
          titulo: "A hospitalidade do principado",
          texto:
            "Suítes com vista para o circuito, terraços exclusivos, jantar em restaurantes com estrelas Michelin e o glamour inconfundível do principado de Mônaco.",
        },
        {
          titulo: "A experiência Blue Panda",
          texto:
            "Ingressos em tribuna ou hospitality premium, hotel selecionado, transfer e concierge bilíngue durante todo o Grand Prix.",
        },
      ],
      cta: "Quero viver a F1 em Mônaco",
    },
    eventosRelacionados: ["formula1-monaco-2026"],
  },
  {
    slug: "champions-league",
    categoria: "Futebol",
    tituloParte1: "Uma final da",
    tituloParte2: "Champions League",
    titulo: "Uma final da Champions League",
    subtitulo: "O maior palco do futebol mundial",
    descricao:
      "Hinos europeus, torcedores de todo o mundo, a tensão dos pênaltis. Estar em um estádio em uma final da Champions é uma experiência que define gerações.",
    imagem: "/images/hero-champions.jpg",
    destaque: "O maior palco do futebol mundial",
    cor: "from-green-900/80",
    conteudo: {
      intro:
        "A final da Champions League é o jogo mais assistido do futebol mundial. Dois dos maiores clubes do planeta, em um estádio lotado, com a tensão de uma disputa que pode durar 120 minutos e ir para os pênaltis.",
      topicos: [
        {
          titulo: "O hino da Champions",
          texto:
            "Quando o hino toca no estádio, arrepios tomam conta de todo mundo. É um ritual que pertence à história do esporte e você fará parte dele.",
        },
        {
          titulo: "A cidade e o estádio",
          texto:
            "Cada edição acontece em uma cidade diferente da Europa. Conhecer a cidade, a cultura local e viver o ambiente da final é parte essencial da experiência.",
        },
        {
          titulo: "A experiência Blue Panda",
          texto:
            "Ingressos oficiais, hotel premium próximo ao estádio, transfer e guia dedicado durante toda a sua estadia na cidade sede.",
        },
      ],
      cta: "Quero viver a Champions League",
    },
    eventosRelacionados: ["champions-league-final-2026"],
  },
  {
    slug: "nfl",
    categoria: "NFL",
    tituloParte1: "A NFL",
    tituloParte2: "no Brasil",
    titulo: "A NFL no Brasil",
    subtitulo: "O maior evento esportivo do país",
    descricao:
      "O futebol americano no lendário Maracanã. Baltimore Ravens x Dallas Cowboys com ingresso, pacote premium e a melhor localização no estádio.",
    imagem: "/images/hero-nfl.jpg",
    destaque: "O maior evento esportivo do país",
    cor: "from-indigo-900/80",
    conteudo: {
      intro:
        "A NFL chegou ao Brasil e a Blue Panda está lá para garantir que você viva cada segundo dessa história. Baltimore Ravens x Dallas Cowboys no lendário Maracanã, em um evento que vai marcar a cultura esportiva brasileira.",
      topicos: [
        {
          titulo: "O Maracanã como palco da NFL",
          texto:
            "O estádio mais famoso do Brasil recebe pela primeira vez duas franquias históricas da NFL. Uma combinação que vai entrar para a história do esporte nacional.",
        },
        {
          titulo: "A experiência norte-americana em solo brasileiro",
          texto:
            "Cheerleaders, shows, ativações das franquias, gastronomia americana e todo o espetáculo que a NFL leva para onde vai, agora no Rio de Janeiro.",
        },
        {
          titulo: "A experiência Blue Panda",
          texto:
            "Ingresso nas melhores categorias, pacote completo com hotel no Rio, transfer e suporte durante todo o evento.",
        },
      ],
      cta: "Quero viver a NFL no Brasil",
    },
    eventosRelacionados: ["nfl-brasil-2026"],
  },
  {
    slug: "us-open",
    categoria: "Tênis",
    tituloParte1: "O US Open",
    tituloParte2: "em Nova York",
    titulo: "O US Open em Nova York",
    subtitulo: "Grand Slam + Manhattan",
    descricao:
      "Nova York em agosto é pura energia. O US Open combina o melhor do tênis mundial com a cidade mais vibrante do planeta. Uma semana inesquecível.",
    imagem: "/images/hero-tenis.jpg",
    destaque: "Grand Slam + Manhattan",
    cor: "from-yellow-900/80",
    conteudo: {
      intro:
        "O último Grand Slam do ano acontece em Nova York, no USTA Billie Jean King National Tennis Center. É o torneio mais intenso do calendário, noites iluminadas, courts ao ar livre e a cidade que nunca dorme ao fundo.",
      topicos: [
        {
          titulo: "O torneio mais aberto do Grand Slam",
          texto:
            "Ao contrário de Wimbledon ou Roland Garros, o US Open tem uma energia urbana e democrática única. Torcedores de todo o mundo, celebridades na plateia e matchs que vão até a madrugada.",
        },
        {
          titulo: "Nova York como destino",
          texto:
            "Central Park, Times Square, Brooklyn, gastronomia de alto nível. Nova York é um destino completo. A Blue Panda combina o melhor do US Open com a melhor experiência na cidade.",
        },
        {
          titulo: "A experiência Blue Panda",
          texto:
            "Ingressos para as melhores quadras, hotel em Manhattan, city tour e concierge dedicado durante toda a semana.",
        },
      ],
      cta: "Quero viver o US Open",
    },
    eventosRelacionados: ["us-open-2026"],
  },
  {
    slug: "nba",
    categoria: "NBA",
    tituloParte1: "As Finais",
    tituloParte2: "da NBA",
    titulo: "As Finais da NBA",
    subtitulo: "A maior liga de basquete do mundo",
    descricao:
      "A quadra mais famosa do mundo, os maiores atletas do planeta, a emoção dos últimos segundos. Estar em uma final da NBA é entrar para a história.",
    imagem: "/images/hero-nba.jpg",
    destaque: "A maior liga de basquete do mundo",
    cor: "from-purple-900/80",
    conteudo: {
      intro:
        "As Finais da NBA são o ápice do basquete mundial. Uma série de até 7 jogos entre os dois melhores times da temporada, com cada partida podendo ser a última ou o começo de uma virada histórica.",
      topicos: [
        {
          titulo: "A atmosfera de uma Final",
          texto:
            "Os courts da NBA têm uma energia diferente de qualquer outro esporte. A proximidade com os jogadores, o barulho do parquet, os time-outs estratégicos, tudo cria uma experiência única.",
        },
        {
          titulo: "Os maiores atletas do mundo",
          texto:
            "LeBron, Curry, Giannis, Luka. As Finais reúnem os melhores do mundo no mesmo palco. É história acontecendo em tempo real.",
        },
        {
          titulo: "A experiência Blue Panda",
          texto:
            "Ingressos com localização premium, hotel próximo ao arena, transfer e suporte durante todos os jogos da série.",
        },
      ],
      cta: "Quero viver as Finais da NBA",
    },
    eventosRelacionados: ["nba-finals-2026"],
  },
];

export function getExperiencia(slug: string) {
  return experiencias.find((e) => e.slug === slug);
}
