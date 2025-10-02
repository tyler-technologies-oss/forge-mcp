import { BaseTemplateResource } from '../base/base-template-resource.js';

/**
 * Resource providing Tyler Forge spacing documentation from static template content.
 */
export class SpacingDesignTokensResource extends BaseTemplateResource {
  constructor() {
    super('design-tokens/spacing.md');
  }
}
