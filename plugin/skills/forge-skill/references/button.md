# Button

## Basic Usage

```html
<!-- Basic buttons -->
<forge-button>Text Button</forge-button>
<forge-button variant="outlined">Outlined Button</forge-button>
<forge-button variant="tonal">Tonal Button</forge-button>
<forge-button variant="filled">Filled Button</forge-button>
<forge-button variant="raised">Raised Button</forge-button>

<!-- With icon -->
<forge-button>
  <forge-icon name="add" slot="start"></forge-icon>
  Add Item
</forge-button>

<!-- Submit button -->
<form>
  <forge-button type="submit" variant="filled">Submit</forge-button>
</form>
```

## Notes

- Default variant is text (no background)
- Use `variant="outlined"` for secondary actions with a visible boundary
- Use `variant="tonal"` for medium emphasis
- Use `variant="filled"` for primary actions
- Use `variant="raised"` for elevated primary actions
- Use the `start` or `end` slots for icons
- Use `type="submit"` within forms
