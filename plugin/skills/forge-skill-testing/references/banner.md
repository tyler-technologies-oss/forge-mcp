# Banner

## Basic Usage

```html
<forge-banner theme="info" can-dismiss>
  <forge-icon name="info" slot="icon"></forge-icon>
  <span>This is an informational banner message.</span>
</forge-banner>

<!-- With action button -->
<forge-banner theme="warning">
  <forge-icon name="warning" slot="icon"></forge-icon>
  <span>This is a warning banner message.</span>
  <forge-button slot="button">Take Action</forge-button>
</forge-banner>
```

## Notes

- Use `theme` attribute for semantic coloring ("info", "warning", "error", "success")
- Use `can-dismiss` attribute to allow users to close the banner
- Use the `icon` slot for the leading icon
- Use the `button` slot for optional action buttons
