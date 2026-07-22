/**
 * Proficiência com ferramentas — usos expandidos do Guia de Xanathar (p. 78–84).
 * Ideias de mesa: Ability / Utilize / Craft resumidos em PT-BR.
 */

export type ToolCategory =
  | "artisan"
  | "kit"
  | "gaming"
  | "instrument"
  | "vehicle"
  | "other";

export interface ToolDefinition {
  id: string;
  name: string;
  /** Nomes/aliases usados em classes e antecedentes (match fuzzy). */
  aliases: string[];
  category: ToolCategory;
  ability: string;
  summary: string;
  utilize: string[];
  craft?: string[];
  source: "xgte";
}

function t(
  id: string,
  name: string,
  aliases: string[],
  category: ToolCategory,
  ability: string,
  summary: string,
  utilize: string[],
  craft?: string[],
): ToolDefinition {
  return {
    id,
    name,
    aliases,
    category,
    ability,
    summary,
    utilize,
    craft,
    source: "xgte",
  };
}

export const TOOLS: ToolDefinition[] = [
  t(
    "alchemists-supplies",
    "Suprimentos de alquimista",
    ["suprimentos de alquimista", "ferramentas de alquimista", "alquimista"],
    "artisan",
    "Inteligência",
    "Identificar substâncias, criar ácidos, fogos e elixires simples.",
    [
      "Identificar uma poção (teste de Inteligência, normalmente CD 10–15).",
      "Preparar reagentes e extrair essências de plantas/minerais.",
    ],
    ["Ácido", "Fogo de alquimista", "Antídoto", "Óleo", "Perfume", "Sabão"],
  ),
  t(
    "brewers-supplies",
    "Suprimentos de cervejeiro",
    ["suprimentos de cervejeiro", "cervejeiro", "cervejaria"],
    "artisan",
    "Inteligência",
    "Fermentar bebidas e detectar impurezas em líquidos.",
    [
      "Detectar veneno ou impureza em bebida (teste de Inteligência).",
      "Avaliar qualidade e procedência de cervejas e vinhos.",
    ],
    ["Cerveja", "Vinho ou bebidas fermentadas simples"],
  ),
  t(
    "calligraphers-supplies",
    "Suprimentos de calígrafo",
    ["suprimentos de calígrafo", "calígrafo", "caligrafia"],
    "artisan",
    "Destreza",
    "Escrever com elegância e forjar documentos visuais.",
    [
      "Duplicar caligrafia ou criar documentos de aparência oficial.",
      "Escrever runas e textos ornamentados legíveis.",
    ],
    ["Pergaminhos ornamentados", "Tintas especiais"],
  ),
  t(
    "carpenters-tools",
    "Ferramentas de carpinteiro",
    ["ferramentas de carpinteiro", "carpinteiro"],
    "artisan",
    "Força",
    "Construir e reparar estruturas e móveis de madeira.",
    [
      "Avaliar qualidade e segurança de construções de madeira.",
      "Criar abrigos, pontes improvisadas e reforços.",
    ],
    ["Móveis", "Portas", "Baús", "Estruturas de madeira simples"],
  ),
  t(
    "cartographers-tools",
    "Ferramentas de cartógrafo",
    ["ferramentas de cartógrafo", "cartógrafo", "mapas"],
    "artisan",
    "Inteligência",
    "Desenhar e interpretar mapas.",
    [
      "Criar mapas precisos a partir de observação.",
      "Determinar sua posição relativa em território mapeado.",
    ],
    ["Mapas", "Cartas náuticas simples"],
  ),
  t(
    "cobblers-tools",
    "Ferramentas de sapateiro",
    ["ferramentas de sapateiro", "sapateiro"],
    "artisan",
    "Destreza",
    "Fazer e consertar calçados.",
    [
      "Determinar a origem ou uso recente de rastros de calçado.",
      "Ajustar botas para terreno difícil (benefício narrativo/mesa).",
    ],
    ["Botas", "Sapatos", "Reparos de calçado"],
  ),
  t(
    "cooks-utensils",
    "Utensílios de cozinheiro",
    ["utensílios de cozinheiro", "cozinheiro", "cozinha"],
    "artisan",
    "Sabedoria",
    "Preparar refeições e detectar comida estragada ou adulterada.",
    [
      "Detectar comida envenenada ou estragada (teste de Sabedoria).",
      "Preparar refeições que elevam o moral (benefício narrativo).",
    ],
    ["Refeições", "Rações aprimoradas"],
  ),
  t(
    "glassblowers-tools",
    "Ferramentas de vidreiro",
    ["ferramentas de vidreiro", "vidreiro"],
    "artisan",
    "Inteligência",
    "Moldar e reparar vidro.",
    ["Identificar pureza e origem de peças de vidro.", "Criar frascos e lentes simples."],
    ["Frascos", "Lentes", "Ornamentos de vidro"],
  ),
  t(
    "jewelers-tools",
    "Ferramentas de joalheiro",
    ["ferramentas de joalheiro", "joalheiro"],
    "artisan",
    "Inteligência",
    "Avaliar e trabalhar pedras preciosas e metais finos.",
    [
      "Determinar o valor de gemas e joias.",
      "Detectar falsificações em pedras preciosas.",
    ],
    ["Joias", "Anéis", "Engastes"],
  ),
  t(
    "leatherworkers-tools",
    "Ferramentas de coureiro",
    ["ferramentas de coureiro", "coureiro", "couro"],
    "artisan",
    "Destreza",
    "Trabalhar couro em armaduras, bolsas e arreios.",
    ["Reparar armadura de couro e equipamentos.", "Identificar tipo e tratamento de couro."],
    ["Bolsas", "Bainhas", "Armadura de couro", "Arreios"],
  ),
  t(
    "masons-tools",
    "Ferramentas de pedreiro",
    ["ferramentas de pedreiro", "pedreiro"],
    "artisan",
    "Força",
    "Construir e analisar estruturas de pedra.",
    [
      "Encontrar pontos fracos em muros e portões.",
      "Avaliar idade e estilo de alvenaria.",
    ],
    ["Muros", "Pisos", "Estruturas de pedra simples"],
  ),
  t(
    "painters-supplies",
    "Suprimentos de pintor",
    ["suprimentos de pintor", "pintor", "pintura"],
    "artisan",
    "Carisma",
    "Criar arte, pigmentos e disfarces pictóricos.",
    [
      "Criar retratos memoráveis ou sinais visuais.",
      "Misturar tintas e pigmentos especiais.",
    ],
    ["Pinturas", "Sinais", "Maquinas de cena"],
  ),
  t(
    "potters-tools",
    "Ferramentas de oleiro",
    ["ferramentas de oleiro", "oleiro"],
    "artisan",
    "Inteligência",
    "Moldar cerâmica e vasos.",
    ["Criar recipientes impermeáveis.", "Identificar estilo e procedência de cerâmica."],
    ["Vasos", "Jarros", "Utensílios de barro"],
  ),
  t(
    "smiths-tools",
    "Ferramentas de ferreiro",
    ["ferramentas de ferreiro", "ferreiro"],
    "artisan",
    "Força",
    "Forjar e reparar metal.",
    [
      "Reparar armas e armaduras metálicas.",
      "Avaliar qualidade de trabalho metalúrgico.",
    ],
    ["Armas simples", "Armaduras metálicas", "Ferragens", "Pregos"],
  ),
  t(
    "tinkers-tools",
    "Ferramentas de funileiro",
    ["ferramentas de funileiro", "funileiro", "tinker"],
    "artisan",
    "Destreza",
    "Reparar objetos e construir dispositivos minúsculos.",
    [
      "Reparar itens mundanos quebrados.",
      "Criar pequenos dispositivos (isqueiro, cronômetro, caixa de música) com materiais.",
    ],
    ["Reparos", "Dispositivos minúsculos"],
  ),
  t(
    "weavers-tools",
    "Ferramentas de tecelão",
    ["ferramentas de tecelão", "tecelão"],
    "artisan",
    "Destreza",
    "Tecelagem, costura e reparo de tecidos.",
    ["Reparar roupas e tapetes.", "Identificar qualidade e origem de tecidos."],
    ["Roupas", "Mantas", "Cordas de tecido"],
  ),
  t(
    "woodcarvers-tools",
    "Ferramentas de entalhador",
    ["ferramentas de entalhador", "entalhador", "entalhe"],
    "artisan",
    "Destreza",
    "Entalhar madeira em utensílios e arte.",
    ["Criar figuras, placas e peças ornamentais.", "Identificar tipo de madeira."],
    ["Figuras", "Utensílios de madeira", "Arcos simples (mesa)"],
  ),
  t(
    "disguise-kit",
    "Kit de disfarce",
    ["kit de disfarce", "disfarce"],
    "kit",
    "Carisma",
    "Criar disfarces físicos convincentes.",
    [
      "Aplicar cosméticos, perucas e adereços para parecer outra pessoa.",
      "Imitar cicatrizes, idade aparente e características superficiais.",
    ],
  ),
  t(
    "forgery-kit",
    "Kit de falsificação",
    ["kit de falsificação", "falsificação"],
    "kit",
    "Destreza",
    "Imitar documentos, selos e caligrafia.",
    [
      "Forjar cartas, licenças e documentos oficiais.",
      "Duplicar assinaturas e carimbos.",
    ],
  ),
  t(
    "herbalism-kit",
    "Kit de herbalismo",
    ["kit de herbalismo", "herbalismo"],
    "kit",
    "Inteligência",
    "Identificar plantas e preparar remédios e antídotos.",
    [
      "Identificar plantas e fungos.",
      "Preparar antídotos e remédios mundanos.",
    ],
    ["Antídoto", "Poção de cura (com receita/mesa)", "Remédios herbais"],
  ),
  t(
    "navigators-tools",
    "Ferramentas de navegador",
    ["ferramentas de navegador", "navegador"],
    "kit",
    "Inteligência",
    "Orientar-se por cartas, astros e instrumentos.",
    [
      "Determinar direção e posição aproximada.",
      "Traçar rotas marítimas ou terrestres longas.",
    ],
  ),
  t(
    "poisoners-kit",
    "Kit de envenenador",
    ["kit de envenenador", "envenenador", "veneno"],
    "kit",
    "Inteligência",
    "Preparar e aplicar venenos com segurança relativa.",
    [
      "Colher e preparar venenos.",
      "Aplicar veneno em armas ou comida sem se envenenar (teste).",
    ],
  ),
  t(
    "thieves-tools",
    "Ferramentas de ladrão",
    ["ferramentas de ladrão", "ferramentas de ladrao", "ladrão"],
    "kit",
    "Destreza",
    "Abrir fechaduras e desarmar armadilhas mecânicas.",
    [
      "Abrir fechaduras.",
      "Desarmar armadilhas mecânicas.",
      "Avaliar a qualidade de fechaduras e mecanismos.",
    ],
  ),
  t(
    "gaming-set",
    "Kit de jogos",
    ["kit de jogos", "jogo", "dados", "cartas", "tabuleiro"],
    "gaming",
    "Sabedoria",
    "Jogar e trapacear (ou detectar trapaça) em jogos de azar e estratégia.",
    [
      "Participar de jogos de dados, cartas ou tabuleiro com competência.",
      "Detectar trapaça ou influenciar o resultado (com risco).",
    ],
  ),
  t(
    "musical-instrument",
    "Instrumento musical",
    ["instrumento musical", "instrumento", "alaúde", "flauta", "tambor", "lira"],
    "instrument",
    "Carisma",
    "Tocar música para entreter, distrair ou criar atmosfera.",
    [
      "Entreter uma plateia.",
      "Criar distração ou sinal sonoro combinado.",
    ],
  ),
  t(
    "vehicles-land",
    "Veículos (terrestres)",
    ["veículos (terrestres)", "veículos terrestres", "carroça", "montaria de tração"],
    "vehicle",
    "Força ou Sabedoria",
    "Conduzir carroças, carroções e veículos terrestres.",
    ["Dirigir e manobrar veículos terrestres.", "Avaliar estado de arreios e rodas."],
  ),
  t(
    "vehicles-water",
    "Veículos (aquáticos)",
    ["veículos (aquáticos)", "veículos aquaticos", "barco", "navio"],
    "vehicle",
    "Força ou Sabedoria",
    "Operar barcos e navios.",
    ["Manobrar embarcações.", "Avaliar condições de navegação e casco."],
  ),
];

