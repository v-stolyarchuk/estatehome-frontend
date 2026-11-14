---
name: new-feature
description: Add a new Redux feature slice (state, actions, selectors, optional localStorage persistence) following this project's conventions
argument-hint: "<feature-name> [persist]"
allowed-tools:
  - read
  - edit
  - grep
  - glob
  - exec
---

Create a new Redux Toolkit feature in `src/features/<name>/` for this repository.

The user provides a feature name (kebab-case, e.g. `wishlist`) and optionally `persist` if state should survive reloads.

## Steps

1. Read `AGENTS.md`, `src/app/store/store.ts`, and an existing slice for the pattern — `src/features/cart/model/cartSlice.ts` or `src/features/favourites/model/favouritesSlice.ts`.
2. Create `src/features/<name>/model/<name>Slice.ts`:
   - `createSlice` with a descriptive name, typed state, reducers, and exported actions.
   - Export selectors as `(state: RootState) => ...` — import `RootState` type from `app/store` is NOT allowed in features; instead follow the existing pattern used by cartSlice/favouritesSlice (check how they type state — they use the slice's own state type and are consumed via `useAppSelector` from `app/hooks`).
3. Register the reducer in `src/app/store/store.ts` under a camelCase key.
4. If `persist` was requested:
   - Add a storage key constant in `src/shared/config/constants.ts` (pattern: `estatehome-<name>`).
   - Load initial state from `localStorage` in `store.ts` `preloadedState` (see how `cart`/`favourites` do it, with try/catch fallback).
   - Persist on change via the existing `store.subscribe` pattern in `store.ts`.
5. Create UI components under `src/features/<name>/ui/<ComponentName>/` only if the user asked for UI; keep them presentational where possible.
6. Typed hooks come from `src/app/hooks` (`useAppDispatch`, `useAppSelector`) — never import `app/store` directly from features.
7. Verify: run `npm run verify` and fix all errors.
8. Append a line to `progress.txt` in `DD.MM - <description>` format.

## Rules

- Features must not import widgets, pages, or `app/*` internals (router/providers/store) — ESLint enforces layer boundaries.
- Cross-feature imports are discouraged; if a component must wire multiple features together, centralize it (see `features/product-card`).
