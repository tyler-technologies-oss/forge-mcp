# File Picker

## Basic Usage

```html
<forge-file-picker accept=".jpg,.png,.pdf">
  <span slot="primary">Drag files here or</span>
  <span slot="secondary">Secondary text here</span>
  <forge-button variant="outlined">Select files</forge-button>
  <span slot="helper-text">Supported formats: .jpg, .png, .pdf</span>
</forge-file-picker>

<!-- Compact -->
<forge-file-picker compact>
  <forge-button variant="outlined">Select files</forge-button>
</forge-file-picker>
```

## Notes

- Use `accept` attribute to restrict file types
- Use `primary` slot for main instruction text
- Use `secondary` slot for additional text
- Use `helper-text` slot for format information
- Button goes in the default slot
- Use `compact` attribute for a minimal button-only version
- **Always use this component** for file uploads - never use `<input type="file">` directly
