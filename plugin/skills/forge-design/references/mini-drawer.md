# Mini Drawer

## Basic Usage

```html
<forge-mini-drawer>
  <forge-list navlist>
    <forge-list-item selected id="tooltip-host-1">
      <forge-tooltip anchor="tooltip-host-1">Inbox</forge-tooltip>
      <forge-icon slot="leading" name="inbox"></forge-icon>
      <button>Inbox</button>
    </forge-list-item>
    <forge-list-item id="tooltip-host-2">
      <forge-tooltip anchor="tooltip-host-2">Sent</forge-tooltip>
      <forge-icon slot="leading" name="send"></forge-icon>
      <button>Outgoing</button>
    </forge-list-item>
    <forge-list-item id="tooltip-host-3">
      <forge-tooltip anchor="tooltip-host-3">Drafts</forge-tooltip>
      <forge-icon slot="leading" name="drafts"></forge-icon>
      <button>Drafts</button>
    </forge-list-item>
  </forge-list>
</forge-mini-drawer>
```

## Notes

- Collapsed navigation rail showing only icons
- Use tooltips to show labels on hover
- Use `navlist` attribute on the list for navigation styling
- Use `selected` attribute to indicate the current item
