# Meter Group

## Basic Usage

```html
<forge-meter-group max="100">
  <label slot="label" for="meter-group">Birds</label>
  <span slot="value">75%</span>
  <forge-meter value="25" theme="info" aria-label="Peregrine"></forge-meter>
  <forge-meter value="35" theme="secondary" aria-label="Collared Dove"></forge-meter>
  <forge-meter value="15" theme="success" aria-label="Golden Pheasant"></forge-meter>
</forge-meter-group>
```

## Notes

- Container for multiple `<forge-meter>` elements displayed as segments
- Use `max` attribute to set the total scale
- Use `label` slot for the group label
- Use `value` slot for the displayed total value
- Each meter can have a different `theme` for color coding
