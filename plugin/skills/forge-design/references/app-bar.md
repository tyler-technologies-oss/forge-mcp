# App Bar Rules

## Purpose

The app bar is for **global application-level functionality only**. It persists across all pages and provides consistent access to app-wide features.

---

## Minimal Example

```html
<forge-app-bar title-text="My Application" theme-mode="scoped">
  <forge-app-bar-menu-button slot="start"></forge-app-bar-menu-button>
  <forge-app-bar-notification-button slot="end"></forge-app-bar-notification-button>
  <forge-user-profile slot="end" full-name="John Doe" email="john@example.com"></forge-user-profile>
</forge-app-bar>
```

---

## Critical Rules

1. **NEVER put page-level actions in the app bar** - Buttons for page-specific functionality (Save, Edit, Delete, Submit, etc.) belong in the page content, NOT the app bar

2. **App bar is for global features only** - Reserved for:
   - Menu button (opening navigation drawer)
   - App title/logo
   - App launcher
   - User profile component
   - Notifications
   - Help button
   - Global search

3. **Use `theme-mode="scoped"` attribute** - Required on `<forge-app-bar>` to avoid theming issues with slotted content

4. **Always set `title-text` attribute** - Provides the application title

---

## Slot Usage

| Slot | Purpose | Example Components |
|------|---------|-------------------|
| `start` | Menu button, back navigation | `forge-app-bar-menu-button` |
| `center` | Global search | `forge-app-bar-search` |
| `end` | User actions, profile | `forge-user-profile`, `forge-app-bar-notification-button`, `forge-app-launcher` |

---

## Common Mistakes

**Wrong** - Page actions in app bar:
```
App Bar: [Menu] [Title] .............. [Save] [Cancel] [Profile]
```

**Correct** - Only global actions in app bar:
```
App Bar: [Menu] [Title] .............. [Notifications] [Profile]
Page:    [Page Title] [Save] [Cancel]
```

---

## Where Page Actions Belong

- **Page toolbar** - Use `<forge-toolbar>` within the page content for page-level actions
- **Card headers** - Use `<forge-structured-card>` with header actions for card-specific actions
- **Floating action button** - Use `<forge-fab>` for primary page actions

---

## Notes

Call `get_forge_blocks(component: "forge-app-bar")` to see verified app bar implementations.
Call `get_component_docs(component: "forge-app-bar", format: "usage-examples")` for component API examples.
