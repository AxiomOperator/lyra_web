# lyra_web

The website for **lyra**, a self-hosted AI assistant on local models. Vite + React + TypeScript + Tailwind v4, in a dark terminal look.

## Pages

| Route | What |
|---|---|
| `/` | Hero with an animated terminal demo, the features, the safety model, the app, the latest release |
| `/features` | Each area in depth, with app screenshots or snippets |
| `/security` | Security & privacy: what stays on your server, the guarantees checked in Rust |
| `/self-host` | What you need, how it fits, four install steps (the source link: coming soon) |
| `/changelog` | Every lyra release, from lyra's `CHANGELOG.json` |

The words are in `src/content.ts`; pages in `src/pages/`, pieces in `src/components/`.

## Run it

```sh
npm install
npm run dev        # http://localhost:5173
npm run build      # static files in dist/
npm run preview    # serve dist/ at http://localhost:4173
```

`dist/` is plain static files: any web server works. Routes are client-side, so send unknown paths to `index.html` (for example `try_files $uri /index.html` in nginx).

## Keeping it current

- **Changelog:** after a lyra release, `npm run sync` copies `../lyra/CHANGELOG.json` into `src/data/` (committed, so the site builds without the lyra repo). `npm run sync -- /path/to/CHANGELOG.json` takes another path.
- **Screenshots:** `npm run shots` starts a fresh, throw-away lyra (`LYRA_BIN`, default `../lyra/target/debug/lyra`) with a stand-in model (`scripts/fake-model.mjs`) and made-up data, takes the app screenshots with Playwright (`CHROMIUM`, default `/usr/bin/chromium-browser`), and writes WebP files to `public/shots/` and the share image `public/og.png`. Nothing about the machine taking them appears (health, diagnoses and web search are off).
