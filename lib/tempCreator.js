const fs = require('fs')
const path = require('path')
var nunjucks = require('nunjucks')
const chalk = require('chalk')
const cp = require('node:child_process')

const currentPath = process.cwd()

function templateInit(appName, options) {
  const template = options.template || 'vue-ts'
  const rootPath = path.join(__dirname, `../temp/${template}`)

  const targetDirPath = path.join(currentPath, appName)
  fs.mkdirSync(targetDirPath)
  console.log(chalk.green(`正在创建${template}项目...`))
  createDir(rootPath, appName, targetDirPath)

  installDependencies(targetDirPath, appName)
}

function createDir(sourceDir, appName, dirName) {
  const targetDir = fs.readdirSync(sourceDir)

  targetDir.forEach(fileName => {
    const sourceFilePath = path.join(sourceDir, fileName)

    if (isFile(sourceFilePath)) {
      // 文件
      const fileData = fs.readFileSync(sourceFilePath).toString()
      const data = nunjucks.renderString(fileData, { appName })
      createFile(fileName, data, dirName)
    } else {
      // 文件夹
      const nextDir = path.join(dirName, fileName)
      fs.mkdirSync(nextDir)
      createDir(sourceFilePath, appName, nextDir)
    }
  })
}

function createFile(fileName, data, dirName) {
  const filePath = path.join(dirName, fileName)
  try {
    fs.writeFileSync(filePath, data)
    console.log(chalk.green(`创建: ${fileName}`))
  } catch (err) {
    console.log(chalk.red(`创建${fileName}失败：${err}`))
  }
}

function isFile(dirPath) {
  try {
    fs.readFileSync(dirPath)
    return true
  } catch (error) {
    return false
  }
}

function installDependencies(targetDirPath, appName) {
  const useYarn = isYarnInstalled()
  const npmCmd = useYarn ? 'yarn' : 'npm'
  cp.spawnSync(npmCmd, ['install'], {
    env: process.env,
    cwd: targetDirPath,
    stdio: 'inherit',
    shell: true
  })
  console.log(
    chalk.green(`
      1.进入文件夹:\t cd ./${appName}
      2.运行项目:\t ${npmCmd} dev
    `)
  )
}

function isYarnInstalled() {
  try {
    cp.spawnSync('yarn', ['-v'], {
      shell: true
    })
    return true
  } catch (error) {
    console.log(chalk.yellow('未安装yarn，将使用npm下载依赖'))
    return false
  }
}

module.exports = {
  templateInit
}
