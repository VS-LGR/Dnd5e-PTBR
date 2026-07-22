const fs = require("fs");
const path = require("path");
const root = path.join(__dirname, "..");
const raw = require(path.join(root, "tmp-xgte-common.json"));

const PT_NAMES = {
  "Bead of Nourishment": "Conta de Nutrição",
  "Bead of Refreshment": "Conta de Refresco",
  "Boots of False Tracks": "Botas de Rastros Falsos",
  "Candle of the Deep": "Vela das Profundezas",
  "Charlatan's Die": "Dado do Charlatão",
  "Cloak of Billowing": "Manto Ondulante",
  "Cloak of Many Fashions": "Manto de Muitas Modas",
  "Clockwork Amulet": "Amuleto de Engrenagens",
  "Clothes of Mending": "Roupas de Remendo",
  "Dark Shard Amulet": "Amuleto do Fragmento Negro",
  "Dread Helm": "Elmo Medonho",
  "Ear Horn of Hearing": "Corneta Auricular da Audição",
  "Enduring Spellbook": "Grimório Duradouro",
  "Ersatz Eye": "Olho Artificial",
  "Hat of Vermin": "Chapéu de Vermes",
  "Hat of Wizardry": "Chapéu de Magia",
  "Heward's Handy Spice Pouch": "Bolsa de Especiarias Prática de Heward",
  "Horn of Silent Alarm": "Trompa do Alarme Silencioso",
  "Instrument of Illusions": "Instrumento de Ilusões",
  "Instrument of Scribing": "Instrumento de Escrita",
  "Lock of Trickery": "Fechadura da Trapaça",
  "Mystery Key": "Chave Misteriosa",
  "Orb of Direction": "Orbe de Direção",
  "Orb of Time": "Orbe do Tempo",
  "Perfume of Bewitching": "Perfume do Encantamento",
  "Pipe of Smoke Monsters": "Cachimbo de Monstros de Fumaça",
  "Pole of Angling": "Vara de Pesca",
  "Pole of Collapsing": "Vara Retrátil",
  "Pot of Awakening": "Vaso do Despertar",
  "Rope of Mending": "Corda de Remendo",
  "Ruby of the War Mage": "Rubi do Mago de Guerra",
  "Shield of Expression": "Escudo da Expressão",
  "Staff of Adornment": "Cajado do Adorno",
  "Staff of Birdcalls": "Cajado dos Cantos de Ave",
  "Staff of Flowers": "Cajado das Flores",
  "Talking Doll": "Boneca Falante",
  "Tankard of Sobriety": "Caneca da Sobriedade",
  "Unbreakable Arrow": "Flecha Inquebrável",
  "Veteran's Cane": "Bengala do Veterano",
  "Wand of Conducting": "Varinha de Regência",
  "Wand of Pyrotechnics": "Varinha de Pirotecnia",
  "Wand of Scowls": "Varinha dos Carrancismos",
  "Wand of Smiles": "Varinha dos Sorrisos",
};

