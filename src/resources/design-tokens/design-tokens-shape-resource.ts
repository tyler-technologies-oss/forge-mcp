import { BaseTemplateResource } from '../base/base-template-resource.js';

/**
 * Resource providing Tyler Forge shape documentation from static template content.
 */
export class ShapeDesignTokensResource extends BaseTemplateResource {
  constructor() {
    super('design-tokens/shape.md');
  }
}
