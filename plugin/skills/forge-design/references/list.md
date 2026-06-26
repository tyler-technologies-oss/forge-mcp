# List

## Basic Usage

```html
<!-- Static list -->
<forge-list>
  <forge-list-item>
    <forge-icon name="inbox" slot="start"></forge-icon>
    Inbox
    <forge-badge slot="end">5</forge-badge>
  </forge-list-item>
  <forge-list-item>
    <forge-icon name="drafts" slot="start"></forge-icon>
    Drafts
  </forge-list-item>
</forge-list>

<!-- Interactive list -->
<forge-list>
  <forge-list-item>
    <button type="button">List Item 1</button>
  </forge-list-item>
  <forge-list-item>
    <button type="button">List Item 2</button>
  </forge-list-item>
  <forge-list-item>
    <button type="button">List Item 3</button>
  </forge-list-item>
</forge-list>

<!-- For navigation menu lists -->
<forge-list>
  <forge-list-item>
    <a href="/home">Home</a>
    <forge-icon name="home" slot="end"></forge-icon>
  </forge-list-item>
  <forge-list-item>
    <a href="/settings">Settings</a>
    <forge-icon name="settings" slot="end"></forge-icon>
  </forge-list-item>
</forge-list>

<!-- Lists with expandable items -->
<forge-list>
  <forge-list-item>
    <forge-icon slot="start" name="code"></forge-icon>
    <button type="button" id="exp-li-1">List Item One</button>
    <forge-open-icon slot="end"></forge-open-icon>
    <forge-expansion-panel trigger="exp-li-1" slot="additional-content">
      <forge-list indented>
        <forge-list-item>
          <button type="button">List Item One</button>
        </forge-list-item>
        <forge-list-item>
          <button type="button">List Item Two</button>
        </forge-list-item>
        <forge-list-item>
          <button type="button">List Item Three</button>
        </forge-list-item>
      </forge-list>
    </forge-expansion-panel>
    <forge-divider role="presentation" slot="additional-content"></forge-divider>
  </forge-list-item>
</forge-list>
```

## Notes

- Static lists: Content directly in list items (text, icons, badges)
- Interactive lists: Include `<button>` or `<a>` elements
- Use `start` and `end` slots for icons, badges, and other decorations
- Use `navlist` attribute for navigation styling in drawers
- Use `indented` attribute for nested lists
- Use `additional-content` slot for expandable content
