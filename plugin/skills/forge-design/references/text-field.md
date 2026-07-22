# Text Field

## Basic Usage

```html
<forge-text-field>
  <label for="my-text-field">Text Field Label</label>
  <input id="my-text-field" type="text" placeholder="Enter text..." />
</forge-text-field>

<forge-text-field>
  <label for="my-textarea">Textarea Label</label>
  <textarea id="my-textarea" placeholder="Enter text..."></textarea>
</forge-text-field>
```

## Required Field

```html
<forge-text-field required>
  <label for="required-field">Required Field</label>
  <input id="required-field" type="text" required />
</forge-text-field>
```

## Notes

- Requires a `<label>` and `<input>` or `<textarea>` as children
- Associate label with input via `for`/`id` attributes
- Supports text, password, email, and other input types
- Use `<textarea>` for multi-line text input
- The `required` attribute must be set on both the `<forge-text-field>` element (for visual indicator) and the nested `<input>` (for form validation)
