# View Switcher

## Basic Usage

```html
<forge-view-switcher>
  <forge-view>
    <h2>View 1</h2>
  </forge-view>
  <forge-view>
    <h2>View 2</h2>
  </forge-view>
</forge-view-switcher>

<script>
const viewSwitcher = document.querySelector('forge-view-switcher');
viewSwitcher.index = 1; // Switch to second view
</script>
```

## Notes

- Container for `<forge-view>` elements
- Only displays one view at a time
- Control which view is visible via the `index` property (0-indexed)
- Often paired with `<forge-tab-bar>` for tabbed navigation
