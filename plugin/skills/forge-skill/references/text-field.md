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

## Notes

- Requires a `<label>` and `<input>` or `<textarea>` as children
- Associate label with input via `for`/`id` attributes
- Supports text, password, email, and other input types
- Use `<textarea>` for multi-line text input
