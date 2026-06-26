# Split Button

## Basic Usage

```html
<forge-split-button>
  <forge-button>Primary Action</forge-button>
  <forge-menu>
    <forge-button aria-label="Show menu" popover-icon></forge-button>
  </forge-menu>
</forge-split-button>
```

## Notes

- Combines a primary action button with a dropdown menu
- First `<forge-button>` is the primary action
- `<forge-menu>` provides the dropdown with additional options
- Use `popover-icon` attribute on the menu trigger button
