# Siddi Design System

A lightweight, framework-agnostic CSS design system built on CSS Custom Properties (`--ksv-ds-*`).

---

## Installation

Configure npm for the `@svinayaka` GitHub Packages registry and install:

```bash
npm config set @svinayaka:registry https://npm.pkg.github.com
npm install @svinayaka/siddi-design-system
```

---

## Quickstart

### 1. Import Styles

```css
/* Import full design system */
@import "@svinayaka/siddi-design-system";

/* Or import individual modules */
@import "@svinayaka/siddi-design-system/colors";
@import "@svinayaka/siddi-design-system/spacing";
@import "@svinayaka/siddi-design-system/typography";
@import "@svinayaka/siddi-design-system/dark";
```

### 2. JavaScript / TypeScript Tokens

```typescript
// Import semantic theme tokens (adapt to light/dark mode)
import { BgSurface, TextPrimary, InteractivePrimary } from '@svinayaka/siddi-design-system/tokens';

// Import primitive color tokens (for charts, data-viz, custom tags)
import { ColorIndigo500, ColorRose500, ColorEmerald500, Space4 } from '@svinayaka/siddi-design-system/tokens';
```

---

## Token Architecture & Usage Guidance

The Siddi Design System provides two layers of tokens depending on your use case:

1. **Semantic Tokens** (`--ksv-ds-bg-*`, `--ksv-ds-text-*`, `--ksv-ds-interactive-*`):
   - **Best for**: Standard application UI, surfaces, cards, buttons, text, inputs, borders.
   - **Benefit**: Automatically adapt across Light and Dark themes.

2. **Primitive Palette Tokens** (`--ksv-ds-color-slate-*`, `--ksv-ds-color-rose-*`, etc.):
   - **Best for**: Charts, data visualizations, multi-color category badges/tags, user avatars, illustrations, and non-themed decorative elements.
   - **Benefit**: Retain their exact specified color shade regardless of active theme.

### Color Scales (Steps 50–950)

| Palette | Primitive Variable | Semantic Role | Role Variable |
| :--- | :--- | :--- | :--- |
| **Slate** | `--ksv-ds-color-slate-*` | Neutral | `--ksv-ds-color-neutral-*` |
| **Indigo** | `--ksv-ds-color-indigo-*` | Primary (Brand) | `--ksv-ds-color-primary-*` |
| **Violet** | `--ksv-ds-color-violet-*` | (Decorative / Accent) | — |
| **Cyan** | `--ksv-ds-color-cyan-*` | Accent | `--ksv-ds-color-accent-*` |
| **Emerald** | `--ksv-ds-color-emerald-*` | Success | `--ksv-ds-color-success-*` |
| **Amber** | `--ksv-ds-color-amber-*` | Warning | `--ksv-ds-color-warning-*` |
| **Rose** | `--ksv-ds-color-rose-*` | Danger | `--ksv-ds-color-danger-*` |
| **Sky** | `--ksv-ds-color-sky-*` | Info | `--ksv-ds-color-info-*` |

---

## Theme Switching

The system defaults to the user's OS preference (`prefers-color-scheme`). You can override it on the `<html>` tag:

```html
<!-- Force Light Mode -->
<html data-ksv-ds-theme="light">

<!-- Force Dark Mode -->
<html data-ksv-ds-theme="dark">
```

```javascript
// Toggle via JavaScript
document.documentElement.dataset.ksvDsTheme = 'dark'; // Set theme
delete document.documentElement.dataset.ksvDsTheme;   // Reset to auto
```

---

## License

MIT © [Siddhi Vinayaka](https://github.com/svinayaka)

