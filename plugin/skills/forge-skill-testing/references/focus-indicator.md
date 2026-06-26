# Focus Indicator

## Basic Usage

```html
<div style="position: relative;">
  <button id="the-button">Focusable Button</button>
  <forge-focus-indicator target="the-button"></forge-focus-indicator>
</div>
```

## Notes

- Provides a custom focus ring for elements
- Use `target` attribute to specify the element to observe (by id)
- Parent container should have `position: relative`
- Typically used internally by other Forge components
