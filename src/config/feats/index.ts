import type { FeatDefinition } from "@/config/types";

export const FEATS: FeatDefinition[] = [
  {
    id: "alert",
    name: "Alerta",
    description:
      "Você ganha +5 de bônus em iniciativa. Você não pode ser surpreendido enquanto estiver consciente. Outras criaturas não ganham vantagem em jogadas de ataque contra você como resultado de estarem escondidas de você.",
  },
  {
    id: "athlete",
    name: "Atleta",
    description:
      "Aumente Força ou Destreza em 1. Quando estiver caído, gastar apenas 1,5 m de movimento para se levantar. Escalar não custa movimento extra. Com corrida, pode dar salto em distância/altura com apenas 1,5 m de corrida.",
    abilityBonus: { strength: 1 },
  },
  {
    id: "actor",
    name: "Ator",
    description:
      "Aumente Carisma em 1. Você tem vantagem em testes de Carisma (Enganação) e (Performance) quando tentar se passar por outra pessoa. Pode imitar a fala de outra pessoa ou os sons feitos por outras criaturas que tenha ouvido.",
    abilityBonus: { charisma: 1 },
  },
  {
    id: "charger",
    name: "Carregador",
    description:
      "Quando você usa a ação Disparada e se move pelo menos 3 metros em linha reta até um alvo, como ação bônus pode fazer um ataque corpo a corpo com arma ou empurrar a criatura. Em acerto, +5 de dano ou empurra 3 metros.",
  },
  {
    id: "crossbow-expert",
    name: "Especialista em Besta",
    description:
      "Ignora a propriedade recarga de bestas com as quais você é proficiente. Estar a 1,5 m de uma criatura hostil não impõe desvantagem em ataques à distância. Ao atacar com arma de uma mão, pode usar ação bônus para atacar com besta de mão carregada.",
  },
  {
    id: "defensive-duelist",
    name: "Duelista Defensivo",
    description:
      "Quando uma criatura te acerta com um ataque corpo a corpo enquanto você empunha uma arma de acuidade com a qual é proficiente, pode usar sua reação para adicionar seu bônus de proficiência à CA contra aquele ataque.",
    prerequisites: "Destreza 13 ou mais",
  },
  {
    id: "dual-wielder",
    name: "Combatente com Duas Armas",
    description:
      "Você ganha +1 de CA enquanto empunha uma arma corpo a corpo distinta em cada mão. Pode usar combate com duas armas mesmo que as armas não sejam leves. Pode sacar ou guardar duas armas de uma mão quando normalmente sacaria ou guardaria apenas uma.",
  },
  {
    id: "dungeon-delver",
    name: "Explorador de Masmorras",
    description:
      "Você tem vantagem em testes de Sabedoria (Percepção) e Inteligência (Investigação) feitos para detectar a presença de armadilhas secretas. Tem vantagem em salvaguardas para evitar ou resistir a armadilhas. Resistência a dano de armadilhas. Buscar armadilhas em ritmo normal não impõe desvantagem em Percepção.",
  },
  {
    id: "durable",
    name: "Durável",
    description:
      "Aumente Constituição em 1. Ao rolar um Dado de Vida para recuperar pontos de vida, o mínimo que você pode recuperar é o dobro do seu modificador de Constituição (mínimo 2).",
    abilityBonus: { constitution: 1 },
  },
  {
    id: "elemental-adept",
    name: "Adepto Elemental",
    description:
      "Escolha um tipo de dano: ácido, frio, fogo, relâmpago ou trovão. Magias que você conjura ignoram resistência a esse tipo de dano. Ao rolar dano desse tipo com uma magia, trate qualquer 1 em um dado de dano como 2.",
    prerequisites: "Habilidade de conjurar pelo menos uma magia",
  },
  {
    id: "grappler",
    name: "Agarrador",
    description:
      "Você tem vantagem em jogadas de ataque contra uma criatura que estiver agarrando. Pode usar sua ação para tentar imobilizar uma criatura agarrada por você (outra disputa de Força/Atletismo). Se tiver sucesso, tanto você quanto a criatura ficam restringidos.",
    prerequisites: "Força 13 ou mais",
  },
  {
    id: "great-weapon-master",
    name: "Mestre de Armas Grandes",
    description:
      "Em seu turno, quando obtém um acerto crítico com uma arma corpo a corpo ou reduz uma criatura a 0 PV, pode fazer um ataque corpo a corpo com arma como ação bônus. Antes de atacar com arma pesada que empunha com duas mãos, pode escolher -5 no ataque para +10 de dano.",
  },
  {
    id: "healer",
    name: "Curandeiro",
    description:
      "Ao usar um kit de curandeiro para estabilizar, a criatura também recupera 1 PV. Como ação, pode gastar um uso do kit e fazer uma criatura recuperar 1d6 + 4 + número de Dados de Vida dela em PV. A criatura não pode se beneficiar novamente até terminar um descanso curto ou longo.",
  },
  {
    id: "heavily-armored",
    name: "Fortemente Armado",
    description:
      "Aumente Força em 1. Você ganha proficiência com armaduras pesadas.",
    prerequisites: "Proficiência com armadura média",
    abilityBonus: { strength: 1 },
  },
  {
    id: "inspiring-leader",
    name: "Líder Inspirador",
    description:
      "Você pode gastar 10 minutos inspirando seus companheiros. Escolha até seis criaturas amigáveis (incluindo você) a até 9 metros que possam ver ou ouvir você. Cada uma ganha pontos de vida temporários iguais ao seu nível + modificador de Carisma. Uma criatura não pode se beneficiar novamente até terminar um descanso curto ou longo.",
    prerequisites: "Carisma 13 ou mais",
  },
  {
    id: "keen-mind",
    name: "Mente Aguçada",
    description:
      "Aumente Inteligência em 1. Você sempre sabe qual é a direção do norte. Sempre sabe quantas horas faltam para o próximo nascer ou pôr do sol. Pode recordar com precisão qualquer coisa vista ou ouvida no último mês.",
    abilityBonus: { intelligence: 1 },
  },
  {
    id: "lightly-armored",
    name: "Levemente Armado",
    description:
      "Aumente Força ou Destreza em 1. Você ganha proficiência com armaduras leves.",
    abilityBonus: { strength: 1 },
  },
  {
    id: "linguist",
    name: "Linguista",
    description:
      "Aumente Inteligência em 1. Você aprende três idiomas à sua escolha. Pode criar cifras escritas. Outros não podem decifrar a cifra a menos que você ensine, tenham sucesso em um teste de Inteligência (CD igual à sua Inteligência + bônus de proficiência) ou usem magia para decifrá-la.",
    abilityBonus: { intelligence: 1 },
  },
  {
    id: "lucky",
    name: "Sortudo",
    description:
      "Você tem 3 pontos de sorte. Sempre que fizer uma jogada de ataque, teste de habilidade ou salvaguarda, pode gastar um ponto para rolar um d20 adicional e escolher qual usar. Também pode gastar um ponto quando uma jogada de ataque for feita contra você. Recupera os pontos gastos ao terminar um descanso longo.",
  },
  {
    id: "mage-slayer",
    name: "Assassino de Magos",
    description:
      "Quando uma criatura a até 1,5 m de você conjura uma magia, pode usar sua reação para fazer um ataque corpo a corpo contra ela. Quando você causa dano a uma criatura concentrando-se, ela tem desvantagem na salvaguarda para manter a concentração. Você tem vantagem em salvaguardas contra magias conjuradas por criaturas a até 1,5 m de você.",
  },
  {
    id: "magic-initiate",
    name: "Iniciado em Magia",
    description:
      "Escolha uma classe: bardo, clérigo, druida, feiticeiro, mago ou bruxo. Aprenda dois truques dessa classe. Além disso, escolha uma magia de 1º nível dessa lista; pode conjurá-la no nível mais baixo uma vez por descanso longo. A habilidade de conjuração depende da classe escolhida.",
  },
  {
    id: "martial-adept",
    name: "Adepto Marcial",
    description:
      "Você aprende duas manobras à sua escolha da lista do Mestre de Batalha. Se já tiver dados de superioridade, ganha um adicional; caso contrário, ganha um d6. Esse dado é usado para alimentar suas manobras e é recuperado ao terminar um descanso curto ou longo.",
  },
  {
    id: "medium-armor-master",
    name: "Mestre de Armadura Média",
    description:
      "Usar armadura média não impõe desvantagem em furtividade. Ao usar armadura média, pode adicionar 3 (em vez de 2) à CA se sua Destreza for 16 ou mais.",
    prerequisites: "Proficiência com armadura média",
  },
  {
    id: "mobile",
    name: "Móvel",
    description:
      "Seu deslocamento aumenta em 3 metros. Ao usar a ação Disparada, terreno difícil não custa movimento extra naquele turno. Ao fazer um ataque corpo a corpo contra uma criatura, você não provoca ataques de oportunidade dela pelo resto do turno, seja acertando ou errando.",
  },
  {
    id: "moderately-armored",
    name: "Moderadamente Armado",
    description:
      "Aumente Força ou Destreza em 1. Você ganha proficiência com armaduras médias e escudos.",
    prerequisites: "Proficiência com armadura leve",
    abilityBonus: { strength: 1 },
  },
  {
    id: "mounted-combatant",
    name: "Combatente Montado",
    description:
      "Você tem vantagem em jogadas de ataque corpo a corpo contra criaturas desmontadas menores que sua montaria. Pode forçar um ataque destinado à montaria a mirar em você. Se sua montaria for forçada a fazer uma salvaguarda de Destreza contra efeito que causa metade do dano em sucesso, ela não sofre dano em sucesso e metade em falha.",
  },
  {
    id: "observant",
    name: "Observador",
    description:
      "Aumente Inteligência ou Sabedoria em 1. Se puder ver a boca de uma criatura falando um idioma que você compreende, pode interpretar o que ela diz lendo os lábios. Você tem +5 de bônus em sua passiva de Sabedoria (Percepção) e Inteligência (Investigação).",
    abilityBonus: { wisdom: 1 },
  },
  {
    id: "polearm-master",
    name: "Mestre de Armas de Haste",
    description:
      "Quando ataca com glaive, haste, bastão ou lança, pode usar ação bônus para fazer um ataque corpo a corpo com a outra extremidade (1d4 de concussão). Enquanto empunha essas armas, outras criaturas provocam ataque de oportunidade quando entram no seu alcance.",
  },
  {
    id: "resilient",
    name: "Resiliente",
    description:
      "Escolha um atributo. Aumente-o em 1 e ganhe proficiência em salvaguardas usando esse atributo.",
  },
  {
    id: "ritual-caster",
    name: "Conjurador Ritual",
    description:
      "Escolha bardo, clérigo, druida, feiticeiro, mago ou bruxo. Você ganha um livro ritual com duas magias de 1º nível com a marca de ritual dessa classe. Pode conjurá-las apenas como rituais. Pode copiar magias rituais adicionais para o livro. A habilidade de conjuração depende da classe escolhida.",
    prerequisites: "Inteligência ou Sabedoria 13 ou mais",
  },
  {
    id: "savage-attacker",
    name: "Atacante Selvagem",
    description:
      "Uma vez por turno, ao rolar dano de um ataque com arma corpo a corpo, você pode rerrolar os dados de dano da arma e usar qualquer um dos resultados.",
  },
  {
    id: "sentinel",
    name: "Sentinela",
    description:
      "Quando acerta uma criatura com um ataque de oportunidade, o deslocamento dela se torna 0 pelo resto do turno. Criaturas provocam ataque de oportunidade mesmo se usarem a ação Desengajar. Quando uma criatura a até 1,5 m ataca um alvo que não seja você, pode usar reação para fazer um ataque corpo a corpo com arma contra o atacante.",
  },
  {
    id: "sharpshooter",
    name: "Atirador de Elite",
    description:
      "Atacar a longa distância não impõe desvantagem. Seus ataques à distância ignoram cobertura metade e três quartos. Antes de atacar com arma à distância com a qual é proficiente, pode escolher -5 no ataque para +10 de dano.",
  },
  {
    id: "shield-master",
    name: "Mestre de Escudo",
    description:
      "Se tomar a ação Ataque em seu turno, pode usar ação bônus para tentar derrubar uma criatura a até 1,5 m com o escudo. Se for alvo de efeito que permite salvaguarda de Destreza para metade do dano, pode usar reação para não sofrer dano se tiver sucesso (com escudo). Se a salvaguarda for contra efeito apenas de você, tem vantagem.",
  },
  {
    id: "skilled",
    name: "Habilidoso",
    description: "Você ganha proficiência em qualquer combinação de três perícias ou ferramentas à sua escolha.",
  },
  {
    id: "skulker",
    name: "Furtivo",
    description:
      "Você pode tentar se esconder quando estiver apenas levemente obscurecido. A posição de um ataque à distância perdido não é revelada se você estiver escondido. Visão na penumbra não impõe desvantagem em testes de Sabedoria (Percepção) baseados em visão.",
    prerequisites: "Destreza 13 ou mais",
  },
  {
    id: "spell-sniper",
    name: "Atirador Arcano",
    description:
      "Quando conjura uma magia de ataque que exige jogada de ataque, o alcance da magia é dobrado. Seus ataques mágicos à distância ignoram cobertura metade e três quartos. Você aprende um truque que exige jogada de ataque de uma lista de classe à escolha (bardo, clérigo, druida, feiticeiro, mago ou bruxo).",
    prerequisites: "Habilidade de conjurar pelo menos uma magia",
  },
  {
    id: "tavern-brawler",
    name: "Brigão de Taverna",
    description:
      "Aumente Força ou Constituição em 1. Você é proficiente com armas improvisadas e dano desarmado é 1d4. Ao acertar com ataque desarmado ou improvisado, pode usar ação bônus para tentar agarrar o alvo.",
    abilityBonus: { strength: 1 },
  },
  {
    id: "tough",
    name: "Robusto",
    description:
      "Seu máximo de pontos de vida aumenta em um valor igual ao dobro do seu nível quando você adquire este talento. Sempre que sobe de nível depois disso, seu máximo de PV aumenta em 2 adicionais.",
  },
  {
    id: "war-caster",
    name: "Conjurador de Guerra",
    description:
      "Você tem vantagem em salvaguardas de Constituição para manter concentração. Pode realizar componentes somáticos mesmo com armas ou escudo nas mãos. Quando uma criatura provoca ataque de oportunidade, pode usar reação para conjurar uma magia nela em vez de atacar (deve ter tempo de conjuração de 1 ação e mirar apenas naquela criatura).",
    prerequisites: "Habilidade de conjurar pelo menos uma magia",
  },
  {
    id: "weapon-master",
    name: "Mestre de Armas",
    description:
      "Aumente Força ou Destreza em 1. Você ganha proficiência com quatro armas à sua escolha.",
    abilityBonus: { strength: 1 },
  },
];

export function getFeat(id: string): FeatDefinition | undefined {
  return FEATS.find((f) => f.id === id);
}
