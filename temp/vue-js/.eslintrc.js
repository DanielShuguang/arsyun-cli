module.exports = {
  root: true,
  env: { node: true },
  extends: ['plugin:vue/vue3-essential', '@vue/standard'],
  parser: '@babel/eslint-parser',
  parserOptions: { ecmaVersion: 2020 },
  plugins: ['vue'],
  rules: {
    camelcase: 'off',
    'prefer-promise-reject-errors': 'off',
    'space-before-function-paren': 'off'
  }
}
