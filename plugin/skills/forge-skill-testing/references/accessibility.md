# Accessibility

Reference for accessibility best practices in Forge applications.

---

## Core Accessibility Rules

1. **Always use `aria-label` on icon buttons**
2. **Use proper heading hierarchy** - don't skip levels (h1 → h2 → h3, etc.)
3. **Associate labels with inputs** via `for`/`id` attributes
4. **Use `aria-labelledby` on dialogs** pointing to the title element
5. **Use semantic elements** - `<nav>`, `<main>`, `<footer>`, `<form>`

---

## Heading Hierarchy

When using `forge-app-layout` or `forge-app-bar`, the page title is the h1, so **content headings should start at h2**.

---

## Autocomplete Attributes

| Field Type | Attribute |
|------------|-----------|
| Email | `autocomplete="email"` |
| Phone | `autocomplete="tel"` |
| Username | `autocomplete="username"` |
| Password | `autocomplete="current-password"` |

---

## ARIA Guidelines

When using ARIA attributes, preserve them from usage examples. If unsure, do not remove ARIA attributes - consult usage examples for additional context.
