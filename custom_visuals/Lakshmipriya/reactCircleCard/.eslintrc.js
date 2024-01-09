module.exports = {
    env: {
      browser: true,
      es6: true,
    },
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: 'tsconfig.json',
      tsconfigRootDir: '.',
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: ['@typescript-eslint', 'react'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:powerbi-visuals/recommended',
    ],
    rules: {
      // Add any specific rules or overrides here
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  };
  