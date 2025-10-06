# Tyler Forge™ MCP Server

Get instant access to Tyler Forge™ web component documentation directly in AI clients. Ask questions, generate code examples, and explore design system details.

## What You Get

**Tyler Forge™** is Tyler Technologies' comprehensive web component library and design system. This tool brings that documentation into your AI tools so you can:

- **Discover components** - Find the right component for your needs
- **Generate code** - Get framework-specific examples (Angular, React, Vue, Svelte)
- **Access design tokens** - Use colors, spacing, typography consistently
- **Learn best practices** - Get implementation guidance and accessibility tips

## How does it work?

This MCP server provides a set of declarative resources and tools for accessing Tyler Forge documentation. It uses a progressive disclosure model to
minimize complexity while maximizing accuracy.

### Context-Aware

When you start the MCP server in your AI client, it automatically detects the currently installed version of Tyler Forge (if any) in your project. This
allows it to provide version-specific documentation. If no version is detected, it defaults to the latest stable release that is
bundled within this MCP server.

### Progressive Disclosure

The MCP server is designed to minimize cognitive load by exposing only the most essential resources and tools upfront. More detailed information can be
accessed through specific tools or follow-up queries. This keeps control of the token usage while still providing comprehensive access to the documentation
when needed.

### Documentation Source

