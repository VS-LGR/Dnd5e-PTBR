import type { FeatDefinition } from "@/config/types";

export const FEATS: FeatDefinition[] = [
  {
    id: "alert",
    name: "Alerta",
    source: "phb",
    description:
      "Você ganha +5 de bônus em iniciativa. Você não pode ser surpreendido enquanto estiver consciente. Outras criaturas não ganham vantagem em jogadas de ataque contra você como resultado de estarem escondidas de você.",
  },
  {
    id: "athlete",
    name: "Atleta",
    source: "phb",
    description:
      "Aumente Força ou Destreza em 1. Quando estiver caído, gastar apenas 1,5 m de movimento para se levantar. Escalar não custa movimento extra. Com corrida, pode dar salto em distância/altura com apenas 1,5 m de corrida.",
    abilityBonusChoices: ["strength", "dexterity"],
  },
  {
    id: "actor",
    name: "Ator",
    source: "phb",
    description:
      "Aumente Carisma em 1. Você tem vantagem em testes de Carisma (Enganação) e (Performance) quando tentar se passar por outra pessoa. Pode imitar a fala de outra pessoa ou os sons feitos por outras criaturas que tenha ouvido.",
    abilityBonus: { charisma: 1 },
  },
  {
    id: "charger",
    name: "Carregador",
    source: "phb",
    description:
      "Quando você usa a ação Disparada e se move pelo menos 3 metros em linha reta até um alvo, como ação bônus pode fazer um ataque corpo a corpo com arma ou empurrar a criatura. Em acerto, +5 de dano ou empurra 3 metros.",
  },
  {
    id: "crossbow-expert",
    name: "Especialista em Besta",
    source: "phb",
    description:
      "Ignora a propriedade recarga de bestas com as quais você é proficiente. Estar a 1,5 m de uma criatura hostil não impõe desvantagem em ataques à distância. Ao atacar com arma de uma mão, pode usar ação bônus para atacar com besta de mão carregada.",
  },
  {
    id: "defensive-duelist",
    name: "Duelista Defensivo",
    source: "phb",
    description:
      "Quando uma criatura te acerta com um ataque corpo a corpo enquanto você empunha uma arma de acuidade com a qual é proficiente, pode usar sua reação para adicionar seu bônus de proficiência à CA contra aquele ataque.",
    prerequisites: "Destreza 13 ou mais",
  },
  {
    id: "dual-wielder",
    name: "Combatente com Duas Armas",
    source: "phb",
    description:
      "Você ganha +1 de CA enquanto empunha uma arma corpo a corpo distinta em cada mão. Pode usar combate com duas armas mesmo que as armas não sejam leves. Pode sacar ou guardar duas armas de uma mão quando normalmente sacaria ou guardaria apenas uma.",
  },
  {
    id: "dungeon-delver",
    name: "Explorador de Masmorras",
    source: "phb",
    description:
      "Você tem vantagem em testes de Sabedoria (Percepção) e Inteligência (Investigação) feitos para detectar a presença de armadilhas secretas. Tem vantagem em salvaguardas para evitar ou resistir a armadilhas. Resistência a dano de armadilhas. Buscar armadilhas em ritmo normal não impõe desvantagem em Percepção.",
  },
  {
    id: "durable",
    name: "Durável",
    source: "phb",
    description:
      "Aumente Constituição em 1. Ao rolar um Dado de Vida para recuperar pontos de vida, o mínimo que você pode recuperar é o dobro do seu modificador de Constituição (mínimo 2).",
    abilityBonus: { constitution: 1 },
  },
  {
    id: "elemental-adept",
    name: "Adepto Elemental",
    source: "phb",
    description:
      "Escolha um tipo de dano: ácido, frio, fogo, relâmpago ou trovão. Magias que você conjura ignoram resistência a esse tipo de dano. Ao rolar dano desse tipo com uma magia, trate qualquer 1 em um dado de dano como 2.",
    prerequisites: "Habilidade de conjurar pelo menos uma magia",
  },
  {
    id: "grappler",
    name: "Agarrador",
    source: "phb",
    description:
      "Você tem vantagem em jogadas de ataque contra uma criatura que estiver agarrando. Pode usar sua ação para tentar imobilizar uma criatura agarrada por você (outra disputa de Força/Atletismo). Se tiver sucesso, tanto você quanto a criatura ficam restringidos.",
    prerequisites: "Força 13 ou mais",
  },
  {
    id: "great-weapon-master",
    name: "Mestre de Armas Grandes",
    source: "phb",
    description:
      "Em seu turno, quando obtém um acerto crítico com uma arma corpo a corpo ou reduz uma criatura a 0 PV, pode fazer um ataque corpo a corpo com arma como ação bônus. Antes de atacar com arma pesada que empunha com duas mãos, pode escolher -5 no ataque para +10 de dano.",
  },
  {
    id: "healer",
    name: "Curandeiro",
    source: "phb",
    description:
      "Ao usar um kit de curandeiro para estabilizar, a criatura também recupera 1 PV. Como ação, pode gastar um uso do kit e fazer uma criatura recuperar 1d6 + 4 + número de Dados de Vida dela em PV. A criatura não pode se beneficiar novamente até terminar um descanso curto ou longo.",
  },
  {
    id: "heavily-armored",
    name: "Fortemente Armado",
    source: "phb",
    description:
      "Aumente Força em 1. Você ganha proficiência com armaduras pesadas.",
    prerequisites: "Proficiência com armadura média",
    abilityBonus: { strength: 1 },
  },
  {
    id: "inspiring-leader",
    name: "Líder Inspirador",
    source: "phb",
    description:
      "Você pode gastar 10 minutos inspirando seus companheiros. Escolha até seis criaturas amigáveis (incluindo você) a até 9 metros que possam ver ou ouvir você. Cada uma ganha pontos de vida temporários iguais ao seu nível + modificador de Carisma. Uma criatura não pode se beneficiar novamente até terminar um descanso curto ou longo.",
    prerequisites: "Carisma 13 ou mais",
  },
  {
    id: "keen-mind",
    name: "Mente Aguçada",
    source: "phb",
    description:
      "Aumente Inteligência em 1. Você sempre sabe qual é a direção do norte. Sempre sabe quantas horas faltam para o próximo nascer ou pôr do sol. Pode recordar com precisão qualquer coisa vista ou ouvida no último mês.",
    abilityBonus: { intelligence: 1 },
  },
  {
    id: "lightly-armored",
    name: "Levemente Armado",
    source: "phb",
    description:
      "Aumente Força ou Destreza em 1. Você ganha proficiência com armaduras leves.",
    abilityBonusChoices: ["strength", "dexterity"],
  },
  {
    id: "linguist",
    name: "Linguista",
    source: "phb",
    description:
      "Aumente Inteligência em 1. Você aprende três idiomas à sua escolha. Pode criar cifras escritas. Outros não podem decifrar a cifra a menos que você ensine, tenham sucesso em um teste de Inteligência (CD igual à sua Inteligência + bônus de proficiência) ou usem magia para decifrá-la.",
    abilityBonus: { intelligence: 1 },
  },
  {
    id: "lucky",
    name: "Sortudo",
    source: "phb",
    description:
      "Você tem 3 pontos de sorte. Sempre que fizer uma jogada de ataque, teste de habilidade ou salvaguarda, pode gastar um ponto para rolar um d20 adicional e escolher qual usar. Também pode gastar um ponto quando uma jogada de ataque for feita contra você. Recupera os pontos gastos ao terminar um descanso longo.",
  },
  {
    id: "mage-slayer",
    name: "Assassino de Magos",
    source: "phb",
    description:
      "Quando uma criatura a até 1,5 m de você conjura uma magia, pode usar sua reação para fazer um ataque corpo a corpo contra ela. Quando você causa dano a uma criatura concentrando-se, ela tem desvantagem na salvaguarda para manter a concentração. Você tem vantagem em salvaguardas contra magias conjuradas por criaturas a até 1,5 m de você.",
  },
  {
    id: "magic-initiate",
    name: "Iniciado em Magia",
    source: "phb",
    description:
      "Escolha uma classe: bardo, clérigo, druida, feiticeiro, mago ou bruxo. Aprenda dois truques dessa classe. Além disso, escolha uma magia de 1º nível dessa lista; pode conjurá-la no nível mais baixo uma vez por descanso longo. A habilidade de conjuração depende da classe escolhida.",
  },
  {
    id: "martial-adept",
    name: "Adepto Marcial",
    source: "phb",
    description:
      "Você aprende duas manobras à sua escolha da lista do Mestre de Batalha. Se já tiver dados de superioridade, ganha um adicional; caso contrário, ganha um d6. Esse dado é usado para alimentar suas manobras e é recuperado ao terminar um descanso curto ou longo.",
  },
  {
    id: "medium-armor-master",
    name: "Mestre de Armadura Média",
    source: "phb",
    description:
      "Usar armadura média não impõe desvantagem em furtividade. Ao usar armadura média, pode adicionar 3 (em vez de 2) à CA se sua Destreza for 16 ou mais.",
    prerequisites: "Proficiência com armadura média",
  },
  {
    id: "mobile",
    name: "Móvel",
    source: "phb",
    description:
      "Seu deslocamento aumenta em 3 metros. Ao usar a ação Disparada, terreno difícil não custa movimento extra naquele turno. Ao fazer um ataque corpo a corpo contra uma criatura, você não provoca ataques de oportunidade dela pelo resto do turno, seja acertando ou errando.",
  },
  {
    id: "moderately-armored",
    name: "Moderadamente Armado",
    source: "phb",
    description:
      "Aumente Força ou Destreza em 1. Você ganha proficiência com armaduras médias e escudos.",
    prerequisites: "Proficiência com armadura leve",
    abilityBonusChoices: ["strength", "dexterity"],
  },
  {
    id: "mounted-combatant",
    name: "Combatente Montado",
    source: "phb",
    description:
      "Você tem vantagem em jogadas de ataque corpo a corpo contra criaturas desmontadas menores que sua montaria. Pode forçar um ataque destinado à montaria a mirar em você. Se sua montaria for forçada a fazer uma salvaguarda de Destreza contra efeito que causa metade do dano em sucesso, ela não sofre dano em sucesso e metade em falha.",
  },
  {
    id: "observant",
    name: "Observador",
    source: "phb",
    description:
      "Aumente Inteligência ou Sabedoria em 1. Se puder ver a boca de uma criatura falando um idioma que você compreende, pode interpretar o que ela diz lendo os lábios. Você tem +5 de bônus em sua passiva de Sabedoria (Percepção) e Inteligência (Investigação).",
    abilityBonusChoices: ["intelligence", "wisdom"],
  },
  {
    id: "polearm-master",
    name: "Mestre de Armas de Haste",
    source: "phb",
    description:
      "Quando ataca com glaive, haste, bastão ou lança, pode usar ação bônus para fazer um ataque corpo a corpo com a outra extremidade (1d4 de concussão). Enquanto empunha essas armas, outras criaturas provocam ataque de oportunidade quando entram no seu alcance.",
  },
  {
    id: "resilient",
    name: "Resiliente",
    source: "phb",
    description:
      "Escolha um atributo. Aumente-o em 1 e ganhe proficiência em salvaguardas usando esse atributo.",
    abilityBonusChoices: [
      "strength",
      "dexterity",
      "constitution",
      "intelligence",
      "wisdom",
      "charisma",
    ],
  },
  {
    id: "ritual-caster",
    name: "Conjurador Ritual",
    source: "phb",
    description:
      "Escolha bardo, clérigo, druida, feiticeiro, mago ou bruxo. Você ganha um livro ritual com duas magias de 1º nível com a marca de ritual dessa classe. Pode conjurá-las apenas como rituais. Pode copiar magias rituais adicionais para o livro. A habilidade de conjuração depende da classe escolhida.",
    prerequisites: "Inteligência ou Sabedoria 13 ou mais",
  },
  {
    id: "savage-attacker",
    name: "Atacante Selvagem",
    source: "phb",
    description:
      "Uma vez por turno, ao rolar dano de um ataque com arma corpo a corpo, você pode rerrolar os dados de dano da arma e usar qualquer um dos resultados.",
  },
  {
    id: "sentinel",
    name: "Sentinela",
    source: "phb",
    description:
      "Quando acerta uma criatura com um ataque de oportunidade, o deslocamento dela se torna 0 pelo resto do turno. Criaturas provocam ataque de oportunidade mesmo se usarem a ação Desengajar. Quando uma criatura a até 1,5 m ataca um alvo que não seja você, pode usar reação para fazer um ataque corpo a corpo com arma contra o atacante.",
  },
  {
    id: "sharpshooter",
    name: "Atirador de Elite",
    source: "phb",
    description:
      "Atacar a longa distância não impõe desvantagem. Seus ataques à distância ignoram cobertura metade e três quartos. Antes de atacar com arma à distância com a qual é proficiente, pode escolher -5 no ataque para +10 de dano.",
  },
  {
    id: "shield-master",
    name: "Mestre de Escudo",
    source: "phb",
    description:
      "Se tomar a ação Ataque em seu turno, pode usar ação bônus para tentar derrubar uma criatura a até 1,5 m com o escudo. Se for alvo de efeito que permite salvaguarda de Destreza para metade do dano, pode usar reação para não sofrer dano se tiver sucesso (com escudo). Se a salvaguarda for contra efeito apenas de você, tem vantagem.",
  },
  {
    id: "skilled",
    name: "Habilidoso",
    source: "phb",
    description: "Você ganha proficiência em qualquer combinação de três perícias ou ferramentas à sua escolha.",
  },
  {
    id: "skulker",
    name: "Furtivo",
    source: "phb",
    description:
      "Você pode tentar se esconder quando estiver apenas levemente obscurecido. A posição de um ataque à distância perdido não é revelada se você estiver escondido. Visão na penumbra não impõe desvantagem em testes de Sabedoria (Percepção) baseados em visão.",
    prerequisites: "Destreza 13 ou mais",
  },
  {
    id: "spell-sniper",
    name: "Atirador Arcano",
    source: "phb",
    description:
      "Quando conjura uma magia de ataque que exige jogada de ataque, o alcance da magia é dobrado. Seus ataques mágicos à distância ignoram cobertura metade e três quartos. Você aprende um truque que exige jogada de ataque de uma lista de classe à escolha (bardo, clérigo, druida, feiticeiro, mago ou bruxo).",
    prerequisites: "Habilidade de conjurar pelo menos uma magia",
  },
  {
    id: "tavern-brawler",
    name: "Brigão de Taverna",
    source: "phb",
    description:
      "Aumente Força ou Constituição em 1. Você é proficiente com armas improvisadas e dano desarmado é 1d4. Ao acertar com ataque desarmado ou improvisado, pode usar ação bônus para tentar agarrar o alvo.",
    abilityBonusChoices: ["strength", "constitution"],
  },
  {
    id: "tough",
    name: "Robusto",
    source: "phb",
    description:
      "Seu máximo de pontos de vida aumenta em um valor igual ao dobro do seu nível quando você adquire este talento. Sempre que sobe de nível depois disso, seu máximo de PV aumenta em 2 adicionais.",
  },
  {
    id: "war-caster",
    name: "Conjurador de Guerra",
    source: "phb",
    description:
      "Você tem vantagem em salvaguardas de Constituição para manter concentração. Pode realizar componentes somáticos mesmo com armas ou escudo nas mãos. Quando uma criatura provoca ataque de oportunidade, pode usar reação para conjurar uma magia nela em vez de atacar (deve ter tempo de conjuração de 1 ação e mirar apenas naquela criatura).",
    prerequisites: "Habilidade de conjurar pelo menos uma magia",
  },
  {
    id: "weapon-master",
    name: "Mestre de Armas",
    source: "phb",
    description:
      "Aumente Força ou Destreza em 1. Você ganha proficiência com quatro armas à sua escolha.",
    abilityBonusChoices: ["strength", "dexterity"],
  },

  // ─── Tasha's Cauldron of Everything ────────────────────
  {
    id: "metamagic-adept",
    name: "Adepto de Metamagia",
    source: "tcoe",
    prerequisites: "Habilidade de conjuração de magias ou de característica de classe que concede magias",
    description:
      "Você aprende duas opções de Metamagia à sua escolha da lista do feiticeiro. Pode usá-las gastando pontos de feitiçaria como um feiticeiro. Ganha 2 pontos de feitiçaria para alimentar essas opções (somam-se a quaisquer pontos que já possua). Recupera esses pontos ao terminar um descanso longo. Sempre que ganhar um nível, pode substituir uma opção de Metamagia aprendida por este talento por outra.",
  },
  {
    id: "eldritch-adept",
    name: "Adepto Sobrenatural",
    source: "tcoe",
    prerequisites: "Conjuração de magias ou característica de classe que concede magias",
    description:
      "Você aprende uma invocação sobrenatural à sua escolha da lista do bruxo. Se a invocação tiver pré-requisito, você só pode escolhê-la se for um bruxo e atender ao pré-requisito. Sempre que ganhar um nível, pode substituir a invocação por outra que possa aprender.",
  },
  {
    id: "chef",
    name: "Chef",
    source: "tcoe",
    description:
      "Aumente Constituição ou Sabedoria em 1. Você ganha proficiência com utensílios de cozinheiro (ou expertise se já for proficiente). Como parte de um descanso curto, pode cozinhar refeições especiais: até 4 + modificador de proficiência criaturas que comerem recuperam 1d8 PV extras. Com 1 hora de trabalho ou ao terminar um descanso longo, pode preparar guloseimas que concedem PV temporários iguais ao seu bônus de proficiência; as guloseimas duram 8 horas e você prepara um número igual a 4 + modificador de proficiência.",
    abilityBonusChoices: ["constitution", "wisdom"],
  },
  {
    id: "poisoner",
    name: "Envenenador",
    source: "tcoe",
    description:
      "Você ignora resistência a dano de veneno ao causar dano de veneno com um ataque. Pode aplicar veneno a uma arma ou munição como ação bônus (em vez de ação). Você ganha proficiência com o kit de envenenador (ou expertise se já for proficiente). Com o kit, durante um descanso curto pode criar um número de doses de veneno potente igual ao seu bônus de proficiência. Uma criatura atingida deve ter sucesso em salvaguarda de Constituição (CD 8 + proficiência + Int ou Des) ou sofrer 2d8 de veneno e ficar envenenada até o fim do seu próximo turno.",
  },
  {
    id: "crusher",
    name: "Esmagador",
    source: "tcoe",
    description:
      "Aumente Força ou Constituição em 1. Uma vez por turno, ao acertar uma criatura com ataque que cause dano de concussão, pode movê-la 1,5 m para um espaço desocupado, desde que o alvo seja no máximo uma categoria de tamanho maior que você. Quando você causa um acerto crítico que cause dano de concussão a uma criatura, ataques contra esse alvo têm vantagem até o início do seu próximo turno.",
    abilityBonusChoices: ["strength", "constitution"],
  },
  {
    id: "skill-expert",
    name: "Especialista em Perícia",
    source: "tcoe",
    description:
      "Aumente um atributo à sua escolha em 1. Você ganha proficiência em uma perícia à sua escolha. Escolha uma perícia em que seja proficiente: seu bônus de proficiência é dobrado para testes com ela (não pode escolher uma perícia que já tenha expertise, a menos que outra característica diga o contrário).",
    abilityBonusChoices: [
      "strength",
      "dexterity",
      "constitution",
      "intelligence",
      "wisdom",
      "charisma",
    ],
  },
  {
    id: "artificer-initiate",
    name: "Iniciado Artífice",
    source: "tcoe",
    description:
      "Você aprende um truque à sua escolha da lista de artífice; Inteligência é sua habilidade de conjuração para ele. Escolha uma magia de 1º nível da lista de artífice: pode conjurá-la sem gastar espaço uma vez por descanso longo e também pode conjurá-la usando espaços de magia que possua. Você ganha proficiência com um tipo de ferramentas de artesão à sua escolha.",
  },
  {
    id: "fighting-initiate",
    name: "Iniciado de Combate",
    source: "tcoe",
    prerequisites: "Proficiência com uma arma marcial",
    description:
      "Você aprende um Estilo de Combate à sua escolha da lista do guerreiro. Se já tiver um estilo, deve escolher um diferente. Sempre que ganhar um nível, pode substituir o estilo aprendido por este talento por outro da lista do guerreiro.",
  },
  {
    id: "slasher",
    name: "Cortador",
    source: "tcoe",
    description:
      "Aumente Força ou Destreza em 1. Uma vez por turno, ao acertar uma criatura com ataque que cause dano cortante, pode reduzir o deslocamento dela em 3 m até o início do seu próximo turno. Quando causa um acerto crítico que cause dano cortante, o alvo tem desvantagem em todas as jogadas de ataque até o início do seu próximo turno.",
    abilityBonusChoices: ["strength", "dexterity"],
  },
  {
    id: "piercer",
    name: "Perfurador",
    source: "tcoe",
    description:
      "Aumente Força ou Destreza em 1. Uma vez por turno, ao acertar uma criatura com ataque que cause dano perfurante, pode rerrolar um dos dados de dano da arma e usar qualquer resultado. Quando causa um acerto crítico que cause dano perfurante, pode rolar um dado de dano adicional da arma e adicioná-lo ao dano extra do crítico.",
    abilityBonusChoices: ["strength", "dexterity"],
  },
  {
    id: "gunner",
    name: "Atirador de Armas de Fogo",
    source: "tcoe",
    description:
      "Aumente Destreza em 1. Você ganha proficiência com armas de fogo. Ignora a propriedade recarga de armas de fogo com as quais é proficiente. Estar a 1,5 m de uma criatura hostil não impõe desvantagem em suas jogadas de ataque à distância com armas de fogo.",
    abilityBonus: { dexterity: 1 },
  },
  {
    id: "telekinetic",
    name: "Telecinético",
    source: "tcoe",
    description:
      "Aumente Inteligência, Sabedoria ou Carisma em 1. Você aprende o truque mão do mago (pode conjurá-lo sem componentes verbais ou somáticos; a mão é invisível). Se já o conhecia, o alcance aumenta em 9 m. Como ação bônus, pode tentar empurrar telepaticamente uma criatura que possa ver a até 9 m: ela faz salvaguarda de Força (CD 8 + proficiência + o atributo aumentado) ou é movida 1,5 m na direção que você escolher.",
    abilityBonusChoices: ["intelligence", "wisdom", "charisma"],
  },
  {
    id: "telepathic",
    name: "Telepata",
    source: "tcoe",
    description:
      "Aumente Inteligência, Sabedoria ou Carisma em 1. Você pode falar telepaticamente com qualquer criatura a até 18 m. A criatura entende você apenas se souber pelo menos um idioma, mas não precisa compartilhar um idioma com você. Você não precisa ver a criatura. Uma vez por descanso longo, pode conjurar detectar pensamentos sem gastar espaço; a habilidade de conjuração é o atributo aumentado. Também pode conjurá-la com espaços de magia que possua.",
    abilityBonusChoices: ["intelligence", "wisdom", "charisma"],
  },
  {
    id: "fey-touched",
    name: "Tocado pelas Fadas",
    source: "tcoe",
    description:
      "Aumente Inteligência, Sabedoria ou Carisma em 1. Você aprende a magia passo nebuloso e uma magia de 1º nível à sua escolha das escolas de adivinhação ou encantamento. Pode conjurar cada uma dessas magias sem gastar espaço uma vez por descanso longo; a habilidade de conjuração é o atributo aumentado. Também pode conjurá-las usando espaços de magia que possua.",
    abilityBonusChoices: ["intelligence", "wisdom", "charisma"],
  },
  {
    id: "shadow-touched",
    name: "Tocado pelas Sombras",
    source: "tcoe",
    description:
      "Aumente Inteligência, Sabedoria ou Carisma em 1. Você aprende a magia invisibilidade e uma magia de 1º nível à sua escolha das escolas de ilusão ou necromancia. Pode conjurar cada uma dessas magias sem gastar espaço uma vez por descanso longo; a habilidade de conjuração é o atributo aumentado. Também pode conjurá-las usando espaços de magia que possua.",
    abilityBonusChoices: ["intelligence", "wisdom", "charisma"],
  },
  // —— Guia de Xanathar: talentos raciais ——
  {
    id: "elven-accuracy",
    name: "Precisão Élfica",
    source: "xgte",
    prerequisites: "Elfo ou meio-elfo",
    description:
      "Aumente Destreza, Inteligência, Sabedoria ou Carisma em 1. Sempre que tiver vantagem em um ataque que use Destreza, Inteligência, Sabedoria ou Carisma, pode rerrolar um dos dados e usar qualquer resultado.",
    abilityBonusChoices: ["dexterity", "intelligence", "wisdom", "charisma"],
  },
  {
    id: "dragon-fear",
    name: "Temor Dracônico",
    source: "xgte",
    prerequisites: "Draconato",
    description:
      "Aumente Força, Constituição ou Carisma em 1. Como ação, rugir: criaturas à escolha a até 9 m fazem Sabedoria (CD 8 + PB + o atributo aumentado) ou ficam amedrontadas por 1 minuto. PB usos por descanso longo.",
    abilityBonusChoices: ["strength", "constitution", "charisma"],
  },
  {
    id: "dragon-hide",
    name: "Couro de Dragão",
    source: "xgte",
    prerequisites: "Draconato",
    description:
      "Aumente Força, Constituição ou Carisma em 1. Sua CA é 13 + modificador de Destreza quando não usa armadura. Garras naturais (1d4 + Força, cortante).",
    abilityBonusChoices: ["strength", "constitution", "charisma"],
  },
  {
    id: "dwarven-fortitude",
    name: "Fortitude Anã",
    source: "xgte",
    prerequisites: "Anão",
    description:
      "Aumente Constituição em 1. Quando usa a ação Esquivar, pode gastar um Dado de Vida para recuperar PV (como em descanso curto).",
    abilityBonus: { constitution: 1 },
  },
  {
    id: "squat-nimbleness",
    name: "Agachamento Ágil",
    source: "xgte",
    prerequisites: "Anão ou raça de tamanho Pequeno",
    description:
      "Aumente Força ou Destreza em 1. Deslocamento +1,5 m. Proficiência em Acrobacia ou Atletismo; se já tiver, expertise nessa perícia.",
    abilityBonusChoices: ["strength", "dexterity"],
  },
  {
    id: "fey-teleportation",
    name: "Teleporte das Fadas",
    source: "xgte",
    prerequisites: "Elfo (alto)",
    description:
      "Aumente Inteligência ou Carisma em 1. Aprende o idioma Silvestre. Conjura passo nebuloso uma vez por descanso curto ou longo sem gastar espaço (atributo = o aumentado).",
    abilityBonusChoices: ["intelligence", "charisma"],
  },
  {
    id: "drow-high-magic",
    name: "Alta Magia Drow",
    source: "xgte",
    prerequisites: "Elfo (drow)",
    description:
      "Aprende detectar magia à vontade. Conjura levitação e dissolver magia cada uma uma vez por descanso longo sem gastar espaço (atributo = Carisma).",
  },
  {
    id: "wood-elf-magic",
    name: "Magia do Elfo da Floresta",
    source: "xgte",
    prerequisites: "Elfo (floresta)",
    description:
      "Aprende um truque de druida à escolha. Conjura passo longo e passar sem rastros cada uma uma vez por descanso longo sem gastar espaço (atributo = Sabedoria).",
  },
  {
    id: "fade-away",
    name: "Desvanecer",
    source: "xgte",
    prerequisites: "Gnomo",
    description:
      "Aumente Destreza ou Inteligência em 1. Como reação quando sofre dano, fica invisível até o início do seu próximo turno ou até atacar/conjurar. Uma vez por descanso curto ou longo.",
    abilityBonusChoices: ["dexterity", "intelligence"],
  },
  {
    id: "bountiful-luck",
    name: "Boa Sorte",
    source: "xgte",
    prerequisites: "Halfling",
    description:
      "Quando um aliado a até 9 m rola 1 em d20 para ataque, teste ou salvaguarda, você pode usar reação para fazer o aliado rerrolar o dado.",
  },
  {
    id: "second-chance",
    name: "Segunda Chance",
    source: "xgte",
    prerequisites: "Halfling",
    description:
      "Aumente Destreza, Constituição ou Carisma em 1. Quando uma criatura o acerta com um ataque, reação para forçar rerrolar. Uma vez por descanso curto ou longo.",
    abilityBonusChoices: ["dexterity", "constitution", "charisma"],
  },
  {
    id: "prodigy",
    name: "Prodígio",
    source: "xgte",
    prerequisites: "Humano, meio-elfo ou meio-orc",
    description:
      "Você ganha uma perícia, um idioma e expertise em uma perícia com a qual seja proficiente.",
  },
  {
    id: "orcish-fury",
    name: "Fúria Orc",
    source: "xgte",
    prerequisites: "Meio-orc",
    description:
      "Aumente Força ou Constituição em 1. Quando acerta com ataque de arma, pode causar um dado de dano extra da arma (uma vez por descanso curto/longo). Quando usa Resistência Implacável, pode fazer um ataque como parte da mesma reação.",
    abilityBonusChoices: ["strength", "constitution"],
  },
  {
    id: "flames-of-phlegethos",
    name: "Chamas de Phlegethos",
    source: "xgte",
    prerequisites: "Tiefling",
    description:
      "Aumente Inteligência ou Carisma em 1. Quando rolar fogo em magia, pode rerrolar qualquer 1. Quando conjurar magia de fogo, pode envolver-se em chamas até o fim do próximo turno (+CA reação, dano de fogo a quem o acertar corpo a corpo).",
    abilityBonusChoices: ["intelligence", "charisma"],
  },
  {
    id: "infernal-constitution",
    name: "Constituição Infernal",
    source: "xgte",
    prerequisites: "Tiefling",
    description:
      "Aumente Constituição em 1. Resistência a frio e veneno; vantagem em salvaguardas contra veneno.",
    abilityBonus: { constitution: 1 },
  },
];

