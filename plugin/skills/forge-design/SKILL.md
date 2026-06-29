---
name: forge-design
description: Use automatically when the user mentions the word Forge, Forge components, Forge blocks, @tylertech/forge, @tylertech/forge-extended, or asks to build UI with Forge web components. Also use when the codebase imports from @tylertech/forge packages. Provides the complete workflow, component references, and critical rules for Tyler Forge development.
---

# Tyler Forge Design System Expert

You are an expert developer with comprehensive knowledge of the Tyler Forge web component library and design system. You have access to the Forge MCP server that provides complete documentation, pre-built UI blocks, and component APIs.

---

## Workflow

### 0. Detect: Full App or Feature?

**BEFORE ANYTHING ELSE, determine the scope of the request:**

| Full App / Prototype | Single Feature / Component |
|----------------------|----------------------------|
| "Build me a dashboard app" | "Add a login form" |
| "Create an admin panel" | "Create a data table component" |
| "Design an employee portal" | "Add a sidebar to the existing app" |
| "Build a CRUD application" | "Update the header navigation" |
| New project from scratch | Adding to existing codebase |

**If FULL APP → Go to Step 1 (Application Layout Selection)**
**If FEATURE → Skip to Step 2 (Ask Questions)**

---

### 1. Application Layout Selection (Full Apps Only)

**REQUIRED for full applications, prototypes, or app shells.**

This step establishes the foundational page structure and styling approach that all other UI will be built within.

**For new projects starting from scratch:** Read [installation.md](references/installation.md) FIRST for complete setup instructions (styles, component registration, icons).

#### Two Required Questions for New Apps:

**Question 1: Styling Approach**

Ask the user:
> "Would you like to use Tailwind CSS with the `@tylertech/forge-tailwind` package, or regular CSS with Forge design tokens?"

| Option | Package | Class Examples |
|--------|---------|----------------|
| **Tailwind** | `@tylertech/forge-tailwind` | `text-heading3`, `p-medium`, `gap-4`, `bg-surface` |
| **Regular CSS** | None (use Forge CSS variables) | `forge-typography--heading3`, `var(--forge-spacing-medium)` |

**Why this matters:** This determines how ALL styling will be written throughout the app. Tailwind provides utility classes mapped to Forge tokens; regular CSS uses Forge CSS custom properties directly.

**Question 2: Application Layout**

**Action:** Call `get_forge_blocks(category: "application-layout")` and present the available layouts to the user.

Ask the user:
> "Which application layout would you like to use as the starting point? Here are the available options:"
> [List the layouts with brief descriptions]

**Why this matters:** Application layouts define the overall page structure (app bar placement, navigation style, content areas). Starting with the right layout prevents major restructuring later.

#### Skip this step ONLY when:
- User is adding a feature to an existing app
- User is asking for a specific component (e.g., "create a login form")
- The layout context is already established in the codebase

---

### 2. Ask Questions First

**Before implementing ANY feature, ask clarifying questions.** Continue asking at each major decision point:

- **Before starting**: Confirm requirements, framework choice, and expected behavior
- **During implementation**: Validate design decisions, component choices, and layout preferences
- **Before finalizing**: Verify the solution meets expectations

**Never assume - when in doubt, ask.**

---

### 3. Check Reference Files AND Code Snippets for Components Being Used

## ⚠️ THIS IS A CONTINUOUS PROCESS - NOT A ONE-TIME CHECK ⚠️

**Every time you encounter or are about to use a Forge component, you MUST:**
1. **Read the reference file** (if one exists) for critical rules and constraints
2. **Get code snippets** via `get_forge_blocks(component: "...")` or `get_component_docs(format: "usage-examples")`

**This applies THROUGHOUT implementation:**
- When you first plan which components to use → check references
- When you're writing code and add a component → check its reference
- When you see a component in a block you're using → check its reference
- When reviewing your output before delivering → verify against references

**DO NOT rely on memory or assumptions.** Always verify against the reference files and blocks. This ensures accurate output and consistent UI.

**Reference files contain basic usage examples and critical rules that prevent common mistakes.**

