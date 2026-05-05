# Design History (`design-history`)

Notebook-style UI experiment built from the same primitives as the design-system viewer.

## Run locally

```bash
npm install
npm run dev
```

Open **http://localhost:3001** (`vite.config.ts` uses `strictPort`).

The **design-system viewer** in `../Design System` uses **http://localhost:3000** — run both dev servers together without port clashes.

### If CSS changes don’t appear

1. Confirm the browser tab title is **“Design History”** (not the design-system viewer). Inspect `#root` — it should have **`data-app="design-history"`**.
2. Hard refresh: **⌘⇧R** (Mac) or **Ctrl+Shift+R** (Windows).
3. Restart dev and clear Vite’s cache: stop the server, run `rm -rf node_modules/.vite`, then `npm run dev` again from **this** folder (`Abstract/Design History`).
4. Don’t use **`vite preview`** unless you’ve run **`npm run build`** after your edits — preview serves `dist/`, not live `src/`.

## Scripts

`lint`, `format`, `format:check`, `test`, `build`, and `preview` match the Design System project (see that README for conventions).
