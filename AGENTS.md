# AGENTS.md

> Guidance and rules for AI Agents creating, modifying, and consuming the **Siddi Design System**.

---

## 1. Project Overview

`siddi-design-system` is a lightweight, framework-agnostic CSS design system built around standard CSS Custom Properties (CSS variables). All tokens use the collision-safe `--ds-` namespace prefix to guarantee isolation in microfrontends, Shadow DOM components, and multi-framework setups.

---

## 2. Directory Structure & Responsibilities

```
siddi-design-system/
├── package.json           # Package definition & export map (with sideEffects: ["*.css", "**/*.css"])
├── AGENTS.md              # AI Agent guidelines (this file)
└── src/
    ├── colors.css         # Primitive color palette (--ds-color-*)
    ├── spacing.css        # Spacing, radii, shadows, z-index, transitions (--ds-space-*, --ds-radius-*, etc.)
    ├── typography.css     # Font families, sizes, weights, line-heights (--ds-font-*, --ds-text-*, etc.)
    ├── breakpoints.css    # Breakpoint and container max-width tokens (--ds-breakpoint-*, --ds-container-*)
    ├── light.css          # Semantic tokens mapped for Light Mode (--ds-bg-*, --ds-text-*, etc.)
    ├── dark.css           # Semantic tokens mapped for Dark Mode
    └── index.css          # Main entrypoint importing all modules + base resets
```

---

## 3. Token Hierarchy & Rules

### Layer 1: Primitive Tokens
- Defined in `colors.css`, `spacing.css`, `typography.css`, `breakpoints.css`.
- Naming format: `--ds-color-{palette}-{step}`, `--ds-space-{n}`, `--ds-text-{size}`, `--ds-radius-{size}`.
- **Rule for Agents**: Do NOT use raw primitive color tokens (e.g. `--ds-color-neutral-900`) directly in component styles when a semantic token is appropriate.

### Layer 2: Semantic Tokens
- Defined in `light.css` and `dark.css`.
- Naming format: `--ds-bg-{role}`, `--ds-text-{role}`, `--ds-border-{role}`, `--ds-interactive-{role}-{state}`, `--ds-status-{type}-{property}`.
- **Rule for Agents**: ALWAYS use semantic tokens for UI components so they automatically adapt between Light and Dark themes.

### Layer 3: System Entrypoint
- `index.css` orchestrates imports and applies global defaults to `html`, `body`, headings, links, and focus rings.

---

## 4. Strict Agent Rules

1. **Always Use the `--ds-` Prefix**: Every token begins with `--ds-` (e.g. `var(--ds-bg-surface)`). Never introduce unprefixed or brand-locked variables.
2. **Never Hardcode Colors**: Never write hex codes (e.g., `#ffffff`, `#1e293b`), `rgb()`, or `hsl()` directly in component CSS. Always reference semantic CSS variables (`var(--ds-bg-surface)`, `var(--ds-text-primary)`, etc.).
3. **Never Break Theme Parity**: If you add a new semantic variable in `src/light.css`, you MUST add the corresponding variable in `src/dark.css`.
4. **Use Spacing Scale**: Use `var(--ds-space-1)` through `var(--ds-space-32)` for paddings, margins, and gaps. Avoid arbitrary pixel values.
5. **Elevation & Focus**: Use `var(--ds-shadow-*)` for card elevations and `var(--ds-focus-ring)` / `var(--ds-focus-ring-danger)` for accessible keyboard focus indicators.
6. **Fluid & Responsive Layouts**: Use container widths (`var(--ds-container-md)`, `var(--ds-container-xl)`) and responsive gutters (`var(--ds-gutter-mobile)`, `var(--ds-gutter-desktop)`).

---

## 5. How to Consume in Projects

### Direct CSS Import
```css
/* In your application entry CSS */
@import "siddi-design-system";
/* Or specific modules */
@import "siddi-design-system/colors";
@import "siddi-design-system/dark";
```

### HTML `<link>` Tag
```html
<link rel="stylesheet" href="node_modules/siddi-design-system/src/index.css">
```

### Theme Switching Mechanism
- **Light Mode**: Default `:root` or `<html data-ds-theme="light">`
- **Dark Mode**: `<html data-ds-theme="dark">` (or `<html data-theme="dark">`) or automatic via `@media (prefers-color-scheme: dark)`

---

## 6. Component Pattern Reference

When generating UI components with this design system, follow these patterns:

### Card Component
```css
.card {
  background-color: var(--ds-bg-surface);
  border: 1px solid var(--ds-border-subtle);
  border-radius: var(--ds-radius-xl);
  padding: var(--ds-space-6);
  box-shadow: var(--ds-shadow-sm);
  color: var(--ds-text-primary);
  transition: var(--ds-transition-normal);
}

.card:hover {
  box-shadow: var(--ds-shadow-md);
  border-color: var(--ds-border-default);
}
```

### Primary Button Component
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--ds-space-2);
  padding: var(--ds-space-2) var(--ds-space-4);
  font-family: var(--ds-font-sans);
  font-size: var(--ds-text-sm);
  font-weight: var(--ds-font-weight-medium);
  border-radius: var(--ds-radius-lg);
  background-color: var(--ds-interactive-primary);
  color: var(--ds-interactive-primary-text);
  border: 1px solid transparent;
  cursor: pointer;
  transition: var(--ds-transition-fast);
}

.btn-primary:hover {
  background-color: var(--ds-interactive-primary-hover);
}

.btn-primary:active {
  background-color: var(--ds-interactive-primary-active);
}

.btn-primary:focus-visible {
  box-shadow: var(--ds-focus-ring);
}
```

### Input Field Component
```css
.input {
  width: 100%;
  padding: var(--ds-space-2) var(--ds-space-3);
  font-family: var(--ds-font-sans);
  font-size: var(--ds-text-base);
  background-color: var(--ds-bg-surface);
  color: var(--ds-text-primary);
  border: 1px solid var(--ds-border-default);
  border-radius: var(--ds-radius-md);
  outline: none;
  transition: var(--ds-transition-fast);
}

.input::placeholder {
  color: var(--ds-text-muted);
}

.input:focus {
  border-color: var(--ds-border-focus);
  box-shadow: var(--ds-focus-ring);
}
```
