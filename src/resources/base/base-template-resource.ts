import { AsyncResourceHandler } from '../../types/index.js';
import { promises as fs } from 'fs';
import { getTemplatePath } from '../../utils/path-utils.js';

/**
 * Base class for resources that read content from static markdown template files.
 *
 * This eliminates code duplication across simple template-based resources by providing
 * a common implementation that reads a specified template file and returns its content.
 *
 * Subclasses only need to provide the template filename in their constructor.
 */
export abstract class BaseTemplateResource
  implements AsyncResourceHandler<void>
{
  protected readonly _templateFilePath: string;

  /**
   * Create a template-based resource.
   *
   * @param templateFilePath - The file path of the template file to read
   */
  constructor(templateFilePath: string) {
    this._templateFilePath = templateFilePath;
  }

  /**
   * Get the resource content by reading the template file.
   *
   * @returns Promise resolving to the template file content as a string
   * @throws Error if the template file cannot be read
   */
  public async get(): Promise<string> {
    const templatePath = getTemplatePath(this._templateFilePath);
    return await fs.readFile(templatePath, 'utf-8');
  }
}