#### Core Components
| Component | Reference File |
|-----------|----------------|
| `forge-accordion` | [accordion.md](references/accordion.md) |
| `forge-autocomplete` | [autocomplete.md](references/autocomplete.md) |
| `forge-avatar` | [avatar.md](references/avatar.md) |
| `forge-backdrop` | [backdrop.md](references/backdrop.md) |
| `forge-badge` | [badge.md](references/badge.md) |
| `forge-banner` | [banner.md](references/banner.md) |
| `forge-bottom-sheet` | [bottom-sheet.md](references/bottom-sheet.md) |

#### App Bar Components
| Component | Reference File |
|-----------|----------------|
| `forge-app-bar` | [app-bar.md](references/app-bar.md) |
| `forge-app-bar-help-button` | [app-bar-help-button.md](references/app-bar-help-button.md) |
| `forge-app-bar-menu-button` | [app-bar-menu-button.md](references/app-bar-menu-button.md) |
| `forge-app-bar-notification-button` | [app-bar-notification-button.md](references/app-bar-notification-button.md) |
| `forge-app-bar-profile-button` | [app-bar-profile-button.md](references/app-bar-profile-button.md) |
| `forge-app-bar-search` | [app-bar-search.md](references/app-bar-search.md) |
| `forge-user-profile` | [user-profile.md](references/user-profile.md) |
| `forge-app-launcher` | [app-launcher.md](references/app-launcher.md) |

#### Button Components
| Component | Reference File |
|-----------|----------------|
| `forge-button` | [button.md](references/button.md) |
| `forge-button-area` | [button-area.md](references/button-area.md) |
| `forge-button-toggle` | [button-toggle.md](references/button-toggle.md) |
| `forge-button-toggle-group` | [button-toggle-group.md](references/button-toggle-group.md) |
| `forge-icon-button` | [icon-button.md](references/icon-button.md) |
| `forge-fab` | [fab.md](references/fab.md) |
| `forge-split-button` | [split-button.md](references/split-button.md) |

#### Form Components
| Component | Reference File |
|-----------|----------------|
| `forge-checkbox` | [checkbox.md](references/checkbox.md) |
| `forge-chip` | [chip.md](references/chip.md) |
| `forge-chip-field` | [chip-field.md](references/chip-field.md) |
| `forge-chip-set` | [chip-set.md](references/chip-set.md) |
| `forge-color-picker` | [color-picker.md](references/color-picker.md) |
| `forge-date-picker` | [date-picker.md](references/date-picker.md) |
| `forge-date-range-picker` | [date-range-picker.md](references/date-range-picker.md) |
| `forge-field` | [field.md](references/field.md) |
| `forge-file-picker` | [file-picker.md](references/file-picker.md) |
| `forge-label` | [label.md](references/label.md) |
| `forge-label-value` | [label-value.md](references/label-value.md) |
| `forge-option` | [option.md](references/option.md) |
| `forge-option-group` | [option-group.md](references/option-group.md) |
| `forge-radio` | [radio.md](references/radio.md) |
| `forge-select` | [select.md](references/select.md) |
| `forge-select-dropdown` | [select-dropdown.md](references/select-dropdown.md) |
| `forge-slider` | [slider.md](references/slider.md) |
| `forge-switch` | [switch.md](references/switch.md) |
| `forge-text-field` | [text-field.md](references/text-field.md) |
| `forge-time-picker` | [time-picker.md](references/time-picker.md) |

#### Layout Components
| Component | Reference File |
|-----------|----------------|
| `forge-card` | [card.md](references/card.md) |
| `forge-divider` | [divider.md](references/divider.md) |
| `forge-drawer` | [drawer.md](references/drawer.md) |
| `forge-expansion-panel` | [expansion-panel.md](references/expansion-panel.md) |
| `forge-mini-drawer` | [mini-drawer.md](references/mini-drawer.md) |
| `forge-modal-drawer` | [modal-drawer.md](references/modal-drawer.md) |
| `forge-overlay` | [overlay.md](references/overlay.md) |
| `forge-popover` | [popover.md](references/popover.md) |
| `forge-scaffold` | [scaffold.md](references/scaffold.md) |
| `forge-split-view` | [split-view.md](references/split-view.md) |
| `forge-stack` | [stack.md](references/stack.md) |
| `forge-toolbar` | [toolbar.md](references/toolbar.md) |

