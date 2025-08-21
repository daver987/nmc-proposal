# Repository Guidelines

## Project Structure & Module Organization

- `app/`: Client code (routes, components, middleware). Examples: `app/pages/roi.vue`, `app/components/MetricCards.vue`, `app/middleware/password.global.ts`.
- `server/`: Server routes/logic only.
- `shared/`: Cross‑isomorphic code (types, helpers, constants).
- `assets/`: Processed assets; consider `assets/source/` for provided HTML/CSV.
- `public/`: Static files at the web root.
- `docs/`: Internal plan and references (`docs/PLAN.md`, `docs/reference/*`). Treat email snippets as internal; do not surface verbatim.

## Build & Development Commands

- Install: `pnpm install` (Node 18+ recommended).
- Dev: `pnpm dev` — local server at `http://localhost:3000`.
- Build: `pnpm build` — production bundle; `pnpm preview` to serve it.
- Generate: `pnpm generate` — prerender routes if needed.
- Format: `pnpm format` — run Prettier on the repo.

## Coding Style & Conventions

- Stack: Nuxt 4, Vue 3 `<script setup>`, TypeScript, Nuxt UI 3.
- Styles: Add global CSS at `app/assets/css/main.css` with `@import "tailwindcss"; @import "@nuxt/ui";` and include in `nuxt.config.ts` via `css: ['~/assets/css/main.css']`.
- Theme: Neutral `zinc` + gold accent. Set in `app/app.config.ts`:
  `export default defineAppConfig({ ui: { primary: 'amber', gray: 'zinc' } })`.
- Naming: Components PascalCase; pages lowercase (e.g., `roi.vue`); composables `useXxx.ts`.
- State: Prefer Nuxt `useState` and `useCookie`; avoid global stores unless necessary.
- Reactivity: Use VueUse (`@vueuse/core`) and Vue reactivity; avoid manual DOM manipulation.

## Commit & Pull Request Guidelines

- Commits: Short, focused; Conventional style is welcome (`feat:`, `fix:`) but not required.
- PRs: Clear description, link relevant `docs/PLAN.md` items, include screenshots for UI changes.

## Security & Content Tips

- Env: Set `NUXT_PUBLIC_PASSCODE` and `NUXT_PUBLIC_DEMO_VIDEO_URL` in `.env` (do not commit secrets).
- Gate: Middleware checks cookie `nmc_access=ok`; `/enter` sets it upon passcode match.
- Sanitize: When rendering raw HTML via `?raw`, sanitize allowed tags.
