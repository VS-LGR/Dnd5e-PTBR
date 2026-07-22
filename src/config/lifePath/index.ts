/**
 * Essa é Sua Vida (XGtE) — tabelas e gerador de texto para história.
 * Ideias, não regras: resultados não alteram mecânica.
 */

export interface LifePathInput {
  raceId?: string;
  backgroundId?: string;
  classId?: string;
  /** Modificador de Carisma (para memórias da infância). */
  chaMod?: number;
}

function d(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

function d100(): number {
  return d(100);
}

function pickWeighted<T>(entries: Array<{ max: number; value: T }>): T {
  const roll = d100();
  for (const e of entries) {
    if (roll <= e.max) return e.value;
  }
  return entries[entries.length - 1]!.value;
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function rollDiceExpr(expr: string): number {
  const m = /^(\d+)d(\d+)(?:\+(\d+))?$/.exec(expr);
  if (!m) return 0;
  const n = Number(m[1]);
  const sides = Number(m[2]);
  const bonus = Number(m[3] ?? 0);
  let sum = bonus;
  for (let i = 0; i < n; i++) sum += d(sides);
  return sum;
}

const PARENTS = [
  { max: 95, value: "Você sabe quem são (ou foram) seus pais." },
  { max: 100, value: "Você não sabe quem foram seus pais." },
] as const;

const BIRTHPLACE = [
  { max: 50, value: "em casa" },
  { max: 55, value: "na casa de um amigo da família" },
  { max: 63, value: "na casa de um curandeiro ou parteira" },
  { max: 65, value: "em uma carruagem, carroça ou vagão" },
  { max: 68, value: "em um celeiro, galpão ou anexo" },
  { max: 70, value: "em uma caverna" },
  { max: 72, value: "em um campo" },
  { max: 74, value: "em uma floresta" },
  { max: 77, value: "em um templo" },
  { max: 78, value: "em um campo de batalha" },
  { max: 80, value: "em um beco ou rua" },
  { max: 82, value: "em um bordel, taverna ou estalagem" },
  { max: 84, value: "em um castelo, torre ou palácio" },
  { max: 85, value: "em um esgoto ou monte de lixo" },
  { max: 88, value: "entre pessoas de outra raça" },
  { max: 91, value: "a bordo de um barco ou navio" },
  { max: 93, value: "em uma prisão ou sede de organização secreta" },
  { max: 95, value: "no laboratório de um sábio" },
  { max: 96, value: "no Plano Feérico" },
  { max: 97, value: "no Plano das Sombras" },
  { max: 98, value: "no Plano Astral ou Etéreo" },
  { max: 99, value: "em um Plano Interior à escolha" },
  { max: 100, value: "em um Plano Exterior à escolha" },
] as const;

const FAMILY = [
  { max: 1, value: "ninguém (você se criou sozinho)" },
  { max: 2, value: "uma instituição (como um asilo)" },
  { max: 3, value: "um templo" },
  { max: 5, value: "um orfanato" },
  { max: 7, value: "um guardião" },
  { max: 15, value: "tia(s)/tio(s) paternos ou maternos" },
  { max: 25, value: "avós paternos ou maternos" },
  { max: 35, value: "uma família adotiva" },
  { max: 55, value: "pai solteiro ou padrasto" },
  { max: 75, value: "mãe solteira ou madrasta" },
  { max: 100, value: "mãe e pai" },
] as const;

const ABSENT_PARENT = [
  "Seu pai/mãe morreu.",
  "Seu pai/mãe foi preso(a), escravizado(a) ou levado(a) embora.",
  "Seu pai/mãe o abandonou.",
  "Seu pai/mãe desapareceu sem destino conhecido.",
] as const;

const LIFESTYLE: Array<{ max: number; label: string; mod: number }> = [
  { max: 3, label: "miserável", mod: -40 },
  { max: 5, label: "sórdido", mod: -20 },
  { max: 8, label: "pobre", mod: -10 },
  { max: 12, label: "modesto", mod: 0 },
  { max: 15, label: "confortável", mod: 10 },
  { max: 17, label: "rico", mod: 20 },
  { max: 18, label: "aristocrático", mod: 40 },
];

function childhoodHome(roll: number): string {
  if (roll <= 0) return "nas ruas";
  if (roll <= 20) return "em um casebre dilapidado";
  if (roll <= 30) return "sem residência permanente";
  if (roll <= 40) return "em um acampamento ou aldeia na natureza";
  if (roll <= 50) return "em um apartamento em bairro degradado";
  if (roll <= 70) return "em uma casa pequena";
  if (roll <= 90) return "em uma casa grande";
  if (roll <= 110) return "em uma mansão";
  return "em um palácio ou castelo";
}

function childhoodMemory(total: number): string {
  if (total <= 3) return "Ainda sou assombrado pela infância, quando os outros me tratavam mal.";
  if (total <= 5) return "Passei a maior parte da infância sozinho, sem amigos próximos.";
  if (total <= 8) return "Os outros me viam como diferente ou estranho, e eu tive poucos companheiros.";
  if (total <= 12) return "Tive alguns amigos próximos e vivi uma infância comum.";
  if (total <= 15) return "Tive vários amigos, e a infância foi em geral feliz.";
  if (total <= 17) return "Sempre foi fácil fazer amigos, e eu adorava estar com pessoas.";
  return "Todos sabiam quem eu era, e eu tinha amigos em todo lugar.";
}

const BACKGROUND_REASONS: Record<string, string[]> = {
  acolyte: [
    "Fugi de casa cedo e encontrei refúgio em um templo.",
    "Minha família me entregou a um templo, incapaz ou indisposta a cuidar de mim.",
    "Cresci em lar de forte fé religiosa; servir aos deuses pareceu natural.",
    "Um sermão apaixonado tocou minha alma e me moveu a servir a fé.",
    "Segui um amigo de infância, conhecido ou alguém que amei para o serviço religioso.",
    "Após encontrar um verdadeiro servo dos deuses, fui inspirado a entrar em um grupo religioso.",
  ],
  charlatan: [
    "Fui deixado à própria sorte, e meu talento para manipular ajudou-me a sobreviver.",
    "Aprendi cedo que as pessoas são crédulas e fáceis de explorar.",
    "Sempre me metia em encrenca, mas conseguia falar meu caminho para fora.",
    "Juntei-me a um golpista de quem aprendi o ofício.",
    "Depois que um charlatão enganou minha família, aprendi o ofício para nunca mais ser enganado.",
    "Era pobre ou temia a pobreza, então aprendi os truques para me manter fora dela.",
  ],
  criminal: [
    "Ressentia a autoridade e vi o crime como forma de lutar contra tirania.",
    "A necessidade me forçou: era a única forma de sobreviver.",
    "Caí com um bando de malfeitores e aprendi minha especialidade com eles.",
    "Um parente me ensinou a especialidade criminal como negócio de família.",
    "Saí de casa e encontrei lugar em uma guilda de ladrões ou organização criminosa.",
    "Estava sempre entediado; o crime passou o tempo e descobri que era bom nisso.",
  ],
  entertainer: [
    "Membros da família se sustentavam com apresentações; segui o exemplo.",
    "Sempre tive insight sobre as pessoas — o bastante para fazê-las rir ou chorar.",
    "Fugi de casa para seguir uma trupe de menestréis.",
    "Vi um bardo se apresentar e soube na hora o que nascera para fazer.",
    "Ganhava moedas nas esquinas e eventualmente fiz nome.",
    "Um artista itinerante me acolheu e me ensinou o ofício.",
  ],
  "folk-hero": [
    "Aprendi o certo e o errado com minha família.",
    "Sempre fui encantado por contos de heróis e quis ser mais do que comum.",
    "Odiava a vida mundana; quando alguém precisou dar um passo à frente, eu dei.",
    "Um parente aventureiro me inspirou com sua coragem.",
    "Um eremita louco profetizou em meu nascimento que eu faria grandes feitos.",
    "Sempre defendi os mais fracos do que eu.",
  ],
  "guild-artisan": [
    "Fui aprendiz de um mestre que me ensinou o ofício da guilda.",
    "Ajudei um artesão a guardar um segredo ou concluir uma tarefa e fui tomado como aprendiz.",
    "Um parente na guilda me abriu espaço.",
    "Sempre fui bom com as mãos e aproveitei a chance de aprender um ofício.",
    "Queria fugir da situação em casa e começar vida nova.",
    "Aprendi o essencial com um mentor, mas precisei entrar na guilda para terminar o treinamento.",
  ],
  hermit: [
    "Inimigos arruinaram minha reputação; fugi para o ermo.",
    "Sinto-me bem isolado; busco paz interior.",
    "Nunca gostei das pessoas que chamava de amigos; foi fácil seguir sozinho.",
    "Senti-me obrigado a abandonar o passado — com relutância, e às vezes me arrependo.",
    "Perdi tudo — lar, família, amigos. Seguir sozinho era tudo o que restava.",
    "A decadência da sociedade me enjoou; decidi deixá-la para trás.",
  ],
  noble: [
    "Venho de família antiga e ilustre; coube a mim preservar o nome.",
    "Minha família foi desonrada, e pretendo limpar nosso nome.",
    "A família recentemente ganhou o título, e isso nos lançou a um mundo novo.",
    "Temos título, mas nenhum ancestral se distinguiu desde então.",
    "A família está cheia de pessoas notáveis; espero estar à altura.",
    "Espero aumentar o poder e a influência da família.",
  ],
  outlander: [
    "Passei muito tempo na natureza quando jovem e passei a amar esse modo de vida.",
    "Desde cedo não suportava o fedor das cidades e preferia a natureza.",
    "Compreendi a escuridão que espreita no ermo e jurei combatê-la.",
    "Meu povo vivia na margem da civilização; aprendi sobrevivência com a família.",
    "Após uma tragédia, retirei-me para a natureza, deixando a vida antiga.",
    "A família se afastou da civilização, e aprendi a me adaptar.",
  ],
  sage: [
    "Era naturalmente curioso; fui à universidade aprender mais sobre o mundo.",
    "Os ensinamentos de meu mentor abriram minha mente a novas possibilidades.",
    "Sempre fui leitor voraz e aprendi sozinho sobre meu tema favorito.",
    "Descobri uma biblioteca antiga; aquilo despertou fome por mais conhecimento.",
    "Impressionei um mago que disse que eu desperdiçava talentos e deveria estudar.",
    "Um parente me deu educação básica que aguçou o apetite; saí para construir sobre isso.",
  ],
  sailor: [
    "Fui forçado por piratas a servir até finalmente escapar.",
    "Queria ver o mundo; embarquei como marinheiro em navio mercante.",
    "Um parente marinheiro me levou ao mar.",
    "Precisei fugir da comunidade; escondi-me em um navio e fui obrigado a trabalhar.",
    "Saqueadores atacaram minha comunidade; encontrei refúgio em um navio até poder me vingar.",
    "Tinha poucas perspectivas onde vivia; parti para buscar fortuna.",
  ],
  soldier: [
    "Entrei na milícia para proteger minha comunidade de monstros.",
    "Um parente era soldado; quis continuar a tradição familiar.",
    "O senhor local me forçou a alistar-me.",
    "A guerra devastou minha terra natal; lutar era a única vida que conhecia.",
    "Queria fama e fortuna; juntei-me a uma companhia mercenária.",
    "Invasores atacaram minha pátria; era meu dever pegar em armas.",
  ],
  urchin: [
    "A sede de viajar fez-me deixar a família; cuido de mim mesmo.",
    "Fugi de uma situação ruim em casa e me virei sozinho.",
    "Monstros destruíram minha aldeia; fui o único sobrevivente.",
    "Um ladrão notório cuidou de mim e de outros órfãos; espionávamos e roubávamos para viver.",
    "Um dia acordei nas ruas, sozinho e faminto, sem memória da infância.",
    "Meus pais morreram; ninguém cuidou de mim. Eu me criei.",
  ],
};

const CLASS_TRAINING: Record<string, string[]> = {
  barbarian: [
    "Minha devoção ao povo elevou-me em batalha, tornando-me poderoso e perigoso.",
    "Os espíritos dos ancestrais me chamaram a cumprir uma grande tarefa.",
    "Perdi o controle em combate um dia, como se outra força movesse meu corpo.",
    "Em jornada espiritual, encontrei um animal-espírito para guiar e inspirar.",
    "Fui atingido por um raio e sobrevivi; depois, descobri força além dos limites.",
    "Minha raiva precisava ser canalizada em batalha, ou eu me tornaria um assassino indiscriminado.",
  ],
  bard: [
    "Despertei habilidades bárdicas latentes por tentativa e erro.",
    "Era um performer talentoso e atraí a atenção de um mestre bardo.",
    "Juntei-me a uma sociedade solta de eruditos e oradores para aprender técnicas.",
    "Senti o chamado de contar feitos de campeões em canção e história.",
    "Entrei em um dos grandes colégios para aprender lore, magia e performance.",
    "Peguei um instrumento um dia e descobri instantaneamente que sabia tocá-lo.",
  ],
  cleric: [
    "Um ser sobrenatural a serviço dos deuses me chamou a ser agente divino.",
    "Vi injustiça e horror no mundo e senti-me movido a tomar posição.",
    "Meu deus deu um sinal inconfundível; larguei tudo para servir.",
    "Sempre fui devoto, mas só após uma peregrinação soube meu chamado verdadeiro.",
    "Servia na burocracia da religião, mas precisei trabalhar no mundo.",
    "Percebo que meu deus age através de mim; faço o que me mandam, mesmo sem saber por quê.",
  ],
  druid: [
    "Vi demais devastação na natureza; entrei em um círculo para combater os inimigos dela.",
    "Encontrei lugar entre druidas depois de fugir de uma catástrofe.",
    "Sempre tive afinidade com animais; explorei o talento para usá-lo melhor.",
    "Fiz amizade com um druida e fui movido pelos ensinamentos; segui a orientação.",
    "Crescendo, via espíritos que ninguém mais via; busquei druidas para compreender.",
    "Sempre senti nojo de criaturas de origem antinatural; tornei-me campeão da ordem natural.",
  ],
  fighter: [
    "Quis afiar minhas habilidades de combate e entrei em uma academia de guerra.",
    "Fui escudeiro de um cavaleiro que me ensinou a lutar, cuidar de montaria e honra.",
    "Monstros terríveis atacaram minha comunidade e mataram alguém que amava; peguei em armas.",
    "Entrei no exército e aprendi a lutar em grupo.",
    "Cresci lutando e refinei o talento defendendo-me de quem me atravessava.",
    "Sempre pude pegar quase qualquer arma e saber usá-la com eficácia.",
  ],
  monk: [
    "Fui escolhido para estudar em mosteiro isolado e aprender técnicas fundamentais.",
    "Busquei instrução para compreender melhor a existência e meu lugar no mundo.",
    "Caí em portal para o Plano das Sombras e me refugiei em um mosteiro estranho.",
    "Fui oprimido pela dor após perder alguém próximo e busquei filósofos.",
    "Sentia um poder especial em mim; busquei quem pudesse ajudá-lo a aflorar.",
    "Era selvagem e indisciplinado; apliquei-me a um mosteiro para viver com disciplina.",
  ],
  paladin: [
    "Um ser fantástico apareceu e me chamou a uma missão sagrada.",
    "Um ancestral deixou uma missão santa incompleta; pretendo terminá-la.",
    "O mundo é escuro; decidi ser um farol contra as sombras.",
    "Fui escudeiro de um paladino e aprendi o necessário para prestar meu próprio juramento.",
    "O mal deve ser oposto em todas as frentes; sinto-me compelido a purgá-lo.",
    "Tornar-me paladino foi consequência natural da fé; tornei-me a espada santa da religião.",
  ],
  ranger: [
    "Encontrei propósito ao caçar animais perigosos na margem da civilização.",
    "Sempre tive jeito com animais — uma palavra e um toque os acalmavam.",
    "Sofro de terrível desejo de viajar; ser patrulheiro me dá razão para não ficar parado.",
    "Vi o que acontece quando monstros saem da escuridão; tornei-me primeira linha de defesa.",
    "Conheci um patrulheiro experiente que me ensinou o ofício e segredos do ermo.",
    "Servi no exército, abrindo trilhas e reconhecendo acampamentos inimigos.",
  ],
  rogue: [
    "Sempre fui ágil e esperto; decidi usar esses talentos para me virar no mundo.",
    "Um assassino ou ladrão me prejudicou; foquei em dominar as habilidades do inimigo.",
    "Um ladino experiente viu algo em mim e me ensinou truques úteis.",
    "Decidi transformar minha sorte natural em carreira — ainda melhorando as perícias.",
    "Juntei-me a rufiões que me mostraram como obter o que quero com astúcia.",
    "Sou fraco por bijuterias brilhantes ou um saco de moedas — se puder pegá-los sem risco extremo.",
  ],
  sorcerer: [
    "Ao nascer, a água da casa congelou, o leite azedou ou o ferro virou cobre — presságio.",
    "Sofri tensão emocional ou física terrível que despertou poder mágico latente.",
    "A família nunca falava dos ancestrais; só quando mostrei talentos estranhos a verdade veio.",
    "Quando um monstro ameaçou um amigo, reagi por instinto e soltei força de dentro de mim.",
    "Um estranho, sentindo algo especial, me ensinou a controlar o dom.",
    "Após escapar de um incêndio mágico, notei que saí ileso mas mudado; comecei a exibir poderes.",
  ],
  warlock: [
    "Em lugar proibido, encontrei um ser de outro mundo que ofereceu um pacto.",
    "Examinava um tomo estranho quando a entidade que viria a ser meu patrono apareceu.",
    "Caí nas garras do patrono após atravessar uma porta mágica por acidente.",
    "Em crise terrível, rezei a qualquer ser que ouvisse; quem respondeu tornou-se meu patrono.",
    "Meu futuro patrono visitou-me em sonhos e ofereceu poder em troca de serviço.",
    "Um ancestral tinha pacto com meu patrono; a entidade decidiu me prender ao mesmo acordo.",
  ],
  wizard: [
    "Um mago velho me escolheu entre vários candidatos para um aprendizado.",
    "Perdido na floresta, um mago de cerca me acolheu e ensinou o rudimento da magia.",
    "Cresci ouvindo contos de grandes magos; esforcei-me e fui aceito numa academia.",
    "Um parente mago decidiu que eu era inteligente o bastante para aprender o ofício.",
    "Explorando tumba, biblioteca ou templo, achei um grimório e quis aprender a ser mago.",
    "Fui prodígio das artes arcanas cedo; quando pude, parti para expandir meu poder.",
  ],
  artificer: [
    "Sempre desmontava e remontava coisas; um mentor reconheceu o talento inventivo.",
    "Um acidente com dispositivos mágicos despertou minha fascinação por engenharia arcana.",
    "Entrei em uma guilda de artesãos e descobri que a magia podia fluir pelas minhas criações.",
    "Precisei improvisar ferramentas sob pressão e descobri um knack para infundi-las com poder.",
    "Estudei sob um artífice que me mostrou como a ciência e a magia se entrelaçam.",
    "Uma herança familiar — um dispositivo quebrado — tornou-se minha obsessão e meu caminho.",
  ],
};

function resolveLifeEvent(): string {
  const roll = d100();
  if (roll <= 10) return `Sofri uma tragédia: ${pick([
    "Um familiar ou amigo próximo morreu.",
    "Uma amizade terminou amargamente; a outra pessoa agora me é hostil.",
    "Perdi todas as posses em um desastre e tive de reconstruir a vida.",
    "Fui preso por crime que não cometi e passei anos em trabalhos forçados.",
    "A guerra devastou minha comunidade.",
    "Um amor desapareceu sem rastros; ainda procuro essa pessoa.",
    "Uma praga fez as colheitas falharem; perdi um irmão ou parente.",
    "Fiz algo que trouxe vergonha terrível aos olhos da família.",
    "Fui exilado da comunidade sem me dizerem o motivo.",
    "Um relacionamento romântico terminou.",
    "Um parceiro romântico atual ou prospectivo morreu.",
  ])}`;
  if (roll <= 20) return `Tive um pouco de boa fortuna: ${pick([
    "Um mago amigável me deu um pergaminho de magia com um truque.",
    "Salvei a vida de um plebeu, que agora me deve uma dívida de vida.",
    "Encontrei um cavalo de montaria.",
    "Encontrei algum dinheiro extra.",
    "Um parente me legou uma arma simples.",
    "Encontrei algo interessante — um trinket adicional.",
    "Prestei serviço a um templo local; na próxima visita posso receber cura.",
    "Um alquimista amigável me presenteou com uma poção de cura.",
    "Encontrei um mapa do tesouro.",
    "Um parente distante deixou uma pensão que me permite viver confortavelmente por um tempo.",
  ])}`;
  if (roll <= 30) return "Me apaixonei ou me casei (ou, se já tive este evento, talvez tenha tido um filho).";
  if (roll <= 40) return "Fiz um inimigo de um aventureiro. Trabalhe com o mestre a identidade e o perigo.";
  if (roll <= 50) return "Fiz um amigo aventureiro. Detalhe com o mestre como a amizade começou.";
  if (roll <= 70) return "Passei tempo trabalhando em ofício ligado ao meu antecedente (comece com 2d6 PO extras, se a mesa permitir).";
  if (roll <= 75) return "Conheci alguém importante. Detalhe com o mestre quem é e como se sente a meu respeito.";
  if (roll <= 80) {
    return `Fui a uma aventura: ${pick([
      "Quase morri — carrego cicatrizes e talvez falte um dedo ou orelha.",
      "Sofri ferimento grave que ainda dói de vez em quando.",
      "Fui ferido, mas me recuperei por completo.",
      "Contrai doença em um covil imundo; fiquei com tosse, marcas na pele ou cabelos grisalhos.",
      "Fui envenenado por armadilha ou monstro; na próxima salvaguarda contra veneno, tenho desvantagem (sabor).",
      "Perdi algo sentimental durante a aventura.",
      "Fiquei aterrorizado e fugi, abandonando companheiros.",
      "Aprendi muito — vantagem no próximo teste ou salvaguarda (sabor de mesa).",
      "Encontrei tesouro; restam-me algumas peças de ouro da minha parte.",
      "Encontrei tesouro considerável.",
      "Encontrei um item mágico comum (à escolha do mestre).",
    ])}`;
  }
  if (roll <= 85) {
    return `Tive experiência sobrenatural: ${pick([
      "Fui enfeitiçado por uma fada e escravizado por anos até escapar.",
      "Vi um demônio e fugi antes que pudesse fazer algo.",
      "Um diabo me tentou.",
      "Acordei a quilômetros de casa, sem ideia de como cheguei lá.",
      "Visitei um local sagrado e senti a presença divina.",
      "Testemunhei uma estrela vermelha caindo ou outro presságio.",
      "Escapei da morte certa e creio que um deus interveio.",
      "Testemunhei um pequeno milagre.",
      "Explorei uma casa vazia e descobri que era assombrada.",
      "Fui brevemente possuído.",
      "Vi um fantasma.",
      "Vi um carniçal se alimentando de um cadáver.",
      "Um celestial ou demônio visitou-me em sonhos com um aviso.",
      "Visitei brevemente o Plano Feérico ou o das Sombras.",
      "Vi um portal que creio levar a outro plano.",
    ])}`;
  }
  if (roll <= 90) {
    return `Lutei em uma batalha: ${pick([
      "Fui nocauteado e deixado por morto; acordei sem memória da luta.",
      "Fui gravemente ferido e ainda carrego cicatrizes terríveis.",
      "Fugi da batalha para salvar a vida — e ainda sinto vergonha.",
      "Sofri só ferimentos menores que cicatrizaram sem marcas.",
      "Sobrevivi, mas tenho pesadelos terríveis em que revivo a experiência.",
      "Escapei ileso, embora muitos amigos tenham sido feridos ou perdidos.",
      "Comportei-me bem e sou lembrado como herói.",
    ])}`;
  }
  if (roll <= 95) {
    return `Cometi um crime ou fui acusado injustamente (${pick([
      "assassinato",
      "furto",
      "arrombamento",
      "agressão",
      "contrabando",
      "sequestro",
      "extorsão",
      "falsificação",
    ])}): ${pick([
      "Não cometi o crime e fui inocentado após a acusação.",
      "Cometi ou ajudei, mas as autoridades me acharam inocente.",
      "Quase fui pego; fugi e sou procurado na comunidade.",
      "Fui condenado e servi anos de prisão ou trabalhos forçados (ou escapei).",
    ])}`;
  }
  if (roll <= 99) {
    return `Encontrei algo mágico: ${pick([
      "Fui enfeitiçado ou amedrontado por uma magia.",
      "Fui ferido pelo efeito de uma magia.",
      "Testemunhei uma magia poderosa sendo conjurada.",
      "Bebi uma poção.",
      "Achei um pergaminho e consegui conjurar a magia.",
      "Fui afetado por magia de teleporte.",
      "Fiquei invisível por um tempo.",
      "Identifiquei uma ilusão pelo que era.",
      "Vi uma criatura sendo conjurada.",
      "Minha fortuna foi lida por um adivinho.",
    ])}`;
  }
  return `Algo verdadeiramente estranho: ${pick([
    "Fui transformado em sapo por semanas.",
    "Fui petrificado até alguém me libertar.",
    "Fui escravizado por uma bruxa, sátiro ou outro ser por anos.",
    "Um dragão me manteve prisioneiro até aventureiros o matarem.",
    "Fui cativo de humanoides malignos no Subterrâneo até escapar.",
    "Servi um aventureiro poderoso como ajudante; só recentemente saí desse serviço.",
    "Enlouqueci por anos e recuperei a sanidade; um tique talvez permaneça.",
    "Um amor meu era secretamente um dragão de prata.",
    "Fui capturado por um culto e quase sacrificado; escapei, mas temo que me encontrem.",
    "Encontrei um semideus, arquidiabo, arquifada, senhor demoníaco ou titã — e vivi para contar.",
    "Fui engolido por um peixe gigante e passei um mês no estômago até escapar.",
    "Um ser poderoso me concedeu um Desejo, mas eu o desperdicei em algo frívolo.",
  ])}`;
}

function siblingCount(raceId?: string): number {
  let roll = d(10);
  if (raceId === "dwarf" || raceId === "elf") roll = Math.max(1, roll - 2);
  if (roll <= 2) return 0;
  if (roll <= 4) return rollDiceExpr("1d3");
  if (roll <= 6) return rollDiceExpr("1d4") + 1;
  if (roll <= 8) return rollDiceExpr("1d6") + 2;
  return rollDiceExpr("1d8") + 3;
}

/**
 * Gera um bloco de texto PT-BR com origem, decisões e eventos (XGtE).
 */
export function generateLifePathText(input: LifePathInput = {}): string {
  const lines: string[] = [];
  lines.push("— Essa é Sua Vida (Guia de Xanathar) —");
  lines.push("");

  lines.push(`Origem: ${pickWeighted([...PARENTS])}`);
  const birth = pickWeighted([...BIRTHPLACE]);
  lines.push(`Nasci ${birth}.`);
  if (d100() === 100) {
    lines.push(
      "Um evento estranho coincidiu com meu nascimento (lua vermelha, leite azedando, etc.).",
    );
  }

  const sibs = siblingCount(input.raceId);
  if (sibs === 0) lines.push("Não tenho irmãos.");
  else lines.push(`Tenho ${sibs} irmão(s)/irmã(s).`);

  const family = pickWeighted([...FAMILY]);
  lines.push(`Fui criado por: ${family}.`);
  if (
    family.includes("solteiro") ||
    family.includes("solteira") ||
    family.includes("adotiva") ||
    family.includes("ninguém") ||
    family.includes("instituição") ||
    family.includes("orfanato") ||
    family.includes("guardião") ||
    family.includes("templo") ||
    family.includes("tia") ||
    family.includes("avós")
  ) {
    if (d(2) === 1) lines.push(`Sobre um dos pais: ${pick(ABSENT_PARENT)}`);
  }

  const lifeRoll = d(6) + d(6) + d(6);
  const lifestyle = LIFESTYLE.find((l) => lifeRoll <= l.max) ?? LIFESTYLE[LIFESTYLE.length - 1]!;
  const homeRoll = d100() + lifestyle.mod;
  lines.push(
    `Estilo de vida da família: ${lifestyle.label}. Lar da infância: ${childhoodHome(homeRoll)}.`,
  );

  const cha = input.chaMod ?? 0;
  const memTotal = d(6) + d(6) + d(6) + cha;
  lines.push(`Memórias da infância: ${childhoodMemory(memTotal)}`);

  if (input.backgroundId && BACKGROUND_REASONS[input.backgroundId]) {
    lines.push("");
    lines.push(
      `Antecedente: ${pick(BACKGROUND_REASONS[input.backgroundId]!)}`,
    );
  }

  if (input.classId && CLASS_TRAINING[input.classId]) {
    lines.push(`Treinamento de classe: ${pick(CLASS_TRAINING[input.classId]!)}`);
  }

  const ageBand = pickWeighted([
    { max: 20, value: 1 },
    { max: 59, value: rollDiceExpr("1d4") },
    { max: 69, value: rollDiceExpr("1d6") },
    { max: 89, value: rollDiceExpr("1d8") },
    { max: 99, value: rollDiceExpr("1d10") },
    { max: 100, value: rollDiceExpr("1d12") },
  ]);
  const eventCount = Math.max(1, ageBand);
  lines.push("");
  lines.push(`Eventos de vida (${eventCount}):`);
  for (let i = 0; i < eventCount; i++) {
    lines.push(`${i + 1}. ${resolveLifeEvent()}`);
  }

  lines.push("");
  lines.push(
    "(Texto gerado para inspiração de roleplay — ajuste ou ignore o que não servir.)",
  );
  return lines.join("\n");
}
