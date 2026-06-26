# Application Layout Rules

**All Forge apps start with `forge-app-layout`** - it scaffolds the entire app structure.

---

## Rules

1. **Content headings start at h2** - the app bar title is h1
2. **Use navigation lists** for sidebar navigation

---

## Notes

Use the MCP tools to get the latest component API details for app-layout, including available slots and attributes.

**CRITICAL: This is an extended component. All extended components require side-effect imports to register with the browser.**

```typescript
import '@tylertech/forge-extended/app-layout';
```
