# Select

## Basic Usage

```html
<forge-select>
  <forge-option value="option1">Option 1</forge-option>
  <forge-option value="option2">Option 2</forge-option>
</forge-select>
```

## JavaScript Options Array

Set options dynamically via the `options` property:

```html
<forge-select id="dynamic-select" label="Choose an option"></forge-select>

<script>
const select = document.querySelector('#dynamic-select');

select.options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' }
];
</script>
```

## Options with Leading Icons

Add icons to options using `leadingIcon` and `leadingIconType` properties:

```html
<forge-select id="icon-select" label="Select action"></forge-select>

<script>
// Icons must be imported and defined like any other forge-icon
import { tylIconSave, tylIconEdit, tylIconDelete } from '@tylertech/tyler-icons';
import { IconRegistry } from '@tylertech/forge';

IconRegistry.define([tylIconSave, tylIconEdit, tylIconDelete]);

const select = document.querySelector('#icon-select');

select.options = [
  { label: 'Save', value: 'save', leadingIcon: 'save', leadingIconType: 'component' },
  { label: 'Edit', value: 'edit', leadingIcon: 'edit', leadingIconType: 'component' },
  { label: 'Delete', value: 'delete', leadingIcon: 'delete', leadingIconType: 'component' }
];
</script>
```

## Multi-Select with Select All

Use `multiple`, `show-select-all`, and `select-all-label` for a multi-select with a select all option:

```html
<forge-select label="Label" multiple show-select-all select-all-label="Select all">
  <forge-option value="1">Option 1</forge-option>
  <forge-option value="2">Option 2</forge-option>
  <forge-option value="3">Option 3</forge-option>
</forge-select>
```

## JavaScript Events

```javascript
const select = document.querySelector('forge-select');
select.addEventListener('change', (event) => {
  console.log('Selected value:', event.target.value);
});
```

## Notes

- Uses `<forge-option>` children for available choices
- Fires native `change` event on selection
- Access selected value via `event.target.value`
