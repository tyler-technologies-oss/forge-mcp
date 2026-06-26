# Page State

## Basic Usage

```html
<forge-page-state>
  <img src="https://cdn.forge.tylertech.com/v1/images/spot-hero/404-error-spot-hero.svg" slot="graphic" alt="" />
  <div slot="title">Nothing but tumbleweeds here...</div>
  <div slot="message">Even our best explorer couldn't find the page you're looking for. It might have been removed or you may have mistyped the URL.</div>
  <forge-button variant="raised" slot="action">Go back</forge-button>
  <forge-button variant="outlined" slot="action">Refresh</forge-button>
</forge-page-state>
```

## Notes

- Full-page state display for empty, error, or special states
- Available slots:
  - `graphic`: Illustration or image
  - `title`: Main heading
  - `message`: Description text
  - `action`: Action buttons
- Use for 404 pages, empty states, loading states, etc.
