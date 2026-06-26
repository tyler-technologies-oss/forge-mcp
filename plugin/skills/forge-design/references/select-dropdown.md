# Select Dropdown

## Basic Usage

```html
<forge-button variant="raised" id="select-dropdown-target">
  <span id="select-dropdown-text" aria-live="assertive" aria-atomic="true">Choose...</span>
  <forge-icon slot="end" name="arrow_drop_down"></forge-icon>
</forge-button>
<forge-select-dropdown target="#select-dropdown-target" sync-selected-text selected-text-target="#select-dropdown-text">
  <forge-option value="option1">Option 1</forge-option>
  <forge-option value="option2">Option 2</forge-option>
</forge-select-dropdown>
```

## Notes

- Use `target` attribute to specify the trigger element (CSS selector)
- Use `sync-selected-text` to auto-update the display text
- Use `selected-text-target` to specify which element receives the selected text
- Uses `<forge-option>` children for available choices
