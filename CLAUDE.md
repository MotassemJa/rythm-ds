# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Rythm is a design system monorepo (NX + npm workspaces). The authoritative spec is `SPEC.md` — read it before making architecture or token decisions. The project is at v0.1 (foundation milestone; no code scaffolded yet as of initial setup).

## Commands

```bash
# First-time setup — tokens must build before anything else
npm install
npm run build:tokens

# Dev (Stencil watch + Storybook)
npm run dev

# Per-package NX targets
npx nx build tokens           # Run Style Dictionary pipeline
npx nx build core             # Build Stencil web components
npx nx test core              # Jest unit tests
npx nx test core --watch      # Watch mode
npx nx e2e core-e2e           # Playwright a11y / e2e
npx nx lint core              # ESLint + Stylelint
npx nx storybook docs         # Dev Storybook

# CI mode — only affected packages
npx nx affected --target=build
npx nx affected --target=test

# Scaffold a new atom component
npx nx g @rythm-ds/tools:component --name=<name> --level=atom
```

## Architecture

### Package Build Order

Strict dependency chain — earlier packages must be built first:

```
@rythm-ds/tokens → @rythm-ds/core → react / vue / angular wrappers → apps/docs
```

### Design Tokens (`packages/tokens`)

Three-tier hierarchy: **Primitive → Semantic → Component**. Style Dictionary 4 transforms source JSON/TS into CSS custom properties, ES modules, and SCSS under `dist/tokens/`. Component CSS must only reference token custom properties — never raw values.

### Web Components (`packages/core`)

StencilJS 4 with Shadow DOM (`mode: 'open'` — required for a11y tooling). Each component is self-contained in `src/components/atoms/rythm-{name}/` with `.tsx`, `.css`, `.spec.ts`, and `.stories.ts`. Stencil output targets auto-generate the React, Vue, and Angular proxy wrappers — do not hand-edit those generated files.

### Sound Engine (`packages/core/src/sounds`)

Web Audio API synthesis at runtime (no audio files bundled). `engine.ts` owns the AudioContext; `sounds.ts` defines named sound specs (tone, frequency, ADSR envelope); `registry.ts` maps interaction types to sounds. Components emit custom events that the registry subscribes to. Sounds are automatically disabled when `prefers-reduced-motion: reduce` is detected.

### Theming

CSS custom properties scoped to `[data-theme="dark"]` on any ancestor element. System preference fallback via `@media (prefers-color-scheme: dark)`. Runtime JS API lives in `@rythm-ds/core`: `RythmTheme.set('dark')` / `.toggle()` / `.get()`.

## Component Standards

Every atom must:
- Reference only design token CSS custom properties — no raw hex/px/rem values inline
- Use Shadow DOM `mode: 'open'`
- Pass axe-core audit with zero violations (enforced in Jest — hard requirement)
- Support full keyboard interaction per ARIA APG
- Expose public API exclusively via `@Prop`, `@Event`, `@Method`
- Emit interaction events the sound registry can subscribe to
- `console.warn` (not throw) when `icon-only` is used without `aria-label` on the host

## Testing

- Unit + axe-core: `npx nx test core` — zero a11y violations enforced
- Keyboard/e2e flows: `npx nx e2e core-e2e`
- Token contrast validation runs as part of the token build

## Releasing

Lockstep versioning across all `@rythm-ds/*` packages via **Changesets**. Release pipeline triggers on push to `main`: bump versions → publish to npm → deploy Storybook to GitHub Pages → create GitHub Release.
