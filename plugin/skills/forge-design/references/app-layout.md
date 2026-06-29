# Application Layout Rules

**All Forge apps start with `forge-app-layout`** - it scaffolds the entire app structure.

---

## ⚠️ CRITICAL: Body Styles Required

**When using `forge-app-layout` or `forge-scaffold` for a full application, the `<body>` tag MUST have these styles:**

```css
body {
  background-color: var(--forge-theme-surface-dim, #fafafa);
  height: 100dvh;
  width: 100dvw;
  margin: 0;
}
```

**Why this is required:** These styles allow the scaffold or app-layout component to fill the full height of the browser window. Without them, the layout will not render correctly.

---

## Rules

1. **Body styles are mandatory** - See critical section above
2. **Content headings start at h2** - the app bar title is h1
3. **Use navigation lists** for sidebar navigation

---

## Notes

Use the MCP tools to get the latest component API details for app-layout, including available slots and attributes.

**CRITICAL: This is an extended component. All extended components require side-effect imports to register with the browser.**

```typescript
import '@tylertech/forge-extended/app-layout';
```
