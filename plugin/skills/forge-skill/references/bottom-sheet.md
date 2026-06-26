# Bottom Sheet

## Basic Usage

```html
<forge-bottom-sheet>
  <div slot="header">Bottom Sheet Title</div>
  <div>Bottom sheet content goes here</div>
</forge-bottom-sheet>

<script>
const bottomSheet = document.querySelector('forge-bottom-sheet');
bottomSheet.open = true;
</script>
```

## Notes

- Use the `header` slot for the title area
- Default slot is used for body content
- Control visibility via the `open` property in JavaScript
