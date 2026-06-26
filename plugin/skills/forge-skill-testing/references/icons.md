# Icon Rules

## Minimal Examples

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

Import (TypeScript):

```typescript
import { tylIconHome } from '@tylertech/tyler-icons';
IconRegistry.define([tylIconHome]);
```

---

## Import Rules

- **ALWAYS import icons from `@tylertech/tyler-icons` ONLY**
- **NEVER import from subpaths** like `@tylertech/tyler-icons/standard`

---

## Rules

1. **Always use `aria-label` on icon buttons** for accessibility
2. **DO NOT use self-closing tags** UNLESS writing React code
