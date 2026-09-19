# MOSSBITE 3D

A free-roam snake game played on a spinning globe. Your snake stays fixed facing you while the planet turns beneath it.
Works in current Chrome, Edge, Samsung Internet, Firefox and Safari, on phones and desktops.

## Play / share
1. Put this folder on any static host with HTTPS. GitHub Pages: Settings → Pages → Deploy from branch → `main` / root.
2. Share the link. On Android, open it in Chrome, then menu ⋮ → **Install app** (or **Add to Home screen**) for a full-screen, offline-capable version.

Tilt steering and the screen-on wake lock need HTTPS (GitHub Pages, Netlify, Vercel and Cloudflare Pages all provide it).

## Controls
- `←` `→` (or `A` `D`): steer — the globe spins under you
- `↑` `↓` (or `W` `S`): speed up / slow down
- Touch: on-screen arrows, or press and drag (horizontal = steer, vertical = speed)
- 📱 button: tilt your phone to steer (opt-in). ⛶ button: fullscreen.

## Profiles (optional)
Play right away as a guest, or tap **Create profile** on the menu to set a name and a permanent photo for your snake's head. A profile tracks games played, wins, times died, food eaten and total time played. It is stored only in your browser (localStorage) — nothing is uploaded.

## Compatibility notes
- Needs WebGL (WebGL2 preferred, WebGL1 works). If it can't start, the menu explains why.
- Resolution adapts automatically: capped on phones and lowered on the fly if the frame rate drops.
- The screen stays awake while you play (where the browser supports it), so tilt play doesn't dim the display.

## Files
- `index.html` — the whole game (HTML, CSS, JS)
- `lib/three.min.js` — three.js r128 (MIT, see `lib/LICENSE-three.txt`)
- `manifest.webmanifest`, `sw.js`, `icons/` — installable web app + offline cache
- Bump `CACHE` in `sw.js` when you publish a new version so installed copies update.

## Run locally
```
python3 -m http.server 8000
```
then open http://localhost:8000.
