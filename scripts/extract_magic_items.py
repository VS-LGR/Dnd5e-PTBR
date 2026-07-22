"""Extract magic items from Basic Rules PDF into structured JSON (EN)."""
from __future__ import annotations

import json
import re
from collections import Counter
from pathlib import Path

from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
PDF = ROOT / "Magic Items A–Z - D&D Beyond Basic Rules - Dungeons & Dragons - Sources - D&D Beyond.pdf"
OUT_DIR = ROOT / "content" / "items"
OUT_DIR.mkdir(parents=True, exist_ok=True)

RARITY_RE = re.compile(
    r"\b(Common|Uncommon|Rare|Very Rare|Legendary|Artifact)\b",
    re.I,
)
TYPE_LINE_RE = re.compile(
    r"^(Armor|Weapon|Wondrous Item|Potion|Ring|Rod|Staff|Wand|Scroll|Ammunition)\b"
    r".{0,120}?\b(Common|Uncommon|Rare|Very Rare|Legendary|Artifact|varies)\b",
    re.I,
)
# Also accept type lines without rarity word at end (some wrap oddly)
TYPE_START_RE = re.compile(
    r"^(Armor|Weapon|Wondrous Item|Potion|Ring|Rod|Staff|Wand|Scroll|Ammunition)\b",
    re.I,
)


def slugify(name: str) -> str:
    s = name.lower().replace("'", "").replace("'", "").replace(",", "")
    s = re.sub(r"[^a-z0-9+]+", "-", s)
    return s.strip("-")


def categorize(type_line: str, name: str) -> str:
    low = type_line.lower()
    nl = name.lower()
    if (
        low.startswith("potion")
        or nl.startswith("oil of")
        or nl.startswith("elixir")
        or nl.startswith("philter")
    ):
        return "potion"
    if low.startswith("armor"):
        return "armor"
    if low.startswith("ammunition") or "ammunition" in low[:20]:
        return "ammunition"
    if low.startswith("weapon"):
        return "weapon"
    if low.startswith("ring"):
        return "ring"
    if low.startswith("rod"):
        return "rod"
    if low.startswith("staff"):
        return "staff"
    if low.startswith("wand"):
        return "wand"
    if low.startswith("scroll"):
        return "scroll"
    if low.startswith("wondrous"):
        return "wondrous"
    return "other"


def rarity_of(type_line: str) -> str:
    # Prefer explicit multi-word
    if re.search(r"very\s+rare", type_line, re.I):
        return "very-rare"
    m = re.search(r"\b(Common|Uncommon|Rare|Legendary|Artifact)\b", type_line, re.I)
    if not m:
        if "varies" in type_line.lower() or "+1" in type_line:
            return "varies"
        return "varies"
    return m.group(1).lower()


def looks_like_item_name(s: str) -> bool:
    if not s or len(s) < 3 or len(s) > 70:
        return False
    if s[0].islower():
        return False
    if s.startswith("(") or s.endswith("."):
        return False
    if re.match(r"^\d", s):
        return False
    if s.lower().startswith(("the ", "a ", "an ", "while ", "you ", "this ", "when ")):
        return False
    bad = {
        "magic items tracking sheets",
        "magic items a–z",
        "magic items a-z",
        "potion str. rarity",
        "regained rarity",
        "charges",
    }
    if s.lower() in bad:
        return False
    # Must have a capital letter word
    if not re.search(r"[A-Z]", s):
        return False
    return True


def is_type_line(s: str) -> bool:
    if not s:
        return False
    if TYPE_LINE_RE.search(s):
        return True
    if TYPE_START_RE.search(s) and (
        RARITY_RE.search(s) or "attunement" in s.lower() or "+1" in s or "varies" in s.lower()
    ):
        return True
    return False


def extract_text() -> str:
    reader = PdfReader(str(PDF))
    return "\n".join((page.extract_text() or "") for page in reader.pages)


def parse_items(text: str) -> list[dict]:
    lines = [ln.rstrip() for ln in text.splitlines()]
    items: list[dict] = []
    i = 0
    while i < len(lines):
        name = lines[i].strip()
        nxt = lines[i + 1].strip() if i + 1 < len(lines) else ""
        # Handle wrapped type lines: name, then type start, then rarity on next
        type_line = nxt
        skip = 2
        if looks_like_item_name(name) and TYPE_START_RE.search(nxt) and not RARITY_RE.search(nxt):
            nxt2 = lines[i + 2].strip() if i + 2 < len(lines) else ""
            if RARITY_RE.search(nxt2) or "attunement" in nxt2.lower():
                type_line = f"{nxt} {nxt2}"
                skip = 3

        if looks_like_item_name(name) and is_type_line(type_line):
            j = i + skip
            desc_lines: list[str] = []
            while j < len(lines):
                cur = lines[j].strip()
                nxt_c = lines[j + 1].strip() if j + 1 < len(lines) else ""
                # lookahead type wrap
                tl = nxt_c
                if (
                    looks_like_item_name(cur)
                    and TYPE_START_RE.search(nxt_c)
                    and not RARITY_RE.search(nxt_c)
                ):
                    nxt2 = lines[j + 2].strip() if j + 2 < len(lines) else ""
                    tl = f"{nxt_c} {nxt2}"
                if cur and looks_like_item_name(cur) and is_type_line(tl):
                    break
                if cur:
                    desc_lines.append(cur)
                j += 1

            description = re.sub(r"\s+", " ", " ".join(desc_lines)).strip()
            # Drop empty/tiny descriptions (likely false)
            if len(description) < 20:
                i = j
                continue

            attune = "attunement" in (type_line + " " + description).lower()
            cat = categorize(type_line, name)
            item = {
                "id": slugify(name),
                "nameEn": name,
                "namePt": "",
                "category": cat,
                "typeLineEn": type_line,
                "rarity": rarity_of(type_line),
                "requiresAttunement": attune,
                "descriptionEn": description,
                "descriptionPt": "",
                "source": "basic-rules",
                "magicBonus": None,
                "variants": [],
            }
            if re.search(r"\+1,\s*\+2,\s*or\s*\+3", name, re.I) or (
                "+1" in type_line and "+2" in type_line and "+3" in type_line
            ):
                item["variants"] = [
                    {"idSuffix": "1", "magicBonus": 1, "rarity": "uncommon"},
                    {"idSuffix": "2", "magicBonus": 2, "rarity": "rare"},
                    {"idSuffix": "3", "magicBonus": 3, "rarity": "very-rare"},
                ]
                # Armor +1 is Rare baseline in DMG; keep varies for display
                item["rarity"] = "varies"
            items.append(item)
            i = j
            continue
        i += 1

    by_id: dict[str, dict] = {}
    for it in items:
        prev = by_id.get(it["id"])
        if not prev or len(it["descriptionEn"]) > len(prev["descriptionEn"]):
            by_id[it["id"]] = it
    # drop pure garbage categories with bad names
    cleaned = []
    for it in by_id.values():
        if it["category"] == "other":
            continue
        cleaned.append(it)
    return cleaned


def main() -> None:
    text = extract_text()
    (OUT_DIR / "magic-items-raw-en.txt").write_text(text, encoding="utf-8")
    items = parse_items(text)
    items.sort(key=lambda x: x["nameEn"].lower())
    out = OUT_DIR / "magic-items-basic-rules.en.json"
    out.write_text(json.dumps(items, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"items={len(items)}")
    print("by category:", dict(Counter(i["category"] for i in items)))
    for i in items[:8]:
        print("-", i["nameEn"], "|", i["category"], "|", i["rarity"])


if __name__ == "__main__":
    main()
