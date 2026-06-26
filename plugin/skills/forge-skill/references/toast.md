# Toast

## Basic Usage

```html
<!-- Toasts can be used inline, and toggle their open property programmatically -->
<forge-toast>Toast Message</forge-toast>

<!-- BUT it's typically more common to create them dynamically and add them to the DOM when needed -->
<script>
const toast = document.createElement('forge-toast');
toast.textContent = 'Toast Message';
document.body.appendChild(toast);
toast.open = true;

// Toasts will auto-dismiss after a timeout, or can be dismissed via user action
</script>
```

## Notes

- Temporary notifications that appear at the bottom of the screen
- Control visibility via the `open` property
- Auto-dismisses after a timeout by default
- For Angular: Use `ToastService` from `@tylertech/forge-angular` for programmatic toasts
