import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    eslint({
      cache: false,
      include: ['src/**/*.js', 'tests/**/*.js'],
      exclude: ['node_modules', 'dist'],
      failOnWarning: false,
      failOnError: true,
    }),
  ],
  server: {
    open: true,
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        dead_code: true,
        passes: 2,
        pure_funcs: [
          'console.log',
          'console.info',
          'console.debug',
          'console.trace',
        ],
      },
      mangle: {
        keep_classnames: true,
      },
      format: {
        comments: false,
      },
    },
    assetsInlineLimit: Infinity,
    lib: {
      entry: 'src/serra-components.js',
      name: 'SerraComponents',
      fileName: 'serra-components',
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        globals: {},
        compact: true,
      },
    },
  },
});
