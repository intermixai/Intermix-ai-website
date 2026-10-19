"""Build the Intermix AI Home Screen icon from the full website logo.

The logo is rendered in a real browser from the site's own markup and CSS
(src/components/shared/Brand.tsx and the .brand rules in globals.css), so its
typography, spacing, colors and proportions are exactly the approved logo:
"Inter" in ivory, "mix" in gold italic, and the small raised ivory "AI".
The rendered logo is then centered on a solid charcoal square.

The site uses Arial and Georgia, which are not redistributable. For an exact
layout this script maps them to their metric-compatible open equivalents:
  Arial   -> Liberation Sans Regular (SIL OFL)
  Georgia -> Gelasio Italic (SIL OFL, Google Fonts)

Requires Python Playwright with Chromium:

    python3 scripts/build-home-screen-icon.py \
        path/to/LiberationSans-Regular.ttf path/to/Gelasio-Italic[wght].ttf

Outputs (opaque RGB PNGs, square, no rounded corners; iOS masks the corners):
    design/home-screen-icon/intermix-ai-icon-1024.png   high-resolution master
    src/app/apple-icon.png                              180x180, linked by Next.js
    public/apple-touch-icon.png                         180x180, iOS default path
    public/icons/icon-192.png, public/icons/icon-512.png  web app manifest
"""

import re
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageChops
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
BACKGROUND = (0x18, 0x18, 0x1A)  # site header, where the logo appears
MASTER = 1024
LOGO_WIDTH = 0.82  # logo ink width as a share of the icon: 9% padding each side
RENDER_SCALE = 24  # browser device pixel ratio for a crisp, large rendering
CHROMIUM = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"


def brand_css() -> str:
    """Copy the logo's rules verbatim from globals.css."""
    css = (ROOT / "src/app/globals.css").read_text()
    root = re.search(r":root\s*\{[^}]*\}", css).group(0)
    rules = re.findall(r"(?m)^\.brand(?: span| sup)?\s*\{[^}]*\}", css)
    if len(rules) < 3:
        sys.exit("Could not find the .brand rules in globals.css")
    return root + "\n" + "\n".join(rules[:3])


def render_logo(arial: str, georgia_italic: str) -> Image.Image:
    bg = "#%02x%02x%02x" % BACKGROUND
    html = f"""<!doctype html><html><head><meta charset="utf-8"><style>
@font-face {{ font-family: "Arial"; src: url("file://{arial}"); }}
@font-face {{ font-family: "Georgia"; font-style: italic;
  src: url("file://{georgia_italic}"); }}
{brand_css()}
html, body {{ margin: 0; background: {bg}; }}
body {{ font-family: Arial, Helvetica, sans-serif; font-size: 16px;
  line-height: 1.65; -webkit-font-smoothing: antialiased; }}
header {{ color: var(--cream); padding: 40px; display: inline-block; }}
a {{ color: inherit; text-decoration: none; }}
</style></head><body><header>
<a class="brand" href="/" aria-label="Intermix AI home">Inter<span>mix</span><sup>AI</sup></a>
</header></body></html>"""
    with tempfile.TemporaryDirectory() as tmp:
        page_file = Path(tmp) / "logo.html"
        page_file.write_text(html)
        shot = Path(tmp) / "logo.png"
        with sync_playwright() as p:
            browser = p.chromium.launch(executable_path=CHROMIUM)
            page = browser.new_page(
                viewport={"width": 400, "height": 160},
                device_scale_factor=RENDER_SCALE,
            )
            page.goto(page_file.as_uri())
            page.evaluate("document.fonts.ready")
            fams = page.evaluate(
                "[...document.fonts].filter(f => f.status === 'loaded').map(f => f.family)"
            )
            if not {'"Arial"', '"Georgia"'} <= set(fams) and not {"Arial", "Georgia"} <= set(fams):
                sys.exit(f"Fonts did not load: {fams}")
            page.locator("header").screenshot(path=str(shot))
            browser.close()
        return Image.open(shot).convert("RGB")


def ink_crop(img: Image.Image) -> Image.Image:
    diff = ImageChops.difference(img, Image.new("RGB", img.size, BACKGROUND))
    box = diff.convert("L").point(lambda v: 255 if v > 24 else 0).getbbox()
    return img.crop(box)


def compose(logo: Image.Image) -> Image.Image:
    ss = 4
    size = MASTER * ss
    k = LOGO_WIDTH * size / logo.width
    piece = logo.resize((round(logo.width * k), round(logo.height * k)), Image.LANCZOS)
    canvas = Image.new("RGB", (size, size), BACKGROUND)
    canvas.paste(piece, ((size - piece.width) // 2, (size - piece.height) // 2))
    return canvas.resize((MASTER, MASTER), Image.LANCZOS)


def save(img: Image.Image, rel: str, px: int) -> None:
    out = ROOT / rel
    out.parent.mkdir(parents=True, exist_ok=True)
    im = img if px == img.width else img.resize((px, px), Image.LANCZOS)
    im.convert("RGB").save(out, "PNG", optimize=True)
    print(f"{rel}: {im.width}x{im.height}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    arial, georgia = (str(Path(a).resolve()) for a in sys.argv[1:])
    master = compose(ink_crop(render_logo(arial, georgia)))
    save(master, "design/home-screen-icon/intermix-ai-icon-1024.png", 1024)
    save(master, "src/app/apple-icon.png", 180)
    save(master, "public/apple-touch-icon.png", 180)
    save(master, "public/icons/icon-192.png", 192)
    save(master, "public/icons/icon-512.png", 512)
