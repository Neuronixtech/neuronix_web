# Neuronix — AGENTS.md

Single-package React SPA (Vite 6 + React 18 + Tailwind v3 + shadcn/ui).

## Commands

```sh
npm run dev        # dev server on http://localhost:3000 (strictPort)
npm run build      # prod build → dist/
npm run preview    # preview the built dist/
npm run lint       # ESLint (quiet), ignores src/lib/ & src/components/ui/
npm run lint:fix   # auto-fix
npm run typecheck  # TypeScript via jsconfig.json — limited scope
```

## Key facts

- `@/` alias maps to `src/` — use `@/components/...` for all imports.
- **Feature-first:** `src/features/<name>/` with a barrel `index.js`. Pages import from the barrel, not nested paths.
- **All routes lazy-loaded** via `React.lazy` + `Suspense` in `src/routes/index.jsx`. Build chunks via Vite `manualChunks`: vendor, router (react-router-dom), motion (framer-motion), three.
- **shadcn/ui** (new-york style, JSX, no TypeScript) — `components.json` at root. `cn()` utility in `src/lib/utils.js`. Generated UI components live in `src/components/ui/`.
- **ESLint** only checks `src/components/**`, `src/pages/**`, `src/Layout.jsx`. Ignores `src/lib/`, `src/components/ui/`. Unused-imports rule is active.
- **TypeScript** (`npm run typecheck`) via jsconfig.json — partial coverage. Includes: `src/components/**/*.js`, `src/pages/**/*.jsx`, `src/Layout.jsx`. Excludes: `src/components/ui/`, `src/lib/`, `src/api/`.
- **Dark-first theme** — CSS custom properties in `src/index.css`, glass morphism classes (`.glass`, `.glass-card`), glow utilities (`.glow-red`, `.text-glow`). Fonts: Space Grotesk (headings), Inter (body).
- **`api-client.js`** reads `VITE_API_BASE_URL` (default `/api`) and `access_token` from localStorage. Supports JSON and FormData. Contact form and proposals are wired to API — works when backend exists, shows fallback message otherwise.
- **ErrorBoundary** at `src/components/ui/ErrorBoundary.jsx` wraps the app root. Do not remove.
- **SEO** — `useDocumentMeta(title)` hook in `src/hooks/use-document-meta.js` sets `document.title`. Call in every page component. Base meta tags live in `index.html`.
- **Image fallback** — `onImgError` from `@/lib/utils` handles broken image URLs. Add `onError={onImgError}` to any `<img>`.
- **`public/manifest.json`** exists and is copied to dist during build.
- **`.env.example`** at root documents available Vite env vars (must be `VITE_`-prefixed).
- **Auth is a stub** — `AuthProvider` exists but backend is not built.
- **Dev server** proxies `/api/*` → `http://localhost:3000` (note: dev server itself is on port 3000; actual backend should be on another port).
- **`npm run typecheck` may produce errors** because coverage is partial; only the included paths matter.
