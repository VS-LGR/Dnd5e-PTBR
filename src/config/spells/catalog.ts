import type { SpellDefinition } from "@/config/types";

export const SPELLS: SpellDefinition[] = [{
    id: "acid-splash",
    name: "Respingo Ácido",
    level: 0,
    school: "conjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você arremessa uma bolha de ácido contra uma ou duas criaturas próximas, causando dano ácido se elas falharem no teste de resistência. A conjuração exige 1 ação e seu alcance é 18 metros. A duração é instantânea."
  }, {
    id: "blade-ward",
    name: "Proteção de Lâminas",
    level: 0,
    school: "abjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "1 rodada",
    concentration: false,
    description: "Você traça um sinal protetor e recebe resistência a dano contundente, perfurante e cortante de ataques de armas até o próximo turno. A conjuração exige 1 ação e seu alcance é pessoal. O efeito dura 1 rodada, salvo se a própria magia indicar outra condição de término."
  }, {
    id: "chill-touch",
    name: "Toque Arrepiante",
    level: 0,
    school: "necromancy",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você cria uma mão espectral que causa dano necrótico e impede a criatura de recuperar pontos de vida até o início do seu próximo turno. A conjuração exige 1 ação e seu alcance é 18 metros. A duração é instantânea."
  }, {
    id: "dancing-lights",
    name: "Luzes Dançantes",
    level: 0,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: "um pouco de fósforo ou fungo brilhante"
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Você cria até quatro luzes flutuantes que podem se mover conforme você as dirige. A conjuração exige 1 ação e seu alcance é 36 metros. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "druidcraft",
    name: "Druidismo",
    level: 0,
    school: "transmutation",
    ritual: false,
    castingTime: "1 ação",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você produz um pequeno efeito natural inofensivo, como prever o clima, fazer uma flor brotar ou criar uma sensação sensorial. A conjuração exige 1 ação e seu alcance é pessoal. A duração é instantânea."
  }, {
    id: "eldritch-blast",
    name: "Explosão Mística",
    level: 0,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Um feixe de energia crepitante parte de você em direção a uma criatura dentro do alcance.  Faça um ataque de magia à distância; em um acerto, o alvo sofre 1d10 de dano de força.  A magia cria feixes adicionais nos níveis mais altos, e cada feixe pode atingir um alvo diferente.",
    higherLevels: "Você cria dois feixes no 5º nível, três no 11º nível e quatro no 17º nível."
  }, {
    id: "fire-bolt",
    name: "Raio de Fogo",
    level: 0,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você arremessa uma fagulha de fogo contra uma criatura ou objeto, causando dano de fogo em um acerto. A conjuração exige 1 ação e seu alcance é 36 metros. A duração é instantânea.",
    higherLevels: "O dano aumenta em 1d10 nos níveis 5, 11 e 17."
  }, {
    id: "guidance",
    name: "Orientação",
    level: 0,
    school: "divination",
    ritual: false,
    castingTime: "1 ação",
    range: "Toque",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: false,
    description: "Você toca uma criatura voluntária, que pode adicionar 1d4 a um teste de habilidade escolhido antes da magia terminar. A conjuração exige 1 ação e seu alcance é toque. O efeito dura concentração, até 1 minuto, salvo se a própria magia indicar outra condição de término."
  }, {
    id: "light",
    name: "Luz",
    level: 0,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "1 hora",
    concentration: false,
    description: "Você toca um objeto que passa a emitir luz plena e luz fraca ao redor, como uma tocha mágica. A conjuração exige 1 ação e seu alcance é 18 metros. O efeito dura 1 hora, salvo se a própria magia indicar outra condição de término."
  }, {
    id: "mage-hand",
    name: "Mãos Mágicas",
    level: 0,
    school: "conjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "1 minuto",
    concentration: false,
    description: "Você cria uma mão espectral que manipula objetos à distância, mas não pode atacar nem carregar mais que 5 quilos. A conjuração exige 1 ação e seu alcance é 18 metros. O efeito dura 1 minuto, salvo se a própria magia indicar outra condição de término."
  }, {
    id: "message",
    name: "Mensagem",
    level: 0,
    school: "transmutation",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "1 rodada",
    concentration: false,
    description: "Você sussurra uma mensagem para uma criatura dentro do alcance, que pode responder em um sussurro direcionado a você. A conjuração exige 1 ação e seu alcance é 36 metros. O efeito dura 1 rodada, salvo se a própria magia indicar outra condição de término."
  }, {
    id: "minor-illusion",
    name: "Ilusão Menor",
    level: 0,
    school: "illusion",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você cria um som ou imagem ilusória estática, que desaparece quando é examinada fisicamente ou revelada por investigação. A conjuração exige 1 ação e seu alcance é 18 metros. A duração é instantânea."
  }, {
    id: "poison-spray",
    name: "Rajada Venenosa",
    level: 0,
    school: "conjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você projeta gás nocivo sobre uma criatura próxima, causando dano de veneno se ela falhar no teste de resistência. A conjuração exige 1 ação e seu alcance é 18 metros. A duração é instantânea."
  }, {
    id: "prestidigitation",
    name: "Prestidigitação",
    level: 0,
    school: "transmutation",
    ritual: false,
    castingTime: "1 ação",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Até 1 hora",
    concentration: false,
    description: "Você produz um efeito mágico menor, como limpar um objeto, criar uma sensação breve ou acender uma pequena chama. A conjuração exige 1 ação e seu alcance é pessoal. O efeito dura até 1 hora, salvo se a própria magia indicar outra condição de término."
  }, {
    id: "ray-of-frost",
    name: "Raio de Gelo",
    level: 0,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Um raio de frio atinge uma criatura, causando dano de frio e reduzindo seu deslocamento por um turno. A conjuração exige 1 ação e seu alcance é 18 metros. A duração é instantânea.",
    higherLevels: "O dano aumenta em 1d8 nos níveis 5, 11 e 17."
  }, {
    id: "resistance",
    name: "Resistência",
    level: 0,
    school: "abjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "Toque",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: false,
    description: "Você toca uma criatura voluntária, que pode adicionar 1d4 a um teste de resistência escolhido antes da magia terminar. A conjuração exige 1 ação e seu alcance é toque. O efeito dura concentração, até 1 minuto, salvo se a própria magia indicar outra condição de término."
  }, {
    id: "sacred-flame",
    name: "Chama Sagrada",
    level: 0,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Uma chama radiante desce sobre uma criatura que falhar em um teste de Destreza, causando dano radiante. A conjuração exige 1 ação e seu alcance é 18 metros. A duração é instantânea."
  }, {
    id: "shocking-grasp",
    name: "Toque Chocante",
    level: 0,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "Toque",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você descarrega eletricidade por meio de um toque, causando dano elétrico e impedindo reações por um turno. A conjuração exige 1 ação e seu alcance é toque. A duração é instantânea."
  }, {
    id: "thaumaturgy",
    name: "Taumaturgia",
    level: 0,
    school: "transmutation",
    ritual: false,
    castingTime: "1 ação",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Até 1 minuto",
    concentration: false,
    description: "Você manifesta um prodígio menor, como alterar a voz, abrir uma porta destrancada ou fazer tremular chamas. A conjuração exige 1 ação e seu alcance é pessoal. O efeito dura até 1 minuto, salvo se a própria magia indicar outra condição de término."
  }, {
    id: "thorn-whip",
    name: "Chicote de Espinhos",
    level: 0,
    school: "transmutation",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você cria um chicote de espinhos que causa dano perfurante e pode puxar uma criatura Grande ou menor. A conjuração exige 1 ação e seu alcance é 18 metros. A duração é instantânea."
  }, {
    id: "vicious-mockery",
    name: "Escárnio Vicioso",
    level: 0,
    school: "enchantment",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você insulta uma criatura, causando dano psíquico se ela falhar no teste e impondo desvantagem no próximo ataque. A conjuração exige 1 ação e seu alcance é 18 metros. A duração é instantânea."
  }, {
    id: "alarm",
    name: "Alarme",
    level: 1,
    school: "abjuration",
    ritual: true,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: "um sino minúsculo e um fio de prata"
    },
    duration: "8 horas",
    concentration: false,
    description: "Você protege uma área contra intrusos; um alarme mental ou audível avisa quando uma criatura entra nela. A conjuração exige 1 ação e seu alcance é 18 metros. O efeito dura 8 horas, salvo se a própria magia indicar outra condição de término."
  }, {
    id: "animal-friendship",
    name: "Amizade Animal",
    level: 1,
    school: "enchantment",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Você convence uma besta a não atacá-lo se ela falhar em um teste de Sabedoria, enquanto você mantiver a concentração. A conjuração exige 1 ação e seu alcance é 18 metros. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "armor-of-agathys",
    name: "Armadura de Agathys",
    level: 1,
    school: "abjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "1 hora",
    concentration: false,
    description: "Uma geada protetora concede pontos de vida temporários e causa dano de frio a quem atingir você em combate corpo a corpo. A conjuração exige 1 ação e seu alcance é 18 metros. O efeito dura 1 hora, salvo se a própria magia indicar outra condição de término."
  }, {
    id: "arms-of-hadar",
    name: "Braços de Hadar",
    level: 1,
    school: "conjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Tentáculos sombrios surgem de você, causando dano necrótico e impedindo reações de criaturas próximas que falharem no teste. A conjuração exige 1 ação e seu alcance é 18 metros. A duração é instantânea."
  }, {
    id: "bane",
    name: "Perdição",
    level: 1,
    school: "enchantment",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Até três criaturas que falharem no teste subtraem 1d4 de ataques e testes de resistência enquanto você mantiver a concentração. A conjuração exige 1 ação e seu alcance é 18 metros. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "bless",
    name: "Bênção",
    level: 1,
    school: "enchantment",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Até três criaturas recebem 1d4 para adicionar a jogadas de ataque e testes de resistência enquanto você mantiver a concentração. A conjuração exige 1 ação e seu alcance é 18 metros. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "burning-hands",
    name: "Mãos Flamejantes",
    level: 1,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Chamas se espalham de suas mãos em um cone, causando dano de fogo a criaturas que falharem no teste de Destreza. A conjuração exige 1 ação e seu alcance é pessoal. A duração é instantânea."
  }, {
    id: "charm-person",
    name: "Enfeitiçar Pessoa",
    level: 1,
    school: "enchantment",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "1 hora",
    concentration: false,
    description: "Uma criatura humanoide que falhar no teste fica enfeitiçada por você e o considera um conhecido amigável. A conjuração exige 1 ação e seu alcance é 18 metros. O efeito dura 1 hora, salvo se a própria magia indicar outra condição de término."
  }, {
    id: "chromatic-orb",
    name: "Orbe Cromático",
    level: 1,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: "um diamante de valor mínimo de 50 po"
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você lança uma esfera de energia e escolhe seu tipo de dano entre ácido, frio, fogo, elétrico, veneno ou trovão. A conjuração exige 1 ação e seu alcance é 18 metros. A duração é instantânea."
  }, {
    id: "color-spray",
    name: "Leque Cromático",
    level: 1,
    school: "illusion",
    ritual: false,
    castingTime: "1 ação",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Um clarão de cores ofusca criaturas com poucos pontos de vida, deixando-as cegas até o fim do seu próximo turno. A conjuração exige 1 ação e seu alcance é pessoal. A duração é instantânea."
  }, {
    id: "command",
    name: "Comando",
    level: 1,
    school: "enchantment",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você profere uma ordem de uma palavra que uma criatura deve obedecer se falhar em um teste de Sabedoria. A conjuração exige 1 ação e seu alcance é 18 metros. A duração é instantânea."
  }, {
    id: "comprehend-languages",
    name: "Compreender Idiomas",
    level: 1,
    school: "divination",
    ritual: true,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "1 hora",
    concentration: false,
    description: "Você entende o significado literal de qualquer idioma falado e pode ler textos, embora não decifre códigos secretos. A conjuração exige 1 ação e seu alcance é 18 metros. O efeito dura 1 hora, salvo se a própria magia indicar outra condição de término."
  }, {
    id: "cure-wounds",
    name: "Cura Ferimentos",
    level: 1,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "Toque",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Uma criatura que você toca recupera pontos de vida iguais a 1d8 mais seu modificador de habilidade de conjuração. A conjuração exige 1 ação e seu alcance é toque. A duração é instantânea.",
    higherLevels: "A cura aumenta em 1d8 para cada espaço acima do 1º nível."
  }, {
    id: "detect-evil-and-good",
    name: "Detectar o Bem e o Mal",
    level: 1,
    school: "divination",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 10 minutos",
    concentration: false,
    description: "Você percebe presenças sobrenaturais próximas, como aberrações, celestiais, elementais, fadas, ínferos e mortos-vivos. A conjuração exige 1 ação e seu alcance é 18 metros. O efeito dura concentração, até 10 minutos, salvo se a própria magia indicar outra condição de término."
  }, {
    id: "detect-magic",
    name: "Detectar Magia",
    level: 1,
    school: "divination",
    ritual: true,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 10 minutos",
    concentration: false,
    description: "Você sente a presença de magia e pode perceber a escola de uma magia visível ou de um objeto mágico próximo. A conjuração exige 1 ação e seu alcance é 18 metros. O efeito dura concentração, até 10 minutos, salvo se a própria magia indicar outra condição de término."
  }, {
    id: "detect-poison-and-disease",
    name: "Detectar Veneno e Doença",
    level: 1,
    school: "divination",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você percebe venenos, criaturas envenenadas e doenças dentro do alcance durante a duração. A conjuração exige 1 ação e seu alcance é 18 metros. A duração é instantânea."
  }, {
    id: "disguise-self",
    name: "Disfarçar-se",
    level: 1,
    school: "illusion",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "1 hora",
    concentration: false,
    description: "Você altera sua aparência para parecer outra criatura, sem mudar suas capacidades físicas ou seus equipamentos. A conjuração exige 1 ação e seu alcance é 18 metros. O efeito dura 1 hora, salvo se a própria magia indicar outra condição de término."
  }, {
    id: "divine-favor",
    name: "Favor Divino",
    level: 1,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Sua arma brilha com energia divina e causa dano radiante adicional em cada ataque bem-sucedido. A conjuração exige 1 ação e seu alcance é 18 metros. A duração é instantânea."
  }, {
    id: "entangle",
    name: "Constrição",
    level: 1,
    school: "conjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Plantas agarram o chão em uma área e podem restringir criaturas que falharem no teste de Força. A conjuração exige 1 ação e seu alcance é 18 metros. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "expeditious-retreat",
    name: "Retirada Acelerada",
    level: 1,
    school: "transmutation",
    ritual: false,
    castingTime: "1 ação",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 10 minutos",
    concentration: false,
    description: "Você pode realizar a ação de Disparada como ação bônus em cada turno enquanto mantiver a concentração. A conjuração exige 1 ação e seu alcance é pessoal. O efeito dura concentração, até 10 minutos, salvo se a própria magia indicar outra condição de término."
  }, {
    id: "faerie-fire",
    name: "Fogo das Fadas",
    level: 1,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Objetos e criaturas em uma área ficam delineados por luz; ataques contra criaturas afetadas têm vantagem. A conjuração exige 1 ação e seu alcance é 18 metros. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "false-life",
    name: "Vitalidade Falsa",
    level: 1,
    school: "necromancy",
    ritual: false,
    castingTime: "1 ação",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "1 hora",
    concentration: false,
    description: "Você se fortalece com uma imitação sombria de vida e recebe pontos de vida temporários. A conjuração exige 1 ação e seu alcance é pessoal. O efeito dura 1 hora, salvo se a própria magia indicar outra condição de término."
  }, {
    id: "feather-fall",
    name: "Queda Suave",
    level: 1,
    school: "transmutation",
    ritual: false,
    castingTime: "1 reação",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "1 minuto",
    concentration: false,
    description: "Até cinco criaturas em queda descem lentamente e não sofrem dano ao atingir o chão. A conjuração exige 1 reação e seu alcance é pessoal. O efeito dura 1 minuto, salvo se a própria magia indicar outra condição de término."
  }, {
    id: "find-familiar",
    name: "Encontrar Familiar",
    level: 1,
    school: "conjuration",
    ritual: true,
    castingTime: "1 hora",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: "carvão, incenso e ervas no valor de 10 po"
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você invoca um espírito que assume uma forma animal e serve como seu familiar, podendo transmitir magia de toque. A conjuração exige 1 hora e seu alcance é 18 metros. A duração é instantânea."
  }, {
    id: "fog-cloud",
    name: "Nuvem de Névoa",
    level: 1,
    school: "conjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 hora",
    concentration: false,
    description: "Você cria uma esfera de névoa que obscurece pesadamente sua área. A conjuração exige 1 ação e seu alcance é pessoal. O efeito dura concentração, até 1 hora, salvo se a própria magia indicar outra condição de término."
  }, {
    id: "goodberry",
    name: "Bom Fruto",
    level: 1,
    school: "transmutation",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você cria bagas mágicas que restauram um ponto de vida e alimentam uma criatura por um dia. A conjuração exige 1 ação e seu alcance é 18 metros. A duração é instantânea."
  }, {
    id: "grease",
    name: "Graxa",
    level: 1,
    school: "conjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você cobre o solo com graxa escorregadia, fazendo criaturas caírem se falharem em um teste de Destreza. A conjuração exige 1 ação e seu alcance é pessoal. A duração é instantânea."
  }, {
    id: "guiding-bolt",
    name: "Raio Guiador",
    level: 1,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Um clarão radiante causa dano e concede vantagem ao próximo ataque feito contra o alvo. A conjuração exige 1 ação e seu alcance é 36 metros. A duração é instantânea."
  }, {
    id: "healing-word",
    name: "Palavra Curativa",
    level: 1,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação bônus",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Uma criatura que você pode ver recupera 1d4 mais seu modificador de habilidade de conjuração como ação bônus. A conjuração exige 1 ação bônus e seu alcance é 18 metros. A duração é instantânea.",
    higherLevels: "A cura aumenta em 1d4 para cada espaço acima do 1º nível."
  }, {
    id: "heroism",
    name: "Heroísmo",
    level: 1,
    school: "enchantment",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Uma criatura voluntária fica imune a medo e recebe pontos de vida temporários a cada turno. A conjuração exige 1 ação e seu alcance é 18 metros. A duração é instantânea."
  }, {
    id: "hex",
    name: "Azarar",
    level: 1,
    school: "enchantment",
    ritual: false,
    castingTime: "1 ação bônus",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Você amaldiçoa uma criatura, causando dano necrótico adicional quando a atinge e impondo desvantagem a uma habilidade escolhida. A conjuração exige 1 ação bônus e seu alcance é 18 metros. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "hunters-mark",
    name: "Marca do Caçador",
    level: 1,
    school: "divination",
    ritual: false,
    castingTime: "1 ação bônus",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Você marca uma presa, causando dano adicional quando a acerta e obtendo vantagem para encontrá-la. A conjuração exige 1 ação bônus e seu alcance é 18 metros. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "identify",
    name: "Identificar",
    level: 1,
    school: "divination",
    ritual: true,
    castingTime: "1 minuto",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: "uma pérola de valor mínimo de 100 po e uma pena de coruja"
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você aprende as propriedades de um objeto mágico, como usá-lo e se ele está afetado por alguma magia. A conjuração exige 1 minuto e seu alcance é 18 metros. A duração é instantânea."
  }, {
    id: "inflict-wounds",
    name: "Infligir Ferimentos",
    level: 1,
    school: "necromancy",
    ritual: false,
    castingTime: "1 ação",
    range: "Toque",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você faz um ataque mágico corpo a corpo que causa dano necrótico intenso em um acerto. A conjuração exige 1 ação e seu alcance é toque. A duração é instantânea."
  }, {
    id: "jump",
    name: "Salto",
    level: 1,
    school: "transmutation",
    ritual: false,
    castingTime: "1 ação",
    range: "Toque",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "1 minuto",
    concentration: false,
    description: "A distância de salto de uma criatura é triplicada durante a duração. A conjuração exige 1 ação e seu alcance é toque. O efeito dura 1 minuto, salvo se a própria magia indicar outra condição de término."
  }, {
    id: "longstrider",
    name: "Passos Largos",
    level: 1,
    school: "transmutation",
    ritual: false,
    castingTime: "1 ação",
    range: "Toque",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "1 hora",
    concentration: false,
    description: "O deslocamento de uma criatura aumenta em 3 metros durante uma hora. A conjuração exige 1 ação e seu alcance é toque. O efeito dura 1 hora, salvo se a própria magia indicar outra condição de término."
  }, {
    id: "mage-armor",
    name: "Armadura Arcana",
    level: 1,
    school: "abjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "Toque",
    components: {
      v: true,
      s: true,
      m: "um pedaço de couro curado"
    },
    duration: "8 horas",
    concentration: false,
    description: "Você protege uma criatura sem armadura com uma força mágica que define sua CA base como 13 mais Destreza. A conjuração exige 1 ação e seu alcance é toque. O efeito dura 8 horas, salvo se a própria magia indicar outra condição de término."
  }, {
    id: "magic-missile",
    name: "Mísseis Mágicos",
    level: 1,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você cria três dardos de força que atingem automaticamente criaturas à sua escolha. A conjuração exige 1 ação e seu alcance é 36 metros. A duração é instantânea.",
    higherLevels: "Você cria um dardo adicional para cada espaço acima do 1º nível."
  }, {
    id: "protection-from-evil-and-good",
    name: "Proteção contra o Bem e o Mal",
    level: 1,
    school: "abjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "Toque",
    components: {
      v: true,
      s: true,
      m: "água benta ou pó de prata e ferro"
    },
    duration: "Concentração, até 10 minutos",
    concentration: false,
    description: "Uma criatura voluntária recebe proteção contra certos tipos sobrenaturais, que têm desvantagem para atacá-la. A conjuração exige 1 ação e seu alcance é toque. O efeito dura concentração, até 10 minutos, salvo se a própria magia indicar outra condição de término."
  }, {
    id: "purify-food-and-drink",
    name: "Purificar Alimento e Bebida",
    level: 1,
    school: "transmutation",
    ritual: true,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você remove veneno e doença não mágicos de alimento e bebida em uma pequena área. A conjuração exige 1 ação e seu alcance é 18 metros. A duração é instantânea."
  }, {
    id: "ray-of-sickness",
    name: "Raio de Enjoo",
    level: 1,
    school: "necromancy",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Um raio esverdeado causa dano de veneno e pode envenenar a criatura atingida. A conjuração exige 1 ação e seu alcance é 18 metros. A duração é instantânea."
  }, {
    id: "shield",
    name: "Escudo",
    level: 1,
    school: "abjuration",
    ritual: false,
    castingTime: "1 reação, tomada quando você é atingido por um ataque ou alvo de Mísseis Mágicos",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "1 rodada",
    concentration: false,
    description: "Uma barreira invisível de força mágica protege você.  Até o início do seu próximo turno, você recebe +5 na CA, inclusive contra o ataque que provocou a reação.  A magia também anula todo o dano causado por Mísseis Mágicos."
  }, {
    id: "shield-of-faith",
    name: "Escudo da Fé",
    level: 1,
    school: "abjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "Toque",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Um campo brilhante envolve uma criatura e concede +2 na CA enquanto você mantiver a concentração. A conjuração exige 1 ação e seu alcance é toque. A duração é instantânea."
  }, {
    id: "silent-image",
    name: "Imagem Silenciosa",
    level: 1,
    school: "illusion",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 10 minutos",
    concentration: false,
    description: "Você cria uma imagem visual de um objeto, criatura ou fenômeno que pode se mover conforme você orientar. A conjuração exige 1 ação e seu alcance é 18 metros. O efeito dura concentração, até 10 minutos, salvo se a própria magia indicar outra condição de término."
  }, {
    id: "sleep",
    name: "Sono",
    level: 1,
    school: "enchantment",
    ritual: false,
    castingTime: "1 ação",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: "areia fina, pétalas de rosa ou um grilo"
    },
    duration: "1 minuto",
    concentration: false,
    description: "Você faz criaturas em uma área adormecerem, começando pelas que têm menos pontos de vida atuais. A conjuração exige 1 ação e seu alcance é pessoal. O efeito dura 1 minuto, salvo se a própria magia indicar outra condição de término."
  }, {
    id: "speak-with-animals",
    name: "Falar com Animais",
    level: 1,
    school: "divination",
    ritual: true,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "10 minutos",
    concentration: false,
    description: "Você compreende e se comunica verbalmente com bestas, podendo influenciá-las de modo limitado. A conjuração exige 1 ação e seu alcance é 18 metros. O efeito dura 10 minutos, salvo se a própria magia indicar outra condição de término."
  }, {
    id: "tashas-hideous-laughter",
    name: "Risada Nefasta de Tasha",
    level: 1,
    school: "enchantment",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Uma criatura cai em gargalhadas e fica incapacitada e caída se falhar no teste de Sabedoria. A conjuração exige 1 ação e seu alcance é 18 metros. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "thunderwave",
    name: "Onda Trovejante",
    level: 1,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Uma onda de força sonora explode a partir de você, causando dano de trovão e empurrando criaturas. A conjuração exige 1 ação e seu alcance é pessoal. A duração é instantânea."
  }, {
    id: "unseen-servant",
    name: "Servo Invisível",
    level: 1,
    school: "conjuration",
    ritual: true,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "1 hora",
    concentration: false,
    description: "Você cria uma força invisível e sem mente que executa tarefas simples sob seu comando. A conjuração exige 1 ação e seu alcance é 18 metros. O efeito dura 1 hora, salvo se a própria magia indicar outra condição de término."
  }, {
    id: "acid-arrow",
    name: "Flecha Ácida de Melf",
    level: 2,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Uma flecha de ácido causa dano imediato e dano adicional no turno seguinte ao atingir o alvo. A conjuração exige 1 ação e seu alcance é 18 metros. A duração é instantânea."
  }, {
    id: "aid",
    name: "Auxílio",
    level: 2,
    school: "abjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "Toque",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "8 horas",
    concentration: false,
    description: "Até três criaturas aumentam seus pontos de vida máximos e atuais durante oito horas. A conjuração exige 1 ação e seu alcance é toque. O efeito dura 8 horas, salvo se a própria magia indicar outra condição de término."
  }, {
    id: "alter-self",
    name: "Alterar-se",
    level: 2,
    school: "transmutation",
    ritual: false,
    castingTime: "1 ação",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você assume adaptações físicas temporárias, como guelras, armas naturais ou aparência diferente. A conjuração exige 1 ação e seu alcance é pessoal. A duração é instantânea."
  }, {
    id: "arcane-lock",
    name: "Tranca Arcana",
    level: 2,
    school: "abjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: "ouro em pó no valor de 25 po"
    },
    duration: "Até ser dissipada",
    concentration: false,
    description: "Você torna uma porta, janela, portão ou baú mais difícil de abrir por meios mágicos ou mundanos. A conjuração exige 1 ação e seu alcance é 18 metros. O efeito dura até ser dissipada, salvo se a própria magia indicar outra condição de término."
  }, {
    id: "barkskin",
    name: "Pele de Árvore",
    level: 2,
    school: "transmutation",
    ritual: false,
    castingTime: "1 ação",
    range: "Toque",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "A pele de uma criatura se torna resistente e sua CA não pode ser inferior a 16. A conjuração exige 1 ação e seu alcance é toque. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "blindness-deafness",
    name: "Cegueira/Surdez",
    level: 2,
    school: "necromancy",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você pode cegar ou ensurdecer uma criatura que falhar em um teste de Constituição. A conjuração exige 1 ação e seu alcance é 18 metros. A duração é instantânea."
  }, {
    id: "blur",
    name: "Borrão",
    level: 2,
    school: "illusion",
    ritual: false,
    castingTime: "1 ação",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Seu corpo fica borrado e ataques contra você têm desvantagem, salvo para criaturas que não dependem da visão. A conjuração exige 1 ação e seu alcance é pessoal. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "calm-emotions",
    name: "Acalmar Emoções",
    level: 2,
    school: "enchantment",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você suprime emoções fortes ou torna indiferentes criaturas humanoides em uma área. A conjuração exige 1 ação e seu alcance é 18 metros. A duração é instantânea."
  }, {
    id: "continual-flame",
    name: "Chama Contínua",
    level: 2,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: "pó de rubi no valor de 50 po"
    },
    duration: "Instantânea",
    concentration: false,
    description: "Uma chama permanente surge em um objeto e emite luz sem consumir oxigênio ou gerar calor. A conjuração exige 1 ação e seu alcance é 18 metros. A duração é instantânea."
  }, {
    id: "darkness",
    name: "Escuridão",
    level: 2,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você cria uma esfera de escuridão mágica que bloqueia visão normal e visão no escuro. A conjuração exige 1 ação e seu alcance é pessoal. A duração é instantânea."
  }, {
    id: "detect-thoughts",
    name: "Detectar Pensamentos",
    level: 2,
    school: "divination",
    ritual: false,
    castingTime: "1 ação",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: "uma moeda de cobre"
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Você lê pensamentos superficiais de uma criatura e pode sondar mais profundamente se ela falhar no teste. A conjuração exige 1 ação e seu alcance é pessoal. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "enhance-ability",
    name: "Aprimorar Habilidade",
    level: 2,
    school: "transmutation",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 hora",
    concentration: true,
    description: "Você concede vantagem em testes de uma habilidade escolhida e um benefício adicional associado a ela. A conjuração exige 1 ação e seu alcance é 18 metros. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "enlarge-reduce",
    name: "Aumentar/Reduzir",
    level: 2,
    school: "transmutation",
    ritual: false,
    castingTime: "1 ação",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: "pó de ferro"
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você aumenta ou reduz uma criatura ou objeto, alterando tamanho, dano e capacidade de carga. A conjuração exige 1 ação e seu alcance é pessoal. A duração é instantânea."
  }, {
    id: "find-steed",
    name: "Encontrar Montaria",
    level: 2,
    school: "conjuration",
    ritual: false,
    castingTime: "10 minutos",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você invoca uma montaria leal com inteligência incomum e vínculo telepático com você. A conjuração exige 10 minutos e seu alcance é 18 metros. A duração é instantânea."
  }, {
    id: "flaming-sphere",
    name: "Esfera Flamejante",
    level: 2,
    school: "conjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Você cria uma esfera de fogo rolante que causa dano de fogo a criaturas que ela atinge. A conjuração exige 1 ação e seu alcance é pessoal. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "gentle-repose",
    name: "Repouso Tranquilo",
    level: 2,
    school: "necromancy",
    ritual: true,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você preserva um cadáver contra decomposição e impede que ele se torne morto-vivo durante a duração. A conjuração exige 1 ação e seu alcance é 18 metros. A duração é instantânea."
  }, {
    id: "gust-of-wind",
    name: "Rajada de Vento",
    level: 2,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Uma linha de vento forte empurra criaturas, dispersa gases e dificulta o movimento contra ela. A conjuração exige 1 ação e seu alcance é pessoal. A duração é instantânea."
  }, {
    id: "hold-person",
    name: "Imobilizar Pessoa",
    level: 2,
    school: "enchantment",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Você paralisa um humanoide que falhar em um teste de Sabedoria enquanto mantiver a concentração. A conjuração exige 1 ação e seu alcance é 18 metros. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "invisibility",
    name: "Invisibilidade",
    level: 2,
    school: "illusion",
    ritual: false,
    castingTime: "1 ação",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: "uma pestana envolta em goma arábica"
    },
    duration: "Concentração, até 1 hora",
    concentration: true,
    description: "Uma criatura fica invisível até atacar, conjurar uma magia ou a duração terminar. A conjuração exige 1 ação e seu alcance é pessoal. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "knock",
    name: "Abrir",
    level: 2,
    school: "transmutation",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você abre fechaduras mundanas, mágicas simples e objetos presos dentro do alcance. A conjuração exige 1 ação e seu alcance é 18 metros. A duração é instantânea."
  }, {
    id: "lesser-restoration",
    name: "Restauração Menor",
    level: 2,
    school: "abjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "Toque",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você encerra uma doença ou uma condição entre cego, surdo, paralisado ou envenenado. A conjuração exige 1 ação e seu alcance é toque. A duração é instantânea."
  }, {
    id: "levitate",
    name: "Levitação",
    level: 2,
    school: "transmutation",
    ritual: false,
    castingTime: "1 ação",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: "uma presilha de couro"
    },
    duration: "Concentração, até 10 minutos",
    concentration: true,
    description: "Uma criatura ou objeto sobe verticalmente e pode ser movido apenas de forma limitada durante a duração. A conjuração exige 1 ação e seu alcance é pessoal. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "locate-object",
    name: "Localizar Objeto",
    level: 2,
    school: "divination",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: "um galho bifurcado"
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você sente a direção de um objeto conhecido ou da categoria de objeto escolhida dentro do alcance. A conjuração exige 1 ação e seu alcance é 18 metros. A duração é instantânea."
  }, {
    id: "misty-step",
    name: "Passo Nebuloso",
    level: 2,
    school: "conjuration",
    ritual: false,
    castingTime: "1 ação bônus",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você se teletransporta em uma nuvem de névoa para um espaço desocupado que possa ver. A conjuração exige 1 ação bônus e seu alcance é pessoal. A duração é instantânea."
  }, {
    id: "moonbeam",
    name: "Raio Lunar",
    level: 2,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Um feixe de luz prateada causa dano radiante a criaturas em sua área e pode revelar metamorfos. A conjuração exige 1 ação e seu alcance é 18 metros. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "pass-without-trace",
    name: "Passos sem Pegadas",
    level: 2,
    school: "abjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Você e aliados próximos recebem +10 em testes de Furtividade e não podem ser rastreados por meios não mágicos. A conjuração exige 1 ação e seu alcance é 18 metros. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "prayer-of-healing",
    name: "Prece de Cura",
    level: 2,
    school: "evocation",
    ritual: true,
    castingTime: "10 minutos",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você conduz uma oração de dez minutos que cura até seis criaturas dentro do alcance. A conjuração exige 10 minutos e seu alcance é 18 metros. A duração é instantânea."
  }, {
    id: "protection-from-poison",
    name: "Proteção contra Veneno",
    level: 2,
    school: "abjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "Toque",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você neutraliza veneno em uma criatura e concede imunidade à condição e dano de veneno durante a duração. A conjuração exige 1 ação e seu alcance é toque. A duração é instantânea."
  }, {
    id: "scorching-ray",
    name: "Raio Ardente",
    level: 2,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: "pó vermelho e amarelo"
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você cria três raios de fogo e realiza um ataque mágico à distância para cada um. A conjuração exige 1 ação e seu alcance é 18 metros. A duração é instantânea."
  }, {
    id: "see-invisibility",
    name: "Ver Invisibilidade",
    level: 2,
    school: "divination",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você vê criaturas e objetos invisíveis, além de enxergar no Plano Etéreo próximo. A conjuração exige 1 ação e seu alcance é 18 metros. A duração é instantânea."
  }, {
    id: "shatter",
    name: "Despedaçar",
    level: 2,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: "uma lasca de mica"
    },
    duration: "Instantânea",
    concentration: false,
    description: "Um ruído explosivo causa dano de trovão em uma área e é especialmente eficaz contra materiais inorgânicos. A conjuração exige 1 ação e seu alcance é 18 metros. A duração é instantânea."
  }, {
    id: "silence",
    name: "Silêncio",
    level: 2,
    school: "illusion",
    ritual: true,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você cria uma esfera sem som; criaturas dentro dela não podem lançar magias com componente verbal. A conjuração exige 1 ação e seu alcance é 18 metros. A duração é instantânea."
  }, {
    id: "spider-climb",
    name: "Patas de Aranha",
    level: 2,
    school: "transmutation",
    ritual: false,
    castingTime: "1 ação",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: "uma gota de betume e uma aranha"
    },
    duration: "Concentração, até 1 hora",
    concentration: false,
    description: "Uma criatura pode se mover por paredes e tetos, mantendo as mãos livres. A conjuração exige 1 ação e seu alcance é pessoal. O efeito dura concentração, até 1 hora, salvo se a própria magia indicar outra condição de término."
  }, {
    id: "spike-growth",
    name: "Crescimento de Espinhos",
    level: 2,
    school: "transmutation",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Espinhos camuflados tornam uma área difícil e causam dano perfurante a quem se move nela. A conjuração exige 1 ação e seu alcance é 18 metros. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "spiritual-weapon",
    name: "Arma Espiritual",
    level: 2,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação bônus",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "1 minuto",
    concentration: false,
    description: "Você cria uma arma espectral que ataca como ação bônus e causa dano de força. A conjuração exige 1 ação bônus e seu alcance é 18 metros. O efeito dura 1 minuto, salvo se a própria magia indicar outra condição de término."
  }, {
    id: "suggestion",
    name: "Sugestão",
    level: 2,
    school: "enchantment",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Você sugere um curso de ação razoável que uma criatura deve seguir se falhar no teste de Sabedoria. A conjuração exige 1 ação e seu alcance é 18 metros. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "web",
    name: "Teia",
    level: 2,
    school: "conjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: "um pedaço de teia"
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Você preenche uma área com teias pegajosas que podem restringir criaturas e são inflamáveis. A conjuração exige 1 ação e seu alcance é pessoal. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "beacon-of-hope",
    name: "Sinal de Esperança",
    level: 3,
    school: "abjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Aliados em uma área têm vantagem em testes de Sabedoria e testes contra a morte, e recebem cura máxima. A conjuração exige 1 ação e seu alcance é 36 metros. A duração é instantânea."
  }, {
    id: "bestow-curse",
    name: "Rogar Maldição",
    level: 3,
    school: "necromancy",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você toca uma criatura e impõe uma maldição prejudicial escolhida se ela falhar no teste de Sabedoria. A conjuração exige 1 ação e seu alcance é 36 metros. A duração é instantânea."
  }, {
    id: "clairvoyance",
    name: "Clarividência",
    level: 3,
    school: "divination",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: "um foco de valor mínimo de 100 po"
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você cria um sensor invisível em um local familiar para ver ou ouvir através dele. A conjuração exige 1 ação e seu alcance é 36 metros. A duração é instantânea."
  }, {
    id: "conjure-animals",
    name: "Conjurar Animais",
    level: 3,
    school: "conjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Você invoca espíritos feéricos que assumem formas de bestas e obedecem a seus comandos. A conjuração exige 1 ação e seu alcance é 36 metros. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "counterspell",
    name: "Contrafeitiço",
    level: 3,
    school: "abjuration",
    ritual: false,
    castingTime: "1 reação, tomada quando você vê uma criatura a até 18 metros conjurar uma magia",
    range: "18 metros",
    components: {
      v: true,
      s: false,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você tenta interromper uma criatura durante a conjuração.  Se a magia dela for de 3º nível ou menor, ela falha automaticamente.  Para uma magia de 4º nível ou maior, faça um teste de habilidade usando sua habilidade de conjuração contra CD 10 + o nível da magia.",
    higherLevels: "A magia interrompida falha automaticamente se seu espaço de magia for de nível igual ou superior ao dela."
  }, {
    id: "daylight",
    name: "Luz do Dia",
    level: 3,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você cria uma esfera de luz brilhante que ilumina uma grande área e pode dispersar escuridão mágica fraca. A conjuração exige 1 ação e seu alcance é 36 metros. A duração é instantânea."
  }, {
    id: "dispel-magic",
    name: "Dissipar Magia",
    level: 3,
    school: "abjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você encerra uma magia ativa em uma criatura, objeto ou efeito mágico dentro do alcance. A conjuração exige 1 ação e seu alcance é 36 metros. A duração é instantânea."
  }, {
    id: "fear",
    name: "Medo",
    level: 3,
    school: "illusion",
    ritual: false,
    castingTime: "1 ação",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Uma imagem aterradora força criaturas que falharem no teste a largar objetos e fugir de você. A conjuração exige 1 ação e seu alcance é pessoal. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "fireball",
    name: "Bola de Fogo",
    level: 3,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "45 metros",
    components: {
      v: true,
      s: true,
      m: "guano de morcego e enxofre"
    },
    duration: "Instantânea",
    concentration: false,
    description: "Um raio brilhante parte do seu dedo e explode em uma esfera de fogo de 6 metros de raio.  Cada criatura na área faz uma salvaguarda de Destreza e sofre 8d6 de dano de fogo se falhar, ou metade se obtiver sucesso.  O fogo contorna cantos e incendeia objetos inflamáveis que não estejam sendo vestidos ou carregados.",
    higherLevels: "O dano aumenta em 1d6 para cada espaço de magia acima do 3º nível."
  }, {
    id: "fly",
    name: "Voo",
    level: 3,
    school: "transmutation",
    ritual: false,
    castingTime: "1 ação",
    range: "Toque",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 10 minutos",
    concentration: true,
    description: "Uma criatura voluntária ganha deslocamento de voo de 18 metros enquanto você mantiver a concentração. A conjuração exige 1 ação e seu alcance é toque. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "gaseous-form",
    name: "Forma Gasosa",
    level: 3,
    school: "transmutation",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Uma criatura se torna uma nuvem gasosa capaz de passar por frestas, mas não pode atacar ou conjurar magias. A conjuração exige 1 ação e seu alcance é 36 metros. A duração é instantânea."
  }, {
    id: "haste",
    name: "Acelerar",
    level: 3,
    school: "transmutation",
    ritual: false,
    castingTime: "1 ação",
    range: "9 metros",
    components: {
      v: true,
      s: true,
      m: "uma raiz de alcaçuz"
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Escolha uma criatura voluntária que você possa ver dentro do alcance.  Até a magia terminar, a velocidade dela dobra, ela recebe +2 na CA, vantagem em salvaguardas de Destreza e uma ação adicional limitada por turno.  Quando a magia termina, o alvo não pode se mover nem realizar ações até o fim do próximo turno dele."
  }, {
    id: "hypnotic-pattern",
    name: "Padrão Hipnótico",
    level: 3,
    school: "illusion",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Um padrão luminoso encanta e incapacita criaturas em uma área que falharem no teste de Sabedoria. A conjuração exige 1 ação e seu alcance é 36 metros. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "lightning-bolt",
    name: "Relâmpago",
    level: 3,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "30 metros",
    components: {
      v: true,
      s: true,
      m: "um pouco de pelo e uma haste de âmbar"
    },
    duration: "Instantânea",
    concentration: false,
    description: "Um raio elétrico percorre uma linha, causando 8d6 de dano elétrico a criaturas que falharem no teste. A conjuração exige 1 ação e seu alcance é 30 metros. A duração é instantânea.",
    higherLevels: "O dano aumenta em 1d6 para cada espaço acima do 3º nível."
  }, {
    id: "major-image",
    name: "Imagem Maior",
    level: 3,
    school: "illusion",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você cria uma ilusão visual, sonora e sensorial convincente que pode ser movida e alterada. A conjuração exige 1 ação e seu alcance é 36 metros. A duração é instantânea."
  }, {
    id: "plant-growth",
    name: "Crescimento de Plantas",
    level: 3,
    school: "transmutation",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você faz vegetação crescer de forma exuberante, tornando terreno difícil ou enriquecendo a terra por longo prazo. A conjuração exige 1 ação e seu alcance é 36 metros. A duração é instantânea."
  }, {
    id: "protection-from-energy",
    name: "Proteção contra Energia",
    level: 3,
    school: "abjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Uma criatura recebe resistência a um tipo de dano energético escolhido durante a duração. A conjuração exige 1 ação e seu alcance é 36 metros. A duração é instantânea."
  }, {
    id: "remove-curse",
    name: "Remover Maldição",
    level: 3,
    school: "abjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "Toque",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você toca uma criatura ou objeto e encerra todas as maldições que o afetam, quando aplicável. A conjuração exige 1 ação e seu alcance é toque. A duração é instantânea."
  }, {
    id: "revivify",
    name: "Revivificar",
    level: 3,
    school: "necromancy",
    ritual: false,
    castingTime: "1 ação",
    range: "Toque",
    components: {
      v: true,
      s: true,
      m: "diamantes no valor de 300 po"
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você devolve à vida uma criatura que morreu no último minuto, desde que ela não tenha morrido de velhice. A conjuração exige 1 ação e seu alcance é toque. A duração é instantânea."
  }, {
    id: "sending",
    name: "Enviar Mensagem",
    level: 3,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: "um pequeno fio de cobre"
    },
    duration: "1 rodada",
    concentration: false,
    description: "Você envia uma mensagem curta a uma criatura conhecida em qualquer distância, que pode responder imediatamente. A conjuração exige 1 ação e seu alcance é 36 metros. O efeito dura 1 rodada, salvo se a própria magia indicar outra condição de término."
  }, {
    id: "sleet-storm",
    name: "Tempestade de Granizo",
    level: 3,
    school: "conjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você cria uma tempestade gelada que obscurece visão, torna o solo escorregadio e pode quebrar concentração. A conjuração exige 1 ação e seu alcance é 36 metros. A duração é instantânea."
  }, {
    id: "slow",
    name: "Lentidão",
    level: 3,
    school: "transmutation",
    ritual: false,
    castingTime: "1 ação",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Até seis criaturas têm deslocamento, reações, ataques e conjurações reduzidos se falharem no teste. A conjuração exige 1 ação e seu alcance é pessoal. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "speak-with-dead",
    name: "Falar com os Mortos",
    level: 3,
    school: "necromancy",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você faz um cadáver responder até cinco perguntas com o conhecimento que possuía em vida. A conjuração exige 1 ação e seu alcance é 36 metros. A duração é instantânea."
  }, {
    id: "stinking-cloud",
    name: "Nuvem Fétida",
    level: 3,
    school: "conjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Uma nuvem de gás nauseante impede ações de criaturas que falharem no teste de Constituição. A conjuração exige 1 ação e seu alcance é 36 metros. A duração é instantânea."
  }, {
    id: "tongues",
    name: "Idiomas",
    level: 3,
    school: "divination",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Uma criatura entende qualquer idioma falado e qualquer criatura que a escute entende o que ela diz. A conjuração exige 1 ação e seu alcance é 36 metros. A duração é instantânea."
  }, {
    id: "water-breathing",
    name: "Respirar na Água",
    level: 3,
    school: "transmutation",
    ritual: true,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: "uma palha curta ou junco"
    },
    duration: "24 horas",
    concentration: false,
    description: "Até dez criaturas voluntárias podem respirar debaixo d água durante vinte e quatro horas. A conjuração exige 1 ação e seu alcance é 36 metros. O efeito dura 24 horas, salvo se a própria magia indicar outra condição de término."
  }, {
    id: "water-walk",
    name: "Caminhar sobre a Água",
    level: 3,
    school: "transmutation",
    ritual: true,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "1 hora",
    concentration: false,
    description: "Até dez criaturas voluntárias podem se mover sobre líquidos como se fossem solo sólido. A conjuração exige 1 ação e seu alcance é 36 metros. O efeito dura 1 hora, salvo se a própria magia indicar outra condição de término."
  }, {
    id: "wall-of-fire",
    name: "Muralha de Fogo",
    level: 4,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Você cria uma parede de fogo que causa dano a criaturas próximas e bloqueia passagem com chamas perigosas. A conjuração exige 1 ação e seu alcance é 36 metros. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "banishment",
    name: "Banimento",
    level: 4,
    school: "abjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: "um objeto desagradável ao alvo"
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Você tenta enviar uma criatura para outro plano; extraplanares podem ser banidos permanentemente. A conjuração exige 1 ação e seu alcance é 36 metros. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "blight",
    name: "Flagelo",
    level: 4,
    school: "necromancy",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Energia necrótica drena uma criatura, causando dano elevado e sendo especialmente destrutiva para plantas. A conjuração exige 1 ação e seu alcance é 36 metros. A duração é instantânea."
  }, {
    id: "confusion",
    name: "Confusão",
    level: 4,
    school: "enchantment",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Você perturba a mente de criaturas em uma área, fazendo-as agir de forma aleatória. A conjuração exige 1 ação e seu alcance é 36 metros. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "conjure-minor-elementals",
    name: "Conjurar Elementais Menores",
    level: 4,
    school: "conjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você invoca elementais de baixo desafio que obedecem a seus comandos durante a duração. A conjuração exige 1 ação e seu alcance é 36 metros. A duração é instantânea."
  }, {
    id: "dimension-door",
    name: "Porta Dimensional",
    level: 4,
    school: "conjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "150 metros",
    components: {
      v: true,
      s: true,
      m: "um pouco de enxofre e um fio de cobre"
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você se teletransporta para um local dentro do alcance e pode levar uma criatura voluntária consigo. A conjuração exige 1 ação e seu alcance é 150 metros. A duração é instantânea."
  }, {
    id: "divination",
    name: "Adivinhação",
    level: 4,
    school: "divination",
    ritual: true,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você recebe uma resposta enigmática de uma entidade divina sobre um objetivo específico. A conjuração exige 1 ação e seu alcance é 36 metros. A duração é instantânea."
  }, {
    id: "dominate-beast",
    name: "Dominar Besta",
    level: 4,
    school: "enchantment",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Você controla telepaticamente uma besta que falhar no teste de Sabedoria. A conjuração exige 1 ação e seu alcance é 36 metros. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "fire-shield",
    name: "Escudo de Fogo",
    level: 4,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Chamas quentes ou frias protegem você, concedem resistência e ferem quem o atingir em combate corpo a corpo. A conjuração exige 1 ação e seu alcance é pessoal. A duração é instantânea."
  }, {
    id: "greater-invisibility",
    name: "Invisibilidade Maior",
    level: 4,
    school: "illusion",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Você ou uma criatura fica invisível mesmo ao atacar ou conjurar magias enquanto durar a concentração. A conjuração exige 1 ação e seu alcance é 36 metros. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "guardian-of-faith",
    name: "Guardião da Fé",
    level: 4,
    school: "conjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você invoca um guardião espectral imóvel que causa dano radiante a inimigos que entram em sua área. A conjuração exige 1 ação e seu alcance é 36 metros. A duração é instantânea."
  }, {
    id: "locate-creature",
    name: "Localizar Criatura",
    level: 4,
    school: "divination",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você percebe a direção de uma criatura conhecida, desde que ela esteja dentro do alcance e não bloqueada. A conjuração exige 1 ação e seu alcance é 36 metros. A duração é instantânea."
  }, {
    id: "polymorph",
    name: "Polimorfia",
    level: 4,
    school: "transmutation",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: "um casulo de lagarta"
    },
    duration: "Concentração, até 1 hora",
    concentration: true,
    description: "Você transforma uma criatura em uma besta com estatísticas substituídas, limitada por seu nível ou valor de desafio. A conjuração exige 1 ação e seu alcance é 36 metros. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "resilient-sphere",
    name: "Esfera Resiliente de Otiluke",
    level: 4,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você aprisiona uma criatura ou objeto em uma esfera de força indestrutível que bloqueia efeitos externos. A conjuração exige 1 ação e seu alcance é 36 metros. A duração é instantânea."
  }, {
    id: "stoneskin",
    name: "Pele de Pedra",
    level: 4,
    school: "abjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "Toque",
    components: {
      v: true,
      s: true,
      m: "pó de diamante no valor de 100 po"
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Uma criatura ganha resistência a dano não mágico contundente, perfurante e cortante. A conjuração exige 1 ação e seu alcance é toque. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "storm-sphere",
    name: "Esfera de Tempestade",
    level: 4,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você cria uma esfera de vento e relâmpagos que causa dano e dificulta ataques à distância contra você. A conjuração exige 1 ação e seu alcance é 36 metros. A duração é instantânea."
  }, {
    id: "vitriolic-sphere",
    name: "Esfera Vítrea de Vitriolo",
    level: 4,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você lança uma esfera de ácido que explode, causando dano imediato e dano ácido persistente. A conjuração exige 1 ação e seu alcance é 36 metros. A duração é instantânea."
  }, {
    id: "arcane-hand",
    name: "Mão Arcana de Bigby",
    level: 5,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: "casca de ovo e uma luva de pele de cobra"
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Você cria uma mão de força grande que pode golpear, agarrar, empurrar ou proteger conforme seus comandos. A conjuração exige 1 ação e seu alcance é pessoal. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "commune",
    name: "Comunhão",
    level: 5,
    school: "divination",
    ritual: true,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você faz até três perguntas a uma divindade e recebe respostas verdadeiras, embora possivelmente enigmáticas. A conjuração exige 1 ação e seu alcance é 36 metros. A duração é instantânea."
  }, {
    id: "cone-of-cold",
    name: "Cone de Frio",
    level: 5,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: "um pequeno cone ou pó de cristal"
    },
    duration: "Instantânea",
    concentration: false,
    description: "Uma explosão de frio em forma de cone causa dano de frio a criaturas que falharem no teste. A conjuração exige 1 ação e seu alcance é pessoal. A duração é instantânea."
  }, {
    id: "conjure-elemental",
    name: "Conjurar Elemental",
    level: 5,
    school: "conjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Você invoca um elemental que obedece enquanto mantiver a concentração, mas pode se tornar hostil se a perder. A conjuração exige 1 ação e seu alcance é 36 metros. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "contact-other-plane",
    name: "Contato Extraplanar",
    level: 5,
    school: "divination",
    ritual: true,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você consulta uma entidade extraplanar em busca de conhecimento, arriscando dano psíquico e insanidade temporária. A conjuração exige 1 ação e seu alcance é 36 metros. A duração é instantânea."
  }, {
    id: "creation",
    name: "Criação",
    level: 5,
    school: "illusion",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você cria um objeto não mágico de matéria vegetal, pedra, metal precioso ou gema por uma duração limitada. A conjuração exige 1 ação e seu alcance é 36 metros. A duração é instantânea."
  }, {
    id: "dispel-evil-and-good",
    name: "Dissipar o Bem e o Mal",
    level: 5,
    school: "abjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você protege a si mesmo contra criaturas sobrenaturais e pode encerrar seus efeitos de possessão ou bani-las. A conjuração exige 1 ação e seu alcance é 36 metros. A duração é instantânea."
  }, {
    id: "dominate-person",
    name: "Dominar Pessoa",
    level: 5,
    school: "enchantment",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Você controla telepaticamente as ações de um humanoide que falhar em um teste de Sabedoria. A conjuração exige 1 ação e seu alcance é 36 metros. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "flame-strike",
    name: "Coluna de Chamas",
    level: 5,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Um cilindro de fogo e luz radiante desce sobre um ponto, causando dano de fogo e radiante. A conjuração exige 1 ação e seu alcance é 36 metros. A duração é instantânea."
  }, {
    id: "greater-restoration",
    name: "Restauração Maior",
    level: 5,
    school: "abjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "Toque",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você reduz exaustão e encerra efeitos debilitantes, incluindo maldições, redução de atributos e máximos de vida. A conjuração exige 1 ação e seu alcance é toque. A duração é instantânea."
  }, {
    id: "hallow",
    name: "Consagrar",
    level: 5,
    school: "evocation",
    ritual: false,
    castingTime: "24 horas",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você imbui uma área com poder sagrado permanente que protege contra tipos de criaturas e pode impor efeito adicional. A conjuração exige 24 horas e seu alcance é 36 metros. A duração é instantânea."
  }, {
    id: "legend-lore",
    name: "Lenda",
    level: 5,
    school: "divination",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você traz à mente conhecimento lendário sobre uma pessoa, lugar ou objeto de grande importância. A conjuração exige 1 ação e seu alcance é 36 metros. A duração é instantânea."
  }, {
    id: "mislead",
    name: "Despistar",
    level: 5,
    school: "illusion",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você fica invisível enquanto uma duplicata ilusória aparece, fala e se move sob seu controle. A conjuração exige 1 ação e seu alcance é 36 metros. A duração é instantânea."
  }, {
    id: "raise-dead",
    name: "Erguer os Mortos",
    level: 5,
    school: "necromancy",
    ritual: false,
    castingTime: "1 ação",
    range: "Toque",
    components: {
      v: true,
      s: true,
      m: "diamante no valor de 500 po"
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você devolve à vida uma criatura morta há até dez dias, impondo penalidades temporárias após o retorno. A conjuração exige 1 ação e seu alcance é toque. A duração é instantânea."
  }, {
    id: "scrying",
    name: "Vidência",
    level: 5,
    school: "divination",
    ritual: false,
    castingTime: "1 ação",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: "um foco no valor de 1.000 po"
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você observa e escuta uma criatura em um sensor mágico distante se ela falhar no teste de resistência. A conjuração exige 1 ação e seu alcance é pessoal. A duração é instantânea."
  }, {
    id: "telekinesis",
    name: "Telecinese",
    level: 5,
    school: "transmutation",
    ritual: false,
    castingTime: "1 ação",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Você move criaturas ou objetos com força mental, podendo restringir ou arremessar um alvo. A conjuração exige 1 ação e seu alcance é pessoal. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "chain-lightning",
    name: "Relâmpago em Cadeia",
    level: 6,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "45 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Um relâmpago salta do alvo inicial para outras criaturas próximas, causando dano elétrico em cada uma. A conjuração exige 1 ação e seu alcance é 45 metros. A duração é instantânea."
  }, {
    id: "circle-of-death",
    name: "Círculo da Morte",
    level: 6,
    school: "necromancy",
    ritual: false,
    castingTime: "1 ação",
    range: "45 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Uma esfera de energia negativa explode em uma área e causa dano necrótico intenso. A conjuração exige 1 ação e seu alcance é 45 metros. A duração é instantânea."
  }, {
    id: "contingency",
    name: "Contingência",
    level: 6,
    school: "abjuration",
    ritual: false,
    castingTime: "10 minutos",
    range: "45 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você vincula uma magia de quinto nível ou menor a uma condição que a ativa automaticamente em você. A conjuração exige 10 minutos e seu alcance é 45 metros. A duração é instantânea."
  }, {
    id: "create-undead",
    name: "Criar Mortos-Vivos",
    level: 6,
    school: "necromancy",
    ritual: false,
    castingTime: "1 ação",
    range: "45 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você cria servos mortos-vivos poderosos a partir de cadáveres humanoides. A conjuração exige 1 ação e seu alcance é 45 metros. A duração é instantânea."
  }, {
    id: "disintegrate",
    name: "Desintegrar",
    level: 6,
    school: "transmutation",
    ritual: false,
    castingTime: "1 ação",
    range: "45 metros",
    components: {
      v: true,
      s: true,
      m: "um ímã e pó"
    },
    duration: "Instantânea",
    concentration: false,
    description: "Um raio verde causa enorme dano de força e reduz a pó criaturas que chegam a zero pontos de vida. A conjuração exige 1 ação e seu alcance é 45 metros. A duração é instantânea."
  }, {
    id: "forbiddance",
    name: "Proibição",
    level: 6,
    school: "abjuration",
    ritual: true,
    castingTime: "10 minutos",
    range: "45 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você protege uma área contra viagem planar e pode causar dano a tipos de criaturas escolhidos. A conjuração exige 10 minutos e seu alcance é 45 metros. A duração é instantânea."
  }, {
    id: "globe-of-invulnerability",
    name: "Globo de Invulnerabilidade",
    level: 6,
    school: "abjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "45 metros",
    components: {
      v: true,
      s: true,
      m: "uma conta de vidro"
    },
    duration: "Instantânea",
    concentration: false,
    description: "Uma barreira imóvel bloqueia magias de quinto nível ou menor lançadas de fora dela. A conjuração exige 1 ação e seu alcance é 45 metros. A duração é instantânea."
  }, {
    id: "heal",
    name: "Curar",
    level: 6,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "Toque",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Uma onda de energia positiva restaura 70 pontos de vida e remove cegueira, surdez e doenças. A conjuração exige 1 ação e seu alcance é toque. A duração é instantânea."
  }, {
    id: "mass-suggestion",
    name: "Sugestão em Massa",
    level: 6,
    school: "enchantment",
    ritual: false,
    castingTime: "1 ação",
    range: "45 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você influencia até doze criaturas com uma sugestão razoável que persiste por longo período. A conjuração exige 1 ação e seu alcance é 45 metros. A duração é instantânea."
  }, {
    id: "move-earth",
    name: "Mover a Terra",
    level: 6,
    school: "transmutation",
    ritual: false,
    castingTime: "1 ação",
    range: "45 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você remodela terra e pedra em uma área ampla, criando ou removendo elevações e valas. A conjuração exige 1 ação e seu alcance é 45 metros. A duração é instantânea."
  }, {
    id: "true-seeing",
    name: "Visão da Verdade",
    level: 6,
    school: "divination",
    ritual: false,
    castingTime: "1 ação",
    range: "45 metros",
    components: {
      v: true,
      s: true,
      m: "unguento no valor de 25 po"
    },
    duration: "Instantânea",
    concentration: false,
    description: "Uma criatura ganha visão verdadeira, percebendo ilusões, invisibilidade, metamorfos e outros planos próximos. A conjuração exige 1 ação e seu alcance é 45 metros. A duração é instantânea."
  }, {
    id: "wall-of-ice",
    name: "Muralha de Gelo",
    level: 6,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "45 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você cria uma parede de gelo que bloqueia passagem e pode explodir em estilhaços congelantes. A conjuração exige 1 ação e seu alcance é 45 metros. A duração é instantânea."
  }, {
    id: "delayed-blast-fireball",
    name: "Bola de Fogo de Explosão Retardada",
    level: 7,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "45 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você cria uma esfera de fogo que acumula energia até explodir ou ser liberada. A conjuração exige 1 ação e seu alcance é 45 metros. A duração é instantânea."
  }, {
    id: "etherealness",
    name: "Eterealidade",
    level: 7,
    school: "transmutation",
    ritual: false,
    castingTime: "1 ação",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você e criaturas voluntárias entram no Plano Etéreo e podem atravessar objetos no plano material. A conjuração exige 1 ação e seu alcance é pessoal. A duração é instantânea."
  }, {
    id: "finger-of-death",
    name: "Dedo da Morte",
    level: 7,
    school: "necromancy",
    ritual: false,
    castingTime: "1 ação",
    range: "45 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você lança energia negativa que causa dano necrótico massivo e pode erguer humanoides mortos como zumbis. A conjuração exige 1 ação e seu alcance é 45 metros. A duração é instantânea."
  }, {
    id: "forcecage",
    name: "Prisão de Força",
    level: 7,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "45 metros",
    components: {
      v: true,
      s: true,
      m: "pó de rubi no valor de 1.500 po"
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você cria uma prisão invisível e imóvel de força que aprisiona criaturas sem permitir fuga comum. A conjuração exige 1 ação e seu alcance é 45 metros. A duração é instantânea."
  }, {
    id: "mirage-arcane",
    name: "Miragem Arcana",
    level: 7,
    school: "illusion",
    ritual: false,
    castingTime: "1 ação",
    range: "45 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você altera a aparência e características sensoriais de um terreno em uma área enorme. A conjuração exige 1 ação e seu alcance é 45 metros. A duração é instantânea."
  }, {
    id: "plane-shift",
    name: "Viagem Planar",
    level: 7,
    school: "conjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "45 metros",
    components: {
      v: true,
      s: true,
      m: "uma haste de metal sintonizada"
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você transporta criaturas para outro plano de existência ou tenta banir um alvo para seu plano natal. A conjuração exige 1 ação e seu alcance é 45 metros. A duração é instantânea."
  }, {
    id: "teleport",
    name: "Teletransporte",
    level: 7,
    school: "conjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "3 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você transporta instantaneamente a si mesmo e criaturas voluntárias para um destino conhecido, com risco de desvio para locais menos familiares.  Os objetos carregados também são transportados conforme as regras da magia."
  }, {
    id: "regenerate",
    name: "Regenerar",
    level: 7,
    school: "transmutation",
    ritual: false,
    castingTime: "1 ação",
    range: "Toque",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Uma criatura recupera vida ao longo do tempo e pode restaurar membros perdidos. A conjuração exige 1 ação e seu alcance é toque. A duração é instantânea."
  }, {
    id: "resurrection",
    name: "Ressurreição",
    level: 7,
    school: "necromancy",
    ritual: false,
    castingTime: "1 ação",
    range: "Toque",
    components: {
      v: true,
      s: true,
      m: "diamante no valor de 1.000 po"
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você traz de volta uma criatura morta há até um século, restaurando doenças, venenos e mutilações. A conjuração exige 1 ação e seu alcance é toque. A duração é instantânea."
  }, {
    id: "antimagic-field",
    name: "Campo Antimagia",
    level: 8,
    school: "abjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: "uma pitada de ferro ou limalha"
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Uma aura ao seu redor suprime magia e itens mágicos dentro de sua área enquanto mantiver a concentração. A conjuração exige 1 ação e seu alcance é pessoal. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "dominate-monster",
    name: "Dominar Monstro",
    level: 8,
    school: "enchantment",
    ritual: false,
    castingTime: "1 ação",
    range: "45 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Você controla telepaticamente uma criatura, mesmo que não seja humanoide, se ela falhar no teste. A conjuração exige 1 ação e seu alcance é 45 metros. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "feeblemind",
    name: "Debilitar",
    level: 8,
    school: "enchantment",
    ritual: false,
    castingTime: "1 ação",
    range: "45 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você causa dano psíquico e reduz drasticamente Inteligência e Carisma de uma criatura que falhar no teste. A conjuração exige 1 ação e seu alcance é 45 metros. A duração é instantânea."
  }, {
    id: "glibness",
    name: "Lábia",
    level: 8,
    school: "transmutation",
    ritual: false,
    castingTime: "1 ação",
    range: "45 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Sua fala se torna sobrenaturalmente convincente e seus testes de Carisma não podem resultar abaixo de 15. A conjuração exige 1 ação e seu alcance é 45 metros. A duração é instantânea."
  }, {
    id: "holy-aura",
    name: "Aura Sagrada",
    level: 8,
    school: "abjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "45 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Luz divina envolve aliados, melhorando defesas e punindo criaturas malignas que os atacam. A conjuração exige 1 ação e seu alcance é 45 metros. A duração é instantânea."
  }, {
    id: "maze",
    name: "Labirinto",
    level: 8,
    school: "conjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "45 metros",
    components: {
      v: true,
      s: true,
      m: "uma pedra de labirinto"
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você bane uma criatura para um labirinto extradimensional do qual ela deve escapar por conta própria. A conjuração exige 1 ação e seu alcance é 45 metros. A duração é instantânea."
  }, {
    id: "mind-blank",
    name: "Mente em Branco",
    level: 8,
    school: "abjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "45 metros",
    components: {
      v: true,
      s: true,
      m: "casca de ovo"
    },
    duration: "24 horas",
    concentration: false,
    description: "Você protege uma criatura contra dano psíquico, leitura mental, emoções e adivinhação. A conjuração exige 1 ação e seu alcance é 45 metros. O efeito dura 24 horas, salvo se a própria magia indicar outra condição de término."
  }, {
    id: "sunburst",
    name: "Explosão Solar",
    level: 8,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "45 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Luz solar intensa causa dano radiante e pode cegar criaturas em uma grande área. A conjuração exige 1 ação e seu alcance é 45 metros. A duração é instantânea."
  }, {
    id: "astral-projection",
    name: "Projeção Astral",
    level: 9,
    school: "necromancy",
    ritual: false,
    castingTime: "1 ação",
    range: "45 metros",
    components: {
      v: true,
      s: true,
      m: "jacinto no valor de 1.000 po e barra de prata"
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você e aliados projetam seus corpos astrais para o Plano Astral, deixando os corpos físicos em animação suspensa. A conjuração exige 1 ação e seu alcance é 45 metros. A duração é instantânea."
  }, {
    id: "foresight",
    name: "Previsão",
    level: 9,
    school: "divination",
    ritual: false,
    castingTime: "1 ação",
    range: "45 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "8 horas",
    concentration: false,
    description: "Você concede a uma criatura percepção do futuro, com vantagem ampla e desvantagem para ataques contra ela. A conjuração exige 1 ação e seu alcance é 45 metros. O efeito dura 8 horas, salvo se a própria magia indicar outra condição de término."
  }, {
    id: "gate",
    name: "Portal",
    level: 9,
    school: "conjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: "diamante no valor de 5.000 po"
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você abre um portal para outro plano e pode atrair uma criatura específica para perto de você. A conjuração exige 1 ação e seu alcance é 18 metros. A duração é instantânea."
  }, {
    id: "mass-heal",
    name: "Cura em Massa",
    level: 9,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "45 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Uma onda de energia restauradora cura severamente muitas criaturas e remove condições debilitantes. A conjuração exige 1 ação e seu alcance é 45 metros. A duração é instantânea."
  }, {
    id: "meteor-swarm",
    name: "Chuva de Meteoros",
    level: 9,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "1,6 quilômetro",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Quatro esferas flamejantes explodem em pontos distantes, causando enorme dano de fogo e contundente. A conjuração exige 1 ação e seu alcance é 1,6 quilômetro. A duração é instantânea."
  }, {
    id: "shapechange",
    name: "Metamorfose Verdadeira",
    level: 9,
    school: "transmutation",
    ritual: false,
    castingTime: "1 ação",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Você assume a forma de outra criatura e adquire muitas de suas capacidades físicas. A conjuração exige 1 ação e seu alcance é pessoal. O efeito termina cedo se sua concentração for interrompida."
  }, {
    id: "true-resurrection",
    name: "Ressurreição Verdadeira",
    level: 9,
    school: "necromancy",
    ritual: false,
    castingTime: "1 ação",
    range: "Toque",
    components: {
      v: true,
      s: true,
      m: "diamantes no valor de 25.000 po"
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você restaura à vida uma criatura morta há até duzentos anos, recriando seu corpo se necessário. A conjuração exige 1 ação e seu alcance é toque. A duração é instantânea."
  }, {
    id: "wish",
    name: "Desejo",
    level: 9,
    school: "conjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "Pessoal",
    components: {
      v: true,
      s: false,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Desejo é a magia mais poderosa que uma criatura mortal pode conjurar.  Você pode duplicar qualquer magia de 8º nível ou menor sem cumprir seus requisitos, ou criar outro efeito extraordinário a critério do Mestre.  Usos além de duplicar uma magia podem causar estresse e impedir que você volte a conjurar Desejo."
  }, {
    id: "true-strike",
    name: "Golpe Verdadeiro",
    level: 0,
    school: "divination",
    ritual: false,
    castingTime: "1 ação",
    range: "9 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 rodada",
    concentration: false,
    description: "Você estende a mão e aponta para um alvo dentro do alcance.  No próximo turno, recebe vantagem no primeiro ataque contra ele."
  }, {
    id: "friends",
    name: "Amizade",
    level: 0,
    school: "enchantment",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você obtém vantagem em testes de Carisma contra uma criatura não hostil escolhida.  Quando a magia termina, a criatura percebe que foi influenciada magicamente."
  }, {
    id: "spare-the-dying",
    name: "Poupar os Moribundos",
    level: 0,
    school: "necromancy",
    ritual: false,
    castingTime: "1 ação",
    range: "Toque",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você toca uma criatura viva com zero pontos de vida.  Ela se torna estável sem recuperar pontos de vida."
  }, {
    id: "shillelagh",
    name: "Bordão Mágico",
    level: 0,
    school: "transmutation",
    ritual: false,
    castingTime: "1 ação bônus",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "1 minuto",
    concentration: false,
    description: "Um porrete ou cajado que você segura se torna mágico.  Ele usa sua habilidade de conjuração para ataques e causa 1d8 de dano."
  }, {
    id: "darkvision",
    name: "Visão no Escuro",
    level: 2,
    school: "transmutation",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: "uma cenoura seca ou uma ágata"
    },
    duration: "8 horas",
    concentration: false,
    description: "Você concede visão no escuro a uma criatura voluntária.  Ela enxerga no escuro por 18 metros em tons de cinza."
  }, {
    id: "hellish-rebuke",
    name: "Repreensão Infernal",
    level: 1,
    school: "evocation",
    ritual: false,
    castingTime: "1 reação",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você aponta para a criatura que acabou de feri-lo e a envolve em chamas infernais.  Ela sofre dano de fogo se falhar em um teste de Destreza."
  }, {
    id: "witch-bolt",
    name: "Raio de Bruxa",
    level: 1,
    school: "evocation",
    ritual: false,
    castingTime: "1 ação",
    range: "9 metros",
    components: {
      v: true,
      s: true,
      m: "um ramo de árvore atingida por relâmpago"
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Um raio de energia crepitante liga você a uma criatura dentro do alcance.  Enquanto mantiver a concentração, pode causar dano elétrico automaticamente nos turnos seguintes."
  }, {
    id: "cloud-of-daggers",
    name: "Nuvem de Adagas",
    level: 2,
    school: "conjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Você preenche um cubo com adagas giratórias feitas de força.  Uma criatura sofre dano cortante ao entrar na área ou iniciar o turno nela."
  }, {
    id: "hunger-of-hadar",
    name: "Fome de Hadar",
    level: 3,
    school: "conjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "45 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Você cria uma esfera de escuridão gelada e ruidosa.  Criaturas em seu interior sofrem dano de frio e ácido e têm o movimento dificultado."
  }, {
    id: "vampiric-touch",
    name: "Toque Vampírico",
    level: 3,
    school: "necromancy",
    ritual: false,
    castingTime: "1 ação",
    range: "Pessoal",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Sua mão fica envolta em energia sombria para ataques mágicos corpo a corpo.  Você recupera metade do dano necrótico causado por esses ataques."
  }, {
    id: "dream",
    name: "Sonho",
    level: 5,
    school: "illusion",
    ritual: false,
    castingTime: "1 minuto",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "8 horas",
    concentration: false,
    description: "Você molda o sonho de uma criatura conhecida e pode conversar com ela durante o descanso.  Um mensageiro pode transformar o sonho em pesadelo e causar dano psíquico."
  }, {
    id: "hold-monster",
    name: "Imobilizar Monstro",
    level: 5,
    school: "enchantment",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Você paralisa uma criatura que falhar em um teste de Sabedoria.  Ela pode repetir o teste ao fim de cada turno para encerrar o efeito."
  }, {
    id: "arcane-gate",
    name: "Portal Arcano",
    level: 6,
    school: "conjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "150 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você cria dois portais conectados em superfícies visíveis.  Qualquer criatura pode atravessar um portal para sair pelo outro."
  }, {
    id: "eyebite",
    name: "Olhar Aterrador",
    level: 6,
    school: "necromancy",
    ritual: false,
    castingTime: "1 ação",
    range: "45 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Seus olhos se tornam condutos de magia sombria contra uma criatura que você vê.  A cada turno, você pode fazê-la dormir, entrar em pânico ou adoecer."
  }, {
    id: "flesh-to-stone",
    name: "Carne em Pedra",
    level: 6,
    school: "transmutation",
    ritual: false,
    castingTime: "1 ação",
    range: "45 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Você tenta transformar uma criatura em pedra após sucessivos testes de resistência falhos.  Uma criatura petrificada dessa forma pode ser restaurada por magia apropriada."
  }, {
    id: "demiplane",
    name: "Semiplano",
    level: 8,
    school: "conjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "1 hora",
    concentration: false,
    description: "Você cria uma porta para uma câmara extradimensional vazia ou para um semiplano conhecido.  A porta permanece aberta por uma hora."
  }, {
    id: "power-word-stun",
    name: "Palavra de Poder Atordoar",
    level: 8,
    school: "enchantment",
    ritual: false,
    castingTime: "1 ação",
    range: "45 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você profere uma palavra de poder contra uma criatura com 150 pontos de vida ou menos.  Ela fica atordoada até conseguir superar o efeito."
  }, {
    id: "true-polymorph",
    name: "Polimorfia Verdadeira",
    level: 9,
    school: "transmutation",
    ritual: false,
    castingTime: "1 ação",
    range: "45 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Concentração, até 1 minuto",
    concentration: true,
    description: "Você transforma uma criatura ou objeto em outra forma de maneira duradoura.  Após a concentração completa, a transformação pode se tornar permanente."
  }, {
    id: "death-ward",
    name: "Proteção contra a Morte",
    level: 4,
    school: "abjuration",
    ritual: false,
    castingTime: "1 ação",
    range: "36 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você protege uma criatura contra a morte súbita.  A primeira vez que ela cair a zero pontos de vida, cai para 1 em vez disso."
  }, {
    id: "magic-weapon",
    name: "Arma Mágica",
    level: 2,
    school: "transmutation",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: "ferrugem em pó"
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você transforma uma arma não mágica em uma arma mágica com bônus em ataques e dano.  O bônus aumenta quando conjurada com espaços de nível mais alto."
  }, {
    id: "ray-of-enfeeblement",
    name: "Raio do Enfraquecimento",
    level: 2,
    school: "necromancy",
    ritual: false,
    castingTime: "1 ação",
    range: "18 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Um raio negro enfraquece uma criatura que falhar no ataque mágico.  Seus ataques com armas baseados em Força passam a causar metade do dano."
  }, {
    id: "clone",
    name: "Clone",
    level: 8,
    school: "necromancy",
    ritual: false,
    castingTime: "1 ação",
    range: "45 metros",
    components: {
      v: true,
      s: true,
      m: null
    },
    duration: "Instantânea",
    concentration: false,
    description: "Você cria um duplicado inerte de uma criatura viva em um recipiente selado.  Se ela morrer, sua alma pode ocupar o clone e retornar à vida."
  }];
