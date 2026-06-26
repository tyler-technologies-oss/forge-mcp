# Dialog

## Basic Usage

```html
<forge-dialog aria-labelledby="dialog-title">
  <!-- Example header -->
  <forge-toolbar>
    <h2 id="dialog-title" class="forge-typography--heading4" slot="start">Dialog Title</h2>
    <forge-icon-button slot="end" id="close-button" aria-label="Close dialog">
      <forge-icon name="close"></forge-icon>
    </forge-icon-button>
  </forge-toolbar>

  <!-- Example content -->
  <p>Dialog content goes here</p>

  <!-- Example footer -->
  <forge-toolbar inverted slot="footer">
    <forge-button variant="text" id="cancel-button" slot="end">Cancel</forge-button>
    <forge-button id="ok-button" slot="end">OK</forge-button>
  </forge-toolbar>
</forge-dialog>

<script>
const dialog = document.querySelector('forge-dialog');

// Dialogs are typically opened via some user action
dialog.open = true;

// Dialogs can also be created dynamically via JavaScript and injected into the DOM
const dynamicDialog = document.createElement('forge-dialog');
dynamicDialog.innerHTML = `<p>This is a dynamically created dialog</p>`;
document.body.appendChild(dynamicDialog);
dynamicDialog.open = true;
</script>
```

## Notes

- Use `aria-labelledby` pointing to the title element for accessibility
- Control visibility via the `open` property
- Can be created statically in HTML or dynamically via JavaScript
- For Angular: Use `DialogService` from `@tylertech/forge-angular` for programmatic dialogs
- See `dialogs.md` reference for complete dialog structure guidelines with `<forge-scaffold>`
