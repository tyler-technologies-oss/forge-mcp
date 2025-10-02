import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { BaseToolHandler, ToolInput } from '../tool-handler.js';
import { FrameworkAngularResource } from '../../resources/framework/framework-angular-resource.js';
import { FrameworkReactResource } from '../../resources/framework/framework-react-resource.js';
import { FrameworkVueResource } from '../../resources/framework/framework-vue-resource.js';
import { FrameworkSvelteResource } from '../../resources/framework/framework-svelte-resource.js';
import { FrameworkLitResource } from '../../resources/framework/framework-lit-resource.js';

export interface FrameworkSetupInput extends ToolInput {
  framework: 'angular' | 'react' | 'vue' | 'svelte' | 'lit';
}

export class FrameworkSetupTool extends BaseToolHandler<FrameworkSetupInput> {
  private readonly _frameworkResources = {
    angular: new FrameworkAngularResource(),
    react: new FrameworkReactResource(),
    vue: new FrameworkVueResource(),
    svelte: new FrameworkSvelteResource(),
    lit: new FrameworkLitResource(),
  };

  constructor() {
    super(
      'setup_framework',
      'Get complete framework-specific setup instructions for Tyler Forge components including installation, configuration, and best practices.',
    );
  }

  public getTool(): Tool {
    return {
      name: this.name,
      description: this.description,
      inputSchema: {
        type: 'object',
        properties: {
          framework: {
            type: 'string',
            enum: ['angular', 'react', 'vue', 'svelte', 'lit'],
            description:
              'Target framework for Tyler Forge setup and integration',
          },
        },
        required: ['framework'],
      },
    };
  }

  public async execute(
    args: FrameworkSetupInput,
  ): Promise<import('@modelcontextprotocol/sdk/types.js').CallToolResult> {
    const { framework } = args;

    const frameworkResource = this._frameworkResources[framework];
    if (!frameworkResource) {
      throw new Error(
        `Framework guide not found for ${framework}. Supported frameworks: angular, react, vue, svelte, lit`,
      );
    }

    try {
      const content = await frameworkResource.get();
      return this._createTextResponse(content);
    } catch (error) {
      throw new Error(
        `Failed to load ${framework} framework guide: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }
}
