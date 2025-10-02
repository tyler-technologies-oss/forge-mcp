import { BaseTemplateResource } from '../base/base-template-resource.js';

/**
 * Resource providing Tyler Forge usage documentation from static template content.
 */
export class UsageResource extends BaseTemplateResource {
  constructor() {
    super('usage/usage.md');
  }
}
