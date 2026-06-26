# Multi-Select Header (Extended Component)

## Basic Usage

```html
<forge-multi-select-header>
  <span slot="select-all-button-text">Select All</span>
  <forge-icon-button slot="actions" aria-label="Select all items">
    <forge-icon name="download"></forge-icon>
  </forge-icon-button>
  <forge-icon-button slot="actions" aria-label="Clear selection">
    <forge-icon name="delete"></forge-icon>
  </forge-icon-button>
  <forge-menu slot="actions">
    <forge-icon-button aria-label="More actions">
      <forge-icon name="more_vert"></forge-icon>
    </forge-icon-button>
  </forge-menu>
</forge-multi-select-header>
```

## Notes

- Header bar for bulk selection actions
- Available slots:
  - `select-all-button-text`: Text for select all button
  - `actions`: Action buttons for bulk operations

**CRITICAL: This is an extended component. All extended components require side-effect imports to register with the browser.**

```typescript
import '@tylertech/forge-extended/multi-select-header';
```
