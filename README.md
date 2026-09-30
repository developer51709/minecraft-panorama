# minecraft-panorama
An HTML recreation of the Minecraft panorama background.

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
