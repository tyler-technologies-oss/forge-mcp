import {
  CEMComponentDeclaration,
  SyncResourceHandler,
} from '../../types/index.js';

export class ComponentsSummaryResource
  implements SyncResourceHandler<CEMComponentDeclaration[]>
{
  /**
   * Generate components summary resource
   */
  public get(components: CEMComponentDeclaration[]): string {
    const sections: string[] = [];

    // Header
    sections.push('# Tyler Forge Components Summary');
    sections.push('');

    // Table header
    sections.push('| Component | Summary |');
    sections.push('|-----------|---------|');

    // Table rows
    for (const component of components) {
      const tagName = component.tagName;
      const summary =
        component.summary ||
        component.description ||
        'No description available';
      // Escape pipe characters in summary
      const escapedSummary = summary.replace(/\|/g, '\\|');
      sections.push(`| ${tagName} | ${escapedSummary} |`);
    }

    sections.push('');
    sections.push('## Individual Documentation');
    sections.push('');
    sections.push('For detailed documentation of each component, see:');

    // Links to individual resources
    for (const component of components) {
      const tagName = component.tagName;
      sections.push(`- [${tagName}](forge://component/${tagName})`);
    }

    return sections.join('\n');
  }
}
