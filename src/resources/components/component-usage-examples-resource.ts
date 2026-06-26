import { AsyncResourceHandler } from '../../types/index.js';
import { promises as fs } from 'fs';
import { resolve } from 'path';

// Blocks path configuration
const BLOCKS_BASE_PATH = '/Users/nick.andrews@tylertech.com/Desktop/dev/forge';
const BLOCKS_DIST_PATH = resolve(BLOCKS_BASE_PATH, 'blocks/dist');
const BLOCKS_MANIFEST_PATH = resolve(BLOCKS_DIST_PATH, 'manifest.json');

// If a block has this many or fewer components, show the full block
const FULL_BLOCK_COMPONENT_THRESHOLD = 3;

interface BlockInfo {
  id: string;
  name: string;
  description: string;
  tags: string[];
  file: string;
  componentsUsed?: string[];
}

interface BlocksManifest {
  blocks: BlockInfo[];
  categories: string[];
  generatedAt: string;
}

export class ComponentUsageExamplesResource
  implements AsyncResourceHandler<string | string[]>
{
  private _blocksManifest: BlocksManifest | null = null;

  /**
   * Get usage examples for components from blocks
   * @param componentNames - Single component name or array of component names
   */
  public async get(componentNames: string | string[]): Promise<string> {
    await this._ensureBlocksManifestLoaded();

    if (!this._blocksManifest) {
      return `# Usage Examples

Unable to load blocks manifest. Ensure the blocks are built at: ${BLOCKS_MANIFEST_PATH}`;
    }

    const names = Array.isArray(componentNames)
      ? componentNames
      : [componentNames];

    const results: string[] = [];

    for (const name of names) {
      const example = await this._getBlockExamplesForComponent(name);
      if (example) {
        results.push(example);
      }
    }

    if (results.length === 0) {
      const namesList = names.join(', ');
      return `# Usage Examples

No blocks found using: ${namesList}

Try calling \`get_forge_blocks\` to search for related patterns, or check if the component name is correct.`;
    }

    return results.join('\n\n---\n\n');
  }

  /**
   * Get all available blocks as a summary
   */
  public async getAll(): Promise<string> {
    await this._ensureBlocksManifestLoaded();

    if (!this._blocksManifest) {
      return '# Usage Examples\n\nUnable to load blocks manifest.';
    }

    const sections: string[] = [];
    sections.push('# All Available Blocks');
    sections.push('');
    sections.push(
      'Use `get_forge_blocks` to search and retrieve specific blocks, or `get_component_docs(format: "usage-examples")` with a component name to see examples.',
    );
    sections.push('');
    sections.push(`**Total Blocks:** ${this._blocksManifest.blocks.length}`);
    sections.push('');
    sections.push('| Block | Components Used |');
    sections.push('|-------|-----------------|');

    for (const block of this._blocksManifest.blocks) {
      const components = block.componentsUsed?.join(', ') || '-';
      sections.push(`| ${block.name} | ${components} |`);
    }

    return sections.join('\n');
  }

  /**
   * Get usage examples from blocks for a specific component
   */
  private async _getBlockExamplesForComponent(
    componentName: string,
  ): Promise<string | null> {
    if (!this._blocksManifest) {
      return null;
    }

    // Find blocks that use this component
    const componentLower = componentName.toLowerCase();
    const matchingBlocks = this._blocksManifest.blocks.filter(block => {
      if (!block.componentsUsed) {return false;}
      return block.componentsUsed.some(c => c.toLowerCase() === componentLower);
    });

    if (matchingBlocks.length === 0) {
      return null;
    }

    const sections: string[] = [];
    sections.push(`## ${componentName} - Usage Examples`);
    sections.push('');
    sections.push(
      `*Found ${matchingBlocks.length} block(s) using this component*`,
    );

    // Show up to 3 blocks
    const blocksToShow = matchingBlocks.slice(0, 3);

    for (const block of blocksToShow) {
      const blockFilePath = resolve(BLOCKS_DIST_PATH, block.file);
      try {
        const content = await fs.readFile(blockFilePath, 'utf-8');
        const componentCount = block.componentsUsed?.length ?? 0;

        sections.push('');
        sections.push(`### ${block.name}`);
        sections.push('');
        sections.push(`*${block.description}*`);
        sections.push('');

        // Decide whether to show full block or extract snippet
        if (componentCount <= FULL_BLOCK_COMPONENT_THRESHOLD) {
          // Small focused block - show the whole thing
          sections.push('```html');
          sections.push(this._normalizeIndentation(content.trim()));
          sections.push('```');
        } else {
          // Large composite block - extract just the component snippet(s)
          const snippets = this._extractComponentSnippets(
            content,
            componentName,
          );

          if (snippets.length > 0) {
            for (const snippet of snippets) {
              sections.push('```html');
              sections.push(snippet);
              sections.push('```');
              sections.push('');
            }
          } else {
            // Fallback to full block if extraction fails
            sections.push('```html');
            sections.push(this._normalizeIndentation(content.trim()));
            sections.push('```');
          }
        }
      } catch {
        // Skip blocks we can't read
      }
    }

    if (matchingBlocks.length > blocksToShow.length) {
      sections.push('');
      sections.push(
        `*${matchingBlocks.length - blocksToShow.length} more block(s) available. Call \`get_forge_blocks(component: "${componentName}")\` to see all.*`,
      );
    }

    return sections.join('\n');
  }

  /**
   * Extract component snippets from HTML content
   * Returns just the specific component tag(s) rather than the full block
   */
  private _extractComponentSnippets(
    html: string,
    componentName: string,
  ): string[] {
    const snippets: string[] = [];
    const tagName = componentName.toLowerCase();

    // Find all opening tags for this component
    const openTagRegex = new RegExp(`<${tagName}[\\s>]`, 'gi');
    let match;

    while ((match = openTagRegex.exec(html)) !== null) {
      const startIndex = match.index;

      // Find the matching closing tag, accounting for nesting
      const snippet = this._extractTagWithContent(html, startIndex, tagName);
      if (snippet) {
        // Normalize indentation
        const normalized = this._normalizeIndentation(snippet);
        snippets.push(normalized);
      }
    }

    // Limit to first 2 snippets per block
    return snippets.slice(0, 2);
  }

  /**
   * Extract a complete tag with its content, handling nested tags of the same type
   */
  private _extractTagWithContent(
    html: string,
    startIndex: number,
    tagName: string,
  ): string | null {
    let depth = 0;
    let i = startIndex;
    const len = html.length;

    let inTag = false;
    let foundFirstTag = false;

    while (i < len) {
      if (html[i] === '<') {
        // Check for closing tag
        if (
          html.substring(i, i + tagName.length + 3).toLowerCase() ===
          `</${tagName}`
        ) {
          depth--;
          if (depth === 0) {
            const closeEnd = html.indexOf('>', i);
            if (closeEnd !== -1) {
              return html.substring(startIndex, closeEnd + 1);
            }
          }
          i += tagName.length + 2;
        }
        // Check for opening tag
        else if (
          html.substring(i, i + tagName.length + 1).toLowerCase() ===
          `<${tagName}`
        ) {
          const nextChar = html[i + tagName.length + 1];
          if (nextChar === ' ' || nextChar === '>' || nextChar === '/') {
            inTag = true;
            foundFirstTag = true;
            depth++;
          }
        }
      } else if (html[i] === '>' && inTag) {
        inTag = false;
        // Check for self-closing tag
        if (html[i - 1] === '/') {
          depth--;
          if (depth === 0 && foundFirstTag) {
            return html.substring(startIndex, i + 1);
          }
        }
      }
      i++;
    }

    return null;
  }

  /**
   * Normalize indentation by removing common leading whitespace
   */
  private _normalizeIndentation(snippet: string): string {
    const lines = snippet.split('\n');
    if (lines.length <= 1) {return snippet.trim();}

    // Find minimum indentation (excluding empty lines)
    let minIndent = Infinity;
    for (const line of lines) {
      if (line.trim().length === 0) {continue;}
      const indent = line.match(/^(\s*)/)?.[1].length ?? 0;
      minIndent = Math.min(minIndent, indent);
    }

    if (minIndent === Infinity || minIndent === 0) {return snippet.trim();}

    // Remove the common indentation
    return lines
      .map(line => (line.trim().length === 0 ? '' : line.substring(minIndent)))
      .join('\n')
      .trim();
  }

  /**
   * Ensure the blocks manifest is loaded
   */
  private async _ensureBlocksManifestLoaded(): Promise<void> {
    if (this._blocksManifest === null) {
      try {
        const content = await fs.readFile(BLOCKS_MANIFEST_PATH, 'utf-8');
        this._blocksManifest = JSON.parse(content);
      } catch {
        this._blocksManifest = null;
      }
    }
  }
}
