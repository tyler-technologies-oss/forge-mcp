# Angular Integration

Reference for using Tyler Forge with Angular.

---

## Module Imports

**ALWAYS import Tyler Forge modules from `@tylertech/forge-angular`.**

---

## Common Module Imports

| Component | Module Import |
|-----------|---------------|
| `<forge-button>` | `ForgeButtonModule` |
| `<forge-text-field>` | `ForgeTextFieldModule` |
| `<forge-select>` | `ForgeSelectModule` |
| `<forge-checkbox>` | `ForgeCheckboxModule` |
| `<forge-card>` | `ForgeCardModule` |
| `<forge-dialog>` | `ForgeDialogModule` |
| `<forge-table>` | `ForgeTableModule` |
| `<forge-icon>` | `ForgeIconModule` |
| `<forge-icon-button>` | `ForgeIconButtonModule` |
| `<forge-app-layout>` | `ForgeAppLayoutModule` |

---

## Angular Rules

1. **DO NOT use self-closing tags** in Angular templates
2. **Import Forge Extended via side-effects**: `import '@tylertech/forge-extended/user-profile';`
3. **Standalone components** import modules directly in the `imports` array
