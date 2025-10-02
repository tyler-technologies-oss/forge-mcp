import { AsyncResourceHandler } from '../../types/index.js';
import { promises as fs } from 'fs';
import { getTemplatePath } from '../../utils/path-utils.js';

export class ComponentUsageExamplesResource
  implements AsyncResourceHandler<string | string[]>
{
  private _template: string | null = null;

  /**
   * Get usage examples for components
   * @param componentNames - Single component name or array of component names
   */
  public async get(componentNames: string | string[]): Promise<string> {
    await this._ensureTemplateLoaded();

    const names = Array.isArray(componentNames)
      ? componentNames
      : [componentNames];
    const examples = names
      .map(name => this._extractComponentExample(name))
      .filter(example => example !== null)
      .join('\n\n---\n\n');

    if (examples.length === 0) {
      const namesList = names.join(', ');
      return `# Usage Examples

No usage examples found for: ${namesList}

Available components with examples can be found in the full usage examples template.`;
    }

    return examples;
  }

  /**
   * Get all usage examples
   */
  public async getAll(): Promise<string> {
    return await this._getTemplate();
  }

  /**
   * Extract usage example for a specific component
   */
  private _extractComponentExample(componentName: string): string | null {
    if (!this._template) {
      return null;
    }

    // Look for the component section using the pattern: ## ComponentName (forge-component-name)
    const headerPattern = new RegExp(
      `^## [^(]+\\(${componentName}\\)\\s*$`,
      'gm',
    );
    const match = headerPattern.exec(this._template);

    if (!match) {
      return null;
    }

    const startIndex = match.index;
    const lines = this._template.substring(startIndex).split('\n');

    // Find the end of this section (next ## header or end of file)
    const endIndex = lines.findIndex(
      (line, index) => index > 0 && line.startsWith('## '),
    );
    const sectionLines = endIndex !== -1 ? lines.slice(0, endIndex) : lines;

    return sectionLines.join('\n').trim();
  }

  /**
   * Ensure the template is loaded
   */
  private async _ensureTemplateLoaded(): Promise<void> {
    if (this._template === null) {
      this._template = await this._getTemplate();
    }
  }

  /**
   * Get the raw template content
   */
  private async _getTemplate(): Promise<string> {
    const templatePath = getTemplatePath('usage/usage-examples.md');
    return await fs.readFile(templatePath, 'utf-8');
  }
}
