# Spacing

Use Tailwind classes that map to Forge spacing tokens. **Never use arbitrary values.**

---

## Spacing Scale

| Token | Value | Tailwind Classes |
|-------|-------|------------------|
| `xxxsmall` | 2px | `p-xxxsmall`, `m-xxxsmall`, `gap-xxxsmall` |
| `xxsmall` | 4px | `p-xxsmall`, `m-xxsmall`, `gap-xxsmall` |
| `xsmall` | 8px | `p-xsmall`, `m-xsmall`, `gap-xsmall` |
| `small` | 12px | `p-small`, `m-small`, `gap-small` |
| `medium` | 16px | `p-medium`, `m-medium`, `gap-medium` |
| `large` | 24px | `p-large`, `m-large`, `gap-large` |
| `xlarge` | 32px | `p-xlarge`, `m-xlarge`, `gap-xlarge` |

---

## Spacing Best Practices

1. **Use `gap-*` for spacing** between flex/grid children, not margins
2. **Cards use `p-0` class** with inner `<div class="p-medium">` for content padding
3. **Form sections** use `gap-xlarge` between sections, `gap-medium` between fields
4. **Button groups** use `gap-small` between buttons
