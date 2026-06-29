# Forge Installation & Setup

## ⚠️ CRITICAL: Read This When Starting From Scratch ⚠️

This reference covers the complete setup required for a new Forge application. **All steps are mandatory** for proper rendering.

---

## 1. Install Packages

```bash
# Core Forge package (required)
npm install @tylertech/forge

# Extended components (recommended)
npm install @tylertech/forge-extended

# Icons (required for any icons)
npm install @tylertech/tyler-icons
```

---

## 2. Import Forge Styles (REQUIRED)

**The Forge CSS must be imported for components to render correctly.**

```typescript
// In your main entry file (main.ts, index.ts, etc.)
import '@tylertech/forge/dist/forge.css';
```

Or in CSS/SCSS:
```css
@import '@tylertech/forge/dist/forge.css';
```

**What this provides:**
- Component styles
- Design tokens (CSS custom properties)
- Typography classes
- Utility classes

---

## 3. Body Styles (REQUIRED for Full-Page Apps)

**The `<body>` element MUST have these styles for full-page layouts:**

```css
body {
  background-color: var(--forge-theme-surface-dim, #fafafa);
  height: 100dvh;
  width: 100dvw;
  margin: 0;
}
```

**Why:** Without these styles, `forge-scaffold` and `forge-app-layout` will not fill the browser window.

---

## 4. Register Components

### Core Forge Components (@tylertech/forge)

Core components use **definition function imports**:

```typescript
import {
  defineButtonComponent,
  defineTextFieldComponent,
  defineSelectComponent,
  defineIconComponent,
  defineDialogComponent,
  defineScaffoldComponent,
  defineToolbarComponent,
  // ... import what you need
} from '@tylertech/forge';

// Call each definition function to register the component
defineButtonComponent();
defineTextFieldComponent();
defineSelectComponent();
defineIconComponent();
defineDialogComponent();
defineScaffoldComponent();
defineToolbarComponent();
```

**Or register all components at once (larger bundle size):**

```typescript
import { defineComponents } from '@tylertech/forge';
defineComponents();
```

### Extended Components (@tylertech/forge-extended)

Extended components use **side-effect imports**:

```typescript
// Each import registers the component automatically
import '@tylertech/forge-extended/app-layout';
import '@tylertech/forge-extended/structured-card';
import '@tylertech/forge-extended/user-profile';
import '@tylertech/forge-extended/busy-indicator';
import '@tylertech/forge-extended/confirmation-dialog';
```

**⚠️ CRITICAL:** Extended components do NOT have definition functions. Always use side-effect imports.

---

## 5. Register Icons

**Icons MUST be registered before use.**

```typescript
// ✅ CORRECT - import from @tylertech/tyler-icons (NO SUBPATHS)
import { tylIconHome, tylIconSettings, tylIconClose, tylIconMenu } from '@tylertech/tyler-icons';
import { IconRegistry } from '@tylertech/forge';

// Register icons
IconRegistry.define([tylIconHome, tylIconSettings, tylIconClose, tylIconMenu]);
```

**⚠️ NEVER import from subpaths like `/standard` - they DO NOT EXIST:**
```typescript
// ❌ WRONG - these paths DO NOT EXIST
import { tylIconHome } from '@tylertech/tyler-icons/standard';  // DOES NOT EXIST
```

---

## 6. Typography Setup

Typography classes are included in `forge.css`. Use them directly:

```html
<h1 class="text-heading5">Page Title</h1>
<h2 class="text-heading4">Section Title</h2>
<h3 class="text-heading3">Card Title</h3>
<p class="text-body1">Body text</p>
<span class="text-label1">Label text</span>
```

**Scale reference:** `text-heading1` (smallest) → `text-heading5` (largest)

---

## Complete Setup Example

```typescript
// main.ts - Complete setup for a new Forge app

// 1. Import Forge styles
import '@tylertech/forge/dist/forge.css';

// 2. Import and register core components
import {
  defineButtonComponent,
  defineIconComponent,
  defineTextFieldComponent,
  defineSelectComponent,
  defineDialogComponent,
  defineScaffoldComponent,
  defineToolbarComponent,
  defineListComponent,
  defineListItemComponent,
  defineDrawerComponent,
  IconRegistry
} from '@tylertech/forge';

defineButtonComponent();
defineIconComponent();
defineTextFieldComponent();
defineSelectComponent();
defineDialogComponent();
defineScaffoldComponent();
defineToolbarComponent();
defineListComponent();
defineListItemComponent();
defineDrawerComponent();

// 3. Import extended components (side-effect imports)
import '@tylertech/forge-extended/app-layout';
import '@tylertech/forge-extended/structured-card';

// 4. Register icons
import {
  tylIconMenu,
  tylIconHome,
  tylIconSettings,
  tylIconClose,
  tylIconSearch
} from '@tylertech/tyler-icons';

IconRegistry.define([tylIconMenu, tylIconHome, tylIconSettings, tylIconClose, tylIconSearch]);
```

```css
/* styles.css - Required body styles */
body {
  background-color: var(--forge-theme-surface-dim, #fafafa);
  height: 100dvh;
  width: 100dvw;
  margin: 0;
}
```

---

## Framework-Specific Notes

### Angular
- Use `@tylertech/forge-angular` for Angular-wrapped components
- Import modules like `ForgeButtonModule`, `ForgeTextFieldModule`

### React
- Use `@tylertech/forge-react` for React-wrapped components
- Components are capitalized: `<ForgeButton>`, `<ForgeTextField>`

---

## Checklist

Before your app will render correctly, verify:

- [ ] `@tylertech/forge/dist/forge.css` is imported
- [ ] Body styles are set (height, width, margin, background-color)
- [ ] Core components are registered via definition functions
- [ ] Extended components are imported via side-effect imports
- [ ] Icons are registered via `IconRegistry.define()`
