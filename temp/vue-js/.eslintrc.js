module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential', '@vue/standard'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020
  },
  plugins: ['vue'],
  rules: {
    'space-before-function-paren': 'off'
  }
}
