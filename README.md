# Sky Range (Bird Hunter)

A small **browser shooting game** built with **vanilla HTML, CSS, and JavaScript** — no bundler, no framework, and easy to open locally or host as static files. Birds fly in from the right; click them before any reach the **left edge**. Every **10 hits** the difficulty ramps up (faster birds, quicker spawns) until one slips through.

## Quick start

1. Clone or download this repository.
2. Open `index.html` in a modern desktop or mobile browser (Chrome, Firefox, Safari, Edge).

Optional: serve the folder with any static server if you prefer not to open the file directly.

## How to play

- **Start** — Use the **Start game** button on the welcome screen.
- **Aim & shoot** — Move the pointer over a bird and **click** to remove it.
- **Lose condition** — If **any** bird reaches the left side of the playfield, the round ends.
- **Audio** — Background loop, hit sound, and game-over sting (mute the tab if you prefer silence).

## Controls

| Input  | Action        |
| ------ | ------------- |
| Mouse  | Aim and shoot |
| Touch  | Tap birds     |

## Tech stack

- Semantic HTML and accessible patterns (labels, live regions, dialog semantics).
- CSS custom properties, glass-style UI, responsive layout, and `prefers-reduced-motion` support.
- JavaScript DOM APIs only — `setInterval` game loop, no dependencies.

## Project layout

| File        | Role                                      |
| ----------- | ----------------------------------------- |
| `index.html` | Structure, overlays, HUD, audio elements |
| `style.css`  | Visual design and responsive rules      |
| `index.js`   | Game logic and UI state                 |

Graphics and sky imagery are credited below; audio and asset filenames are expected alongside these files.

## Screenshots

**In game**

![Screenshot of the game](https://user-images.githubusercontent.com/54732020/230834111-b251f978-98e6-428d-81c0-938c869d6940.png)

**Game over**

![Screenshot of game over](https://user-images.githubusercontent.com/54732020/230834161-ec7a50ed-49d9-47fe-b6f8-ab7ce5b554c5.png)

## Credits

- Bird and background artwork: [Freepik](https://www.freepik.com/) via [Flaticon — Birds pack](https://www.flaticon.com/packs/birds-115).

## License

[MIT](https://opensource.org/licenses/MIT). Use or modify freely; attribution for third-party art is appreciated.
