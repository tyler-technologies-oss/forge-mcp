# Tyler Tech ESLint Plugin

An ESLint plugin with the Tyler Tech recommended rules and configurations for JavaScript and TypeScript files. This plugin builds on top of the recommended
ESLint and TypeScript ESLint rules, providing additional custom rules and configurations tailored to the standards and best practices of Tyler Technologies.

## Installation

To install the package run the following command:

```bash
npm install -D @tylertech-eslint/eslint-plugin
```

## Usage

This package uses the ESLint flat config format **only**, and is compatible with ESLint v9 and above.

To use it, set up your ESLint config file as follows:

1. Create a file named `eslint.config.js` (use the `.mjs` extension if your package does not use `"type": "module"`) in the root of your project if it doesn't already exist.
2. Import the plugin and define your ESLint configuration using the `defineConfig` function. This will help with type checking and autocompletion in IDEs that support it.
3. Create a config and specify the `files` to target, and add an `extends` array with the configs you want to apply to those files.
4. Optionally, you can also specify files or directories to ignore.

```javascript
// eslint.config.js
import { defineConfig } from 'eslint/config';
import tylerPlugin from '@tylertech-eslint/eslint-plugin';

export default defineConfig([
  // Specify which TypeScript files the `tsRecommended` config should apply to
  {
    files: ['**/*.ts'],
    extends: [tylerPlugin.configs.tsRecommended],
    rules: {
      // If applicable, set any specific rules you want to add or override here
    }
  },

  // If you want to lint just JavaScript files separately, you can extend just the `recommended` config
  {
    files: ['**/*.{js,mjs}'],
    extends: [tylerPlugin.configs.recommended],
    rules: {
      // If applicable, set any specific rules you want to add or override here
    }
  },

  // Optionally ignore specific files or directories
  { ignores: ['path/to/some/directory/**/*', 'path/to/a/file.ts'] }
]);
```

## Configurations

This plugin provides the following configs:

| Config Name        | Description |
|--------------------|-------------|
| `recommended`      | A recommended set of rules for JavaScript files. Extends the ESLint recommended config. |
| `strict`           | A strict set of rules for JavaScript files. Extends the `recommended` config. |
| `tsRecommended`    | A recommended set of rules for TypeScript files. Extends the TypeScript ESLint recommended config. |
| `tsStylistic`      | A stylistic set of rules for TypeScript files, Extends the TypeScript ESLint stylistic config. |
| `tsStrict`         | A strict set of rules for TypeScript files. Extends the `tsRecommended` config. |

## Custom Rules

This plugin includes the following custom rules:

| Rule Name                                          | Description | Default Severity |
|----------------------------------------------------|-------------| -----------------|
| `@tylertech-eslint/invalid-relative-import-prefix` | Disallows relative imports that start with `./../`. | `error` |
| `@tylertech-eslint/require-private-modifier`       | Enforces the use of the `private` modifier for class members that start with an underscore (`_`). | `error` |
| `@tylertech-eslint/require-private-underscore`     | Enforces the use of an underscore (`_`) prefix for class members that are marked as `private`. | `error` |
