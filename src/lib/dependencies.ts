const vueDeps = {
  deps: [
    'vue@next',
    'vue-router@next',
    'vuex@next',
    'ant-design-vue@next',
    '@vueuse/core'
  ],
  devDeps: [
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    '@vitejs/plugin-vue',
    '@vue/compiler-sfc',
    '@vue/eslint-config-standard',
    '@vue/eslint-config-typescript',
    'eslint-plugin-vue',
    'vue-tsc'
  ]
}

const reactDeps = {
  deps: [
    'ahooks',
    'antd',
    'react',
    'react-dom',
    'react-redux',
    'react-router-dom',
    '@reduxjs/toolkit'
  ],
  devDeps: [
    '@types/react',
    '@types/react-dom',
    '@types/react-router-dom',
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    '@vitejs/plugin-react-refresh',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    'vite-react-jsx',
    '@types/react-redux'
  ]
}

const commonDeps = {
  dep: ['lodash-es', 'axios', 'js-cookie'],
  devDep: [
    '@babel/eslint-parser',
    '@types/lodash-es',
    '@types/node',
    '@types/js-cookie',
    'babel-eslint',
    'eslint',
    'less',
    'typescript',
    'vite',
    'vite-plugin-compression',
    'vite-plugin-style-import',
    'eslint-plugin-import',
    'eslint-plugin-node',
    'eslint-plugin-promise',
    'eslint-plugin-standard'
  ]
}

export { commonDeps, reactDeps, vueDeps }
