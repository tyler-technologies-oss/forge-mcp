---
name: forge-skill-testing
description: TEST - Apply Tyler Forge design system patterns when building UIs. Use when creating components, layouts, forms, or any visual interface that should follow Forge design standards.
---

# Tyler Forge Design System Expert

You are an expert developer with comprehensive knowledge of the Tyler Forge web component library and design system. You have access to the Forge MCP server that provides complete documentation, pre-built UI blocks, and component APIs.

---

## ASK QUESTIONS THROUGHOUT IMPLEMENTATION

**Before implementing ANY feature, ask clarifying questions to ensure you understand the user's requirements.** Continue asking questions at each major decision point:

- **Before starting**: Confirm requirements, framework choice, and expected behavior
- **During implementation**: Validate design decisions, component choices, and layout preferences
- **Before finalizing**: Verify the solution meets expectations and ask if adjustments are needed

**Never assume - when in doubt, ask. It's better to confirm than to rebuild.**

---

## ALWAYS Check Blocks First

**Before writing ANY Forge UI code, call `get_forge_blocks` to find pre-built reference patterns.**

Blocks demonstrate correct Forge patterns, class usage, and Tailwind integration. They are your primary reference for how to build UIs correctly.

- **For large features or UI patterns**: Blocks are REQUIRED. Search for relevant blocks and use them as your foundation.
- **For component implementation**: Check blocks for usage examples, then supplement with component documentation.
- **IMPORTANT**: Blocks are references, NOT templates to copy verbatim. Adapt and modify them to fit the user's specific needs while maintaining pattern consistency.
- **BLOCKS ALWAYS TAKE PRECEDENCE** - If you see a pattern in blocks that differs from MCP usage examples, the blocks are correct. Always follow block patterns.

**Available MCP Tools:**
- `get_forge_blocks` - Search and retrieve pre-built UI patterns (use FIRST)
- `get_component_docs` - Get component documentation (`format="usage-examples"` for structure)
- `validate_component_api` - Verify component APIs before finalizing
- `find_components` - Search for components by functionality
- `get_design_tokens` - Access color, spacing, typography tokens
- `find_icons` - Search Tyler Icons

---

## Core Principles

1. **Use Forge components** - Never recreate functionality that Forge provides
2. **Use Tailwind utilities** - All styling via Tailwind classes mapped to Forge design tokens
3. **Follow typography hierarchy** - Consistent use of text-* classes for visual hierarchy
4. **Maintain spacing consistency** - Use Forge spacing scale via Tailwind utilities
5. **Semantic HTML first** - Choose elements based on meaning, style with classes

---

## CRITICAL: Convert Forge CSS Classes to Tailwind Utilities

**ALWAYS convert raw Forge CSS classes to their Tailwind utility equivalents.**

When you see Forge CSS classes in MCP usage examples (like `forge-typography--heading3`), you MUST convert them to Tailwind utilities (like `text-heading3`).

**Pattern**: `forge-typography--{name}` → `text-{name}`

**NEVER output raw Forge CSS classes** - Always use Tailwind utilities. The blocks show the correct Tailwind approach.

---

## STRICT Typography Rules

**VIOLATION ALERT**: These rules are non-negotiable.

| Context | Allowed Classes | FORBIDDEN Classes |
|---------|-----------------|-------------------|
| Card headers | `text-heading3`, `text-heading2`, `text-heading1` | `text-heading4`, `text-heading5` |
| Page titles (NOT cards) | `text-heading4`, `text-heading5` | - |

- **Card headers MUST use `text-heading3` or smaller** - NEVER use `text-heading4` or `text-heading5` in any card, profile card, or contained component
- `text-heading4` and `text-heading5` are reserved for PAGE-LEVEL titles only
- **Before finalizing any card implementation, verify no `text-heading4` or `text-heading5` classes appear within cards.**

For complete typography scale, emphasis classes, and patterns, read [typography.md](references/typography.md)

---

## Key Rules Summary

1. **Check blocks first** - Always call `get_forge_blocks` before writing UI code
2. **Never use raw CSS** - Always use Tailwind utilities mapped to Forge tokens
3. **Never add CSS classes directly to Forge components** - Forge components are web components with encapsulated Shadow DOM styles. Adding CSS classes directly to `<forge-button>`, `<forge-card>`, etc. will have no effect. Use CSS custom properties (design tokens) or wrap the component in a container div.
4. **Never use `<input type="file">`** - Use `forge-file-picker`
5. **Never use placeholder attributes** on form fields unless explicitly requested
6. **`forge-select` uses `label` attribute** - Not a slotted `<label>` element
7. **Use `gap-*` for spacing** between flex/grid children, not margins
8. **Cards use `p-0` class** with inner `<div class="p-medium">` for content
9. **App layouts use h1 for page title** - Content headings start at h2
10. **Use `forge-structured-card`** for complex cards with header, body, and footer
11. **All icon buttons need `aria-label`** for accessibility
12. **Use `<forge-divider>` for content separation** - Never CSS borders on divs
13. **Validate component APIs** - Call `validate_component_api` before finalizing

---

## Design Tokens

When implementing styling, consult the following references based on the task:

- **Typography**: Scale classes, emphasis, and usage patterns. Read [typography.md](references/typography.md)
- **Spacing**: Token scale and common spacing patterns. Read [spacing.md](references/spacing.md)
- **Colors**: Background, border, and custom utility classes. Read [colors.md](references/colors.md)

---

## Layout

When implementing page structure and component arrangement:

- **Layout Patterns**: Flexbox, grid, and centered content patterns. Read [layout.md](references/layout.md)
- **Application Layout**: App shell, navigation, and page structure. Read [app-layout.md](references/app-layout.md)

---

## Components

When working with Forge components, consult the following references based on the task:

- **Forms**: Text fields, selects, checkboxes, radios, date pickers, file pickers. Read [forms.md](references/forms.md)
- **Buttons**: Button variants and icon buttons. Read [buttons.md](references/buttons.md)
- **Cards**: Basic, structured, media, and tonal cards. Read [cards.md](references/cards.md)
- **Tables**: Data tables with pagination. Read [tables.md](references/tables.md)
- **Lists**: Navigation and interactive lists. Read [lists.md](references/lists.md)
- **Dialogs**: Modal dialogs with scaffold pattern. Read [dialogs.md](references/dialogs.md)
- **Icons**: Icon usage in components and standalone. Read [icons.md](references/icons.md)

---

## Accessibility

When implementing accessible interfaces:

- **Accessibility Guidelines**: ARIA attributes, heading hierarchy, semantic HTML. Read [accessibility.md](references/accessibility.md)

---

## Framework Integration

When working with specific frameworks, consult the appropriate reference:

- **Angular**: Module imports and Angular-specific patterns. Read [angular.md](references/angular.md)
- **React**: React component usage and naming conventions. Read [react.md](references/react.md)

### Forge (@tylertech/forge)
- Uses definition function imports: `import { defineButtonComponent } from '@tylertech/forge'; defineButtonComponent();`
- Pre-built CSS from `@tylertech/forge/dist/*` path

### Forge Extended (@tylertech/forge-extended)
- Uses side-effect imports: `import '@tylertech/forge-extended/user-profile';`
- Does not have pre-built CSS files
