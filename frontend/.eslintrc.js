module.exports = {
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  env: {
    browser: true,
    es6: true,
  },
  plugins: ['@typescript-eslint', '@tanstack/eslint-plugin-query', 'import', 'sort-destructure-keys'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/no-extraneous-dependencies': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
      },
    ],
    'react/require-default-props': 0,
    'import/prefer-default-export': 'off',
    'react/jsx-sort-props': 1,
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 0,
    'sort-destructure-keys/sort-destructure-keys': 2,
    'import/namespace': 0,
    '@typescript-eslint/member-ordering': [
      1,
      { default: { memberTypes: ['signature', 'method', 'constructor', 'field'], order: 'alphabetically' } },
    ],
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 1,
  },
  ignorePatterns: ['node_modules/', 'dist/'],
};
