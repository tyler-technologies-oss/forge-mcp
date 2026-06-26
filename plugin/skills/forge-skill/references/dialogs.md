# Dialog Rules

Dialogs use `<forge-scaffold>` for proper layout with header, body, and footer regions.

---

## Minimal Example

```html
<forge-dialog aria-labelledby="dialog-title">
  <forge-scaffold>
    <forge-toolbar slot="header">
      <h2 id="dialog-title" slot="start" class="text-heading3">Dialog Title</h2>
      <forge-icon-button slot="end" aria-label="Close dialog">
        <forge-icon name="close"></forge-icon>
      </forge-icon-button>
    </forge-toolbar>
    <div slot="body" class="p-medium">
      Dialog content goes here
    </div>
    <forge-toolbar slot="footer" inverted>
      <forge-button slot="end" variant="text">Cancel</forge-button>
      <forge-button slot="end">Confirm</forge-button>
    </forge-toolbar>
  </forge-scaffold>
</forge-dialog>
```

---

## Rules

1. **CRITICAL: All dialogs MUST use the standard scaffold structure** - Every dialog must have a `<forge-scaffold>` inside with three regions: header, body, and footer. This is non-negotiable unless the user explicitly requests otherwise. **Reference the basic dialog block (`blocks/dialogs/basic`) for the overall structural shell** (scaffold, toolbar placement, slots). The body content itself is flexible—forms, cards, lists, data displays, or any UI appropriate to the task can go inside the body slot.
2. **Use `aria-labelledby` on dialogs** pointing to the title element
3. **Close button must have `aria-label="Close dialog"`**
4. **Dialog titles use `text-heading3`** (same as card headers)
5. **Body content uses `p-medium` padding**
6. **Use `<forge-toolbar>` in the header slot** of the inner scaffold for dialog headers with title and actions. Check the "simple toolbar" block (`blocks/toolbar/simple`) for the correct pattern.
7. **Use `<forge-toolbar inverted>` in the footer slot** for dialog footers with action buttons. The `inverted` attribute provides proper visual distinction for footer regions.

---

## Notes

Use the MCP tools to get the latest component API details for dialog and scaffold components, including available slots and attributes.
