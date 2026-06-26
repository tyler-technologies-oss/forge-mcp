# Date Range Picker

## Basic Usage

```html
<forge-date-range-picker>
  <forge-text-field>
    <label for="from-date-input">Select date range</label>
    <input id="from-date-input" type="text" placeholder="From date..." />
    <input id="to-date-input" type="text" placeholder="To date..." />
  </forge-text-field>
</forge-date-range-picker>
```

## Notes

- Wraps a `<forge-text-field>` with date range selection functionality
- Requires two `<input>` elements within the text field for start and end dates
