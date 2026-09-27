#!/usr/bin/env python3
"""
Scrape all DESIGN.md files from styles.refero.design and save them locally.
Includes resumability, concurrency, metadata extraction, index generation, and manifest.json.
"""

import os
import re
import html
import json
import time
import urllib.request
import urllib.error
import xml.etree.ElementTree as ET
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

BASE_DIR = Path("/Users/nunn/Vibe Coding/Design Library")
STYLES_DIR = BASE_DIR / "styles"
SITEMAP_URL = "https://styles.refero.design/sitemaps/styles.xml"
MANIFEST_PATH = BASE_DIR / "manifest.json"
INDEX_PATH = BASE_DIR / "INDEX.md"
README_PATH = BASE_DIR / "README.md"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
}

def sanitize_filename(name: str) -> str:
    """Sanitize name to safe filename."""
    # Replace non-alphanumeric with hyphen
    s = re.sub(r"[^\w\s\.-]", "", name).strip()
    s = re.sub(r"[\s_]+", "-", s)
    return s.lower() if s else "untitled"

def fetch_sitemap_urls():
    print(f"Fetching sitemap from {SITEMAP_URL}...")
    req = urllib.request.Request(SITEMAP_URL, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=30) as resp:
        xml_data = resp.read()
    root = ET.fromstring(xml_data)
    urls = []
    for elem in root.findall(".//{http://www.sitemaps.org/schemas/sitemap/0.9}loc"):
        if elem.text:
            urls.append(elem.text.strip())
    print(f"Discovered {len(urls)} style URLs in sitemap.")
    return urls

def fetch_style_page(url: str, max_retries: int = 3):
    style_id = url.rstrip("/").split("/")[-1]
    
    for attempt in range(max_retries):
        try:
            req = urllib.request.Request(url, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=20) as resp:
                content = resp.read().decode("utf-8", errors="replace")
                
            # Extract markdown from <pre><code>
            code_match = re.search(r"<pre[^>]*><code[^>]*>(.*?)</code></pre>", content, re.DOTALL)
            if not code_match:
                return {
                    "id": style_id,
                    "url": url,
                    "success": False,
                    "error": "No <pre><code> markdown block found"
                }
            
            raw_md = html.unescape(code_match.group(1)).strip()
            
            # Extract brand name from title or markdown header
            # Pattern in markdown: # BrandName — Style Reference
            brand_name = None
            md_header_m = re.match(r"^#\s*(.*?)\s*—\s*Style Reference", raw_md)
            if md_header_m:
                brand_name = md_header_m.group(1).strip()
                
            if not brand_name:
                title_m = re.search(r"<title>(.*?)</title>", content)
                if title_m:
                    title_raw = title_m.group(1)
                    brand_name = title_raw.replace(" design system | Refero Styles", "").replace(" | Refero Styles", "").strip()
            
            if not brand_name:
                brand_name = f"Style-{style_id[:8]}"

            # Extract theme
            theme = "unknown"
            theme_m = re.search(r"\*\*Theme:\*\*\s*(\w+)", raw_md, re.IGNORECASE)
            if theme_m:
                theme = theme_m.group(1).lower()

            # Extract description
            desc = ""
            desc_m = re.search(r"^>\s*(.*?)$", raw_md, re.MULTILINE)
            if desc_m:
                desc = desc_m.group(1).strip()
            else:
                meta_desc_m = re.search(r"<meta\s+name=[\"']description[\"']\s+content=[\"'](.*?)[\"']", content)
                if meta_desc_m:
                    desc = html.unescape(meta_desc_m.group(1))

            return {
                "id": style_id,
                "brand": brand_name,
                "url": url,
                "theme": theme,
                "description": desc,
                "markdown": raw_md,
                "success": True,
                "error": None
            }
        except urllib.error.HTTPError as e:
            if attempt == max_retries - 1:
                return {"id": style_id, "url": url, "success": False, "error": f"HTTP {e.code}"}
            time.sleep(1.0 * (attempt + 1))
        except Exception as e:
            if attempt == max_retries - 1:
                return {"id": style_id, "url": url, "success": False, "error": str(e)}
            time.sleep(1.0 * (attempt + 1))
            
    return {"id": style_id, "url": url, "success": False, "error": "Max retries exceeded"}

