import path from 'path';

export default {
  base: 'https://rolling-scopes-school.github.io/naya252-JSFE2023Q4/nonograms/',
  plugins: [],
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[local]',
    },
  },
  build: {
    outDir: './nonograms',
    css: {
      devSourcemap: true, // enable CSS source maps during development
    },
    sourcemap: true, // enable production source maps
  },
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    },
  },
};
