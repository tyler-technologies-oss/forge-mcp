# Drawer

## Basic Usage

```html
<forge-drawer>
  <nav>
    <forge-list>
      <forge-list-item>
        <forge-icon name="home" slot="start"></forge-icon>
        <a href="/home">Home</a>
      </forge-list-item>
      <forge-list-item>
        <forge-icon name="settings" slot="start"></forge-icon>
        <a href="/settings">Settings</a>
      </forge-list-item>
    </forge-list>
  </nav>
</forge-drawer>
```

## Notes

- Typically placed in the `start` slot of `<forge-scaffold>`
- Contains navigation lists or menus
- Use `<forge-list>` with `<forge-list-item>` for navigation items
- See also: `<forge-mini-drawer>` and `<forge-modal-drawer>` for variants
