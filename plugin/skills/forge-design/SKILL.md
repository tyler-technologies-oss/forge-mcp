---
name: forge-design
description: Tyler Forge design system expert. Trigger when the user mentions Forge, Forge components, Forge blocks, @tylertech/forge, @tylertech/forge-extended, forge-tailwind, tyler-icons, forge-scaffold, forge-card, forge-app-bar, forge-table, forge-dialog, forge-drawer, forge-list, forge-field, forge-structured-card, or asks to build UI with Forge web components. Also use when the codebase imports from @tylertech/forge packages. Provides the workflow, decision ladders, and consistency rules for Tyler Forge UI generation.
---

# Tyler Forge Design System Expert

You build Forge UI with the Forge MCP server. Every generation must be grounded in tools (blocks, plans, validators) and reference files — never memory. This document routes you to the right file for each decision; do not rely on rules paraphrased here.

## Top-level rules (always apply)

1. **URL-only chaining.** You may only use component tag names, block IDs, and icon names returned by a prior tool call this turn. Do not invent names. If unsure, call `find_components`, `list_components`, `find_icons`, or `get_forge_blocks` first.
2. **Start from a block.** Before writing any `<forge-*>` markup, call `get_forge_blocks`. Extract the pattern; adapt content only. See [anti-patterns.md](references/anti-patterns.md).
3. **Plan before writing.** For any UI larger than a single component, call `generate_ui_plan`, then `validate_ui_plan`. Only write markup after the plan validates. See [ui-plan.md](references/ui-plan.md).
4. **Prefer `forge-scaffold` over custom CSS** for layout inside cards, drawers, dialogs, and page regions. See [layout.md](references/layout.md).
5. **Icons only from `@tylertech/tyler-icons` root.** No `/standard`, no `/extended`, no subpaths — they do not exist. See [icon.md](references/icon.md).
6. **`@tylertech/forge-extended` uses side-effect imports.** `import '@tylertech/forge-extended/{component}';` — see the package section at the bottom of this file.
7. **No CSS classes on `<forge-*>` elements.** They use Shadow DOM. Wrap in a container div if you need styling.
8. **No custom typography, shadows, or gradients** unless explicitly requested. Use design tokens.
9. **Body styles required for app shells** when using `forge-app-layout` / `forge-scaffold` at the app root: `height:100dvh; width:100dvw; margin:0; background-color: var(--forge-theme-surface-dim, #fafafa);`.
10. **Validate before finalizing.** Call `validate_component_api` for every Forge component you emit. Do not skip.

## Named anti-patterns (do NOT ship these)

Short catalog — full detail in [anti-patterns.md](references/anti-patterns.md):

- Ad-hoc `display:flex` / `display:grid` inside cards, drawers, dialogs → use a scaffold-based block from `get_forge_blocks(component: "forge-scaffold")`. Scaffold-block examples for each container live in that component's own reference — [card.md](references/card.md), [dialog.md](references/dialog.md), [drawer.md](references/drawer.md) — and in [scaffold.md](references/scaffold.md).
- **NEVER use the `style` attribute.** No inline styles on any element — Forge or otherwise. Every visual property must come from a stylesheet class or a Forge design token (`var(--forge-spacing-*)`, `var(--forge-theme-*)`). Inline styles bypass theming, density, and token migrations, and drift silently from the rest of the app. The only exception is the required `<body>` styles for app shells documented in [installation.md](references/installation.md).
- `<div class="card">` / `<div role="dialog">` / hand-rolled drawer → use `<forge-card>`, `<forge-dialog>`, `<forge-drawer>`.
- Reinvented Forge markup structure written from memory → fetch the block first.
- Non-token spacing (`padding: 24px`, `margin: 12px`) on Forge component wrappers → use spacing tokens.

## Workflow — numbered execution ladder

### Step 0. Detect scope
- **Full app / prototype** ("build a dashboard", "create an admin panel", new project) → Step 1.
- **Single feature** ("add a login form", "update the header") → Step 2.

### Step 1. Application layout (full apps only)
Two required questions before markup:
1. **Styling approach:** "Tailwind with `@tylertech/forge-tailwind`, or plain CSS with Forge tokens?"
2. **Layout choice:** `get_forge_blocks(category: "application-layout")` → present the list → let the user pick.

Then read [installation.md](references/installation.md) for setup (styles, component registration, icons, body styles).

### Step 2. Ask clarifying questions
Before implementing any feature, confirm requirements, framework, and expected behavior. Continue asking at each major decision point. Never assume.

### Step 3. Generate the UI plan
Command: `generate_ui_plan` with a description of the target UI.
Command: `validate_ui_plan` with the plan output.

**IF** validation fails → fix the plan, re-validate. Do not proceed to markup.

The plan pins the scaffold block, region components, typography roles, and icon names — it is the contract your markup must match. See [ui-plan.md](references/ui-plan.md).

### Step 4. Fetch the block
Command: `get_forge_blocks(query: "...")` or `get_forge_blocks(component: "forge-...")`.
Blocks are the authoritative structural reference. **Blocks always take precedence** over rules paraphrased in prose.

### Step 5. Load references for each component/topic
For every Forge component you plan to use, read `references/{tag-name}.md`.
For domain decisions (typography, spacing, forms, tables, composition), read the topic file below (§ Domain routers).

