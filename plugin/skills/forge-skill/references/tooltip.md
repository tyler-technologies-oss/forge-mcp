# Tooltip

## Basic Usage

```html
<!-- Auto-attaches to its previous element sibling -->
<forge-button variant="raised">Hover me</forge-button>
<forge-tooltip>Tooltip text here</forge-tooltip>

<!-- Tooltips can also be used with other elements -->
<button id="tooltip-target">Hover me</button>
<forge-tooltip anchor="tooltip-target">Tooltip text here</forge-tooltip>
```

## Notes

- By default, auto-attaches to the previous sibling element
- Use `anchor` attribute to explicitly specify target element (by id)
- Tooltip text goes in the default slot
- Shows on hover/focus of the anchor element
