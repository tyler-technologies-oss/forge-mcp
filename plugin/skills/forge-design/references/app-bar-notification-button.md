# App Bar Notification Button

## Basic Usage

```html
<!-- With badge and count -->
<forge-app-bar-notification-button slot="end" show-badge count="5"></forge-app-bar-notification-button>

<!-- With simple "dot" badge -->
<forge-app-bar-notification-button slot="end" show-badge dot></forge-app-bar-notification-button>
```

## Notes

- Place in the `end` slot of `<forge-app-bar>`
- Use `show-badge` to display a notification indicator
- Use `count` attribute to show a specific number
- Use `dot` attribute for a simple indicator without a number
