# Button Area

## Basic Usage

```html
<!-- Using a card is not required, but for example this makes the whole card appear interactive -->
<forge-card>
  <forge-button-area>
    <!-- Button areas require a button element -->
    <button slot="button" aria-label="Click me"></button>
    <div>
      <h3>Title</h3>
      <p>Description content</p>
    </div>
  </forge-button-area>
</forge-card>
```

## Notes

- Makes an entire area clickable while maintaining accessibility
- Requires a `<button>` element in the `button` slot
- The button must have an `aria-label` for accessibility
- Content goes in the default slot
- Commonly used with cards to make the entire card interactive
