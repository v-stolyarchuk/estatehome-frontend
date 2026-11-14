---
name: project-review
description: Audit the codebase for overlooked issues after completing a large task — dead code, empty folders, layer violations, stale docs, missing wiring
agent: subagent_explore
triggers:
  - user
  - model
---

Perform a thorough post-task audit of this repository. Read AGENTS.md first, then check:

## Structure

- Empty directories or zero-byte files under src/ (search for them)
- Components created but never imported/mounted anywhere (orphaned UI)
- Files/folders that violate the one-component-per-folder convention
- Barrel index.ts files missing or not exporting what consumers import

## Architecture

- Upward layer imports (shared→entities/features, entities→features, etc.) — ESLint should catch these, but verify manually
- Entity UI components importing Redux/features (must stay presentational)
- Cross-feature imports that aren't centralized in a composition component
- Duplicate UI patterns that should live in shared/ui or shared/lib

## Consistency

- progress.txt has an entry for the recent work
- structure.txt / AGENTS.md still match reality (renamed/removed folders, new layers like app/hooks, features/product-card)
- localStorage keys, route params, and ID types are consistent across slices, pages, and components
- Old references to renamed things (e.g. deleted files still imported, stale class names in SCSS)

## Verification

- Run `npm run verify` — report any failures with file/line references
- Check `git status`/`git diff` for accidental changes outside the task scope

## Output

Report findings grouped by severity: blockers (breaks build/runtime), warnings (tech debt, drift), and suggestions. Include exact file paths. Do not modify anything — this is a read-only audit.
