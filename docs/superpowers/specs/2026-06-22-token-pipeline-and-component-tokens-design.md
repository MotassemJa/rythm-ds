# Token pipeline rewrite + component-tier tokens

> Status: approved (design phase) — 2026-06-22

## 1. Motivation

Today, `@rythm-ds/tokens` has two parallel, manually-synced sources of truth:

- `src/tokens/primitives.json` feeds Style Dictionary's `js` platform, producing `dist/tokens.js` / `dist/tokens.d.ts`. Nothing in the repo imports this output.
- `src/css/tokens.css` is hand-authored (CSS Relative Colors, Utopia `clamp()` fluid scales, dark-theme/media-query variants, and a component-tier layer) and is copied verbatim into `dist/tokens.css` by the build script — Style Dictionary never touches it.

The component-tier layer in `tokens.css` defines tokens like `--rythm-button-radius` on `:root`, which means every custom element inherits every component's tokens, not just its own. This already causes a real bug: `checkbox.css` and `radio.css` both reference `--rythm-input-bg`/`--rythm-input-border-width`, tokens that conceptually belong to `<rythm-input>`, only working today because they're global.

This change has two parts:
1. Rebuild the token pipeline so Style Dictionary generates the CSS (all of it — primitives, scales, fluid type/space, themed semantic tokens, and a new component tier), and drop the unused JS/TS output entirely.
2. Within that new pipeline, scope component-tier tokens to their owning custom-element tag instead of `:root`, fixing the leakage bug and filling in gaps (checkbox, radio, avatar, divider, spinner) that exist today.

## 2. Pipeline architecture

### 2.1 Style Dictionary platforms

`style-dictionary.config.ts` drops the `js` platform entirely. A `css` platform is added that **generates** `dist/tokens.css` via a custom format (registered with `StyleDictionary.registerFormat`) — replacing the current `copyFileSync` of a hand-authored file.

### 2.2 Source file organization

Source JSON moves from a single `src/tokens/primitives.json` to a structure matching `SPEC.md` §3's documented (but not-yet-built) layout:

```
packages/tokens/src/
├── base/        # Primitive tier: anchors, font, leading, radius, shadow,
│                #   duration, easing, border-width, fluid type/space scales,
│                #   and the CSS-Relative-Color tonal scales (still intent-free)
├── semantic/    # Semantic tier: surface, text, border, brand, focus-ring
│                #   (each token carries its default + dark-mode value)
└── component/   # Component tier: tag-scoped tokens (one file per component
                 #   is fine, or grouped — implementation detail)
```

`style-dictionary.config.ts`'s `source` glob changes from `src/tokens/*.json` to `src/**/*.json`.

### 2.3 Package exports

`package.json`'s `exports` drops `"."` (the JS entry — confirmed unused anywhere in the repo via grep) and keeps only `"./css": "./dist/tokens.css"`.

## 3. Expressing relative-colors and themes in JSON

Style Dictionary doesn't compute `oklch(from ...)` or `clamp()` math — it transports values as-is — so these remain literal `$value` strings, just authored in JSON instead of hand-written CSS. Two mechanisms make this work without losing the `var()` cascade that CSS Relative Colors depend on:

- **Relative-color scales**: a token like `primary-50` is authored as `"$value": "oklch(from {color.primary} 0.97 calc(c * 0.12) h)"`. With `outputReferences: true` on the CSS format, the embedded `{color.primary}` resolves to `var(--rythm-color-primary)` while the surrounding relative-color math stays literal text — producing the same output as today's hand-written line.
- **Themed semantic tokens** (light default / dark / system-preference fallback): each semantic token gets a `$extensions.rythm.dark` field holding the dark-mode value alongside its default `$value`. The custom format groups all tokens by tier and emits:
  - primitives + scales → `:root` under `@layer rythm.primitives` / `@layer rythm.scales`
  - semantic defaults → `:root`; `$extensions.rythm.dark` values → both `[data-theme="dark"]` and `@media (prefers-color-scheme: dark)` blocks, under `@layer rythm.semantic`
  - component tokens, grouped by a `$extensions.rythm.selector` field (e.g. `"rythm-button"`) → per-tag rules under `@layer rythm.component`

**Risk to validate early in implementation:** whether `outputReferences` resolves *embedded/partial* references inside a larger literal string this way in Style Dictionary 4.1 needs a quick spike before migrating all ~310 lines of existing CSS. If it doesn't work as expected, the fallback is hardcoding the var name as a literal string instead of using `{}` reference syntax for that subset of tokens.

## 4. Component-tier tokens

Tokens are scoped to their owning custom-element tag (`rythm-button { --rythm-button-radius: ...; }`) instead of `:root`, via the `$extensions.rythm.selector` mechanism described above. Components in `packages/core` only ever *reference* these (`var(--rythm-button-radius)`), never define them — the tokens package remains the single place to edit for rebranding. Redundant inline fallbacks in component CSS (`var(--x, var(--fallback))`) are removed, since the tag-selector rule is always present when the component is (the two packages release in lockstep via Changesets).

