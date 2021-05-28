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
  deps: ['vue@next', 'vue-router@next', 'vuex@next', 'ant-design-vue@next'],
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
}

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
}

const commonDeps = {
  dep: ['lodash-es', 'axios', 'js-cookie'],
  devDep: [
    '@types/lodash-es',
    '@types/node',
    '@types/js-cookie',
    'eslint',
    'sass',
    'typescript',
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
  const targetDeps = template.includes('vue') ? vueDeps : reactDeps
  const useTypescript = template.includes('ts')
  let npmCmd = 'npm'
  let action = 'install'
  if (useYarn) {
    npmCmd = 'yarn'
    action = 'add'
  }

  let actions = [action, '-D', ...targetDeps.devDeps, ...commonDeps.devDep]
  let devActions = [action, ...targetDeps.deps, ...commonDeps.dep]
  const tsRex = /(@types|typescript|vue-tsc)/
  if (!useTypescript) {
    actions = actions.filter(cmd => !tsRex.test(cmd))
    devActions = devActions.filter(cmd => !tsRex.test(cmd))
  }

  try {
    cp.spawnSync(npmCmd, actions, cmdConfig(appDir))
    cp.spawnSync(npmCmd, devActions, cmdConfig(appDir))
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
  downloadDeps,
  deleteFolderRecursive
}
