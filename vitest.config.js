import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom', // Ambiente DOM otimizado para testes
    globals: true, // Permite usar describe, it, expect sem imports
    include: ['src/**/*.{test,spec}.{js,ts}', 'tests/**/*.{test,spec}.{js,ts}'],
    exclude: ['node_modules', 'dist', 'build'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'build/',
        '**/*.config.js',
        '**/*.test.js',
        '**/*.spec.js',
      ],
    },
    // Configurações específicas para web components
    setupFiles: ['./tests/setup.js'],
  },
});
