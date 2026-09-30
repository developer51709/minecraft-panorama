# minecraft-panorama
An HTML recreation of the Minecraft panorama background.

## Content

- `assets/catalog.json` is generated from the packs in `assets/` (see below).
- `history.js` holds the hand-written release dates, summaries, and facts for each
  panorama, keyed by catalog id. Add an entry here whenever a new pack is catalogued.

## Run locally

Regenerate the panorama catalog after adding or removing packs:

```sh
node scripts/build-catalog.mjs
```

Serve the site from the project root:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`. The panorama viewer loads Three.js and its display fonts from CDNs, so an internet connection is needed.
