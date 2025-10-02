import {
  CEMComponentDeclaration,
  SyncResourceHandler,
} from '../../types/index.js';

export class ComponentsNamesResource
  implements SyncResourceHandler<CEMComponentDeclaration[]>
{
  public get(components: CEMComponentDeclaration[]): string {
    if (components.length === 0) {
      return 'No components available.';
    }

    return components
      .map(component => component.tagName)
      .sort()
      .join('\n');
  }
}
