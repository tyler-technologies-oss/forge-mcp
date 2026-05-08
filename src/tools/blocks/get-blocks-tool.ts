import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { BaseToolHandler, ToolInput } from '../tool-handler.js';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

// Local path for testing - blocks source location
const BLOCKS_BASE_PATH =
  '/Users/nick.andrews@tylertech.com/Desktop/dev/forge/blocks';
const BLOCKS_MANIFEST_PATH = resolve(BLOCKS_BASE_PATH, 'dist/manifest.json');

interface BlockInfo {
  id: string;
  name: string;
  description: string;
  tags: string[];
  file: string;
}

interface BlocksManifest {
  blocks: BlockInfo[];
  categories: string[];
  generatedAt: string;
}

export interface GetBlocksInput extends ToolInput {
  blockId?: string;
}

export class GetBlocksTool extends BaseToolHandler<GetBlocksInput> {
  constructor() {
    super(
      'get_forge_blocks',
      `Get Forge UI code blocks - pre-built patterns demonstrating correct Forge component usage.

**Two modes:**
1. **List blocks** (no parameters): Returns the full blocks manifest as JSON. Analyze block descriptions to find patterns matching the required UI functionality. Multiple blocks can be combined.
2. **Get block content** (with blockId): Returns the full HTML code for a specific block.

**Workflow:** First call without parameters to get the manifest, analyze descriptions to identify relevant blocks, then fetch specific blocks by ID.`,
    );
  }

  public getTool(): Tool {
    return {
      name: this.name,
      description: this.description,
      inputSchema: {
        type: 'object',
        properties: {
          blockId: {
            type: 'string',
            description:
              'Block ID to fetch full HTML content for (e.g., "src/blocks/forms/login"). Omit to get the blocks manifest for analysis.',
          },
        },
        required: [],
      },
    };
  }

  public async execute(
    args: GetBlocksInput,
  ): Promise<import('@modelcontextprotocol/sdk/types.js').CallToolResult> {
    const { blockId } = args;

    try {
      const manifest = await this._loadManifest();

      // If a specific block ID is requested, return its content
      if (blockId) {
        return await this._getBlockContent(blockId, manifest);
      }

      // Otherwise, return the manifest for analysis
      return this._getManifest(manifest);
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

  private _getManifest(
    manifest: BlocksManifest,
  ): import('@modelcontextprotocol/sdk/types.js').CallToolResult {
    const sections: string[] = [];
    sections.push('# Forge UI Blocks Manifest');
    sections.push('');
    sections.push(
      'Analyze the block descriptions below to find patterns matching the required UI functionality.',
    );
    sections.push(
      'Multiple blocks can be combined. Use `blockId` parameter to fetch full HTML code.',
    );
    sections.push('');
    sections.push('```json');
    sections.push(JSON.stringify(manifest, null, 2));
    sections.push('```');

    return this._createTextResponse(sections.join('\n'));
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

    // Read the block file content
    const blockFilePath = resolve(BLOCKS_BASE_PATH, block.file);
    const content = await readFile(blockFilePath, 'utf-8');

    const sections: string[] = [];
    sections.push(`# ${block.name}`);
    sections.push('');
    sections.push(`**Description:** ${block.description}`);
    sections.push(`**Tags:** ${block.tags.join(', ')}`);
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
}
