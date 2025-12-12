# Frontend Styling Architecture

## Overview

This project uses a **CSS Modules + Design Tokens** approach for scalable, maintainable styling.

## Architecture

```
src/styles/
├── base.css          # Global styles, resets, and design system imports
├── variables.css     # CSS custom properties (design tokens)
├── utilities.css     # Reusable utility classes
└── README.md         # This documentation
```

## CSS Modules Strategy

### Component Styles
- **Location**: `src/components/ComponentName/ComponentName.module.css`
- **Usage**: Import as `styles` object and use `styles.className`
- **Scope**: Styles are automatically scoped to the component

```tsx
import styles from './ComponentName.module.css';

<div className={styles.container}>
  <h1 className={styles.title}>Hello</h1>
</div>
```

### Page Styles
- **Location**: `src/pages/PageName/PageName.module.css`
- **Usage**: Same as component styles
- **Scope**: Scoped to the page component

## Design Tokens (CSS Variables)

All design values are centralized in `variables.css`:

- **Colors**: `--color-primary`, `--color-text-primary`, etc.
- **Spacing**: `--space-1`, `--space-2`, etc.
- **Typography**: `--font-size-base`, `--font-weight-semibold`, etc.
- **Shadows**: `--shadow-sm`, `--shadow-md`, etc.
- **Borders**: `--radius-md`, etc.

## Utility Classes

Common patterns are available as utility classes in `utilities.css`:

```html
<div className={`${styles.container} flex items-center justify-between padding-4`}>
  <h1 className="text-xl font-bold">Title</h1>
  <button className={`${buttonStyles.btn} margin-left-4`}>Action</button>
</div>
```

## Best Practices

### 1. Use Design Tokens
```css
/* ✅ Good */
.myClass {
  color: var(--color-primary);
  padding: var(--space-4);
  border-radius: var(--radius-md);
}

/* ❌ Avoid */
.myClass {
  color: #2563eb;
  padding: 1rem;
  border-radius: 0.375rem;
}
```

### 2. Prefer CSS Modules Over Utilities
```tsx
/* ✅ Good - Semantic, scoped */
<div className={styles.card}>
  <h3 className={styles.title}>Title</h3>
</div>

/* ⚠️ Acceptable for simple cases */
<div className="flex items-center padding-4">
  <h3 className="text-lg font-semibold">Title</h3>
</div>
```

### 3. Component Structure
```
ComponentName/
├── ComponentName.tsx
├── ComponentName.module.css
└── index.ts (optional)
```

### 4. Responsive Design
Use container queries and mobile-first approach:

```css
.myComponent {
  padding: var(--space-4);
}

@media (max-width: 768px) {
  .myComponent {
    padding: var(--space-2);
  }
}
```

## File Organization

### Global Styles (`src/index.css`)
- Imports the design system
- App-specific global overrides
- Should be minimal

### Component Styles
- One CSS module per component
- Styles specific to that component
- Use design tokens, avoid hardcoded values

### Page Styles
- Layout-specific styles
- Page-level overrides
- Grid layouts, spacing between sections

## Adding New Components

1. Create component directory: `src/components/NewComponent/`
2. Add `NewComponent.tsx` and `NewComponent.module.css`
3. Use design tokens in CSS
4. Export from `src/components/index.ts`

## Dark Mode Support

Design tokens support dark mode via CSS variables. Components automatically adapt when the user prefers dark mode.

```css
@media (prefers-color-scheme: dark) {
  .myComponent {
    background: var(--color-bg-secondary);
    color: var(--color-text-primary);
  }
}
```

## Performance Considerations

- CSS Modules provide automatic tree-shaking
- Minimal global CSS reduces bundle size
- Utility classes are shared and optimized
- Design tokens enable consistent theming

## Migration Guide

When adding styles to existing components:

1. Convert hardcoded values to design tokens
2. Use CSS Modules if not already using them
3. Remove global CSS classes
4. Test responsive behavior
