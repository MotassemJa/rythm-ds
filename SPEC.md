# Rythm Design System — Project Specification

> Version: 0.2.0-draft  
> Author: motassemjalal  
> Repository: github.com/motassemjalal/rythm-ds

---

## 1. Vision

Rythm is a design system that is genuinely **fun to use** — for both developers building with it and end users interacting with it. It treats accessibility not as a constraint but as a first-class feature, and it brings a sense of joy to everyday UI through expressive tokens, purposeful motion, and an optional sound layer inspired by apps like Duolingo.

---

## 2. Tech Stack

| Concern | Technology |
|---|---|
| Monorepo | NX 19+ |
| Component Authoring | StencilJS 4+ |
| Language | TypeScript 5+ |
| Design Tokens | Style Dictionary 4+ |
| Fluid Scales | Utopia (`utopia-core`) |
| Package Manager | npm workspaces |
| Framework Wrappers | React, Vue 3, Angular |
| Documentation | Storybook 8 (web components) |
| Testing | Jest (unit) + Playwright (a11y / e2e) |
| Linting | ESLint + Stylelint |
| CI | GitHub Actions |
| Color Space | OKLCH throughout (primitive, semantic, component tokens) |
| CSS Features | CSS Relative Colors, CSS `clamp()`, `@layer`, `@property`, container queries |
| Layout Strategy | Mobile-first (base styles → `min-width` breakpoints) |

---

## 3. Repository Structure

```
rythm-ds/
├── packages/
│   ├── tokens/                  # Design tokens source + Style Dictionary config
│   │   ├── src/
│   │   │   ├── base/            # Primitive tier: color anchors/scales, fluid type
│   │   │   │                    #   & space, radius, shadow, motion, border-width
│   │   │   ├── semantic/        # Semantic tier: surface, text, border, brand, focus.
│   │   │   │                    #   Dark-mode values live as hidden sibling tokens
│   │   │   │                    #   (`$extensions.rythm.darkRef`), not a themes/ folder
│   │   │   └── component/       # Component tier: tag-scoped tokens (one file per
│   │   │                        #   component), keyed via `$extensions.rythm.selector`
│   │   ├── style-dictionary.config.ts
│   │   └── package.json
│   │
│   ├── core/                    # StencilJS web components (the source of truth)
│   │   ├── src/
│   │   │   ├── components/      # Atomic component tree
│   │   │   │   ├── atoms/
│   │   │   │   ├── molecules/   # (future)
│   │   │   │   └── organisms/   # (future)
│   │   │   ├── sounds/          # Sound engine (Web Audio API)
│   │   │   ├── utils/           # Shared utilities
│   │   │   └── index.ts
│   │   ├── stencil.config.ts
│   │   └── package.json
│   │
│   ├── react/                   # React output target wrapper
│   │   └── package.json
│   │
│   ├── vue/                     # Vue 3 output target wrapper
│   │   └── package.json
│   │
│   └── angular/                 # Angular output target wrapper
│       └── package.json
│
├── apps/
│   ├── docs/                    # Storybook documentation site
│   └── playground/              # Interactive sandbox (static HTML)
│
├── tools/
│   └── generators/              # NX workspace generators (scaffold new component)
│
├── .github/
│   └── workflows/               # CI/CD pipelines
│
├── nx.json
├── package.json                 # Root workspace
├── tsconfig.base.json
└── SPEC.md                      # This file
```

---

## 4. Design Tokens

### 4.1 Token Architecture

Tokens follow a **three-tier hierarchy** managed by Style Dictionary:

```
Primitive → Semantic → Component
```

- **Primitive** tokens are raw values with no intent (e.g., `color.violet.500 = #7C3AED`).
- **Semantic** tokens express intent without specifying UI context (e.g., `color.brand.primary = {color.violet.500}`).
- **Component** tokens scope semantic tokens to a specific component (e.g., `button.background.rest = {color.brand.primary}`).

Component-tier tokens are scoped to their owning custom-element tag rather than `:root` (e.g. `rythm-button { --rythm-button-radius: ...; }`), via a `$extensions.rythm.selector` field on the source token. This keeps a component's tokens from leaking onto every other custom element on the page. Components in `packages/core` only ever *reference* these tokens (`var(--rythm-button-radius)`) — they never define them; the tokens package remains the single place to edit for rebranding.

