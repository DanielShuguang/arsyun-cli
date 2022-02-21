/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: { node: true, 'vue/setup-compiler-macros': true },
  extends: ['plugin:vue/vue3-essential', '@vue/standard', '@vue/eslint-config-prettier'],
  parser: '@babel/eslint-parser',
  parserOptions: { ecmaVersion: 2020 },
  plugins: ['vue'],
  rules: {
    camelcase: 'off',
    'prefer-promise-reject-errors': 'off',
    'space-before-function-paren': 'off'
  }
}