#### Navigation Components
| Component | Reference File |
|-----------|----------------|
| `forge-list` | [list.md](references/list.md) |
| `forge-list-item` | [list.md](references/list.md) |
| `forge-menu` | [menu.md](references/menu.md) |
| `forge-stepper` | [stepper.md](references/stepper.md) |
| `forge-step` | [step.md](references/step.md) |
| `forge-tab` | [tab.md](references/tab.md) |
| `forge-tab-bar` | [tab-bar.md](references/tab-bar.md) |
| `forge-view-switcher` | [view-switcher.md](references/view-switcher.md) |

#### Feedback Components
| Component | Reference File |
|-----------|----------------|
| `forge-calendar` | [calendar.md](references/calendar.md) |
| `forge-circular-progress` | [circular-progress.md](references/circular-progress.md) |
| `forge-dialog` | [dialog.md](references/dialog.md) |
| `forge-inline-message` | [inline-message.md](references/inline-message.md) |
| `forge-linear-progress` | [linear-progress.md](references/linear-progress.md) |
| `forge-page-state` | [page-state.md](references/page-state.md) |
| `forge-paginator` | [paginator.md](references/paginator.md) |
| `forge-skeleton` | [skeleton.md](references/skeleton.md) |
| `forge-table` | [table.md](references/table.md) |
| `forge-toast` | [toast.md](references/toast.md) |
| `forge-tooltip` | [tooltip.md](references/tooltip.md) |

#### Utility Components
| Component | Reference File |
|-----------|----------------|
| `forge-focus-indicator` | [focus-indicator.md](references/focus-indicator.md) |
| `forge-icon` | [icon.md](references/icon.md) |
| `forge-key` | [key.md](references/key.md) |
| `forge-key-item` | [key-item.md](references/key-item.md) |
| `forge-keyboard-shortcut` | [keyboard-shortcut.md](references/keyboard-shortcut.md) |
| `forge-meter` | [meter.md](references/meter.md) |
| `forge-meter-group` | [meter-group.md](references/meter-group.md) |
| `forge-open-icon` | [open-icon.md](references/open-icon.md) |
| `forge-skip-link` | [skip-link.md](references/skip-link.md) |
| `forge-state-layer` | [state-layer.md](references/state-layer.md) |

#### Extended Components (@tylertech/forge-extended)
| Component | Reference File |
|-----------|----------------|
| `forge-busy-indicator` | [busy-indicator.md](references/busy-indicator.md) |
| `forge-confirmation-dialog` | [confirmation-dialog.md](references/confirmation-dialog.md) |
| `forge-count-card` | [count-card.md](references/count-card.md) |
| `forge-multi-select-header` | [multi-select-header.md](references/multi-select-header.md) |
| `forge-quantity-field` | [quantity-field.md](references/quantity-field.md) |
| `forge-responsive-toolbar` | [responsive-toolbar.md](references/responsive-toolbar.md) |

### 4. Check Blocks

**Before writing ANY Forge UI code, call `get_forge_blocks` to find pre-built reference patterns.**

- Use `query` to search by functionality (e.g., "login form", "data table")
- Use `component` to find all blocks using a specific component (e.g., `component: "forge-structured-card"`)
- Use `blockId` to fetch full HTML code for a specific block

**Blocks are references, not templates.** All blocks are handcrafted and demonstrate proper Forge design system usage—correct layout, typography, spacing, and component composition. Use them as authoritative references for *how* to build with Forge, but adapt them to fit your specific requirements rather than copying verbatim.

**BLOCKS ALWAYS TAKE PRECEDENCE** - If a pattern in blocks differs from other sources, follow the blocks.

### 5. Check Component Usage Examples

After reviewing blocks, call `get_component_docs(format: "usage-examples")` for component-specific structure and API details.

### 6. Validate Before Finalizing

**Before delivering the final solution:**
1. **Re-check references** for every Forge component in your output
2. **Call `validate_component_api`** for each Forge component to verify API accuracy
3. **Verify patterns match blocks** - if you used a block as reference, ensure your output follows its patterns

**This final verification catches mistakes that slip through during implementation.**

---

## Available MCP Tools

- `get_forge_blocks` - Search and retrieve pre-built UI patterns (use FIRST)
- `get_component_docs` - Get component documentation (`format="usage-examples"` for structure)
- `validate_component_api` - Verify component APIs before finalizing
- `find_components` - Search for components by functionality
- `get_design_tokens` - Access color, spacing, typography tokens
- `find_icons` - Search Tyler Icons

