import type { RaceDefinition, SubraceDefinition } from "@/config/types";
import { MOTM_RACES } from "@/config/races/motm";

export const PHB_RACES: RaceDefinition[] = [
  {
    id: "dwarf",
    name: "Anão",
    source: "phb",
    abilityScoreModel: "fixed",
    size: "medium",
    speed: 25,
    abilityBonuses: { constitution: 2 },
    languages: ["Comum", "Anão"],
    darkvision: 60,
    traits: [
      {
        id: "darkvision",
        name: "Visão no Escuro",
        description:
          "Você enxerga na penumbra a até 18 metros como se fosse luz plena, e no escuro como se fosse penumbra. Você não distingue cores no escuro, apenas tons de cinza.",
      },
      {
        id: "dwarven-resilience",
        name: "Resiliência Anã",
        description:
          "Você tem vantagem em salvaguardas contra veneno e resistência a dano de veneno.",
      },
      {
        id: "dwarven-combat-training",
        name: "Treinamento de Combate Anão",
        description:
          "Você tem proficiência com machados de batalha, machadinhas, martelos leves e martelos de guerra.",
      },
      {
        id: "tool-proficiency",
        name: "Proficiência com Ferramentas",
        description:
          "Você ganha proficiência com as ferramentas de artesão à sua escolha: ferramentas de ferreiro, suprimentos de cervejeiro ou ferramentas de pedreiro.",
      },
      {
        id: "stonecunning",
        name: "Conhecimento da Pedra",
        description:
          "Sempre que fizer um teste de Inteligência (História) relacionado à origem de trabalhos em pedra, você é considerado proficiente e adiciona o dobro do bônus de proficiência.",
      },
    ],
    subraces: [
      {
        id: "hill",
        name: "Anão da Colina",
        abilityBonuses: { wisdom: 1 },
        traits: [
          {
            id: "dwarven-toughness",
            name: "Resistência Anã",
            description:
              "Seu máximo de pontos de vida aumenta em 1, e aumenta em 1 novamente sempre que você sobe de nível.",
          },
        ],
      },
      {
        id: "mountain",
        name: "Anão da Montanha",
        abilityBonuses: { strength: 2 },
        traits: [
          {
            id: "dwarven-armor-training",
            name: "Treinamento com Armadura Anã",
            description: "Você tem proficiência com armaduras leves e médias.",
          },
        ],
      },
    ],
  },
  {
    id: "elf",
    name: "Elfo",
    source: "phb",
    abilityScoreModel: "fixed",
    size: "medium",
    speed: 30,
    abilityBonuses: { dexterity: 2 },
    languages: ["Comum", "Élfico"],
    darkvision: 60,
    skillProficiencies: ["perception"],
    traits: [
      {
        id: "darkvision",
        name: "Visão no Escuro",
        description:
          "Você enxerga na penumbra a até 18 metros como se fosse luz plena, e no escuro como se fosse penumbra. Você não distingue cores no escuro, apenas tons de cinza.",
      },
      {
        id: "keen-senses",
        name: "Sentidos Aguçados",
        description: "Você tem proficiência na perícia Percepção.",
      },
      {
        id: "fey-ancestry",
        name: "Ancestralidade Feérica",
        description:
          "Você tem vantagem em salvaguardas contra ser enfeitiçado e magia não pode colocá-lo para dormir.",
      },
      {
        id: "trance",
        name: "Transe",
        description:
          "Elfos não precisam dormir. Em vez disso, meditam profundamente por 4 horas por dia (o transe). Após descansar dessa forma, você ganha o mesmo benefício que um humano após 8 horas de sono.",
      },
    ],
    subraces: [
      {
        id: "high",
        name: "Alto Elfo",
        abilityBonuses: { intelligence: 1 },
        extraLanguages: ["Um idioma à escolha"],
        traits: [
          {
            id: "elf-weapon-training",
            name: "Treinamento com Armas Élficas",
            description:
              "Você tem proficiência com espadas longas, espadas curtas, arcos curtos e arcos longos.",
          },
          {
            id: "cantrip",
            name: "Truque",
            description:
              "Você conhece um truque à sua escolha da lista de magias de mago. Inteligência é sua habilidade de conjuração para ele.",
          },
        ],
        innateSpellPicks: [
          {
            id: "high-elf-wizard-cantrip",
            count: 1,
            fromClassList: "wizard",
            onlyLevel: 0,
            note: "Truque de Alto Elfo (lista de mago)",
          },
        ],
      },
      {
        id: "wood",
        name: "Elfo da Floresta",
        abilityBonuses: { wisdom: 1 },
        speedOverride: 35,
        traits: [
          {
            id: "elf-weapon-training",
            name: "Treinamento com Armas Élficas",
            description:
              "Você tem proficiência com espadas longas, espadas curtas, arcos curtos e arcos longos.",
          },
          {
            id: "fleet-of-foot",
            name: "Pés Ligeiros",
            description: "Seu deslocamento base de caminhada aumenta para 10,5 metros.",
          },
          {
            id: "mask-of-the-wild",
            name: "Máscara do Selvagem",
            description:
              "Você pode tentar se esconder mesmo quando estiver apenas levemente obscurecido por folhagem, chuva forte, neve caindo, névoa ou outros fenômenos naturais.",
          },
        ],
      },
      {
        id: "drow",
        name: "Elfo Negro (Drow)",
        abilityBonuses: { charisma: 1 },
        innateSpells: [
          { spellId: "dancing-lights", minCharacterLevel: 1 },
          {
            spellId: "faerie-fire",
            minCharacterLevel: 3,
            note: "Uma vez por descanso longo",
          },
          {
            spellId: "darkness",
            minCharacterLevel: 5,
            note: "Uma vez por descanso longo",
          },
        ],
        traits: [
          {
            id: "superior-darkvision",
            name: "Visão no Escuro Superior",
            description: "Seu alcance de visão no escuro aumenta para 36 metros.",
          },
          {
            id: "sunlight-sensitivity",
            name: "Sensibilidade à Luz Solar",
            description:
              "Você tem desvantagem em jogadas de ataque e testes de Sabedoria (Percepção) baseados em visão quando você, o alvo do ataque ou o que está tentando perceber está sob luz solar direta.",
          },
          {
            id: "drow-magic",
            name: "Magia Drow",
            description:
              "Você conhece o truque luzes dançantes. No 3º nível, pode conjurar fogo das fadas uma vez por descanso longo. No 5º nível, pode conjurar escuridão uma vez por descanso longo. Carisma é sua habilidade de conjuração.",
          },
          {
            id: "drow-weapon-training",
            name: "Treinamento com Armas Drow",
            description:
              "Você tem proficiência com rapieiras, espadas curtas e bestas de mão.",
          },
        ],
      },
    ],
  },
  {
    id: "halfling",
    name: "Halfling",
    source: "phb",
    abilityScoreModel: "fixed",
    size: "small",
    speed: 25,
    abilityBonuses: { dexterity: 2 },
    languages: ["Comum", "Halfling"],
    traits: [
      {
        id: "lucky",
        name: "Sortudo",
        description:
          "Quando você obtém 1 em uma jogada de ataque, teste de habilidade ou salvaguarda, pode rerrolar o d20 e deve usar o novo resultado.",
      },
      {
        id: "brave",
        name: "Corajoso",
        description: "Você tem vantagem em salvaguardas contra ficar amedrontado.",
      },
      {
        id: "halfling-nimbleness",
        name: "Agilidade Halfling",
        description:
          "Você pode se mover através do espaço de qualquer criatura que seja de um tamanho maior que o seu.",
      },
    ],
    subraces: [
      {
        id: "lightfoot",
        name: "Pés Leves",
        abilityBonuses: { charisma: 1 },
        traits: [
          {
            id: "naturally-stealthy",
            name: "Naturalmente Furtivo",
            description:
              "Você pode tentar se esconder mesmo quando estiver apenas obscurecido por uma criatura que seja pelo menos um tamanho maior que você.",
          },
        ],
      },
      {
        id: "stout",
        name: "Robusto",
        abilityBonuses: { constitution: 1 },
        traits: [
          {
            id: "stout-resilience",
            name: "Resiliência Robusta",
            description:
              "Você tem vantagem em salvaguardas contra veneno e resistência a dano de veneno.",
          },
        ],
      },
    ],
  },
  {
    id: "human",
    name: "Humano",
    source: "phb",
    abilityScoreModel: "fixed",
    size: "medium",
    speed: 30,
    abilityBonuses: {
      strength: 1,
      dexterity: 1,
      constitution: 1,
      intelligence: 1,
      wisdom: 1,
      charisma: 1,
    },
    languages: ["Comum", "Um idioma à escolha"],
    traits: [
      {
        id: "human-versatility",
        name: "Versatilidade Humana",
        description:
          "Humanos são o povo mais adaptável e ambicioso entre as raças comuns. Seu aumento de +1 em todos os atributos reflete essa versatilidade excepcional.",
      },
    ],
    subraces: [],
  },
  {
    id: "dragonborn",
    name: "Draconato",
    source: "phb",
    abilityScoreModel: "fixed",
    size: "medium",
    speed: 30,
    abilityBonuses: { strength: 2, charisma: 1 },
    languages: ["Comum", "Dracônico"],
    traits: [
      {
        id: "draconic-ancestry",
        name: "Ancestralidade Dracônica",
        description:
          "Você tem ancestralidade dracônica. Escolha um tipo de dragão (preto/ácido, azul/relâmpago, latão/fogo, bronze/relâmpago, cobre/ácido, ouro/fogo, verde/veneno, vermelho/fogo, prata/frio, branco/frio). Isso determina o tipo de dano da sua arma de sopro e resistência.",
      },
      {
        id: "breath-weapon",
        name: "Arma de Sopro",
        description:
          "Você pode usar sua ação para exalar energia destrutiva. O tamanho, forma e tipo de dano dependem da sua ancestralidade. Cada criatura na área faz uma salvaguarda (CD 8 + modificador de Constituição + bônus de proficiência). Em falha, sofre 2d6 de dano (aumenta nos níveis 6, 11 e 16). Pode usar novamente após um descanso curto ou longo.",
      },
      {
        id: "damage-resistance",
        name: "Resistência a Dano",
        description:
          "Você tem resistência ao tipo de dano associado à sua ancestralidade dracônica.",
      },
    ],
    subraces: [],
  },
  {
    id: "gnome",
    name: "Gnomo",
    source: "phb",
    abilityScoreModel: "fixed",
    size: "small",
    speed: 25,
    abilityBonuses: { intelligence: 2 },
    languages: ["Comum", "Gnômico"],
    darkvision: 60,
    traits: [
      {
        id: "darkvision",
        name: "Visão no Escuro",
        description:
          "Você enxerga na penumbra a até 18 metros como se fosse luz plena, e no escuro como se fosse penumbra. Você não distingue cores no escuro, apenas tons de cinza.",
      },
      {
        id: "gnome-cunning",
        name: "Astúcia Gnômica",
        description:
          "Você tem vantagem em todas as salvaguardas de Inteligência, Sabedoria e Carisma contra magia.",
      },
    ],
    subraces: [
      {
        id: "forest",
        name: "Gnomo da Floresta",
        abilityBonuses: { dexterity: 1 },
        innateSpells: [{ spellId: "minor-illusion", minCharacterLevel: 1 }],
        traits: [
          {
            id: "natural-illusionist",
            name: "Ilusionista Natural",
            description:
              "Você conhece o truque ilusão menor. Inteligência é sua habilidade de conjuração para ele.",
          },
          {
            id: "speak-with-small-beasts",
            name: "Falar com Bestas Pequenas",
            description:
              "Através de sons e gestos, você pode comunicar ideias simples a Bestas Miúdas ou Pequenas. Elas podem entender você e, se forem amigáveis, podem ajudá-lo.",
          },
        ],
      },
      {
        id: "rock",
        name: "Gnomo da Rocha",
        abilityBonuses: { constitution: 1 },
        traits: [
          {
            id: "artificers-lore",
            name: "Conhecimento do Artífice",
            description:
              "Sempre que fizer um teste de Inteligência (História) relacionado a itens mágicos, objetos alquímicos ou dispositivos tecnológicos, você adiciona o dobro do seu bônus de proficiência.",
          },
          {
            id: "tinker",
            name: "Funileiro",
            description:
              "Você tem proficiência com ferramentas de artesão (ferramentas de funileiro). Com elas e 10 po em materiais, pode construir um dispositivo minúsculo (cronômetro, isqueiro, caixa de música) que funciona por 24 horas.",
          },
        ],
      },
    ],
  },
  {
    id: "half-elf",
    name: "Meio-Elfo",
    source: "phb",
    abilityScoreModel: "fixed",
    size: "medium",
    speed: 30,
    abilityBonuses: { charisma: 2 },
    languages: ["Comum", "Élfico", "Um idioma à escolha"],
    darkvision: 60,
    traits: [
      {
        id: "ability-score-increase",
        name: "Aumento de Atributo Extra",
        description:
          "Além de +2 em Carisma, dois outros atributos à sua escolha aumentam em 1.",
      },
      {
        id: "darkvision",
        name: "Visão no Escuro",
        description:
          "Você enxerga na penumbra a até 18 metros como se fosse luz plena, e no escuro como se fosse penumbra. Você não distingue cores no escuro, apenas tons de cinza.",
      },
      {
        id: "fey-ancestry",
        name: "Ancestralidade Feérica",
        description:
          "Você tem vantagem em salvaguardas contra ser enfeitiçado e magia não pode colocá-lo para dormir.",
      },
      {
        id: "skill-versatility",
        name: "Versatilidade de Perícias",
        description: "Você ganha proficiência em duas perícias à sua escolha.",
      },
    ],
    subraces: [],
  },
  {
    id: "half-orc",
    name: "Meio-Orc",
    source: "phb",
    abilityScoreModel: "fixed",
    size: "medium",
    speed: 30,
    abilityBonuses: { strength: 2, constitution: 1 },
    languages: ["Comum", "Orc"],
    darkvision: 60,
    skillProficiencies: ["intimidation"],
    traits: [
      {
        id: "darkvision",
        name: "Visão no Escuro",
        description:
          "Você enxerga na penumbra a até 18 metros como se fosse luz plena, e no escuro como se fosse penumbra. Você não distingue cores no escuro, apenas tons de cinza.",
      },
      {
        id: "menacing",
        name: "Ameaçador",
        description: "Você ganha proficiência na perícia Intimidação.",
      },
      {
        id: "relentless-endurance",
        name: "Resistência Implacável",
        description:
          "Quando você é reduzido a 0 pontos de vida mas não morto imediatamente, pode cair a 1 ponto de vida em vez disso. Não pode usar essa característica novamente até terminar um descanso longo.",
      },
      {
        id: "savage-attacks",
        name: "Ataques Selvagens",
        description:
          "Quando obtém um acerto crítico com um ataque corpo a corpo com arma, pode rolar um dos dados de dano da arma uma vez adicional e adicioná-lo ao dano extra do crítico.",
      },
    ],
    subraces: [],
  },
  {
    id: "tiefling",
    name: "Tiefling",
    source: "phb",
    abilityScoreModel: "fixed",
    size: "medium",
    speed: 30,
    abilityBonuses: { intelligence: 1, charisma: 2 },
    languages: ["Comum", "Infernal"],
    darkvision: 60,
    traits: [
      {
        id: "darkvision",
        name: "Visão no Escuro",
        description:
          "Você enxerga na penumbra a até 18 metros como se fosse luz plena, e no escuro como se fosse penumbra. Você não distingue cores no escuro, apenas tons de cinza.",
      },
      {
        id: "hellish-resistance",
        name: "Resistência Infernal",
        description: "Você tem resistência a dano de fogo.",
      },
      {
        id: "infernal-legacy",
        name: "Legado Infernal",
        description:
          "Escolha uma linhagem diaboica. Você ganha magias de origem conforme o nível do personagem (não consomem vagas de classe). Carisma é sua habilidade de conjuração.",
      },
    ],
    choices: [
      {
        id: "bloodline",
        name: "Linhagem infernal",
        options: [
          {
            id: "asmodeus",
            name: "Asmodeus",
            description: "Taumaturgia; 3º: repreensão infernal (2º); 5º: escuridão.",
            innateSpells: [
              { spellId: "thaumaturgy", minCharacterLevel: 1 },
              {
                spellId: "hellish-rebuke",
                minCharacterLevel: 3,
                note: "Uma vez por descanso longo, como magia de 2º círculo",
              },
              {
                spellId: "darkness",
                minCharacterLevel: 5,
                note: "Uma vez por descanso longo",
              },
            ],
          },
          {
            id: "levistus",
            name: "Levistus",
            description: "Raio de gelo; 3º: armadura de Agathys; 5º: escuridão.",
            innateSpells: [
              { spellId: "ray-of-frost", minCharacterLevel: 1 },
              {
                spellId: "armor-of-agathys",
                minCharacterLevel: 3,
                note: "Uma vez por descanso longo",
              },
              {
                spellId: "darkness",
                minCharacterLevel: 5,
                note: "Uma vez por descanso longo",
              },
            ],
          },
          {
            id: "zariel",
            name: "Zariel",
            description: "Taumaturgia; 3º: mãos flamejantes; 5º: escuridão.",
            innateSpells: [
              { spellId: "thaumaturgy", minCharacterLevel: 1 },
              {
                spellId: "burning-hands",
                minCharacterLevel: 3,
                note: "Uma vez por descanso longo",
              },
              {
                spellId: "darkness",
                minCharacterLevel: 5,
                note: "Uma vez por descanso longo",
              },
            ],
          },
          {
            id: "mephistopheles",
            name: "Mefistófeles",
            description: "Mãos mágicas; 3º: mãos flamejantes; 5º: escuridão.",
            innateSpells: [
              { spellId: "mage-hand", minCharacterLevel: 1 },
              {
                spellId: "burning-hands",
                minCharacterLevel: 3,
                note: "Uma vez por descanso longo",
              },
              {
                spellId: "darkness",
                minCharacterLevel: 5,
                note: "Uma vez por descanso longo",
              },
            ],
          },
          {
            id: "dispater",
            name: "Dispater",
            description: "Taumaturgia; 3º: disfarçar-se; 5º: detectar pensamentos (se disponível) / escuridão.",
            innateSpells: [
              { spellId: "thaumaturgy", minCharacterLevel: 1 },
              {
                spellId: "disguise-self",
                minCharacterLevel: 3,
                note: "Uma vez por descanso longo",
              },
              {
                spellId: "darkness",
                minCharacterLevel: 5,
                note: "Uma vez por descanso longo",
              },
            ],
          },
          {
            id: "fierna",
            name: "Fierna",
            description: "Amigos menores / enfeitiçar pessoa legado; 3º: enfeitiçar pessoa; 5º: escuridão.",
            innateSpells: [
              { spellId: "thaumaturgy", minCharacterLevel: 1 },
              {
                spellId: "charm-person",
                minCharacterLevel: 3,
                note: "Uma vez por descanso longo",
              },
              {
                spellId: "darkness",
                minCharacterLevel: 5,
                note: "Uma vez por descanso longo",
              },
            ],
          },
        ],
      },
    ],
    subraces: [],
  },
  {
    id: "custom-lineage",
    name: "Linhagem Customizada",
    source: "tcoe",
    abilityScoreModel: "motm-floating",
    size: "medium",
    sizeOptions: ["small", "medium"],
    speed: 30,
    abilityBonuses: {},
    languages: ["Comum"],
    darkvision: 60,
    creatureType: "humanoid",
    traits: [
      {
        id: "custom-lineage-trait",
        name: "Origem Flexível",
        description:
          "Você é humanóide Pequeno ou Médio, deslocamento 9 m, +2 em um atributo (use o seletor MotM com +2 e ignore o +1, ou use +1×3 conforme a mesa), ganha 1 talento no 1º nível, e escolhe visão no escuro 18 m ou proficiência em uma perícia. Idiomas: Comum + 1.",
      },
    ],
    choices: [
      {
        id: "lineage-sense",
        name: "Sentidos / perícia",
        options: [
          {
            id: "darkvision",
            name: "Visão no escuro (18 m)",
            description: "Você enxerga na penumbra a 18 m como luz plena.",
          },
          {
            id: "skill",
            name: "Proficiência em uma perícia",
            description: "Escolha uma perícia na ficha após criar o personagem.",
          },
        ],
      },
    ],
    subraces: [],
  },
];

export const RACES: RaceDefinition[] = [...PHB_RACES, ...MOTM_RACES];

export function getRace(id: string): RaceDefinition | undefined {
  return RACES.find((r) => r.id === id);
}

export function getSubrace(
  raceId: string,
  subraceId: string,
): SubraceDefinition | undefined {
  return getRace(raceId)?.subraces.find((s) => s.id === subraceId);
}