const PT_DESC = {
  "Bead of Nourishment":
    "Esta conta esponjosa, sem sabor e gelatinosa dissolve-se na língua e fornece tanta nutrição quanto 1 dia de rações.",
  "Bead of Refreshment":
    "Esta conta esponjosa, sem sabor e gelatinosa dissolve-se em líquido, transformando até cerca de meio litro do líquido em água potável fresca e fria. A conta não tem efeito em líquidos mágicos ou substâncias nocivas, como veneno.",
  "Boots of False Tracks":
    "Somente humanoides podem usar estas botas. Enquanto as usa, você pode fazer com que deixem rastros como os de outro tipo de humanoide do seu tamanho.",
  "Candle of the Deep":
    "A chama desta vela não se apaga quando imersa em água. Emite luz e calor como uma vela normal.",
  "Charlatan's Die":
    "Sempre que você rolar este dado de seis faces, pode controlar qual número sai.",
  "Cloak of Billowing":
    "Enquanto usa este manto, você pode usar uma ação bônus para fazê-lo ondular dramaticamente.",
  "Cloak of Many Fashions":
    "Enquanto usa este manto, pode usar uma ação bônus para mudar o estilo, a cor e a qualidade aparente da peça. O peso não muda. Independentemente da aparência, continua sendo um manto. Pode imitar a aparência de outros mantos mágicos, mas não ganha as propriedades deles.",
  "Clockwork Amulet":
    "Este amuleto de cobre contém engrenagens minúsculas e é alimentado por magia de Mechanus. Quem encosta o ouvido ouve tique-taques suaves. Quando faz uma jogada de ataque enquanto o usa, você pode abrir mão de rolar o d20 e obter 10 no dado. Uma vez usada, esta propriedade não pode ser usada de novo até o próximo amanhecer.",
  "Clothes of Mending":
    "Este traje elegante de roupas de viajante se remenda magicamente contra o desgaste diário. Peças destruídas não podem ser reparadas assim.",
  "Dark Shard Amulet":
    "Amuleto feito de um fragmento de material extraplanar do reino do seu patrono de bruxo. Enquanto o usa: pode usá-lo como foco de conjuração de bruxo; pode tentar conjurar um truque que não conhece da lista de bruxo, com teste de Inteligência (Arcana) CD 10. Sucesso: conjura; falha: a ação é gasta. Em qualquer caso, não pode usar esta propriedade de novo até terminar um descanso longo. (Sintonização: bruxo.)",
  "Dread Helm":
    "Este elmo de aço temível faz seus olhos brilharem em vermelho enquanto o usa.",
  "Ear Horn of Hearing":
    "Enquanto encostada à orelha, esta corneta suprime o efeito da condição Surdo em você, permitindo ouvir normalmente.",
  "Enduring Spellbook":
    "Este grimório, e qualquer coisa escrita em suas páginas, não pode ser danificado por fogo ou imersão em água. Além disso, não se deteriora com a idade.",
  "Ersatz Eye":
    "Este olho artificial substitui um olho real perdido ou removido. Enquanto embutido na órbita, não pode ser removido por ninguém além de você, e você enxerga através dele como um olho normal.",
  "Hat of Vermin":
    "Enquanto usa este chapéu, pode usar uma ação para produzir um morcego, um sapo ou um rato. A criatura aparece a até 1,5 m, é amigável, age no seu turno e obedece a comandos mentais. Desaparece após 1 hora, ao cair a 0 PV ou se você usar o chapéu de novo. O chapéu não pode ser usado novamente até o próximo amanhecer.",
  "Hat of Wizardry":
    "Enquanto usa este chapéu, você pode tentar conjurar um truque que não conhece da lista de mago, com teste de Inteligência (Arcana) CD 10. Sucesso: conjura; falha: a ação é gasta. Em qualquer caso, não pode usar esta propriedade de novo até terminar um descanso longo. Também pode usar o chapéu como foco de conjuração de mago. (Sintonização: mago.)",
  "Heward's Handy Spice Pouch":
    "Esta bolsa aparenta estar vazia. Como ação, você pode retirar uma pitada de tempero. Há 10 cargas. Ao tirar uma pitada, gasta 1 carga e escolhe um sabor (doce, salgado, azedo, amargo ou umami). A bolsa recupera 1d6+4 cargas diariamente ao amanhecer. Se gastar a última carga, role 1d20; em 1, a bolsa perde a magia.",
  "Horn of Silent Alarm":
    "Este chifre tem 4 cargas. Como ação, você pode gastar 1 carga para soprá-lo; em vez de emitir som audível, um alvo à sua escolha a até 180 m que você possa ver ouve um toque mental. A trompa recupera 1d4 cargas diariamente ao amanhecer.",
  "Instrument of Illusions":
    "Enquanto você toca este instrumento musical, pode fazer efeitos ilusórios visuais e auditivos menores (como prestidigitação) a até 18 m.",
  "Instrument of Scribing":
    "Este instrumento musical tem 3 cargas. Enquanto o segura, pode usar uma ação para gastar 1 carga e escrever uma mensagem mágica invisível em uma superfície. A mensagem é visível para você e até sete criaturas à sua escolha e dura 24 horas. Recupera todas as cargas diariamente ao amanhecer.",
  "Lock of Trickery":
    "Esta fechadura aparenta ser comum. Quando alguém usa ferramentas de ladrão nela, a CD é 10, e a fechadura se abre ou se tranca (à escolha de quem a instalou) no início do próximo turno daquela criatura, a menos que uma chave correta seja usada.",
  "Mystery Key":
    "Uma chave misteriosa com 5% de chance de abrir qualquer fechadura na qual for usada. Uma vez que abre uma fechadura, a chave desaparece.",
  "Orb of Direction":
    "Enquanto segura este orbe, você pode usar uma ação para determinar qual direção é o norte. Funciona apenas em planos com direção cardinal.",
  "Orb of Time":
    "Enquanto segura este orbe, você pode usar uma ação para determinar se é manhã, tarde, crepúsculo ou noite. Funciona apenas em planos com ciclo dia/noite.",
  "Perfume of Bewitching":
    "Esta fragrância tem 5 usos. Como ação, você pode borrifá-la em si mesmo ou em outra criatura a até 1,5 m. Pelos próximos 10 minutos, a criatura tem vantagem em testes de Carisma para interagir socialmente com humanoides.",
  "Pipe of Smoke Monsters":
    "Enquanto fuma este cachimbo, você pode usar uma ação para exalar fumaça na forma de uma criatura. A forma permanece por 1 minuto e depois se dispersa. Sem efeito mecânico além do visual.",
  "Pole of Angling":
    "Enquanto segura esta vara, você pode usar uma ação para transformá-la em uma vara de pesca ou de volta à forma de vara de 3 m.",
  "Pole of Collapsing":
    "Enquanto segura esta vara, você pode usar uma ação bônus para falar o nome de comando e colapsá-la em uma haste de 30 cm, ou estendê-la de novo até 3 m (se houver espaço).",
  "Pot of Awakening":
    "Se plantar uma muda comum neste vaso e deixá-lo sob o sol por 1d4+2 dias, a planta vira um arbusto acordado amigável que obedece a comandos. O vaso não pode ser usado assim de novo até o próximo amanhecer após a transformação.",
  "Rope of Mending":
    "Você pode cortar esta corda de 15 m e, como ação, falar o nome de comando para reunir as partes a até 9 m em uma corda intacta. Partes destruídas (não apenas cortadas) não são restauradas.",
  "Ruby of the War Mage":
    "Enquanto segura uma arma simples ou marcial, você pode usar uma ação para prender o rubi a ela e então usá-la como foco de conjuração. (Sintonização por um conjurador.)",
  "Shield of Expression":
    "O rosto frontal deste escudo normalmente é inexpressivo. Enquanto o empunha, você pode usar uma ação bônus para mudar a face para uma expressão (feliz, triste, zangada, etc.).",
  "Staff of Adornment":
    "Enquanto segura este cajado, você pode usar uma ação para prender um objeto a ele; o objeto flutua a 30 cm da ponta até você removê-lo ou usar o cajado de novo.",
  "Staff of Birdcalls":
    "Este cajado tem 10 cargas. Como ação, gaste 1 carga para criar um som de ave (canto, cacarejo, grasnido, piado, grasnar ou canto de galo) audível a até 18 m. Recupera 1d6+4 cargas ao amanhecer. Se gastar a última carga, role 1d20; em 1, o cajado se perde.",
  "Staff of Flowers":
    "Este cajado tem 10 cargas. Como ação, gaste 1 carga para fazer uma flor brotar de madeira, solo ou superfície semelhante a até 1,5 m. Recupera 1d6+4 cargas ao amanhecer. Se gastar a última carga, role 1d20; em 1, o cajado se perde.",
  "Talking Doll":
    "Enquanto este brinquedo estiver a até 1,5 m de você, pode gastar uma ação bônus para fazê-lo falar frases curtas (até 6 palavras) com a sua voz.",
  "Tankard of Sobriety":
    "Qualquer bebida alcoólica colocada nesta caneca torna-se não alcoólica, sem alterar o sabor. Não remove outros efeitos de veneno.",
  "Unbreakable Arrow":
    "Esta flecha não pode ser quebrada e não perde a magia se for usada como munição.",
  "Veteran's Cane":
    "Como ação, lance esta bengala ao chão; ela se transforma em uma lança longa mágica. Como ação, transforme a arma de novo em bengala.",
  "Wand of Conducting":
    "Esta varinha tem 3 cargas. Como ação, gaste 1 carga para criar música orquestral ao agitar a varinha (audível a 18 m). Recupera todas as cargas ao amanhecer. Se gastar a última, role 1d20; em 1, a varinha se desfaz.",
  "Wand of Pyrotechnics":
    "Esta varinha tem 7 cargas. Como ação, gaste 1 carga para criar uma explosão inofensiva de luzes coloridas a até 36 m (visível/audível a 90 m). Recupera 1d6+1 cargas ao amanhecer. Se gastar a última, role 1d20; em 1, a varinha se desfaz.",
  "Wand of Scowls":
    "Esta varinha tem 3 cargas. Como ação, gaste 1 carga; um humanoide a até 9 m que possa vê-lo faz salvaguarda de Carisma CD 10 ou fica com expressão carrancuda por 1 minuto. Recupera todas as cargas ao amanhecer. Se gastar a última, role 1d20; em 1, a varinha se desfaz.",
  "Wand of Smiles":
    "Esta varinha tem 3 cargas. Como ação, gaste 1 carga; um humanoide a até 9 m que possa vê-lo faz salvaguarda de Carisma CD 10 ou fica com um sorriso largo por 1 minuto. Recupera todas as cargas ao amanhecer. Se gastar a última, role 1d20; em 1, a varinha se desfaz.",
};

