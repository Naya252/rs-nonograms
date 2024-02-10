export default {
  base: 'https://naya252.github.io/rs-nonograms/',
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
    // sourcemap: true, // enable production source maps
  },
};
