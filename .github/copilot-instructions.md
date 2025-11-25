This repository is a Next.js (App Router) TypeScript web frontend for a bakery information / e-commerce project.

Quick facts
- **Framework:** Next.js (App Router) — see `app/layout.tsx` for global layout and metadata.
- **Language:** TypeScript (`tsconfig.json` has `strict: true`).
- **Styling:** Tailwind CSS (`globals.css` + `postcss.config.mjs`).
- **Fonts:** Google fonts are loaded via `next/font/google` in `app/layout.tsx`.
- **Scripts:** `npm run dev` (dev server), `npm run build`, `npm run start`, `npm run lint` — defined in `package.json`.

Important repo-specific conventions
- Folder name `app/componets` is intentionally present in this project (note the spelling). When adding or importing shared UI parts, import from `./componets/...` not `./components/...`.
- Client vs server components: components that use hooks or browser-only behavior include a top-line directive `'use client'` (example: `app/componets/kosikTlacitko.tsx` and `app/componets/kontaktniFormular.tsx`). Keep that rule: add `'use client'` to any component that uses state, effects, or DOM APIs.
- Routes: add a new route by creating a folder under `app/` with a `page.tsx` (e.g. `app/onas/page.tsx`, `app/produkty/page.tsx`).
- Global layout: `app/layout.tsx` sets fonts and root HTML — prefer placing global wrappers, providers and metadata here.

Data & state patterns (what's present / expected)
- There is currently no backend/API folder. The contact form (`kontaktniFormular.tsx`) simulates submission (console + timeout). If adding real API endpoints, use the App Router `app/api/*/route.ts` pattern.
- The basket/cart currently passes `itemCount` as a prop (see `Navbar.tsx` -> `KosikTlacitko`). Expect future integration with a global state store (Zustand/Redux) — new changes should introduce a single source of truth for cart state and replace prop-drilling.

Styling and UI patterns
- Utility classes (Tailwind) are used everywhere; keep class composition style similar to existing components (long template strings with conditional classes).
- Buttons, badges and animations follow consistent utilities (e.g. `transition-all duration-300`), reuse patterns when creating new UI.

Developer workflows & commands
- Install: `npm install` (repository was created with `create-next-app`).
- Dev server: `npm run dev` — open `http://localhost:3000`.
- Build: `npm run build` then `npm run start` to serve the production build.
- Lint: `npm run lint` (project uses `eslint` + `eslint-config-next`).

Code examples & patterns
- Example: make a client component (use state/hooks)
  - File top: `'use client'`
  - Export a React function component (`.tsx`) and use Tailwind classes consistent with existing components.

- Example: adding a new route `app/blog/page.tsx`
  - Create `app/blog/page.tsx` with a default export React component. No special routing config is required.

Files to inspect for detailed patterns
- `app/layout.tsx` — global layout, fonts, metadata.
- `app/page.tsx` — home page that composes `app/componets/*` components.
- `app/componets/*` — UI building blocks (`Navbar.tsx`, `footer.tsx`, `kosikTlacitko.tsx`, `kontaktniFormular.tsx`).
- `package.json`, `tsconfig.json`, `next.config.ts` — build, lint and TypeScript settings.

Guidance for AI agents working in this repo
- Prefer small, focused changes: modify or add a single component or route per PR and run the dev server to validate visually.
- Respect the `componets` spelling when adding imports or moving files.
- When converting a component to client-side behavior, add `'use client'` and confirm it doesn't break server-only imports (icons and simple presentational code are fine).
- Don't invent backend endpoints: if backend functionality is required, create API routes under `app/api` and keep the implementation minimal, or ask the repo owner for the intended backend contract.
- Keep language/content consistent: most user-facing copy is Czech (see `README.md` and component text). Keep UI text localized in Czech unless instructed otherwise.

If anything here is ambiguous or you want me to expand a section (example PR templates, testing setup, or a pipe for adding global state), tell me which area and I'll iterate.
