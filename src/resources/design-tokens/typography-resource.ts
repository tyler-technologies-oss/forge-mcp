import { BaseTemplateResource } from '../base/base-template-resource.js';

/**
 * Resource providing Tyler Forge typography documentation from static template content.
 */
export class TypographyResource extends BaseTemplateResource {
  constructor() {
    super('design-tokens/typography.md');
  }
}