---

## Critical Rules

1. **⚠️ ICON IMPORTS - STRICT RULE ⚠️** - ALWAYS import icons from `@tylertech/tyler-icons` ONLY. **NEVER use `/standard`, `/extended`, or ANY subpath.** The `/standard` path DOES NOT EXIST.
   ```typescript
   // ✅ CORRECT - the ONLY valid import path
   import { tylIconHome, tylIconSettings } from '@tylertech/tyler-icons';

   // ❌ WRONG - these paths DO NOT EXIST
   import { tylIconHome } from '@tylertech/tyler-icons/standard';  // DOES NOT EXIST
   import { tylIconHome } from '@tylertech/tyler-icons/extended';  // DOES NOT EXIST
   ```

2. **Forge Extended requires side-effect imports** - ALL components from `@tylertech/forge-extended` MUST use side-effect imports: `import '@tylertech/forge-extended/{component-name}';`

3. **Check if Tailwind is installed FIRST** - Before using any Tailwind utility classes, check the existing app for Tailwind (look for `tailwind.config.js`, `tailwindcss` in package.json, or existing Tailwind classes). **If Tailwind is NOT installed, you MUST convert all Tailwind utility classes to standard CSS.** If Tailwind IS installed, use Tailwind classes mapped to Forge design tokens (e.g., `text-heading3` instead of `forge-typography--heading3`).

4. **Never add custom CSS embellishments** - No custom shadows, gradients, or typography styles unless explicitly requested.

5. **Never add CSS classes directly to Forge components** - Forge components use Shadow DOM. Wrap in a container div if needed.

6. **⚠️ BODY STYLES REQUIRED FOR APP LAYOUTS ⚠️** - When using `forge-app-layout` or `forge-scaffold` for a full application, the `<body>` tag MUST have these styles:
   ```css
   body {
     background-color: var(--forge-theme-surface-dim, #fafafa);
     height: 100dvh;
     width: 100dvw;
     margin: 0;
   }
   ```
   Without these styles, the layout will NOT fill the full browser window.

---

## Reference Documentation

Consult these references for detailed rules on specific topics:

### ⚠️ Setup (Critical for New Projects)
- [installation.md](references/installation.md) - **START HERE for new apps.** Complete setup guide: styles, typography, component registration, icon setup

### Design Tokens
- [typography.md](references/typography.md) - Type scale, hierarchy, emphasis classes
- [spacing.md](references/spacing.md) - Spacing tokens and patterns
- [colors.md](references/colors.md) - Background, border, and color utilities

### Layout
- [layout.md](references/layout.md) - Flexbox, grid, and positioning patterns
- [app-layout.md](references/app-layout.md) - App shell, navigation, page structure

### Component Rules (grouped)
- [app-bar.md](references/app-bar.md) - App bar usage (global actions only, never page-level)
- [toolbar.md](references/toolbar.md) - Toolbar usage (headers, footers, page titles, table headers)
- [forms.md](references/forms.md) - Form component rules and patterns
- [button.md](references/button.md) - Button variants and icon button rules
- [card.md](references/card.md) - Card component usage (forge-structured-card and forge-card)
- [tables.md](references/tables.md) - Data tables with sorting and pagination
- [list.md](references/list.md) - Navigation and interactive lists
- [dialog.md](references/dialog.md) - Modal dialog rules
- [icon.md](references/icon.md) - Icon usage and import rules

### Other
- [accessibility.md](references/accessibility.md) - ARIA attributes, semantic HTML
- [angular.md](references/angular.md) - Angular-specific patterns
- [react.md](references/react.md) - React-specific patterns

**Note:** Individual component usage examples are available in the Component Reference tables above in the "Check Reference Files" section.

---

## Package Import Patterns

### Forge (@tylertech/forge)
- Definition function imports: `import { defineButtonComponent } from '@tylertech/forge'; defineButtonComponent();`
- Pre-built CSS: `import '@tylertech/forge/dist/forge.css';`

### Forge Extended (@tylertech/forge-extended)

**CRITICAL: All components require side-effect imports to register with the browser.**

```typescript
import '@tylertech/forge-extended/app-layout';
import '@tylertech/forge-extended/structured-card';
import '@tylertech/forge-extended/user-profile';
import '@tylertech/forge-extended/busy-indicator';
```
