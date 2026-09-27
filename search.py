#!/usr/bin/env python3
"""
Fast 0-token design system search CLI for Design Library.
Usage:
  python3 search.py "editorial paper"
  python3 search.py --theme dark "fintech"
  python3 search.py --brand linear
"""

import sys
import json
import argparse
from pathlib import Path

BASE_DIR = Path(__file__).parent
MANIFEST_PATH = BASE_DIR / "manifest.json"

def search_library(query=None, theme=None, brand=None, limit=10):
    if not MANIFEST_PATH.exists():
        print("manifest.json not found.")
        return

    with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    styles = data.get("styles", [])
    matches = []

    q = query.lower() if query else ""
    b = brand.lower() if brand else ""
    t = theme.lower() if theme else ""

    for s in styles:
        s_brand = s.get("brand", "").lower()
        s_desc = s.get("description", "").lower()
        s_theme = s.get("theme", "").lower()

        if t and s_theme != t:
            continue
        if b and b not in s_brand:
            continue
        if q and (q not in s_brand and q not in s_desc):
            continue

        matches.append(s)

    print(f"\n🔍 Found {len(matches)} matching design systems (showing top {min(len(matches), limit)}):\n")
    print(f"{'Brand':<25} | {'Theme':<6} | {'File Path':<35} | Description")
    print("-" * 110)

    for m in matches[:limit]:
        brand_name = m["brand"][:24]
        theme_name = m["theme"][:6]
        file_path = m["rel_path"][:34]
        desc = m["description"][:45] + ("..." if len(m["description"]) > 45 else "")
        print(f"{brand_name:<25} | {theme_name:<6} | {file_path:<35} | {desc}")
    print()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Search local Design Library")
    parser.add_argument("query", nargs="?", default="", help="Search keywords (e.g. editorial, precision, fintech)")
    parser.add_argument("--theme", choices=["light", "dark", "mixed"], help="Filter by theme")
    parser.add_argument("--brand", help="Filter by brand name")
    parser.add_argument("--limit", type=int, default=10, help="Max results to display")

    args = parser.parse_args()
    search_library(query=args.query, theme=args.theme, brand=args.brand, limit=args.limit)
