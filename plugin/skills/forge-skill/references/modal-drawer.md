# Modal Drawer

## Basic Usage

```html
<forge-modal-drawer>
  <forge-list navlist>
    <forge-list-item selected>
      <forge-icon slot="leading" name="inbox"></forge-icon>
      Inbox
    </forge-list-item>
    <forge-list-item>
      <forge-icon slot="leading" name="send"></forge-icon>
      Outgoing
    </forge-list-item>
    <forge-list-item>
      <forge-icon slot="leading" name="drafts"></forge-icon>
      Drafts
    </forge-list-item>
    <forge-list-item>
      <forge-icon slot="leading" name="send"></forge-icon>
      Sent
    </forge-list-item>
  </forge-list>
</forge-modal-drawer>
```

## Notes

- Overlay drawer that appears on top of content
- Controlled via `open` property in JavaScript
- Use `navlist` attribute on the list for navigation styling
- Closes when clicking outside or pressing Escape