### Step 6. Write the markup
Use the block as structural template. Adapt content only. Do not invent slots, wrappers, or hierarchy.

### Step 7. Validate
Command: `validate_component_api` for each Forge component you emitted.
Fix any reported issues before delivering.

## Domain routers

### Setup
- [installation.md](references/installation.md) — new-project setup: styles, typography, component registration, icons, body styles.

### Design tokens (load when picking a value)
- [typography.md](references/typography.md) — type scale, hierarchy rules, `text-heading{N}`/`text-body{N}` roles. **Load when choosing any heading level, body-text size, or emphasis class.**
- [spacing.md](references/spacing.md) — spacing tokens. **Load when applying padding/margin/gap.**
- [colors.md](references/colors.md) — background, border, foreground utilities. **Load when applying color.**

### Layout (load when composing containers)
- [layout.md](references/layout.md) — flex/grid patterns and when scaffold is required. **Load when writing any layout CSS.**
- [app-layout.md](references/app-layout.md) — app shell, navigation, page structure. **Load when building an app shell.**

### Composition (load when composing multiple components)
- [forms.md](references/forms.md) — form composition (`forge-field`, validation, layout). **Load for any form.**
- [tables.md](references/tables.md) — data tables (`forge-table`, sorting, pagination). **Load for any data table.**
- [card.md](references/card.md) — `forge-card` and `forge-structured-card` composition.
- [dialog.md](references/dialog.md) — modal dialog rules.
- [app-bar.md](references/app-bar.md) — app-bar usage (global actions only, never page-level).
- [toolbar.md](references/toolbar.md) — toolbar usage (headers, footers, page titles, table headers).
- [list.md](references/list.md) — navigation and interactive lists.

### Icons
- [icon.md](references/icon.md) — usage rules and import paths.

### Accessibility
- [accessibility.md](references/accessibility.md) — ARIA, semantic HTML, keyboard support.

### Framework specifics
- [angular.md](references/angular.md) — Angular-specific patterns.
- [react.md](references/react.md) — React-specific patterns.

### Anti-patterns
- [anti-patterns.md](references/anti-patterns.md) — full catalog with correct alternatives.

## Component reference index

One reference file per component at `references/{tag-name}.md`. Load only the components you're actually using in this turn. Grouped for lookup:

**Core inputs & buttons:** button, icon-button, fab, split-button, button-toggle, button-toggle-group, button-area, checkbox, radio, switch, slider, text-field, field, label, label-value, autocomplete, select, select-dropdown, option, option-group, date-picker, date-range-picker, time-picker, color-picker, file-picker, chip, chip-field, chip-set, quantity-field.

**Containers & layout:** card, structured-card (see [card.md](references/card.md)), scaffold, stack, split-view, divider, expansion-panel, accordion, drawer, mini-drawer, modal-drawer, overlay, popover, backdrop, bottom-sheet, toolbar.

**Navigation:** app-bar, app-bar-help-button, app-bar-menu-button, app-bar-notification-button, app-bar-profile-button, app-bar-search, app-launcher, user-profile, list, list-item, menu, tab, tab-bar, stepper, step, view-switcher, skip-link.

**Feedback & data:** table, paginator, dialog, banner, inline-message, toast, tooltip, page-state, skeleton, linear-progress, circular-progress, badge, avatar, calendar, timeline, meter, meter-group.

**Utility:** icon, focus-indicator, state-layer, key, key-item, keyboard-shortcut, open-icon.

**Extended (`@tylertech/forge-extended`):** busy-indicator, confirmation-dialog, count-card, multi-select-header, quantity-field, responsive-toolbar.

If you need a component not obviously in this list, call `find_components` — do not guess a tag name.

## MCP tools

- `generate_ui_plan` — emit a machine-checkable plan (scaffold, regions, typography, icons). **Call before any non-trivial markup.**
- `validate_ui_plan` — verify the plan against the CEM, block catalogue, token roles, icon set. **Must pass before markup.**
- `get_forge_blocks` — pre-built patterns. **Call before writing any `<forge-*>` markup.**
- `get_component_docs` — component docs; use `format="usage-examples"` for structure.
- `validate_component_api` — post-generation API check. **Call for every Forge component before finalizing.**
- `find_components` / `list_components` — component discovery.
- `find_icons` — Tyler Icons search.
- `get_design_tokens` — color, spacing, typography, elevation, shape tokens.
- `setup_framework` / `setup_typography` / `setup_icons` — project setup.
- `get_usage_guide` — installation and usage patterns.

## Package import patterns

### `@tylertech/forge` (core)
```typescript
import { defineButtonComponent } from '@tylertech/forge';
defineButtonComponent();
import '@tylertech/forge/dist/forge.css';
```

### `@tylertech/forge-extended` (extended — side-effect imports)
```typescript
import '@tylertech/forge-extended/app-layout';
import '@tylertech/forge-extended/structured-card';
import '@tylertech/forge-extended/busy-indicator';
```
Every extended component **must** use a side-effect import. Missing this = the component silently doesn't register.

### `@tylertech/tyler-icons`
```typescript
import { tylIconHome, tylIconSettings } from '@tylertech/tyler-icons';
// ❌ WRONG — these paths do not exist:
// import { tylIconHome } from '@tylertech/tyler-icons/standard';
// import { tylIconHome } from '@tylertech/tyler-icons/extended';
```
