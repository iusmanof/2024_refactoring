/** @type {import("eslint").Linter.Config} */
const config = {
  languageOptions: {
    globals: {
      window: 'readonly',
      document: 'readonly',
      console: 'readonly',
    },
    parserOptions: {
      ecmaVersion: 12,
    },
  },
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
  ignores: ['**/*.test.js', 'node_modules/', 'dist/'],
};

export default config;
