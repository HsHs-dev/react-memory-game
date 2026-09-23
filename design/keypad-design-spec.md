# Memory Sequence — Design Spec & Figma Build Reference

Companion to three SVGs: `keypad-figma-reference.svg` (Play), `leaderboard-figma-reference.svg`, `about-figma-reference.svg`. Import each (File → Import, or paste straight into a frame) to get layout and shapes as real Figma layers, then apply the values below with Figma's own Fill / Effects / Text panels — that's the part a flat SVG can't carry (background blur, real refraction, multi-layer shadows, interactive states).

## Colors

**Background gradient** (linear, 160°): `#ffffff` → `#eef2f8` (55%) → `#dbe3ef` (100%)

**Foam blobs** (behind everything, blurred ~60px): white @ 82%, and `#c8d5e8` @ 55–60%

**Keycap base** (glass, linear top→bottom): `rgba(132,134,138,0.54)` → `rgba(90,92,96,0.54)` · Background Blur 14px — neutral gray, not blue-tinted; this is what keeps it from washing into the page

**Keycap cap** (glass, linear 155°, plus a soft radial highlight arc): `rgba(240,241,243,0.48)` → `rgba(208,210,214,0.32)` · Background Blur 18px. The highlight sits on top: an ellipse 120% wide × 55% tall, centered at (50%, -8%) — i.e. centered *above* the shape so only its lower arc shows, white @ 50% fading to transparent by 62% — this is what reads as a curved specular highlight instead of a flat tint

**Borders**: `rgba(255,255,255,0.48)` on the base, `rgba(255,255,255,0.6)` on the cap — this rim carries a lot of the "still reads against a light page" work, don't skip it

**Shadow color**: `rgba(58,70,94,0.4)` main / `rgba(58,70,94,0.22)` soft (pressed state)

**Flash tint colors** (key 0→8, reading order — translucent overlays on top of the existing glass fill, not flat swaps). Same top-arc highlight shape as the cap, at 85% white, over a linear wash of the key's color at 62%→30%:

| Key | Hex | RGB |
|---|---|---|
| 0 | `#f28b82` | 242, 139, 130 |
| 1 | `#f7b878` | 247, 184, 120 |
| 2 | `#f5df8e` | 245, 223, 142 |
| 3 | `#a8d8b0` | 168, 216, 176 |
| 4 | `#8fd1c9` | 143, 209, 201 |
| 5 | `#8fb8e8` | 143, 184, 232 |
| 6 | `#a8a8e8` | 168, 168, 232 |
| 7 | `#c8a0e0` | 200, 160, 224 |
| 8 | `#eba0c8` | 235, 160, 200 |

## Spacing & shape

- Key: clamp(72–118px) square, corner radius = 24% of side (23px at a 96px base)
- Grid gap: 22–30px · Grid padding: 24–34px
- Cap riser (lift above base): 12% rest / 15% hover / 3% pressed — at a 96px key that's roughly 11.5px / 14.4px / 2.9px

## Effects (Figma's Effect panel — same 5 numbers as CSS box-shadow)

| Layer / state | X | Y | Blur | Spread | Color |
|---|---|---|---|---|---|
| Base, rest | 0 | 16 | 24 | -8 | shadow @ 40% |
| Base, hover | 0 | 20 | 28 | -8 | shadow @ 40% |
| Base, pressed | 0 | 6 | 10 | -4 | shadow @ 22% |
| Cap, top highlight (Inner Shadow) | 0 | 1 | 0 | 0 | white @ 85% |
| Cap, drop | 0 | 3 | 5 | 0 | shadow @ 22% |

Plus **Background Blur** on both base and cap (14px / 18px) — the glass ingredient, a separate effect type from a regular Layer Blur, same Effects panel. The live HTML also layers real refraction on top via an SVG displacement filter (Chromium only, progressive enhancement) — that part is genuinely code-only, nothing to recreate in Figma for a static mock.

## Typography

Font: system-ui (Inter is the closest Figma match). Brand 16px/600. Nav links 13px/500. Page heading 24–26px/700. Body copy 14px/400, `#6b7688`.

## Header nav (all three pages share this)

**Memory Sequence** (brand, left) — Play / Leaderboard / [GitHub mark icon, 18px, `#6b7688`, links out to the repo]. "Settings" is gone; the GitHub icon replaces it as the fourth nav slot. Active item: white pill @ 85% opacity behind the label, small drop shadow (Y 2, Blur 6, Spread -2, shadow @ ~40%). The GitHub mark is the standard Octicons `mark-github` path — free to use for linking to a repo.

## Page: Play

The keycap grid, per everything above. See `keypad-figma-reference.svg`.

## Page: Leaderboard

Heading "Leaderboard" (26px/700) + subheading "Longest sequences remembered" (13px, muted). Below it, 5 ranked rows, each a rounded-rect card (rx 20, white @ 40–55% opacity, thin white stroke, soft drop shadow — same glass-card language as the keycaps but flatter, no base/cap split needed here):

- Rank number in a small filled circle (32px, `#eef2f8`), left-aligned
- Player name (15px/600), with 3 small colored dots beneath it (4px radius) previewing that run's key sequence — reuses the flash-color palette, ties the leaderboard visually back to the game itself
- Score, right-aligned (17px/700)

See `leaderboard-figma-reference.svg` for exact positions of all 5 rows.

## Page: About

Heading "About Memory Sequence" (24px/700) + a two-line description. A "How to play" section below it: 4 numbered steps, each a small filled circle (20px) with the step number, plus one line of body copy. A footer card at the bottom repeats the GitHub mark at larger size (24px) next to "View source on GitHub" / "Open source — contributions welcome", same card treatment as the leaderboard rows.

See `about-figma-reference.svg` for exact layout.

## Audio map (reference only — not part of any visual file)

Two-octave C major pentatonic, key 0→8:
C4 261.63 · D4 293.66 · E4 329.63 · G4 392.00 · A4 440.00 · C5 523.25 · D5 587.33 · E5 659.25 · G5 783.99
