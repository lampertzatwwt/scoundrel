# Contributing to Scoundrel

Thank you for your interest in contributing! This document covers everything you need to get the game running locally and start making changes.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Local Setup](#local-setup)
- [Running the Game](#running-the-game)
- [How the Code Is Organised](#how-the-code-is-organised)
- [Making Changes](#making-changes)
- [Submitting a Contribution](#submitting-a-contribution)
- [Code Style Guidelines](#code-style-guidelines)

---

## About the Project

Scoundrel is a single-player dungeon-crawl card game playable entirely in the browser. It is implemented as a **single self-contained HTML file** (`index.html`) with no build step, no package manager, and no server-side code. All dependencies (Three.js, GSAP, Google Fonts) are loaded from CDNs at runtime.

The original game was designed by **Zach Gage & Kurt Bieg**. A copy of the rules PDF is included in the repository as `Scoundrel.pdf`.

---

## Project Structure

```
.
├── index.html      # The entire game — HTML, CSS, and JavaScript in one file
├── Scoundrel.pdf   # Original tabletop rules (useful reference)
├── .gitignore
└── CONTRIBUTING.md # This file
```

---

## Prerequisites

You need nothing more than a **modern web browser** to run the game. No Node.js, no package manager, no compiler.

Recommended browsers (any recent version):

| Browser | Notes |
|---------|-------|
| Chrome / Chromium | Best tested |
| Firefox | Fully supported |
| Safari | Fully supported (macOS / iOS) |
| Edge | Fully supported |

> **Note:** Because the game uses ES modules (`<script type="module">`), opening `index.html` directly via `file://` will be blocked by browser security policies in some browsers (notably Chrome). Use a local HTTP server instead — see the next section.

---

## Local Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd scoundrel
```

### 2. Start a local HTTP server

Pick whichever method suits you best:

**Python 3** (available on most systems):
```bash
python3 -m http.server 8080
```

**Python 2** (legacy):
```bash
python -m SimpleHTTPServer 8080
```

**Node.js** (if you have it installed):
```bash
npx serve .
# or
npx http-server . -p 8080
```

**VS Code** — install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension, then right-click `index.html` → **Open with Live Server**. It also auto-reloads on save, which is handy during development.

**Ruby** (if available):
```bash
ruby -run -e httpd . -p 8080
```

### 3. Open the game

Navigate to [http://localhost:8080](http://localhost:8080) in your browser. The game loads instantly — there is no build step.

---

## Running the Game

Once the page loads:

1. The title screen fades in briefly, then the first room is dealt automatically.
2. **Click a card** to select it and reveal your available actions.
3. Use the action buttons that appear to fight, equip a weapon, or drink a potion.
4. Play **3 of the 4 cards** in a room to advance to the next room.
5. Press **Flee Room** (before playing any card) to send all 4 cards to the bottom of the deck and draw a fresh room. You cannot flee two rooms in a row.
6. Clear the entire deck to win. Reach 0 HP and it's game over.

For the full rules, see `Scoundrel.pdf` or click the **?** button in the top-right corner of the game.

---

## How the Code Is Organised

Everything lives inside `index.html`, divided into three sections:

### `<style>` — Visual design

- CSS custom properties (variables) at the top of `:root` define the colour palette. Changing a value there updates it everywhere.
- Layout uses fixed positioning for the HUD overlay, which sits on top of the Three.js canvas.
- A `@media (max-width: 600px)` block handles portrait/mobile sizing.

### `<body>` — HTML structure

| Element | Purpose |
|---------|---------|
| `#game-canvas` | Full-screen `<canvas>` rendered by Three.js |
| `#hud` | Transparent overlay containing all UI widgets |
| `#hud-health` | Animated SVG health wheel (top-left) |
| `#hud-weapon` | Currently equipped weapon display (below health) |
| `#hud-deck` | Cards remaining in the deck (top-right) |
| `#hud-room-bar` | Room progress label + Flee button (top-centre) |
| `#hud-actions` | Context-sensitive action buttons (appear when a card is selected) |
| `#hud-log` | Scrollable event log (bottom) |
| `#overlay-container` | Mounts the game-over screen or the help modal |
| `#damage-flash` | Full-screen red flash on taking damage |

### `<script type="module">` — Game logic & rendering

The script is organised into clearly commented sections:

| Section | What it does |
|---------|-------------|
| **Game Engine** | Pure game state — deck building, shuffling, card types, `playCard()`, `runAway()`, `dealRoom()` |
| **Three.js Scene** | Renderer, camera, lights, table plane, floating particles |
| **Card Texture Generation** | Draws each card face onto a `<canvas>` and uploads it as a `THREE.CanvasTexture` |
| **Card Meshes** | Creates, positions, and animates `THREE.Mesh` card objects; handles deal/play/hover animations via GSAP |
| **Raycaster** | Maps pointer events to 3D card meshes for click/hover detection |
| **HUD Updates** | `updateHUD()` and its helpers keep all DOM elements in sync with `state` |
| **Effects** | `triggerDamageFlash()` — red vignette + camera shake |
| **Global Bindings** | Exposes functions to `window.*` so inline `onclick` attributes can call them |
| **Animation Loop** | `tick()` drives particles and light pulsing; runs via `renderer.setAnimationLoop()` |
| **Init** | Waits for fonts to load, then starts the game and plays the title animation |

---

## Making Changes

Because the project is a single file, there is no build step:

1. Edit `index.html` in any text editor.
2. Save the file.
3. Refresh your browser (or let Live Server do it automatically).

### Common tasks

**Change the colour scheme**
Edit the CSS variables inside `:root` near the top of the `<style>` block (e.g. `--gold`, `--red`, `--bg`).

**Adjust card layout or spacing**
Look for `getCardScale()` and `getRoomPositions()` in the Card Meshes section. The `spacing`, `scale`, `y`, and `z` values control where cards sit on the table.

**Modify game rules**
The `playCard()` and `dealRoom()` functions in the Game Engine section contain all core rule logic. `makeDeck()` defines the composition of the 44-card deck.

**Change card appearance**
`generateCardTexture()` draws each card face using the Canvas 2D API. `generateCardBack()` draws the card-back pattern.

**Tweak animations**
All animations use GSAP (`gsap.to()` / `gsap.fromTo()`). Search for `gsap.` to find every animated property.

---

## Submitting a Contribution

1. **Fork** the repository and create a branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes in `index.html` (and `CONTRIBUTING.md` if relevant).

3. Test in at least one browser using a local HTTP server.

4. **Commit** with a clear, descriptive message:
   ```bash
   git add .
   git commit -m "feat: describe what you changed and why"
   ```

5. **Push** your branch and open a Pull Request against `main`. In the PR description, briefly explain:
   - What you changed
   - Why (what problem it solves or what it improves)
   - Any browsers or screen sizes you tested on

---

## Code Style Guidelines

- **No external dependencies beyond the existing CDN imports.** The game must remain playable without any install step.
- **Keep the single-file structure.** Do not split into separate `.js` or `.css` files unless that is the explicit goal of your PR.
- **Comment new sections** using the `// ─── SECTION NAME ───` convention already used in the script.
- **Preserve mobile support.** Test portrait orientation on a small viewport (≤ 600 px wide) when changing layouts or card positions.
- **Avoid breaking the game loop.** `initGame()` → `syncCards()` → `updateHUD()` is the standard reset sequence — maintain this contract.
- **No linter / formatter is enforced**, but please match the surrounding indentation (2 spaces) and general style of existing code.

---

*Happy dungeon-crawling! 🃏*
