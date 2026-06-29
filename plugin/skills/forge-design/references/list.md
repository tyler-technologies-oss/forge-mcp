# List

## Basic Usage

### Static List

```html
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
```

### Interactive List

```html
<forge-list>
  <forge-list-item>
    <button type="button">List Item 1</button>
  </forge-list-item>
  <forge-list-item>
    <button type="button">List Item 2</button>
  </forge-list-item>
</forge-list>
```

### Navigation List (for sidebars/drawers)

```html
<forge-list navlist>
  <forge-list-item href="/dashboard">
    <forge-icon slot="start" name="dashboard"></forge-icon>
    <span slot="title">Dashboard</span>
  </forge-list-item>
  <forge-list-item href="/settings">
    <forge-icon slot="start" name="settings"></forge-icon>
    <span slot="title">Settings</span>
  </forge-list-item>
</forge-list>
```

### Expandable List Items

```html
<forge-list>
  <forge-list-item>
    <forge-icon slot="start" name="code"></forge-icon>
    <button type="button" id="exp-li-1">Expandable Item</button>
    <forge-open-icon slot="end"></forge-open-icon>
    <forge-expansion-panel trigger="exp-li-1" slot="additional-content">
      <forge-list indented>
        <forge-list-item>
          <button type="button">Nested Item One</button>
        </forge-list-item>
        <forge-list-item>
          <button type="button">Nested Item Two</button>
        </forge-list-item>
      </forge-list>
    </forge-expansion-panel>
  </forge-list-item>
</forge-list>
```

---

## List Item Slots

| Slot | Purpose |
|------|---------|
| `start` | Leading content (icons, avatars) |
| Default | Main content (text, buttons, links) |
| `end` | Trailing content (icons, badges, actions) |
| `additional-content` | Expandable content below the item |

---

## Rules

1. **Use `navlist` attribute** for navigation lists in sidebars/drawers
2. **Use `<forge-divider>`** between list sections
3. **All action icon buttons need `aria-label`** for accessibility
4. **For interactive items**, include `<button>` or `<a>` elements inside list items
5. **Use `indented` attribute** for nested lists
6. **Use `selected` attribute** on list items to indicate current selection
