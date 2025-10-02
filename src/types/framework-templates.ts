export type FrameworkType = 'angular' | 'react' | 'vue' | 'svelte' | 'lit';
export type ExampleType = 'basic' | 'advanced' | 'complete';

export interface FrameworkTemplateContext {
  // Component metadata
  tagName: string;
  componentName: string;
  moduleName: string;
  defineFunction: string;
  packageName: string;

  // Framework-specific data
  framework: FrameworkType;
  exampleType: ExampleType;

  // Component properties and events
  properties: TemplateProperty[];
  events: TemplateEvent[];

  // Content and configuration
  defaultSlotContent: string;
  installation: string;
  description: string;
  features?: string[];
}

export interface TemplateProperty {
  name: string;
  type?: string;
  default?: string;
  required?: boolean;
  description?: string;
  // Framework-specific formatted binding
  binding?: string;
}

export interface TemplateEvent {
  name: string;
  description?: string;
  // Framework-specific formatted handler
  handler?: string;
  handlerName?: string;
}

export interface FrameworkTemplateConfig {
  framework: FrameworkType;
  exampleType: ExampleType;
  component: string;
  features?: string[];
}

export interface FrameworkTemplateResult {
  code: string;
  installation: string;
  description: string;
}

// Template helper function signatures
export interface FrameworkHelpers {
  formatAngularProperty: (property: TemplateProperty) => string;
  formatAngularEvent: (event: TemplateEvent) => string;
  formatReactProperty: (property: TemplateProperty) => string;
  formatReactEvent: (event: TemplateEvent) => string;
  formatVueProperty: (property: TemplateProperty) => string;
  formatVueEvent: (event: TemplateEvent) => string;
  formatSvelteProperty: (property: TemplateProperty) => string;
  formatSvelteEvent: (event: TemplateEvent) => string;
  formatLitProperty: (property: TemplateProperty) => string;
  formatLitEvent: (eventName: string) => string;
  eventHandlerName: (eventName: string) => string;
  kebabToCamel: (str: string) => string;
  kebabToPascal: (str: string) => string;
  capitalizeFirst: (str: string) => string;
}
