import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { BaseToolHandler, ToolInput } from '../tool-handler.js';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

// Local path for testing - blocks source location
const BLOCKS_BASE_PATH = '/Users/nick.andrews@tylertech.com/Desktop/dev/forge';
const BLOCKS_DIST_PATH = resolve(BLOCKS_BASE_PATH, 'blocks/dist');
const BLOCKS_MANIFEST_PATH = resolve(BLOCKS_DIST_PATH, 'manifest.json');

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

export interface GetBlocksInput extends ToolInput {
  query?: string;
  blockId?: string;
  category?: string;
  component?: string;
  limit?: number;
}

export class GetBlocksTool extends BaseToolHandler<GetBlocksInput> {
  constructor() {
    super(
      'get_forge_blocks',
      'Get Forge UI code blocks - pre-built patterns and examples that demonstrate correct Forge component usage. Use this FIRST before generating any Forge UI code to ensure accurate patterns. Can list/search blocks or fetch specific block content.',
    );
  }

  public getTool(): Tool {
    return {
      name: this.name,
      description: this.description,
      inputSchema: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description:
              'Describe the UI functionality you need (e.g., "form with validation", "data table with sorting", "user profile card"). Searches block descriptions to find matching functionality. Results are ranked by relevance - top results may be usable directly, while lower-ranked results can serve as starting points.',
          },
          blockId: {
            type: 'string',
            description:
              'Specific block ID to fetch the full HTML content for (e.g., "src/blocks/forms/login").',
          },
          category: {
            type: 'string',
            description:
              'Filter blocks by category (e.g., "forms", "tables", "application-layout").',
          },
          component: {
            type: 'string',
            description:
              'Filter blocks by Forge component usage. Returns all blocks that use the specified component (e.g., "forge-card", "forge-table", "forge-button"). Use this to see how a component is used across different contexts and patterns.',
          },
          limit: {
            type: 'number',
            description:
              'Maximum number of blocks to return when listing (default: 20).',
          },
        },
        required: [],
      },
    };
  }

  public async execute(
    args: GetBlocksInput,
  ): Promise<import('@modelcontextprotocol/sdk/types.js').CallToolResult> {
    const { query, blockId, category, component, limit = 20 } = args;

    try {
      const manifest = await this._loadManifest();

      // If a specific block ID is requested, return its content
      if (blockId) {
        return await this._getBlockContent(blockId, manifest);
      }

      // Otherwise, list/search blocks
      return this._listBlocks(manifest, query, category, component, limit);
    } catch (error) {
      throw new Error(
        `Failed to fetch blocks: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  private async _loadManifest(): Promise<BlocksManifest> {
    const content = await readFile(BLOCKS_MANIFEST_PATH, 'utf-8');
    return JSON.parse(content);
  }

  private async _getBlockContent(
    blockId: string,
    manifest: BlocksManifest,
  ): Promise<import('@modelcontextprotocol/sdk/types.js').CallToolResult> {
    // Find the block in the manifest
    const block = manifest.blocks.find(
      b =>
        b.id === blockId || b.file === blockId || b.file === `${blockId}.html`,
    );

    if (!block) {
      const availableIds = manifest.blocks.map(b => b.id).join('\n- ');
      throw new Error(
        `Block not found: "${blockId}". Available blocks:\n- ${availableIds}`,
      );
    }

    // Read the block file content from dist directory
    const blockFilePath = resolve(BLOCKS_DIST_PATH, block.file);
    const content = await readFile(blockFilePath, 'utf-8');

    const sections: string[] = [];
    sections.push(`# ${block.name}`);
    sections.push('');
    sections.push(`**Description:** ${block.description}`);
    sections.push(`**Tags:** ${block.tags.join(', ')}`);
    if (block.componentsUsed?.length) {
      sections.push(`**Components Used:** ${block.componentsUsed.join(', ')}`);
    }
    sections.push(`**ID:** ${block.id}`);
    sections.push('');
    sections.push('## Code');
    sections.push('');
    sections.push('```html');
    sections.push(content.trim());
    sections.push('```');
    sections.push('');
    sections.push(
      '> Use this code as a reference for implementing similar Forge UI patterns.',
    );

    return this._createTextResponse(sections.join('\n'));
  }

  private _listBlocks(
    manifest: BlocksManifest,
    query?: string,
    category?: string,
    component?: string,
    limit: number = 20,
  ): import('@modelcontextprotocol/sdk/types.js').CallToolResult {
    let blocks = manifest.blocks;

    // Filter by category if specified
    if (category) {
      const categoryLower = category.toLowerCase();
      blocks = blocks.filter(b => {
        const blockCategory = b.id.split('/')[2]; // e.g., "src/blocks/forms/login" -> "forms"
        return blockCategory?.toLowerCase() === categoryLower;
      });
    }

    // Filter by component if specified
    if (component) {
      const componentLower = component.toLowerCase();
      blocks = blocks.filter(b => {
        if (!b.componentsUsed) {return false;}
        return b.componentsUsed.some(c => c.toLowerCase() === componentLower);
      });
    }

    // Filter and score by query if specified
    if (query) {
      const searchTerms = query
        .toLowerCase()
        .split(/[\s-_]+/)
        .filter(t => t.length > 1);

      // Score each block for relevance
      const scoredBlocks = blocks.map(block => {
        const score = this._calculateRelevanceScore(block, searchTerms);
        return { block, score };
      });

      // Filter to blocks with any relevance, then sort by score descending
      blocks = scoredBlocks
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .map(({ block }) => block);
    }

    // Apply limit
    const limitedBlocks = blocks.slice(0, limit);
    const hasMore = blocks.length > limit;

    const sections: string[] = [];
    sections.push('# Forge UI Blocks');
    sections.push('');
    sections.push(
      'Pre-built code patterns demonstrating correct Forge component usage.',
    );
    sections.push(
      '**Results are ranked by functionality match.** Top results may fit your needs directly; others can serve as starting points for similar UI patterns.',
    );
    sections.push('');

    if (query) {
      sections.push(`**Search:** "${query}"`);
    }
    if (category) {
      sections.push(`**Category:** ${category}`);
    }
    if (component) {
      sections.push(`**Component:** ${component}`);
    }
    sections.push(`**Found:** ${blocks.length} block(s)`);
    sections.push('');

    // Available categories
    sections.push('## Categories');
    sections.push('');
    sections.push(manifest.categories.map(c => `- ${c}`).join('\n'));
    sections.push('');

    // Blocks table
    sections.push('## Available Blocks');
    sections.push('');
    sections.push('| Name | Description | Components Used | ID |');
    sections.push('|------|-------------|-----------------|-----|');

    for (const block of limitedBlocks) {
      const escapedDesc = block.description.replace(/\|/g, '\\|');
      const components = block.componentsUsed?.slice(0, 4).join(', ') || '-';
      sections.push(
        `| ${block.name} | ${escapedDesc} | ${components} | ${block.id} |`,
      );
    }

    if (hasMore) {
      sections.push('');
      sections.push(
        `*Showing ${limitedBlocks.length} of ${blocks.length} blocks. Use \`limit\` parameter to see more.*`,
      );
    }

    sections.push('');
    sections.push('## Usage');
    sections.push('');
    sections.push(
      'To get the full code for a specific block, call this tool with the `blockId` parameter:',
    );
    sections.push('```');
    sections.push('get_forge_blocks(blockId: "src/blocks/forms/login")');
    sections.push('```');

    return this._createTextResponse(sections.join('\n'));
  }

  /**
   * Calculate a relevance score for a block based on search terms.
   * Heavily weights description matches to surface blocks with matching functionality.
   */
  private _calculateRelevanceScore(
    block: BlockInfo,
    searchTerms: string[],
  ): number {
    let score = 0;
    const nameLower = block.name.toLowerCase();
    const descLower = block.description.toLowerCase();
    const tagsLower = block.tags.map(t => t.toLowerCase());

    // Tokenize description for word-level matching
    const descWords = descLower.split(/[\s,.\-_()]+/).filter(w => w.length > 2);

    for (const term of searchTerms) {
      // Name matches (moderate weight - helps with direct lookups)
      if (nameLower.includes(term)) {
        score += 10;
        // Exact word match in name bonus
        if (nameLower.split(/[\s\-_]+/).includes(term)) {
          score += 5;
        }
      }

      // Description matches (HEAVILY weighted - this is where functionality is described)
      if (descLower.includes(term)) {
        score += 25; // High base score for description match

        // Exact word match in description (not just substring)
        if (descWords.includes(term)) {
          score += 15; // Bonus for exact word match
        }

        // Functional keyword bonus - terms that indicate core functionality
        const functionalKeywords = [
          'form',
          'table',
          'list',
          'card',
          'modal',
          'dialog',
          'menu',
          'nav',
          'search',
          'filter',
          'sort',
          'edit',
          'delete',
          'create',
          'add',
          'upload',
          'download',
          'export',
          'import',
          'login',
          'auth',
          'submit',
          'validate',
          'input',
          'select',
          'checkbox',
          'radio',
          'toggle',
          'pagination',
          'grid',
          'layout',
          'header',
          'footer',
          'sidebar',
          'panel',
          'tab',
          'accordion',
          'dropdown',
          'button',
          'icon',
          'notification',
          'alert',
          'toast',
          'badge',
          'avatar',
          'profile',
          'settings',
          'dashboard',
          'chart',
          'graph',
          'data',
          'display',
          'empty',
          'loading',
          'error',
          'success',
          'warning',
          'info',
        ];
        if (functionalKeywords.includes(term)) {
          score += 10; // Extra bonus for core functional terms
        }
      }

      // Tag matches (good weight - tags indicate features/capabilities)
      for (const tag of tagsLower) {
        if (tag.includes(term)) {
          score += 15;
          // Exact tag match bonus
          if (tag === term) {
            score += 10;
          }
        }
      }
    }

    // Multi-term match bonus: reward blocks that match multiple search terms
    const matchedTerms = searchTerms.filter(
      term =>
        nameLower.includes(term) ||
        descLower.includes(term) ||
        tagsLower.some(t => t.includes(term)),
    );
    if (matchedTerms.length > 1) {
      score += matchedTerms.length * 8; // Bonus per additional matched term
    }

    // Coverage bonus: if most/all search terms match, this is likely a great fit
    const coverageRatio = matchedTerms.length / searchTerms.length;
    if (coverageRatio >= 0.75) {
      score += 20; // Strong coverage bonus
    } else if (coverageRatio >= 0.5) {
      score += 10; // Moderate coverage bonus
    }

    return score;
  }
}
