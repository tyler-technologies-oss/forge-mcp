# Quantity Field (Extended Component)

## Basic Usage

```html
<forge-quantity-field>
  <label slot="label" for="quantity">Quantity</label>
  <input id="quantity" type="number" value="1" aria-label="Set a quantity" step="2">
  <span slot="support-text">Enter a quantity</span>
</forge-quantity-field>
```

## Notes

- Numeric input with increment/decrement buttons
- Available slots:
  - `label`: Field label
  - Default: Number input element
  - `support-text`: Helper text below the field
- Use `step` attribute on the input to control increment amount

**CRITICAL: This is an extended component. All extended components require side-effect imports to register with the browser.**

```typescript
import '@tylertech/forge-extended/quantity-field';
```
