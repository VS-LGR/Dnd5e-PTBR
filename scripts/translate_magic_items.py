"""Translate extracted magic items EN → PT-BR using glossary + name map."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EN = ROOT / "content/items/magic-items-basic-rules.en.json"
OUT = ROOT / "content/items/magic-items-basic-rules.pt.json"
STATUS = ROOT / "content/items/TRANSLATION_STATUS.md"
GLOSSARY_DOC = ROOT / "content/items/GLOSSARY.md"

# Official / conventional PT-BR names (PHB/DMG WoTC Brasil style where known)
NAME_PT: dict[str, str] = {
    "adamantine-armor": "Armadura de Adamantina",
    "ammunition-1-2-or-3": "Munição +1, +2 ou +3",
    "ammunition-of-slaying": "Munição da Matança",
    "amulet-of-health": "Amuleto da Saúde",
    "amulet-of-proof-against-detection-and-location": "Amuleto de Prova contra Detecção e Localização",
    "animated-shield": "Escudo Animado",
    "apparatus-of-kwalish": "Aparato de Kwalish",
    "armor-1-2-or-3": "Armadura +1, +2 ou +3",
    "armor-of-invulnerability": "Armadura da Invulnerabilidade",
    "armor-of-resistance": "Armadura da Resistência",
    "armor-of-vulnerability": "Armadura da Vulnerabilidade",
    "arrow-catching-shield": "Escudo Apanha-Flechas",
    "bag-of-beans": "Bolsa de Feijões",
    "bag-of-devouring": "Bolsa Devoradora",
    "bag-of-holding": "Bolsa de Carga",
    "bag-of-tricks": "Bolsa de Truques",
    "bead-of-force": "Conta da Força",
    "belt-of-dwarvenkind": "Cinto da Linhagem Anã",
    "belt-of-giant-strength": "Cinto da Força de Gigante",
    "berserker-axe": "Machado do Berserker",
    "boots-of-elvinkind": "Botas Élficas",
    "boots-of-elvenkind": "Botas Élficas",
    "boots-of-levitation": "Botas de Levitação",
    "boots-of-speed": "Botas da Velocidade",
    "boots-of-striding-and-springing": "Botas de Passo e Salto",
    "boots-of-the-winterlands": "Botas das Terras do Inverno",
    "bowl-of-commanding-water-elementals": "Tigela de Comando de Elementais da Água",
    "bracers-of-archery": "Braceletes de Arco",
    "bracers-of-defense": "Braceletes de Defesa",
    "brazier-of-commanding-fire-elementals": "Braseiro de Comando de Elementais do Fogo",
    "brooch-of-shielding": "Broche de Proteção",
    "broom-of-flying": "Vassoura Voadora",
    "candle-of-invocation": "Vela de Invocação",
    "cape-of-the-mountebank": "Capa do Charlatão",
    "carpet-of-flying": "Tapete Voador",
    "censer-of-controlling-air-elementals": "Incensário de Controle de Elementais do Ar",
    "chime-of-opening": "Sino da Abertura",
    "circlet-of-blasting": "Diadema da Explosão",
    "cloak-of-displacement": "Manto do Deslocamento",
    "cloak-of-elvenkind": "Manto Élfico",
    "cloak-of-protection": "Manto de Proteção",
    "cloak-of-the-bat": "Manto do Morcego",
    "cloak-of-the-manta-ray": "Manto da Arraia",
    "crystal-ball": "Bola de Cristal",
    "cube-of-force": "Cubo da Força",
    "cubic-gate": "Portão Cúbico",
    "dagger-of-venom": "Adaga do Veneno",
    "dancing-sword": "Espada Dançarina",
    "decanter-of-endless-water": "Garrafa de Água Infinita",
    "deck-of-illusions": "Baralho das Ilusões",
    "deck-of-many-things": "Baralho das Muitas Coisas",
    "defender": "Defensora",
    "demon-armor": "Armadura Demoníaca",
    "dimensional-shackles": "Grilhões Dimensionais",
    "dragon-scale-mail": "Cota de Escamas de Dragão",
    "dragon-slayer": "Mata-Dragões",
    "dust-of-disappearance": "Pó do Desaparecimento",
    "dust-of-dryness": "Pó da Secura",
    "dust-of-sneezing-and-choking": "Pó do Espirro e Sufoco",
    "dwarven-plate": "Placas Anãs",
    "dwarven-thrower": "Arremessadora Anã",
    "efficient-quiver": "Aljava Eficiente",
    "efreeti-bottle": "Garrafa do Efreeti",
    "elemental-gem": "Gema Elemental",
    "elixir-of-health": "Elixir da Saúde",
    "elven-chain": "Malha Élfica",
    "eversmoking-bottle": "Garrafa Sempre Fumegante",
    "eyes-of-charming": "Olhos do Fascínio",
    "eyes-of-minute-seeing": "Olhos da Visão Minuciosa",
    "eyes-of-the-eagle": "Olhos da Águia",
    "feather-token": "Token de Pena",
    "figurine-of-wondrous-power": "Estatueta do Poder Maravilhoso",
    "flame-tongue": "Língua de Chamas",
    "folding-boat": "Barco Dobrável",
    "frost-brand": "Marca Gélida",
    "gauntlets-of-ogre-power": "Manoplas do Poder do Ogro",
    "gem-of-brightness": "Gema do Brilho",
    "gem-of-seeing": "Gema da Visão",
    "giant-slayer": "Mata-Gigantes",
    "glamoured-studded-leather": "Couro Batido Encantado",
    "gloves-of-missile-snaring": "Luvas Apanha-Projéteis",
    "gloves-of-swimming-and-climbing": "Luvas de Natação e Escalada",
    "goggles-of-night": "Óculos da Noite",
    "hammer-of-thunderbolts": "Martelo dos Raios",
    "handy-haversack": "Mochila Prática",
    "hat-of-disguise": "Chapéu do Disfarce",
    "headband-of-intellect": "Tiara do Intelecto",
    "helm-of-comprehending-languages": "Elmo de Compreender Idiomas",
    "helm-of-telepathy": "Elmo de Telepatia",
    "helm-of-teleportation": "Elmo de Teletransporte",
    "holy-avenger": "Vingadora Sagrada",
    "horn-of-blasting": "Trompa da Explosão",
    "horn-of-valhalla": "Trompa de Valhala",
    "horseshoes-of-a-zephyr": "Ferraduras do Zéfiro",
    "horseshoes-of-speed": "Ferraduras da Velocidade",
    "immovable-rod": "Bastão Imóvel",
    "instant-fortress": "Fortaleza Instantânea",
    "ioun-stone": "Pedra Ioun",
    "iron-bands-of-bilarro": "Faixas de Ferro de Bilarro",
    "iron-flask": "Frasco de Ferro",
    "javelin-of-lightning": "Azagaia do Relâmpago",
    "lantern-of-revealing": "Lanterna da Revelação",
    "luck-blade": "Lâmina da Sorte",
    "mace-of-disruption": "Maça da Dissipação",
    "mace-of-smiting": "Maça do Golpe",
    "mace-of-terror": "Maça do Terror",
    "mantle-of-spell-resistance": "Manto de Resistência a Magia",
    "manual-of-bodily-health": "Manual da Saúde Corporal",
    "manual-of-gainful-exercise": "Manual do Exercício Proveitoso",
    "manual-of-golems": "Manual de Golens",
    "manual-of-quickness-of-action": "Manual da Rapidez de Ação",
    "mariner-s-armor": "Armadura do Marinheiro",
    "medallion-of-thoughts": "Medalhão dos Pensamentos",
    "mirror-of-life-trapping": "Espelho do Aprisionamento de Vida",
    "mithral-armor": "Armadura de Mithral",
    "necklace-of-adaptation": "Colar da Adaptação",
    "necklace-of-fireballs": "Colar de Bolas de Fogo",
    "necklace-of-prayer-beads": "Colar de Contas de Prece",
    "nine-lives-stealer": "Rouba-Nove-Vidas",
    "oathbow": "Arco do Juramento",
    "oil-of-etherealness": "Óleo da Eterealidade",
    "oil-of-sharpness": "Óleo da Afiação",
    "oil-of-slipperiness": "Óleo da Escorregadia",
    "pearl-of-power": "Pérola do Poder",
    "periapt-of-health": "Periapto da Saúde",
    "periapt-of-proof-against-poison": "Periapto de Prova contra Veneno",
    "periapt-of-wound-closure": "Periapto do Fechamento de Feridas",
    "philter-of-love": "Filtro do Amor",
    "pipes-of-haunting": "Flautas da Assombração",
    "pipes-of-the-sewers": "Flautas dos Esgotos",
    "plate-armor-of-etherealness": "Armadura de Placas da Eterealidade",
    "portable-hole": "Buraco Portátil",
    "potion-of-animal-friendship": "Poção da Amizade Animal",
    "potion-of-clairvoyance": "Poção da Clarividência",
    "potion-of-climbing": "Poção da Escalada",
    "potion-of-diminution": "Poção da Diminuição",
    "potion-of-flying": "Poção do Voo",
    "potion-of-gaseous-form": "Poção da Forma Gasosa",
    "potion-of-giant-strength": "Poção da Força de Gigante",
    "potion-of-growth": "Poção do Crescimento",
    "potion-of-healing": "Poção de Cura",
    "potion-of-heroism": "Poção do Heroísmo",
    "potion-of-invisibility": "Poção da Invisibilidade",
    "potion-of-invulnerability": "Poção da Invulnerabilidade",
    "potion-of-longevity": "Poção da Longevidade",
    "potion-of-mind-reading": "Poção da Leitura Mental",
    "potion-of-poison": "Poção de Veneno",
    "potion-of-resistance": "Poção da Resistência",
    "potion-of-speed": "Poção da Velocidade",
    "potion-of-vitality": "Poção da Vitalidade",
    "potion-of-water-breathing": "Poção de Respirar na Água",
    "restorative-ointment": "Unguento Restaurador",
    "ring-of-animal-influence": "Anel da Influência Animal",
    "ring-of-djinni-summoning": "Anel de Conjuração de Djinn",
    "ring-of-elemental-command": "Anel de Comando Elemental",
    "ring-of-evasion": "Anel da Evasão",
    "ring-of-feather-falling": "Anel da Queda Suave",
    "ring-of-free-action": "Anel da Ação Livre",
    "ring-of-invisibility": "Anel da Invisibilidade",
    "ring-of-jumping": "Anel do Salto",
    "ring-of-mind-shielding": "Anel da Proteção Mental",
    "ring-of-protection": "Anel de Proteção",
    "ring-of-regeneration": "Anel da Regeneração",
    "ring-of-resistance": "Anel da Resistência",
    "ring-of-shooting-stars": "Anel das Estrelas Cadentes",
    "ring-of-spell-storing": "Anel de Armazenar Magia",
    "ring-of-spell-turning": "Anel de Rebater Magia",
    "ring-of-swimming": "Anel da Natação",
    "ring-of-telekinesis": "Anel da Telecinese",
    "ring-of-the-ram": "Anel do Carneiro",
    "ring-of-three-wishes": "Anel dos Três Desejos",
    "ring-of-warmth": "Anel do Calor",
    "ring-of-water-walking": "Anel de Caminhar sobre a Água",
    "ring-of-x-ray-vision": "Anel da Visão de Raios X",
    "robe-of-eyes": "Manto dos Olhos",
    "robe-of-scintillating-colors": "Manto das Cores Cintilantes",
    "robe-of-stars": "Manto das Estrelas",
    "robe-of-the-archmagi": "Manto do Arquimago",
    "robe-of-useful-items": "Manto dos Itens Úteis",
    "rod-of-absorption": "Bastão da Absorção",
    "rod-of-alertness": "Bastão da Alerta",
    "rod-of-captivation": "Bastão do Cativeiro",
    "rod-of-lordly-might": "Bastão do Poder Senhorial",
    "rod-of-rulership": "Bastão do Domínio",
    "rod-of-security": "Bastão da Segurança",
    "rope-of-climbing": "Corda de Escalar",
    "rope-of-entanglement": "Corda do Emaranhamento",
    "scarab-of-protection": "Escaravelho de Proteção",
    "scimitar-of-speed": "Cimitarra da Velocidade",
    "shield-1-2-or-3": "Escudo +1, +2 ou +3",
    "shield-of-missile-attraction": "Escudo da Atração de Projéteis",
    "slippers-of-spider-climbing": "Sapatilhas da Escalada de Aranha",
    "sovereign-glue": "Cola Soberana",
    "spell-scroll": "Pergaminho de Magia",
    "spellguard-shield": "Escudo Guarda-Magia",
    "sphere-of-annihilation": "Esfera da Aniquilação",
    "staff-of-charming": "Cajado do Fascínio",
    "staff-of-fire": "Cajado do Fogo",
    "staff-of-frost": "Cajado do Gelo",
    "staff-of-healing": "Cajado da Cura",
    "staff-of-power": "Cajado do Poder",
    "staff-of-striking": "Cajado do Golpe",
    "staff-of-swarming-insects": "Cajado dos Insetos Enxameantes",
    "staff-of-the-magi": "Cajado do Mago",
    "staff-of-the-python": "Cajado da Píton",
    "staff-of-the-woodlands": "Cajado das Florestas",
    "staff-of-thunder-and-lightning": "Cajado do Trovão e Relâmpago",
    "staff-of-withering": "Cajado do Definhamento",
    "stone-of-controlling-earth-elementals": "Pedra de Controle de Elementais da Terra",
    "stone-of-good-luck-luckstone": "Pedra da Boa Sorte",
    "sun-blade": "Lâmina Solar",
    "sword-of-life-stealing": "Espada Rouba-Vidas",
    "sword-of-sharpness": "Espada da Afiação",
    "sword-of-wounding": "Espada do Ferimento",
    "talisman-of-pure-good": "Talismã do Puro Bem",
    "talisman-of-the-sphere": "Talismã da Esfera",
    "talisman-of-ultimate-evil": "Talismã do Mal Supremo",
    "tome-of-clear-thought": "Tomo do Pensamento Claro",
    "tome-of-leadership-and-influence": "Tomo de Liderança e Influência",
    "tome-of-understanding": "Tomo da Compreensão",
    "trident-of-fish-command": "Tridente do Comando dos Peixes",
    "universal-solvent": "Solvente Universal",
    "vicious-weapon": "Arma Cruel",
    "vorpal-sword": "Espada Vorpal",
    "wand-of-binding": "Varinha da Ligação",
    "wand-of-enemy-detection": "Varinha de Detecção de Inimigos",
    "wand-of-fear": "Varinha do Medo",
    "wand-of-fireballs": "Varinha de Bolas de Fogo",
    "wand-of-lightning-bolts": "Varinha de Relâmpagos",
    "wand-of-magic-detection": "Varinha de Detecção de Magia",
    "wand-of-magic-missiles": "Varinha de Mísseis Mágicos",
    "wand-of-paralysis": "Varinha da Paralisia",
    "wand-of-polymorph": "Varinha da Polimorfia",
    "wand-of-secrets": "Varinha dos Segredos",
    "wand-of-the-war-mage-1-2-or-3": "Varinha do Mago de Guerra +1, +2 ou +3",
    "wand-of-wonder": "Varinha das Maravilhas",
    "weapon-1-2-or-3": "Arma +1, +2 ou +3",
    "well-of-many-worlds": "Poço dos Muitos Mundos",
    "wind-fan": "Leque do Vento",
    "winged-boots": "Botas Aladas",
    "wings-of-flying": "Asas do Voo",
}

# Ordered longest-first phrase replacements for descriptions
PHRASES: list[tuple[str, str]] = [
    ("Requires Attunement by a", "Requer sintonização por um(a)"),
    ("Requires Attunement", "Requer sintonização"),
    ("requires attunement", "requer sintonização"),
    ("Bonus Action", "Ação Bônus"),
    ("bonus action", "ação bônus"),
    ("Critical Hit", "Acerto Crítico"),
    ("critical hit", "acerto crítico"),
    ("Ability Check", "Teste de Atributo"),
    ("ability check", "teste de atributo"),
    ("Saving Throw", "Teste de Resistência"),
    ("saving throw", "teste de resistência"),
    ("Attack roll", "Rolagem de ataque"),
    ("attack roll", "rolagem de ataque"),
    ("damage rolls", "rolagens de dano"),
    ("damage roll", "rolagem de dano"),
    ("Hit Points", "Pontos de Vida"),
    ("hit points", "pontos de vida"),
    ("Hit Point", "Ponto de Vida"),
    ("Armor Class", "Classe de Armadura"),
    ("armor class", "classe de armadura"),
    ("Challenge Rating", "Nível de Desafio"),
    ("Wondrous Item", "Item Maravilhoso"),
    ("Very Rare", "muito rara"),
    ("Long Rest", "Descanso Longo"),
    ("long rest", "descanso longo"),
    ("Short Rest", "Descanso Curto"),
    ("short rest", "descanso curto"),
    ("Spell Attack", "Ataque Mágico"),
    ("spell attack", "ataque mágico"),
    ("spell save DC", "CD de resistência da magia"),
    ("Spellcasting Ability", "Atributo de Conjuração"),
    ("while wearing", "enquanto vestir"),
    ("While wearing", "Enquanto vestir"),
    ("while you wear", "enquanto você vestir"),
    ("While you wear", "Enquanto você vestir"),
    ("while holding", "enquanto segurar"),
    ("While holding", "Enquanto segurar"),
    ("you can use an action", "você pode usar uma ação"),
    ("You can use an action", "Você pode usar uma ação"),
    ("you can use a bonus action", "você pode usar uma ação bônus"),
    ("as an action", "como uma ação"),
    ("as a bonus action", "como uma ação bônus"),
    ("this magic item", "este item mágico"),
    ("This magic item", "Este item mágico"),
    ("magical weapon", "arma mágica"),
    ("magic weapon", "arma mágica"),
    ("nonmagical", "não mágico"),
    ("Attunement", "Sintonização"),
    ("attunement", "sintonização"),
    ("charges", "cargas"),
    ("charge", "carga"),
    ("rarity", "raridade"),
    ("Uncommon", "incomum"),
    ("uncommon", "incomum"),
    ("Legendary", "lendária"),
    ("legendary", "lendária"),
    ("Artifact", "artefato"),
    ("Common", "comum"),
    ("Rare", "rara"),
    (" Strength", " Força"),
    (" Dexterity", " Destreza"),
    (" Constitution", " Constituição"),
    (" Intelligence", " Inteligência"),
    (" Wisdom", " Sabedoria"),
    (" Charisma", " Carisma"),
    ("feet", "metros*"),  # mark for later conversion note — keep approx
]


def fallback_name(name_en: str) -> str:
    # Light heuristic: keep proper nouns, translate of/the
    s = name_en
    s = s.replace(" of the ", " d")
    s = re.sub(r"\bof\b", "de", s)
    s = s.replace(" the ", " ")
    return s


def translate_type_line(line: str) -> str:
    s = line
    reps = [
        ("Wondrous Item", "Item Maravilhoso"),
        ("Requires Attunement", "Requer sintonização"),
        ("Any Medium or Heavy, Except Hide Armor", "qualquer média ou pesada, exceto armadura de pele"),
        ("Any Light, Medium, or Heavy", "qualquer leve, média ou pesada"),
        ("Any Ammunition", "qualquer munição"),
        ("Shield", "Escudo"),
        ("Armor", "Armadura"),
        ("Weapon", "Arma"),
        ("Potion", "Poção"),
        ("Ring", "Anel"),
        ("Rod", "Bastão"),
        ("Staff", "Cajado"),
        ("Wand", "Varinha"),
        ("Scroll", "Pergaminho"),
        ("Very Rare", "Muito Rara"),
        ("Uncommon", "Incomum"),
        ("Legendary", "Lendária"),
        ("Artifact", "Artefato"),
        ("Common", "Comum"),
        ("Rare", "Rara"),
    ]
    for a, b in reps:
        s = s.replace(a, b)
    return s


def translate_desc(text: str) -> str:
    s = text
    # Sort phrases by length desc
    for en, pt in sorted(PHRASES, key=lambda x: len(x[0]), reverse=True):
        s = s.replace(en, pt)
    # Convert feet roughly noted — replace N feet with meters (N*0.3 rounded)
    def feet_to_m(m: re.Match[str]) -> str:
        n = int(m.group(1))
        meters = round(n * 0.3, 1)
        if meters == int(meters):
            meters = int(meters)
        return f"{meters} metros"

    s = re.sub(r"(\d+)\s*feet", feet_to_m, s, flags=re.I)
    s = s.replace("metros*", "metros")
    return s


def fix_ammunition_category(item: dict) -> None:
    tl = item.get("typeLineEn", "").lower()
    if "ammunition" in tl:
        item["category"] = "ammunition"


def main() -> None:
    items = json.loads(EN.read_text(encoding="utf-8"))
    missing_names: list[str] = []
    for it in items:
        fix_ammunition_category(it)
        pid = it["id"]
        name_pt = NAME_PT.get(pid)
        if not name_pt:
            # try fuzzy id without special chars
            name_pt = NAME_PT.get(pid.replace("+", ""))
        if not name_pt:
            name_pt = fallback_name(it["nameEn"])
            missing_names.append(f"{pid} → {name_pt}")
        it["namePt"] = name_pt
        it["typeLinePt"] = translate_type_line(it.get("typeLineEn", ""))
        it["descriptionPt"] = translate_desc(it["descriptionEn"])
        it["translationMethod"] = "glossary+map" if pid in NAME_PT else "glossary+fallback-name"

    OUT.write_text(json.dumps(items, ensure_ascii=False, indent=2), encoding="utf-8")

    mapped = sum(1 for i in items if i["id"] in NAME_PT)
    STATUS.write_text(
        "\n".join(
            [
                "# Status da tradução — Magic Items Basic Rules",
                "",
                f"- Total de itens: **{len(items)}**",
                f"- Nomes com mapa oficial/convencional: **{mapped}**",
                f"- Nomes por fallback: **{len(items) - mapped}**",
                "- Descrições: glossário D&D PT-BR + conversão de pés→metros",
                "- Fonte: D&D Beyond Basic Rules Magic Items A–Z (EN)",
                "",
                "## Nomes sem entrada dedicada no mapa",
                "",
                *[f"- {m}" for m in missing_names[:80]],
                ("- …" if len(missing_names) > 80 else ""),
                "",
            ]
        ),
        encoding="utf-8",
    )
    GLOSSARY_DOC.write_text(
        "# Glossário de tradução (itens mágicos)\n\n"
        + "\n".join(f"- `{a}` → `{b}`" for a, b in PHRASES[:40]),
        encoding="utf-8",
    )
    print(f"wrote {OUT} ({len(items)} items, {mapped} named)")
    print(f"missing name map: {len(missing_names)}")


if __name__ == "__main__":
    main()
