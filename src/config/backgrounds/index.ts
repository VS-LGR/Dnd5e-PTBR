import type { BackgroundDefinition } from "@/config/types";

export const BACKGROUNDS: BackgroundDefinition[] = [
  {
    id: "acolyte",
    name: "Acólito",
    description:
      "Você passou sua vida a serviço de um templo, aprendendo ritos sagrados e oferecendo sacrifícios aos deuses. Você age como intermediário entre o reino do sagrado e o mundo mortal.",
    skillProficiencies: ["insight", "religion"],
    toolProficiencies: [],
    languages: 2,
    equipment: [
      "Símbolo sagrado",
      "Livro de orações",
      "5 varetas de incenso",
      "Vestimentas",
      "Roupas comuns",
      "Bolsa com 15 po",
    ],
    feature: {
      name: "Abrigo dos Fiéis",
      description:
        "Você e seus companheiros podem receber cura e cuidados gratuitos no templo da sua fé. Aqueles que compartilham sua religião podem oferecer ajuda modesta, mas não arriscarão a vida por você.",
    },
    personalityTraits: [
      "Idolatro um herói particular da minha fé e constantemente me refiro a seus atos e exemplos.",
      "Posso encontrar pontos em comum entre os mais ferrenhos inimigos, empatizando com eles e sempre trabalhando pela paz.",
      "Vejo presságios em cada evento e ação. Os deuses tentam nos falar, só precisamos ouvir.",
      "Nada pode abalar minha atitude otimista.",
    ],
    ideals: [
      "Tradição. As antigas tradições de culto e sacrifício devem ser preservadas e mantidas. (Leal)",
      "Caridade. Sempre tento ajudar aqueles em necessidade, não importa o custo pessoal. (Bom)",
      "Mudança. Devemos ajudar a provocar as mudanças que os deuses estão constantemente trabalhando no mundo. (Caótico)",
      "Poder. Aspiro um dia subir ao topo da hierarquia religiosa da minha fé. (Leal)",
    ],
    bonds: [
      "Daria minha vida para recuperar uma relíquia antiga da minha fé que foi perdida há muito tempo.",
      "Um dia me vingarei da hierarquia corrupta do templo que me acusou de uma traição que não cometi.",
      "Devo tudo ao sacerdote que cuidou de mim quando meus pais morreram.",
      "Tudo o que faço é pelo povo comum.",
    ],
    flaws: [
      "Julgo os outros com severidade e a mim mesmo ainda mais.",
      "Coloco muita confiança naqueles que exercem poder dentro da hierarquia do meu templo.",
      "Minha piedade às vezes me leva a confiar cegamente naqueles que professam fé na minha religião.",
      "Sou inflexível em minha maneira de pensar.",
    ],
  },
  {
    id: "criminal",
    name: "Criminoso",
    description:
      "Você é um criminoso experiente com um histórico de quebrar a lei. Passou muito tempo entre outros criminosos e ainda mantém contatos no submundo criminoso.",
    skillProficiencies: ["deception", "stealth"],
    toolProficiencies: ["Um tipo de kit de jogos", "Ferramentas de ladrão"],
    languages: 0,
    equipment: [
      "Pé de cabra",
      "Roupas escuras comuns com capuz",
      "Bolsa com 15 po",
    ],
    feature: {
      name: "Contato Criminoso",
      description:
        "Você tem um contato confiável que age como intermediário para mensagens clandestinas entre você e outros criminosos. Você sabe como localizar esse contato e pode enviar mensagens através dele.",
    },
    personalityTraits: [
      "Sempre tenho um plano para quando as coisas derem errado.",
      "O melhor jeito de me conhecer é sob a ameaça de violência. Estou calmo, mesmo sob pressão.",
      "O primeiro a sugerir um plano é o primeiro a me trair. Portanto, eu nunca sou o primeiro.",
      "Faria qualquer coisa para ficar famoso.",
    ],
    ideals: [
      "Honra. Não roubo de pessoas inocentes. (Leal)",
      "Liberdade. Correntes são feitas para serem quebradas, assim como aqueles que as forjariam. (Caótico)",
      "Caridade. Roubo dos ricos para que possa ajudar pessoas em necessidade. (Bom)",
      "Ganância. Fariei qualquer coisa para ficar rico. (Mau)",
    ],
    bonds: [
      "Estou tentando pagar uma dívida antiga com alguém generoso. Devo minha vida a esse indivíduo.",
      "Meu dinheiro ilicitamente obtido está indo para ajudar minha família.",
      "Algo importante foi tirado de mim e me vingarei daqueles responsáveis.",
      "Um dia, voltarei à minha terra natal e me vingarei dos que me fizeram injustiça.",
    ],
    flaws: [
      "Quando vejo algo valioso, não consigo pensar em nada além de como roubá-lo.",
      "Quando confrontado com uma escolha entre dinheiro e amigos, geralmente escolho o dinheiro.",
      "Um inimigo inocente está atrás de mim por um crime que cometi.",
      "Não consigo resistir a aproveitar as fraquezas dos outros.",
    ],
  },
  {
    id: "folk-hero",
    name: "Herói do Povo",
    description:
      "Você vem de uma classe humilde, mas algo em você fez o povo comum olhá-lo como seu campeão. Você enfrenta tiranos e monstros para proteger as pessoas comuns.",
    skillProficiencies: ["animalHandling", "survival"],
    toolProficiencies: ["Um tipo de ferramentas de artesão", "Veículos (terrestres)"],
    languages: 0,
    equipment: [
      "Um conjunto de ferramentas de artesão (à escolha)",
      "Pá",
      "Pote de ferro",
      "Roupas comuns",
      "Bolsa com 10 po",
    ],
    feature: {
      name: "Hospitalidade Rural",
      description:
        "Como o herói do povo, as pessoas comuns prontamente lhe oferecem abrigo e comida. Elas o protegem de quem o procura, embora não arrisquem a vida por você.",
    },
    personalityTraits: [
      "Julgo as pessoas pelas suas ações, não pelas palavras.",
      "Se alguém está em problemas, estou sempre pronto para ajudar.",
      "Quando faço um plano, me apego a ele. Não me distraio facilmente.",
      "Tenho um senso forte de justiça e sempre ajo para fazer o certo.",
    ],
    ideals: [
      "Respeito. As pessoas merecem ser tratadas com dignidade e respeito. (Bom)",
      "Justiça. Nenhum mal deve ficar impune. (Leal)",
      "Liberdade. Tiranos não devem oprimir o povo. (Caótico)",
      "Poder. Se eu me tornar forte, posso tomar o que quiser. (Mau)",
    ],
    bonds: [
      "Tenho um compromisso com a proteção daqueles que não podem se proteger.",
      "Minha família, clã ou companheiros de infância significam tudo para mim.",
      "Fui injustiçado e busco me vingar.",
      "Protegerei aqueles que não podem se proteger, não importa o custo.",
    ],
    flaws: [
      "O tirano que governa minha terra natal ainda me assombra.",
      "Tenho confiança demais em mim e nas minhas habilidades.",
      "Arrisco demais para ajudar os outros.",
      "Não confio em autoridades e evito a lei quando posso.",
    ],
  },
  {
    id: "noble",
    name: "Nobre",
    description:
      "Você entende riqueza, poder e privilégio. Carrega um título nobre e sua família possui terras e influência política. Pode ser um aristocrata mimado ou um senhor que se preocupa com o povo.",
    skillProficiencies: ["history", "persuasion"],
    toolProficiencies: ["Um tipo de kit de jogos"],
    languages: 1,
    equipment: [
      "Roupas finas",
      "Anel-sinete",
      "Pergaminho de linhagem",
      "Bolsa com 25 po",
    ],
    feature: {
      name: "Posição de Privilégio",
      description:
        "Graças ao seu nascimento nobre, as pessoas estão inclinadas a pensar o melhor de você. Você é bem-vindo na alta sociedade e as pessoas comuns fazem o possível para acomodá-lo. Pode obter audiência com nobres locais se desejar.",
    },
    personalityTraits: [
      "Minha eloquência e comportamento impecável me fazem conquistar amigos e inimigos.",
      "Apesar do meu nascimento nobre, não me coloco acima das outras pessoas.",
      "Ninguém me diz o que fazer ou como me sentir.",
      "Não gosto de me sujar e não farei trabalho manual se puder evitar.",
    ],
    ideals: [
      "Respeito. O respeito é devido àqueles que estão acima de você na hierarquia. (Leal)",
      "Responsabilidade. É meu dever proteger e cuidar das pessoas sob minha proteção. (Bom)",
      "Independência. Devo provar que posso cuidar de mim sem a ajuda da minha família. (Caótico)",
      "Poder. Se eu puder obter mais poder, ninguém poderá me dizer o que fazer. (Mau)",
    ],
    bonds: [
      "Defenderei a reputação da minha família a qualquer custo.",
      "O sangue da minha família é antigo e a linhagem deve ser preservada.",
      "Nada é mais importante do que os outros membros da minha família.",
      "Estou apaixonado por alguém que minha família me proíbe de ver.",
    ],
    flaws: [
      "Secretamente, acredito que todos estão abaixo de mim.",
      "Escondo um segredo escandaloso que arruinaria minha família se viesse à tona.",
      "Muitas vezes me encontro ouvindo o que outros dizem a meu respeito.",
      "Tenho um desejo incontrolável de obter poder e influência.",
    ],
  },
  {
    id: "sage",
    name: "Sábio",
    description:
      "Você passou anos aprendendo o conhecimento do multiverso. Pode ter estudado com mestres, frequentado uma universidade ou aprendido sozinho em uma biblioteca.",
    skillProficiencies: ["arcana", "history"],
    toolProficiencies: [],
    languages: 2,
    equipment: [
      "Frasco de tinta",
      "Pena",
      "Faca pequena",
      "Carta de um colega falecido fazendo uma pergunta que você ainda não conseguiu responder",
      "Roupas comuns",
      "Bolsa com 10 po",
    ],
    feature: {
      name: "Pesquisador",
      description:
        "Quando tenta aprender ou recordar um pedaço de conhecimento, se não souber a informação, geralmente sabe onde e de quem pode obtê-la. Geralmente, essa informação vem de uma biblioteca, scriptorium, universidade ou de outro sábio ou criatura.",
    },
    personalityTraits: [
      "Uso palavras polissilábicas que transmitem a impressão de grande erudição.",
      "Li tanto sobre o assunto que fico confiante ao falar sobre ele — às vezes de forma excessiva.",
      "Estou disposto a ouvir qualquer argumento com mente aberta.",
      "Tenho uma obsessão por um mistério particular que ainda não consegui solucionar.",
    ],
    ideals: [
      "Conhecimento. O caminho para o poder e a autodeterminação é através do conhecimento. (Neutro)",
      "Beleza. O que é belo nos aponta para o que é verdadeiro. (Bom)",
      "Lógica. Emoções não devem obscurecer nosso pensamento lógico. (Leal)",
      "Poder. Conhecimento é o caminho para o poder e a dominação. (Mau)",
    ],
    bonds: [
      "É meu dever proteger meus alunos.",
      "Tenho um texto antigo que contém terríveis segredos que não devem cair nas mãos erradas.",
      "Trabalho para preservar uma biblioteca, universidade, scriptorium ou mosteiro.",
      "A obra da minha vida é uma série de tomos relacionados a um campo específico de conhecimento.",
    ],
    flaws: [
      "Sou facilmente distraído pela promessa de informação.",
      "A maioria das pessoas não consegue apreciar a verdadeira beleza de um plano bem elaborado.",
      "Revelarei qualquer segredo para me tornar mais importante ou rico.",
      "Sacrificaria meus amigos se isso significasse descobrir um novo conhecimento.",
    ],
  },
  {
    id: "soldier",
    name: "Soldado",
    description:
      "A guerra marcou sua vida desde cedo. Treinou como parte de uma milícia local, exército ou companhia mercenária, aprendendo disciplina, estratégia e o uso das armas.",
    skillProficiencies: ["athletics", "intimidation"],
    toolProficiencies: ["Um tipo de kit de jogos", "Veículos (terrestres)"],
    languages: 0,
    equipment: [
      "Insígnia de posto",
      "Troféu de um inimigo caído",
      "Conjunto de dados de ossos ou baralho",
      "Roupas comuns",
      "Bolsa com 10 po",
    ],
    feature: {
      name: "Patente Militar",
      description:
        "Você tem uma patente militar de sua carreira como soldado. Soldados leais à sua antiga organização ainda o reconhecem. Pode invocar sua patente para exercer influência sobre outros soldados e obter acesso a acampamentos ou fortalezas amigáveis.",
    },
    personalityTraits: [
      "Sou sempre educado e respeitoso.",
      "Sou atormentado pelas memórias de violência. Não consigo me livrar das imagens de violência na minha mente.",
      "Perdi muitos amigos e tenho dificuldade em fazer novos.",
      "Tenho um senso forte de humor negro e gosto de fazer piadas sobre a morte.",
    ],
    ideals: [
      "Maior Bem. Nossa sorte está nas mãos das pessoas, não dos indivíduos. (Bom)",
      "Responsabilidade. Cumpro meu dever e espero o mesmo dos outros. (Leal)",
      "Independência. Quando as pessoas seguem ordens cegamente, seguem a tirania. (Caótico)",
      "Poder. Em vida como na guerra, a força mais forte vence. (Mau)",
    ],
    bonds: [
      "Daria minha vida pelos que serviram comigo.",
      "Alguém salvou minha vida no campo de batalha. Essa pessoa pode mandar em mim.",
      "Minha honra é minha vida.",
      "Nunca esquecerei a derrota esmagadora que meu pelotão sofreu ou o inimigo responsável.",
    ],
    flaws: [
      "O monstro terrível que enfrentei ainda me assombra.",
      "Tenho pouco respeito por aqueles que não são guerreiros comprovados.",
      "Cometi um ato terrível na guerra e ninguém mais sabe.",
      "Tenho um preconceito contra um tipo específico de inimigo.",
    ],
  },
  {
    id: "hermit",
    name: "Eremita",
    description:
      "Você viveu em reclusão — em um eremitério, mosteiro ou em isolamento na natureza — onde encontrou quietude, trabalho e contemplação, talvez em busca de respostas espirituais ou científicas.",
    skillProficiencies: ["medicine", "religion"],
    toolProficiencies: ["Kit de herbalismo"],
    languages: 1,
    equipment: [
      "Estojo de pergaminhos com notas de estudos ou orações",
      "Cobertor de inverno",
      "Roupas comuns",
      "Kit de herbalismo",
      "5 po",
    ],
    feature: {
      name: "Descoberta",
      description:
        "O isolamento quieto do seu eremitério lhe deu acesso a uma descoberta única e poderosa. A natureza exata dessa revelação depende da natureza da sua reclusão e deve ser determinada com o Mestre.",
    },
    personalityTraits: [
      "Estive isolado por tanto tempo que raramente falo, preferindo gestos.",
      "Estou perfeitamente calmo em qualquer situação.",
      "O líder da minha comunidade isolada tinha opiniões misteriosas sobre mim e meu destino.",
      "Estou obcecado com a realização de uma profecia pessoal.",
    ],
    ideals: [
      "Maior Bem. Meus dons são feitos para serem compartilhados com todos. (Bom)",
      "Lógica. Emoções não devem obscurecer nosso pensamento lógico. (Leal)",
      "Livre Pensamento. Investigação e curiosidade são os pilares do progresso. (Caótico)",
      "Poder. A solidão e a contemplação são caminhos para o poder místico. (Mau)",
    ],
    bonds: [
      "Nada é mais importante do que as outras pessoas que me acompanharam no isolamento.",
      "Entre na solidão para me esconder daqueles que poderiam ainda estar me caçando.",
      "Ainda estou buscando a resposta para uma pergunta filosófica.",
      "Vivo para proteger um lugar sagrado que não deve ser perturbado.",
    ],
    flaws: [
      "Agora que voltei ao mundo, estou com um apetite excessivo por seus prazeres.",
      "Abrigo escuridão sombria e destrutiva que se opõe a tudo o que represento.",
      "Sou dogmático em meus pensamentos e filosofia.",
      "Faria o que fosse necessário para proteger os segredos que descobri.",
    ],
  },
  {
    id: "entertainer",
    name: "Artista",
    description:
      "Você prospera diante de uma plateia. Sabe como cativá-los, entretê-los e até inspirá-los. Sua poética pode tocar as almas, sua música levantar espíritos ou sua dança inspirar.",
    skillProficiencies: ["acrobatics", "performance"],
    toolProficiencies: ["Kit de disfarce", "Um tipo de instrumento musical"],
    languages: 0,
    equipment: [
      "Um instrumento musical (à escolha)",
      "Presente de um admirador (carta de amor, mecha de cabelo ou bugiganga)",
      "Traje de fantasia",
      "Bolsa com 15 po",
    ],
    feature: {
      name: "À Procura de um Público",
      description:
        "Você sempre consegue encontrar um lugar para se apresentar. Em troca, recebe alojamento e comida modestos. Além disso, sua performance faz você se tornar uma figura local, e estranhos o reconhecem em cidades onde já se apresentou.",
    },
    personalityTraits: [
      "Conheço uma história adequada para cada ocasião.",
      "Onde quer que eu vá, coleciono notícias locais e espalho fofocas.",
      "Sou um romântico incurável, sempre em busca daquele 'amor verdadeiro'.",
      "Nada me deixa tão irritado quanto um público que não aprecia a arte.",
    ],
    ideals: [
      "Beleza. Ao performar, espalho a beleza pelo mundo. (Bom)",
      "Tradição. As histórias, lendas e músicas do passado nunca devem ser esquecidas. (Leal)",
      "Criatividade. O mundo precisa de novas ideias e ousadia. (Caótico)",
      "Ganância. Faço o que for preciso para ficar rico e famoso. (Mau)",
    ],
    bonds: [
      "Meu instrumento é minha posse mais preciosa e me representa como ninguém mais.",
      "Alguém roubou meu instrumento precioso e um dia o recuperarei.",
      "Quero ser famoso, o que quer que isso custe.",
      "Vou fazer qualquer coisa para provar a superioridade da minha arte.",
    ],
    flaws: [
      "Farei qualquer coisa para conquistar fama e glória.",
      "Tenho um escândalo no meu passado que me persegue.",
      "Uma vez zombei de um nobre que ainda quer se vingar.",
      "Nunca fico satisfeito com o que tenho. Sempre quero mais.",
    ],
  },
  {
    id: "guild-artisan",
    name: "Artesão de Guilda",
    description:
      "Você é membro de uma guilda de artesãos, habilidoso em um determinado ofício e intimamente associado a outros artesãos. Você aprendeu as habilidades do ofício e os costumes da guilda.",
    skillProficiencies: ["insight", "persuasion"],
    toolProficiencies: ["Um tipo de ferramentas de artesão"],
    languages: 1,
    equipment: [
      "Um conjunto de ferramentas de artesão (à escolha)",
      "Carta de apresentação da sua guilda",
      "Roupas de viajante",
      "Bolsa com 15 po",
    ],
    feature: {
      name: "Apoio da Guilda",
      description:
        "Como membro de uma guilda, pode contar com certos benefícios. Colegas artesãos fornecem alojamento e comida, e a guilda pode ajudar em questões legais. Você deve pagar taxas anuais de 5 po à guilda.",
    },
    personalityTraits: [
      "Acredito que qualquer coisa que valha a pena fazer vale a pena ser bem feita.",
      "Sou um esnobe que olha de cima para aqueles que não apreciam a arte refinada.",
      "Sempre quero saber como as coisas funcionam e o que as faz funcionar.",
      "Tenho um senso aguçado de humor sarcástico.",
    ],
    ideals: [
      "Comunidade. É dever de todos os indivíduos civilizados fortalecer os laços da comunidade. (Leal)",
      "Generosidade. Meu talento foi feito para ser compartilhado. (Bom)",
      "Liberdade. Todos devem ser livres para perseguir seus próprios meios de vida. (Caótico)",
      "Ganância. Estou apenas no negócio pelo dinheiro. (Mau)",
    ],
    bonds: [
      "A oficina onde aprendi meu ofício é o lugar mais importante do mundo para mim.",
      "Devo minha guilda um grande favor por me aceitar como membro.",
      "Aspiro provar que sou o maior artesão da minha arte.",
      "Buscarei vingança contra os rivais sem escrúpulos que me destruíram e me expulsaram do negócio.",
    ],
    flaws: [
      "Farei qualquer coisa para obter um contrato ou cliente.",
      "Sou rápido em assumir crédito e colocar a culpa nos outros.",
      "Nunca esquecerei a humilhação que sofri nas mãos de um rival e me vingarei.",
      "Estou determinado a impressionar pessoas poderosas a qualquer custo.",
    ],
  },
  {
    id: "outlander",
    name: "Forasteiro",
    description:
      "Você cresceu nas terras selvagens, longe da civilização. Tem uma conexão íntima com a natureza e é hábil em sobreviver longe das comodidades da vida urbana.",
    skillProficiencies: ["athletics", "survival"],
    toolProficiencies: ["Um tipo de instrumento musical"],
    languages: 1,
    equipment: [
      "Cajado",
      "Armadilha de caça",
      "Troféu de animal",
      "Roupas de viajante",
      "Bolsa com 10 po",
    ],
    feature: {
      name: "Andarilho",
      description:
        "Você tem uma memória excelente para mapas e geografia, e pode sempre recordar a disposição geral do terreno, povoados e outros pontos de referência ao redor. Além disso, pode encontrar comida e água doce para você e até cinco outras pessoas a cada dia, desde que a terra ofereça bagas, caça, água etc.",
    },
    personalityTraits: [
      "Estou impulsionado por uma curiosidade vagante.",
      "Sinto-me mais confortável entre animais selvagens do que entre pessoas.",
      "Fui isolado por tanto tempo que tenho pouca prática em conversação.",
      "Espero problemas a cada esquina e estou sempre alerta.",
    ],
    ideals: [
      "Mudança. A vida é como as estações, em constante mudança, e devemos mudar com ela. (Caótico)",
      "Maior Bem. É dever de todos proteger a natureza e a comunidade. (Bom)",
      "Honra. A lei natural da sobrevivência do mais apto deve ser respeitada. (Leal)",
      "Poder. A vida é uma luta e eu pretendo ser o vencedor. (Mau)",
    ],
    bonds: [
      "Minha família, clã ou tribo é a coisa mais importante da minha vida.",
      "Uma ofensa à natureza selvagem é uma ofensa pessoal a mim.",
      "Vou trazer a ruína aos que destruíram minha terra natal.",
      "Sou o último da minha tribo e é meu dever garantir que nossa história sobreviva.",
    ],
    flaws: [
      "Sou muito rápido para matar. A vida é barata na natureza.",
      "Não tenho empatia pelas pessoas das cidades e vilas.",
      "Tenho um terrível temperamento que me mete em problemas.",
      "Sou lento para confiar nos membros de outras raças e tribos.",
    ],
  },
  {
    id: "sailor",
    name: "Marinheiro",
    description:
      "Você navegou em um navio mercante, uma frota naval ou talvez um navio pirata. Está acostumado à vida no mar, à disciplina da tripulação e aos perigos das águas profundas.",
    skillProficiencies: ["athletics", "perception"],
    toolProficiencies: ["Ferramentas de navegador", "Veículos (aquáticos)"],
    languages: 0,
    equipment: [
      "Pino de beliche (clava)",
      "50 pés de corda de seda",
      "Amuleto da sorte (como bugiganga)",
      "Roupas comuns",
      "Bolsa com 10 po",
    ],
    feature: {
      name: "Passagem de Navio",
      description:
        "Quando precisar, pode garantir passagem gratuita em um navio a vapor para você e seus companheiros. Você mesmo pode ter que trabalhar durante a viagem. Como você está escolhendo o destino, não pode garantir um horário de partida preciso.",
    },
    personalityTraits: [
      "Minha linguagem é tão colorida quanto um porto de marinheiros.",
      "Gosto de um bom desafio e nunca recuso uma aposta.",
      "Trabalho duro e jogo duro.",
      "Adoro uma boa história, mesmo que eu tenha ouvido mil vezes.",
    ],
    ideals: [
      "Respeito. A coisa que mantém um navio unido é o respeito mútuo entre capitão e tripulação. (Bom)",
      "Justiça. Seguimos um código rígido de conduta, e o quebramos por nossa conta e risco. (Leal)",
      "Liberdade. O mar é liberdade — a liberdade de ir aonde eu quiser. (Caótico)",
      "Mestre. Sou um predador e as outras pessoas são minha presa. (Mau)",
    ],
    bonds: [
      "Sou leal ao meu capitão acima de tudo, mais do que a qualquer rei ou deus.",
      "Os olhos de alguém que amo olham para mim do horizonte.",
      "Vou recuperar o que foi roubado de mim no mar.",
      "Nunca esquecerei o naufrágio que me deixou à deriva e a tripulação que me salvou.",
    ],
    flaws: [
      "Sigo ordens, mesmo que discordo delas.",
      "Vou dizer qualquer coisa para evitar trabalho extra.",
      "Uma vez que alguém questiona minha coragem, faço qualquer coisa para provar que estou certo.",
      "Uma vez que começo a beber, é difícil parar.",
    ],
  },
  {
    id: "urchin",
    name: "Orfão de Rua",
    description:
      "Você cresceu nas ruas sozinho e órfão, sobrevivendo furtando e pedindo. Aprendeu a se virar e a conhecer os cantos escuros das cidades.",
    skillProficiencies: ["sleightOfHand", "stealth"],
    toolProficiencies: ["Kit de disfarce", "Ferramentas de ladrão"],
    languages: 0,
    equipment: [
      "Faca pequena",
      "Mapa da cidade onde cresceu",
      "Rato de estimação",
      "Um token para lembrar seus pais",
      "Roupas comuns",
      "Bolsa com 10 po",
    ],
    feature: {
      name: "Segredos da Cidade",
      description:
        "Você conhece os padrões e fluxo secretos das cidades e pode encontrar passagens por áreas urbanas duas vezes mais rápido que o normal. Além disso, está acostumado a se esgueirar e pode se mover pelas multidões com facilidade.",
    },
    personalityTraits: [
      "Escondo pedaços de comida e bugigangas em meus bolsos.",
      "Pergunto muitas perguntas.",
      "Gosto de me espremer em lugares apertados onde ninguém mais consegue me alcançar.",
      "Durmo com um olho aberto — nunca se sabe quando o jantar (ou um ladrão) pode aparecer.",
    ],
    ideals: [
      "Comunidade. Todos nós temos que cuidar uns dos outros, porque ninguém mais o fará. (Bom)",
      "Mudança. Os baixos se erguem, os altos caem. Mudança é natural. (Caótico)",
      "Aspirações. Vou provar que mereço uma vida melhor. (Qualquer)",
      "Retribuição. Os ricos precisam ser mostrados o que é a vida na rua. (Mau)",
    ],
    bonds: [
      "Meu povo ou minha cidade são tudo para mim. Vou defendê-los até a morte.",
      "Devo a vida a outro órfão que cuidou de mim.",
      "Busco vingança contra aqueles que me expulsaram das ruas.",
      "Lutei duro por algo e não o perderei.",
    ],
    flaws: [
      "Se estiver em apuros, correrei antes de pensar.",
      "Moeda de ouro parece um destino certo, não importa o risco.",
      "É difícil confiar quando você cresceu sozinho.",
      "Destruirei qualquer um que ameace prejudicar meus amigos.",
    ],
  },
  {
    id: "charlatan",
    name: "Charlatão",
    description:
      "Você sempre teve um jeito com as pessoas. Sabe o que faz elas se mexerem e pode colocá-las em seu bolso com algumas palavras escolhidas. Seus hábitos favoritos são o engano e a fraude.",
    skillProficiencies: ["deception", "sleightOfHand"],
    toolProficiencies: ["Kit de disfarce", "Kit de falsificação"],
    languages: 0,
    equipment: [
      "Roupas finas",
      "Kit de disfarce",
      "Ferramentas do golpe à escolha (dez garrafas tampadas com líquido colorido, conjunto de dados viciados, baralho marcado ou anel-sinete de um duque imaginário)",
      "Bolsa com 15 po",
    ],
    feature: {
      name: "Identidade Falsa",
      description:
        "Você criou uma segunda identidade que inclui documentação, conhecidos estabelecidos e disfarces, permitindo que você assuma essa persona. Além disso, pode forjar documentos incluindo documentos oficiais e cartas pessoais, desde que tenha visto um exemplo do tipo de documento que está tentando copiar.",
    },
    personalityTraits: [
      "Apaixono-me facilmente e me desapaixono com a mesma facilidade.",
      "Tenho um truque para cada ocasião — mentiras e truques para qualquer situação.",
      "Uso a lábia e a flerte para conseguir o que desejo.",
      "Nasci para mentir.",
    ],
    ideals: [
      "Independência. Sou um espírito livre — ninguém me diz o que fazer. (Caótico)",
      "Justiça. Nunca tiro vantagem de pessoas que não podem se defender. (Leal)",
      "Criatividade. Nunca faço a mesma coisa duas vezes. (Caótico)",
      "Aspirações. Estou determinado a me tornar alguém na vida. (Qualquer)",
    ],
    bonds: [
      "Enganei a pessoa errada e preciso ter certeza de que essa pessoa nunca me encontrará.",
      "Devo tudo a um mentor generoso — um indivíduo que agora está morto.",
      "Algo precioso me foi tirado e desejo recuperá-lo.",
      "Vou me vingar do vilão corrupto que destruiu meu povo.",
    ],
    flaws: [
      "Não resisto a um rosto bonito.",
      "Estou seguro de que não posso ser enganado. Ninguém consegue me passar a perna.",
      "Estou sempre em dívida. Gasto meu dinheiro com luxos tão rápido quanto o ganho.",
      "Sou um covarde. Fugirei ao primeiro sinal de perigo.",
    ],
  },
];

export function getBackground(id: string): BackgroundDefinition | undefined {
  return BACKGROUNDS.find((b) => b.id === id);
}
