#!/usr/bin/env python3
"""check-revisions.py — Machine Design Guides revision check (see structure-and-conventions.md,
"Revision control").

For every page listed in data/manifest.js, extracts the footer marker
"Last updated: YYYY-MM-DD &middot; Rev N" and compares N against the entry's "rev" field.
Also flags calculator pages on disk that have no manifest entry.

Usage:  python scripts/check-revisions.py [APP_ROOT]
        APP_ROOT defaults to the folder above this script (the mdg app root).
Exit:   0 = all match, 1 = one or more problems (each printed), 2 = manifest unreadable.
"""
import json
import re
import sys
from pathlib import Path

REV_RE = re.compile(
    r"Last updated:\s*(\d{4}-\d{2}-\d{2})\s*(?:&middot;|&#183;|·)\s*Rev\s+(\d+)", re.I
)


def load_manifest(root: Path) -> dict:
    src = (root / "data" / "manifest.js").read_text(encoding="utf-8")
    m = re.search(r"window\.MDG_MANIFEST\s*=\s*", src)
    if not m:
        raise ValueError("window.MDG_MANIFEST assignment not found")
    body = src[m.end():].strip()
    body = re.sub(r";\s*$", "", body)
    body = re.sub(r",(\s*[}\]])", r"\1", body)  # tolerate trailing commas
    return json.loads(body)


def main() -> int:
    root = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).resolve().parent.parent
    try:
        manifest = load_manifest(root)
    except Exception as e:  # noqa: BLE001
        print(f"ERROR  data/manifest.js: cannot parse ({e})")
        return 2

    problems, ok = [], 0
    listed = set()
    for entry in manifest.get("pages", []):
        pid, path, rev = entry.get("id", "?"), entry.get("path"), entry.get("rev")
        if not path:
            problems.append(f"{pid}: manifest entry has no path")
            continue
        listed.add(Path(path).as_posix())
        page = root / path
        if not isinstance(rev, int):
            problems.append(f"{path}: manifest entry has no integer \"rev\" (got {rev!r})")
            continue
        if not page.is_file():
            problems.append(f"{path}: listed in manifest (rev {rev}) but file is missing")
            continue
        found = REV_RE.findall(page.read_text(encoding="utf-8", errors="replace"))
        if not found:
            problems.append(f"{path}: no 'Last updated: … · Rev N' footer marker (manifest rev {rev})")
        elif len({r for _, r in found}) > 1:
            problems.append(f"{path}: conflicting Rev markers {sorted({int(r) for _, r in found})}")
        elif int(found[-1][1]) != rev:
            problems.append(f"{path}: page Rev {found[-1][1]} != manifest rev {rev}")
        else:
            ok += 1

    calc_dir = root / "calculators"
    if calc_dir.is_dir():
        for page in sorted(calc_dir.rglob("*.html")):
            rel = page.relative_to(root).as_posix()
            if rel not in listed:
                problems.append(f"{rel}: page on disk has no manifest entry")

    for p in problems:
        print(f"FAIL  {p}")
    print(f"{ok} page(s) OK, {len(problems)} problem(s)")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
