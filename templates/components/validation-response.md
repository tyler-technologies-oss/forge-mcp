# API Validation Results: {{tagName}}

**Component:** `<{{tagName}}>`
**Total APIs Validated:** {{totalValidated}}

## Summary

- ✅ **Valid APIs:** {{validApis.length}}
- ❌ **Invalid APIs:** {{invalidApis.length}}
- ⚠️ **Deprecated APIs:** {{deprecatedApis.length}}

{{#if invalidApis.length}}
## ❌ Invalid APIs

These APIs do not exist on this component:

{{#each invalidApis}}
- **`{{name}}`** ({{apiType}})
{{/each}}

{{/if}}
{{#if deprecatedApis.length}}
## ⚠️ Deprecated APIs

These APIs exist but are deprecated:

{{#each deprecatedApis}}
- **`{{name}}`** ({{apiType}}){{#if deprecationMessage}}
  - 📝 **Deprecation:** {{deprecationMessage}}{{/if}}
{{/each}}

{{/if}}
{{#if validApis.length}}
## ✅ Valid APIs

These APIs are correctly available:

{{#each validApis}}
- **`{{name}}`** ({{apiType}})
{{/each}}

{{/if}}
{{#if invalidApis.length}}
## 📚 Available APIs

For reference, here are the relevant available APIs for this component:

{{#if availableApis.properties.length}}
**Properties:**
{{#each availableApis.properties}}
- **`{{name}}`**{{#if description}} - {{description}}{{/if}}
{{/each}}
{{/if}}
{{#if availableApis.attributes.length}}
**Attributes:**
{{#each availableApis.attributes}}
- **`{{name}}`**{{#if description}} - {{description}}{{/if}}
{{/each}}
{{/if}}
{{#if availableApis.events.length}}
**Events:**
{{#each availableApis.events}}
- **`{{name}}`**{{#if description}} - {{description}}{{/if}}
{{/each}}
{{/if}}
{{#if availableApis.methods.length}}
**Methods:**
{{#each availableApis.methods}}
- **`{{name}}`**{{#if description}} - {{description}}{{/if}}
{{/each}}
{{/if}}
{{#if availableApis.slots.length}}
**Slots:**
{{#each availableApis.slots}}
- **`{{name}}`**{{#if description}} - {{description}}{{/if}}
{{/each}}
{{/if}}
{{#if availableApis.cssProperties.length}}
**CSS Properties:**
{{#each availableApis.cssProperties}}
- **`{{name}}`**{{#if description}} - {{description}}{{/if}}
{{/each}}
{{/if}}
{{#if availableApis.cssParts.length}}
**CSS Parts:**
{{#each availableApis.cssParts}}
- **`{{name}}`**{{#if description}} - {{description}}{{/if}}
{{/each}}
{{/if}}
{{#if availableApis.cssClasses.length}}
**CSS Classes:**
{{#each availableApis.cssClasses}}
- **`{{name}}`**{{#if description}} - {{description}}{{/if}}
{{/each}}
{{/if}}

{{/if}}
{{#if (and (eq invalidApis.length 0) (eq deprecatedApis.length 0))}}
🎉 **All validated APIs are correct and up-to-date!**
{{/if}}