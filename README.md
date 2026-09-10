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
import { ColorPrimary500, Space4 } from '@svinayaka/siddi-design-system/tokens';
```

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

