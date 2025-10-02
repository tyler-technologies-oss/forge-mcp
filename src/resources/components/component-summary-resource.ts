import {
  CEMComponentDeclaration,
  TemplateContext,
  AsyncResourceHandler,
} from '../../types/index.js';
import { getTemplateEngine } from '../../services/handlebars-template-engine.js';

export class ComponentSummaryResource
  implements AsyncResourceHandler<CEMComponentDeclaration>
{
  private _templateEngine = getTemplateEngine();

  public async get(component: CEMComponentDeclaration): Promise<string> {
    const context = this._createTemplateContext(component);
    return await this._templateEngine.render(
      'components/component-summary.md',
      context,
    );
  }

  private _createTemplateContext(
    component: CEMComponentDeclaration,
  ): TemplateContext {
    const publicMembers =
      component.members?.filter(m => m.privacy === 'public') || [];
    const properties = publicMembers.filter(m => m.kind === 'field');
    const methods = publicMembers.filter(m => m.kind === 'method');

    return {
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

      // Computed helpers
      hasAttributes: (component.attributes?.length || 0) > 0,
      hasEvents: (component.events?.length || 0) > 0,
      hasProperties: properties.length > 0,
      hasMethods: methods.length > 0,
      hasCssProperties: (component.cssProperties?.length || 0) > 0,
      hasCssParts: (component.cssParts?.length || 0) > 0,
      hasSlots: (component.slots?.length || 0) > 0,
    };
  }
}
