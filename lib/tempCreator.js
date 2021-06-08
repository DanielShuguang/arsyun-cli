const fs = require('fs')
const path = require('path')
var nunjucks = require('nunjucks')
const chalk = require('chalk')
const cp = require('child_process')
const inquirer = require('inquirer')
const { downloadDeps, deleteFolderRecursive } = require('./tempDeps')

const currentPath = process.cwd()
const binaryFilesRex = /\.(png|jpg|gif|jpeg|webp|ico|mp4)$/
let appType = 'js'
let appTemplate = 'vue-js'

/**
 * 初始化项目信息
 * @param {string} appName
 * @param {string} template
 */
async function templateInit(appName, template) {
  const rootPath = path.join(__dirname, `../temp/${template}`)
  appTemplate = template
  appType = getCurrentAppType()

  const targetDirPath = path.join(currentPath, appName)
  await checkDirNameUseful(appName)
  fs.mkdirSync(targetDirPath)
  console.log(chalk.green(`正在创建${template}项目...`))
  createDir(rootPath, appName, targetDirPath)
  createCommonFiles(appName)

  installDependencies(targetDirPath, appName, template)
}

/**
 * 启动文件后缀名确认
 * @param {string} template
 */
function getCurrentAppType(template) {
  switch (template) {
    case 'vue-ts':
      return 'ts'
    case 'vue-js':
      return 'js'
    case 'react-js':
      return 'jsx'
    case 'react-ts':
      return 'tsx'
    default:
      return 'js'
  }
}

/**
 * 创建文件夹
 * @param {string} sourceDir
 * @param {string} appName
 * @param {string} dirName
 */
function createDir(sourceDir, appName, dirName) {
  const targetDir = fs.readdirSync(sourceDir)

  targetDir.forEach(fileName => {
    const sourceFilePath = path.join(sourceDir, fileName)

    if (isFile(sourceFilePath)) {
      // 文件
      if (binaryFilesRex.test(fileName)) {
        const fileData = fs.readFileSync(sourceFilePath)
        const data = Buffer.from(fileData)
        createFile(fileName, data, dirName)
      } else {
        const fileData = fs.readFileSync(sourceFilePath).toString()
        const data = /.vue$/.test(fileName)
          ? fileData
          : nunjucks.renderString(fileData, {
              appName,
              appType,
              appTemplate: appTemplate.includes('react') ? 'root' : 'app'
            })
        createFile(fileName, data, dirName)
      }
    } else {
      // 文件夹
      const nextDir = path.join(dirName, fileName)
      const isExist = fs.existsSync(nextDir)
      // 文件夹不存在则新建文件夹
      isExist || fs.mkdirSync(nextDir)
      createDir(sourceFilePath, appName, nextDir)
    }
  })
}

/**
 * 创建文件
 * @param {string} fileName
 * @param {string | Buffer} data
 * @param {string} dirName
 */
function createFile(fileName, data, dirName) {
  const filePath = path.join(dirName, fileName)
  try {
    fs.writeFileSync(filePath, data)
    console.log(chalk.green(`创建: ${fileName}`))
  } catch (err) {
    console.log(chalk.red(`创建${fileName}失败：${err}`))
  }
}

/**
 * 判断是否为文件
 * @param {string} dirPath
 */
function isFile(dirPath) {
  try {
    fs.readFileSync(dirPath)
    return true
  } catch (error) {
    return false
  }
}

/**
 * 生存公共文件
 * @param {string} appName
 */
function createCommonFiles(appName) {
  const appPath = path.join(currentPath, appName)
  const commonPath = path.join(__dirname, '../temp/common')
  createDir(commonPath, appName, appPath)
}

/**
 * 开始下载依赖
 * @param {string} targetDirPath
 * @param {string} appName
 * @param {string} template
 */
async function installDependencies(targetDirPath, appName, template) {
  const useYarn = isYarnInstalled()
  await downloadDeps(useYarn, template, targetDirPath)
  console.log(
    chalk.gray(`
      1.进入文件夹:\t cd ${appName}
      2.运行项目:\t ${useYarn ? 'yarn' : 'npm run'} dev
    `)
  )
}

/** 是否存在 yarn */
function isYarnInstalled() {
  try {
    cp.spawnSync('yarn', ['-v'], { shell: true })
    return true
  } catch (error) {
    console.log(chalk.yellow('未安装yarn，将使用npm下载依赖'))
    return false
  }
}

/**
 * 检查本地是否存在同名文件夹
 * @param {string} appName
 */
async function checkDirNameUseful(appName) {
  try {
    const targetDirPath = path.join(currentPath, appName)
    const isExist = fs.existsSync(targetDirPath)
    if (!isExist) return

    const answers = await inquirer.prompt({
      type: 'confirm',
      message: '发现当前目录已存在与项目同名的文件夹，是否覆盖？',
      name: 'cover'
    })
    if (answers.cover) {
      const appPath = path.join(currentPath, appName)
      deleteFolderRecursive(appPath)
    } else {
      process.exit(1)
    }
  } catch (error) {
    process.exit(1)
  }
}

/**
 * 没有设置 template 时手动选择
 * @param {string} name
 */
async function createOptionsHandler(name) {
  try {
    await checkDirNameUseful(name)
    const answers = await inquirer.prompt([
      {
        type: 'list',
        message: '请选择需要使用的模板',
        name: 'template',
        choices: ['vue-ts', 'vue-js', 'react-ts', 'react-js']
      }
    ])
    templateInit(name, answers.template)
  } catch (error) {
    console.log(chalk.red(error))
    process.exit(1)
  }
}

module.exports = {
  templateInit,
  createOptionsHandler
}
