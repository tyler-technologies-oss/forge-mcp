# Accordion

## Basic Usage

```html
<forge-accordion>
  <button id="header1">Panel 1 Title</button>
  <forge-expansion-panel trigger="header1">
    <div>Panel 1 content goes here</div>
  </forge-expansion-panel>
  <button id="header2">Panel 2 Title</button>
  <forge-expansion-panel trigger="header2">
    <div>Panel 2 content goes here</div>
  </forge-expansion-panel>
</forge-accordion>
```

## Notes

- Accordion wraps multiple expansion panels for coordinated open/close behavior
- Each panel needs a trigger button with an `id` and a corresponding `<forge-expansion-panel>` with matching `trigger` attribute
