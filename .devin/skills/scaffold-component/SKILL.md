---
name: scaffold-component
description: Scaffold a new React component, page, or widget following this project's feature-sliced conventions
argument-hint: "<ComponentName> [page|widget|feature-component]"
allowed-tools:
  - read
  - edit
  - grep
  - glob
  - exec
---

Create a new component in this repository following AGENTS.md and structure.txt.

The user provides a component name and optionally a kind: `page` (default `component`).

## Steps

1. Read `AGENTS.md` and the relevant part of `structure.txt` first.
2. Check `src/shared/ui/`, `src/shared/lib/`, and `src/shared/types/` for existing primitives — reuse them instead of recreating (Button, Input, Badge, PageHero, EmptyState, Modal, Slider, Loader, Icon, formatPrice, formatDate, getInitials, Maybe, WithId).
3. Create the component at the correct layer:
   - Page: `src/pages/<Name>Page/<Name>Page.tsx` + `.scss` + `index.ts`, then register it in `src/app/router/routes.ts`.
   - Widget: `src/widgets/<Name>/<Name>.tsx` + `.scss` + `index.ts`; sub-components go in `components/<SubName>/`.
   - Feature component: inside the relevant `src/features/<slice>/ui/<Name>/` (or `filters/`, `navigation/` for catalog-style features).
   - Entity component: inside `src/entities/<name>/ui/<Name>/` — must stay presentational (no Redux/store/feature imports; data and callbacks via props).
   - Shared primitive: `src/shared/ui/<Name>/` only if it is genuinely cross-cutting.
4. SCSS file: start with `@use '<relative path>/shared/styles/main' as *;`, BEM block named after the component (kebab-case), `/*** SECTION ***/` comments, existing variables/mixins only, responsive mixins `onMobile`/`onTablet`/`onDesktop`.
5. Barrel `index.ts` exporting the component (and its types if any).
6. Verify: run `npm run verify` and fix all errors. Auto-fix with `npm run lint:fix`, `npm run lint:scss:fix`, `npm run format`.
7. Append a line to `progress.txt` in `DD.MM - <description>` format.

## Rules

- Do not import upward across layers (ESLint enforces this).
- Entity UI must not import features, widgets, pages, or app — wire state in feature composition components instead.
- Use only already installed packages.
