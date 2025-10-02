import {
  CEMComponentDeclaration,
  TemplateContext,
  AsyncResourceHandler,
} from '../../types/index.js';
import {
  getTemplateEngine,
  formatType,
  formatBoolean,
  formatOptional,
  createMarkdownTable,
} from '../../services/handlebars-template-engine.js';

export class ComponentDocsResource
  implements AsyncResourceHandler<CEMComponentDeclaration>
{
  private _templateEngine = getTemplateEngine();

  /**
   * Get documentation for a component using the template
   */
  public async get(component: CEMComponentDeclaration): Promise<string> {
    const context = this._createTemplateContext(component);

    try {
      return await this._templateEngine.render(
        'components/component.md',
        context,
      );
    } catch (_error) {
      // Fallback to built-in template if file doesn't exist
      return this._generateFallbackDocumentation(component);
    }
  }

  /**
   * Create template context from component data
   */
  private _createTemplateContext(
    component: CEMComponentDeclaration,
  ): TemplateContext {
    const publicMembers =
      component.members?.filter(m => m.privacy === 'public') || [];
    const properties = publicMembers.filter(m => m.kind === 'field');
    const methods = publicMembers.filter(m => m.kind === 'method');

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

      // Helper functions
      formatType,
      formatBoolean,
      formatOptional,
      createMarkdownTable,

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

  /**
   * Generate fallback documentation when template is not available
   */
  private _generateFallbackDocumentation(
    component: CEMComponentDeclaration,
  ): string {
    const sections: string[] = [];

    // Header
    sections.push(`# ${component.name}`);

    if (component.summary) {
      sections.push(`\n${component.summary}`);
    }

    if (component.description) {
      sections.push(`\n${component.description}`);
    }

    // Tag name
    sections.push(`\n## Tag Name`);
    sections.push(`\`<${component.tagName}>\``);

    // Attributes
    if (component.attributes?.length) {
      sections.push(`\n## Attributes`);
      sections.push('');
      for (const attr of component.attributes) {
        const type = attr.type?.text ? ` (\`${attr.type.text}\`)` : '';
        const defaultVal = attr.default
          ? ` - Default: \`${attr.default}\``
          : '';
        sections.push(
          `- **${attr.name}**${type}: ${attr.description || 'No description'}${defaultVal}`,
        );
      }
    }

    // Events
    if (component.events?.length) {
      sections.push(`\n## Events`);
      sections.push('');
      for (const event of component.events) {
        const type = event.type?.text ? ` (\`${event.type.text}\`)` : '';
        sections.push(
          `- **${event.name}**${type}: ${event.description || 'No description'}`,
        );
      }
    }

    // Properties (public fields)
    const publicProperties =
      component.members?.filter(
        m => m.kind === 'field' && m.privacy === 'public',
      ) || [];
    if (publicProperties.length) {
      sections.push(`\n## Properties`);
      sections.push('');
      for (const prop of publicProperties) {
        const type = prop.type?.text ? ` (\`${prop.type.text}\`)` : '';
        const defaultVal = prop.default
          ? ` - Default: \`${prop.default}\``
          : '';
        const readonly = prop.readonly ? ' (readonly)' : '';
        sections.push(
          `- **${prop.name}**${type}${readonly}: ${prop.description || 'No description'}${defaultVal}`,
        );
      }
    }

    // Methods
    const publicMethods =
      component.members?.filter(
        m => m.kind === 'method' && m.privacy === 'public',
      ) || [];
    if (publicMethods.length) {
      sections.push(`\n## Methods`);
      sections.push('');
      for (const method of publicMethods) {
        const returnType = method.return?.type?.text
          ? `: ${method.return.type.text}`
          : '';
        const params =
          method.parameters
            ?.map(p => {
              const type = p.type?.text ? `: ${p.type.text}` : '';
              const defaultVal = p.default ? ` = ${p.default}` : '';
              return `${p.name}${type}${defaultVal}`;
            })
            .join(', ') || '';

        sections.push(`- **${method.name}**(${params})${returnType}`);
        if (method.description) {
          sections.push(`  - ${method.description}`);
        }
      }
    }

    // CSS Properties
    if (component.cssProperties?.length) {
      sections.push(`\n## CSS Properties`);
      sections.push('');
      for (const cssProp of component.cssProperties) {
        const type = cssProp.type?.text ? ` (\`${cssProp.type.text}\`)` : '';
        sections.push(
          `- **${cssProp.name}**${type}: ${cssProp.description || 'No description'}`,
        );
      }
    }

    // CSS Parts
    if (component.cssParts?.length) {
      sections.push(`\n## CSS Parts`);
      sections.push('');
      for (const part of component.cssParts) {
        sections.push(
          `- **${part.name}**: ${part.description || 'No description'}`,
        );
      }
    }

    // Slots
    if (component.slots?.length) {
      sections.push(`\n## Slots`);
      sections.push('');
      for (const slot of component.slots) {
        const slotName = slot.name || 'default';
        sections.push(
          `- **${slotName}**: ${slot.description || 'No description'}`,
        );
      }
    }

    return sections.join('\n');
  }
}
