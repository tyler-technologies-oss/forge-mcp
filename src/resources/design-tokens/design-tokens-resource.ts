import { BaseTemplateResource } from '../base/base-template-resource.js';

/**
 * Resource providing Tyler Forge design tokens documentation from static template content.
 */
export class DesignTokensResource extends BaseTemplateResource {
  constructor() {
    super('design-tokens/design-tokens.md');
  }
}