### 4.2 Output Formats

Style Dictionary produces:

| Format | Output path | Consumer |
|---|---|---|
| CSS custom properties | `dist/tokens/tokens.css` | All browsers via `:root` |
| ES module (JSON) | `dist/tokens/tokens.js` | JS/TS consumers |
| SCSS variables | `dist/tokens/tokens.scss` | SCSS consumers |
| Android XML | `dist/tokens/android/` | Future mobile |
| iOS Swift | `dist/tokens/ios/` | Future mobile |

### 4.3 Color System

All colors are expressed in **OKLCH** — a perceptually uniform color space that ensures equal-lightness steps across hues and safe color manipulation. CSS Relative Colors are used to derive the entire tonal scale from two anchor values, so consumers can rebrand by overriding a single custom property.

#### Brand Anchors

```css
--rythm-color-primary:   oklch(0.6829 0.1241 220.2); /* steel blue */
--rythm-color-secondary: oklch(0.6825 0.184  6.73);  /* warm coral-red */
```

#### Tonal Scale via CSS Relative Colors

Each anchor generates an 11-stop scale (50–950). The entire scale is derived at runtime — no pre-computed hex values. Changing an anchor automatically re-derives all stops.

```css
:root {
  /* Primary tonal scale */
  --rythm-color-primary-50:  oklch(from var(--rythm-color-primary) 0.97 calc(c * 0.12) h);
  --rythm-color-primary-100: oklch(from var(--rythm-color-primary) 0.93 calc(c * 0.22) h);
  --rythm-color-primary-200: oklch(from var(--rythm-color-primary) 0.86 calc(c * 0.42) h);
  --rythm-color-primary-300: oklch(from var(--rythm-color-primary) 0.77 calc(c * 0.62) h);
  --rythm-color-primary-400: oklch(from var(--rythm-color-primary) 0.71 calc(c * 0.82) h);
  --rythm-color-primary-500: oklch(from var(--rythm-color-primary) l c h);          /* anchor */
  --rythm-color-primary-600: oklch(from var(--rythm-color-primary) calc(l - 0.07) c h);
  --rythm-color-primary-700: oklch(from var(--rythm-color-primary) calc(l - 0.15) c h);
  --rythm-color-primary-800: oklch(from var(--rythm-color-primary) calc(l - 0.25) c h);
  --rythm-color-primary-900: oklch(from var(--rythm-color-primary) calc(l - 0.35) c h);
  --rythm-color-primary-950: oklch(from var(--rythm-color-primary) calc(l - 0.44) c h);

  /* Secondary tonal scale (same pattern off --rythm-color-secondary) */
  --rythm-color-secondary-50:  oklch(from var(--rythm-color-secondary) 0.97 calc(c * 0.12) h);
  /* … 100–950 follow the same lightness/chroma offsets … */

  /* Neutral — derived from primary hue, desaturated */
  --rythm-color-neutral-base: oklch(from var(--rythm-color-primary) 0.50 0.006 h);
  --rythm-color-neutral-50:   oklch(from var(--rythm-color-neutral-base) 0.98 calc(c * 0.5) h);
  --rythm-color-neutral-100:  oklch(from var(--rythm-color-neutral-base) 0.94 calc(c * 0.5) h);
  /* … 200–950 … */

  /* Semantic feedback (hue-fixed, not derived from brand) */
  --rythm-color-success: oklch(0.60 0.17 145);  /* green  */
  --rythm-color-warning: oklch(0.72 0.17  72);  /* amber  */
  --rythm-color-error:   oklch(0.58 0.20  25);  /* red    */
  --rythm-color-info:    oklch(0.62 0.14 240);  /* blue   */
}
```

#### Semantic Aliases

Semantic tokens reference tonal stops. Dark theme overrides swap lightness poles.