All documentation is either pulled from the Custom Elements Manifest (CEM) files included with each Tyler Forge package, as well as information that was
sourced from the documentation site at [https://forge.tylerdev.io](https://forge.tylerdev.io).

## Setup

### Claude Desktop

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

### Claude Code

```bash
claude mcp add forge -- npx -y @tylertech/forge-mcp@latest
```

> See the [Claude Code MCP documentation](https://docs.claude.com/en/docs/claude-code/mcp) for more information.

### VS Code

Add the Forge MCP server to the `.vscode/mcp.json` configuration file in your project, or use the Command Palette to add it via "MCP: Add Server...".

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

> **Note:** You may need to start the server manually after adding it to the config file. Use the "MCP: List Servers" command from the Command Palette.

See the [VS Code MCP docs](https://code.visualstudio.com/docs/copilot/customization/mcp-servers) for more info.

### Best Practices

When using any AI-powered tool, it's important to follow best practices to ensure effective usage and accurate results:

- **Be Specific**: Clearly define your questions or requests to get the most relevant information. Using vague prompts can lead to inaccurate or incorrect responses.
- **Plan Ahead**: Spend time outlining and planning your prompts, and break things down into smaller tasks. This can significantly improve the quality of the responses.
- **Validate**: Always cross-check critical information with official documentation or trusted sources. AI output may not always be accurate.
- **Provide Context**: When writing prompts, provide relevant context to help the AI understand your needs better.
- **Use Examples**: When possible, provide examples or screenshots of what you're looking for to guide the AI's responses.
- **Limit Scope**: Break down complex queries into smaller, manageable parts for better clarity and responses.

If there's one thing to take away, it's to be specific and spend time up front planning and structuring your prompts. This will lead to more accurate and useful results. In the end, these tools are here to assist you, and they can get things wrong even with the best prompts and context. Always verify and review the output for accuracy.

## Important Note

**ALWAYS** validate the output from any AI tool for accuracy. While this MCP server is designed to provide accurate information, it may not always be perfect
and LLMs are known to hallucinate at times. Always cross-check critical information with the official Tyler Forge™ documentation or trusted sources.

## Capabilities

### Tools

The following tools are available for interacting with Tyler Forge documentation. Each tool uses declarative parameters to provide comprehensive functionality while minimizing the cognitive load for AI clients:

| Tool | Description |
|------|-------------|
| **Component Tools** ||
| `get_component_docs` | Get comprehensive documentation for Tyler Forge components in various formats: full API reference, summary overview, or structural usage examples. Returns component list when no component specified. |
| `list_components` | Browse all available Tyler Forge components with descriptions. Returns a comprehensive table of all components with their purpose and capabilities. |
| `find_components` | Search Tyler Forge components by name, description, or functionality with enhanced fuzzy matching. Supports multi-term queries like "app bar drawer". Returns all components when no query provided. |
| **Design System Tools** ||
| `get_design_tokens` | Get Tyler Forge design tokens for consistent styling. Access color palettes, spacing scales, typography, animation, and other design system values. |
| `setup_typography` | Access Tyler Forge typography setup instructions including font families, type scales, weights, and practical usage guidelines for consistent text styling. |
| `setup_icons` | Access Tyler Forge icons system including installation, registration, and usage patterns for the forge-icon component. |
| `find_icons` | Search Tyler Icons using semantic/fuzzy search with natural language queries. Finds the closest matching icons by name and keywords. |
| **Framework Tools** ||
| `setup_framework` | Get complete framework-specific setup instructions for Tyler Forge components including installation, configuration, and best practices for Angular, React, Vue, Svelte, or Lit. |
| **Migration Tools** ||
| `get_version_migration_guide` | Get comprehensive migration guides for upgrading between Tyler Forge versions, including breaking changes, API mappings, and upgrade instructions. Defaults to upgrading from v2 to v3. |
| **General Tools** ||
| `get_usage_guide` | Get comprehensive Tyler Forge guides including installation instructions, framework-specific integration, and general usage patterns |

### Resources

The following **streamlined resources** are available for reference via a progressive disclosure model:

| Resource URI | Description |
|--------------|-------------|
| **Component Resources** ||
| `forge://components` | Overview of all Tyler Forge components with names and summaries |
| `forge://component/{tagName}` | Complete documentation for specific Tyler Forge component |
| **General Resources** ||
| `forge://installation` | Complete installation guide for Tyler Forge web components |
| `forge://usage` | Comprehensive usage guide for Tyler Forge web components |
| **Framework Resources** ||
| `forge://framework/angular` | Tyler Forge Angular integration guide |
| `forge://framework/react` | Tyler Forge React integration guide |
| `forge://framework/vue` | Tyler Forge Vue integration guide |
| `forge://framework/svelte` | Tyler Forge Svelte integration guide |
| `forge://framework/lit` | Tyler Forge Lit integration guide |
| **Design Token Resources** ||
| `forge://design-tokens` | Complete Tyler Forge design tokens including colors, spacing, typography, animation, borders, elevation, layering, and shapes |
| `forge://design-tokens/typography` | Tyler Forge typography system including font families, type scales, weights, and usage guidelines |
| `forge://design-tokens/color` | Tyler Forge color system including palettes, semantic colors, and usage guidelines |
| `forge://design-tokens/animation` | Tyler Forge animation design tokens including durations and easing curves |
| `forge://design-tokens/spacing` | Tyler Forge spacing scale design tokens for consistent layout and spacing |
| `forge://design-tokens/border` | Tyler Forge border design tokens including widths, radii, and styles |
| `forge://design-tokens/elevation` | Tyler Forge elevation design tokens including shadow styles and layering guidelines |
| `forge://design-tokens/shape` | Tyler Forge shape design tokens including corner styles and usage guidelines |
| `forge://design-tokens/layering` | Tyler Forge layering design tokens including z-index values and stacking context guidelines |
| **Icons Resources** ||
| `forge://icons` | Complete guide to installing and using Tyler Forge icons |

> **Note**: Granular component resources (`/properties`, `/methods`, `/events`, etc.) have been removed to reduce complexity. Use the **tools** for granular access to specific component information.

## Development

**Commands:**
```bash
pnpm run dev    # Watch mode
pnpm run debug  # Test with MCP inspector
pnpm run build  # Build for production
```

## Contributing

Contributions are welcome! Please see the [CONTRIBUTING](CONTRIBUTING.md) guide for details.

If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

Apache-2.0 License - see [LICENSE](LICENSE) file for details.

---

**Part of the [Tyler Technologies](https://tylerforge.design) Open Source initiative**
