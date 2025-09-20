import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        process: 'readonly',
        HTMLElement: 'readonly',
        customElements: 'readonly',
        ShadowRoot: 'readonly',
        CustomEvent: 'readonly',
        global: 'writable',
        vi: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
  {
    files: ['**/*.js'],
    rules: {
      // Regras específicas para web components
      'no-undef': 'error',
      'class-methods-use-this': 'off', // Web components podem ter métodos sem usar this
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**', '*.min.js', '*.bundle.js'],
  },
];
