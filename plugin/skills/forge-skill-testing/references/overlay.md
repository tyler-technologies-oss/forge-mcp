# Overlay

## Basic Usage

```html
<button id="button">Anchor Button</button>

<forge-overlay anchor="button">
  <div>Overlay content</div>
</forge-overlay>
```

## Notes

- Low-level component for positioned content relative to an anchor
- Use `anchor` attribute to specify the trigger element (id)
- Typically used internally by other components (popovers, menus, etc.)
- For most use cases, prefer `<forge-popover>` or `<forge-menu>`
