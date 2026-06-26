# Menu

## Basic Usage

```html
<forge-menu>
  <forge-button variant="outlined" slot="anchor">Open Menu</forge-button>
</forge-menu>

<script>
const menu = document.querySelector('forge-menu');

// Menus require JavaScript to set options
menu.options = [
  { label: 'Profile', value: 'profile' },
  { label: 'Settings', value: 'settings' },
  { label: 'Logout', value: 'logout' }
];
</script>
```

## Notes

- Place the trigger element in the `anchor` slot
- Requires JavaScript to set the `options` property
- Each option needs `label` and `value` properties
- Listen for selection events to handle user choices
