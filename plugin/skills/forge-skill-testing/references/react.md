# React Integration

Reference for using Tyler Forge with React.

---

## Package Import

**Always use `@tylertech/forge-react` package** for React applications.

---

## Component Naming

React components use **capitalized names** instead of kebab-case:

| Web Component | React Component |
|---------------|-----------------|
| `<forge-button>` | `<ForgeButton>` |
| `<forge-card>` | `<ForgeCard>` |
| `<forge-text-field>` | `<ForgeTextField>` |
| `<forge-icon>` | `<ForgeIcon>` |
| `<forge-icon-button>` | `<ForgeIconButton>` |
| `<forge-select>` | `<ForgeSelect>` |
| `<forge-checkbox>` | `<ForgeCheckbox>` |
| `<forge-dialog>` | `<ForgeDialog>` |
| `<forge-table>` | `<ForgeTable>` |
| `<forge-app-layout>` | `<ForgeAppLayout>` |

---

## Property Naming

React uses camelCase for properties:

| HTML Attribute | React Property |
|----------------|----------------|
| `label-position` | `labelPosition` |
| `aria-label` | `aria-label` (unchanged) |
| `class` | `className` |

---

## React Rules

1. **Self-closing tags ARE acceptable** in React
2. **Forge Extended uses web component syntax** (lowercase) since no React wrappers exist
3. **Import Forge Extended via side-effects**: `import '@tylertech/forge-extended/user-profile';`
