# Table Patterns

Reference for Forge table components.

---

## Table Configuration

Tables are configured via JavaScript properties:

| Property | Purpose |
|----------|---------|
| `columnConfigurations` | Array of column definitions with `property` and `header` |
| `data` | Array of data objects |

---

## Paginator Attributes

| Attribute | Purpose |
|-----------|---------|
| `page-size` | Number of items per page |
| `total` | Total number of items |
| `first-last` | Show first/last page buttons |

---

## Table Rules

1. **Use `forge-structured-card` with `body-spacing="none"`** for tables with headers and pagination
2. **Place table in `slot="body"`** of structured card
3. **Place paginator in `slot="footer-primary-action"`**