function slug(name) {
  return (
    "xgte-" +
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  );
}

function categoryOf(name) {
  if (/Wand of/.test(name)) return "wand";
  if (/Staff of/.test(name)) return "staff";
  if (/Shield/.test(name)) return "shield";
  if (/Arrow|Ammunition|Sword/.test(name)) return "weapon";
  if (/Armor/.test(name)) return "armor";
  return "wondrous";
}

function typeLine(name, reqAttune) {
  const map = {
    "Wand of Conducting": "Varinha, comum",
    "Wand of Pyrotechnics": "Varinha, comum",
    "Wand of Scowls": "Varinha, comum",
    "Wand of Smiles": "Varinha, comum",
    "Staff of Adornment": "Cajado, comum",
    "Staff of Birdcalls": "Cajado, comum",
    "Staff of Flowers": "Cajado, comum",
    "Shield of Expression": "Armadura (escudo), comum",
    "Unbreakable Arrow": "Arma (flecha), comum",
  };
  let line = map[name] || "Item maravilhoso, comum";
  if (reqAttune) line += " (requer sintonização)";
  return line;
}

const extras = [
  {
    nameEn: "Armor of Gleaming",
    name: "Armadura Reluzente",
    category: "armor",
    typeLine: "Armadura (média ou pesada), comum",
    attune: false,
    description: "Esta armadura nunca fica suja.",
  },
  {
    nameEn: "Cast-Off Armor",
    name: "Armadura de Descarte Rápido",
    category: "armor",
    typeLine: "Armadura (leve, média ou pesada), comum",
    attune: false,
    description: "Você pode tirar esta armadura como uma ação.",
  },
  {
    nameEn: "Smoldering Armor",
    name: "Armadura Fumegante",
    category: "armor",
    typeLine: "Armadura (qualquer), comum",
    attune: false,
    description:
      "Enquanto usa esta armadura, você emite fios inofensivos de fumaça inodora.",
  },
  {
    nameEn: "Moon-Touched Sword",
    name: "Espada Tocada pela Lua",
    category: "weapon",
    typeLine: "Arma (qualquer espada), comum",
    attune: false,
    description:
      "Em escuridão, enquanto desembainhada, esta arma mágica emite luz fraca em um raio de 4,5 m.",
  },
  {
    nameEn: "Walloping Ammunition",
    name: "Munição Contundente",
    category: "ammunition",
    typeLine: "Arma (qualquer munição), comum",
    attune: false,
    description:
      "Esta munição é mágica. Quando um alvo é atingido por ela, deve ser bem-sucedido em uma salvaguarda de Força CD 10 ou fica caído.",
  },
];

const items = [];
for (const i of raw) {
  const nameEn = i.name;
  items.push({
    id: slug(nameEn),
    name: PT_NAMES[nameEn] || nameEn,
    nameEn,
    category: categoryOf(nameEn),
    typeLine: typeLine(nameEn, i.reqAttune),
    rarity: "common",
    requiresAttunement: !!i.reqAttune,
    description: PT_DESC[nameEn] || String(i.entries?.[0] ?? ""),
    source: "xgte",
  });
}
for (const e of extras) {
  items.push({
    id: slug(e.nameEn),
    name: e.name,
    nameEn: e.nameEn,
    category: e.category,
    typeLine: e.typeLine,
    rarity: "common",
    requiresAttunement: e.attune,
    description: e.description,
    source: "xgte",
  });
}
items.sort((a, b) => a.name.localeCompare(b.name, "pt"));
fs.writeFileSync(
  path.join(root, "src/config/items/xgteCommonData.json"),
  JSON.stringify(items, null, 2),
);
console.log("wrote", items.length);
