# Inline Message

## Basic Usage

```html
<forge-inline-message theme="success">
  <forge-icon name="check_circle" slot="icon"></forge-icon>
  Success message
</forge-inline-message>
```

## Notes

- Use `theme` attribute for semantic coloring ("success", "warning", "error", "info")
- Use the `icon` slot for the leading icon
- Message text goes in the default slot
- Good for contextual feedback within forms or content areas
