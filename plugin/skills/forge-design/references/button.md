# Button

## Basic Usage

### Button Variants

```html
<!-- Primary action (filled) - use for main actions -->
<forge-button variant="filled">Save</forge-button>

<!-- Raised - elevated primary action -->
<forge-button variant="raised">Submit</forge-button>

<!-- Tonal - medium emphasis -->
<forge-button variant="tonal">Export</forge-button>

<!-- Outlined - visible boundary, secondary emphasis -->
<forge-button variant="outlined">Details</forge-button>

<!-- Text (default) - lowest emphasis, use for cancel/secondary -->
<forge-button variant="text">Cancel</forge-button>
<forge-button>Cancel</forge-button> <!-- same as text -->
```

### Button with Icon

```html
<forge-button variant="filled">
  <forge-icon name="add" slot="start"></forge-icon>
  Add Item
</forge-button>

<forge-button variant="outlined">
  Download
  <forge-icon name="download" slot="end"></forge-icon>
</forge-button>
```

### Icon Button

**Always requires `aria-label` for accessibility:**

```html
<forge-icon-button aria-label="Edit item">
  <forge-icon name="edit"></forge-icon>
</forge-icon-button>

<forge-icon-button aria-label="Delete item">
  <forge-icon name="delete"></forge-icon>
</forge-icon-button>

<forge-icon-button aria-label="More options">
  <forge-icon name="more_vert"></forge-icon>
</forge-icon-button>
```

### Submit Button in Forms

```html
<form>
  <forge-button type="submit" variant="filled">Submit</forge-button>
</form>
```

---

## Rules

1. **All icon buttons MUST have `aria-label`** for accessibility
2. **Use `filled` or `raised` variant** for primary actions
3. **Use `text` variant (default)** for secondary/cancel actions
4. **Use `tonal` variant** for medium emphasis actions
5. **Use `outlined` variant** when you need a visible boundary but lower emphasis than filled
6. **Use `start` or `end` slots** for icons within buttons

---

## Variant Reference

| Variant | Use For |
|---------|---------|
| `filled` | Primary actions (Save, Submit, Confirm) |
| `raised` | Elevated primary actions |
| `tonal` | Medium emphasis actions (Export, Share) |
| `outlined` | Secondary actions needing visible boundary |
| `text` | Cancel, Close, secondary actions |
