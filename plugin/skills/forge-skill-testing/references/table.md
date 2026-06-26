# Table

## Basic Usage

```html
<!-- Tables DO NOT have children. It is rendered for you by providing `data` and `columnConfigurations` arrays. -->
<forge-table></forge-table>

<script>
const table = document.querySelector('forge-table');
table.data = [
  { name: 'John Doe', age: 30, email: 'john@example.com' },
  { name: 'Jane Smith', age: 25, email: 'jane@example.com' }
];
table.columnConfigurations = [
  { property: 'name', header: 'Name' },
  { property: 'age', header: 'Age' },
  { property: 'email', header: 'Email' }
];
</script>
```

## Notes

- **Tables have no HTML children** - content is rendered via JavaScript properties
- Set `data` property with an array of row objects
- Set `columnConfigurations` property with column definitions:
  - `property`: Key in the data objects
  - `header`: Display text for column header
- Supports sorting, filtering, and pagination through additional configuration
- See `tables.md` reference for complete table guidelines
