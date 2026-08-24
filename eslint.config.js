const js = require('@eslint/js')
const jestPlugin = require('eslint-plugin-jest')
const prettierPlugin = require('eslint-plugin-prettier')
const globals = require('globals')

module.exports = [
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    plugins: {
      prettier: prettierPlugin,
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        ...globals.commonjs,
      },
    },
    rules: {
      indent: ['error', 2],
      'no-var': 'error',
      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',
      quotes: ['error', 'single'],
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['tests/**/*.js'],
    ...jestPlugin.configs['flat/recommended'],
  },
]
