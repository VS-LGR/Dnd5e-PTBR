import type { ClassDefinition, ClassFeature, SubclassDefinition } from "@/config/types";

const t = (level: number, name: string, description: string, id?: string): ClassFeature => ({
  id: id ?? name.toLowerCase().replace(/\s+/g, "-"),
  level,
  name,
  description,
  source: "tcoe",
});

export const TASHA_OPTIONAL_FEATURES: Record<string, ClassFeature[]> = {
  barbarian: [
    t(3, "Conhecimento Primitivo", "Você ganha proficiência em uma perícia da lista de perícias de bárbaro, ou em um instrumento musical.", "primitive-knowledge"),
    t(7, "Instinto Agressivo", "Como parte da sua ação de movimento, você pode se mover até a metade do seu deslocamento em direção a uma criatura hostil que possa ver.", "instinctive-pounce"),
  ],
  bard: [
    t(2, "Inspiração Mágica", "Quando um alvo gasta seu Dado de Inspiração Bárdica, ele pode rolar o dado e adicionar o número a um teste de atributo ou salvaguarda, ou a um ataque mágico.", "magical-inspiration"),
    t(4, "Versatilidade Bárdica", "Quando você alcança um nível que concede Aumento de Atributo, pode substituir uma perícia de bardo ou um truque de bardo.", "bardic-versatility"),
  ],
  warlock: [
    t(1, "Pacto do Talismã", "Você recebe um amuleto que concede +1d4 a testes de atributo falhos (PB usos por descanso longo). Pode substituir Invocações Místicas conforme as regras de Tasha.", "pact-of-the-talisman"),
    t(4, "Versatilidade Mística", "Quando recebe Aumento de Atributo, pode substituir uma Invocação Mística conhecida.", "eldritch-versatility"),
  ],
  cleric: [
    t(2, "Canalizar Divindade: Aproveitar Poder Divino", "Como ação bônus, gaste um uso de Canalizar Divindade para recuperar um espaço de magia (nível máximo = metade do nível de clérigo, arredondado para cima, máx. 5º).", "harness-divine-power"),
    t(4, "Versatilidade de Truque", "Quando recebe Aumento de Atributo, pode substituir um truque de clérigo.", "cantrip-versatility"),
    {
      id: "blessed-strikes",
      level: 8,
      name: "Golpes Abençoados",
      description:
        "Quando você causa dano com um ataque de arma ou truque, pode causar +1d8 de dano radiante. Substitui Impacto Divino ou Conjuração Poderosa.",
      source: "tcoe",
      replaces: "Impacto Divino",
    },
  ],
  druid: [
    t(2, "Companheiro Selvagem", "Você pode gastar um uso de Forma Selvagem para conjurar encontrar familiar (sem material), com a forma de uma fera. O familiar pode ter a forma de um espírito feérico/da natureza.", "wild-companion"),
    t(4, "Versatilidade de Truque", "Quando recebe Aumento de Atributo, pode substituir um truque de druida.", "druid-cantrip-versatility"),
  ],
  sorcerer: [
    t(4, "Versatilidade Feiticeira", "Quando recebe Aumento de Atributo, pode substituir uma opção de metamagia ou um truque de feiticeiro.", "sorcerous-versatility"),
    t(5, "Orientação Mágica", "Quando falha em um teste de atributo, pode gastar 1 ponto de feitiçaria para rolar 1d4 e adicionar ao resultado (pode causar sucesso).", "magics-guidance"),
  ],
  ranger: [
    t(1, "Inimigo Favorecido", "Você marca uma criatura como ação bônus (PB vezes por descanso longo). O primeiro ataque com arma contra ela em cada turno causa +1d4 de dano.", "favored-foe"),
    t(3, "Consciência Primordial", "Você aprende magias adicionais de guardião e pode usá-las para se comunicar com a natureza conforme Tasha.", "primal-awareness"),
    t(10, "Véu da Natureza", "Como ação bônus, você fica invisível até o início do próximo turno (PB usos por descanso longo).", "natures-veil"),
  ],
  fighter: [
    t(4, "Versatilidade Marcial", "Quando recebe Aumento de Atributo, pode substituir um estilo de combate conhecido.", "martial-versatility"),
  ],
  rogue: [
    t(3, "Mira Firme", "Como ação bônus, você dá a si mesmo vantagem no próximo ataque no turno atual, desde que não se mova neste turno.", "steady-aim"),
  ],
  wizard: [
    t(3, "Fórmulas de Truque", "Você pode substituir um truque de mago ao terminar um descanso longo (uma vez por nível).", "cantrip-formulas"),
  ],
  monk: [
    t(2, "Arma Dedicada", "Treina com uma arma para usá-la com Artes Marciais (ação durante descanso curto).", "dedicated-weapon"),
    t(3, "Ataque Potencializado por Ki", "Quando gasta 1 ki como parte da ação Ataque, pode fazer um ataque desarmado como parte dessa ação.", "ki-fueled-attack"),
    t(4, "Cura Acelerada", "Como ação, gaste 1+ pontos de ki para recuperar PV iguais a um rolar de Artes Marciais por ponto gasto.", "quickened-healing"),
    t(5, "Mira Focada", "Quando erra um ataque, gaste 1–3 ki para adicionar +2 por ki gasto à jogada.", "focused-aim"),
  ],
  paladin: [
    t(3, "Aproveitar Poder Divino", "Como ação bônus, gaste um uso de Canalizar Divindade para recuperar um espaço de magia (nível máximo = metade do nível de paladino).", "paladin-harness-divine-power"),
    t(4, "Versatilidade Marcial", "Quando recebe Aumento de Atributo, pode substituir um estilo de combate.", "paladin-martial-versatility"),
  ],
  artificer: [
    t(4, "Versatilidade de Infusão", "Quando recebe Aumento de Atributo, pode substituir uma Infusão de Artífice conhecida.", "infusion-versatility"),
  ],
};

