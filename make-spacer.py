"""Regenerate assets/images/stage-spacer.png at the design's CONTENT extent.

The spacer is the only thing giving .stage its height — every other child is
position:absolute and contributes none. Size it to the artwork, not the Figma
frame: a frame usually carries dead space above the topmost element and below
the bottom one, and including it forces a scrollbar on every desktop browser.

    spacer height = bottom_of_lowest_element - top_of_highest_element

Then measure every vertical % from that top edge, not from the frame's 0.

Usage:
    python make-spacer.py 1920 905          # explicit size
    python make-spacer.py 1920 59 964       # width, top y, bottom y
"""
import sys
from PIL import Image

OUT = "assets/images/stage-spacer.png"

args = sys.argv[1:]
if len(args) == 2:
    w, h = int(args[0]), int(args[1])
    top = 0
elif len(args) == 3:
    w, top, bottom = int(args[0]), int(args[1]), int(args[2])
    h = bottom - top
else:
    print(__doc__)
    sys.exit(1)

Image.new("RGBA", (w, h), (0, 0, 0, 0)).save(OUT, optimize=True)
print(f"wrote {OUT}  {w}x{h}   ratio {h/w:.4f}")
if top:
    print(f"content starts at frame y={top} — subtract {top} from every Figma y,")
    print(f"then divide by {h} for the vertical %")