export function getFeat(id: string): FeatDefinition | undefined {
  return FEATS.find((f) => f.id === id);
}

/** Raças/subraças que satisfazem o pré-requisito textual do talento XGtE. */
export function featMatchesRace(
  featId: string,
  raceId: string,
  subraceId: string | null,
): boolean {
  const feat = getFeat(featId);
  if (!feat?.prerequisites || feat.source !== "xgte") return true;
  const pr = feat.prerequisites.toLocaleLowerCase("pt-BR");
  const race = raceId.toLocaleLowerCase("pt-BR");
  const sub = (subraceId ?? "").toLocaleLowerCase("pt-BR");

  if (featId === "elven-accuracy") {
    return race === "elf" || race === "half-elf" || race.includes("elf");
  }
  if (featId === "dragon-fear" || featId === "dragon-hide") {
    return race === "dragonborn";
  }
  if (featId === "dwarven-fortitude") return race === "dwarf" || race === "duergar";
  if (featId === "squat-nimbleness") {
    return (
      race === "dwarf" ||
      race === "duergar" ||
      race === "halfling" ||
      race === "gnome" ||
      race === "deep-gnome" ||
      race === "goblin" ||
      race === "kobold" ||
      race === "kenku" ||
      race === "harengon"
    );
  }
  if (featId === "fey-teleportation") {
    return race === "elf" && (sub.includes("high") || sub.includes("alto") || sub === "high-elf");
  }
  if (featId === "drow-high-magic") {
    return race === "elf" && (sub.includes("drow") || sub.includes("dark"));
  }
  if (featId === "wood-elf-magic") {
    return race === "elf" && (sub.includes("wood") || sub.includes("floresta"));
  }
  if (featId === "fade-away") {
    return race === "gnome" || race === "deep-gnome";
  }
  if (featId === "bountiful-luck" || featId === "second-chance") {
    return race === "halfling";
  }
  if (featId === "prodigy") {
    return race === "human" || race === "half-elf" || race === "half-orc" || race === "custom-lineage";
  }
  if (featId === "orcish-fury") {
    return race === "half-orc" || race === "orc";
  }
  if (featId === "flames-of-phlegethos" || featId === "infernal-constitution") {
    return race === "tiefling";
  }
  // fallback: substring match on race name keywords in prerequisites
  if (pr.includes("anão") && (race === "dwarf" || race === "duergar")) return true;
  if (pr.includes("elfo") && race.includes("elf")) return true;
  return true;
}