export const TASHA_SUBCLASSES: Record<string, SubclassDefinition[]> = {
  barbarian: [
    {
      id: "path-of-the-beast",
      name: "Trilha da Besta",
      source: "tcoe",
      description: "Você canaliza a fera interior, manifestando armas naturais em fúria.",
      features: [
        t(3, "Forma Bestial", "Ao entrar em fúria, escolhe mordida, garras ou cauda — ataques naturais com benefícios distintos."),
        t(6, "Alma Bestial", "Melhora movimento (escalada/natação) e benefícios da forma bestial."),
        t(10, "Chamado Infectante", "Como ação, força criaturas próximas a atacar um alvo (salvaguarda de Sabedoria)."),
        t(14, "Fúria Contagiante", "Ao atingir com ataque bestial, pode infectar o alvo com fúria compartilhada."),
      ],
    },
    {
      id: "path-of-wild-magic",
      name: "Trilha da Magia Selvagem",
      source: "tcoe",
      description: "Sua fúria desperta surtos de magia caótica.",
      features: [
        t(3, "Magia Selvagem", "Ao entrar em fúria, role na tabela de Magia Selvagem para um efeito mágico."),
        t(3, "Percepção Mágica", "Pode sentir magia e conjurar detectar magia como ritual."),
        t(6, "Bolsa Mágica", "Como ação, causa dano de força em área ou dá vantagem temporária a aliados."),
        t(10, "Escudo Instável", "Reação para reduzir dano e causar dano de força ao atacante."),
        t(14, "Surto Controlado", "Pode rerrolar ou escolher efeito da Magia Selvagem."),
      ],
    },
  ],
  bard: [
    {
      id: "college-of-creation",
      name: "Colégio da Criação",
      source: "tcoe",
      description: "Você canaliza a Canção da Criação para dar vida a objetos e performances.",
      features: [
        t(3, "Nota da Criação", "Cria um objeto mágico temporário ou anima uma performance."),
        t(3, "Performance de Criação", "Gasta Inspiração Bárdica para animar um objeto como criatura."),
        t(6, "Item Animado", "Anima um objeto maior ou concede benefícios extras."),
        t(14, "Performance Criativa", "Cria múltiplas animações e efeitos poderosos de criação."),
      ],
    },
    {
      id: "college-of-eloquence",
      name: "Colégio da Eloquência",
      source: "tcoe",
      description: "Suas palavras são armas precisas de persuasão e deboche.",
      features: [
        t(3, "Língua de Prata", "Quando falha em Persuasão/Enganação, trata a rolagem como 10+mod se for menor."),
        t(3, "Palavras Agitadoras", "Gasta Inspiração para reduzir a próxima jogada de ataque/salvaguarda do alvo."),
        t(6, "Discurso Inevitável", "Falha em Persuasão/Enganação se torna sucesso parcial; sucesso crítico aprimorado."),
        t(14, "Dom da Controvérsia", "Inspiração Bárdica pode afetar múltiplas criaturas."),
      ],
    },
  ],
  warlock: [
    {
      id: "the-fathomless",
      name: "O Insondável",
      source: "tcoe",
      description: "Um patrono das profundezas concede tentáculos e poder oceânico.",
      features: [
        t(1, "Tentáculo do Profundo", "Como ação bônus, conjura um tentáculo que causa dano e reduz deslocamento."),
        t(1, "Presente do Mar", "Deslocamento de natação e respiração aquática."),
        t(6, "Alma Oceânica", "Resistência a frio; teleporte aquático limitado."),
        t(10, "Guardião Grasento", "Reação com tentáculo para reduzir dano."),
        t(14, "Portal Insondável", "Abre um portal temporário para um plano aquático."),
      ],
    },
    {
      id: "the-genie",
      name: "O Gênio",
      source: "tcoe",
      description: "Um genio elemental concede um vaso e magias de sua espécie.",
      features: [
        t(1, "Vaso do Genio", "Recebe um vaso genial e magias extras conforme o elemento (ar/água/fogo/terra)."),
        t(1, "Toque Elemental", "Bônus de dano elemental em ataques."),
        t(6, "Refúgio Elemental", "Pode entrar no vaso e viajar com ele."),
        t(10, "Proteção Elemental", "Resistência ao dano do seu elemento."),
        t(14, "Libertação Limitada", "Voa e libera poder genial devastador por um minuto."),
      ],
    },
  ],
  cleric: [
    {
      id: "order-domain",
      name: "Domínio da Ordem",
      source: "tcoe",
      description: "Você impõe lei e disciplina em nome da sua divindade.",
      features: [
        t(1, "Proficiência Extra", "Proficiência em Intimidação ou Persuasão; armaduras pesadas."),
        t(1, "Voz de Autoridade", "Quando cura um aliado, ele pode usar reação para atacar."),
        t(2, "Canalizar: Ordem Implosiva", "Alvos falham salvaguarda e sofrem desvantagem / ordem de ataque."),
        t(6, "Encarnação da Lei", "Vantagem em salvaguardas para manter concentração; magias de encantamento reforçadas."),
        t(8, "Impacto Divino", "+1d8 de dano psíquico em ataques com arma."),
        t(17, "Ordem da Lei", "Aliados próximos podem usar reação para atacar quando você critica ou reduz um inimigo a 0 PV."),
      ],
    },
    {
      id: "peace-domain",
      name: "Domínio da Paz",
      source: "tcoe",
      description: "Você tece vínculos de harmonia entre aliados.",
      features: [
        t(1, "Implemento da Paz", "Proficiência em Insight, Performance ou Persuasão; cantrip extra."),
        t(1, "Embaixador Empático", "Cria vínculos: aliados podem usar o bônus de perícia uns dos outros."),
        t(2, "Canalizar: Bálsamo da Paz", "Move-se sem provocar OA e cura criaturas tocadas."),
        t(6, "Aura Protetora", "Aura concede bônus em salvaguardas e resistência a dano psíquico."),
        t(8, "Golpes Potentes", "+1d8 em truques de dano."),
        t(17, "Vínculo Expansivo", "Mais vínculos e benefícios aprimorados."),
      ],
    },
    {
      id: "twilight-domain",
      name: "Domínio do Crepúsculo",
      source: "tcoe",
      description: "Você guarda a fronteira entre luz e escuridão.",
      features: [
        t(1, "Visão do Crepúsculo", "Visão no escuro 90 m; proficiência em armaduras pesadas e armas marciais."),
        t(1, "Olhos da Noite", "Concede visão no escuro a aliados."),
        t(2, "Canalizar: Santuário do Crepúsculo", "Aura que concede PV temporários e anula charme/medo."),
        t(6, "Passos Noturnos", "Voa temporariamente na penumbra/escuridão."),
        t(8, "Impacto Divino", "+1d8 de dano psíquico."),
        t(17, "Véu do Crepúsculo", "Santuário aprimorado e meia-cobertura."),
      ],
    },
  ],
  druid: [
    {
      id: "circle-of-spores",
      name: "Círculo dos Esporos",
      source: "tcoe",
      description: "Você equilibra vida e morte através de fungos simbiontes.",
      features: [
        t(2, "Círculo de Esporos", "Truques extras; Halo de Esporos causa dano necrótico reativo."),
        t(2, "Simbiose Simbiótica", "PV temporários e dano necrótico extra enquanto ativo."),
        t(6, "Esporos Fúngicos", "Anima cadáveres como zumbis de esporos."),
        t(10, "Esporos Propagadores", "Ao matar com magia/necrose, espalha dano em área."),
        t(14, "Esporos da Morte", "Aliados caídos podem agir sob esporos temporariamente."),
      ],
    },
    {
      id: "circle-of-stars",
      name: "Círculo das Estrelas",
      source: "tcoe",
      description: "Você lê constelações e assume formas estelares.",
      features: [
        t(2, "Mapa Estelar", "Cria um mapa estelar; conjura orientação e outros efeitos."),
        t(2, "Forma Estelar", "Como ação bônus, assume Arquiro, Quíron ou Dragão com benefícios."),
        t(6, "Constelação Cósmica", "Melhora formas e conjuração."),
        t(10, "Presságios Fulgurantes", "Troca dados de d20 por dados do mapa estelar."),
        t(14, "Ciclo Cósmico", "Forma estelar aprimorada e resistência a dano radiante/necrótico."),
      ],
    },
    {
      id: "circle-of-wildfire",
      name: "Círculo do Fogo Selvagem",
      source: "tcoe",
      description: "Você invoca um espírito de fogo selvagem que destrói e renova.",
      features: [
        t(2, "Espírito de Fogo Selvagem", "Invoca um espírito elemental de fogo que combate ao seu lado."),
        t(6, "Laços Abrasadores", "Teleporta trocando de lugar com o espírito e causando dano."),
        t(10, "Fogo Cauterizante", "Quando causa dano de fogo, pode curar aliados."),
        t(14, "Conflagração Renovadora", "Espírito explode e renasce com cura em área."),
      ],
    },
  ],
  sorcerer: [
    {
      id: "aberrant-mind",
      name: "Mente Aberrante",
      source: "tcoe",
      description: "Um poder psiónico alienígena habita sua mente.",
      features: [
        t(1, "Magias Psiónicas", "Aprende magias telepáticas extras que não contam no limite."),
        t(1, "Fala Telepática", "Comunica-se telepaticamente a 30 m."),
        t(6, "Feitiçaria Psiónica", "Conjura magias psiónicas sem componentes gastando feitiçaria."),
        t(14, "Defesas Mentais", "Resistência psíquica e rebote de dano mental."),
        t(18, "Revelação da Mente", "Aura psíquica devastadora."),
      ],
    },
    {
      id: "clockwork-soul",
      name: "Alma Cronométrica",
      source: "tcoe",
      description: "A ordem de Mechanus molda sua magia.",
      features: [
        t(1, "Magias Cronométricas", "Lista expandida de magias de ordem."),
        t(1, "Restaurar Equilíbrio", "Anula vantagem/desvantagem em uma rolagem próxima (PB/LD)."),
        t(6, "Baluarte da Lei", "Gasta feitiçaria para criar um truque de dados que reduz dano."),
        t(14, "Transe da Ordem", "Imunidade temporária a condições caóticas."),
        t(18, "Fluxo de Ordens", "Recupera pontos de feitiçaria e reforça aliados."),
      ],
    },
  ],
  ranger: [
    {
      id: "fey-wanderer",
      name: "Andarilho Feérico",
      source: "tcoe",
      description: "Você carrega um pedaço do Domínio Feérico em sua alma.",
      features: [
        t(3, "Magias do Andarilho", "Aprende magias feéricas extras."),
        t(3, "Dreadful Strikes", "Ataques causam dano psíquico extra (1d4, depois 1d6)."),
        t(3, "Outros Mundanos", "Bônus de Carisma em Persuasão/Enganação/Intimidação igual ao modificador de Sabedoria."),
        t(7, "Passos Feéricos", "Vantagem vs charme; charme/medo de fadas falham."),
        t(11, "Escudo Espectral", "Invoca reforços feéricos temporários."),
        t(15, "Refúgio do Crepúsculo", "Misty step aprimorado e resistência."),
      ],
    },
    {
      id: "swarmkeeper",
      name: "Portador do Enxame",
      source: "tcoe",
      description: "Um enxame de espíritos da natureza acompanha você.",
      features: [
        t(3, "Enxame Coletor", "Após acertar, move o alvo, causa dano extra ou se move sem OA."),
        t(3, "Magias do Enxame", "Aprende magias ligadas ao enxame."),
        t(7, "Voo do Enxame", "Voa temporariamente com o enxame."),
        t(11, "Maré Enxameante", "Ataques em área com o enxame."),
        t(15, "Enxame Guardião", "Reação do enxame concede resistência a dano."),
      ],
    },
  ],
  fighter: [
    {
      id: "psi-warrior",
      name: "Guerreiro Psiônico",
      source: "tcoe",
      description: "Você canaliza energia psiónica através do corpo e das armas.",
      features: [
        t(3, "Energia Psiónica", "Dados psiónicos para proteção, ataque e impulso."),
        t(7, "Salto Telecinético", "Teleporte curto gastando energia."),
        t(10, "Augúrio Guardião", "Melhora dados e proteção."),
        t(15, "Barreira Telecinética", "Escudo de força massivo."),
        t(18, "Mestre Psiônico", "Recupera dados e aprimora efeitos."),
      ],
    },
    {
      id: "rune-knight",
      name: "Cavaleiro Rúnico",
      source: "tcoe",
      description: "Você esculpe runas de gigantes em equipamentos.",
      features: [
        t(3, "Runas de Gigante", "Inscreve runas (fogo, amigo, pedra, colina, etc.) com benefícios."),
        t(3, "Estatura de Gigante", "Torna-se Grande temporariamente e causa dano extra."),
        t(7, "Marca Rúnica", "Mais runas e usos."),
        t(10, "Grande Estatura", "Tamanho Enorme e vantagens aprimoradas."),
        t(15, "Runa Magistral", "Runas lendárias."),
        t(18, "Senhor Rúnico", "Efeitos de runa maximizados."),
      ],
    },
  ],
  rogue: [
    {
      id: "phantom",
      name: "Fantasma",
      source: "tcoe",
      description: "Você caminha entre os vivos e os mortos.",
      features: [
        t(3, "Sussurros dos Mortos", "Aprende perícias/ferramentas dos mortos que já viu falecer."),
        t(3, "Gemidos que Acompanham", "Ataque sorrateiro causa dano necrótico extra a um segundo alvo."),
        t(9, "Tokens da Falecidos", "Cria tokens de alma com benefícios."),
        t(13, "Passos Fantasma", "Voo/spectral form temporária."),
        t(17, "Tempestade de Almas", "Dano necrótico em área com almas."),
      ],
    },
    {
      id: "soulknife",
      name: "Alma Laminada",
      source: "tcoe",
      description: "Você manifesta lâminas psíquicas da própria mente.",
      features: [
        t(3, "Lâminas Psíquicas", "Ataques com lâminas de energia psíquica; dados psiónicos."),
        t(3, "Voz da Mente", "Telepatia e transferência de dados."),
        t(9, "Lâminas Homing", "Ataque bônus e recuperação de dados."),
        t(13, "Vínculo Mental", "Teletransporte e magias psíquicas."),
        t(17, "Rendição da Alma", "Críticos psíquicos devastadores."),
      ],
    },
  ],
  wizard: [
    {
      id: "bladesinging",
      name: "Lâmina Cantante",
      source: "tcoe",
      description: "Tradição élfica que funde magia e combate com lâmina.",
      features: [
        t(2, "Treinamento de Canto de Lâmina", "Proficiência em armadura leve e uma arma de uma mão."),
        t(2, "Canto de Lâmina", "Entrar em canto: +Des CA, +deslocamento, vantagem em Concentração, bônus em Acrobacia."),
        t(6, "Ataque Extra", "Ataque extra durante o canto."),
        t(10, "Canção de Defesa", "Gasta espaço de magia para reduzir dano."),
        t(14, "Canção da Vitória", "Bônus de dano com armas igual ao modificador de Inteligência."),
      ],
    },
    {
      id: "order-of-scribes",
      name: "Ordem dos Escribas",
      source: "tcoe",
      description: "Seu grimório desperta como uma consciência mágica.",
      features: [
        t(2, "Manifestação Desperta", "Grimório consciente; troca tipos de dano de magias; cópia rápida."),
        t(6, "Espírito Manifestado", "O grimório luta como espírito e concede benefícios."),
        t(10, "Mestre Escriba", "Cria pergaminhos temporários aprimorados."),
        t(14, "Um com o Verbo", "Quando o espírito é destruído, você pode se esquivar da morte."),
      ],
    },
  ],
  monk: [
    {
      id: "way-of-mercy",
      name: "Caminho da Misericórdia",
      source: "tcoe",
      description: "Você traz cura e morte com as mãos mascaradas.",
      features: [
        t(3, "Implementos da Misericórdia", "Proficiência em Medicina/Insight; máscara ritual."),
        t(3, "Mãos da Cura/Mágoa", "Gasta ki para curar ou causar dano necrótico."),
        t(6, "Toque do Médico", "Remove condições ao curar; flurry causa dano necrótico."),
        t(11, "Florescimento da Misericórdia", "Cura em área e bônus."),
        t(17, "Mão da Misericórdia Suprema", "Escolhe poupar ou executar com precisão."),
      ],
    },
    {
      id: "way-of-the-astral-self",
      name: "Caminho da Forma Astral",
      source: "tcoe",
      description: "Você manifesta braços e aura do seu eu astral.",
      features: [
        t(3, "Braços do Eu Astral", "Manifesta braços astrais: alcance, ataques com Sabedoria."),
        t(6, "Visagem Astral", "Rosto astral: visão no escuro, magias/telepatia."),
        t(11, "Corpo Astral", "Barreira de ki e ataques extras."),
        t(17, "Eu Astral Completo", "Forma completa com benefícios poderosos."),
      ],
    },
  ],
  paladin: [
    {
      id: "oath-of-glory",
      name: "Juramento da Glória",
      source: "tcoe",
      description: "Você busca feitos heroicos dignos de lendas.",
      features: [
        t(3, "Canalizar Divindade", "Guia Peerless (bônus em testes) e Conquering Presence."),
        t(3, "Magias do Juramento", "Lista de magias de glória."),
        t(7, "Aura de Alacridade", "Deslocamento extra para você e aliados próximos."),
        t(15, "Glória Reluzente", "Cura ao ser atingido; brilho radiante."),
        t(20, "Forma Viva de Lenda", "Transformação lendária com voo e dano."),
      ],
    },
    {
      id: "oath-of-the-watchers",
      name: "Juramento da Vigilância",
      source: "tcoe",
      description: "Você guarda o Plano Material contra ameaças extraplanares.",
      features: [
        t(3, "Canalizar Divindade", "Vigilância dos Observadores e Abjurar Extraplanar."),
        t(3, "Magias do Juramento", "Lista contra aberrações, celestiais, elementais, fadas e demônios."),
        t(7, "Aura do Vigilante", "Bônus em iniciativa e salvaguardas de Inteligência/Sabedoria/Carisma."),
        t(15, "Vigilância Inquebrável", "Vantagem vs portal/teleporte; resistência psíquica."),
        t(20, "Sentinela Mortal", "Forma de guardião com Truesight e magias reforçadas."),
      ],
    },
  ],
};

