# Chip Set

## Basic Usage

```html
<!-- Basic (action) chips -->
<forge-chip-set>
  <forge-chip>Chip 1</forge-chip>
  <forge-chip>Chip 2</forge-chip>
  <forge-chip>Chip 3</forge-chip>
</forge-chip-set>

<!-- Filter chips -->
<forge-chip-set type="filter">
  <forge-chip>Filter 1</forge-chip>
  <forge-chip>Filter 2</forge-chip>
  <forge-chip>Filter 3</forge-chip>
</forge-chip-set>

<!-- Choice chips -->
<forge-chip-set type="choice">
  <forge-chip>Choice 1</forge-chip>
  <forge-chip>Choice 2</forge-chip>
  <forge-chip>Choice 3</forge-chip>
</forge-chip-set>

<!-- Input chips -->
<forge-chip-set type="input">
  <forge-chip>Input 1</forge-chip>
  <forge-chip>Input 2</forge-chip>
  <forge-chip>Input 3</forge-chip>
</forge-chip-set>
```

## Notes

- Container for `<forge-chip>` elements
- Use `type` attribute to specify chip behavior:
  - Default (action): Standard clickable chips
  - `filter`: Multi-select filter chips
  - `choice`: Single-select chips
  - `input`: Removable input chips
