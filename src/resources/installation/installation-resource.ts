import { BaseTemplateResource } from '../base/base-template-resource.js';

/**
 * Resource providing Tyler Forge installation documentation from static template content.
 */
export class InstallationResource extends BaseTemplateResource {
  constructor() {
    super('installation/installation.md');
  }
}
