# Icon Button

## Basic Usage

```html
<forge-icon-button aria-label="Favorite">
  <forge-icon name="favorite"></forge-icon>
</forge-icon-button>

<!-- If you need to toggle between states -->
<forge-icon-button toggle>
  <forge-icon name="favorite_border"></forge-icon>
  <forge-icon name="favorite" slot="on"></forge-icon>
</forge-icon-button>
```

## Notes

- **Always include `aria-label`** for accessibility - this is required
- Place the icon in the default slot
- Use `toggle` attribute for toggle behavior (like/unlike, on/off)
- For toggles, use the `on` slot for the active state icon
