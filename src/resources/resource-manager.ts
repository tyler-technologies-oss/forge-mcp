import { ForgeResource } from '../types/index.js';
import { getCEMLoader } from '../services/cem-loader.js';
import { ComponentDocsResource } from './components/component-docs-resource.js';
import { InstallationResource } from './installation/installation-resource.js';
import { UsageResource } from './usage/usage-resource.js';
import { TypographyResource } from './design-tokens/typography-resource.js';
import { IconsResource } from './icons/icons-resource.js';
import { DesignTokensResource } from './design-tokens/design-tokens-resource.js';
import { AnimationDesignTokensResource } from './design-tokens/design-tokens-animation-resource.js';
import { BorderDesignTokensResource } from './design-tokens/design-tokens-border-resource.js';
import { ColorDesignTokensResource } from './design-tokens/design-tokens-color-resource.js';
import { ElevationDesignTokensResource } from './design-tokens/design-tokens-elevation-resource.js';
import { LayeringDesignTokensResource } from './design-tokens/design-tokens-layering-resource.js';
import { ShapeDesignTokensResource } from './design-tokens/design-tokens-shape-resource.js';
import { SpacingDesignTokensResource } from './design-tokens/design-tokens-spacing-resource.js';
import { FrameworkAngularResource } from './framework/framework-angular-resource.js';
import { FrameworkReactResource } from './framework/framework-react-resource.js';
import { FrameworkVueResource } from './framework/framework-vue-resource.js';
import { FrameworkSvelteResource } from './framework/framework-svelte-resource.js';
import { FrameworkLitResource } from './framework/framework-lit-resource.js';
import { ComponentUsageExamplesResource } from './components/component-usage-examples-resource.js';
import { ComponentsListResource } from './components/components-brief-resource.js';

const RESOURCE_SCHEME = 'forge://';

/**
 * Central manager for Tyler Forge MCP resources.
 *
 * This class implements the streamlined resource model that exposes 8 core resource types
 * plus individual component resources, consolidating content to reduce LLM context overload
 * while maintaining comprehensive access through tools.
 */
export class ResourceManager {
  private _cemLoader = getCEMLoader();
  private _elementDocumentation = new ComponentDocsResource();
  private _installation = new InstallationResource();
  private _usage = new UsageResource();
  private _typography = new TypographyResource();
  private _icons = new IconsResource();
  private _designTokens = new DesignTokensResource();
  private _designTokensAnimation = new AnimationDesignTokensResource();
  private _designTokensBorder = new BorderDesignTokensResource();
  private _designTokensColor = new ColorDesignTokensResource();
  private _designTokensElevation = new ElevationDesignTokensResource();
  private _designTokensLayering = new LayeringDesignTokensResource();
  private _designTokensShape = new ShapeDesignTokensResource();
  private _designTokensSpacing = new SpacingDesignTokensResource();
  private _frameworkAngular = new FrameworkAngularResource();
  private _frameworkReact = new FrameworkReactResource();
  private _frameworkVue = new FrameworkVueResource();
  private _frameworkSvelte = new FrameworkSvelteResource();
  private _frameworkLit = new FrameworkLitResource();
  private _componentsList = new ComponentsListResource();
  private _componentUsageExamples = new ComponentUsageExamplesResource();