export const ARTIFICER: ClassDefinition = {
  id: "artificer",
  name: "Artífice",
  source: "tcoe",
  hitDie: 8,
  primaryAbilities: ["intelligence"],
  savingThrows: ["constitution", "intelligence"],
  armorProficiencies: ["leves", "médias", "escudos"],
  weaponProficiencies: ["simples"],
  toolProficiencies: ["ferramentas de ladrão", "ferramentas de funileiro", "um tipo de ferramentas de artesão"],
  skillChoices: {
    choose: 2,
    from: ["arcana", "history", "investigation", "medicine", "nature", "perception", "sleightOfHand"],
  },
  subclassLevel: 3,
  spellcasting: {
    type: "half",
    ability: "intelligence",
    preparation: "prepared",
    startsAtLevel: 1,
    ritualCasting: true,
  },
  startingEquipment: [
    "Duas armas simples",
    "Besta leve e 20 virotes",
    "Armadura de couro batido",
    "Ferramentas de ladrão e ferramentas de funileiro",
    "Pacote de aventureiro",
  ],
  startingGoldDice: "5d4×10",
  features: [
    t(1, "Magia Infusa", "Você prepara magias de artífice usando Inteligência. Pode conjurar rituais do grimório de artífice."),
    t(1, "Infusões de Artífice", "Ao terminar um descanso longo, você imbui itens não-mágicos com Infusões conhecidas (número conforme nível)."),
    t(1, "Especialista em Ferramentas", "Quando faz teste com ferramentas de artífice, some o dobro do PB."),
    t(2, "Infusões Aprimoradas", "Aprende mais Infusões; pode infundir mais itens."),
    t(3, "Especialização de Artífice", "Escolha sua especialização (subclasse)."),
    t(3, "Ferramenta Adepta", "Cria um conjunto de ferramentas de artesão; conjura magias através delas."),
    t(4, "Aumento de Atributo", "Aumente um atributo em 2, ou dois em 1, ou escolha um talento."),
    t(5, "Ataque Extra / Especialização", "Conforme especialização; progresso de magia half-caster."),
    t(6, "Especialização / Expertise", "Característica de especialização; perícia de ferramenta."),
    t(7, "Aprimoramento de Clarividência", "Flash of Genius: adicione seu modificador de Inteligência a um teste/salvaguarda (PB/LD)."),
    t(8, "Aumento de Atributo", "Aumente atributos ou talento."),
    t(10, "Aprimoramento Mágico", "Aplica aprimoramentos a itens e armaduras."),
    t(11, "Armazenamento de Magia", "Imbui um item com magias armazenadas para uso por você ou aliados."),
    t(12, "Aumento de Atributo", "Aumente atributos ou talento."),
    t(14, "Especialista em Magia Infusa", "Mais Infusões; itens infundidos podem se tornar attunement-free limitados."),
    t(15, "Especialização Capstone", "Característica poderosa da especialização."),
    t(16, "Aumento de Atributo", "Aumente atributos ou talento."),
    t(18, "Filtro de Magia", "Vantagem em salvaguardas contra magias; resistência a dano de magia."),
    t(19, "Aumento de Atributo", "Aumente atributos ou talento."),
    t(20, "Alma de Artifício", "PV temporários por Infusão; sucesso em morte com gasto de Infusão."),
  ],
  optionalFeatures: TASHA_OPTIONAL_FEATURES.artificer,
  subclasses: [
    {
      id: "alchemist",
      name: "Alquimista",
      source: "tcoe",
      description: "Você experimenta com reagentes para curar e devastar.",
      features: [
        t(3, "Ferramentas de Especialização", "Proficiência em suprimentos de alquimista; magias extras."),
        t(3, "Elixir Experimental", "Cria elixirs com efeitos aleatórios (cura, valentia, resiliência…)."),
        t(5, "Sábio Alquímico", "Bônus de Inteligência em cura e dano de magias de artífice."),
        t(9, "Reagentes Restauradores", "Elixirs removem condições."),
        t(15, "Maestria Química", "Resistência a ácido/veneno; magias aprimoradas."),
      ],
    },
    {
      id: "armorer",
      name: "Armeiro",
      source: "tcoe",
      description: "Sua armadura torna-se uma segunda pele arcana.",
      features: [
        t(3, "Armadura Arcana", "Infunde uma armadura especial; modelos Guardião ou Infiltrador."),
        t(5, "Ataque Extra", "Ataque extra com armas da armadura."),
        t(9, "Modificações de Armadura", "Mais Infusões na armadura."),
        t(15, "Armadura Perfeita", "Efeitos defensivos poderosos do modelo escolhido."),
      ],
    },
    {
      id: "artillerist",
      name: "Atirador",
      source: "tcoe",
      description: "Você constrói um canhão eldritch e explosivos precisos.",
      features: [
        t(3, "Canhão Eldritch", "Cria um canhão pequeno que causa dano de força/fogo/frio."),
        t(5, "Ataque Arcano", "Bônus de dano em magias de artífice."),
        t(9, "Canhão Explosivo", "Área e poder do canhão aumentam."),
        t(15, "Fortaleza de Canhão", "Canhão reforçado e detonação defensiva."),
      ],
    },
    {
      id: "battle-smith",
      name: "Ferreiro de Batalha",
      source: "tcoe",
      description: "Você forja um Defensor de Aço e luta ao lado dele.",
      features: [
        t(3, "Defensor de Aço", "Companion constructo que combate e protege."),
        t(3, "Arma de Batalha", "Usa Inteligência para ataques com armas mágicas."),
        t(5, "Ataque Extra", "Ataque adicional."),
        t(9, "Aprimoramento Arcano", "Defensor e armas melhoram."),
        t(15, "Defensor Aprimorado", "Defensor se torna formidável; cura e resistência."),
      ],
    },
  ],
};

export function enrichClassesWithTasha(phbClasses: ClassDefinition[]): ClassDefinition[] {
  const enriched: ClassDefinition[] = phbClasses.map((cls) => {
    const extras = TASHA_SUBCLASSES[cls.id] ?? [];
    const optional = TASHA_OPTIONAL_FEATURES[cls.id] ?? [];
    return {
      ...cls,
      source: cls.source ?? "phb",
      subclasses: [
        ...cls.subclasses.map((s) => ({ ...s, source: s.source ?? "phb" })),
        ...extras,
      ],
      optionalFeatures: [...(cls.optionalFeatures ?? []), ...optional],
    };
  });
  if (!enriched.some((c) => c.id === "artificer")) {
    enriched.push(ARTIFICER);
  }
  return enriched;
}
