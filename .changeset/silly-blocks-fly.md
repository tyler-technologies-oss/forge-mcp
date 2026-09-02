---
'@tylertech/forge-mcp': minor
---

Block-first redesign of the Forge MCP server and `forge-design` skill:

- Add `get_forge_blocks` tool for fetching and listing ready-made Forge UI code blocks, now the canonical source of Forge markup for both single components and larger patterns.
- Rework `get_component_docs` to surface an API Quick Reference (events, properties, attributes, slots, CSS custom properties) instead of prose usage examples; remove the `usage-examples` resource and redundant reference stubs.
- Add `generate_ui_plan` and `validate_ui_plan` tools for planning and validating UI composition before code is written.
- Add a PreToolUse hook and anti-patterns reference that catch common Forge misuse (inline styles, wrong layout components, etc.).
- Rework the `forge-design` skill around block-first routing with scope detection, consolidated dialog skills, and expanded references.
- Add caching for Forge tool calls and fix `BLOCKS_BASE_URL`, icon import paths, and block-by-category lookup.