  /**
   * Initialize the resource manager by loading CEM data
   */
  public async initialize(workingDirectory?: string): Promise<void> {
    if (!this._cemLoader.isLoaded()) {
      try {
        await this._cemLoader.loadCEM(workingDirectory);
      } catch (error) {
        // Failed to load Custom Elements Manifest
        throw new Error(
          `Resource initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
      }
    }
  }

  /**
   * List all available resources according to the streamlined resource model.
   * @returns Promise resolving to array of available ForgeResource objects
   * @throws Error if CEM data cannot be loaded
   */
  public async listResources(): Promise<ForgeResource[]> {
    await this._ensureInitialized();

    const tagNames = this._cemLoader.getComponentTagNames();
    const resources: ForgeResource[] = [];

    // Add the components summary resource
    resources.push({
      uri: 'forge://components',
      name: 'Components',
      description:
        'Overview list of all Tyler Forge components with names and summaries',
      mimeType: 'text/markdown',
    });

    // Add installation and usage resources
    resources.push({
      uri: 'forge://installation',
      name: 'Tyler Forge Installation',
      description: 'Complete installation guide for Tyler Forge web components',
      mimeType: 'text/markdown',
    });

    resources.push({
      uri: 'forge://usage',
      name: 'Tyler Forge Usage Guide',
      description: 'Comprehensive usage guide for Tyler Forge web components',
      mimeType: 'text/markdown',
    });

    resources.push({
      uri: 'forge://components/usage-examples',
      name: 'Component Usage Examples',
      description:
        'Structural usage examples for all Tyler Forge components with basic HTML structure',
      mimeType: 'text/markdown',
    });

    resources.push({
      uri: 'forge://framework/angular',
      name: 'Tyler Forge Angular Integration',
      description:
        'Comprehensive framework-specific installation and usage instructions for Angular applications',
      mimeType: 'text/markdown',
    });

    resources.push({
      uri: 'forge://framework/react',
      name: 'Tyler Forge React Integration',
      description:
        'Comprehensive framework-specific installation and usage instructions for React applications',
      mimeType: 'text/markdown',
    });

    resources.push({
      uri: 'forge://framework/vue',
      name: 'Tyler Forge Vue Integration',
      description:
        'Comprehensive framework-specific installation and usage instructions for Vue applications',
      mimeType: 'text/markdown',
    });

    resources.push({
      uri: 'forge://framework/svelte',
      name: 'Tyler Forge Svelte Integration',
      description:
        'Comprehensive framework-specific installation and usage instructions for Svelte applications',
      mimeType: 'text/markdown',
    });

    resources.push({
      uri: 'forge://framework/lit',
      name: 'Tyler Forge Lit Integration',
      description:
        'Comprehensive framework-specific installation and usage instructions for Lit applications',
      mimeType: 'text/markdown',
    });

    resources.push({
      uri: 'forge://icons',
      name: 'Tyler Forge Icons',
      description:
        'Complete guide to installing and using Tyler Forge icons in your application',
      mimeType: 'text/markdown',
    });

    // Add consolidated design tokens resource
    resources.push({
      uri: 'forge://design-tokens',
      name: 'Tyler Forge Design Tokens',
      description:
        'Comprehensive Tyler Forge design tokens including colors, spacing, typography, animation, borders, elevation, layering, and shapes',
      mimeType: 'text/markdown',
    });

    resources.push({
      uri: 'forge://design-tokens/color',
      name: 'Tyler Forge Color Design Tokens',
      description:
        'Tyler Forge Design system color tokens, usage guidelines, and accessibility considerations',
      mimeType: 'text/markdown',
    });

    resources.push({
      uri: 'forge://design-tokens/spacing',
      name: 'Tyler Forge Spacing Design Tokens',
      description:
        'Tyler Forge Design system spacing tokens, usage guidelines, and best practices',
      mimeType: 'text/markdown',
    });

    resources.push({
      uri: 'forge://design-tokens/animation',
      name: 'Tyler Forge Animation Design Tokens',
      description:
        'Tyler Forge Design system animation tokens, usage guidelines, and best practices',
      mimeType: 'text/markdown',
    });

    resources.push({
      uri: 'forge://design-tokens/border',
      name: 'Tyler Forge Border Design Tokens',
      description:
        'Tyler Forge Design system border tokens, usage guidelines, and best practices',
      mimeType: 'text/markdown',
    });

    resources.push({
      uri: 'forge://design-tokens/elevation',
      name: 'Tyler Forge Elevation Design Tokens',
      description:
        'Tyler Forge Design system elevation tokens, usage guidelines, and best practices',
      mimeType: 'text/markdown',
    });

    resources.push({
      uri: 'forge://design-tokens/layering',
      name: 'Tyler Forge Layering Design Tokens',
      description:
        'Tyler Forge Design system layering tokens, usage guidelines, and best practices',
      mimeType: 'text/markdown',
    });

    resources.push({
      uri: 'forge://design-tokens/shape',
      name: 'Tyler Forge Shape Design Tokens',
      description:
        'Tyler Forge Design system shape tokens, usage guidelines, and best practices',
      mimeType: 'text/markdown',
    });

    resources.push({
      uri: 'forge://design-tokens/typography',
      name: 'Tyler Forge Typography',
      description:
        'Tyler Forge Design system typography guidelines and usage information',
      mimeType: 'text/markdown',
    });

    // Add individual component resources
    resources.push(
      ...tagNames.map(tagName => {
        const component = this._cemLoader.getComponent(tagName);
        return {
          uri: `forge://component/${tagName}`,
          name: tagName,
          description:
            component?.summary ||
            component?.description ||
            `Documentation for ${tagName} component`,
          mimeType: 'text/markdown',
        };
      }),
    );

