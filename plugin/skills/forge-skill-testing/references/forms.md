# Form Rules

## Component Selection

- `<forge-text-field>` requires an inner `<input>` or `<textarea>` element
- `<forge-select>` uses a `label` attribute, NOT a slotted `<label>` element
- `<forge-select>` requires inner `<forge-option>` elements, not native `<select>`/`<option>`
- `<forge-checkbox>`, `<forge-radio>`, `<forge-switch>` do NOT require native `<input>` elements
- Always use `<forge-file-picker>` instead of `<input type="file">`
- DO NOT use `<forge-field>` directly - it's an internal component

---

## Form Rules

1. **Never use placeholder attributes** on form fields unless explicitly requested
2. **Associate labels with inputs** via `for`/`id` attributes
3. **Use `gap-medium`** between form fields
4. **Use `gap-xlarge`** between form sections with `<forge-divider>` separators
5. **Button groups** use `flex gap-small justify-end`