function normalize(s: string): string {
  return s
    .toLocaleLowerCase("pt-BR")
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Resolve uma string livre de proficiência para a definição XGtE, se houver. */
export function resolveTool(label: string): ToolDefinition | undefined {
  const n = normalize(label);
  if (!n) return undefined;

  // Match direto por nome/alias
  for (const tool of TOOLS) {
    if (normalize(tool.name) === n) return tool;
    if (tool.aliases.some((a) => normalize(a) === n)) return tool;
  }

  // Contém alias significativo
  let best: ToolDefinition | undefined;
  let bestLen = 0;
  for (const tool of TOOLS) {
    for (const a of [tool.name, ...tool.aliases]) {
      const an = normalize(a);
      if (an.length < 4) continue;
      if (n.includes(an) || an.includes(n)) {
        if (an.length > bestLen) {
          best = tool;
          bestLen = an.length;
        }
      }
    }
  }
  return best;
}

export function getTool(id: string): ToolDefinition | undefined {
  return TOOLS.find((t) => t.id === id);
}

export function formatToolTooltip(tool: ToolDefinition): string {
  const parts = [
    `${tool.name} (${tool.ability})`,
    tool.summary,
    tool.utilize.length ? `Usos: ${tool.utilize.join(" · ")}` : "",
    tool.craft?.length ? `Criar: ${tool.craft.join(", ")}` : "",
  ];
  return parts.filter(Boolean).join("\n");
}
