import type { RaceDefinition } from "@/config/types";

const DARKVISION_60 =
  "Você enxerga na penumbra a até 18 metros como se fosse luz plena, e no escuro como se fosse penumbra. Você não distingue cores no escuro, apenas tons de cinza.";

const DARKVISION_120 =
  "Você enxerga na penumbra a até 36 metros como se fosse luz plena, e no escuro como se fosse penumbra. Você não distingue cores no escuro, apenas tons de cinza.";

export const MOTM_RACES: RaceDefinition[] = [
  {
    id: "aarakocra",
    name: "Aarakocra",
    source: "motm",
    size: "medium",
    speed: 30,
    speedDetail: { walk: 30, fly: 30 },
    abilityScoreModel: "motm-floating",
    abilityBonuses: {},
    languages: ["Comum"],
    creatureType: "humanoid",
    traits: [
      {
        id: "talons",
        name: "Garras",
        description:
          "Você tem garras para golpes desarmados. Ao acertar, causa dano cortante igual a 1d6 + seu modificador de Força, em vez do dano contundente normal.",
      },
      {
        id: "wind-caller",
        name: "Manipulador de Vento",
        description:
          "A partir do 3º nível, você pode conjurar lufada de vento sem componente material uma vez por descanso longo (ou com espaços de magia de 2º círculo+). Inteligência, Sabedoria ou Carisma é seu atributo de conjuração (escolha ao selecionar a raça).",
      },
      {
        id: "flight",
        name: "Voo",
        description:
          "Você tem deslocamento de voo igual ao seu deslocamento de caminhada. Não pode usar esse voo se estiver usando armadura média ou pesada.",
      },
    ],
    subraces: [],
  },
  {
    id: "aasimar",
    name: "Aasimar",
    source: "motm",
    size: "medium",
    sizeOptions: ["medium", "small"],
    speed: 30,
    abilityScoreModel: "motm-floating",
    abilityBonuses: {},
    languages: ["Comum"],
    darkvision: 60,
    creatureType: "humanoid",
    traits: [
      {
        id: "healing-hands",
        name: "Mãos Curativas",
        description:
          "Como ação, toque uma criatura e role um número de d4s igual ao seu bônus de proficiência; ela recupera esse total de PV. Uma vez por descanso longo.",
      },
      {
        id: "light-bearer",
        name: "Portador da Luz",
        description: "Você conhece o truque luz. Carisma é o atributo de conjuração.",
      },
      {
        id: "celestial-resistance",
        name: "Resistência Celestial",
        description: "Você tem resistência a dano necrótico e radiante.",
      },
      {
        id: "celestial-revelation",
        name: "Revelação Celestial",
        description:
          "No 3º nível, escolha uma revelação. Como ação bônus, libere energia celestial por 1 minuto (ou até encerrar com ação bônus). Uma vez por descanso longo.",
      },
      {
        id: "darkvision",
        name: "Visão no Escuro",
        description: DARKVISION_60,
      },
    ],
    choices: [
      {
        id: "revelation",
        name: "Revelação Celestial",
        minLevel: 3,
        options: [
          {
            id: "celestial-consumption",
            name: "Consumação Radiante",
            description:
              "Emite luz plena 3 m e meia-luz +3 m. No fim de cada turno, criaturas a até 3 m sofrem dano radiante igual ao seu bônus de proficiência. Uma vez por turno, ao causar dano com ataque ou magia, cause dano radiante extra igual ao bônus de proficiência.",
          },
          {
            id: "radiant-soul",
            name: "Espírito Radiante",
            description:
              "Asas espectrais: deslocamento de voo igual ao de caminhada. Uma vez por turno, ao causar dano com ataque ou magia, cause dano radiante extra igual ao bônus de proficiência.",
          },
          {
            id: "radiant-mantle",
            name: "Manto Necrótico",
            description:
              "Inimigos a até 3 m que o vejam fazem salvaguarda de Carisma (CD 8 + proficiência + Carisma) ou ficam amedrontados até o fim do seu próximo turno. Uma vez por turno, ao causar dano com ataque ou magia, cause dano necrótico extra igual ao bônus de proficiência.",
          },
        ],
      },
    ],
    subraces: [],
  },
  {
    id: "bugbear",
    name: "Bugurso",
    source: "motm",
    size: "medium",
    speed: 30,
    abilityScoreModel: "motm-floating",
    abilityBonuses: {},
    languages: ["Comum"],
    darkvision: 60,
    countsAs: ["goblinoid"],
    creatureType: "humanoid",
    skillProficiencies: ["stealth"],
    traits: [
      {
        id: "fey-ancestry",
        name: "Ancestralidade Feérica",
        description:
          "Você tem vantagem em salvaguardas para evitar ou encerrar a condição enfeitiçado em si mesmo.",
      },
      {
        id: "surprise-attack",
        name: "Ataque Surpresa",
        description:
          "Se acertar uma criatura com um ataque e ela ainda não tiver agido neste combate, ela sofre 2d6 de dano extra.",
      },
      {
        id: "long-limbed",
        name: "Membros Longos",
        description:
          "Ao fazer um ataque corpo a corpo no seu turno, seu alcance é 1,5 m maior que o normal.",
      },
      {
        id: "powerful-build",
        name: "Porte Poderoso",
        description:
          "Você conta como uma categoria de tamanho maior para capacidade de carga e peso que pode empurrar, arrastar ou levantar.",
      },
      {
        id: "sneaky",
        name: "Sorrateiro",
        description:
          "Proficiência em Furtividade. Sem se espremer, você pode se mover e parar em um espaço grande o bastante para uma criatura Pequena.",
      },
      {
        id: "darkvision",
        name: "Visão no Escuro",
        description: DARKVISION_60,
      },
    ],
    subraces: [],
  },
  {
    id: "centaur",
    name: "Centauro",
    source: "motm",
    size: "medium",
    speed: 40,
    abilityScoreModel: "motm-floating",
    abilityBonuses: {},
    languages: ["Comum"],
    creatureType: "fey",
    traits: [
      {
        id: "fey",
        name: "Tipo Feérico",
        description: "Você é um feérico.",
      },
      {
        id: "charge",
        name: "Carga",
        description:
          "Se se mover ao menos 9 m em linha reta até um alvo e o acertar com um ataque corpo a corpo com arma no mesmo turno, pode imediatamente (ação bônus) atacar com os cascos.",
      },
      {
        id: "hooves",
        name: "Cascos",
        description:
          "Golpes desarmados com cascos causam dano contundente igual a 1d6 + modificador de Força.",
      },
      {
        id: "equine-build",
        name: "Porte Equino",
        description:
          "Conta como uma categoria maior para carga. Escaladas que exijam mãos e pés custam 1,2 m extra por 0,3 m (em vez de 0,3 m extra).",
      },
      {
        id: "nature-affinity",
        name: "Afinidade com a Natureza",
        description:
          "Proficiência em uma perícia à escolha: Lidar com Animais, Medicina, Natureza ou Sobrevivência.",
      },
    ],
    subraces: [],
  },
  {
    id: "duergar",
    name: "Duergar",
    source: "motm",
    size: "medium",
    speed: 30,
    abilityScoreModel: "motm-floating",
    abilityBonuses: {},
    languages: ["Comum"],
    darkvision: 120,
    countsAs: ["dwarf"],
    creatureType: "humanoid",
    traits: [
      {
        id: "psionic-fortitude",
        name: "Fortitude Psiônica",
        description:
          "Vantagem em salvaguardas para evitar ou encerrar as condições enfeitiçado ou atordoado em si mesmo.",
      },
      {
        id: "duergar-magic",
        name: "Magia dos Duergar",
        description:
          "No 3º nível, conjure aumentar/reduzir sem material; no 5º, invisibilidade sem material. Cada uma uma vez por descanso longo (ou com espaços adequados). Inteligência, Sabedoria ou Carisma é o atributo de conjuração.",
      },
      {
        id: "poison-resistance",
        name: "Resistência a Toxinas",
        description:
          "Vantagem em salvaguardas contra a condição envenenado e resistência a dano de veneno.",
      },
      {
        id: "darkvision",
        name: "Visão no Escuro",
        description: DARKVISION_120,
      },
    ],
    subraces: [],
  },
  {
    id: "changeling",
    name: "Duplicante",
    source: "motm",
    size: "medium",
    sizeOptions: ["medium", "small"],
    speed: 30,
    abilityScoreModel: "motm-floating",
    abilityBonuses: {},
    languages: ["Comum"],
    creatureType: "fey",
    traits: [
      {
        id: "changeling-instincts",
        name: "Instinto Duplicante",
        description:
          "Proficiência em duas perícias à escolha: Atuação, Enganação, Intimidação, Intuição ou Persuasão.",
      },
      {
        id: "shapechanger",
        name: "Metamorfo",
        description:
          "Como ação, altere aparência e voz (incluindo altura/peso e tamanho Médio ou Pequeno). Não copia indivíduos nunca vistos; mesma disposição de membros; equipamento não muda. Permanece até voltar à forma original (ação) ou morrer.",
      },
    ],
    subraces: [],
  },
  {
    id: "eladrin",
    name: "Eladrin",
    source: "motm",
    size: "medium",
    speed: 30,
    abilityScoreModel: "motm-floating",
    abilityBonuses: {},
    languages: ["Comum"],
    darkvision: 60,
    countsAs: ["elf"],
    creatureType: "humanoid",
    skillProficiencies: ["perception"],
    traits: [
      {
        id: "fey-ancestry",
        name: "Ancestralidade Feérica",
        description:
          "Vantagem em salvaguardas para evitar ou encerrar a condição enfeitiçado em si mesmo.",
      },
      {
        id: "fey-step",
        name: "Passo Feérico",
        description:
          "Ação bônus: teleporte até 9 m para um espaço desocupado que possa ver. Usos iguais ao bônus de proficiência por descanso longo. No 3º nível, ganha efeito extra conforme a estação.",
      },
      {
        id: "keen-senses",
        name: "Sentidos Aguçados",
        description: "Proficiência na perícia Percepção.",
      },
      {
        id: "trance",
        name: "Transe",
        description:
          "Não precisa dormir; magia não o faz dormir. Descanso longo em 4 horas de transe. Ao terminar, pode mudar a estação e ganhar duas proficiências temporárias (arma ou ferramenta) até o próximo descanso longo.",
      },
      {
        id: "darkvision",
        name: "Visão no Escuro",
        description: DARKVISION_60,
      },
    ],
    choices: [
      {
        id: "season",
        name: "Estação",
        options: [
          {
            id: "autumn",
            name: "Outono",
            description:
              "Após o Passo Feérico (3º+), até duas criaturas a até 3 m fazem salvaguarda de Sabedoria ou ficam enfeitiçadas por 1 minuto (ou até você/aliados causarem dano a elas).",
          },
          {
            id: "winter",
            name: "Inverno",
            description:
              "Ao usar o Passo Feérico (3º+), uma criatura a até 1,5 m antes do teleporte faz salvaguarda de Sabedoria ou fica amedrontada até o fim do seu próximo turno.",
          },
          {
            id: "spring",
            name: "Primavera",
            description:
              "Ao usar o Passo Feérico (3º+), pode tocar uma criatura voluntária a até 1,5 m; ela teleporta no seu lugar até 9 m.",
          },
          {
            id: "summer",
            name: "Verão",
            description:
              "Após o Passo Feérico (3º+), cada criatura à escolha a até 1,5 m sofre dano ígneo igual ao seu bônus de proficiência.",
          },
        ],
      },
    ],
    subraces: [],
  },
  {
    id: "sea-elf",
    name: "Elfo Marinho",
    source: "motm",
    size: "medium",
    speed: 30,
    speedDetail: { walk: 30, swim: 30 },
    abilityScoreModel: "motm-floating",
    abilityBonuses: {},
    languages: ["Comum"],
    darkvision: 60,
    countsAs: ["elf"],
    creatureType: "humanoid",
    skillProficiencies: ["perception"],
    traits: [
      {
        id: "friend-of-the-sea",
        name: "Amigo do Mar",
        description:
          "Pode comunicar ideias simples a qualquer fera com deslocamento de natação (elas entendem você; você não as entende de volta).",
      },
      {
        id: "fey-ancestry",
        name: "Ancestralidade Feérica",
        description:
          "Vantagem em salvaguardas para evitar ou encerrar a condição enfeitiçado em si mesmo.",
      },
      {
        id: "child-of-the-sea",
        name: "Criança do Mar",
        description: "Pode respirar ar e água e tem resistência a dano gélido.",
      },
      {
        id: "keen-senses",
        name: "Sentidos Aguçados",
        description: "Proficiência na perícia Percepção.",
      },
      {
        id: "trance",
        name: "Transe",
        description:
          "Não precisa dormir; magia não o faz dormir. Descanso longo em 4 horas de transe. Ao terminar, pode ganhar duas proficiências temporárias (arma ou ferramenta) até o próximo descanso longo.",
      },
      {
        id: "darkvision",
        name: "Visão no Escuro",
        description: DARKVISION_60,
      },
    ],
    subraces: [],
  },
  {
    id: "fairy",
    name: "Fada",
    source: "motm",
    size: "small",
    speed: 30,
    speedDetail: { walk: 30, fly: 30 },
    abilityScoreModel: "motm-floating",
    abilityBonuses: {},
    languages: ["Comum"],
    creatureType: "fey",
    traits: [
      {
        id: "fairy-magic",
        name: "Magia das Fadas",
        description:
          "Conhece o truque arte druídica. No 3º nível, fogo das fadas; no 5º, aumentar/reduzir. Cada uma uma vez por descanso longo (ou com espaços adequados). Inteligência, Sabedoria ou Carisma é o atributo de conjuração.",
      },
      {
        id: "flight",
        name: "Voo",
        description:
          "Deslocamento de voo igual ao de caminhada. Não pode usar esse voo com armadura média ou pesada.",
      },
    ],
    subraces: [],
  },
  {
    id: "firbolg",
    name: "Firbolg",
    source: "motm",
    size: "medium",
    speed: 30,
    abilityScoreModel: "motm-floating",
    abilityBonuses: {},
    languages: ["Comum"],
    creatureType: "humanoid",
    traits: [
      {
        id: "speech-of-beast-and-leaf",
        name: "Fala da Fera e da Folha",
        description:
          "Comunica-se de forma limitada com feras e plantas (elas entendem você). Vantagem em testes de Carisma para influenciá-las.",
      },
      {
        id: "firbolg-magic",
        name: "Magia dos Firbolg",
        description:
          "Conjure detectar magia e disfarçar-se (pode parecer até 1 m mais baixo ou alto) cada uma uma vez por descanso longo (ou com espaços). Inteligência, Sabedoria ou Carisma é o atributo de conjuração.",
      },
      {
        id: "hidden-step",
        name: "Passo Oculto",
        description:
          "Ação bônus: invisível até o início do próximo turno, ou até atacar, causar dano ou forçar salvaguarda. Usos iguais ao bônus de proficiência por descanso longo.",
      },
      {
        id: "powerful-build",
        name: "Porte Poderoso",
        description:
          "Conta como uma categoria de tamanho maior para carga e peso empurrado/arrastado/levantado.",
      },
    ],
    subraces: [],
  },
  {
    id: "genasi-water",
    name: "Genasi da Água",
    source: "motm",
    size: "medium",
    sizeOptions: ["medium", "small"],
    speed: 30,
    speedDetail: { walk: 30, swim: 30 },
    abilityScoreModel: "motm-floating",
    abilityBonuses: {},
    languages: ["Comum"],
    darkvision: 60,
    creatureType: "humanoid",
    traits: [
      {
        id: "amphibious",
        name: "Anfíbio",
        description: "Você pode respirar ar e água.",
      },
      {
        id: "call-to-the-wave",
        name: "Chamado da Onda",
        description:
          "Conhece bolha ácida. No 3º nível, criar ou destruir água; no 5º, caminhar sobre as águas (sem material). Cada uma uma vez por descanso longo (ou com espaços). Inteligência, Sabedoria ou Carisma é o atributo de conjuração.",
      },
      {
        id: "acid-resistance",
        name: "Resistência a Ácido",
        description: "Você tem resistência a dano ácido.",
      },
      {
        id: "darkvision",
        name: "Visão no Escuro",
        description: DARKVISION_60,
      },
    ],
    subraces: [],
  },
  {
    id: "genasi-air",
    name: "Genasi do Ar",
    source: "motm",
    size: "medium",
    sizeOptions: ["medium", "small"],
    speed: 35,
    abilityScoreModel: "motm-floating",
    abilityBonuses: {},
    languages: ["Comum"],
    darkvision: 60,
    creatureType: "humanoid",
    traits: [
      {
        id: "unending-breath",
        name: "Fôlego Infinito",
        description:
          "Você pode prender a respiração indefinidamente enquanto não estiver incapacitado.",
      },
      {
        id: "lightning-resistance",
        name: "Resistência a Eletricidade",
        description: "Você tem resistência a dano elétrico.",
      },
      {
        id: "mingle-with-the-wind",
        name: "Unir-se ao Vento",
        description:
          "Conhece toque chocante. No 3º nível, queda suave (sem material); no 5º, levitação (sem material). Cada uma uma vez por descanso longo (ou com espaços). Inteligência, Sabedoria ou Carisma é o atributo de conjuração.",
      },
      {
        id: "darkvision",
        name: "Visão no Escuro",
        description: DARKVISION_60,
      },
    ],
    subraces: [],
  },
  {
    id: "genasi-fire",
    name: "Genasi do Fogo",
    source: "motm",
    size: "medium",
    sizeOptions: ["medium", "small"],
    speed: 30,
    abilityScoreModel: "motm-floating",
    abilityBonuses: {},
    languages: ["Comum"],
    darkvision: 60,
    creatureType: "humanoid",
    traits: [
      {
        id: "reach-to-the-blaze",
        name: "Abarcar a Chama",
        description:
          "Conhece criar chamas. No 3º nível, mãos flamejantes; no 5º, lâmina flamejante (sem material). Cada uma uma vez por descanso longo (ou com espaços). Inteligência, Sabedoria ou Carisma é o atributo de conjuração.",
      },
      {
        id: "fire-resistance",
        name: "Resistência ao Fogo",
        description: "Você tem resistência a dano ígneo.",
      },
      {
        id: "darkvision",
        name: "Visão no Escuro",
        description: DARKVISION_60,
      },
    ],
    subraces: [],
  },
  {
    id: "genasi-earth",
    name: "Genasi da Terra",
    source: "motm",
    size: "medium",
    sizeOptions: ["medium", "small"],
    speed: 30,
    abilityScoreModel: "motm-floating",
    abilityBonuses: {},
    languages: ["Comum"],
    darkvision: 60,
    creatureType: "humanoid",
    traits: [
      {
        id: "earth-walk",
        name: "Caminhada Telúrica",
        description:
          "Você pode se mover em terreno difícil sem custo extra ao usar deslocamento de caminhada no solo.",
      },
      {
        id: "merge-with-stone",
        name: "Fundir-se à Pedra",
        description:
          "Conhece proteção contra lâminas (também como ação bônus um número de vezes igual ao bônus de proficiência por descanso longo). No 5º nível, passo sem rastro sem material uma vez por descanso longo (ou com espaços 2º+). Inteligência, Sabedoria ou Carisma é o atributo de conjuração.",
      },
      {
        id: "darkvision",
        name: "Visão no Escuro",
        description: DARKVISION_60,
      },
    ],
    subraces: [],
  },
  {
    id: "githyanki",
    name: "Githyanki",
    source: "motm",
    size: "medium",
    speed: 30,
    abilityScoreModel: "motm-floating",
    abilityBonuses: {},
    languages: ["Comum"],
    creatureType: "humanoid",
    traits: [
      {
        id: "astral-knowledge",
        name: "Conhecimento Astral",
        description:
          "Ao terminar um descanso longo, ganha proficiência em uma perícia e em uma arma ou ferramenta à escolha até o próximo descanso longo.",
      },
      {
        id: "githyanki-psionics",
        name: "Psionismo Githyanki",
        description:
          "Conhece mãos mágicas (mão invisível com este traço). No 3º nível, salto; no 5º, passo nebuloso. Cada uma uma vez por descanso longo (ou com espaços), sem materiais. Inteligência, Sabedoria ou Carisma é o atributo de conjuração.",
      },
      {
        id: "psychic-resilience",
        name: "Resiliência Psíquica",
        description: "Você tem resistência a dano psíquico.",
      },
    ],
    subraces: [],
  },
  {
    id: "githzerai",
    name: "Githzerai",
    source: "motm",
    size: "medium",
    speed: 30,
    abilityScoreModel: "motm-floating",
    abilityBonuses: {},
    languages: ["Comum"],
    creatureType: "humanoid",
    traits: [
      {
        id: "mental-discipline",
        name: "Disciplina Mental",
        description:
          "Vantagem em salvaguardas para evitar ou encerrar as condições enfeitiçado e amedrontado em si mesmo.",
      },
      {
        id: "githzerai-psionics",
        name: "Psionismo Githzerai",
        description:
          "Conhece mãos mágicas (mão invisível com este traço). No 3º nível, escudo; no 5º, detectar pensamentos. Cada uma uma vez por descanso longo (ou com espaços), sem materiais. Inteligência, Sabedoria ou Carisma é o atributo de conjuração.",
      },
      {
        id: "psychic-resilience",
        name: "Resiliência Psíquica",
        description: "Você tem resistência a dano psíquico.",
      },
    ],
    subraces: [],
  },
  {
    id: "deep-gnome",
    name: "Gnomo das Profundezas",
    source: "motm",
    size: "small",
    speed: 30,
    abilityScoreModel: "motm-floating",
    abilityBonuses: {},
    languages: ["Comum"],
    darkvision: 120,
    countsAs: ["gnome"],
    creatureType: "humanoid",
    traits: [
      {
        id: "svirfneblin-camouflage",
        name: "Camuflagem Svirfneblin",
        description:
          "Ao fazer teste de Destreza (Furtividade), pode fazê-lo com vantagem. Usos iguais ao bônus de proficiência por descanso longo.",
      },
      {
        id: "gift-of-the-svirfneblin",
        name: "Dádiva dos Svirfneblin",
        description:
          "No 3º nível, disfarçar-se; no 5º, indetectável sem material. Cada uma uma vez por descanso longo (ou com espaços). Inteligência, Sabedoria ou Carisma é o atributo de conjuração.",
      },
      {
        id: "gnome-cunning",
        name: "Resistência dos Gnomos a Magia",
        description:
          "Vantagem em salvaguardas de Inteligência, Sabedoria e Carisma contra magias.",
      },
      {
        id: "darkvision",
        name: "Visão no Escuro",
        description: DARKVISION_120,
      },
    ],
    subraces: [],
  },
  {
    id: "goblin",
    name: "Goblin",
    source: "motm",
    size: "small",
    speed: 30,
    abilityScoreModel: "motm-floating",
    abilityBonuses: {},
    languages: ["Comum"],
    darkvision: 60,
    countsAs: ["goblinoid"],
    creatureType: "humanoid",
    traits: [
      {
        id: "fey-ancestry",
        name: "Ancestralidade Feérica",
        description:
          "Vantagem em salvaguardas para evitar ou encerrar a condição enfeitiçado em si mesmo.",
      },
      {
        id: "nimble-escape",
        name: "Fuga Ligeira",
        description:
          "Você pode usar Desengajar ou Esconder-se como ação bônus em cada um dos seus turnos.",
      },
      {
        id: "fury-of-the-small",
        name: "Fúria dos Pequenos",
        description:
          "Ao causar dano a uma criatura de tamanho maior que o seu, pode adicionar dano extra igual ao bônus de proficiência (uma vez por turno; usos iguais à proficiência por descanso longo).",
      },
      {
        id: "darkvision",
        name: "Visão no Escuro",
        description: DARKVISION_60,
      },
    ],
    subraces: [],
  },
  {
    id: "goliath",
    name: "Golias",
    source: "motm",
    size: "medium",
    speed: 30,
    abilityScoreModel: "motm-floating",
    abilityBonuses: {},
    languages: ["Comum"],
    creatureType: "humanoid",
    skillProficiencies: ["athletics"],
    traits: [
      {
        id: "stones-endurance",
        name: "Duro como Pedra",
        description:
          "Quando sofre dano, reação: role 1d12 + modificador de Constituição e reduza o dano. Usos iguais ao bônus de proficiência por descanso longo.",
      },
      {
        id: "mountain-born",
        name: "Nascido nas Montanhas",
        description:
          "Resistência a dano gélido. Adaptado a grandes altitudes, inclusive acima de 6.000 m.",
      },
      {
        id: "powerful-build",
        name: "Pequeno Gigante",
        description:
          "Proficiência em Atletismo. Conta como uma categoria maior para carga e peso empurrado/arrastado/levantado.",
      },
    ],
    subraces: [],
  },
  {
    id: "hobgoblin",
    name: "Hobgoblin",
    source: "motm",
    size: "medium",
    speed: 30,
    abilityScoreModel: "motm-floating",
    abilityBonuses: {},
    languages: ["Comum"],
    darkvision: 60,
    countsAs: ["goblinoid"],
    creatureType: "humanoid",
    traits: [
      {
        id: "fey-ancestry",
        name: "Ancestralidade Feérica",
        description:
          "Vantagem em salvaguardas para evitar ou encerrar a condição enfeitiçado em si mesmo.",
      },
      {
        id: "fey-gift",
        name: "Presente Feérico",
        description:
          "Pode usar Ajudar como ação bônus (usos = proficiência por descanso longo). No 3º nível, ao ajudar assim, escolha Despeito, Hospitalidade ou Passagem.",
      },
      {
        id: "fortune-of-the-many",
        name: "Sorte dos Muitos",
        description:
          "Se errar ataque ou falhar em teste/salvaguarda, pode adicionar bônus igual ao número de aliados visíveis a até 9 m (máx. +3). Usos = proficiência por descanso longo.",
      },
      {
        id: "darkvision",
        name: "Visão no Escuro",
        description: DARKVISION_60,
      },
    ],
    subraces: [],
  },
  {
    id: "kenku",
    name: "Kenku",
    source: "motm",
    size: "medium",
    sizeOptions: ["medium", "small"],
    speed: 30,
    abilityScoreModel: "motm-floating",
    abilityBonuses: {},
    languages: ["Comum"],
    creatureType: "humanoid",
    traits: [
      {
        id: "expert-duplication",
        name: "Especialista em Cópias",
        description:
          "Ao copiar escritos ou trabalhos manuais, vantagem nos testes de atributo para produzir uma duplicata exata.",
      },
      {
        id: "kenku-recall",
        name: "Lembrança Kenku",
        description:
          "Proficiência em duas perícias à escolha. Ao fazer teste com perícia em que seja proficiente, pode obter vantagem antes de rolar (usos = proficiência por descanso longo).",
      },
      {
        id: "mimicry",
        name: "Mimetismo",
        description:
          "Imita sons e vozes com precisão. Ouvir e perceber a imitação exige Intuição (CD 8 + proficiência + Carisma).",
      },
    ],
    subraces: [],
  },
  {
    id: "kobold",
    name: "Kobold",
    source: "motm",
    size: "small",
    speed: 30,
    abilityScoreModel: "motm-floating",
    abilityBonuses: {},
    languages: ["Comum"],
    darkvision: 60,
    creatureType: "humanoid",
    traits: [
      {
        id: "draconic-cry",
        name: "Grito Dracônico",
        description:
          "Ação bônus: grito contra inimigos a até 3 m. Até o início do seu próximo turno, você e aliados têm vantagem em ataques contra inimigos que ouviram. Usos = proficiência por descanso longo.",
      },
      {
        id: "kobold-legacy",
        name: "Legado Kobold",
        description: "Escolha uma opção de legado kobold.",
      },
      {
        id: "darkvision",
        name: "Visão no Escuro",
        description: DARKVISION_60,
      },
    ],
    choices: [
      {
        id: "legacy",
        name: "Legado Kobold",
        options: [
          {
            id: "cunning",
            name: "Astúcia",
            description:
              "Proficiência em uma perícia: Arcanismo, Investigação, Medicina, Prestidigitação ou Sobrevivência.",
          },
          {
            id: "fierce",
            name: "Enfrentamento",
            description:
              "Vantagem em salvaguardas para evitar ou encerrar a condição amedrontado em si mesmo.",
          },
          {
            id: "draconic-sorcery",
            name: "Feitiçaria Dracônica",
            description:
              "Conhece um truque da lista de feiticeiro. Inteligência, Sabedoria ou Carisma é o atributo de conjuração (escolha ao selecionar a raça).",
          },
        ],
      },
    ],
    subraces: [],
  },
  {
    id: "harengon",
    name: "Laparlonj",
    source: "motm",
    size: "medium",
    sizeOptions: ["medium", "small"],
    speed: 30,
    abilityScoreModel: "motm-floating",
    abilityBonuses: {},
    languages: ["Comum"],
    creatureType: "humanoid",
    skillProficiencies: ["perception"],
    traits: [
      {
        id: "hare-trigger",
        name: "Disparo da Lebre",
        description: "Você adiciona seu bônus de proficiência à iniciativa.",
      },
      {
        id: "leporine-senses",
        name: "Orelhas Compridas",
        description: "Proficiência na perícia Percepção.",
      },
      {
        id: "rabbit-hop",
        name: "Salto do Coelho",
        description:
          "Ação bônus: salte 1,5 m × bônus de proficiência sem provocar ataques de oportunidade (deslocamento > 0). Usos = proficiência por descanso longo.",
      },
      {
        id: "lucky-footwork",
        name: "Sorte nos Pés",
        description:
          "Ao falhar em salvaguarda de Destreza, reação: role 1d4 e some ao resultado. Não se estiver caído ou com deslocamento 0.",
      },
    ],
    subraces: [],
  },
  {
    id: "minotaur",
    name: "Minotauro",
    source: "motm",
    size: "medium",
    speed: 30,
    abilityScoreModel: "motm-floating",
    abilityBonuses: {},
    languages: ["Comum"],
    creatureType: "humanoid",
    traits: [
      {
        id: "horns",
        name: "Chifres",
        description:
          "Golpes desarmados com chifres causam dano perfurante igual a 1d6 + modificador de Força.",
      },
      {
        id: "goring-rush",
        name: "Chifrada em Arranco",
        description:
          "Imediatamente após Correr e se mover ao menos 6 m, pode atacar com os chifres como ação bônus.",
      },
      {
        id: "hammering-horns",
        name: "Chifres de Aríete",
        description:
          "Após acertar ataque corpo a corpo na ação Atacar, ação bônus: alvo a até 1,5 m (até uma categoria maior) faz salvaguarda de Força (CD 8 + proficiência + Força) ou é empurrado até 3 m.",
      },
      {
        id: "labyrinthine-recall",
        name: "Memória Labiríntica",
        description:
          "Sempre sabe onde fica o norte. Vantagem em Sabedoria (Sobrevivência) para se localizar ou rastrear.",
      },
    ],
    subraces: [],
  },
  {
    id: "shifter",
    name: "Morfo",
    source: "motm",
    size: "medium",
    speed: 30,
    abilityScoreModel: "motm-floating",
    abilityBonuses: {},
    languages: ["Comum"],
    darkvision: 60,
    creatureType: "humanoid",
    traits: [
      {
        id: "bestial-instincts",
        name: "Instintos Bestiais",
        description:
          "Proficiência em uma perícia: Acrobacia, Atletismo, Intimidação ou Sobrevivência.",
      },
      {
        id: "shifting",
        name: "Morfismo",
        description:
          "Ação bônus: aparência bestial por 1 minuto (ou até morrer/encerrar). Ganha PV temporários iguais a 2 × bônus de proficiência, mais o benefício do morfismo escolhido. Usos = proficiência por descanso longo.",
      },
      {
        id: "darkvision",
        name: "Visão no Escuro",
        description: DARKVISION_60,
      },
    ],
    choices: [
      {
        id: "morph",
        name: "Morfismo",
        options: [
          {
            id: "beasthide",
            name: "Pele de Fera",
            description:
              "Ganha 1d6 PV temporários adicionais. Enquanto morfado, +1 na CA.",
          },
          {
            id: "longtooth",
            name: "Presa Longa",
            description:
              "Ao morfar e como ação bônus enquanto morfado, ataque desarmado com presas: 1d6 + Força de dano perfurante.",
          },
          {
            id: "swiftstride",
            name: "Passo Ágil",
            description:
              "Enquanto morfado, +3 m de deslocamento. Reação: mover-se 3 m quando uma criatura termina o turno a menos de 1,5 m (sem provocar ataques de oportunidade).",
          },
          {
            id: "wildhunt",
            name: "Caça Selvagem",
            description:
              "Enquanto morfado, vantagem em testes de Sabedoria; nenhuma criatura a até 9 m tem vantagem em ataques contra você, a menos que esteja incapacitado.",
          },
        ],
      },
    ],
    subraces: [],
  },
  {
    id: "orc",
    name: "Orc",
    source: "motm",
    size: "medium",
    speed: 30,
    abilityScoreModel: "motm-floating",
    abilityBonuses: {},
    languages: ["Comum"],
    darkvision: 60,
    creatureType: "humanoid",
    traits: [
      {
        id: "adrenaline-rush",
        name: "Pico de Adrenalina",
        description:
          "Pode usar Correr como ação bônus e ganha PV temporários iguais ao bônus de proficiência. Usos = proficiência por descanso longo.",
      },
      {
        id: "powerful-build",
        name: "Porte Poderoso",
        description:
          "Conta como uma categoria de tamanho maior para carga e peso empurrado/arrastado/levantado.",
      },
      {
        id: "relentless-endurance",
        name: "Resistência Implacável",
        description:
          "Quando reduzido a 0 PV mas não morto, pode cair a 1 PV. Uma vez por descanso longo.",
      },
      {
        id: "darkvision",
        name: "Visão no Escuro",
        description: DARKVISION_60,
      },
    ],
    subraces: [],
  },
  {
    id: "lizardfolk",
    name: "Reptante",
    source: "motm",
    size: "medium",
    speed: 30,
    speedDetail: { walk: 30, swim: 30 },
    abilityScoreModel: "motm-floating",
    abilityBonuses: {},
    languages: ["Comum"],
    creatureType: "humanoid",
    traits: [
      {
        id: "natural-armor",
        name: "Armadura Natural",
        description:
          "Sem armadura, CA base 13 + modificador de Destreza. Pode usar essa CA se a armadura vestida for menor. Escudo se aplica normalmente.",
      },
      {
        id: "natures-intuition",
        name: "Intuição da Natureza",
        description:
          "Proficiência em duas perícias: Furtividade, Lidar com Animais, Medicina, Natureza, Percepção ou Sobrevivência.",
      },
      {
        id: "hungry-jaws",
        name: "Mandíbula Faminta",
        description:
          "Ação bônus: ataque especial de mordida; se acertar, dano normal + PV temporários iguais ao bônus de proficiência. Usos = proficiência por descanso longo.",
      },
      {
        id: "bite",
        name: "Mordida",
        description:
          "Golpe desarmado com mordida: dano cortante 1d6 + modificador de Força.",
      },
      {
        id: "hold-breath",
        name: "Prender a Respiração",
        description: "Você pode prender a respiração por até 15 minutos.",
      },
    ],
    subraces: [],
  },
  {
    id: "satyr",
    name: "Sátiro",
    source: "motm",
    size: "medium",
    speed: 35,
    abilityScoreModel: "motm-floating",
    abilityBonuses: {},
    languages: ["Comum"],
    creatureType: "fey",
    skillProficiencies: ["performance", "persuasion"],
    traits: [
      {
        id: "ram",
        name: "Aríete",
        description:
          "Golpes desarmados com cabeça/chifres: dano contundente 1d6 + modificador de Força.",
      },
      {
        id: "reveler",
        name: "Farrista",
        description:
          "Proficiência em Atuação, Persuasão e em um instrumento musical à escolha.",
      },
      {
        id: "magic-resistance",
        name: "Resistência a Magia",
        description: "Você tem vantagem em salvaguardas contra magias.",
      },
      {
        id: "mirthful-leaps",
        name: "Saltos de Alegria",
        description:
          "Em saltos em distância ou altura, role 1d8 e some o resultado × 0,3 m (mesmo parado). Custa deslocamento normalmente.",
      },
    ],
    subraces: [],
  },
  {
    id: "shadar-kai",
    name: "Shadar-kai",
    source: "motm",
    size: "medium",
    speed: 30,
    abilityScoreModel: "motm-floating",
    abilityBonuses: {},
    languages: ["Comum"],
    darkvision: 60,
    countsAs: ["elf"],
    creatureType: "humanoid",
    skillProficiencies: ["perception"],
    traits: [
      {
        id: "fey-ancestry",
        name: "Ancestralidade Feérica",
        description:
          "Vantagem em salvaguardas para evitar ou encerrar a condição enfeitiçado em si mesmo.",
      },
      {
        id: "blessing-of-the-raven-queen",
        name: "Benção da Rainha Corvo",
        description:
          "Ação bônus: teleporte até 9 m. Usos = proficiência por descanso longo. No 3º nível, ao teleportar, resistência a todo dano até o início do próximo turno.",
      },
      {
        id: "necrotic-resistance",
        name: "Resistência Necrótica",
        description: "Você tem resistência a dano necrótico.",
      },
      {
        id: "keen-senses",
        name: "Sentidos Aguçados",
        description: "Proficiência na perícia Percepção.",
      },
      {
        id: "trance",
        name: "Transe",
        description:
          "Não precisa dormir; magia não o faz dormir. Descanso longo em 4 horas de transe. Ao terminar, pode ganhar duas proficiências temporárias (arma ou ferramenta) até o próximo descanso longo.",
      },
      {
        id: "darkvision",
        name: "Visão no Escuro",
        description: DARKVISION_60,
      },
    ],
    subraces: [],
  },
  {
    id: "tabaxi",
    name: "Tabaxi",
    source: "motm",
    size: "medium",
    sizeOptions: ["medium", "small"],
    speed: 30,
    speedDetail: { walk: 30, climb: 30 },
    abilityScoreModel: "motm-floating",
    abilityBonuses: {},
    languages: ["Comum"],
    darkvision: 60,
    creatureType: "humanoid",
    skillProficiencies: ["stealth", "perception"],
    traits: [
      {
        id: "feline-agility",
        name: "Agilidade Felina",
        description:
          "Ao se mover no turno, pode dobrar o deslocamento até o fim do turno. Só pode usar de novo após ter se movido 0 m em um turno.",
      },
      {
        id: "cats-claws",
        name: "Garras Felinas",
        description:
          "Golpes desarmados com garras: dano cortante 1d6 + modificador de Força.",
      },
      {
        id: "cats-talent",
        name: "Talento Felino",
        description: "Proficiência nas perícias Furtividade e Percepção.",
      },
      {
        id: "darkvision",
        name: "Visão no Escuro",
        description: DARKVISION_60,
      },
    ],
    subraces: [],
  },
  {
    id: "tortle",
    name: "Tortuga",
    source: "motm",
    size: "medium",
    sizeOptions: ["medium", "small"],
    speed: 30,
    abilityScoreModel: "motm-floating",
    abilityBonuses: {},
    languages: ["Comum"],
    creatureType: "humanoid",
    traits: [
      {
        id: "natural-armor",
        name: "Armadura Natural",
        description:
          "CA base 17 (Destreza não se aplica). Não pode usar armadura leve, média ou pesada; escudo se aplica normalmente.",
      },
      {
        id: "shell-defense",
        name: "Casco Defensivo",
        description:
          "Ação: recolher-se no casco. +4 CA; vantagem em salvaguardas de Força e Constituição; considerado caído; deslocamento 0; desvantagem em Destreza; sem reações; só ação bônus para sair.",
      },
      {
        id: "claws",
        name: "Garras",
        description:
          "Golpes desarmados com garras: dano cortante 1d6 + modificador de Força.",
      },
      {
        id: "natures-intuition",
        name: "Intuição da Natureza",
        description:
          "Proficiência em uma perícia: Furtividade, Lidar com Animais, Medicina, Natureza, Percepção ou Sobrevivência.",
      },
      {
        id: "hold-breath",
        name: "Prender a Respiração",
        description: "Você pode prender a respiração por até 1 hora.",
      },
    ],
    subraces: [],
  },
  {
    id: "triton",
    name: "Tritão",
    source: "motm",
    size: "medium",
    speed: 30,
    speedDetail: { walk: 30, swim: 30 },
    abilityScoreModel: "motm-floating",
    abilityBonuses: {},
    languages: ["Comum"],
    darkvision: 60,
    creatureType: "humanoid",
    traits: [
      {
        id: "amphibious",
        name: "Anfíbio",
        description: "Você pode respirar ar e água.",
      },
      {
        id: "control-air-and-water",
        name: "Controle do Ar e da Água",
        description:
          "Conjure névoa obscurecente; no 3º nível, lufada de vento; no 5º, caminhar sobre as águas. Cada uma uma vez por descanso longo (ou com espaços). Inteligência, Sabedoria ou Carisma é o atributo de conjuração.",
      },
      {
        id: "emissary-of-the-sea",
        name: "Emissário do Mar",
        description:
          "Comunica ideias simples a feras, elementais ou monstruosidades com deslocamento de natação.",
      },
      {
        id: "guardian-of-the-depths",
        name: "Guardião das Profundezas",
        description: "Você tem resistência a dano gélido.",
      },
      {
        id: "darkvision",
        name: "Visão no Escuro",
        description: DARKVISION_60,
      },
    ],
    subraces: [],
  },
  {
    id: "yuan-ti",
    name: "Yuan-ti",
    source: "motm",
    size: "medium",
    sizeOptions: ["medium", "small"],
    speed: 30,
    abilityScoreModel: "motm-floating",
    abilityBonuses: {},
    languages: ["Comum"],
    darkvision: 60,
    creatureType: "humanoid",
    traits: [
      {
        id: "serpentine-spellcasting",
        name: "Conjuração Ofídica",
        description:
          "Conhece rajada de veneno. Conjura amizade animal ilimitadamente (apenas cobras). No 3º nível, sugestão uma vez por descanso longo (ou com espaços 2º+). Inteligência, Sabedoria ou Carisma é o atributo de conjuração.",
      },
      {
        id: "magic-resistance",
        name: "Resistência a Magia",
        description: "Você tem vantagem em salvaguardas contra magias.",
      },
      {
        id: "poison-resilience",
        name: "Resistência a Veneno",
        description:
          "Vantagem em salvaguardas contra a condição envenenado e resistência a dano de veneno.",
      },
      {
        id: "darkvision",
        name: "Visão no Escuro",
        description: DARKVISION_60,
      },
    ],
    subraces: [],
  },
];
