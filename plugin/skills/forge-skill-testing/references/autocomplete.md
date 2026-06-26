# Autocomplete

## Basic Usage

```html
<forge-autocomplete>
  <!-- Autocompletes only require a child <input> but it's typically composed with a <forge-text-field> -->
  <forge-text-field>
    <label for="autocomplete-input">Search</label>
    <input id="autocomplete-input" type="text" placeholder="Type to search..." />
  </forge-text-field>
</forge-autocomplete>

<script>
const autocomplete = document.querySelector('forge-autocomplete');
autocomplete.filter = (filterText) => {
  // Typically this would call an API to get suggestions
  const suggestions = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
  const filtered = suggestions.filter(item => item.toLowerCase().includes(filterText.toLowerCase()));
  return Promise.resolve(filtered);
};
</script>
```

## Notes

- Requires a child `<input>` element
- Typically composed with `<forge-text-field>` for consistent styling
- Requires JavaScript to set the `filter` function which returns suggestions
- The `filter` function should return a Promise that resolves to an array of suggestions
