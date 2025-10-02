import {
  CEMComponentDeclaration,
  CustomElementsManifest,
} from '../types/index.js';
import {
  getPackageDiscoveryService,
  PackageDiscoveryService,
  PackageManifest,
} from './package-discovery.js';
import {
  getBundledManifestLoader,
  BundledManifestLoader,
} from './bundled-manifest-loader.js';

/**
 * Service responsible for discovering, loading, and managing Custom Elements Manifest (CEM) data
 * from Tyler Tech packages. Provides both dynamic package discovery and bundled manifest fallback.
 *
 * The loader follows a two-tier approach:
 * 1. First attempts dynamic discovery from installed Tyler Tech packages
 * 2. Falls back to bundled manifests if no packages are found
 *
 * Once loaded, builds a fast lookup map of components by tag name for efficient access.
 */
export class CEMLoader {
  private _cemData: CustomElementsManifest | null = null;
  private _componentsMap: Map<string, CEMComponentDeclaration> = new Map();
  private _packageDiscovery: PackageDiscoveryService;
  private _bundledManifestLoader: BundledManifestLoader;
  private _loadedPackages: PackageManifest[] = [];

  constructor(
    packageDiscovery?: PackageDiscoveryService,
    bundledManifestLoader?: BundledManifestLoader,
  ) {
    this._packageDiscovery = packageDiscovery || getPackageDiscoveryService();
    this._bundledManifestLoader =
      bundledManifestLoader || getBundledManifestLoader();
  }

  /**
   * Discover and load Custom Elements Manifest data from Tyler Tech packages.
   *
   * Uses a two-tier loading strategy:
   * 1. Attempts dynamic package discovery from installed packages
   * 2. Falls back to bundled manifests if no packages found
   * 3. Builds component lookup map for efficient access
   *
   * @param workingDirectory - Optional starting directory for package discovery (defaults to process.cwd())
   * @throws Error if no Tyler Tech packages or bundled manifests can be found
   */
  public async loadCEM(workingDirectory?: string): Promise<void> {
    // First try to load from user's installed packages
    await this.loadFromPackageDiscovery(workingDirectory);

    // If no packages found, try bundled manifests as fallback
    if (this._loadedPackages.length === 0) {
      await this.loadFromBundledManifests();
    }

    // If still no manifests, throw error
    if (this._loadedPackages.length === 0) {
      throw new Error(
        'No Tyler Tech packages or bundled manifests found. ' +
          'Please install @tylertech/forge or other Tyler Tech packages, or ensure this MCP server was built correctly.',
      );
    }

    this._buildComponentsMap();
  }

  /**
   * Load CEM data from Tyler Tech packages using dynamic discovery
   */
  public async loadFromPackageDiscovery(
    workingDirectory?: string,
  ): Promise<void> {
    try {
      const startPath = workingDirectory || process.cwd();
      this._loadedPackages =
        await this._packageDiscovery.discoverTylerTechPackages({
          startPath,
        });

      if (this._loadedPackages.length > 0) {
        this._cemData = this._mergeManifests(
          this._loadedPackages.map(p => p.content),
        );
      }
    } catch {
      // Package discovery failed, will try bundled manifests as fallback
      // Don't throw - let bundled manifests be tried as fallback
    }
  }

  /**
   * Load CEM data from bundled manifests as fallback
   */
  public async loadFromBundledManifests(): Promise<void> {
    try {
      const bundledPackages =
        await this._bundledManifestLoader.loadBundledManifests();

      if (bundledPackages.length > 0) {
        this._loadedPackages = bundledPackages;
        this._cemData = this._mergeManifests(
          bundledPackages.map(p => p.content),
        );
      }
    } catch {
      // Bundled manifest loading failed
      // This is the final fallback, so we let the error propagate to the caller
    }
  }

  /**
   * Build a map of tagName to component declaration for fast lookups
   */
  private _buildComponentsMap(): void {
    if (!this._cemData) {
      return;
    }

    this._componentsMap.clear();

    for (const module of this._cemData.modules) {
      for (const declaration of module.declarations) {
        if (
          declaration.kind === 'class' &&
          declaration.customElement &&
          declaration.tagName
        ) {
          this._componentsMap.set(declaration.tagName, declaration);
        }
      }
    }
  }

  /**
   * Get all component tag names
   */
  public getComponentTagNames(): string[] {
    return Array.from(this._componentsMap.keys()).sort();
  }

  /**
   * Get a component by its tag name
   */
  public getComponent(tagName: string): CEMComponentDeclaration | undefined {
    return this._componentsMap.get(tagName);
  }

  /**
   * Get all components
   */
  public getAllComponents(): CEMComponentDeclaration[] {
    return Array.from(this._componentsMap.values());
  }

  /**
   * Check if the CEM data is loaded
   */
  public isLoaded(): boolean {
    return this._cemData !== null;
  }

  /**
   * Get the raw CEM data
   */
  public getRawCEM(): CustomElementsManifest | null {
    return this._cemData;
  }

  /**
   * Get information about loaded packages
   */
  public getLoadedPackages(): PackageManifest[] {
    return [...this._loadedPackages];
  }

  /**
   * Merge multiple Custom Elements Manifests into a single manifest
   */
  private _mergeManifests(
    manifests: CustomElementsManifest[],
  ): CustomElementsManifest {
    if (manifests.length === 0) {
      throw new Error('No manifests to merge');
    }

    if (manifests.length === 1) {
      return manifests[0];
    }

    // Start with the first manifest as the base
    const merged: CustomElementsManifest = {
      schemaVersion: manifests[0].schemaVersion,
      readme: manifests[0].readme,
      modules: [],
    };

    // Merge modules from all manifests
    const moduleMap = new Map<string, any>();

    for (const manifest of manifests) {
      for (const module of manifest.modules) {
        const existingModule = moduleMap.get(module.path);

        if (existingModule) {
          // Merge declarations if the module already exists
          existingModule.declarations = [
            ...existingModule.declarations,
            ...module.declarations,
          ];

          // Merge exports if they exist
          if (module.exports && existingModule.exports) {
            existingModule.exports = [
              ...existingModule.exports,
              ...module.exports,
            ];
          } else if (module.exports) {
            existingModule.exports = module.exports;
          }
        } else {
          // Add new module
          moduleMap.set(module.path, { ...module });
        }
      }
    }

    merged.modules = Array.from(moduleMap.values());

    return merged;
  }
}

// Singleton instance
let cemLoaderInstance: CEMLoader | null = null;

/**
 * Get the singleton CEM loader instance
 */
export function getCEMLoader(): CEMLoader {
  if (!cemLoaderInstance) {
    cemLoaderInstance = new CEMLoader();
  }
  return cemLoaderInstance;
}
