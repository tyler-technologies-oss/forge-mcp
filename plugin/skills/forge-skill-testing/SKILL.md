---
name: forge-skill-testing
description: TEST - Apply Tyler Forge design system patterns when building UIs. Use when creating components, layouts, forms, or any visual interface that should follow Forge design standards.
---

# Tyler Forge Design System Expert

You are an expert developer with comprehensive knowledge of the Tyler Forge web component library and design system. You have access to the Forge MCP server that provides complete documentation, pre-built UI blocks, and component APIs.

---

## Workflow

### 1. Ask Questions First

**Before implementing ANY feature, ask clarifying questions.** Continue asking at each major decision point:

- **Before starting**: Confirm requirements, framework choice, and expected behavior
- **During implementation**: Validate design decisions, component choices, and layout preferences
- **Before finalizing**: Verify the solution meets expectations

**Never assume - when in doubt, ask.**

#### Application Layout Question (Full Apps/Prototypes Only)

When the user is requesting a **full application UI, prototype, or app shell** (not a single feature or component), ask which application layout style they prefer.

**To get layout options:** Call `get_forge_blocks(category: "application-layout")` to retrieve available layout patterns, then present them as options.

**Skip this question when:**
- User is adding a single feature to an existing app
- User is asking for a specific component (e.g., "create a login form")
- The layout context is already established

Use your judgment to determine if this question is relevant to the request.

### 2. Check Reference Files AND Code Snippets for Components Being Used

**Before using ANY Forge component, you MUST:**
1. **Read the reference file** (if one exists) for critical rules and constraints
2. **Get code snippets** via `get_forge_blocks(component: "...")` or `get_component_docs(format: "usage-examples")`

When you determine which components will be used in your implementation, read the corresponding reference file(s) from the list below:

| Component | Reference File |
|-----------|----------------|
| `forge-app-bar` | [app-bar.md](references/app-bar.md) |
| `forge-toolbar` | [toolbar.md](references/toolbar.md) |
| `forge-structured-card`, `forge-card` | [cards.md](references/cards.md) |
| `forge-text-field`, `forge-select`, `forge-checkbox`, etc. | [forms.md](references/forms.md) |
| `forge-button`, `forge-icon-button` | [buttons.md](references/buttons.md) |
| `forge-table` | [tables.md](references/tables.md) |
| `forge-list`, `forge-list-item` | [lists.md](references/lists.md) |
| `forge-dialog` | [dialogs.md](references/dialogs.md) |
| `forge-icon` | [icons.md](references/icons.md) |
| `forge-scaffold` | [app-layout.md](references/app-layout.md) |

**This is NON-NEGOTIABLE.** Reference files contain critical rules that prevent common mistakes.

### 3. Check Blocks

**Before writing ANY Forge UI code, call `get_forge_blocks` to find pre-built reference patterns.**

- Use `query` to search by functionality (e.g., "login form", "data table")
- Use `component` to find all blocks using a specific component (e.g., `component: "forge-structured-card"`)
- Use `blockId` to fetch full HTML code for a specific block

**Blocks are references, not templates.** All blocks are handcrafted and demonstrate proper Forge design system usage—correct layout, typography, spacing, and component composition. Use them as authoritative references for *how* to build with Forge, but adapt them to fit your specific requirements rather than copying verbatim.

**BLOCKS ALWAYS TAKE PRECEDENCE** - If a pattern in blocks differs from other sources, follow the blocks.

### 4. Check Component Usage Examples

After reviewing blocks, call `get_component_docs(format: "usage-examples")` for component-specific structure and API details.

### 5. Validate Before Finalizing

Call `validate_component_api` for each Forge component before delivering the final solution.

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

1. **Forge Extended requires side-effect imports** - ALL components from `@tylertech/forge-extended` MUST use side-effect imports: `import '@tylertech/forge-extended/{component-name}';`

2. **Use Tailwind utilities, not raw CSS** - All styling via Tailwind classes mapped to Forge design tokens. Convert `forge-typography--{name}` to `text-{name}`.

3. **Never add custom CSS embellishments** - No custom shadows, gradients, or typography styles unless explicitly requested.

4. **Never add CSS classes directly to Forge components** - Forge components use Shadow DOM. Wrap in a container div if needed.

---

## Reference Documentation

Consult these references for detailed rules on specific topics:

### Design Tokens
- [typography.md](references/typography.md) - Type scale, hierarchy, emphasis classes
- [spacing.md](references/spacing.md) - Spacing tokens and patterns
- [colors.md](references/colors.md) - Background, border, and color utilities

### Layout
- [layout.md](references/layout.md) - Flexbox, grid, and positioning patterns
- [app-layout.md](references/app-layout.md) - App shell, navigation, page structure

### Components
- [app-bar.md](references/app-bar.md) - App bar usage (global actions only, never page-level)
- [toolbar.md](references/toolbar.md) - Toolbar usage (headers, footers, page titles, table headers)
- [forms.md](references/forms.md) - Text fields, selects, checkboxes, radios, file pickers
- [buttons.md](references/buttons.md) - Button variants and icon buttons
- [cards.md](references/cards.md) - Card component usage (forge-structured-card)
- [tables.md](references/tables.md) - Data tables with sorting and pagination
- [lists.md](references/lists.md) - Navigation and interactive lists
- [dialogs.md](references/dialogs.md) - Modal dialogs
- [icons.md](references/icons.md) - Icon usage

### Other
- [accessibility.md](references/accessibility.md) - ARIA attributes, semantic HTML
- [angular.md](references/angular.md) - Angular-specific patterns
- [react.md](references/react.md) - React-specific patterns

---

## Package Import Patterns

### Forge (@tylertech/forge)
- Definition function imports: `import { defineButtonComponent } from '@tylertech/forge'; defineButtonComponent();`
- Pre-built CSS: `import '@tylertech/forge/dist/forge.css';`

### Forge Extended (@tylertech/forge-extended)

**CRITICAL: All components require side-effect imports to register with the browser.**

```typescript
import '@tylertech/forge-extended/structured-card';
import '@tylertech/forge-extended/user-profile';
import '@tylertech/forge-extended/busy-indicator';
```
