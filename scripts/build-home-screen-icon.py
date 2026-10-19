"""Build the Intermix AI Home Screen icon set: gold italic "mix" with a small
ivory "AI" set like an exponent, on the brand charcoal.

Colors and type follow the site wordmark (Brand.tsx, globals.css):
  charcoal --ink #1c1c1e, gold --gold-light #c9a773 ("mix"),
  ivory --cream #f7f3ec ("AI"), "mix" in Georgia Italic,
  "AI" in Arial regular, uppercase, letter-spaced (2px at 11px).

Georgia and Arial are not redistributable, so this script uses their
metric-compatible open equivalents:
  Gelasio Italic (SIL OFL, Google Fonts) for "mix"
  Liberation Sans Regular (SIL OFL) for "AI"

    python3 scripts/build-home-screen-icon.py \
        path/to/Gelasio-Italic[wght].ttf path/to/LiberationSans-Regular.ttf

Outputs (opaque RGB PNGs, square; iOS applies the rounded corners):
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
IVORY = (0xF7, 0xF3, 0xEC)

MASTER = 1024
SS = 4  # final drawing at 4096 px, downsampled for smooth edges
P = 1600  # working size of "mix" before scaling into the icon

MIX_TRACKING = -0.038  # site: -1.4px at the 37px "mix"
AI_RATIO = 0.36  # "AI" size relative to "mix" (site uses ~0.30; larger so it reads at icon size)
AI_TRACKING = 0.10  # site: 2px at 11px = 0.18em; tightened so the pair reads as one mark
AI_GAP = 0.20  # space after the "x", as a share of the AI cap height
COMPOSITION_WIDTH = 0.66  # ink width of "mixAI" as a share of the canvas
OPTICAL_LIFT = 0.012  # x-height band sits slightly above true center
OPTICAL_SHIFT = 0.008  # nudge right: the light "AI" carries less weight than "mix"


def font(path, px, weight=None):
    f = ImageFont.truetype(path, round(px))
    if weight is not None:
        try:
            f.set_variation_by_axes([weight])
        except (OSError, ValueError):
            pass
    return f


def ink_bbox(img, threshold=40):
    diff = ImageChops.difference(img, Image.new("RGB", img.size, CHARCOAL))
    return diff.convert("L").point(lambda v: 255 if v > threshold else 0).getbbox()


def draw_tracked(draw, origin, text, f, px, tracking, fill):
    x0, y0 = origin
    for i, ch in enumerate(text):
        x = f.getlength(text[:i]) + i * tracking * px  # includes kerning
        draw.text((x0 + x, y0), ch, font=f, fill=fill)


def compose(mix_path, ai_path):
    """Lay out "mixAI" at a large working size; return the crop and the
    vertical center of the x-height band within that crop."""
    W, H = int(P * 3.2), int(P * 2)
    img = Image.new("RGB", (W, H), CHARCOAL)
    d = ImageDraw.Draw(img)
    mf = font(mix_path, P, 400)
    mo = (int(P * 0.3), int(P * 0.5))
    draw_tracked(d, mo, "mix", mf, P, MIX_TRACKING, GOLD)
    mix_box = ink_bbox(img)
    xb = mf.getbbox("x")
    body_top, body_bottom = mo[1] + xb[1], mo[1] + xb[3]

    A = AI_RATIO * P
    af = font(ai_path, A)
    cap = af.getbbox("A")  # (left, top, right, bottom) relative to draw origin
    cap_h = cap[3] - cap[1]
    # Superscript: AI cap top aligns with the top of the i dot.
    ai_top = mix_box[1]
    ai_y = ai_top - cap[1]
    # Hug the x: find its rightmost ink in the rows the AI occupies.
    band = img.crop((0, ai_top, W, min(ai_top + cap_h, H)))
    right = ink_bbox(band)[2]
    ai_x = right + AI_GAP * cap_h - cap[0]
    draw_tracked(d, (ai_x, ai_y), "AI", af, A, AI_TRACKING, IVORY)

    box = ink_bbox(img)
    crop = img.crop(box)
    body_center = (body_top + body_bottom) / 2 - box[1]
    return crop, body_center


def render(mix_path, ai_path):
    crop, body_center = compose(mix_path, ai_path)
    size = MASTER * SS
    k = COMPOSITION_WIDTH * size / crop.width
    piece = crop.resize((round(crop.width * k), round(crop.height * k)), Image.LANCZOS)
    x = round(size / 2 - piece.width / 2 + OPTICAL_SHIFT * size)
    y = round(size / 2 - OPTICAL_LIFT * size - body_center * k)
    canvas = Image.new("RGB", (size, size), CHARCOAL)
    canvas.paste(piece, (x, y))
    return canvas.resize((MASTER, MASTER), Image.LANCZOS)


def save(img, rel, px):
    out = ROOT / rel
    out.parent.mkdir(parents=True, exist_ok=True)
    im = img if px == img.width else img.resize((px, px), Image.LANCZOS)
    im.convert("RGB").save(out, "PNG", optimize=True)
    print(f"{rel}: {im.width}x{im.height}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    master = render(sys.argv[1], sys.argv[2])
    save(master, "design/home-screen-icon/intermix-ai-icon-1024.png", 1024)
    save(master, "src/app/apple-icon.png", 180)
    save(master, "public/apple-touch-icon.png", 180)
    save(master, "public/icons/icon-192.png", 192)
    save(master, "public/icons/icon-512.png", 512)
