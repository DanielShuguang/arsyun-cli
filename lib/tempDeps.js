const chalk = require('chalk')
const cp = require('child_process')

const cmdConfig = targetDirPath => ({
  env: process.env,
  cwd: targetDirPath,
  stdio: 'inherit',
  shell: true
})

const vueDeps = {
  deps: [
    'vue@next',
    'vue-router@next',
    'vuex@next',
    'lodash-es',
    'ant-design-vue@next',
    'axios',
    'js-cookie'
  ],
  devDeps: [
    '@types/lodash-es',
    '@types/node',
    '@types/js-cookie',
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    '@vitejs/plugin-vue',
    '@vue/compiler-sfc',
    '@vue/eslint-config-standard',
    '@vue/eslint-config-typescript',
    'eslint',
    'eslint-plugin-import',
    'eslint-plugin-vue',
    'eslint-plugin-node',
    'eslint-plugin-promise',
    'eslint-plugin-standard',
    'sass',
    'typescript',
    'vite',
    'vite-plugin-compression',
    'vite-plugin-style-import',
    'vue-tsc'
  ]
}

const reactDeps = {
  deps: [
    'ahooks',
    'antd',
    'axios',
    'lodash-es',
    'react',
    'react-dom',
    'react-redux',
    'react-router-dom',
    'lodash-es',
    'axios',
    'js-cookie',
    'mobx-react',
    'mobx'
  ],
  devDeps: [
    '@types/lodash-es',
    '@types/node',
    '@types/react',
    '@types/react-dom',
    '@types/js-cookie',
    '@types/react-redux',
    '@types/react-router-dom',
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    '@vitejs/plugin-react-refresh',
    'eslint',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    'typescript',
    'sass',
    'vite',
    'vite-plugin-compression',
    'vite-plugin-style-import'
  ]
}

/**
 * 下载依赖
 * @param {boolean} useYarn
 * @param {string} template
 * @param {string} appDir
 */
function downloadDeps(useYarn, template, appDir) {
  const targetDeps = template === 'vue-ts' ? vueDeps : reactDeps
  let npmCmd = 'npm'
  let action = 'install'
  if (useYarn) {
    npmCmd = 'yarn'
    action = 'add'
  }

  try {
    cp.spawnSync(
      npmCmd,
      [action, '-D', ...targetDeps.devDeps],
      cmdConfig(appDir)
    )
    cp.spawnSync(npmCmd, [action, ...targetDeps.deps], cmdConfig(appDir))
  } catch (error) {
    console.log(
      chalk.red(
        `依赖下载失败，可尝试使用 "${
          useYarn ? 'yarn' : 'npm install'
        }" 手动下载：\n`,
        error
      )
    )
  }
}

module.exports = {
  downloadDeps
}
