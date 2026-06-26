# Responsive Toolbar (Extended Component)

## Basic Usage

```html
<forge-responsive-toolbar>
  <forge-icon-button aria-label="Icon button demo" slot="before-start">
    <forge-icon name="arrow_back" external></forge-icon>
  </forge-icon-button>
  <div slot="start" class="title forge-typography--heading4">User management</div>
  <forge-stack inline alignment="center" slot="end-large">
    <forge-button variant="text">Add User</forge-button>
    <forge-button variant="outlined">Remove User</forge-button>
    <forge-button variant="raised">Third action</forge-button>
  </forge-stack>
  <div slot="end-small">
    <forge-menu id="example-menu">
      <forge-icon-button aria-label="Open menu">
        <forge-icon name="more_vert" external></forge-icon>
      </forge-icon-button>
    </forge-menu>
  </div>
</forge-responsive-toolbar>
```

## Notes

- Toolbar that adapts to screen size
- Available slots:
  - `before-start`: Content before the start area (back buttons)
  - `start`: Title/heading area
  - `end-large`: Actions shown on larger screens
  - `end-small`: Collapsed menu shown on smaller screens
- Automatically switches between `end-large` and `end-small` based on viewport

**CRITICAL: This is an extended component. All extended components require side-effect imports to register with the browser.**

```typescript
import '@tylertech/forge-extended/responsive-toolbar';
```
