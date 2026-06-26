# Expansion Panel

## Basic Usage

```html
<!-- With trigger element (recommended) -->
<button id="expand-button">Expand</button>
<forge-expansion-panel trigger="expand-button">
  <div>Panel content that can be expanded or collapsed</div>
</forge-expansion-panel>

<!-- With slotted header (interactive) element (not recommended) -->
<forge-expansion-panel>
  <button slot="header">Expansion Panel Title</button>
  <div>Panel content that can be expanded or collapsed</div>
</forge-expansion-panel>
```

## Notes

- Preferred: Use `trigger` attribute pointing to an external button's id
- Alternative: Place a button in the `header` slot (less recommended)
- Content goes in the default slot
- Use within `<forge-accordion>` for coordinated panels
