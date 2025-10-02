import { BaseTemplateResource } from '../base/base-template-resource.js';

/**
 * Resource providing Tyler Forge elevation documentation from static template content.
 */
export class ElevationDesignTokensResource extends BaseTemplateResource {
  constructor() {
    super('design-tokens/elevation.md');
  }
}
