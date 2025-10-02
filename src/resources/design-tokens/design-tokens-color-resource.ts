import { BaseTemplateResource } from '../base/base-template-resource.js';

/**
 * Resource providing Tyler Forge color documentation from static template content.
 */
export class ColorDesignTokensResource extends BaseTemplateResource {
  constructor() {
    super('design-tokens/color.md');
  }
}
