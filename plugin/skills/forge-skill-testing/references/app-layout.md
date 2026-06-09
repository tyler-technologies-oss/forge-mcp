# Application Layout

**All Forge apps start with `forge-app-layout`** - it scaffolds the entire app structure.

---

## App Layout Slots

| Slot | Purpose |
|------|---------|
| `app-bar-logo` | Logo/icon in app bar |
| `app-bar-end` | Right side of app bar (actions, profile) |
| `navigation` | Side navigation drawer |
| `body` | Main content area |
| `body-footer` | Footer below main content |

---

## App Layout Rules

1. **Always place main content in the body slot** using `<main slot="body">`
2. **Content headings start at h2** - the app title is h1
3. **Use `theme="app-bar"` for icon buttons** in the app bar area
4. **Navigation uses `<forge-list>` with `navlist` attribute**

---

## Heading Hierarchy

When using `forge-app-layout` or `forge-app-bar`, the page title is the h1, so **content headings should start at h2**.

---

## Navigation List Attributes

| Attribute | Purpose |
|-----------|---------|
| `navlist` | Marks the list as navigation |
| `selected` | Marks a list item as selected |
