import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { BaseToolHandler, ToolInput } from '../tool-handler.js';
import { getResourceManager } from '../../resources/index.js';
import { ComponentUsageExamplesResource } from '../../resources/components/component-usage-examples-resource.js';
import { ComponentSummaryResource } from '../../resources/components/component-summary-resource.js';
import { getCEMLoader } from '../../services/cem-loader.js';
import { getTemplateEngine } from '../../services/handlebars-template-engine.js';
import { TemplateContext } from '../../types/index.js';

export interface ComponentDocumentationInput extends ToolInput {
  component?: string;
  sections?: string[];
  format?: 'full' | 'summary' | 'usage-examples';
}

export class ComponentDocumentationTool extends BaseToolHandler<ComponentDocumentationInput> {
  private _resourceManager = getResourceManager();
  private _usageExamplesResource = new ComponentUsageExamplesResource();
  private _componentSummaryResource = new ComponentSummaryResource();
  private _cemLoader = getCEMLoader();
  private _templateEngine = getTemplateEngine();

  constructor() {
    super(
      'get_component_docs',
      'Get comprehensive documentation for Tyler Forge components in various formats: full API reference, summary overview, or structural usage examples. Returns component list when no component specified.',
    );
  }

  public getTool(): Tool {
    return {
      name: this.name,
      description: this.description,
      inputSchema: {
        type: 'object',
        properties: {
          component: {
            type: 'string',
            description:
              'Component tag name (e.g., "forge-button", "forge-card"). If not provided with format=usage-examples, returns component names list.',
          },
          sections: {
            type: 'array',
            items: {
              type: 'string',
              enum: [
                'properties',
                'methods',
                'events',
                'slots',
                'css-custom-properties',
                'css-parts',
                'css-classes',
                'states',
              ],
            },
            description:
              'Optional: specific documentation sections to include. Only applies to full format.',
          },
          format: {
            type: 'string',
            enum: ['full', 'summary', 'usage-examples'],
            description:
              'Documentation format: full (default), summary (brief overview), or usage-examples (structural HTML examples)',
          },
        },
        required: [],
      },
    };
  }

  public async execute(
    args: ComponentDocumentationInput,
  ): Promise<import('@modelcontextprotocol/sdk/types.js').CallToolResult> {
    const { component, sections, format = 'full' } = args;

    await this._resourceManager.initialize();

    // Handle usage-examples format
    if (format === 'usage-examples') {
      if (!component) {
        throw new Error(
          'Component name is required for usage-examples format. Use list_components to see available components.',
        );
      }
      const examples = await this._usageExamplesResource.get(component);
      return this._createTextResponse(examples);
    }

    // Handle component name list (when no component specified)
    if (!component) {
      const namesContent = await this._resourceManager.readResource(
        'forge://components/names',
      );
      return this._createTextResponse(namesContent);
    }

    // Handle summary format using ComponentSummaryResource directly
    if (format === 'summary') {
      const cemComponent = this._cemLoader.getComponent(component);
      if (!cemComponent) {
        throw new Error(
          `Component not found: ${component}. Use list_components to see available components.`,
        );
      }
      const summaryContent =
        await this._componentSummaryResource.get(cemComponent);
      return this._createTextResponse(summaryContent);
    }

    // Handle full format
    const componentData = this._cemLoader.getComponent(component);
    if (!componentData) {
      throw new Error(
        `Component not found: ${component}. Use list_components to see available components.`,
      );
    }

    // If sections are specified, use CEM data to generate only requested sections
    if (format === 'full' && sections && sections.length > 0) {
      const sectionContent = await this._generateSectionContent(
        componentData,
        sections,
      );
      return this._createTextResponse(sectionContent);
    }

    // Otherwise, return the full resource content verbatim
    const uri = `forge://component/${component}`;
    const fullContent = await this._resourceManager.readResource(uri);
    return this._createTextResponse(fullContent);
  }

  /**
   * Generate content for specific sections using CEM data and templates
   */
  private async _generateSectionContent(
    component: any,
    sections: string[],
  ): Promise<string> {
    const context = this._createTemplateContext(component);
    const contentSections: string[] = [];

    // Always include the component title
    contentSections.push(`# API REFERENCE: ${component.name}`);
    contentSections.push('');
    contentSections.push(
      `**Tyler Forge Component** | **Tag:** \`<${component.tagName}>\` | **Type:** Web Component`,
    );

    if (component.summary) {
      contentSections.push('');
      contentSections.push(`**PURPOSE:** ${component.summary}`);
    }

    if (component.description) {
      contentSections.push('');
      contentSections.push(`**DESCRIPTION:** ${component.description}`);
    }

    // Map section names to template names and generate content
    for (const section of sections) {
      const templateName = this._getTemplateNameForSection(section);

      if (templateName) {
        try {
          const sectionContent = await this._templateEngine.render(
            templateName,
            context,
          );
          if (sectionContent.trim()) {
            contentSections.push('');
            contentSections.push(sectionContent);
          }
        } catch (_error) {
          // If template doesn't exist, add error message
          contentSections.push('');
          contentSections.push(
            `## ${section.toUpperCase()}\n\n*Template not found for section: ${section}*`,
          );
        }
      }
    }

    return contentSections.join('\n');
  }

  /**
   * Map section parameter names to template file names
   */
  private _getTemplateNameForSection(section: string): string | null {
    const templateMap: Record<string, string> = {
      properties: 'components/component-properties.md',
      methods: 'components/component-methods.md',
      events: 'components/component-events.md',
      slots: 'components/component-slots.md',
      'css-custom-properties': 'components/component-css-properties.md',
      'css-parts': 'components/component-css-parts.md',
      'css-classes': 'components/component-css-classes.md',
      states: 'components/component-states.md',
    };

    return templateMap[section] || null;
  }

  /**
   * Create template context from component data (similar to ElementDocumentationResource)
   */
  private _createTemplateContext(component: any): TemplateContext {
    const publicMembers =
      component.members?.filter((m: any) => m.privacy === 'public') || [];
    const properties = publicMembers.filter((m: any) => m.kind === 'field');
    const methods = publicMembers.filter((m: any) => m.kind === 'method');

    return {
      // Basic info
      name: component.name,
      tagName: component.tagName,
      description: component.description,
      summary: component.summary,

      // API surfaces
      attributes: component.attributes || [],
      events: component.events || [],
      properties,
      methods,
      cssProperties: component.cssProperties || [],
      cssParts: component.cssParts || [],
      slots: component.slots || [],
      states: component.states || [],
      cssClasses: component.cssClasses || [],

      // Dependencies and inheritance
      dependencies: component.dependencies || [],

      // Computed helpers
      hasAttributes: (component.attributes?.length || 0) > 0,
      hasEvents: (component.events?.length || 0) > 0,
      hasProperties: properties.length > 0,
      hasMethods: methods.length > 0,
      hasCssProperties: (component.cssProperties?.length || 0) > 0,
      hasCssParts: (component.cssParts?.length || 0) > 0,
      hasSlots: (component.slots?.length || 0) > 0,
      hasStates: (component.states?.length || 0) > 0,
      hasCssClasses: (component.cssClasses?.length || 0) > 0,
      hasDependencies: (component.dependencies?.length || 0) > 0,
    };
  }
}
