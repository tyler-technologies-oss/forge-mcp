# Select

## Basic Usage

```html
<forge-select>
  <forge-option value="option1">Option 1</forge-option>
  <forge-option value="option2">Option 2</forge-option>
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
