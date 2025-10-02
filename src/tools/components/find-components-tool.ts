import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { BaseToolHandler, ToolInput } from '../tool-handler.js';
import { getResourceManager } from '../../resources/index.js';

export interface SearchComponentsInput extends ToolInput {
  query?: string;
  searchIn?: string[];
  limit?: number;
  matchAll?: boolean;
  includeRelated?: boolean;
}

interface ComponentMatch {
  component: import('../../types/index.js').CEMComponentDeclaration;
  score: number;
  matchReasons: string[];
  matchedTerms: string[];
}

export class SearchComponentsTool extends BaseToolHandler<SearchComponentsInput> {
  private _resourceManager = getResourceManager();

  constructor() {
    super(
      'find_components',
      'Search Tyler Forge components by name, description, or functionality with enhanced fuzzy matching. Supports multi-term queries like "app bar drawer". Returns all components when no query provided.',
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
              'Search query to find components by name, description, or features. Leave empty to list all components.',
          },
          searchIn: {
            type: 'array',
            items: {
              type: 'string',
              enum: [
                'name',
                'description',
                'properties',
                'methods',
                'events',
                'slots',
                'css-parts',
                'all',
              ],
            },
            description: 'Optional: specify what to search in (default: all)',
          },
          limit: {
            type: 'number',
            description:
              'Optional: maximum number of results to return (default: 10 for search, unlimited for list all)',
          },
          matchAll: {
            type: 'boolean',
            description:
              'Optional: require all search terms to match (default: false - match any term)',
          },
          includeRelated: {
            type: 'boolean',
            description:
              'Optional: include related components in results (default: false)',
          },
        },
        required: [],
      },
    };
  }

  public async execute(
    args: SearchComponentsInput,
  ): Promise<import('@modelcontextprotocol/sdk/types.js').CallToolResult> {
    const {
      query,
      searchIn,
      limit,
      matchAll = false,
      includeRelated = false,
    } = args;

    await this._resourceManager.initialize();

    // If no query provided, return all components (list mode)
    if (!query || query.trim() === '') {
      const content =
        await this._resourceManager.readResource('forge://components');

      if (limit && limit > 0) {
        const contentLines = content.split('\n');
        const filteredLines: string[] = [];
        let tableHeaderLine = '';
        let tableSeparatorLine = '';
        let componentCount = 0;

        for (const line of contentLines) {
          if (line.startsWith('| Component')) {
            tableHeaderLine = line;
            continue;
          }
          if (line.startsWith('|---')) {
            tableSeparatorLine = line;
            continue;
          }
          if (
            line.startsWith('|') &&
            line.includes('|') &&
            componentCount < limit
          ) {
            filteredLines.push(line);
            componentCount++;
          } else if (componentCount >= limit) {
            break;
          }
        }

        const beforeTable = contentLines.slice(
          0,
          contentLines.findIndex(l => l.startsWith('| Component')),
        );
        const limitedResultContent = [
          ...beforeTable,
          tableHeaderLine,
          tableSeparatorLine,
          ...filteredLines,
        ].join('\n');
        return this._createTextResponse(limitedResultContent);
      }

      return this._createTextResponse(content);
    }

    // Enhanced search with multi-term support and scoring
    const searchTerms = this._extractSearchTerms(query);
    const components = await this._getComponentsWithMetadata();
    const matches = this._searchComponents(
      components,
      searchTerms,
      searchIn,
      matchAll,
    );

    // Add related components if requested
    let finalMatches = matches;
    if (includeRelated && matches.length > 0) {
      finalMatches = this._addRelatedComponents(matches, components);
    }

    // Sort by score and apply limit
    finalMatches.sort((a, b) => b.score - a.score);
    const maxResults = limit || 10;
    const limitedMatches = finalMatches.slice(0, maxResults);

    if (limitedMatches.length === 0) {
      return this._createTextResponse(
        `No components found matching "${query}". Try different search terms like "button", "input", "dialog", or call search_components without a query to see all available components.`,
      );
    }

    // Format enhanced results
    const resultContent = this._formatEnhancedResults(
      query,
      searchTerms,
      limitedMatches,
      finalMatches.length > maxResults,
    );
    return this._createTextResponse(resultContent);
  }

  private _extractSearchTerms(query: string): string[] {
    return query
      .toLowerCase()
      .split(/[\s-_]+/)
      .filter(term => term.length > 0)
      .map(term => term.trim());
  }

  private async _getComponentsWithMetadata(): Promise<any[]> {
    const cemLoader = (this._resourceManager as any)._cemLoader;
    const components = cemLoader.getAllComponents();

    return components.map((component: any) => {
      const searchableFields = {
        tagName: component.tagName || '',
        name: component.name || '',
        summary: component.summary || '',
        description: component.description || '',
        properties: (component.members || [])
          .filter((m: any) => m.kind === 'field')
          .map((m: any) => `${m.name} ${m.description || ''}`)
          .join(' '),
        methods: (component.members || [])
          .filter((m: any) => m.kind === 'method')
          .map((m: any) => `${m.name} ${m.description || ''}`)
          .join(' '),
        events: (component.events || [])
          .map((e: any) => `${e.name} ${e.description || ''}`)
          .join(' '),
        slots: (component.slots || [])
          .map((s: any) => `${s.name} ${s.description || ''}`)
          .join(' '),
        cssParts: (component.cssParts || [])
          .map((p: any) => `${p.name} ${p.description || ''}`)
          .join(' '),
        states: (component.cssStates || [])
          .map((s: any) => `${s.name} ${s.description || ''}`)
          .join(' '),
      };

      return {
        component,
        searchableFields,
      };
    });
  }

  private _searchComponents(
    componentsWithMetadata: any[],
    searchTerms: string[],
    searchIn?: string[],
    matchAll: boolean = false,
  ): ComponentMatch[] {
    const searchAll =
      !searchIn || searchIn.length === 0 || searchIn.includes('all');
    const fieldsToSearch = searchAll
      ? [
          'tagName',
          'name',
          'summary',
          'description',
          'properties',
          'methods',
          'events',
          'slots',
          'cssParts',
          'states',
        ]
      : searchIn.filter(field => field !== 'all');

    const matches: ComponentMatch[] = [];

    for (const { component, searchableFields } of componentsWithMetadata) {
      const matchResult = this._scoreComponent(
        searchableFields,
        searchTerms,
        fieldsToSearch,
        matchAll,
      );

      if (matchResult.score > 0) {
        matches.push({
          component,
          score: matchResult.score,
          matchReasons: matchResult.matchReasons,
          matchedTerms: matchResult.matchedTerms,
        });
      }
    }

    return matches;
  }

  private _scoreComponent(
    searchableFields: any,
    searchTerms: string[],
    fieldsToSearch: string[],
    matchAll: boolean,
  ): { score: number; matchReasons: string[]; matchedTerms: string[] } {
    let totalScore = 0;
    const matchReasons: string[] = [];
    const matchedTerms: string[] = [];
    const termMatches = new Set<string>();

    for (const field of fieldsToSearch) {
      const fieldContent = (searchableFields[field] || '').toLowerCase();
      let fieldScore = 0;
      const fieldMatches: string[] = [];

      for (const term of searchTerms) {
        if (fieldContent.includes(term)) {
          termMatches.add(term);
          fieldMatches.push(term);

          // Score based on field importance and match type
          let termScore = 1;
          if (field === 'tagName' || field === 'name') {
            termScore = 10;
          } else if (field === 'summary' || field === 'description') {
            termScore = 5;
          } else if (field === 'properties') {
            termScore = 3;
          } else {
            termScore = 2;
          }

          // Bonus for exact word boundaries
          const wordBoundaryRegex = new RegExp(`\\b${term}\\b`);
          if (wordBoundaryRegex.test(fieldContent)) {
            termScore *= 1.5;
          }

          fieldScore += termScore;
        }
      }

      if (fieldScore > 0) {
        totalScore += fieldScore;
        matchReasons.push(this._getFieldDisplayName(field));
        matchedTerms.push(...fieldMatches);
      }
    }

    // Apply match strategy
    if (matchAll && termMatches.size < searchTerms.length) {
      return { score: 0, matchReasons: [], matchedTerms: [] };
    }

    // Bonus for matching multiple terms
    if (termMatches.size > 1) {
      totalScore *= 1 + (termMatches.size - 1) * 0.3;
    }

    return {
      score: totalScore,
      matchReasons: [...new Set(matchReasons)],
      matchedTerms: [...new Set(matchedTerms)],
    };
  }

  private _getFieldDisplayName(field: string): string {
    const displayNames: { [key: string]: string } = {
      tagName: 'name',
      name: 'name',
      summary: 'description',
      description: 'description',
      properties: 'properties',
      methods: 'methods',
      events: 'events',
      slots: 'slots',
      cssParts: 'css-parts',
      states: 'css-states',
    };
    return displayNames[field] || field;
  }

  private _addRelatedComponents(
    matches: ComponentMatch[],
    allComponents: any[],
  ): ComponentMatch[] {
    const relatedMap = this._buildRelatedComponentsMap();
    const existingTagNames = new Set(matches.map(m => m.component.tagName));
    const relatedMatches: ComponentMatch[] = [...matches];

    for (const match of matches) {
      const related = relatedMap.get(match.component.tagName) || [];

      for (const relatedTagName of related) {
        if (!existingTagNames.has(relatedTagName)) {
          const relatedComponentData = allComponents.find(
            c => c.component.tagName === relatedTagName,
          );
          if (relatedComponentData) {
            relatedMatches.push({
              component: relatedComponentData.component,
              score: match.score * 0.3, // Lower score for related components
              matchReasons: ['related-component'],
              matchedTerms: match.matchedTerms,
            });
            existingTagNames.add(relatedTagName);
          }
        }
      }
    }

    return relatedMatches;
  }

  private _buildRelatedComponentsMap(): Map<string, string[]> {
    // Map of component relationships - components that often work together
    const relationships: { [key: string]: string[] } = {
      'forge-app-bar': [
        'forge-scaffold',
        'forge-toolbar',
        'forge-drawer',
        'forge-button',
        'forge-user-profile',
        'forge-app-bar-search',
        'forge-app-bar-menu-button',
        'forge-app-bar-notification-button',
        'forge-app-bar-help-button',
        'forge-icon-button',
      ],
      'forge-drawer': [
        'forge-app-bar',
        'forge-list',
        'forge-list-item',
        'forge-toolbar',
      ],
      'forge-scaffold': [
        'forge-app-bar',
        'forge-drawer',
        'forge-toolbar',
        'forge-card',
      ],
      'forge-toolbar': ['forge-scaffold', 'forge-button', 'forge-icon-button'],
      'forge-button': ['forge-toolbar'],
      'forge-icon-button': ['forge-toolbar'],
      'forge-dialog': ['forge-button', 'forge-backdrop'],
      'forge-list': ['forge-list-item', 'forge-drawer'],
      'forge-list-item': ['forge-list', 'forge-checkbox', 'forge-radio'],
      'forge-card': ['forge-toolbar', 'forge-button', 'forge-icon-button'],
      'forge-table': ['forge-pagination'],
      'forge-select': ['forge-option', 'forge-option-group'],
      'forge-autocomplete': ['forge-text-field'],
      'forge-tab-bar': ['forge-tab'],
      'forge-stepper': ['forge-step'],
      'forge-expansion-panel': [
        'forge-icon-button',
        'forge-button-area',
        'forge-open-icon',
      ],
    };

    return new Map(Object.entries(relationships));
  }

  private _formatEnhancedResults(
    originalQuery: string,
    searchTerms: string[],
    matches: ComponentMatch[],
    hasMore: boolean,
  ): string {
    const sections: string[] = [];

    sections.push(`# Search Results for "${originalQuery}"`);
    sections.push('');

    if (searchTerms.length > 1) {
      sections.push(`**Search terms:** ${searchTerms.join(', ')}`);
      sections.push('');
    }

    sections.push(
      `Found ${matches.length} matching component${matches.length === 1 ? '' : 's'}${hasMore ? ' (showing top results)' : ''}:`,
    );
    sections.push('');

    // Enhanced table with match info
    sections.push('| Component | Summary | Matches | Score |');
    sections.push('|-----------|---------|---------|-------|');

    for (const match of matches) {
      const tagName = match.component.tagName;
      const summary =
        match.component.summary ||
        match.component.description ||
        'No description available';
      const escapedSummary = summary.replace(/\|/g, '\\|');
      const matchInfo = match.matchReasons.join(', ');
      const score = Math.round(match.score * 10) / 10;

      sections.push(
        `| ${tagName} | ${escapedSummary} | ${matchInfo} | ${score} |`,
      );
    }

    sections.push('');
    sections.push('## Individual Documentation');
    sections.push('');
    sections.push('For detailed documentation of each component:');

    for (const match of matches) {
      const tagName = match.component.tagName;
      sections.push(`- [${tagName}](forge://component/${tagName})`);
    }

    if (hasMore) {
      sections.push('');
      sections.push(
        '*Tip: Use the `limit` parameter to see more results, or refine your search terms for more specific matches.*',
      );
    }

    return sections.join('\n');
  }
}
