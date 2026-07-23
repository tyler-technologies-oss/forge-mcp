# Split Button

Split buttons provide a way to combine a primary action with one or more secondary actions. The secondary actions can also be displayed in a dropdown menu.

## Basic Usage

```html
<forge-split-button>
  <forge-button>Primary Action</forge-button>
  <forge-menu>
    <forge-button aria-label="Show menu" popover-icon></forge-button>
  </forge-menu>
</forge-split-button>
```

## Styled Split Button

Apply `variant` and `theme` to the split-button container, and matching `variant` to child buttons:

```html
<forge-split-button variant="raised" theme="primary">
  <forge-button style="min-width: 100px;" variant="raised">Send</forge-button>
  <forge-menu>
    <forge-button aria-label="Show menu" popover-icon variant="raised"></forge-button>
  </forge-menu>
</forge-split-button>
```

## Notes

- Combines a primary action button with a dropdown menu
- First `<forge-button>` is the primary action
- `<forge-menu>` provides the dropdown with additional options
- Use `popover-icon` attribute on the menu trigger button