    return resources;
  }

  /**
   * Read a resource by its URI and return the generated markdown content.
   *
   * @param uri - The resource URI (e.g., 'forge://components', 'forge://component/forge-button')
   * @returns Promise resolving to the markdown content for the resource
   * @throws Error if the URI is invalid or the resource cannot be found/generated
   */
  public async readResource(uri: string): Promise<string> {
    await this._ensureInitialized();

    switch (uri) {
      case 'forge://components': {
        const components = this._cemLoader.getAllComponents();
        return this._componentsList.get(components);
      }

      case 'forge://installation':
        return await this._installation.get();

      case 'forge://usage':
        return await this._usage.get();

      case 'forge://components/usage-examples':
        return await this._componentUsageExamples.getAll();

      case 'forge://framework/angular':
        return await this._frameworkAngular.get();

      case 'forge://framework/react':
        return await this._frameworkReact.get();

      case 'forge://framework/vue':
        return await this._frameworkVue.get();

      case 'forge://framework/svelte':
        return await this._frameworkSvelte.get();

      case 'forge://framework/lit':
        return await this._frameworkLit.get();

      case 'forge://icons':
        return await this._icons.get();

      case 'forge://design-tokens':
        return await this._designTokens.get();

      case 'forge://design-tokens/typography':
        return await this._typography.get();

      case 'forge://design-tokens/color':
        return await this._designTokensColor.get();

      case 'forge://design-tokens/spacing':
        return await this._designTokensSpacing.get();

      case 'forge://design-tokens/animation':
        return await this._designTokensAnimation.get();

      case 'forge://design-tokens/border':
        return await this._designTokensBorder.get();

      case 'forge://design-tokens/elevation':
        return await this._designTokensElevation.get();

      case 'forge://design-tokens/layering':
        return await this._designTokensLayering.get();

      case 'forge://design-tokens/shape':
        return await this._designTokensShape.get();

      default: {
        // Handle component resources ex. 'forge://component/forge-button'
        const componentMatch = uri.match(
          /^forge:\/\/component\/([^/]+)(?:\/(.+))?$/,
        );

        if (!componentMatch) {
          throw new Error(`Invalid resource URI: ${uri}`);
        }

        const [, tagName] = componentMatch;
        const component = this._cemLoader.getComponent(tagName);

        if (!component) {
          throw new Error(`Component not found: ${tagName}`);
        }

        return await this._elementDocumentation.get(component);
      }
    }
  }

  /**
   * Check if a resource URI is valid
   */
  public async isValidResourceUri(uri: string): Promise<boolean> {
    try {
      await this._ensureInitialized();
      const resources = await this.listResources();
      return resources.some(resource => resource.uri === uri);
    } catch {
      return (
        uri.startsWith(RESOURCE_SCHEME) && uri.length > RESOURCE_SCHEME.length
      );
    }
  }

  /**
   * Extract component name from resource URI
   */
  public extractComponentName(uri: string): string | null {
    const match = uri.match(/^forge:\/\/component\/(.+)$/);
    return match ? match[1] : null;
  }

  /**
   * Ensure CEM data is loaded
   */
  private async _ensureInitialized(): Promise<void> {
    if (!this._cemLoader.isLoaded()) {
      await this.initialize();
    }
  }

  /**
   * Get Angular framework guide content
   */
  public async getFrameworkAngular(): Promise<string> {
    await this._ensureInitialized();
    return await this._frameworkAngular.get();
  }

  /**
   * Get React framework guide content
   */
  public async getFrameworkReact(): Promise<string> {
    await this._ensureInitialized();
    return await this._frameworkReact.get();
  }

  /**
   * Get Vue framework guide content
   */
  public async getFrameworkVue(): Promise<string> {
    await this._ensureInitialized();
    return await this._frameworkVue.get();
  }

  /**
   * Get Svelte framework guide content
   */
  public async getFrameworkSvelte(): Promise<string> {
    await this._ensureInitialized();
    return await this._frameworkSvelte.get();
  }

  /**
   * Get Lit framework guide content
   */
  public async getFrameworkLit(): Promise<string> {
    await this._ensureInitialized();
    return await this._frameworkLit.get();
  }
}

// Singleton instance
let resourceManagerInstance: ResourceManager | null = null;

/**
 * Get the singleton resource manager instance
 */
export function getResourceManager(): ResourceManager {
  if (!resourceManagerInstance) {
    resourceManagerInstance = new ResourceManager();
  }
  return resourceManagerInstance;
}
