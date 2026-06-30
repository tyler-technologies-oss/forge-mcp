# Tyler Forge™ MCP Server

Access Tyler Forge™ web component documentation directly in AI clients. Discover components, generate framework-specific code, validate APIs, and use design tokens correctly.

## Features

- **Version-aware**: Detects your installed Tyler Forge version and provides matching documentation
- **Forge Blocks**: Pre-built UI code patterns demonstrating correct Forge component usage
- **Usage Examples**: Real-world code snippets showing components in context
- **Component Validation**: Verify generated code against actual component APIs
- **Design Tokens**: Access colors, spacing, typography, and other design tokens
- **Framework Guides**: Setup instructions for Angular, React, Vue, Svelte, and Lit

## Setup

### Claude Code Plugin (Recommended)

The plugin bundles the MCP server with a `/forge-design` skill for expert UI guidance.

**Install:**
```bash
/plugin marketplace add tyler-technologies-oss/forge-mcp#blocks-mcp-adjustments
/plugin install forge@tyler-forge
```

**Verify installation:**
```bash
/skills
```

> You may need to restart Claude or run `/reload-skills` if the skill doesn't appear.

**Update the plugin:**
```bash
claude plugin marketplace update tyler-forge
```

**For local development:**
```bash
claude --plugin-dir /path/to/forge-mcp/plugin
```

### Claude Code (MCP Only)

```bash
claude mcp add -t stdio -s [scope] forge -- npx -y @tylertech/forge-mcp@latest
```

> `[scope]` must be `user`, `project`, or `local`. See [Claude Code MCP docs](https://docs.claude.com/en/docs/claude-code/mcp).

### Codex CLI

Add to `~/.codex/config.toml`:

```toml
[mcp_servers.forge]
command = "npx"
args = ["-y", "@tylertech/forge-mcp@latest"]
```

### Gemini CLI

```bash
gemini mcp add -t stdio -s [scope] forge npx -y @tylertech/forge-mcp@latest
```

### VS Code

Add to `.vscode/mcp.json`:

```json
{
  "servers": {
    "forge": {
      "command": "npx",
      "args": ["-y", "@tylertech/forge-mcp@latest"],
      "type": "stdio"
    }
  }
}
```

Or use Command Palette → `MCP: Add Server...` → `Command (stdio)` → enter `npx -y @tylertech/forge-mcp@latest`.

### Claude Desktop

Edit `claude_desktop_config.json` (Settings → Developer → Edit Config):

```json
{
  "mcpServers": {
    "forge": {
      "command": "npx",
      "args": ["-y", "@tylertech/forge-mcp@latest"]
    }
  }
}
```

## Core Concepts

### Forge Blocks

Blocks are pre-built UI patterns that show Forge components working together in context. They demonstrate real-world scenarios like login forms, data tables, application layouts, and dashboards—complete with proper layout, typography, spacing, and component composition.

**Why use blocks?**
- See how multiple components work together in realistic scenarios
- Handcrafted examples following Forge design system best practices
- Prevent common mistakes and ensure consistent UI patterns

**How to use blocks:**

```
# Search for blocks by functionality
get_forge_blocks(query: "login form")
get_forge_blocks(query: "data table with sorting")

# Find blocks using a specific component
get_forge_blocks(component: "forge-card")
get_forge_blocks(component: "forge-table")

# Browse by category
get_forge_blocks(category: "forms")
get_forge_blocks(category: "application-layout")

# Get full code for a specific block
get_forge_blocks(blockId: "src/blocks/forms/login")
```

### Usage Examples

Isolated code snippets showing individual component usage. These focus on a single component's structure and API without the surrounding context of a full UI pattern.

```
# Get usage examples for a component
get_component_docs(componentName: "forge-button", format: "usage-examples")
get_component_docs(componentName: "forge-text-field", format: "usage-examples")
```

### Component Documentation

Access complete API documentation including properties, events, slots, CSS parts, and CSS custom properties.

```
# Full API documentation
get_component_docs(componentName: "forge-dialog")

# Summary overview
get_component_docs(componentName: "forge-dialog", format: "summary")

# Usage examples from blocks
get_component_docs(componentName: "forge-dialog", format: "usage-examples")
```

## Capabilities

### Tools

| Tool | Description |
|------|-------------|
| `get_forge_blocks` | Search and retrieve pre-built UI patterns (use FIRST before generating UI code) |
| `get_component_docs` | Get component documentation (full API, summary, or usage examples) |
| `list_components` | Browse all available components |
| `find_components` | Search components by name or functionality |
| `validate_component_api` | Validate component API usage in generated code |
| `get_design_tokens` | Get design tokens (colors, spacing, typography, etc.) |
| `setup_typography` | Typography setup and usage guidelines |
| `setup_icons` | Icon system installation and usage |
| `find_icons` | Search icons by name or keywords |
| `setup_framework` | Framework-specific setup (Angular, React, Vue, Svelte, Lit) |
| `get_version_migration_guide` | Migration guides between Forge versions |
| `get_usage_guide` | General usage patterns and best practices |

### Resources

| URI | Description |
|-----|-------------|
| `forge://components` | All components overview |
| `forge://component/{tagName}` | Specific component documentation |
| `forge://installation` | Installation guide |
| `forge://usage` | Usage guide |
| `forge://framework/{name}` | Framework guides (angular, react, vue, svelte, lit) |
| `forge://design-tokens` | All design tokens |
| `forge://design-tokens/{category}` | Token categories (color, spacing, typography, animation, border, elevation, shape, layering) |
| `forge://icons` | Icons guide |

### Prompts

| Prompt | Description |
|--------|-------------|
| `forge_mode` | Sets baseline rules for Forge-specific tasks |

## Recommended Workflow

1. **Search blocks first** — Before writing any Forge UI code, call `get_forge_blocks` to find pre-built patterns
2. **Get usage examples** — Use `get_component_docs(format: "usage-examples")` for component-specific patterns
3. **Check component API** — Use `get_component_docs` for full API details when needed
4. **Validate before finalizing** — Call `validate_component_api` to verify your code uses correct APIs

## Development

**Commands:**
```bash
pnpm run dev    # Watch mode
pnpm run debug  # Test with MCP inspector
pnpm run build  # Build for production
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines. Issues and PRs welcome.

## License

Apache-2.0 License - see [LICENSE](LICENSE) file for details.

---

> **Note**: Always validate AI output against [official documentation](https://forge.tylerdev.io).

**Part of the [Tyler Technologies](https://tylerforge.design) Open Source initiative**
