const chalk = require('chalk')
const cp = require('child_process')
const fs = require('fs')

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
    deleteFolderRecursive(appDir)
    console.log(chalk.red(`依赖下载失败，请重试：\n`, error))
    process.exit(1)
  }
}

/**
 * 删除目标文件夹及下面的所有文件
 * @param {string} path
 */
function deleteFolderRecursive(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach(file => {
      const curPath = path + '/' + file
      if (fs.statSync(curPath).isDirectory()) {
        // 文件夹
        deleteFolderRecursive(curPath)
      } else {
        // 删除文件
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}

module.exports = {
  downloadDeps
}
