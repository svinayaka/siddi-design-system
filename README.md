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
import { ColorPrimary500, Space4, BgSurface, TextPrimary } from '@svinayaka/siddi-design-system/tokens';
```

---

## Color Token Scales

The system provides literal color primitives and semantic intent scales across steps `50`–`950`:

| Palette | Primitive Variable | Semantic Role | Role Variable |
| :--- | :--- | :--- | :--- |
| **Slate** | `--ksv-ds-color-slate-*` | Neutral | `--ksv-ds-color-neutral-*` |
| **Indigo** | `--ksv-ds-color-indigo-*` | Primary (Brand) | `--ksv-ds-color-primary-*` |
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

