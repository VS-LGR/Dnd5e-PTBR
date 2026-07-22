/**
 * Tabelas de sabor / personalidade por classe (Guia de Xanathar, cap. 1).
 * Opcionais — não alteram mecânica.
 */

export interface ClassFlavorTable {
  id: string;
  name: string;
  options: string[];
}

export interface ClassFlavorPack {
  classId: string;
  tables: ClassFlavorTable[];
}

export const XGTE_CLASS_FLAVOR: Record<string, ClassFlavorPack> = {
  barbarian: {
    classId: "barbarian",
    tables: [
      {
        id: "personal-totem",
        name: "Totem pessoal",
        options: [
          "Tufo de pelo de um lobo solitário que befriendei numa caçada.",
          "Uma pena de águia dada por um xamã, que disse que teria papel num dia importante.",
          "Um colar feito de dentes do urso que matei sozinho.",
          "Um saquinho de couro com três pedras que representam meus ancestrais.",
          "Uma pequena escultura de madeira do meu animal-espírito.",
          "Um fragmento de pedra de um lugar sagrado da minha tribo.",
        ],
      },
      {
        id: "tattoos",
        name: "Tatuagens",
        options: [
          "Asas de águia abertas nas costas superiores.",
          "Patas de urso das cavernas gravadas no dorso das mãos.",
          "Símbolos do clã em padrões vinhedos pelos braços.",
          "Chifres de alce tatuados nas costas.",
          "Imagens do animal-espírito ao longo do braço e da mão da arma.",
          "Olhos de lobo nas costas para ver e afastar espíritos malignos.",
        ],
      },
      {
        id: "superstitions",
        name: "Superstições",
        options: [
          "Se um animal me olha nos olhos no início da jornada, o dia será bom.",
          "Nunca atravesso um rio sem jogar uma moeda — senão os espíritos da água se zangam.",
          "Acredito que armas quebradas em combate estão amaldiçoadas e devem ser enterradas.",
          "Se ouço um corvo três vezes antes da batalha, alguém próximo cairá.",
          "Ao atravessar cemitério, uso prata — ou um fantasma pode entrar em mim.",
          "Nunca digo o nome verdadeiro de um inimigo morto, para não atrair seu espírito.",
        ],
      },
    ],
  },
  bard: {
    classId: "bard",
    tables: [
      {
        id: "defining-work",
        name: "Obra definidora",
        options: [
          "Uma balada sobre um herói local que ninguém mais lembra direito.",
          "Uma sátira que ofendeu um nobre poderoso.",
          "Uma elegia que faz plateias inteiras chorar.",
          "Uma dança inventada por mim que virou moda numa cidade.",
          "Um tratado em verso sobre um mistério arcano.",
          "Uma performance improvisada que salvou minha pele numa taverna hostil.",
        ],
      },
      {
        id: "instrument",
        name: "Instrumento",
        options: [
          "Uma alaúde herdada de um mentor.",
          "Uma flauta de osso encontrada numa ruína.",
          "Um tambor de pele de monstro que matei (ou ajudei a matar).",
          "Uma lira dourada que brilha sob luar.",
          "Uma gaita simples que cabe no bolso.",
          "Uma voz treinada — meu corpo é o instrumento.",
        ],
      },
      {
        id: "embarrassment",
        name: "Constrangimento",
        options: [
          "Esqueci a letra no meio de uma apresentação para um rei.",
          "Cantei o nome errado do herói numa balada famosa.",
          "Fui vaiado até sair do palco.",
          "Apaixonei-me pela pessoa errada na plateia — e todos perceberam.",
          "Quebrei meu instrumento no auge da música.",
          "Uma rival me supera publicamente e ainda conta o caso.",
        ],
      },
    ],
  },
  cleric: {
    classId: "cleric",
    tables: [
      {
        id: "temple",
        name: "Templo",
        options: [
          "Um santuário humilde numa aldeia.",
          "Uma catedral grandiosa na capital.",
          "Um templo de guerra nas fronteiras.",
          "Um mosteiro isolado nas montanhas.",
          "Um culto secreto sob a cidade.",
          "Um altar portátil — levo a fé comigo.",
        ],
      },
      {
        id: "keepsake",
        name: "Lembrança sagrada",
        options: [
          "Um medalhão com o símbolo do meu deus.",
          "Um pedaço de tecido do manto do meu mentor.",
          "Água benta de uma fonte sagrada.",
          "Um livro de orações anotado à mão.",
          "Uma relíquia menor de um santo.",
          "Uma cicatriz ritual recebida na iniciação.",
        ],
      },
      {
        id: "secret",
        name: "Segredo",
        options: [
          "Duvido, às vezes, se meu deus realmente me ouve.",
          "Já usei magia divina para benefício pessoal e me arrependo.",
          "Sei de uma heresia dentro da própria fé.",
          "Fui escolhido por engano — ou assim creio.",
          "Mantenho amizade com alguém que minha religião condena.",
          "Ouvi uma profecia que ainda não contei a ninguém.",
        ],
      },
    ],
  },
  druid: {
    classId: "druid",
    tables: [
      {
        id: "treasured-item",
        name: "Item precioso",
        options: [
          "Um cajado de madeira viva que ainda brota folhas.",
          "Uma pedra lisa de um rio sagrado.",
          "Um amuleto de pena, dente e osso.",
          "Sementes de uma árvore que só cresce no meu círculo.",
          "Um frasco de seiva brilhante.",
          "O colar do animal que foi meu primeiro amigo.",
        ],
      },
      {
        id: "guiding-aspect",
        name: "Aspecto guia",
        options: [
          "O ciclo das estações.",
          "A fúria da tempestade.",
          "A paciência da pedra.",
          "A liberdade dos pássaros.",
          "A resiliência das raízes.",
          "O mistério da noite e da lua.",
        ],
      },
      {
        id: "mentor",
        name: "Mentor",
        options: [
          "Um ancião do círculo que quase não fala.",
          "Um animal falante (ou quase) que me guiou.",
          "Um espírito da terra em sonhos.",
          "Um druida exilado com métodos pouco ortodoxos.",
          "Minha própria intuição, moldada pelos ermos.",
          "Um livro de casca de árvore deixado por alguém desaparecido.",
        ],
      },
    ],
  },
  fighter: {
    classId: "fighter",
    tables: [
      {
        id: "heraldic-sign",
        name: "Símbolo heráldico",
        options: [
          "Um leão rampante.",
          "Uma torre quebrada.",
          "Uma espada cruzada com uma rosa.",
          "Um dragão estilizado.",
          "Um escudo rachado.",
          "Nenhum — lutarei sob meu próprio nome.",
        ],
      },
      {
        id: "instructor",
        name: "Instrutor",
        options: [
          "Um veterano de mil guerras, cicatrizado e sarcástico.",
          "Um cavaleiro nobre obcecado por honra.",
          "Um mestre de arena que cobrava em sangue e suor.",
          "Um parente que me ensinou tudo o que sabia.",
          "Um inimigo capturado que trocou liberdade por lições.",
          "A própria necessidade — aprendi sobrevivendo.",
        ],
      },
      {
        id: "signature-style",
        name: "Estilo marcante",
        options: [
          "Golpes largos e intimidadores.",
          "Defesa impecável e contra-ataques precisos.",
          "Mobilidade: nunca fico onde o inimigo espera.",
          "Armas improvisadas e adaptação constante.",
          "Duelos formais — um por um.",
          "Luta suja: areia nos olhos, joelhos e cotoveladas.",
        ],
      },
    ],
  },
  monk: {
    classId: "monk",
    tables: [
      {
        id: "monastery",
        name: "Mosteiro",
        options: [
          "Mosteiro no pico de uma montanha.",
          "Templo escondido numa floresta densa.",
          "Ordem urbana disfarçada de escola de artes.",
          "Ruínas onde só restam poucos monges.",
          "Navio-mosteiro que nunca atraca por muito tempo.",
          "Não pertenço mais a nenhum — caminho sozinho.",
        ],
      },
      {
        id: "monastic-icon",
        name: "Ícone monástico",
        options: [
          "Um círculo incompleto.",
          "Uma mão aberta.",
          "Uma gota de água.",
          "Um olho fechado.",
          "Uma chama quieta.",
          "Um nó sem pontas.",
        ],
      },
      {
        id: "master",
        name: "Mestre",
        options: [
          "Sábio e paciente até demais.",
          "Severíssimo; um elogio vale ouro.",
          "Misterioso — fala por enigmas.",
          "Ex-guerreiro que encontrou paz tarde.",
          "Rival que se tornou mentor a contragosto.",
          "Já se foi; treino com as lições que deixou.",
        ],
      },
    ],
  },
  paladin: {
    classId: "paladin",
    tables: [
      {
        id: "personal-goal",
        name: "Meta pessoal",
        options: [
          "Proteger os inocentes acima de tudo.",
          "Destruir um mal específico que marcou minha vida.",
          "Restaurar a honra de uma ordem caída.",
          "Converter (ou redimir) um inimigo poderoso.",
          "Erguer um templo ou fortaleza da luz.",
          "Provar que a virtude ainda tem lugar neste mundo.",
        ],
      },
      {
        id: "symbol",
        name: "Símbolo",
        options: [
          "Um sol nascente.",
          "Uma balança.",
          "Uma chama eterna.",
          "Uma mão erguida em juramento.",
          "Uma espada apontada para baixo.",
          "Um coração envolto em ferro.",
        ],
      },
      {
        id: "nemesis",
        name: "Nêmesis",
        options: [
          "Um culto que corrompe vilas.",
          "Um tirano que se diz justo.",
          "Um demônio que conheço pelo nome.",
          "Um antigo camarada caído.",
          "A própria dúvida.",
          "Ainda não encontrei — mas sei que virá.",
        ],
      },
      {
        id: "temptation",
        name: "Tentação",
        options: [
          "Usar o poder sagrado para glória pessoal.",
          "Ignorar a lei quando a justiça parece lenta.",
          "Odiar demais o inimigo.",
          "Abandonar o juramento por alguém que amo.",
          "Aceitar um atalho sombrio “pelo bem maior”.",
          "Desistir quando o mundo parece irredimível.",
        ],
      },
    ],
  },
  ranger: {
    classId: "ranger",
    tables: [
      {
        id: "view-of-world",
        name: "Visão do mundo",
        options: [
          "A civilização é uma ilha frágil no oceano selvagem.",
          "A natureza e as cidades podem coexistir — se alguém vigilá-las.",
          "Monstros são o verdadeiro problema; pessoas são complicação.",
          "Tudo está conectado; desequilíbrio em um lado abala o outro.",
          "O ermo é lar; cidades são visitas breves.",
          "Não há “lado certo” — só sobrevivência e escolhas.",
        ],
      },
      {
        id: "homeland",
        name: "Terra natal",
        options: [
          "Floresta antiga e úmida.",
          "Estepe aberta sob céu enorme.",
          "Costa pedregosa e ventos salgados.",
          "Montanhas nevadas.",
          "Pântano traiçoeiro.",
          "Fronteira entre dois reinos em conflito.",
        ],
      },
      {
        id: "sworn-enemy",
        name: "Inimigo jurado",
        options: [
          "Lobisomens ou criaturas da lua.",
          "Gigantes que pisoteiam aldeias.",
          "Cultistas que corrompem a terra.",
          "Orcs ou humanoides raiders.",
          "Um tipo específico de monstro que matou alguém meu.",
          "Caçadores furtivos e despojadores.",
        ],
      },
    ],
  },
  rogue: {
    classId: "rogue",
    tables: [
      {
        id: "guilty-pleasure",
        name: "Prazer culpado",
        options: [
          "Doces caros que mal posso pagar.",
          "Fofocas da alta sociedade.",
          "Colecionar chaves que não abrem nada (ainda).",
          "Assistir duelos de longe.",
          "Roupas finas demais para “ladrão”.",
          "Contar mentiras elaboradas só pelo desafio.",
        ],
      },
      {
        id: "adversary",
        name: "Adversário",
        options: [
          "Um guarda obsessivo que jurou me pegar.",
          "Um rival na mesma guilda.",
          "Um nobre que enganei uma vez de mais.",
          "Um ex-parceiro traído.",
          "Um informante que vende todo mundo.",
          "A própria paranoia.",
        ],
      },
      {
        id: "benefactor",
        name: "Benfeitor",
        options: [
          "Um mercador que “não pergunta de onde veio”.",
          "Uma matrona de guilda que me protege.",
          "Um mago que precisa de coisas discretas.",
          "Um amigo de infância agora em posição útil.",
          "Um fantasma de dívidas pagas — alguém me deve.",
          "Ninguém; confio só em mim.",
        ],
      },
    ],
  },
  sorcerer: {
    classId: "sorcerer",
    tables: [
      {
        id: "arcane-origin",
        name: "Origem arcana (sabor)",
        options: [
          "Sangue de dragão distante.",
          "Exposição a magia selvagem na infância.",
          "Bênção (ou maldição) de uma entidade.",
          "Nascido sob um presságio cósmico.",
          "Acidente em laboratório ou ritual.",
          "Herança que a família tentou esconder.",
        ],
      },
      {
        id: "reaction",
        name: "Reação dos outros",
        options: [
          "Medo e superstição.",
          "Fascínio e pedidos de “mais um truque”.",
          "Tentativas de me recrutar para cultos ou academias.",
          "Negação — fingem que nada há de especial.",
          "Inveja de outros arcanistas.",
          "Afeto protetor de quem me criou.",
        ],
      },
      {
        id: "supernatural-mark",
        name: "Marca sobrenatural",
        options: [
          "Olhos que mudam de cor com a emoção.",
          "Veias que brilham sob a pele ao conjurar.",
          "Uma sombra que não combina com o corpo.",
          "Cheiro de ozônio ou enxofre ao redor.",
          "Cabelo que se move sozinho às vezes.",
          "Uma runa que aparece só sob certas luas.",
        ],
      },
      {
        id: "sign-of-sorcery",
        name: "Sinal de feitiçaria",
        options: [
          "Velas tremem quando entro.",
          "Animais me observam em silêncio.",
          "Espelhos embaçam ao meu redor.",
          "Sinto o gosto de metal antes de conjurar.",
          "Sonhos proféticos ocasionais.",
          "A magia “vaza” em momentos de estresse.",
        ],
      },
    ],
  },
  warlock: {
    classId: "warlock",
    tables: [
      {
        id: "patron-attitude",
        name: "Atitude do patrono",
        options: [
          "Distante e quase indiferente.",
          "Protetor, mas possessivo.",
          "Manipulador e enigmático.",
          "Curioso com minha vida mortal.",
          "Impaciente — exige resultados.",
          "Afetuoso de um jeito inquietante.",
        ],
      },
      {
        id: "pact-terms",
        name: "Termos especiais do pacto",
        options: [
          "Nunca recusar um pedido feito três vezes.",
          "Oferecer a primeira gota de sangue de cada lua.",
          "Não revelar o nome verdadeiro do patrono.",
          "Coletar histórias / segredos para o patrono.",
          "Proteger um local ou objeto específico.",
          "Os termos ainda não foram totalmente revelados.",
        ],
      },
      {
        id: "binding-mark",
        name: "Marca do vínculo",
        options: [
          "Um olho extra que só eu vejo no espelho.",
          "Uma cicatriz em forma de runa na palma.",
          "Uma voz baixa que às vezes responde pensamentos.",
          "Um animal que me segue e some quando outros olham.",
          "Um anel que não sai do dedo.",
          "Sonhos compartilhados com o patrono.",
        ],
      },
    ],
  },
  wizard: {
    classId: "wizard",
    tables: [
      {
        id: "spellbook",
        name: "Grimório",
        options: [
          "Um tomo grosso encadernado em couro gasto.",
          "Páginas soltas num estojo à prova d’água.",
          "Um livro que murmura quando aberto.",
          "Tatuagens e anotações na própria pele (com cuidado).",
          "Um grimório herdado com páginas rasgadas.",
          "Um dispositivo cristalino que projeta as fórmulas.",
        ],
      },
      {
        id: "ambitions",
        name: "Ambições",
        options: [
          "Descobrir um segredo perdido da criação.",
          "Fundar minha própria escola.",
          "Superar um rival acadêmico.",
          "Traduzir um idioma morto de magia.",
          "Criar uma magia com meu nome.",
          "Entender — e talvez quebrar — uma regra da magia.",
        ],
      },
      {
        id: "eccentricity",
        name: "Excentricidade",
        options: [
          "Falo sozinho resolvendo problemas.",
          "Coleciono ingredientes inúteis “por precaução”.",
          "Recuso-me a usar a mesma tinta duas vezes.",
          "Dou nomes a todas as minhas magias preparadas.",
          "Desconfio de escadas — prefiro flutuação quando posso.",
          "Mantenho um diário obsessivamente detalhado.",
        ],
      },
    ],
  },
};

export function getClassFlavor(classId: string): ClassFlavorPack | undefined {
  return XGTE_CLASS_FLAVOR[classId];
}

export function rollClassFlavor(classId: string): Record<string, string> {
  const pack = getClassFlavor(classId);
  if (!pack) return {};
  const out: Record<string, string> = {};
  for (const table of pack.tables) {
    out[table.id] = table.options[Math.floor(Math.random() * table.options.length)]!;
  }
  return out;
}

export function formatClassFlavorText(
  classId: string,
  picks: Record<string, string>,
): string {
  const pack = getClassFlavor(classId);
  if (!pack) return "";
  const lines = ["— Sabor de classe (Guia de Xanathar) —"];
  for (const table of pack.tables) {
    const v = picks[table.id];
    if (v) lines.push(`${table.name}: ${v}`);
  }
  return lines.join("\n");
}
