# List Item

## Basic Usage

```html
<forge-list-item>
  <forge-avatar text="JD" slot="start"></forge-avatar>
  <button>John Doe</button>
  <forge-icon name="chevron_right" slot="end"></forge-icon>
</forge-list-item>
```

## Notes

- Use within `<forge-list>` container
- Slots available:
  - `start`: Leading content (icons, avatars)
  - Default: Main content (text, buttons, links)
  - `end`: Trailing content (icons, badges, actions)
  - `additional-content`: Expandable content below the item
- For interactive items, include `<button>` or `<a>` elements
- Use `selected` attribute to indicate current selection
