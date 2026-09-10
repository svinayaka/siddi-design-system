# AGENTS.md
> Rules and constraints for AI Agents creating or modifying styles and tokens in the **Siddi Design System**.

---

## 1. Core Token Rules

1. **Namespace Prefix**: Every token **must** begin with `--ksv-ds-` (e.g., `var(--ksv-ds-bg-surface)`). Never use raw CSS values or un-prefixed custom properties.
2. **No Hardcoded Colors**: Never write hex codes (`#fff`), `rgb()`, or `hsl()` in component CSS. Always use semantic CSS variables (`var(--ksv-ds-bg-canvas)`, `var(--ksv-ds-text-primary)`, `var(--ksv-ds-interactive-primary)`).
3. **Theme Parity**: When adding a semantic token in `tokens/color/light.json`, you **must** add the matching token in `tokens/color/dark.json`.
4. **Spacing & Radii**: Use the predefined scales (`var(--ksv-ds-space-1)` to `var(--ksv-ds-space-32)` and `var(--ksv-ds-radius-sm)` to `var(--ksv-ds-radius-full)`). Avoid arbitrary pixel numbers.
5. **Theme Override Attribute**: Use `data-ksv-ds-theme="dark"` / `data-ksv-ds-theme="light"` or `element.dataset.ksvDsTheme` in JavaScript.

---

## 2. Component Design Patterns

Use these standard patterns when writing UI components:

### Card
```css
.card {
  background-color: var(--ksv-ds-bg-surface);
  border: 1px solid var(--ksv-ds-border-subtle);
  border-radius: var(--ksv-ds-radius-xl);
  padding: var(--ksv-ds-space-6);
  box-shadow: var(--ksv-ds-shadow-sm);
  color: var(--ksv-ds-text-primary);
  transition: var(--ksv-ds-transition-normal);
}

.card:hover {
  box-shadow: var(--ksv-ds-shadow-md);
  border-color: var(--ksv-ds-border-default);
}
```

### Primary Button
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--ksv-ds-space-2);
  padding: var(--ksv-ds-space-2) var(--ksv-ds-space-4);
  font-family: var(--ksv-ds-font-sans);
  font-size: var(--ksv-ds-text-sm);
  font-weight: var(--ksv-ds-font-weight-medium);
  border-radius: var(--ksv-ds-radius-lg);
  background-color: var(--ksv-ds-interactive-primary);
  color: var(--ksv-ds-interactive-primary-text);
  border: 1px solid transparent;
  cursor: pointer;
  transition: var(--ksv-ds-transition-fast);
}

.btn-primary:hover {
  background-color: var(--ksv-ds-interactive-primary-hover);
}

.btn-primary:focus-visible {
  box-shadow: var(--ksv-ds-focus-ring);
}
```

### Input Field
```css
.input {
  width: 100%;
  padding: var(--ksv-ds-space-2) var(--ksv-ds-space-3);
  font-family: var(--ksv-ds-font-sans);
  font-size: var(--ksv-ds-text-base);
  background-color: var(--ksv-ds-bg-surface);
  color: var(--ksv-ds-text-primary);
  border: 1px solid var(--ksv-ds-border-default);
  border-radius: var(--ksv-ds-radius-md);
  outline: none;
  transition: var(--ksv-ds-transition-fast);
}

.input:focus {
  border-color: var(--ksv-ds-border-focus);
  box-shadow: var(--ksv-ds-focus-ring);
}
```
