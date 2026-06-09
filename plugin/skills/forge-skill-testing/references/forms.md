# Form Patterns

Reference for Forge form components.

---

## Form Component Requirements

| Component | Requirements |
|-----------|--------------|
| `<forge-text-field>` | Requires inner `<input>` or `<textarea>` element |
| `<forge-select>` | Uses `label` attribute (NOT slotted `<label>`), requires inner `<forge-option>` elements |
| `<forge-checkbox>` | Does NOT require native `<input>` |
| `<forge-radio>` | Does NOT require native `<input>` |
| `<forge-switch>` | Does NOT require native `<input>` |
| `<forge-file-picker>` | Always use instead of `<input type="file">` |
| `<forge-date-picker>` | Wraps a `<forge-text-field>` |

---

## Form Rules

1. **Never use placeholder attributes** on form fields unless explicitly requested
2. **`forge-select` uses `label` attribute** - Not a slotted `<label>` element
3. **Never use `<input type="file">`** - Use `forge-file-picker`
4. **DO NOT use `<forge-field>` directly** - Internal component used within form components
5. **Associate labels with inputs** via `for`/`id` attributes

---

## Form Layout Guidelines

- Forms use `flex flex-col gap-medium` for consistent field spacing
- Multi-section forms use `gap-xlarge` between sections with `<forge-divider>` separators
- Button groups use `flex gap-small justify-end`
