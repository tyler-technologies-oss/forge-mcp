import { BaseTemplateResource } from '../base/base-template-resource.js';

/**
 * Resource providing Tyler Forge animation documentation from static template content.
 */
export class AnimationDesignTokensResource extends BaseTemplateResource {
  constructor() {
    super('design-tokens/animation.md');
  }
}
