# {{tagName}} - Component Summary

**Purpose:** {{#if summary}}{{summary}}{{else if description}}{{description}}{{else}}Tyler Forge web component{{/if}}

## API Surface
{{#if hasAttributes}}✓ **HTML Attributes** - {{attributeCount}} configurable attributes{{/if}}
{{#if hasProperties}}✓ **JavaScript Properties** - {{propertyCount}} programmatic properties{{/if}}
{{#if hasMethods}}✓ **Methods** - {{methodCount}} public methods{{/if}}
{{#if hasEvents}}✓ **Events** - {{eventCount}} emitted events{{/if}}
{{#if hasSlots}}✓ **Content Slots** - {{slotCount}} content insertion points{{/if}}
{{#if hasCssProperties}}✓ **CSS Variables** - {{cssPropertyCount}} customizable styles{{/if}}
{{#if hasCssParts}}✓ **CSS Parts** - {{cssPartCount}} styleable parts{{/if}}

{{#if hasAttributes}}
## Key Attributes
{{#each attributes}}
- `{{name}}`{{#if type}} ({{formatType type}}){{/if}}{{#if description}} - {{description}}{{/if}}
{{/each}}
{{/if}}

**Get full documentation:** Use `get_component_docs` with `component="{{tagName}}"`