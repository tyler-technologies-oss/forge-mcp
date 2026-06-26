# Confirmation Dialog (Extended Component)

## Basic Usage

```html
<forge-button variant="raised">Show Confirmation Dialog</forge-button>
<forge-confirmation-dialog>
  <span slot="title">Delete selected images?</span>
  <span slot="message">Images will be permanently removed from your account and all synced devices.</span>
  <span slot="secondary-button-text">No</span>
  <span slot="primary-button-text">Yes</span>
</forge-confirmation-dialog>
```

## Notes

- Pre-built confirmation dialog with standardized structure
- Available slots:
  - `title`: Dialog title
  - `message`: Description/question text
  - `secondary-button-text`: Cancel/No button label
  - `primary-button-text`: Confirm/Yes button label
- Control visibility via the `open` property
- For Angular: Use `ConfirmationDialogService` from `@tylertech/forge-extended-angular`

**CRITICAL: This is an extended component. All extended components require side-effect imports to register with the browser.**

```typescript
import '@tylertech/forge-extended/confirmation-dialog';
```
