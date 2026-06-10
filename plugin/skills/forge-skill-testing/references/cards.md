# Card Rules

## Component Selection

- Use `<forge-card>` for simple content containers
- Use `<forge-structured-card>` (from `@tylertech/forge-extended`) for complex cards with distinct header/body/footer regions

---

## Typography Rules

**STRICT**: Card headers use `text-heading3` as default, **never larger**.

- `text-heading3`, `text-heading2`, `text-heading1` are allowed in cards
- `text-heading4` and `text-heading5` are **FORBIDDEN** in cards - reserved for PAGE-LEVEL titles only

---

## Rules

1. **Cards use `p-0` class** with inner `<div class="p-medium">` for content padding
2. **Use `<forge-divider>` for content separation** within cards - never CSS borders

---

## Notes

Use the MCP tools to get the latest component API details for card components, including available slots and attributes.
