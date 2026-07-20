export interface RuleArticle {
  slug: string;
  title: string;
  summary: string;
  sections: { heading: string; body: string }[];
}

export const RULE_ARTICLES: RuleArticle[] = [
  {
    slug: "criacao-de-personagem",
    title: "Criação de personagem",
    summary: "Os seis passos do Capítulo 1 para montar um aventureiro de 1º nível.",
    sections: [
      {
        heading: "Visão geral",
        body: "Escolha raça, classe, valores de atributo, antecedente/personalidade, equipamento e una o grupo. O nível 1 usa o máximo do dado de vida + modificador de Constituição.",
      },
      {
        heading: "Atributos",
        body: "Use array padrão (15, 14, 13, 12, 10, 8), compra de pontos (27 pontos, mínimo 8 e máximo 15 antes dos bônus raciais) ou 4d6 descartando o menor. O modificador é (valor − 10) ÷ 2, arredondado para baixo.",
      },
      {
        heading: "Bônus de proficiência",
        body: "No 1º ao 4º nível é +2; sobe para +3 (5–8), +4 (9–12), +5 (13–16) e +6 (17–20). Aplica-se a ataques, perícias, ferramentas e salvaguardas em que você é proficiente, e à CD de magias.",
      },
    ],
  },
  {
    slug: "combate",
    title: "Combate",
    summary: "Iniciativa, turnos, ataques, CA e salvaguardas de morte.",
    sections: [
      {
        heading: "Rodada e turno",
        body: "Cada rodada dura cerca de 6 segundos. Na sua vez você pode se mover até seu deslocamento e realizar uma ação (Atacar, Conjurar, Disparar, Usar objeto, Esquivar, Ajudar, Esconder, Preparar, Procurar, etc.).",
      },
      {
        heading: "Ataques",
        body: "Role d20 + modificador de atributo + bônus de proficiência (se proficiente). Compare com a CA do alvo. Crítico no 20 natural dobra os dados de dano (não os modificadores).",
      },
      {
        heading: "Classe de Armadura",
        body: "Armaduras leves somam Destreza integral; médias somam até +2 de Des; pesadas não somam Des. Escudo concede +2. Bárbaro e Monge têm Defesa sem Armadura própria.",
      },
      {
        heading: "Morte",
        body: "A 0 PV você fica inconsciente e faz salvaguardas de morte (d20): 10+ sucesso, menos de 10 falha. Três sucessos estabilizam; três falhas matam. 20 natural recupera 1 PV; dano enquanto inconsciente causa falhas.",
      },
    ],
  },
  {
    slug: "conjuracao",
    title: "Conjuração",
    summary: "Espaços de magia, preparação, rituais, concentração e CD.",
    sections: [
      {
        heading: "CD e ataque mágico",
        body: "CD = 8 + bônus de proficiência + modificador de atributo de conjuração. Ataque mágico = PB + o mesmo modificador.",
      },
      {
        heading: "Preparadas vs conhecidas",
        body: "Clérigo, Druida, Mago e Paladino preparam magias diariamente. Bardo, Feiticeiro, Bruxo e Patrulheiro conhecem uma lista fixa e trocam conforme as regras de nível.",
      },
      {
        heading: "Concentração",
        body: "Só uma magia de concentração por vez. Dano exige teste de Constituição CD 10 ou metade do dano (o que for maior) para manter a magia.",
      },
      {
        heading: "Magia de pacto",
        body: "Bruxos recuperam espaços em descanso curto. O nível do espaço sobe com a classe; o número de espaços também. Arcanos místicos são magias de alto nível separadas dos espaços de pacto.",
      },
    ],
  },
  {
    slug: "descanso-e-pv",
    title: "Descanso e pontos de vida",
    summary: "Descanso curto, longo, dados de vida e PV temporários.",
    sections: [
      {
        heading: "Descanso curto",
        body: "Pelo menos 1 hora. Você pode gastar dados de vida para recuperar PV (role o dado + Con por dado).",
      },
      {
        heading: "Descanso longo",
        body: "Pelo menos 8 horas. Recupera todos os PV, metade dos dados de vida (mínimo 1) e a maioria dos recursos de classe e espaços de magia (exceto regras especiais como pacto).",
      },
      {
        heading: "PV temporários",
        body: "Não se acumulam: novo valor substitui o anterior se for maior, conforme a regra usada na mesa. Não são recuperados em descanso.",
      },
    ],
  },
  {
    slug: "pericias-e-testes",
    title: "Perícias e testes de atributo",
    summary: "Quando rolar, vantagem/desvantagem e perícias.",
    sections: [
      {
        heading: "Teste de atributo",
        body: "d20 + modificador do atributo (+ PB se proficiente na perícia ou ferramenta relevante). O mestre define a CD.",
      },
      {
        heading: "Vantagem e desvantagem",
        body: "Role 2d20 e use o maior (vantagem) ou o menor (desvantagem). Eles não se acumulam; um de cada se cancelam.",
      },
      {
        heading: "Percepção passiva",
        body: "10 + bônus de Percepção (inclui proficiência/expertise). Usada para notar ameaças sem declarar um teste.",
      },
    ],
  },
  {
    slug: "multiclasse-e-talentos",
    title: "Multiclasse e talentos",
    summary: "Pré-requisitos, espaços de magia combinados e ASI.",
    sections: [
      {
        heading: "Pré-requisitos",
        body: "Para multiclasse, os atributos primários das classes envolvidas precisam atender os mínimos do Capítulo 6 (geralmente 13).",
      },
      {
        heading: "Espaços de magia",
        body: "Some níveis de conjurador completo + metade dos meios-conjuradores + um terço dos terços-conjuradores (arredondando para baixo) e use a tabela de multiclasse. Magia de pacto do Bruxo permanece separada.",
      },
      {
        heading: "ASI e talentos",
        body: "Nos níveis de classe 4, 8, 12, 16 e 19 (e 6/14 para algumas classes especiais), você pode subir atributos (+2 ou +1/+1) ou pegar um talento, se a mesa permitir talentos.",
      },
    ],
  },
];

export function getRuleArticle(slug: string): RuleArticle | undefined {
  return RULE_ARTICLES.find((a) => a.slug === slug);
}
