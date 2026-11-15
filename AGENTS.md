# AGENTS.md

Rules for working in this repository. Read this file before making any changes.

## General

- Use ReactJS with TypeScript and Vite.
- Use only already installed packages — check `package.json` before adding any dependency.
- Keep the existing layered folder structure (feature-sliced style): `app/`, `pages/`, `widgets/`, `features/`, `entities/`, `shared/`, plus `assets/` at the `src/` root.

## File & folder structure

- One component per folder, named after the component: `ComponentName/ComponentName.tsx`, `ComponentName.scss`, `index.ts` (barrel export).
- Pages live in `src/pages/<Name>Page/` and must be registered in `src/app/router/routes.ts`.
- Widgets own composite UI blocks (`Header/`, `Footer/`, …); their sub-components go in `components/<SubName>/` inside the widget folder.
- Features are split into `model/` (slices, hooks) and `ui/` (components) — see `features/cart` and `features/favourites`.
- Entities are split into `model/` (types, data, slices) and `ui/` (reusable entity components) — see `entities/product`.
- `shared/` holds cross-cutting code only: `ui/`, `lib/`, `types/`, `config/`, `styles/`. Do not put feature- or page-specific code there.
- Typed Redux hooks (`useAppDispatch`, `useAppSelector`) live in `src/app/hooks/` — the only `app/` module that lower layers may import. Never import `app/store`, `app/router`, or `app/providers` from lower layers; use the typed hooks instead.
- SCSS partials in `shared/styles/` use the `_name.scss` prefix; `main.scss` is the single entry point.
- Do not import upward across layers. This is enforced by ESLint (`no-restricted-imports` in `eslint.config.js`) — do not work around it; restructure the code instead. Allowed direction: `shared` ← `entities` ← `features` ← `widgets` ← `pages` ← `app`.
- Feature slices should not import each other. The single exception is composition components that wire entity UI to feature state (e.g. `features/product-card/ConnectedProductCard`) — keep such cross-feature imports centralized in one component.
- Entity UI components must stay presentational: no Redux, store, or feature imports — receive data and callbacks via props.
- `structure.txt` contains the full folder map — consult it when adding new folders or restructuring (note: it may lag behind recent changes; the code is the source of truth).

## Naming conventions

- Components: `PascalCase` — folder `ComponentName/`, file `ComponentName.tsx`, styles `ComponentName.scss`, barrel `index.ts`.
- Hooks: `useX.ts`. Redux slices: `xSlice.ts`. Static data: `xData.ts`. Type files: `x.types.ts`.
- SCSS blocks and classes: kebab-case BEM (enforced by stylelint).

## Before finishing any change

1. Reuse before creating — check `shared/ui/`, `shared/lib/`, `shared/types/`, and existing entities/features for something that already does the job.
2. Run `npm run verify` — it must pass with zero errors. It runs Prettier check, ESLint, Stylelint, and the production build.
3. Auto-fix what you can: `npm run lint:fix`, `npm run lint:scss:fix`, `npm run format`.
4. Append an entry to `progress.txt` (see below).

## SCSS / styling

- Import shared styles and design tokens with `@use '../../styles/main' as *;` (adjust the relative depth to the file location).
- Follow BEM methodology:
    - Component name is the root block.
    - `&__element` for block elements.
    - `&--modifier` for element or block modifiers.
    - `&-name` only for compound element names, such as `&-image` or `&-title`.
- Use consistent element naming: `image`, `title`, `description`, `button`, etc.
- Reuse existing SCSS variables and mixins from `shared/styles/` — never hardcode values.
- Do not introduce new design tokens without checking `_variables.scss` first.
- Group styles into clearly labeled sections using `/*** SECTION NAME ***/` comments.
- Keep styles scoped to the component; avoid unnecessary nesting and deeply nested selectors.
- Avoid duplicating styles across components — extract reusable UI patterns into `shared/` when appropriate.
- Keep responsive styles grouped logically and use existing responsive mixins.
- Maintain consistent formatting and ordering of CSS properties.

## Deployment

- Production deploys to GitHub Pages via `.github/workflows/` — it runs on every push to `main`.
- To deploy: commit all changes and `git push origin main`. Do not push to other branches expecting a deploy.
- `vite.config.ts` uses `base: './'` and `HashRouter`; `scripts/copy-404.mjs` copies `index.html` to `404.html` for SPA fallback — keep both intact.

## Progress logging

- After every meaningful change, append one line to `progress.txt` in this format:
  `DD.MM - <short description of what was done>`
- Keep entries chronological; never edit or delete previous entries.
