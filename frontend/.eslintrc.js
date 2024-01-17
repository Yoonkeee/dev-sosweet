module.exports = {
  extends: ['airbnb', 'prettier', 'plugin:import/recommended'],
  env: {
    browser: true,
    es6: true,
  },
  plugins: ['import', 'sort-destructure-keys'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/no-extraneous-dependencies': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
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
  },
  ignorePatterns: ['node_modules/', 'dist/'],
};
