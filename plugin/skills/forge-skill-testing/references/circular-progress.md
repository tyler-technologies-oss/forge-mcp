# Circular Progress

## Basic Usage

```html
<!-- Indeterminate -->
<forge-circular-progress></forge-circular-progress>

<!-- Determinate with 75% progress and track -->
<forge-circular-progress determinate progress="0.75" track></forge-circular-progress>
```

## Notes

- Default is indeterminate (spinning animation)
- Use `determinate` attribute for specific progress display
- Use `progress` attribute with value 0-1 (e.g., 0.75 = 75%)
- Use `track` attribute to show a background track
