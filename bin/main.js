#!/usr/bin/env node

// 检测 node 版本相关依赖
const chalk = require('chalk')
const semver = require('semver')
const program = require('commander')
const packageJson = require('../package.json')
const { templateInit } = require('../lib/tempCreator')

/**
 * 检测 node 版本函数
 * @param {string} wanted
 * @param {string} id
 */
function checkNodeVersion(wanted, id) {
  if (!semver.satisfies(process.version, wanted)) {
    console.log(
      chalk.red(
        `你使用的Node版本号为：${process.version}，但${id}需运行在${wanted}` +
          '\n请升级你的Node版本'
      )
    )
    process.exit(1)
  }
}

checkNodeVersion(packageJson.engines.node, 'arsyun-cli')

if (semver.satisfies(process.version, '9.x')) {
  console.log(
    chalk.red(
      `你使用的Node版本是 ${process.version}.\n` + `强烈建议你使用最新LTS版本`
    )
  )
}

// 开始处理命令
program.version(packageJson.version, '-v, --version')

// 创建命令
program
  .command('create <app-name>')
  .description('create a new project')
  .option('--template <presetName>', '使用对应web模板')
  .action((name, cmd) => {
    templateInit(name, cmd)
  })

program.parse(process.argv)
