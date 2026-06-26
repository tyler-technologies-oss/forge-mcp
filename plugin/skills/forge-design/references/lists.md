# List Rules

## Minimal Examples

Basic list:

```html
<forge-list>
  <forge-list-item>
    <span slot="title">Item One</span>
  </forge-list-item>
  <forge-list-item>
    <span slot="title">Item Two</span>
  </forge-list-item>
</forge-list>
```

Navigation list (for sidebars):

```html
<forge-list navlist>
  <forge-list-item href="/dashboard">
    <forge-icon slot="start" name="dashboard"></forge-icon>
    <span slot="title">Dashboard</span>
  </forge-list-item>
  <forge-list-item href="/settings">
    <forge-icon slot="start" name="settings"></forge-icon>
    <span slot="title">Settings</span>
  </forge-list-item>
</forge-list>
```

---

## Rules

1. **Use navigation lists** for sidebar/drawer navigation
2. **Use `<forge-divider>`** between list sections
3. **All action icon buttons need `aria-label`** for accessibility
