"""Translate all magic item descriptions EN → PT-BR via Google Translate + D&D glossary polish."""
from __future__ import annotations

import json
import re
import time
from pathlib import Path

from deep_translator import GoogleTranslator

ROOT = Path(__file__).resolve().parents[1]
EN_PATH = ROOT / "content/items/magic-items-basic-rules.en.json"
PT_PATH = ROOT / "content/items/magic-items-basic-rules.pt.json"
SLIM = ROOT / "src/config/items/magicItemsData.json"
AUDIT = ROOT / "content/items/TRANSLATION_AUDIT.md"

CLEAN_NOISE = [
    "Claim the Dungeon Masters: Living Spells Play-Along Pack",
    *[f"Magic Items ({c})" for c in "ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
]

POLISH = [
    ("feitiços", "magias"),
    ("feitiço", "magia"),
    ("Feitiços", "Magias"),
    ("Feitiço", "Magia"),
    ("pontos de vida", "pontos de vida"),
    ("classe de armadura", "classe de armadura"),
    ("ação bônus", "ação bônus"),
    ("teste de resistência", "teste de resistência"),
    ("sintonia", "sintonização"),
    ("Sintonia", "Sintonização"),
    ("requer sintonia", "requer sintonização"),
    ("Requer sintonia", "Requer sintonização"),
    ("Descanso longo", "Descanso Longo"),
    ("Descanso curto", "Descanso Curto"),
    ("mestre da masmorra", "Mestre"),
    ("Mestre da Masmorra", "Mestre"),
    ("DM ", "Mestre "),
    (" o DM", " o Mestre"),
]


def clean_en(text: str) -> str:
    s = text
    for n in CLEAN_NOISE:
        s = s.replace(n, " ")
    s = s.replace("ﬁ", "fi").replace("ﬂ", "fl").replace("ﬀ", "ff")
    s = re.sub(r"\s+", " ", s).strip()
    return s


def chunk(text: str, size: int = 4000) -> list[str]:
    if len(text) <= size:
        return [text]
    parts: list[str] = []
    remaining = text
    while remaining:
        if len(remaining) <= size:
            parts.append(remaining)
            break
        cut = remaining.rfind(". ", 0, size)
        if cut < size // 2:
            cut = size
        else:
            cut = cut + 1
        parts.append(remaining[:cut].strip())
        remaining = remaining[cut:].strip()
    return [p for p in parts if p]


def translate_text(translator: GoogleTranslator, text: str) -> str:
    cleaned = clean_en(text)
    if not cleaned:
        return ""
    out: list[str] = []
    for part in chunk(cleaned):
        for attempt in range(4):
            try:
                out.append(translator.translate(part))
                break
            except Exception:
                time.sleep(1.5 * (attempt + 1))
        else:
            out.append(part)
        time.sleep(0.15)
    s = " ".join(out)
    for a, b in POLISH:
        s = s.replace(a, b)
    return s


def translate_type(translator: GoogleTranslator, line: str) -> str:
    if not line.strip():
        return ""
    try:
        s = translator.translate(clean_en(line))
    except Exception:
        s = line
    for a, b in POLISH:
        s = s.replace(a, b)
    return s


EN_FLAG = re.compile(
    r"\b(While you|You have|You can|Requires Attunement|Wondrous Item|"
    r"Bonus Action|Hit Points|Armor Class|attack rolls?|damage rolls?|"
    r"\bfeet\b|long rest|short rest)\b",
    re.I,
)


def main() -> None:
    en_by_id = {i["id"]: i for i in json.loads(EN_PATH.read_text(encoding="utf-8"))}
    pt_items = json.loads(PT_PATH.read_text(encoding="utf-8"))
    translator = GoogleTranslator(source="en", target="pt")

    leftover: list[str] = []
    for idx, it in enumerate(pt_items):
        src = en_by_id.get(it["id"], it)
        desc_en = src.get("descriptionEn") or ""
        type_en = src.get("typeLineEn") or ""
        print(f"[{idx+1}/{len(pt_items)}] {it['id']}", flush=True)
        it["descriptionPt"] = translate_text(translator, desc_en)
        it["typeLinePt"] = translate_type(translator, type_en)
        it["translationMethod"] = "google-translate+polish"
        if EN_FLAG.search(it["descriptionPt"]):
            leftover.append(it["id"])

        # checkpoint every 25
        if (idx + 1) % 25 == 0:
            PT_PATH.write_text(json.dumps(pt_items, ensure_ascii=False, indent=2), encoding="utf-8")

    PT_PATH.write_text(json.dumps(pt_items, ensure_ascii=False, indent=2), encoding="utf-8")

    slim = [
        {
            "id": i["id"],
            "name": i["namePt"] or i["nameEn"],
            "nameEn": i["nameEn"],
            "category": i["category"],
            "typeLine": i.get("typeLinePt") or "",
            "rarity": i["rarity"],
            "requiresAttunement": i["requiresAttunement"],
            "description": i["descriptionPt"],
            "source": "basic-rules",
            "variants": i.get("variants") or [],
        }
        for i in pt_items
    ]
    SLIM.write_text(json.dumps(slim, ensure_ascii=False, indent=2), encoding="utf-8")

    AUDIT.write_text(
        "\n".join(
            [
                "# Auditoria PT-BR (pós Google Translate)",
                "",
                f"- Itens: {len(pt_items)}",
                f"- Possíveis resíduos EN nas descrições: {len(leftover)}",
                "",
                *[f"- `{x}`" for x in leftover],
            ]
        ),
        encoding="utf-8",
    )
    print(f"done leftover={len(leftover)}")


if __name__ == "__main__":
    main()
