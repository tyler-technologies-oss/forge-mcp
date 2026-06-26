# Busy Indicator (Extended Component)

## Basic Usage

```html
<forge-button variant="raised">Show Busy Indicator</forge-button>
<forge-busy-indicator></forge-busy-indicator>
```

## Notes

- Typically shown and hidden programmatically via JavaScript
- Control visibility via the `open` property
- For Angular: Use `BusyIndicatorService` from `@tylertech/forge-extended-angular`

**CRITICAL: This is an extended component. All extended components require side-effect imports to register with the browser.**

```typescript
import '@tylertech/forge-extended/busy-indicator';
```
