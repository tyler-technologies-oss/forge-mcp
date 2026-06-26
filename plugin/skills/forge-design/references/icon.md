# Icon

## Basic Usage

Standalone icon:

```html
<forge-icon name="home"></forge-icon>
```

Icon inside a button:

```html
<forge-icon-button aria-label="Go home">
  <forge-icon name="home"></forge-icon>
</forge-icon-button>
```

Use `external` attribute to load icons dynamically (when not pre-registered):

```html
<forge-icon name="settings" external></forge-icon>
```

---

## Import Rules

**CRITICAL: NEVER import from `@tylertech/tyler-icons/standard` or any other subpath.**

```typescript
// CORRECT
import { tylIconHome, tylIconSettings } from '@tylertech/tyler-icons';
IconRegistry.define([tylIconHome, tylIconSettings]);

// WRONG - DO NOT DO THIS
import { tylIconHome } from '@tylertech/tyler-icons/standard'; // NEVER
```

---

## Rules

1. **ALWAYS import icons from `@tylertech/tyler-icons` ONLY** - Never use subpaths like `/standard`, `/extended`, etc.
2. **Always use `aria-label` on icon buttons** for accessibility
3. **DO NOT use self-closing tags** UNLESS writing React code - Use `<forge-icon></forge-icon>` not `<forge-icon />`
4. **Register icons before use** - Call `IconRegistry.define()` with the imported icon definitions
