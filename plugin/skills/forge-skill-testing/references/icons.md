# Icon Usage

Reference for Tyler Icons in Forge components.

---

## Icon Imports

**ALWAYS import icons from `@tylertech/tyler-icons` ONLY.**

**NEVER import from subpaths** like `@tylertech/tyler-icons/standard`.

---

## Icon Attributes

| Attribute | Purpose |
|-----------|---------|
| `name` | Icon name from Tyler Icons |
| `external` | Load icon dynamically (not pre-registered) |

---

## Icon Slots in Components

| Component | Slot |
|-----------|------|
| `<forge-button>` | `slot="start"` |
| `<forge-text-field>` | `slot="leading"` |
| `<forge-list-item>` | `slot="start"` |

---

## Icon Rules

1. **Always use `aria-label` on icon buttons** for accessibility
2. Use `external` attribute for icons not pre-registered in the app
3. Import icons only from `@tylertech/tyler-icons` root path
4. Use `slot="start"` or `slot="leading"` to position icons in components

---

## Self-Closing Tags

**DO NOT use self-closing tags** UNLESS writing React code:
- HTML/Angular/Svelte/Vue: `<forge-icon name="settings"></forge-icon>`
- React only: `<ForgeIcon name="settings" />`
