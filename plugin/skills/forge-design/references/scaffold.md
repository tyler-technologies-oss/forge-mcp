# Scaffold

## ⚠️ CRITICAL: Body Styles for Full-Page Layouts

**When using `forge-scaffold` as the root layout for a full application, the `<body>` tag MUST have these styles:**

```css
body {
  background-color: var(--forge-theme-surface-dim, #fafafa);
  height: 100dvh;
  width: 100dvw;
  margin: 0;
}
```

**Why this is required:** These styles allow the scaffold to fill the full height of the browser window. Without them, the layout will not render correctly.

> **Note:** This is only required for root-level scaffolds. Nested scaffolds (inside dialogs, panels, etc.) do not need body styles.

---

## Basic Usage

```html
<!-- Typical page layout -->
<forge-scaffold>
  <forge-app-bar slot="header" title-text="App Title"></forge-app-bar>
  <forge-drawer slot="start">Drawer Content Here</forge-drawer>
  <main slot="body">Main Content Here</main>
  <footer slot="footer">Footer Content Here</footer>
</forge-scaffold>

<!-- Can be used within sub-pages, dialogs, or within other scaffold slots -->
<forge-scaffold>
  <forge-toolbar slot="header">
    <h2 class="forge-typography--heading4" slot="start">Subpage Title</h2>
  </forge-toolbar>
  <div slot="body">Subpage Content Here</div>
</forge-scaffold>
```

## Notes

- Primary layout component for structuring pages and views
- Available slots:
  - `header`: App bar or toolbar
  - `start`: Navigation drawer
  - `body`: Main content area
  - `footer`: Footer content
- Can be nested for sub-layouts (dialogs, panels, etc.)
- Critical for dialog layout structure
