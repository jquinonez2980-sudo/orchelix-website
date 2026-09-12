# QR — orchelix.com/jorge

Every file here encodes exactly `https://www.orchelix.com/jorge`, the digital
business card. All of them were generated from the same path the live page
renders (`app/(site)/jorge/assets.ts`) and every one was decoded with `jsQR`
after export, so what is in this folder is what a phone actually reads.

Version 3, 29 modules, error correction M, 4-module quiet zone.

## Pick one

| Where it is going | File |
| --- | --- |
| Slides, docs, anything that may be resized | `orchelix-qr-paper.svg` |
| The same on a dark deck | `orchelix-qr-night.svg` |
| Over a photo or a colour you control | `orchelix-qr-transparent-ink.svg` |
| Email signature | `orchelix-qr-email-signature.png` (full strip) or `orchelix-qr-paper-220-email-signature.png` (code only) |
| Zoom / Teams / Meet background | `orchelix-qr-zoom-background-paper.png`, `orchelix-qr-zoom-background-night.png` |
| Print, signage, a pull-up banner | `orchelix-qr-paper-2048-print.png` |

PNGs come at 220, 512, 1024 and 2048 px in both themes.

## Two rules worth keeping

**The code is always dark on light.** ISO/IEC 18004 specifies dark modules on
a light ground. Many phone cameras tolerate an inverted code and a good number
of third-party scanners do not, which is the kind of failure nobody reports —
the person just puts their phone away. So the `night` files are not inverted:
they are a paper tile sitting on the night ground. This is what the card's own
QR dialog does.

**Do not recolour the modules or drop a logo in the middle.** A reader works
off luminance, and both are the usual way a handsome code stops scanning in
bad light. The ring already sits beside the code in the composed pieces.

## Regenerating

If the URL ever changes, regenerate `QR_PATH` in `app/(site)/jorge/assets.ts`
first — that file is the source, and the page and these exports must not
disagree. Then re-export and decode every file again before shipping any of
them.
