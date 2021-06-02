const chalk = require('chalk')
const cp = require('child_process')
const fs = require('fs')
const ora = require('ora')

const cmdConfig = targetDirPath => ({
  env: process.env,
  cwd: targetDirPath,
  shell: true
})

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
    '@babel/eslint-parser',
    '@types/lodash-es',
    '@types/node',
    '@types/js-cookie',
    'eslint',
    'less',
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
async function downloadDeps(useYarn, template, appDir) {
  const targetDeps = template.includes('vue') ? vueDeps : reactDeps
  const useTypescript = template.includes('ts')
  let npmCmd = 'npm'
  let action = 'install'
  if (useYarn) {
    npmCmd = 'yarn'
    action = 'add'
  }

  let devActions = [action, '-D', ...targetDeps.devDeps, ...commonDeps.devDep]
  let actions = [action, ...targetDeps.deps, ...commonDeps.dep]
  const tsRex = /(@types|typescript|vue-tsc)/
  if (!useTypescript) {
    actions = actions.filter(cmd => !tsRex.test(cmd))
    devActions = devActions.filter(cmd => !tsRex.test(cmd))
  }

  const spinner = ora('依赖下载中...').start()
  return new Promise(resolve => {
    const child1 = cp.spawn(npmCmd, devActions, cmdConfig(appDir))
    child1.on('close', () => {
      const child2 = cp.spawn(npmCmd, actions, cmdConfig(appDir))
      child2.on('close', () => {
        spinner.succeed('下载完成')
        resolve('success')
      })

      child2.on('error', err => errHandler(spinner, appDir, err))
    })

    child1.on('error', err => errHandler(spinner, appDir, err))
  })
}

/**
 * 依赖下载失败后响应
 * @param {ora.Ora} spinner
 * @param {string} appDir
 * @param {Error} err
 */
function errHandler(spinner, appDir, err) {
  spinner.fail('依赖下载失败，请重试：')
  console.log(chalk.red(err))
  deleteFolderRecursive(appDir)
  process.exit(1)
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