```
surface.default      → neutral-50    (dark: neutral-950)
surface.subtle       → neutral-100   (dark: neutral-900)
surface.overlay      → neutral-50/92 (dark: neutral-900/92)

text.primary         → neutral-950   (dark: neutral-50)
text.secondary       → neutral-600   (dark: neutral-400)
text.disabled        → neutral-400   (dark: neutral-600)
text.on-brand        → neutral-50

border.default       → neutral-200   (dark: neutral-800)
border.focus         → primary-500

brand.primary        → primary-500   (dark: primary-400)
brand.secondary      → secondary-500 (dark: secondary-400)

feedback.success     → color-success
feedback.warning     → color-warning
feedback.error       → color-error
feedback.info        → color-info
```

#### Contrast Guarantee

The token build step runs a programmatic WCAG contrast check against all semantic pairs using `colorjs.io`. The build **fails** if any text/background pair falls below 4.5:1 (normal text) or 3:1 (UI components).

### 4.4 Spacing Scale

Spacing is **fluid**, generated by [Utopia](https://utopia.fyi/space/calculator/?c=360,18,1.2,1240,20,1.25,5,2,&s=0.75%7C0.5%7C0.25,1.5%7C2%7C3%7C4%7C6,s-l&g=s,l,xl,12). The base unit scales from 18px at 360px viewport to 20px at 1240px. All other steps are multiples of that base. One-up pairs provide smooth transitions across size boundaries and are used for component padding that needs to breathe as the viewport grows.

```css
/* ── Utopia Space Scale ──────────────────────────────────── */
/* viewport: 360px → 1240px  |  base: 18px → 20px           */

/* Individual steps */
--space-3xs: clamp(0.3125rem, 0.3125rem + 0vi,      0.3125rem); /* 5px  (fixed) */
--space-2xs: clamp(0.5625rem, 0.5369rem + 0.1136vi, 0.625rem);  /* 9–10px  */
--space-xs:  clamp(0.875rem,  0.8494rem + 0.1136vi, 0.9375rem); /* 14–15px */
--space-s:   clamp(1.125rem,  1.0739rem + 0.2273vi, 1.25rem);   /* 18–20px */
--space-m:   clamp(1.6875rem, 1.6108rem + 0.3409vi, 1.875rem);  /* 27–30px */
--space-l:   clamp(2.25rem,   2.1477rem + 0.4545vi, 2.5rem);    /* 36–40px */
--space-xl:  clamp(3.375rem,  3.2216rem + 0.6818vi, 3.75rem);   /* 54–60px */
--space-2xl: clamp(4.5rem,    4.2955rem + 0.9091vi, 5rem);      /* 72–80px */
--space-3xl: clamp(6.75rem,   6.4432rem + 1.3636vi, 7.5rem);    /* 108–120px */

/* One-up pairs (smooth cross-step transitions) */
--space-3xs-2xs: clamp(0.3125rem, 0.1847rem + 0.5682vi, 0.625rem);
--space-2xs-xs:  clamp(0.5625rem, 0.4091rem + 0.6818vi, 0.9375rem);
--space-xs-s:    clamp(0.875rem,  0.7216rem + 0.6818vi, 1.25rem);
--space-s-m:     clamp(1.125rem,  0.8182rem + 1.3636vi, 1.875rem);
--space-m-l:     clamp(1.6875rem, 1.3551rem + 1.4773vi, 2.5rem);
--space-l-xl:    clamp(2.25rem,   1.6364rem + 2.7273vi, 3.75rem);
--space-xl-2xl:  clamp(3.375rem,  2.7102rem + 2.9545vi, 5rem);
--space-2xl-3xl: clamp(4.5rem,    3.2727rem + 5.4545vi, 7.5rem);

/* Custom pair */
--space-s-l:     clamp(1.125rem,  0.5625rem + 2.5vi,    2.5rem);
```

> `vi` (viewport inline) is equivalent to `vw` in horizontal writing mode and is preferred as the modern standard.

### 4.5 Typography Scale

Font stack: `"Inter Variable", system-ui, sans-serif`  
Mono stack: `"JetBrains Mono Variable", ui-monospace, monospace`

Type sizes are **fluid**, generated by [Utopia](https://utopia.fyi/type/calculator/?c=360,18,1.2,1240,20,1.25,5,2,&s=0.75%7C0.5%7C0.25,1.5%7C2%7C3%7C4%7C6,s-l&g=s,l,xl,12). The base scales from 18px (minor-third scale 1.2×) at 360px viewport to 20px (major-third scale 1.25×) at 1240px. Each step grows slightly faster at larger viewports, giving headings more visual weight without touching a breakpoint.

```css
/* ── Utopia Type Scale ───────────────────────────────────── */
/* viewport: 360px → 1240px                                  */
/* min base: 18px, scale 1.2  |  max base: 20px, scale 1.25 */

--step--2: clamp(0.7813rem, 0.7736rem + 0.0341vi, 0.8rem);    /* xs   ≈ 12.5–12.8px  */
--step--1: clamp(0.9375rem, 0.9119rem + 0.1136vi, 1rem);       /* sm   ≈ 15–16px      */
--step-0:  clamp(1.125rem,  1.0739rem + 0.2273vi, 1.25rem);    /* base ≈ 18–20px      */
--step-1:  clamp(1.35rem,   1.2631rem + 0.3864vi, 1.5625rem);  /* md   ≈ 21.6–25px    */
--step-2:  clamp(1.62rem,   1.4837rem + 0.6057vi, 1.9531rem);  /* lg   ≈ 25.9–31.2px  */
--step-3:  clamp(1.944rem,  1.7405rem + 0.9044vi, 2.4414rem);  /* xl   ≈ 31.1–39.1px  */
--step-4:  clamp(2.3328rem, 2.0387rem + 1.3072vi, 3.0518rem);  /* 2xl  ≈ 37.3–48.8px  */
--step-5:  clamp(2.7994rem, 2.384rem  + 1.8461vi, 3.8147rem);  /* 3xl  ≈ 44.8–61px    */
```

**Semantic aliases** map steps to intent:

| Token | Step | Role |
|---|---|---|
| `--font-size-xs`   | `--step--2` | Fine print, captions |
| `--font-size-sm`   | `--step--1` | Labels, helper text |
| `--font-size-base` | `--step-0`  | Body copy |
| `--font-size-md`   | `--step-1`  | Lead paragraphs, large labels |
| `--font-size-lg`   | `--step-2`  | Section headings (h3) |
| `--font-size-xl`   | `--step-3`  | Page headings (h2) |
| `--font-size-2xl`  | `--step-4`  | Hero headings (h1) |
| `--font-size-3xl`  | `--step-5`  | Display / marketing |

**Line height** tokens (fixed, not fluid — readability over aesthetics):

```css
--leading-tight:  1.15;   /* headings */
--leading-snug:   1.35;   /* large labels, subheadings */
--leading-normal: 1.5;    /* body copy default */
--leading-relaxed: 1.65;  /* long-form reading */
```

### 4.6 Border Radius Scale

```
radius.none   = 0
radius.sm     = 4px
radius.md     = 8px
radius.lg     = 12px
radius.xl     = 16px
radius.full   = 9999px
```

A single shared hairline primitive, `border-width = 1.5px`, unifies the border widths used by input, checkbox, radio, and divider — previously two inconsistent hand-set literals (1.5px and 1px).

### 4.7 Shadow Scale

```
shadow.sm   = 0 1px 2px oklch(0% 0 0 / 0.06)
shadow.md   = 0 4px 8px oklch(0% 0 0 / 0.10)
shadow.lg   = 0 12px 24px oklch(0% 0 0 / 0.12)
shadow.xl   = 0 24px 48px oklch(0% 0 0 / 0.16)
```

---

## 5. Theming

### 5.1 Mechanism

Themes are applied via a `data-theme` attribute on any ancestor element (typically `<html>`):

```html
<html data-theme="dark">
```

CSS custom properties are scoped to `[data-theme="dark"]`, allowing per-subtree theme overrides (useful for UI regions with explicit inverted surfaces).

### 5.2 System Preference Fallback

```css
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    /* dark token values */
  }
}
```

### 5.3 JavaScript API

```ts
import { RythmTheme } from '@rythm-ds/core';

RythmTheme.set('dark');
RythmTheme.toggle();
RythmTheme.get(); // 'light' | 'dark'
```

---

## 6. Mobile-First Design

### 6.1 Strategy

All component base styles target the smallest supported viewport (360px). Enhancements for larger viewports are layered on with `min-width` media queries. No component should require a specific viewport to be functional.

### 6.2 Breakpoints

Breakpoints are expressed as fluid-aware `em` values (not `px`) so they scale with user font-size preferences:

```css
/* Rythm breakpoint tokens */
--breakpoint-sm:  22.5em;  /* 360px  — xs phone (design floor) */
--breakpoint-md:  48em;    /* 768px  — tablet portrait          */
--breakpoint-lg:  64em;    /* 1024px — tablet landscape / small laptop */
--breakpoint-xl:  77.5em;  /* 1240px — desktop (Utopia max)     */
--breakpoint-2xl: 90em;    /* 1440px — wide desktop             */
```

Usage pattern:

```css
/* ✓ Mobile-first: base is for mobile, expand upward */
.rythm-button {
  width: 100%;
}

@media (min-width: 48em) {
  .rythm-button {
    width: auto;
  }
}
```

### 6.3 Layout Primitives

Rythm ships layout primitives as utility CSS classes (not components) that use modern layout APIs:

| Primitive | CSS | Purpose |
|---|---|---|
| `.stack` | `flex-direction: column` + `gap` | Vertical rhythm between children |
| `.cluster` | `flex-wrap: wrap` + `gap` | Inline group that wraps naturally |
| `.grid` | CSS Grid + `auto-fit` | Responsive equal-column grid |
| `.cover` | Grid centering | Full-height centred content |
| `.sidebar` | Grid with `min()` | Fixed sidebar + fluid main |

### 6.4 Touch Targets

All interactive components enforce a minimum touch target of **44×44px** (exceeding WCAG 2.5.8's 24×24 minimum). On small viewports, hit areas are expanded using `padding` or `::before` pseudo-elements rather than increasing visual size.

### 6.5 Container Queries

Components use `@container` queries where the component's own size matters more than the viewport's:

```css
/* Card adjusts its own layout at 400px wide, not the viewport */
@container (min-width: 25em) {
  .card-inner {
    flex-direction: row;
  }
}
```

Each component that benefits from container queries registers a `container-type: inline-size` on its host element.

---

## 7. Sound System

### 7.1 Philosophy

The sound layer is **optional, non-intrusive, and accessible**. It respects `prefers-reduced-motion` (as a proxy for reduced stimulation) and provides a dedicated API toggle. Sounds are synthesized at runtime using the **Web Audio API** — no audio files to bundle or download.

### 7.2 Architecture

```
packages/core/src/sounds/
├── engine.ts         # Web Audio API context + synthesis primitives
├── sounds.ts         # Named sound definitions (tone, frequency, envelope)
├── registry.ts       # Maps interaction-type → sound
└── index.ts
```

### 7.3 Activation

**Global HTML attribute:**
```html
<html data-rythm-sounds="on">
```

**JavaScript API:**
```ts
import { RythmSounds } from '@rythm-ds/core';

RythmSounds.enable();
RythmSounds.disable();
RythmSounds.isEnabled(); // boolean
```

**Component-level opt-out:**
```html
<rythm-button no-sound>Click me</rythm-button>
```

### 7.4 Sound Vocabulary

| Interaction | Sound Character | Trigger Events |
|---|---|---|
| `click` | Short, satisfying tap (G4 sine, 80ms) | button/link press |
| `toggle-on` | Rising two-note chirp | switch, checkbox check |
| `toggle-off` | Falling two-note chirp | switch, checkbox uncheck |
| `success` | Ascending arpeggio (3 notes) | form submit success, alert success |
| `error` | Low dissonant buzz | form error, alert error |
| `warning` | Mid-range two-tone pulse | alert warning |
| `open` | Soft upward sweep | modal open, dropdown open |
| `close` | Soft downward sweep | modal close, dropdown close |
| `hover` | Ultra-subtle tick (opt-in, off by default) | mouse enter (optional) |

All sounds use an ADSR envelope to avoid clicks and pops.

### 7.5 Accessibility Constraint

When `prefers-reduced-motion: reduce` is active, sounds are **disabled automatically** regardless of the `data-rythm-sounds` attribute.

---

## 8. Component Architecture (Atomic Design)

### 8.1 Methodology

Components follow the **Atomic Design** hierarchy:

```
Atoms → Molecules → Organisms → Templates → Pages
```

Rythm v1 ships **Atoms only**. Future milestones add Molecules and Organisms.

### 8.2 Component File Structure

Each component lives in its own directory:

```
components/atoms/rythm-button/
├── rythm-button.tsx          # StencilJS component
├── rythm-button.css          # Scoped styles (uses CSS custom properties)
├── rythm-button.spec.ts      # Unit + a11y tests
├── rythm-button.stories.ts   # Storybook stories
└── readme.md                 # Auto-generated by Stencil
```

### 8.3 Component Standards

Every component must:

- Expose a stable public API via `@Prop`, `@Event`, `@Method`
- Use Shadow DOM for style encapsulation (mode: `'open'` for a11y tools)
- Consume only design token CSS custom properties — never raw values
- Ship with a `readme.md` (auto-generated)
- Have unit tests covering rendering, props, events
- Have an axe-core accessibility audit in its test suite
- Support keyboard interaction per ARIA Authoring Practices Guide (APG)
- Emit interaction events the sound engine can subscribe to

---

## 9. v1 Atom Components

### 9.1 Component Inventory

| Component | Tag | Description |
|---|---|---|
| Button | `<rythm-button>` | Primary action trigger; variants, sizes, loading, icon support |
| Icon | `<rythm-icon>` | SVG icon renderer from built-in sprite; accessible label |
| Badge | `<rythm-badge>` | Small status indicator; dot variant |
| Input | `<rythm-input>` | Text input; types: text, email, password, search, url, number |
| Checkbox | `<rythm-checkbox>` | Binary selection; indeterminate state |
| Radio | `<rythm-radio>` / `<rythm-radio-group>` | Single selection within a group |
| Toggle | `<rythm-toggle>` | On/off switch |
| Spinner | `<rythm-spinner>` | Loading indicator; size variants |
| Avatar | `<rythm-avatar>` | User representation; image, initials, icon fallback |
| Tag | `<rythm-tag>` | Dismissible label/chip; colour variants |
| Divider | `<rythm-divider>` | Horizontal/vertical separator; optional label |
| Text | `<rythm-text>` | Typographic primitive; maps to semantic HTML (p, span, label, etc.) |

### 9.2 Button — Detailed Spec

```
Props:
  variant   : 'solid' | 'outline' | 'ghost' | 'link'  (default: 'solid')
  color     : 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral'
  size      : 'xs' | 'sm' | 'md' | 'lg' | 'xl'  (default: 'md')
  disabled  : boolean
  loading   : boolean  (renders spinner, sets aria-busy)
  type      : 'button' | 'submit' | 'reset'  (default: 'button')
  href      : string   (renders <a> instead of <button>)
  target    : string   (when href is set)
  icon-start: string   (icon name to show before label)
  icon-end  : string   (icon name to show after label)
  icon-only : boolean  (square button, requires accessible label via aria-label)
  no-sound  : boolean  (suppress sound for this instance)

Events:
  rythmClick: CustomEvent<MouseEvent>

A11y:
  - Native <button> or <a> element inside Shadow DOM
  - loading state sets aria-busy="true" and aria-label="Loading"
  - icon-only requires aria-label on the host element (enforced via console.warn)
  - Meets 4.5:1 contrast ratio in all variants and themes
  - Min touch target 44×44px
```

### 9.3 Input — Detailed Spec

```
Props:
  type        : HTMLInputElement.type subset
  value       : string
  placeholder : string
  label       : string  (renders associated <label>)
  hint        : string  (helper text below input)
  error       : string  (error message; sets aria-invalid + aria-describedby)
  disabled    : boolean
  readonly    : boolean
  required    : boolean
  size        : 'sm' | 'md' | 'lg'
  icon-start  : string
  icon-end    : string
  clearable   : boolean  (renders ×  button when value is set)
  no-sound    : boolean

Events:
  rythmInput  : CustomEvent<string>   (fires on each keystroke)
  rythmChange : CustomEvent<string>   (fires on blur/commit)
  rythmClear  : CustomEvent<void>

A11y:
  - Label linked via htmlFor / id pair inside Shadow DOM
  - Error string populates aria-describedby
  - Required sets aria-required
  - Uses native <input> — no ARIA role override needed
```

---

## 10. Accessibility (WCAG 2.2)

### 10.1 Target Level

**WCAG 2.2 Level AA** across all components.

### 10.2 Requirements Checklist

- [ ] **1.1.1** Non-text content has text alternatives
- [ ] **1.3.1** Info and relationships conveyed through structure
- [ ] **1.3.3** Instructions do not rely solely on sensory characteristics
- [ ] **1.3.5** Identify input purpose (autocomplete attributes)
- [ ] **1.4.1** Color is not the only visual means of conveying information
- [ ] **1.4.3** Text contrast ≥ 4.5:1 (AA)
- [ ] **1.4.4** Text resizable to 200% without loss of content
- [ ] **1.4.11** UI component contrast ≥ 3:1
- [ ] **1.4.12** Text spacing adjustable (no content lost)
- [ ] **1.4.13** Content on hover/focus is dismissible, hoverable, persistent
- [ ] **2.1.1** All functionality available from keyboard
- [ ] **2.1.2** No keyboard traps
- [ ] **2.4.3** Logical focus order
- [ ] **2.4.7** Visible focus indicator
- [ ] **2.4.11** Focus not obscured (WCAG 2.2 new)
- [ ] **2.5.3** Label in name
- [ ] **2.5.8** Target size ≥ 24×24px; recommended 44×44px (WCAG 2.2 new)
- [ ] **3.2.1** No unexpected context change on focus
- [ ] **3.3.1** Error identification
- [ ] **3.3.2** Labels or instructions for inputs
- [ ] **4.1.2** Name, role, value for all UI components
- [ ] **4.1.3** Status messages programmatically determinable

### 10.3 Testing Pipeline

- **axe-core** runs in every component's Jest test suite (zero violations policy)
- **Playwright** e2e suite covers keyboard navigation flows
- **Colour contrast** checked programmatically via `color.js` in the token build
- Manual screen reader testing with VoiceOver (macOS) and NVDA (Windows) before each release

---

## 11. Framework Wrappers (Output Targets)

### 11.1 Stencil Output Target Config

```ts
// packages/core/stencil.config.ts
import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget }   from '@stencil/vue-output-target';
import { angularOutputTarget } from '@stencil/angular-output-target';

export const config: Config = {
  outputTargets: [
    reactOutputTarget({
      outDir: '../react/src/components/',
      customElementsDir: 'dist/components',
    }),
    vueOutputTarget({
      componentCorePackage: '@rythm-ds/core',
      proxiesFile: '../vue/src/components.ts',
    }),
    angularOutputTarget({
      componentCorePackage: '@rythm-ds/core',
      outputType: 'component',
      directivesProxyFile: '../angular/src/directives/proxies.ts',
    }),
    { type: 'dist-custom-elements' },
    { type: 'docs-readme' },
  ],
};
```

### 11.2 Package Names

| Package | npm name |
|---|---|
| Web Components | `@rythm-ds/core` |
| Design Tokens | `@rythm-ds/tokens` |
| React | `@rythm-ds/react` |
| Vue | `@rythm-ds/vue` |
| Angular | `@rythm-ds/angular` |

### 11.3 Usage Example (React)

```tsx
import { RythmButton } from '@rythm-ds/react';

export default function App() {
  return (
    <RythmButton variant="solid" color="primary" onRythmClick={() => alert('clicked!')}>
      Get started
    </RythmButton>
  );
}
```

### 11.4 Usage Example (Vanilla HTML)

```html
<script type="module" src="https://unpkg.com/@rythm-ds/core/dist/rythm/rythm.esm.js"></script>

<html data-theme="dark" data-rythm-sounds="on">
  <body>
    <rythm-button variant="solid" color="primary">Get started</rythm-button>
  </body>
</html>
```

---

## 12. NX Monorepo Configuration

### 12.1 Project Graph

```
@rythm-ds/tokens   (no deps)
       ↓
@rythm-ds/core     (depends on tokens build output)
       ↓
@rythm-ds/react    (depends on core)
@rythm-ds/vue      (depends on core)
@rythm-ds/angular  (depends on core)
       ↓
apps/docs          (depends on react + core)
apps/playground    (depends on core)
```

### 12.2 Key NX Targets

| Target | Command | Description |
|---|---|---|
| `build` | `nx build core` | Build Stencil components |
| `build:tokens` | `nx build tokens` | Run Style Dictionary |
| `test` | `nx test core` | Run Jest |
| `e2e` | `nx e2e core-e2e` | Run Playwright |
| `storybook` | `nx storybook docs` | Dev Storybook |
| `lint` | `nx lint core` | ESLint + Stylelint |
| `generate:component` | `nx g @rythm-ds/tools:component` | Scaffold new component |

### 12.3 Workspace Generator — `generate:component`

Running `nx g @rythm-ds/tools:component --name=button --level=atom` scaffolds:

- `packages/core/src/components/atoms/rythm-{name}/`
- Component `.tsx`, `.css`, `.spec.ts`, `.stories.ts` files
- Registers component in `packages/core/src/index.ts`

---

## 13. CI / CD Pipeline

### 13.1 Pull Request Checks (`.github/workflows/pr.yml`)

1. Install dependencies
2. Build tokens
3. Build core + wrappers (affected only, via `nx affected`)
4. Lint (ESLint + Stylelint)
5. Unit tests + axe-core a11y audit
6. Token contrast validation
7. Storybook build check

### 13.2 Release Pipeline (`.github/workflows/release.yml`)

Triggered on push to `main`:

1. All PR checks
2. Version bump via **Changesets**
3. Publish to npm (scoped `@rythm-ds/*`)
4. Deploy Storybook docs to GitHub Pages
5. Create GitHub Release with changelog

---

## 14. Developer Experience

### 14.1 Getting Started

```bash
git clone https://github.com/motassemjalal/rythm-ds
cd rythm-ds
npm install
npm run build:tokens   # Build design tokens first
npm run dev            # Stencil watch + Storybook
```

### 14.2 Contributing a Component

```bash
# Scaffold a new atom
npx nx g @rythm-ds/tools:component --name=tooltip --level=atom

# Develop with hot reload
npx nx storybook docs

# Run tests
npx nx test core --watch

# Check a11y
npx nx e2e core-e2e
```

### 14.3 Local Token Customization

Consumers can extend tokens without forking:

```css
/* consumer app/global.css — rebrand entire system by overriding two anchors */
:root {
  --rythm-color-primary:   oklch(0.60 0.20 30);   /* your brand hue */
  --rythm-color-secondary: oklch(0.65 0.18 160);  /* your accent */
}
/* All tonal scales (50–950) automatically re-derive via CSS relative colors. */
```

---

## 15. Milestone Roadmap

### v0.1 — Foundation (this milestone)
- [ ] NX monorepo setup
- [ ] Style Dictionary token pipeline
- [ ] Stencil core package with StoryBook
- [ ] Sound engine (Web Audio API)
- [ ] Theme system (CSS custom properties, dark/light)
- [ ] All 12 Atom components
- [ ] React / Vue / Angular wrappers
- [ ] axe-core audit passing for all atoms
- [ ] CI pipeline
- [ ] Published to npm under `@rythm-ds/*`

### v0.2 — Molecules
- Form Field (Label + Input + Hint + Error as a unit)
- Card
- Modal / Dialog (`<dialog>` element)
- Tooltip (`<details>` + Popover API)
- Dropdown Menu (Popover API)
- Alert / Toast

### v0.3 — Organisms
- Navigation Bar
- Data Table
- Form (with built-in validation UX)
- Pagination

### v1.0 — Stable
- Full WCAG 2.2 AA audit report
- Figma token sync (via Tokens Studio)
- Complete Storybook documentation site
- Playground app

---

## 16. Open Questions / Decisions

| # | Question | Decision |
|---|---|---|
| 1 | Icon set source — custom SVGs vs a library (Lucide, Phosphor)? | TBD — start with Lucide for speed, migrate to custom set post-v1 |
| 2 | Should `@rythm-ds/icons` be a separate package? | Yes — allows tree-shaking without depending on core |
| 3 | Server-side rendering strategy for StencilJS? | Hydration via `@stencil/hydrate` — evaluate in v0.2 |
| 4 | Figma variables sync for designers? | Tokens Studio plugin — planned for v1.0 |
| 5 | Versioning strategy — independent per package or lockstep? | Lockstep via Changesets for v0.x; re-evaluate at v1 |
