# Dialog Patterns

Reference for Forge dialog components.

---

## Dialog Structure

Dialogs use `<forge-scaffold>` for proper layout:

| Slot | Purpose |
|------|---------|
| `header` | Dialog title bar with close button |
| `body` | Main dialog content |
| `footer` | Action buttons |

---

## Dialog Rules

1. **Use `aria-labelledby` on dialogs** pointing to the title element
2. **Close button must have `aria-label="Close dialog"`**
3. **Dialog titles use `text-heading3`** (same as card headers)
4. **Footer toolbar uses `inverted` attribute** for proper styling
5. **Body content uses `p-medium` padding**
