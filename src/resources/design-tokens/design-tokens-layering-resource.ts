import { BaseTemplateResource } from '../base/base-template-resource.js';

/**
 * Resource providing Tyler Forge layering documentation from static template content.
 */
export class LayeringDesignTokensResource extends BaseTemplateResource {
  constructor() {
    super('design-tokens/layering.md');
  }
}
