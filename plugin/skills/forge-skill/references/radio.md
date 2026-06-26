# Radio

## Basic Usage

```html
<forge-radio-group>
  <forge-label legend>Choose an option</forge-label>
  <forge-radio name="default">Option 1</forge-radio>
  <forge-radio name="default">Option 2</forge-radio>
  <forge-radio name="default">Option 3</forge-radio>
</forge-radio-group>
```

## Notes

- Must be used within a `<forge-radio-group>` container
- Use the same `name` attribute for grouped radios
- Use `<forge-label legend>` for the group label
- Only one radio in a group can be selected at a time