def main():
    STYLES_DIR.mkdir(parents=True, exist_ok=True)
    
    urls = fetch_sitemap_urls()
    total = len(urls)
    
    # Check existing manifest if any to support resume
    existing_manifest = {}
    if MANIFEST_PATH.exists():
        try:
            with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
                data = json.load(f)
                for item in data.get("styles", []):
                    if item.get("id") and item.get("filename"):
                        filepath = STYLES_DIR / item["filename"]
                        if filepath.exists() and filepath.stat().st_size > 0:
                            existing_manifest[item["id"]] = item
        except Exception:
            pass

    print(f"Found {len(existing_manifest)} already downloaded styles.")
    urls_to_fetch = [u for u in urls if u.rstrip("/").split("/")[-1] not in existing_manifest]
    print(f"Need to fetch {len(urls_to_fetch)} new/pending styles.")

    results = list(existing_manifest.values())
    failed = []
    
    completed_count = len(existing_manifest)
    
    # Used filenames tracking for uniqueness
    used_filenames = {item["filename"]: item["id"] for item in existing_manifest.values()}
    
    if urls_to_fetch:
        print("Starting concurrent download with 25 worker threads...")
        start_time = time.time()
        
        with ThreadPoolExecutor(max_workers=25) as executor:
            future_to_url = {executor.submit(fetch_style_page, url): url for url in urls_to_fetch}
            
            for future in as_completed(future_to_url):
                res = future.result()
                completed_count += 1
                
                if res["success"]:
                    brand = res["brand"]
                    base_slug = sanitize_filename(brand)
                    
                    # Ensure filename is unique
                    filename = f"{base_slug}.md"
                    if filename in used_filenames and used_filenames[filename] != res["id"]:
                        filename = f"{base_slug}-{res['id'][:8]}.md"
                    
                    used_filenames[filename] = res["id"]
                    
                    # Save markdown file
                    out_path = STYLES_DIR / filename
                    with open(out_path, "w", encoding="utf-8") as f:
                        f.write(res["markdown"])
                    
                    style_meta = {
                        "id": res["id"],
                        "brand": brand,
                        "filename": filename,
                        "rel_path": f"styles/{filename}",
                        "theme": res["theme"],
                        "description": res["description"],
                        "source_url": res["url"],
                        "size_bytes": len(res["markdown"].encode("utf-8"))
                    }
                    results.append(style_meta)
                    
                    if completed_count % 50 == 0 or completed_count == total:
                        elapsed = time.time() - start_time
                        print(f"[{completed_count}/{total}] Saved {brand} -> {filename} ({elapsed:.1f}s)")
                else:
                    print(f"[{completed_count}/{total}] FAILED: {res['url']} - {res['error']}")
                    failed.append(res)
    
    # Sort results alphabetically by brand
    results.sort(key=lambda x: x["brand"].lower())
    
    # Write manifest.json
    manifest = {
        "source": "https://styles.refero.design",
        "scraped_at": time.strftime("%Y-%m-%d %H:%M:%SZ", time.gmtime()),
        "total_count": len(results),
        "failed_count": len(failed),
        "styles": results
    }
    with open(MANIFEST_PATH, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)
    print(f"Updated {MANIFEST_PATH}")
    
    # Generate INDEX.md
    print("Generating INDEX.md...")
    with open(INDEX_PATH, "w", encoding="utf-8") as f:
        f.write("# Refero Styles — DESIGN.md Catalog\n\n")
        f.write(f"A comprehensive local library of **{len(results)}** production design systems and `DESIGN.md` files scraped from [styles.refero.design](https://styles.refero.design/).\n\n")
        f.write("Each file contains design tokens (colors, typography, spacing, radius, shadows), component rules, and implementation guidance ready for use with AI coding assistants (Claude Code, Cursor, Codex, Gemini, v0, Lovable).\n\n")
        f.write("## Quick Stats\n\n")
        f.write(f"- **Total Styles:** {len(results)}\n")
        
        themes = {}
        for r in results:
            t = r.get("theme", "unknown").capitalize()
            themes[t] = themes.get(t, 0) + 1
        theme_summary = ", ".join([f"{k}: {v}" for k, v in sorted(themes.items())])
        f.write(f"- **Themes:** {theme_summary}\n\n")
        f.write("## Styles Index\n\n")
        f.write("| Brand / System | Theme | Description | File |\n")
        f.write("| :--- | :--- | :--- | :--- |\n")
        for r in results:
            brand_escaped = r["brand"].replace("|", "\\|")
            desc_escaped = (r["description"][:90] + "...") if len(r["description"]) > 90 else r["description"]
            desc_escaped = desc_escaped.replace("|", "\\|").replace("\n", " ")
            f.write(f"| **[{brand_escaped}]({r['source_url']})** | `{r['theme']}` | {desc_escaped} | [`{r['filename']}`](./styles/{r['filename']}) |\n")
            
    print(f"Updated {INDEX_PATH}")
    
    # Generate README.md
    with open(README_PATH, "w", encoding="utf-8") as f:
        f.write("# Refero Design System Library (DESIGN.md)\n\n")
        f.write("Local repository of all DESIGN.md files from [styles.refero.design](https://styles.refero.design/).\n\n")
        f.write("## Structure\n\n")
        f.write("- `styles/`: Directory containing all individual `.md` design system files.\n")
        f.write("- `INDEX.md`: Full searchable catalog table of all design systems.\n")
        f.write("- `manifest.json`: Machine-readable metadata index with all tokens, themes, and sources.\n\n")
        f.write("## Usage with AI Assistants\n\n")
        f.write("Copy any design system file to `DESIGN.md` in your project root, or include it in prompts:\n")
        f.write("```bash\n# Example: Apply Apple or Linear design system to a project\ncp styles/linear.md ./DESIGN.md\n```\n")
        
    print(f"Updated {README_PATH}")
    print(f"\nCompleted successfully! {len(results)} styles saved to {STYLES_DIR}")
    if failed:
        print(f"Failed count: {len(failed)}")

if __name__ == "__main__":
    main()
