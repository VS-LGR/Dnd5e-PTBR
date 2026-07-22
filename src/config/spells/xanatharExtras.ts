import type { SpellDefinition, SpellSchool, ContentSource } from "@/config/types";

function sp(partial: {
  id: string;
  name: string;
  level: number;
  school: SpellSchool;
  castingTime?: string;
  range?: string;
  v?: boolean;
  s?: boolean;
  m?: string | null;
  duration?: string;
  concentration?: boolean;
  ritual?: boolean;
  description: string;
  higherLevels?: string;
}): SpellDefinition {
  return {
    id: partial.id,
    name: partial.name,
    level: partial.level,
    school: partial.school,
    ritual: partial.ritual ?? false,
    castingTime: partial.castingTime ?? "1 ação",
    range: partial.range ?? "18 metros",
    components: {
      v: partial.v ?? true,
      s: partial.s ?? true,
      m: partial.m === undefined ? null : partial.m,
    },
    duration: partial.duration ?? "Instantânea",
    concentration: partial.concentration ?? false,
    description: partial.description,
    higherLevels: partial.higherLevels,
    source: "xgte" as ContentSource,
  };
}

/**
 * Magias do Guia de Xanathar ausentes do catálogo base / Artífice.
 * IDs já presentes em artificerExtras (absorb-elements, catapult, etc.) não são redefinidos aqui.
 */
