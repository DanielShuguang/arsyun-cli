module.exports = {
  root: true,
  env: { browser: true, es2021: true, node: true },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaFeatures: { jsx: true },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', 'react-hooks'],
  rules: {
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'react/jsx-key': 'off',
    'react-hooks/rules-of-hooks': 'error', // 检查 Hook 的规则
    'react-hooks/exhaustive-deps': 'warn' // 检查 effect 的依赖
  }
}
