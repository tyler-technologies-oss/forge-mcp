# Tab Bar

## Basic Usage

```html
<forge-tab-bar active-tab="0">
  <forge-tab>Tab one</forge-tab>
  <forge-tab>Tab two</forge-tab>
  <forge-tab>Tab three</forge-tab>
  <forge-tab>Tab four</forge-tab>
</forge-tab-bar>
```

## Notes

- Container for `<forge-tab>` elements
- Use `active-tab` attribute to set the initially active tab (0-indexed)
- Listen for tab change events to update content
