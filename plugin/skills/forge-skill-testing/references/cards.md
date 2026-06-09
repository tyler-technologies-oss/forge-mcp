# Card Patterns

Reference for Forge card components.

---

## Card Component Selection

| Component | When to Use |
|-----------|-------------|
| `<forge-card>` | Simple content containers without distinct header/body/footer |
| `<forge-structured-card>` | Complex cards with title, header actions, body, footer (from `@tylertech/forge-extended`) |

---

## Structured Card Slots

| Slot | Purpose |
|------|---------|
| `slot="title"` | Styled title |
| `slot="after-header-actions"` | Header icon buttons |
| `slot="body"` | Main content |
| `slot="footer-primary-action"` | Footer buttons, pagination |

---

## Structured Card Attributes

| Attribute | Purpose |
|-----------|---------|
| `heading-level` | Semantic heading level (e.g., `"2"`) |
| `body-spacing` | Body padding (`"none"` for tables) |

---

## Card Typography Rules

**STRICT**: Card headers use `text-heading3` as default, **never larger**.

| Context | Allowed Classes | FORBIDDEN Classes |
|---------|-----------------|-------------------|
| Card headers | `text-heading3`, `text-heading2`, `text-heading1` | `text-heading4`, `text-heading5` |

- `text-heading4` and `text-heading5` are reserved for PAGE-LEVEL titles only

---

## Card Rules

1. **Cards use `p-0` class** with inner `<div class="p-medium">` for content padding
2. **Use `forge-structured-card`** for complex cards with header, body, and footer
3. **Use `<forge-divider>` for content separation** within cards - Never CSS borders
