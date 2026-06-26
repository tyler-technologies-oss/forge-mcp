# Chip Field

## Basic Usage

```html
<forge-chip-field>
  <label slot="label" for="demo-chip-field-input">Test label</label>
  <input type="text" id="demo-chip-field-input" autocomplete="off">
</forge-chip-field>

<script>
// Listen for chip add events to add chips to the element
const chipField = document.querySelector('forge-chip-field');
chipField.addEventListener('forge-chip-field-member-added', (event) => {
  console.log('Chip added:', event.detail);
});

// Listen for chip remove events to remove chips from the element
chipField.addEventListener('forge-chip-field-member-removed', (event) => {
  console.log('Chip removed:', event.detail);
});
</script>
```

## Notes

- Combines text input with chip display for multi-value inputs
- Requires a `<label>` in the `label` slot and an `<input>` element
- Listen for `forge-chip-field-member-added` and `forge-chip-field-member-removed` events to manage chip state
