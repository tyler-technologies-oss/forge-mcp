# Button Patterns

Reference for Forge button components.

---

## Button Variants

| Variant | Usage |
|---------|-------|
| (default/text) | Secondary actions, cancel buttons |
| `variant="filled"` | Primary actions, submit buttons |
| `variant="tonal"` | Medium emphasis actions |
| `variant="outlined"` | Actions needing visible boundary |

---

## Button Rules

1. **All icon buttons MUST have `aria-label`** for accessibility
2. Use `variant="filled"` for primary actions
3. Use default (text) variant for secondary/cancel actions
4. Use `variant="tonal"` for medium emphasis actions
5. Use `variant="outlined"` when you need a visible boundary
6. Use `slot="start"` to position icons before button text

---

## Icon Button Attributes

| Attribute | Usage |
|-----------|-------|
| `aria-label` | Required - describes the action |
| `density="medium"` | Use in app bar |
| `theme="app-bar"` | Use for app bar styling |
