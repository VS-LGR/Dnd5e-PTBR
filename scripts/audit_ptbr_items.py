"""Audit PT-BR coverage across items catalog."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SLIM = ROOT / "src/config/items/magicItemsData.json"
GEAR = ROOT / "src/config/items/gear.ts"
AUDIT = ROOT / "content/items/TRANSLATION_AUDIT.md"

STRONG = re.compile(
    r"\b(While you|You have|You can|You gain|Requires Attunement|Wondrous Item|"
    r"Bonus Action|Hit Points|Armor Class|Saving Throw|attack rolls?|"
    r"damage rolls?|\bfeet\b|long rest|short rest|this armor|this weapon|"
    r"Critical Hit|Ability Check)\b",
    re.I,
)

# English function words that shouldn't dominate PT text
EN_DENSE = re.compile(
    r"\b(the|and|with|from|into|against|during|before|after|must|can|cannot|"
    r"your|this|that|when|while|until|once|again|also|only|each|any|all)\b",
    re.I,
)


def main() -> None:
    items = json.loads(SLIM.read_text(encoding="utf-8"))
    name_ok = 0
    desc_issues = []
    type_issues = []
    samples = []

    for it in items:
        name = it["name"]
        desc = it["description"]
        tl = it.get("typeLine") or ""
        if not re.search(r"\b(of|the|and|with)\b", name, re.I):
            name_ok += 1
        if STRONG.search(desc):
            desc_issues.append(it["id"])
        # density: if >8 English stopwords in first 200 chars, flag
        en_hits = len(EN_DENSE.findall(desc[:400]))
        if en_hits >= 12:
            desc_issues.append(it["id"] + f"(dense:{en_hits})")
        if STRONG.search(tl):
            type_issues.append(it["id"])

    # gear: ensure descriptions don't have English sentences
    gear_text = GEAR.read_text(encoding="utf-8")
    gear_en = bool(STRONG.search(gear_text))

    samples = [
        (items[0]["name"], items[0]["description"][:220]),
        (items[3]["name"], items[3]["description"][:220]),
        (items[15]["name"], items[15]["description"][:220]),
        (items[150]["name"], items[150]["description"][:220]),
    ]

    lines = [
        "# Auditoria PT-BR — catálogo de itens",
        "",
        f"- Itens mágicos: **{len(items)}**",
        f"- Nomes sem partículas EN óbvias: **{name_ok}/{len(items)}**",
        f"- Descrições com frases EN fortes: **{len([x for x in desc_issues if not x.endswith(')')])}**",
        f"- Type lines com EN forte: **{len(type_issues)}**",
        f"- Gear mundano com EN forte: **{'SIM' if gear_en else 'NÃO'}**",
        "",
        "## Amostras",
        "",
    ]
    for n, d in samples:
        lines.append(f"### {n}")
        lines.append("")
        lines.append(d)
        lines.append("")

    if desc_issues:
        lines.append("## Flags")
        lines.extend(f"- `{x}`" for x in desc_issues[:40])

    AUDIT.write_text("\n".join(lines), encoding="utf-8")
    print("\n".join(lines[:30]))
    print("wrote", AUDIT)


if __name__ == "__main__":
    main()
