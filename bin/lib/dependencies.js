"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vueDeps = exports.reactDeps = exports.commonDeps = void 0;
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
        'eslint-plugin-import',
        'eslint-plugin-vue',
        'eslint-plugin-node',
        'eslint-plugin-promise',
        'eslint-plugin-standard',
        'vue-tsc'
    ]
};
exports.vueDeps = vueDeps;
const reactDeps = {
    deps: [
        'ahooks',
        'antd',
        'react',
        'react-dom',
        'react-redux',
        'react-router-dom',
        'mobx-react',
        'mobx'
    ],
    devDeps: [
        '@types/react',
        '@types/react-dom',
        '@types/react-router-dom',
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint/parser',
        '@vitejs/plugin-react-refresh',
        'eslint-plugin-react',
        'eslint-plugin-react-hooks'
    ]
};
exports.reactDeps = reactDeps;
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
        'vite-plugin-style-import'
    ]
};
exports.commonDeps = commonDeps;
