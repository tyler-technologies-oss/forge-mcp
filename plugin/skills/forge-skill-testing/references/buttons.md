# Button Rules

## Minimal Examples

Button variants:

```html
<!-- Primary action (filled) -->
<forge-button>Save</forge-button>

<!-- Secondary action (text) -->
<forge-button variant="text">Cancel</forge-button>

<!-- Medium emphasis (tonal) -->
<forge-button variant="tonal">Export</forge-button>

<!-- With visible boundary (outlined) -->
<forge-button variant="outlined">Details</forge-button>
```

Icon button (always requires `aria-label`):

```html
<forge-icon-button aria-label="Edit item">
  <forge-icon name="edit"></forge-icon>
</forge-icon-button>
```

---

## Rules

1. **All icon buttons MUST have `aria-label`** for accessibility
2. **Use filled variant** for primary actions
3. **Use default (text) variant** for secondary/cancel actions
4. **Use tonal variant** for medium emphasis actions
5. **Use outlined variant** when you need a visible boundary

---

## Notes

Use the MCP tools to get the latest button component API details including available attributes and properties.
