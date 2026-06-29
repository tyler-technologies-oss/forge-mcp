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

## Basic Usage

```html
<forge-app-layout app-title="My Application">
  <!-- App bar content -->
  <img src="/logo.png" alt="Company Logo" slot="app-bar-logo" />
  <forge-button slot="app-bar-end" variant="raised">Action</forge-button>

  <!-- Navigation content -->
  <forge-list slot="navigation" navlist>
    <forge-list-item>
      <forge-icon slot="start" name="dashboard"></forge-icon>
      <button type="button">Dashboard</button>
    </forge-list-item>
    <forge-list-item>
      <forge-icon slot="start" name="people"></forge-icon>
      <button type="button">Users</button>
    </forge-list-item>
  </forge-list>

  <!-- Main content -->
  <main slot="body">
    <h2>Page Content</h2>
    <p>Your application content goes here.</p>
  </main>

  <!-- Footer -->
  <div slot="footer">
    <p>&copy; 2024 Tyler Technologies</p>
  </div>
</forge-app-layout>
```

---

## App Bar Integration

The app bar has multiple slots for different content areas:

```html
<forge-app-layout app-title="Dashboard">
  <!-- Logo in the app bar -->
  <forge-avatar slot="app-bar-logo" size="small">
    <img src="/company-logo.png" alt="Company" />
  </forge-avatar>

  <!-- Start actions -->
  <forge-button slot="app-bar-start" variant="text">
    <forge-icon name="refresh" slot="start"></forge-icon>
    Refresh
  </forge-button>

  <!-- Center content -->
  <forge-text-field slot="app-bar-center" placeholder="Search...">
    <forge-icon slot="leading" name="search"></forge-icon>
  </forge-text-field>

  <!-- End actions -->
  <forge-user-profile slot="app-bar-end" full-name="John Doe" email="john.doe@example.com">
  </forge-user-profile>
</forge-app-layout>
```

---

## Auto-Close Drawer on Navigation

Add `data-forge-app-layout-close` to automatically close the drawer when navigation items are clicked:

```html
<forge-app-layout app-title="My Application">
  <!-- All clicks within this list will close the drawer -->
  <forge-list slot="navigation" navlist data-forge-app-layout-close>
    <forge-list-item>
      <forge-icon slot="start" name="home"></forge-icon>
      <a href="/home">Home</a>
    </forge-list-item>
    <forge-list-item>
      <forge-icon slot="start" name="settings"></forge-icon>
      <a href="/settings">Settings</a>
    </forge-list-item>
  </forge-list>
</forge-app-layout>
```

---

## Mini Drawer Mode

Use `use-mini-drawer` for a collapsed sidebar that shows only icons:

```html
<forge-app-layout app-title="My Application" use-mini-drawer>
  <forge-list slot="navigation" navlist>
    <forge-list-item>
      <forge-icon slot="start" name="dashboard"></forge-icon>
      <button type="button">Dashboard</button>
    </forge-list-item>
    <forge-list-item>
      <forge-icon slot="start" name="people"></forge-icon>
      <button type="button">Users</button>
    </forge-list-item>
  </forge-list>

  <!-- Main content -->
  <main slot="body">Your content here</main>
</forge-app-layout>
```

### Mini Drawer with Hover Expansion

Add `mini-hover` to expand the drawer on hover:

```html
<forge-app-layout app-title="My Application" use-mini-drawer mini-hover>
  <forge-list slot="navigation" navlist>
    <!-- Navigation items -->
  </forge-list>
</forge-app-layout>
```

---

## Available Slots

| Slot | Purpose |
|------|---------|
| `body` | Main content area (use on `<main slot="body">`) |
| `navigation` | Sidebar navigation content |
| `footer` | Footer content |
| `app-bar-logo` | Logo/branding in the app bar |
| `app-bar-start` | Actions at the start of the app bar |
| `app-bar-center` | Center content in the app bar |
| `app-bar-end` | Actions at the end of the app bar |

---

## Rules

1. **Body styles are mandatory** - See critical section above
2. **Content headings start at h2** - the app bar title is h1
3. **Use `navlist` attribute** on navigation lists for proper styling
4. **Use `data-forge-app-layout-close`** on navigation to auto-close drawer on mobile

---

## Import

**CRITICAL: This is an extended component. All extended components require side-effect imports.**

```typescript
import '@tylertech/forge-extended/app-layout';
```
