import { BaseTemplateResource } from '../base/base-template-resource.js';

/**
 * Resource providing Tyler Forge border documentation from static template content.
 */
export class BorderDesignTokensResource extends BaseTemplateResource {
  constructor() {
    super('design-tokens/border.md');
  }
}
