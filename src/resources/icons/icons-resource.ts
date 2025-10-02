import { BaseTemplateResource } from '../base/base-template-resource.js';

/**
 * Resource providing Tyler Forge icons documentation from static template content.
 */
export class IconsResource extends BaseTemplateResource {
  constructor() {
    super('icons/icons.md');
  }
}