export const XANATHAR_EXTRA_SPELLS: SpellDefinition[] = [
  // Truques
  sp({
    id: "control-flames",
    name: "Controlar Chamas",
    level: 0,
    school: "transmutation",
    range: "18 metros",
    description:
      "Você escolhe uma chama não mágica que possa ver numa área de até 1,5 m cúbico e a expande, extingue, muda de cor/forma ou faz surgir formas simples nela.",
  }),
  sp({
    id: "gust",
    name: "Lufada",
    level: 0,
    school: "transmutation",
    range: "9 metros",
    description:
      "Você cria uma rajada de vento: empurra uma criatura Média ou menor (Força CD), empurra um objeto solto até 1,5 kg, ou cria um efeito sensorial de vento.",
  }),
  sp({
    id: "mold-earth",
    name: "Moldar Terra",
    level: 0,
    school: "transmutation",
    range: "9 metros",
    description:
      "Você escolhe uma porção de terra ou pedra de até 1,5 m cúbico: escava, move, cria formas ou torna terreno difícil (até duas áreas).",
  }),
  sp({
    id: "shape-water",
    name: "Moldar Água",
    level: 0,
    school: "transmutation",
    range: "9 metros",
    description:
      "Você manipula água numa área de até 1,5 m cúbico: move, forma, muda cor/opacidade ou congela (se não houver criaturas nela).",
  }),
  sp({
    id: "word-of-radiance",
    name: "Palavra do Esplendor",
    level: 0,
    school: "evocation",
    range: "1,5 metro",
    m: "um símbolo sagrado",
    description:
      "Criaturas à sua escolha a até 1,5 m devem fazer salvaguarda de Constituição ou sofrer 1d6 de dano radiante (aumenta nos níveis 5, 11 e 17).",
  }),
  sp({
    id: "primal-savagery",
    name: "Selvageria Primitiva",
    level: 0,
    school: "transmutation",
    range: "Pessoal",
    description:
      "Suas mãos ou dentes se tornam armas naturais; faz um ataque de magia corpo a corpo que causa 1d10 de ácido (aumenta nos níveis 5, 11 e 17).",
  }),
  sp({
    id: "infestation",
    name: "Infestação",
    level: 0,
    school: "conjuration",
    range: "9 metros",
    m: "uma pulga viva",
    description:
      "Você faz um ataque de magia; no acerto, o alvo sofre 1d6 de veneno e se move 1,5 m em direção aleatória se falhar em Constituição (dano aumenta nos níveis 5, 11 e 17).",
  }),
  sp({
    id: "toll-the-dead",
    name: "Soar os Mortos",
    level: 0,
    school: "necromancy",
    range: "18 metros",
    description:
      "O alvo deve fazer salvaguarda de Sabedoria ou sofrer 1d8 de dano necrótico (1d12 se já estiver ferido). O dano aumenta nos níveis 5, 11 e 17.",
  }),
  sp({
    id: "mind-sliver",
    name: "Estilhaço Mental",
    level: 0,
    school: "enchantment",
    range: "18 metros",
    description:
      "O alvo faz salvaguarda de Inteligência ou sofre 1d6 de dano psíquico e subtrai 1d4 da próxima salvaguarda antes do fim do seu próximo turno. Dano aumenta nos níveis 5, 11 e 17.",
  }),

  // 1º círculo
  sp({
    id: "chaos-bolt",
    name: "Raio do Caos",
    level: 1,
    school: "evocation",
    range: "36 metros",
    description:
      "Faça um ataque de magia à distância. No acerto, role 2d8 + 1d6: o d6 determina o tipo de dano; se os d8 forem iguais, o raio salta para outro alvo a até 9 m.",
    higherLevels: "Ao usar espaço de 2º ou superior, +1d6 de dano por nível acima do 1º.",
  }),
  sp({
    id: "earth-tremor",
    name: "Tremor de Terra",
    level: 1,
    school: "evocation",
    range: "Pessoal (3 m)",
    description:
      "Cada criatura além de você a até 3 m deve fazer salvaguarda de Destreza ou sofrer 1d6 de dano contundente e cair no chão. O solo se torna terreno difícil até ser limpo.",
    higherLevels: "+1d6 de dano por nível acima do 1º.",
  }),
  sp({
    id: "ice-knife",
    name: "Faca de Gelo",
    level: 1,
    school: "conjuration",
    range: "18 metros",
    m: "uma gota de água ou um pedaço de gelo",
    description:
      "Faça um ataque de magia à distância. No acerto, 1d10 de perfurante. A faca explode: criaturas a 1,5 m (incluindo o alvo) fazem Destreza ou sofrem 2d6 de frio.",
    higherLevels: "+1d6 de frio por nível acima do 1º.",
  }),
  sp({
    id: "zephyr-strike",
    name: "Golpe de Zephyr",
    level: 1,
    school: "transmutation",
    duration: "Até 1 minuto",
    concentration: true,
    description:
      "Seu movimento não provoca ataques de oportunidade. Uma vez antes da magia acabar, ao acertar com ataque de arma, causa +1d8 de força, vantagem no ataque, e seu deslocamento aumenta 9 m até o fim do turno.",
  }),
  sp({
    id: "beast-bond",
    name: "Vínculo com a Besta",
    level: 1,
    school: "divination",
    range: "Toque",
    duration: "Até 10 minutos",
    concentration: true,
    m: "um pedaço de pele embrulhado em pano",
    description:
      "Você estabelece um vínculo telepático com uma fera amigável que possa ver. Enquanto ambos estiverem conscientes, pode se comunicar telepaticamente a até 18 m; a fera tem vantagem em ataques contra criaturas a 1,5 m de você.",
  }),
  sp({
    id: "cause-fear",
    name: "Causar Medo",
    level: 1,
    school: "necromancy",
    range: "18 metros",
    duration: "Até 1 minuto",
    concentration: true,
    description:
      "Uma criatura que você possa ver deve fazer salvaguarda de Sabedoria ou ficar amedrontada de você até a magia acabar. Pode repetir a salvaguarda no fim de cada turno.",
    higherLevels: "Alvo adicional a até 9 m do primeiro por nível acima do 1º.",
  }),
  sp({
    id: "ceremony",
    name: "Cerimônia",
    level: 1,
    school: "abjuration",
    ritual: true,
    castingTime: "1 hora",
    range: "Toque",
    m: "25 PO em pó de ervas consumido",
    description:
      "Você realiza um rito religioso: Expiação, Bênção, Voto de Chegada, Funeral, Investidura, Casamento ou Rito de Passagem, cada um com benefícios descritos no XGtE.",
  }),

  // 2º
  sp({
    id: "shadow-blade",
    name: "Lâmina Sombria",
    level: 2,
    school: "illusion",
    duration: "Até 1 minuto",
    concentration: true,
    description:
      "Você cria uma espada de sombra na mão livre (arma simples corpo a corpo, acuidade, arremesso 6/18 m, 2d8 psíquico). Vantagem nos ataques se você estiver em penumbra ou escuridão.",
    higherLevels: "3d8 (3º–4º), 4d8 (5º–6º), 5d8 (7º+).",
  }),
  sp({
    id: "mind-spike",
    name: "Espinho Mental",
    level: 2,
    school: "divination",
    range: "18 metros",
    duration: "Até 1 hora",
    concentration: true,
    description:
      "O alvo faz salvaguarda de Sabedoria ou sofre 3d8 de dano psíquico; você conhece a localização dele enquanto a magia durar, mesmo se estiver invisível ou escondido.",
    higherLevels: "+1d8 por nível acima do 2º.",
  }),
  sp({
    id: "dragon-breath",
    name: "Bafo de Dragão",
    level: 2,
    school: "transmutation",
    range: "Toque",
    duration: "Até 1 minuto",
    concentration: true,
    m: "uma pimenta chili",
    description:
      "A criatura tocada pode usar uma ação para exalar ácido, frio, fogo, relâmpago ou veneno numa linha de 4,5 m ou cone de 4,5 m (Destreza, 3d6, metade no sucesso).",
    higherLevels: "+1d6 por nível acima do 2º.",
  }),
  sp({
    id: "dust-devil",
    name: "Diabo da Poeira",
    level: 2,
    school: "conjuration",
    range: "18 metros",
    duration: "Até 1 minuto",
    concentration: true,
    m: "um pouco de pó",
    description:
      "Você cria um redemoinho de 1,5×3 m. Criaturas que o iniciem no espaço ou sejam empurradas para ele fazem Força ou sofrem 1d8 de contundente e são empurradas 3 m. Você pode mover o diabo 9 m como ação bônus.",
    higherLevels: "+1d8 por nível acima do 2º.",
  }),
  sp({
    id: "earthbind",
    name: "Prender à Terra",
    level: 2,
    school: "transmutation",
    range: "90 metros",
    duration: "Até 1 minuto",
    concentration: true,
    description:
      "Uma criatura que você possa ver faz salvaguarda de Força. Na falha, seu deslocamento de voo (se houver) é reduzido a 0 por 1 minuto; se estiver voando, desce 18 m por turno até pousar.",
  }),
  sp({
    id: "healing-spirit",
    name: "Espírito Curativo",
    level: 2,
    school: "conjuration",
    range: "18 metros",
    duration: "Até 1 minuto",
    concentration: true,
    description:
      "Você invoca um espírito intangível em um espaço de 1,5 m. Quando você ou uma criatura move-se para o espaço pela primeira vez no turno ou inicia o turno lá, pode recuperar 1d6 PV (número de cura = 1 + modificador de conjuração).",
    higherLevels: "+1d6 de cura e +1 uso por nível acima do 2º.",
  }),
  sp({
    id: "snillocs-snowball-swarm",
    name: "Chuva de Bolas de Neve de Snilloc",
    level: 2,
    school: "evocation",
    range: "27 metros",
    m: "um pedaço de gelo ou uma pequena pedra branca",
    description:
      "Uma rajada de bolas de neve explode num raio de 1,5 m. Cada criatura na área faz Destreza ou sofre 3d6 de frio (metade no sucesso).",
    higherLevels: "+1d6 por nível acima do 2º.",
  }),
  sp({
    id: "warding-wind",
    name: "Vento Protetor",
    level: 2,
    school: "evocation",
    range: "Pessoal",
    duration: "Até 10 minutos",
    concentration: true,
    description:
      "Ventos fortes giram a 3 m de você: terreno difícil para outros, sons abafados, proteção contra gases, desvantagem em ataques à distância contra você, e chama aberta é apagada.",
  }),
  sp({
    id: "aganazzars-scorcher",
    name: "Queimadura de Aganazzar",
    level: 2,
    school: "evocation",
    range: "9 metros (linha)",
    m: "uma escama de dragão vermelho",
    description:
      "Uma linha de fogo de 9×1,5 m. Cada criatura na linha faz Destreza ou sofre 3d8 de fogo (metade no sucesso).",
    higherLevels: "+1d8 por nível acima do 2º.",
  }),

  // 3º
  sp({
    id: "enemies-abound",
    name: "Infestar de Inimigos",
    level: 3,
    school: "enchantment",
    range: "36 metros",
    duration: "Até 1 minuto",
    concentration: true,
    description:
      "Uma criatura faz salvaguarda de Inteligência. Na falha, vê todos como inimigos; deve escolher alvos aleatoriamente e usar oportunidade contra qualquer um que se mova para fora do alcance.",
  }),
  sp({
    id: "erupting-earth",
    name: "Erupção de Terra",
    level: 3,
    school: "transmutation",
    range: "36 metros",
    m: "um pedaço de obsidiana",
    description:
      "Terra explode num cubo de 6 m. Criaturas fazem Destreza ou sofrem 3d12 de contundente (metade no sucesso). A área se torna terreno difícil.",
    higherLevels: "+1d12 por nível acima do 3º.",
  }),
  sp({
    id: "flame-arrows",
    name: "Flechas Flamejantes",
    level: 3,
    school: "transmutation",
    range: "Toque",
    duration: "Até 1 hora",
    concentration: true,
    m: "um pouco de alcatrão",
    description:
      "Você toca uma aljava com até 12 flechas/projéteis. Quando um é usado num ataque à distância, causa +1d6 de fogo.",
    higherLevels: "+2 projéteis por nível acima do 3º.",
  }),
  sp({
    id: "life-transference",
    name: "Transferência de Vida",
    level: 3,
    school: "necromancy",
    range: "9 metros",
    description:
      "Você sofre 4d8 de dano necrótico, e uma criatura a até 9 m recupera o dobro desse valor em PV.",
    higherLevels: "+1d8 de dano (e cura) por nível acima do 3º.",
  }),
  sp({
    id: "summon-lesser-demons",
    name: "Invocar Demônios Menores",
    level: 3,
    school: "conjuration",
    range: "18 metros",
    duration: "Até 1 hora",
    concentration: true,
    m: "sangue dentro de um frasco de rubi de 600 PO",
    description:
      "Você invoca demônios de CR total limitado. Eles não são amigáveis e atacam os mais próximos; um círculo de sangue pode mantê-los afastados de você.",
  }),
  sp({
    id: "thunder-step",
    name: "Passo Trovejante",
    level: 3,
    school: "conjuration",
    range: "27 metros",
    description:
      "Você teleporta-se até 27 m. Cada criatura a até 3 m do ponto de partida faz Constituição ou sofre 3d10 de trovão (metade no sucesso). Pode levar uma criatura voluntária Média ou menor.",
    higherLevels: "+1d10 por nível acima do 3º.",
  }),
  sp({
    id: "tidal-wave",
    name: "Maremoto",
    level: 3,
    school: "conjuration",
    range: "36 metros",
    m: "um pedaço de madeira",
    description:
      "Uma onda de água de 9×3×3 m varre a área. Criaturas fazem Destreza ou sofrem 4d8 de contundente e caem (metade e não caem no sucesso).",
  }),
  sp({
    id: "wall-of-water",
    name: "Muralha de Água",
    level: 3,
    school: "evocation",
    range: "18 metros",
    duration: "Até 10 minutos",
    concentration: true,
    m: "uma gota de água",
    description:
      "Você cria uma muralha de água de até 9×3×0,3 m. Criaturas atravessando sofrem 2d6 de frio se a muralha for congelada; ataques à distância com arma têm desvantagem; fogo causa metade do dano.",
  }),

  // 4º
  sp({
    id: "charm-monster",
    name: "Enfeitiçar Monstro",
    level: 4,
    school: "enchantment",
    range: "9 metros",
    duration: "1 hora",
    description:
      "Uma criatura faz salvaguarda de Sabedoria (com vantagem se você ou aliados estão lutando com ela) ou fica enfeitiçada por 1 hora.",
    higherLevels: "Alvo adicional por nível acima do 4º.",
  }),
  sp({
    id: "elemental-bane",
    name: "Destruição Elemental",
    level: 4,
    school: "transmutation",
    range: "27 metros",
    duration: "Até 1 minuto",
    concentration: true,
    description:
      "Escolha um tipo de dano elemental. O alvo faz Constituição ou perde resistência a esse dano e sofre +2d6 desse tipo na primeira vez que sofrer esse dano em cada turno.",
    higherLevels: "Alvo adicional por nível acima do 4º.",
  }),
  sp({
    id: "shadow-of-moil",
    name: "Sombra de Transtorno",
    level: 4,
    school: "necromancy",
    range: "36 metros",
    duration: "Até 1 minuto",
    concentration: true,
    m: "cabelo de undead envolto em pano preto",
    description:
      "Chamas sombrias envolvem uma criatura. Ela faz Constituição ou sofre 2d6 necrótico ao iniciar o turno e ilumina com penumbra. Ataques corpo a corpo contra o alvo têm vantagem; quem o acertar sofre 2d6 necrótico.",
  }),
  sp({
    id: "sickening-radiance",
    name: "Resplendor Enjoativo",
    level: 4,
    school: "evocation",
    range: "36 metros",
    duration: "Até 10 minutos",
    concentration: true,
    description:
      "Esfera de 9 m de luz doentia. Criaturas que iniciam o turno na área fazem Constituição ou sofrem 4d10 de radiante, um nível de exaustão e emitem luz fraca; a luz não pode ser removida até um descanso longo.",
  }),
  sp({
    id: "storm-sphere",
    name: "Esfera Tempestuosa",
    level: 4,
    school: "evocation",
    range: "45 metros",
    duration: "Até 1 minuto",
    concentration: true,
    description:
      "Esfera de 6 m de raio de vento e trovão. Criaturas que entram ou iniciam o turno fazem Força ou sofrem 2d6 de contundente. Como ação bônus, dispara relâmpago (ataque de magia, 4d6) contra um alvo na esfera.",
    higherLevels: "+1d6 no relâmpago por nível acima do 4º.",
  }),
  sp({
    id: "vitriolic-sphere",
    name: "Esfera Cáustica",
    level: 4,
    school: "evocation",
    range: "45 metros",
    m: "uma gota de fel de serpente",
    description:
      "Esfera de ácido explode num raio de 6 m. Criaturas fazem Destreza ou sofrem 10d4 de ácido (metade no sucesso) e 5d4 no fim do próximo turno (apenas quem falhou).",
    higherLevels: "+2d4 no dano inicial por nível acima do 4º.",
  }),
  sp({
    id: "watery-sphere",
    name: "Esfera Aquosa",
    level: 4,
    school: "conjuration",
    range: "27 metros",
    duration: "Até 1 minuto",
    concentration: true,
    m: "uma gota de água",
    description:
      "Esfera de água de 1,5 m de raio. Criaturas Grandes ou menores fazem Força ou ficam contidas. Você pode mover a esfera 9 m como ação bônus. Ao terminar, pode jogar as criaturas 9 m em qualquer direção.",
  }),

  // 5º
  sp({
    id: "danse-macabre",
    name: "Dança Macabra",
    level: 5,
    school: "necromancy",
    range: "18 metros",
    duration: "Até 1 hora",
    concentration: true,
    description:
      "Até cinco cadáveres Pequenos ou Médios se tornam zumbis ou esqueletos sob seu controle. Adicionam seu modificador de conjuração aos ataques e ao dano.",
    higherLevels: "Cadáver adicional por nível acima do 5º.",
  }),
  sp({
    id: "negative-energy-flood",
    name: "Inundação de Energia Negativa",
    level: 5,
    school: "necromancy",
    range: "18 metros",
    m: "um pedaço quebrado de pedra de uma tumba",
    description:
      "Um alvo faz Constituição ou sofre 5d12 de necrótico (metade no sucesso). Uma criatura morta por esta magia se ergue como zumbi sob seu controle.",
  }),
  sp({
    id: "synaptic-static",
    name: "Estática Sináptica",
    level: 5,
    school: "enchantment",
    range: "36 metros",
    description:
      "Explosão psíquica num raio de 6 m. Criaturas fazem Inteligência ou sofrem 8d6 psíquico (metade no sucesso) e têm −1d6 em ataques, testes de atributo e Constituição para manter concentração até uma salvaguarda de Inteligência no fim do turno.",
  }),
  sp({
    id: "holy-weapon",
    name: "Arma Sagrada",
    level: 5,
    school: "evocation",
    range: "Toque",
    duration: "Até 1 hora",
    concentration: true,
    description:
      "Uma arma que você tocar emite luz intensa e causa +2d8 de radiante. Como ação bônus, pode terminar a magia em um clarão: criaturas a 9 m fazem Constituição ou ficam cegas por 1 minuto.",
  }),
  sp({
    id: "steel-wind-strike",
    name: "Ataque do Vento de Aço",
    level: 5,
    school: "conjuration",
    range: "9 metros",
    m: "uma arma corpo a corpo de 1 pe",
    description:
      "Você escolhe até cinco criaturas que possa ver. Faça um ataque de magia corpo a corpo contra cada uma (6d10 de força). Depois pode se teleportar para um espaço a 1,5 m de um dos alvos.",
  }),
  sp({
    id: "wrath-of-nature",
    name: "Ira da Natureza",
    level: 5,
    school: "evocation",
    range: "36 metros",
    duration: "Até 1 minuto",
    concentration: true,
    description:
      "Em uma área de 18 m, animam-se árvores, raízes e pedras: ataques, terreno difícil e efeitos que derrubam ou contêm inimigos (conforme o terreno presente).",
  }),
  sp({
    id: "enervation",
    name: "Enervação",
    level: 5,
    school: "necromancy",
    range: "18 metros",
    duration: "Até 1 minuto",
    concentration: true,
    description:
      "Um raio negro. O alvo faz Destreza ou sofre 4d8 necrótico (metade e a magia termina no sucesso). Em cada um dos seus turnos, como ação, causa 4d8 necrótico de novo (ou metade se o alvo sair do alcance / cobertura total).",
    higherLevels: "+1d8 por nível acima do 5º.",
  }),
  sp({
    id: "far-step",
    name: "Passo Distante",
    level: 5,
    school: "conjuration",
    range: "Pessoal",
    duration: "Até 1 minuto",
    concentration: true,
    description:
      "Você teleporta-se até 18 m para um espaço desocupado que possa ver. Até a magia acabar, pode teleportar-se novamente como ação bônus.",
  }),
  sp({
    id: "immolation",
    name: "Imolação",
    level: 5,
    school: "evocation",
    range: "27 metros",
    duration: "Até 1 minuto",
    concentration: true,
    description:
      "O alvo faz Destreza ou sofre 8d6 de fogo (metade e a magia termina no sucesso). Enquanto a magia durar, sofre 4d6 de fogo no início do turno; pode repetir a salvaguarda no fim do turno.",
  }),
  sp({
    id: "infernal-calling",
    name: "Chamado Infernal",
    level: 5,
    school: "conjuration",
    castingTime: "1 minuto",
    range: "27 metros",
    duration: "Até 1 hora",
    concentration: true,
    m: "um rubi de 999 PO",
    description:
      "Você invoca um diabo de CR 6 ou inferior. Ele pode ser hostil; um talismã especial pode ajudá-lo a controlá-lo.",
  }),
  sp({
    id: "wall-of-light",
    name: "Parede de Luz",
    level: 5,
    school: "evocation",
    range: "36 metros",
    duration: "Até 10 minutos",
    concentration: true,
    m: "um espelho de mão",
    description:
      "Você cria uma parede de luz de até 18×3×0,3 m. Criaturas que a atravessam sofrem 4d8 de radiante e podem ficar cegas. Como ação, dispara um raio (4d8 radiante) da parede.",
    higherLevels: "+1d8 por nível acima do 5º.",
  }),

  // 6º+
  sp({
    id: "scatter",
    name: "Dispersão",
    level: 6,
    school: "conjuration",
    range: "9 metros",
    description:
      "Até cinco criaturas à sua escolha a até 9 m (voluntárias ou que falhem em Sabedoria) são teleportadas até 36 m para espaços que você possa ver.",
  }),
  sp({
    id: "tensers-transformation",
    name: "Transformação de Tenser",
    level: 6,
    school: "transmutation",
    range: "Pessoal",
    duration: "Até 10 minutos",
    concentration: true,
    m: "um pouco de pelo de touro",
    description:
      "Você ganha 50 PV temporários, vantagem em ataques com arma, +2d12 de dano com armas, proficiência em armadura/escudo/armas e em salvaguardas de Força/Constituição. Não pode conjurar magias.",
  }),
  sp({
    id: "mental-prison",
    name: "Prisão Mental",
    level: 6,
    school: "illusion",
    range: "18 metros",
    duration: "Até 1 minuto",
    concentration: true,
    description:
      "O alvo faz Inteligência. Na falha, sofre 5d10 psíquico e fica preso numa ilusão; tentar sair causa 10d10 psíquico e termina a magia. No sucesso, sofre só 5d10.",
  }),
  sp({
    id: "primordial-ward",
    name: "Proteção Primordial",
    level: 6,
    school: "abjuration",
    range: "Pessoal",
    duration: "Até 1 minuto",
    concentration: true,
    description:
      "Você tem resistência a ácido, frio, fogo, relâmpago e trovão. Quando sofrer um desses danos, pode usar reação para ganhar imunidade a esse tipo até a magia acabar (e perder as outras resistências).",
  }),
  sp({
    id: "investiture-of-flame",
    name: "Manto das Chamas",
    level: 6,
    school: "transmutation",
    range: "Pessoal",
    duration: "Até 10 minutos",
    concentration: true,
    description:
      "Você emite luz intensa; imunidade a fogo e vulnerabilidade a frio; criaturas a 1,5 m sofrem 1d10 de fogo ao iniciar o turno; como ação, linha de fogo 4,5 m (4d8, Destreza).",
  }),
  sp({
    id: "investiture-of-ice",
    name: "Manto do Gelo",
    level: 6,
    school: "transmutation",
    range: "Pessoal",
    duration: "Até 10 minutos",
    concentration: true,
    description:
      "Imunidade a frio e resistência a fogo; terreno gelado a 3 m; como ação, cone de 4,5 m de frio (4d6, Constituição) que também reduz deslocamento.",
  }),
  sp({
    id: "investiture-of-stone",
    name: "Manto da Pedra",
    level: 6,
    school: "transmutation",
    range: "Pessoal",
    duration: "Até 10 minutos",
    concentration: true,
    description:
      "Resistência a contundente, perfurante e cortante de armas não mágicas; pode mover-se através de terra/pedra; como ação, cria tremor em 4,5 m (derruba criaturas).",
  }),
  sp({
    id: "investiture-of-wind",
    name: "Manto do Vento",
    level: 6,
    school: "transmutation",
    range: "Pessoal",
    duration: "Até 10 minutos",
    concentration: true,
    description:
      "Ataques à distância com arma têm desvantagem contra você; voo 18 m; como ação, empurra criaturas numa linha de 9 m (2d10 contundente, Força).",
  }),
  sp({
    id: "bones-of-the-earth",
    name: "Ossos da Terra",
    level: 6,
    school: "transmutation",
    range: "36 metros",
    description:
      "Até seis pilares de pedra (1,5×9 m) erguem-se do solo. Criaturas no espaço sobem com eles ou fazem Destreza para se afastar; pilares têm CA 5 e 30 PV.",
    higherLevels: "Pilar adicional por nível acima do 6º.",
  }),
  sp({
    id: "create-homunculus",
    name: "Criar Homúnculo",
    level: 6,
    school: "transmutation",
    castingTime: "1 hora",
    range: "Toque",
    m: "argila, cinzas, mandrágora e sangue — 50 PO consumidos; joia 1000 PO",
    description:
      "Você cria um homúnculo que telepatiza com você e pode transferir sentidos. Só pode ter um por vez.",
  }),
  sp({
    id: "druid-grove",
    name: "Bosque de Druida",
    level: 6,
    school: "abjuration",
    castingTime: "10 minutos",
    range: "Toque",
    duration: "24 horas",
    m: "visco misturado com seiva — 50 PO consumidos",
    description:
      "Você imbui uma área de até 27 m de lado com proteções naturais: névoa, vento, raízes, espíritos e um altar que pode curar.",
  }),

  // 7º–9º
  sp({
    id: "crown-of-stars",
    name: "Coroa de Estrelas",
    level: 7,
    school: "evocation",
    range: "Pessoal",
    duration: "1 hora",
    description:
      "Sete estrelas orbitam você. Como ação bônus, lança uma (ataque de magia, 4d12 radiante, alcance 36 m). Enquanto restar ao menos uma, você emite luz intensa.",
    higherLevels: "Estrela adicional por nível acima do 7º.",
  }),
  sp({
    id: "power-word-pain",
    name: "Palavra de Poder: Dor",
    level: 7,
    school: "enchantment",
    range: "18 metros",
    description:
      "Uma criatura com 100 PV ou menos é acometida de dor: desvantagem em ataques, testes e salvaguardas, e deve ter sucesso em Constituição para conjurar. Sem efeito se tiver mais de 100 PV.",
  }),
  sp({
    id: "temple-of-the-gods",
    name: "Templo dos Deuses",
    level: 7,
    school: "conjuration",
    castingTime: "1 hora",
    range: "36 metros",
    duration: "24 horas",
    m: "um símbolo sagrado, joias e pedras — 5 PO consumidos; relíquia 5000 PO",
    description:
      "Você conjura um templo que bloqueia tipos de criaturas escolhidos, concede salvaguardas e pode incluir um altar com cura.",
  }),
  sp({
    id: "whirlwind",
    name: "Vendaval",
    level: 7,
    school: "evocation",
    range: "90 metros",
    duration: "Até 1 minuto",
    concentration: true,
    m: "uma palha",
    description:
      "Um redemoinho de 3×9 m. Criaturas na área fazem Destreza ou sofrem 10d6 de contundente e ficam contidas; você pode mover o vendaval 9 m como ação bônus.",
  }),
  sp({
    id: "illusory-dragon",
    name: "Dragão Ilusório",
    level: 8,
    school: "illusion",
    range: "36 metros",
    duration: "Até 1 minuto",
    concentration: true,
    description:
      "Você cria a imagem de um dragão lendário. Criaturas que falhem em Inteligência ficam amedrontadas por 1 minuto. O dragão pode exalar um sopro (Destreza, 7d6 de um tipo escolhido).",
  }),
  sp({
    id: "maddening-darkness",
    name: "Escuridão Enlouquecedora",
    level: 8,
    school: "evocation",
    range: "45 metros",
    duration: "Até 10 minutos",
    concentration: true,
    m: "uma gota de pez misturada com uma gota de mercúrio",
    description:
      "Esfera de 18 m de escuridão mágica. Criaturas que iniciam o turno na área fazem Sabedoria ou sofrem 8d8 psíquico.",
  }),
  sp({
    id: "abi-dalzims-horrid-wilting",
    name: "Evaporação Horrenda de Abi-Dalzim",
    level: 8,
    school: "necromancy",
    range: "45 metros",
    m: "uma esponja",
    description:
      "Cubo de 9 m. Cada criatura faz Constituição ou sofre 12d8 necrótico (metade no sucesso). Plantas e água não mágicas na área murcham. Constructos e mortos-vivos são imunes.",
  }),
  sp({
    id: "mighty-fortress",
    name: "Fortaleza Poderosa",
    level: 8,
    school: "conjuration",
    castingTime: "1 minuto",
    range: "1,6 km",
    duration: "7 dias (ou até dissipada)",
    m: "um diamante de 500 PO consumido",
    description:
      "Você conjura uma fortaleza de pedra com salas, comida e servos. Pode torná-la permanente gastando a magia no mesmo local por um ano e um dia.",
  }),
  sp({
    id: "invulnerability",
    name: "Invulnerabilidade",
    level: 9,
    school: "abjuration",
    range: "Pessoal",
    duration: "Até 10 minutos",
    concentration: true,
    m: "uma pequena peça de adamante — 500 PO consumida",
    description: "Você é imune a todo dano até a magia acabar.",
  }),
  sp({
    id: "mass-polymorph",
    name: "Metamorfose em Massa",
    level: 9,
    school: "transmutation",
    range: "36 metros",
    duration: "Até 1 hora",
    concentration: true,
    m: "um casulo de lagarta",
    description:
      "Até dez criaturas fazem Sabedoria ou são transformadas em feras de CR igual ou inferior ao delas (como polimorfar).",
  }),
  sp({
    id: "psychic-scream",
    name: "Grito Psíquico",
    level: 9,
    school: "enchantment",
    range: "27 metros",
    description:
      "Até dez criaturas fazem Inteligência ou sofrem 14d6 psíquico e ficam atordoadas. Se a salvaguarda falhar por 5 ou mais, o alvo também sofre efeito permanente de confusão cerebral (até regenerar ou magia superior).",
  }),
  sp({
    id: "find-greater-steed",
    name: "Encontrar Montaria Maior",
    level: 2,
    school: "conjuration",
    castingTime: "10 minutos",
    range: "9 metros",
    description:
      "Você invoca um espírito que assume a forma de um grifo, pégaso, peryton, dire wolf, rinoceronte ou saber-toothed tiger, servindo como montaria com vínculo telepático.",
  }),
];

export {};
