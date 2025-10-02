import { BaseTemplateResource } from '../base/base-template-resource.js';

/**
 * Resource providing Tyler Forge Svelte framework documentation from static template content.
 */
export class FrameworkSvelteResource extends BaseTemplateResource {
  constructor() {
    super('frameworks/framework-svelte.md');
  }
}
