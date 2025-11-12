# Amazing Portfolio

A minimal, visually striking portfolio landing page that renders a 3D background model using Three.js. Built with HTML, CSS and vanilla JavaScript.

## Live preview
Open [index.html](index.html) in your browser (or use VS Code Live Preview) to see the scene and UI.

## What’s inside
- Page: [index.html](index.html) — main markup and import map for Three.js.
- Styles: [global.css](global.css) — layout, colors and hero section styles.
- JS: [main.js](main.js) — Three.js scene setup, model loading and animation.
- Config: [package.json](package.json)

## How it works (key symbols)
- Scene & renderer initialization: see [`initiate_model`](main.js).
- Render loop + interactivity: see [`animate`](main.js).
- Interactive state: runtime variables like [`model`](main.js) are updated by mousemove and scroll listeners in [main.js](main.js).

## Features
- 3D GLTF model loaded with `GLTFLoader`.
- Subtle mouse and scroll-driven rotations and scaling.
- Responsive canvas background (fixed full-viewport).
- Clean hero section UI with animated-looking decorative bars via CSS.

## Run locally
1. Open [index.html](index.html) in a modern browser (Chrome/Edge/Firefox).
2. If CORS prevents loading local GLB assets, serve the folder with a simple HTTP server:
   - Python 3: `python -m http.server 5173`
   - Node (serve): `npx serve .`
3. Visit `http://localhost:5173` (or the printed port) in your browser.

## Customize
- Change the 3D asset at `./assets/model/computer_and_laptop.glb`.
- Tweak visual variables in [global.css](global.css) :root colors.
- Tune camera, lighting and interactions in [main.js](main.js) (`camera.position`, light intensities, lerp factors in [`animate`](main.js)).

## Notes
- Three.js is loaded from CDN via the import map in [index.html](index.html).
- The project uses ES modules (`type: "module"` in [package.json](package.json)).

## License
MIT-style; feel free to reuse and adapt.
