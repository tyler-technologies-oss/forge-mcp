# Count Card (Extended Component)

## Basic Usage

```html
<forge-count-card>
  <forge-icon slot="icon" name="attach_money"></forge-icon>
  <span slot="label">Today's Revenue</span>
  <span slot="count">$303.33</span>
</forge-count-card>
```

## Examples

### With Badge

```html
<forge-count-card theme="none">
  <forge-icon slot="icon" name="attach_money"></forge-icon>
  <span slot="label">Tomorrow's money</span>
  <forge-badge slot="header-end" theme="none">+12%</forge-badge>
  <span slot="count">$303.33</span>
</forge-count-card>
```

### With Full-Width Content (e.g., Sparkline)

```html
<forge-count-card>
  <forge-icon slot="icon" name="trending_up"></forge-icon>
  <span slot="label">Weekly Sales</span>
  <span slot="count">$4,250.00</span>
  <svg slot="full-width" viewBox="0 0 200 40" style="width: 100%; display: block;">
    <polyline fill="none" stroke="var(--forge-theme-primary)" stroke-width="2"
      points="0,35 20,30 40,32 60,25 80,28 100,20 120,22 140,15 160,18 180,10 200,5">
    </polyline>
  </svg>
</forge-count-card>
```

### With Additional Body Content

```html
<forge-count-card>
  <span slot="label">Today's money</span>
  <forge-badge slot="header-end" theme="success">
    +8.2%
    <forge-icon slot="end" name="trending_up"></forge-icon>
  </forge-badge>
  <span slot="count">$50,846.00</span>
  <div slot="body">
    <span class="forge-typography--body1">66% of monthly target</span>
    <forge-meter value="0.66" min="0" max="1" theme="success"></forge-meter>
  </div>
</forge-count-card>
```

### With Menu Action

```html
<forge-count-card>
  <forge-icon slot="icon" name="attach_money"></forge-icon>
  <span slot="label">Revenue</span>
  <forge-menu slot="action">
    <forge-icon-button aria-label="More options">
      <forge-icon name="more_vert"></forge-icon>
    </forge-icon-button>
  </forge-menu>
  <span slot="count">$12,450.00</span>
</forge-count-card>
```

## Theming

```html
<forge-count-card theme="none">...</forge-count-card>
<forge-count-card theme="primary">...</forge-count-card>
<forge-count-card theme="secondary">...</forge-count-card>
<forge-count-card theme="tertiary">...</forge-count-card>
<forge-count-card theme="success">...</forge-count-card>
<forge-count-card theme="error">...</forge-count-card>
<forge-count-card theme="warning">...</forge-count-card>
<forge-count-card theme="info">...</forge-count-card>
<forge-count-card theme="info-secondary">...</forge-count-card>
```

## Notes

- Available slots:
  - `icon`: Leading icon
  - `label`: Card label/title
  - `count`: The main count/value display
  - `header-end`: Content at the end of the header (badges, indicators)
  - `action`: Action menu or button
  - `body`: Additional content below the count
  - `full-width`: Full-width content like charts or graphs
- Use `theme` attribute for semantic coloring: `none`, `primary`, `secondary`, `tertiary`, `success`, `error`, `warning`, `info`, `info-secondary`

**CRITICAL: This is an extended component. All extended components require side-effect imports to register with the browser.**

```typescript
import '@tylertech/forge-extended/count-card';
```
