"""Builds the two self-hosted variable fonts in src/fonts/ (fix Q2 of the 2026-11-11 performance audit).

Why: next/font/google shipped Mona Sans as two files (latin 96 KB with every weight 200-900 and width 75-125 %,
plus a 32 KB latin-ext file just for the rupee sign) and DM Sans as two files (37 + 18 KB), five of them preloaded on
every page (214 KB of fonts in total). The site only uses Mona Sans at 600-800 weight and 100-125 % width, so this script:
  1. downloads each family from the Google Fonts CSS2 API with `text=` set to the characters below (ASCII, Latin-1,
     typographic punctuation, arrows, the rupee and euro signs), which returns one woff2 holding exactly those glyphs;
  2. narrows Mona Sans' variation axes to wght 600-800 / wdth 100-125 with fontTools' instancer;
  3. keeps DM Sans' full optical-size axis (the browser sets it from the font size) and narrows weight to 400-600.
Characters outside the set fall back to the next font in the stack; extend CHARS and rerun if a new one is needed.

Run (Python 3 with fontTools and brotli):  py -3 scripts/fonts/build_fonts.py
Both fonts are SIL Open Font License 1.1; subsetting and self-hosting are permitted.
"""
import io
import os
import re
import urllib.parse
import urllib.request

from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

OUT = os.path.join(os.path.dirname(__file__), "..", "..", "src", "fonts")
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36"

CHARS = "".join(chr(c) for c in range(0x20, 0x7F)) + "".join(chr(c) for c in range(0xA0, 0x100)) + "".join(
    chr(c)
    for c in (
        0x2010, 0x2011, 0x2012, 0x2013, 0x2014, 0x2018, 0x2019, 0x201A, 0x201C, 0x201D, 0x201E, 0x2022, 0x2026,
        0x2030, 0x2039, 0x203A, 0x20B9, 0x20AC, 0x2122, 0x2190, 0x2191, 0x2192, 0x2193, 0x2197, 0x2212, 0x00D7,
    )
)

FONTS = [
    # (output file, CSS2 family spec, axis limits for the instancer)
    ("mona-sans-600-800.woff2", "Mona+Sans:wdth,wght@100..125,600..800", {"wght": (600, 800), "wdth": (100, 125)}),
    ("dm-sans-400-600.woff2", "DM+Sans:opsz,wght@9..40,400..600", {"wght": (400, 600)}),
]


def fetch(url: str) -> bytes:
    with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=60) as r:
        return r.read()


def main() -> None:
    os.makedirs(OUT, exist_ok=True)
    text = urllib.parse.quote(CHARS)
    for name, family, limits in FONTS:
        css = fetch(f"https://fonts.googleapis.com/css2?family={family}&text={text}&display=swap").decode()
        urls = re.findall(r"url\((https://[^)]+)\)", css)
        if len(urls) != 1:
            raise SystemExit(f"{name}: expected one font file in the CSS, got {len(urls)}")
        font = TTFont(io.BytesIO(fetch(urls[0])))
        font = instancer.instantiateVariableFont(font, limits)
        font.flavor = "woff2"
        path = os.path.join(OUT, name)
        font.save(path)
        print(f"{name}: {os.path.getsize(path)} bytes")


if __name__ == "__main__":
    main()
