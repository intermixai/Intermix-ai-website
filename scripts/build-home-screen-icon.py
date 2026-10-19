"""Build the Intermix AI Home Screen icon set.

The icon is the gold italic "mix" from the site wordmark (Brand.tsx), centered
on the brand charcoal. Colors come from src/app/globals.css: --ink #1c1c1e and
--gold-light #c9a773 (the color of "mix" in the header logo).

The site sets "mix" in Georgia Italic. Georgia is not redistributable, so this
script uses Gelasio Italic (SIL Open Font License), which is metric-compatible
with Georgia. Download Gelasio-Italic[wght].ttf from Google Fonts and pass its
path:

    python3 scripts/build-home-screen-icon.py path/to/Gelasio-Italic[wght].ttf

Outputs (all opaque RGB PNGs, square, no rounded corners; iOS masks corners):
    design/home-screen-icon/intermix-ai-icon-1024.png   high-resolution master
    src/app/apple-icon.png                              180x180, linked by Next.js
    public/apple-touch-icon.png                         180x180, iOS default path
    public/icons/icon-192.png, public/icons/icon-512.png  web app manifest
"""

import sys
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
CHARCOAL = (0x1C, 0x1C, 0x1E)
GOLD = (0xC9, 0xA7, 0x73)
TEXT = "mix"
MASTER = 1024
SCALE = 4  # draw at 4096 px, then downsample for smooth edges
WORD_WIDTH = 0.60  # ink width as a share of the canvas
TRACKING_EM = -0.038  # site: letter-spacing -1.4px at the 37px "mix"
OPTICAL_LIFT = 0.012  # raise the x-height band slightly above true center


def render(font_path: str) -> Image.Image:
    size = MASTER * SCALE
    probe = 1000
    font = ImageFont.truetype(font_path, probe)
    try:
        font.set_variation_by_axes([400])  # regular italic, as on the site
    except (OSError, ValueError):
        pass

    def layout(f, px):
        xs, x = [], 0.0
        for i, ch in enumerate(TEXT):
            # Width of the preceding text includes kerning; add site tracking.
            x = f.getlength(TEXT[:i]) + i * TRACKING_EM * px
            xs.append(x)
        return xs

    # Measure ink width at the probe size, then scale to the target width.
    def ink_box(f, px):
        xs = layout(f, px)
        boxes = [f.getbbox(ch) for ch in TEXT]
        left = min(x + b[0] for x, b in zip(xs, boxes))
        right = max(x + b[2] for x, b in zip(xs, boxes))
        return left, right

    l, r = ink_box(font, probe)
    px = probe * (WORD_WIDTH * size) / (r - l)
    font = ImageFont.truetype(font_path, round(px))
    try:
        font.set_variation_by_axes([400])
    except (OSError, ValueError):
        pass

    xs = layout(font, px)
    l, r = ink_box(font, px)
    # Vertical: center the x-height band (the body of "m", "i", "x").
    xb = font.getbbox("x")
    body_center = (xb[1] + xb[3]) / 2
    ox = size / 2 - (l + r) / 2
    oy = size / 2 - body_center - OPTICAL_LIFT * size

    img = Image.new("RGB", (size, size), CHARCOAL)
    draw = ImageDraw.Draw(img)
    for x, ch in zip(xs, TEXT):
        draw.text((ox + x, oy), ch, font=font, fill=GOLD)
    # Italic glyph boxes are not the visible ink; recenter horizontally on the
    # actual gold pixels. The margins are uniform charcoal, so wrapping is safe.
    ink = ImageChops.difference(img, Image.new("RGB", img.size, CHARCOAL))
    box = ink.convert("L").point(lambda v: 255 if v > 40 else 0).getbbox()
    img = ImageChops.offset(img, round(size / 2 - (box[0] + box[2]) / 2), 0)
    return img.resize((MASTER, MASTER), Image.LANCZOS)


def save(img: Image.Image, rel: str, px: int) -> None:
    out = ROOT / rel
    out.parent.mkdir(parents=True, exist_ok=True)
    im = img if px == img.width else img.resize((px, px), Image.LANCZOS)
    im.convert("RGB").save(out, "PNG", optimize=True)
    print(f"{rel}: {im.width}x{im.height}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    master = render(sys.argv[1])
    save(master, "design/home-screen-icon/intermix-ai-icon-1024.png", 1024)
    save(master, "src/app/apple-icon.png", 180)
    save(master, "public/apple-touch-icon.png", 180)
    save(master, "public/icons/icon-192.png", 192)
    save(master, "public/icons/icon-512.png", 512)
