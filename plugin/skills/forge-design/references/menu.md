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

## Menu with Leading Icons

Add icons to menu options using `icon` and `leadingIconType` properties:

```html
<forge-menu id="icon-menu">
  <forge-button variant="outlined" slot="anchor">Actions</forge-button>
</forge-menu>

<script>
// Icons must be imported and defined like any other forge-icon
import { tylIconSave, tylIconEdit, tylIconDelete } from '@tylertech/tyler-icons';
import { IconRegistry } from '@tylertech/forge';

IconRegistry.define([tylIconSave, tylIconEdit, tylIconDelete]);

const menu = document.querySelector('#icon-menu');

menu.options = [
  { label: 'Save', value: 'save', leadingIcon: 'save', leadingIconType: 'component' },
  { label: 'Edit', value: 'edit', leadingIcon: 'edit', leadingIconType: 'component' },
  { label: 'Delete', value: 'delete', leadingIcon: 'delete', leadingIconType: 'component' }
];
</script>
```

## Cascading Menus

Nest `options` arrays to create cascading/sub-menus:

```html
<forge-menu id="cascading-menu">
  <forge-button variant="outlined" slot="anchor">Open Menu</forge-button>
</forge-menu>

<script>
const menu = document.querySelector('#cascading-menu');

menu.options = [
  { label: 'Save', value: 'save' },
  {
    label: 'Edit',
    value: 'edit',
    options: [
      { label: 'As New', value: 'asNew' },
      { label: 'Overwrite', value: 'overwrite' },
      {
        label: 'More',
        value: 'more',
        options: [
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' }
        ]
      }
    ]
  },
  { label: 'Delete', value: 'delete' }
];
</script>
```

## Notes

- Place the trigger element in the `anchor` slot
- Requires JavaScript to set the `options` property
- Each option needs `label` and `value` properties
- Nest `options` arrays within options to create cascading sub-menus
- Listen for selection events to handle user choices