| Tag | Token(s) | Default | Notes |
|---|---|---|---|
| `rythm-button` | `radius`, `font-weight`, `transition` | unchanged | existing, relocated |
| `rythm-input` | `radius`, `border-width`, `bg`, `border`, `border-hover`, `border-focus`, `border-error` | `border-width` now references new `--rythm-border-width` primitive | existing, relocated |
| `rythm-badge` | `radius`, `font-weight` | unchanged | existing, relocated |
| `rythm-toggle` | `track-radius`, `duration` | unchanged | existing, relocated |
| `rythm-tag` | `radius` | unchanged | existing, relocated |
| `rythm-checkbox` | `bg`, `border-width` | `var(--rythm-color-surface-default)`, `var(--rythm-border-width)` | **new** — own tokens, no longer borrowed from input |
| `rythm-radio` | `bg`, `border-width` | same pattern as checkbox | **new** |
| `rythm-avatar` | `circle-radius`, `square-radius` | `var(--rythm-radius-full)`, `var(--rythm-radius-md)` | **new** — wires up `avatar.css`, which today hardcodes these |
| `rythm-divider` | `color`, `thickness` | `var(--rythm-color-border-default)`, `var(--rythm-border-width)` | **new** — thickness was hardcoded 1px, becomes 1.5px (accepted visual change, see below) |
| `rythm-spinner` | `duration` | `var(--rythm-duration-slow)` | **new** — was hardcoded 0.8s, becomes 350ms (visibly faster spin, accepted visual change) |

New shared primitive: `--rythm-border-width: 1.5px` in `src/base/`. Unifies what was previously two inconsistent hand-set literals (1.5px in input, 1px in divider) into one primitive that input/checkbox/radio/divider all reference.

## 5. Naming consistency

`--space-*` and `--step-*` are the only tokens in the system without the `rythm-` prefix every other token has. They're renamed to `--rythm-space-*` and `--rythm-step-*`. All references across every component `.css` file in `packages/core` are updated accordingly.

## 6. Stencil integration

**Deviation from plan, found during implementation:** this section originally proposed adding `globalStyle: '../tokens/dist/tokens.css'` to `stencil.config.ts`, on the assumption that Stencil's component loader auto-injects `globalStyle` into the consuming document's `<head>`. Verified empirically against a real browser (Stencil 4.43.5) that this is wrong: `globalStyle` is instead adopted as a `CSSStyleSheet` into *each component's shadow root* (`adoptedStyleSheets`), not into the document. Inside a shadow root, `:root` never matches any element (it only matches the document's root element per the CSS Selectors spec), so every `:root`-scoped custom property in this token system silently resolved to nothing — confirmed via `getComputedStyle` returning empty strings and `border-radius: 0px` on a live page.

Since this token architecture depends on `:root`-scoped custom properties cascading through the DOM (including across shadow boundaries via normal inheritance, which only works if something at the real document level actually declares them), the working mechanism is unchanged from before this spec: `stencil.config.ts`'s `www` output target keeps its `copy` entry (`{ src: '../../tokens/dist/tokens.css', dest: 'tokens.css' }`), and `index.html` keeps the manual `<link rel="stylesheet" href="/tokens.css" />`. Consumers of `@rythm-ds/core` still need to link `@rythm-ds/tokens/css` themselves — there is no zero-config auto-wiring.

## 7. SPEC.md amendments

`SPEC.md` currently documents (§3) a `packages/tokens/src/component/` folder and (§4.1) a three-tier hierarchy without describing the tag-scoping mechanism. Both sections need updating to reflect:
- The `base/semantic/component` source folder split as actually implemented (§3)
- That component-tier tokens are scoped per custom-element tag rather than `:root`, and that components only reference (never define) them (§4.1)
- The new `--rythm-border-width` primitive (§4 — wherever the other scale primitives like radius/shadow are listed)

## 8. Verification plan

- Quick spike: confirm `outputReferences` resolves embedded/partial `{}` references inside larger literal strings the way §3 above assumes, before migrating the full file.
- Manually compare the SD-generated `dist/tokens.css` against the structure of today's hand-authored file — confirm every selector/variable/value present today still resolves to the same computed CSS value (modulo the accepted naming/structural changes in this spec).
- `npx nx build tokens && npx nx build core` — pipeline runs end to end, Stencil picks up the new `globalStyle`.
- `npx nx test core` — Jest + axe-core suite stays green; checkbox/radio render identically (same computed values, now sourced from their own tokens instead of input's).
- Manual Storybook/playground pass: dark theme, system-preference fallback, and reduced-motion all still work; confirm the two accepted visual deltas (divider now 1.5px, spinner now spins at 350ms) look acceptable; confirm `tokens.css` loads automatically without the manual `<link>` in `index.html`.
- Grep for any remaining unprefixed `--space-`/`--step-` references to confirm the rename was applied everywhere.
