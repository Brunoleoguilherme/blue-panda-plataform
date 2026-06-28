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
      "Tudo o que você precisa saber antes de viver a experiência do futebol americano no Maracanã: ingressos, setores, transporte e dicas exclusivas.",
    conteudo: `
      <h2>Baltimore Ravens x Dallas Cowboys no Maracanã</h2>
      <p>Em setembro de 2026, o Brasil recebe pela primeira vez uma partida da NFL no lendário Maracanã, no Rio de Janeiro. Baltimore Ravens e Dallas Cowboys se enfrentam em um dos palcos mais icônicos do esporte mundial. Se você está planejando viver essa experiência, preparamos este guia completo para que nada passe despercebido.</p>

      <h2>Ingressos e setores</h2>
      <p>O Maracanã comporta mais de 78.000 torcedores, mas os ingressos para a NFL Brasil esgotam rapidamente. Os setores variam entre cadeiras superiores, cadeiras inferiores e as cobiçadas áreas premium com hospitalidade exclusiva — open bar, acesso VIP, área coberta e visão privilegiada do campo.</p>
      <p>A Blue Panda oferece pacotes com ingressos em setores premium garantidos, eliminando a incerteza das filas virtuais e dos revendedores não oficiais.</p>

      <h2>Como chegar ao Maracanã</h2>
      <p>O estádio é bem servido pelo metrô (linha 2 — estação Maracanã). Recomendamos o transporte público no dia do jogo, já que o trânsito na região é intenso. Para quem optar por carro ou transfer privativo, planeje chegar com ao menos 2 horas de antecedência.</p>

      <h2>O que levar</h2>
      <p>O dia de jogo da NFL tem uma atmosfera diferente de qualquer outro evento esportivo. Algumas dicas práticas:</p>
      <ul>
        <li>Documento de identidade ou passaporte (obrigatório na entrada)</li>
        <li>Roupa do seu time favorito — Ravens ou Cowboys</li>
        <li>Protetor solar e água (o jogo acontece em setembro, tempo quente no Rio)</li>
        <li>Câmera fotográfica (objetos grandes são proibidos)</li>
      </ul>

      <h2>A experiência Blue Panda</h2>
      <p>Nossos pacotes incluem ingresso em setor premium, transfer do hotel ao estádio e de volta, guia bilíngue durante todo o evento e atendimento dedicado da nossa equipe. Você só precisa se preocupar em curtir cada jogada.</p>
    `,
    categoria: "guias",
    imagem: "/images/hero-nfl.jpg",
    autor: "Blue Panda",
    autorFoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100",
    publicadoEm: "2026-06-10",
    tempoLeitura: 8,
    destaque: true,
  },
  {
    slug: "monaco-guia-completo-formula1",
    titulo: "Mônaco: o guia completo para o Grand Prix",
    resumo:
      "O Grand Prix de Mônaco é diferente de qualquer outra etapa da Fórmula 1. Descubra os melhores setores, hotéis, restaurantes e como aproveitar ao máximo.",
    conteudo: `
      <h2>O circuito mais glamouroso da história</h2>
      <p>Mônaco não é apenas uma corrida — é uma experiência de vida. Pelas ruas estreitas do principado, os carros passam a menos de um metro das grades, com velocidades que fazem o coração acelerar mesmo para quem não é fã de Fórmula 1. O Grand Prix de Mônaco é único no calendário e, para muitos, é o evento esportivo mais desejado do mundo.</p>

      <h2>Os melhores setores para assistir</h2>
      <p>A Curva da Piscine, o Túnel e a chicane de Sainte Devote são os pontos mais disputados. As arquibancadas ao redor do porto oferecem uma visão privilegiada dos iates — um espetáculo à parte que acontece ao mesmo tempo que a corrida. Para quem quer hospitalidade de alto nível, os camarotes suspensos sobre o traçado são a escolha certa.</p>

      <h2>Onde ficar em Mônaco</h2>
      <p>O Hotel de Paris e o Fairmont Monte Carlo são as escolhas clássicas, mas esgotam meses antes. A Blue Panda garante acomodações com localização privilegiada para que você possa caminhar até o circuito. Muitos de nossos clientes optam por pacotes com base em Nice ou Cannes, com transfer diário para o principado.</p>

      <h2>Além da corrida</h2>
      <p>O fim de semana do GP dura cinco dias. Treinos livres, classificação e o domingo da corrida têm atmosferas completamente diferentes. Aproveite para visitar o Cassino de Monte Carlo, jantar no porto e passear de iate — experiências que a Blue Panda pode incluir no seu pacote personalizado.</p>
    `,
    categoria: "destinos",
    imagem: "/images/hero-f1.jpg",
    autor: "Blue Panda",
    autorFoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100",
    publicadoEm: "2026-05-20",
    tempoLeitura: 12,
    destaque: false,
  },
  {
    slug: "documentos-necessarios-para-viajar-aos-eua",
    titulo: "Documentos necessários para viajar aos EUA",
    resumo:
      "Passaporte, visto, ESTA — o que é obrigatório e como solicitar com antecedência para garantir sua experiência sem imprevistos.",
    conteudo: `
      <h2>Planeje a documentação com antecedência</h2>
      <p>Uma das maiores causas de frustração em viagens internacionais é a documentação deixada para a última hora. Para os EUA, os requisitos são claros, mas o tempo de processamento pode ser longo — especialmente para o visto americano. Veja o que você precisa.</p>

      <h2>Passaporte válido</h2>
      <p>Seu passaporte precisa ter validade mínima de 6 meses além da data de retorno prevista. Verifique hoje mesmo a validade do seu documento. A renovação de passaporte brasileiro pode levar de 5 a 30 dias úteis dependendo da unidade da Polícia Federal.</p>

      <h2>Visto americano (Visto B1/B2)</h2>
      <p>O Brasil não participa do Programa de Isenção de Vistos (Visa Waiver). Isso significa que todo cidadão brasileiro precisa de visto para entrar nos Estados Unidos como turista. O processo inclui:</p>
      <ul>
        <li>Preenchimento do formulário DS-160 no site oficial do Departamento de Estado</li>
        <li>Pagamento da taxa MRV (US$ 185)</li>
        <li>Agendamento e comparecimento à entrevista no consulado americano</li>
        <li>Prazo médio de espera para entrevista: 30 a 90 dias nas principais cidades</li>
      </ul>

      <h2>ESTA — alternativa para quem já tem visto americano anterior</h2>
      <p>Se você já teve um visto americano válido nos últimos anos, é possível que seja elegível ao ESTA (Electronic System for Travel Authorization). Consulte um especialista ou o site oficial do CBP para verificar sua elegibilidade.</p>

      <h2>Seguro viagem</h2>
      <p>Não é exigência legal para entrar nos EUA, mas é altamente recomendado. Os custos médicos americanos são extremamente altos, e uma internação hospitalar pode custar dezenas de milhares de dólares sem cobertura. A Blue Panda indica seguros parceiros com cobertura robusta para todos os nossos pacotes internacionais.</p>
    `,
    categoria: "documentacao",
    imagem: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200",
    autor: "Blue Panda",
    autorFoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100",
    publicadoEm: "2026-05-05",
    tempoLeitura: 6,
    destaque: false,
  },
  {
    slug: "champions-league-final-wembley-experiencia",
    titulo: "Como é viver uma final da Champions League",
    resumo:
      "Hinos europeus, torcedores de todo o mundo, tensão até o último segundo. PSG x Arsenal em Budapeste — um dos maiores espetáculos do futebol mundial.",
    conteudo: `
      <h2>O maior palco do futebol mundial</h2>
      <p>Puskás Aréna, Budapeste. 67.000 pessoas. O hino da UEFA Champions League ecoando pelo estádio. PSG e Arsenal se enfrentam na final de 30 de maio de 2026 na capital húngara. Não importa qual time você torce — a atmosfera de uma final da Champions transcende times e torcidas. É esporte em estado puro.</p>

      <h2>Como é o dia do jogo</h2>
      <p>O ritual começa muito antes do apito inicial. Os bares e restaurantes ao redor do Puskás Aréna ficam tomados horas antes. Torcedores franceses, ingleses e de todo o mundo, diferentes línguas, mesma paixão. A caminhada até o estádio, com estandartes e bandeiras, é uma das experiências mais marcantes do futebol mundial.</p>

      <h2>Dentro do estádio</h2>
      <p>O Puskás Aréna é um dos estádios mais modernos da Europa. Inaugurado em 2019, tem arquibancadas com excelente visibilidade e acústica impressionante. Os melhores setores ficam nas laterais do campo — afaste-se dos gols se quiser ver o jogo completo com perspectiva.</p>

      <h2>Budapeste além do jogo</h2>
      <p>A UEFA transforma Budapeste em um grande festival nos dias que antecedem a final. A capital húngara é uma cidade belíssima, com o Rio Danúbio, o Parlamento e uma cena gastronômica incrível. Recomendamos chegar ao menos 3 dias antes para aproveitar tudo que a cidade oferece.</p>

      <h2>A Blue Panda na Champions</h2>
      <p>Nossos pacotes incluem ingressos em áreas premium, hotel boutique em Budapeste, transfer ao estádio e suporte de um especialista bilíngue durante toda a experiência. Entre em contato e garanta seu lugar na final.</p>
    `,
    categoria: "experiencias",
    imagem: "/images/hero-champions.jpg",
    autor: "Blue Panda",
    autorFoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100",
    publicadoEm: "2026-04-18",
    tempoLeitura: 10,
    destaque: false,
  },
  {
    slug: "5-dicas-para-sua-primeira-viagem-esportiva",
    titulo: "5 dicas essenciais para sua primeira viagem esportiva",
    resumo:
      "Se é a primeira vez que você vai a um grande evento esportivo no exterior, essas cinco dicas vão fazer toda a diferença na sua experiência.",
    conteudo: `
      <h2>A primeira vez é inesquecível — se for bem planejada</h2>
      <p>Viajar para acompanhar um evento esportivo no exterior é diferente de qualquer outra viagem. O ritmo é outro, as emoções são maiores e os imprevistos podem ser frustrantes se você não estiver preparado. Com anos de experiência levando brasileiros aos maiores palcos do esporte mundial, reunimos as cinco dicas que fazem toda a diferença.</p>

      <h2>1. Reserve com muita antecedência</h2>
      <p>Ingressos para Super Bowl, F1 em Mônaco ou Finals da NBA esgotam em questão de horas após abrirem. O mesmo vale para hotéis nas cidades-sede. Se você tem uma experiência em mente, comece a planejar com 6 a 12 meses de antecedência. A Blue Panda tem acesso a cotas e pacotes exclusivos que não estão disponíveis para o público geral.</p>

      <h2>2. Cuide da documentação primeiro</h2>
      <p>Passaporte, visto, seguro viagem — esses documentos têm prazos de processamento que não esperam. Antes de confirmar qualquer reserva, verifique se sua documentação está em dia. Para os EUA, o visto americano pode levar até 3 meses para ser emitido.</p>

      <h2>3. Entenda o fuso horário e o jet lag</h2>
      <p>Chegar na véspera do jogo principal após um voo transatlântico e já estar no estádio no dia seguinte é difícil. Planeje chegar com ao menos 2 dias de antecedência para se adaptar ao fuso, conhecer a cidade e estar 100% presente no momento que importa.</p>

      <h2>4. Aproveite o entorno do evento</h2>
      <p>O jogo é o centro, mas a experiência é muito maior. As fan zones, os eventos oficiais, os pubs locais, os museus esportivos — tudo isso faz parte da memória que você vai levar para sempre. Reserve tempo na agenda para explorar.</p>

      <h2>5. Tenha suporte especializado</h2>
      <p>Em um país desconhecido, com idioma diferente e logística complexa, ter uma equipe de especialistas ao seu lado faz toda a diferença. A Blue Panda acompanha cada cliente com suporte bilíngue, do aeroporto ao estádio e de volta ao hotel. Nenhum detalhe fica para trás.</p>
    `,
    categoria: "dicas",
    imagem: "/images/hero-experiencias.jpg",
    autor: "Blue Panda",
    autorFoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100",
    publicadoEm: "2026-03-30",
    tempoLeitura: 5,
    destaque: false,
  },
  {
    slug: "super-bowl-tudo-que-voce-precisa-saber",
    titulo: "Super Bowl: tudo que você precisa saber",
    resumo:
      "O maior evento esportivo do planeta vai muito além do jogo. Shows, festas, hospitality e uma semana inteira de experiências únicas.",
    conteudo: `
      <h2>Uma semana, não um jogo</h2>
      <p>Quem pensa que o Super Bowl é apenas uma partida de futebol americano está enganado. O Super Bowl é uma semana inteira de eventos, shows, festas e celebrações que transformam a cidade-sede em uma verdadeira festa global. Em fevereiro de 2027, será a vez de Los Angeles receber o Super Bowl LXI.</p>

      <h2>Super Bowl Week — o que acontece</h2>
      <p>Durante os sete dias que antecedem o jogo, Los Angeles se torna o epicentro do entretenimento americano. A NFL Experience, uma imersão interativa no mundo do futebol americano, abre as portas ao público. Os Radio Row reúnem centenas de jornalistas. Festas de marcas como Nike, EA Sports e Pepsi acontecem em locais exclusivos — e com a Blue Panda, você tem acesso a algumas delas.</p>

      <h2>O Halftime Show</h2>
      <p>O show do intervalo do Super Bowl é o espetáculo musical mais assistido do mundo. Em média, mais de 100 milhões de pessoas assistem ao vivo. Estar no estádio durante o Halftime é uma experiência à parte — a produção, as luzes e a energia do público transformam o SoFi Stadium em algo diferente de tudo que você já viu.</p>

      <h2>Como é a experiência de hospitality</h2>
      <p>As áreas de hospitalidade premium do Super Bowl são referência mundial em entretenimento corporativo. Lounges exclusivos, chefs renomados, open bar, vista privilegiada do campo e interação com ex-jogadores da NFL. A Blue Panda oferece pacotes de hospitalidade que colocam você no coração dessa experiência.</p>

      <h2>Los Angeles como palco</h2>
      <p>LA é a escolha perfeita para o Super Bowl. Hollywood, praias de Santa Mônica, gastronomia de nível mundial, o clima perfeito em fevereiro. Planeje chegar alguns dias antes para aproveitar a cidade antes que o ritmo do Super Bowl Week tome conta de tudo.</p>
    `,
    categoria: "eventos",
    imagem: "/images/hero-superbowl.jpg",
    autor: "Blue Panda",
    autorFoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100",
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
