"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOptionsHandler = exports.templateInit = void 0;
const chalk_1 = __importDefault(require("chalk"));
const child_process_1 = __importDefault(require("child_process"));
const fs_1 = __importDefault(require("fs"));
const inquirer_1 = __importDefault(require("inquirer"));
const nunjucks_1 = __importDefault(require("nunjucks"));
const path_1 = __importDefault(require("path"));
const tempDeps_1 = require("./tempDeps");
const currentPath = process.cwd();
const binaryFilesRex = /\.(png|jpg|gif|jpeg|webp|ico|mp4)$/;
let appType = 'js';
let appTemplate = 'vue-js';
async function templateInit(appName, template) {
    const rootPath = path_1.default.join(__dirname, `../../temp/${template}`);
    appTemplate = template;
    appType = getCurrentAppType(template);
    const targetDirPath = path_1.default.join(currentPath, appName);
    await checkDirNameUseful(appName);
    fs_1.default.mkdirSync(targetDirPath);
    console.log(chalk_1.default.green(`正在创建${template}项目...`));
    createDir(rootPath, appName, targetDirPath);
    createCommonFiles(appName);
    installDependencies(targetDirPath, appName, template);
}
exports.templateInit = templateInit;
function getCurrentAppType(template) {
    switch (template) {
        case 'vue-ts':
            return 'ts';
        case 'vue-js':
            return 'js';
        case 'react-js':
            return 'jsx';
        case 'react-ts':
            return 'tsx';
        default:
            return 'js';
    }
}
function createDir(sourceDir, appName, dirName) {
    const targetDir = fs_1.default.readdirSync(sourceDir);
    targetDir.forEach(fileName => {
        const sourceFilePath = path_1.default.join(sourceDir, fileName);
        if (isFile(sourceFilePath)) {
            if (binaryFilesRex.test(fileName)) {
                const fileData = fs_1.default.readFileSync(sourceFilePath);
                const data = Buffer.from(fileData);
                createFile(fileName, data, dirName);
            }
            else {
                const fileData = fs_1.default.readFileSync(sourceFilePath).toString();
                const data = /.vue$/.test(fileName)
                    ? fileData
                    : nunjucks_1.default.renderString(fileData, {
                        appName,
                        appType,
                        appTemplate: appTemplate.includes('react') ? 'root' : 'app'
                    });
                createFile(fileName, data, dirName);
            }
        }
        else {
            const nextDir = path_1.default.join(dirName, fileName);
            const isExist = fs_1.default.existsSync(nextDir);
            isExist || fs_1.default.mkdirSync(nextDir);
            createDir(sourceFilePath, appName, nextDir);
        }
    });
}
function createFile(fileName, data, dirName) {
    const filePath = path_1.default.join(dirName, fileName);
    try {
        fs_1.default.writeFileSync(filePath, data);
        console.log(chalk_1.default.green(`创建: ${fileName}`));
    }
    catch (err) {
        console.log(chalk_1.default.red(`创建${fileName}失败：${err}`));
    }
}
function isFile(dirPath) {
    try {
        fs_1.default.readFileSync(dirPath);
        return true;
    }
    catch (error) {
        return false;
    }
}
function createCommonFiles(appName) {
    const appPath = path_1.default.join(currentPath, appName);
    const commonPath = path_1.default.join(__dirname, '../temp/common');
    createDir(commonPath, appName, appPath);
}
function installDependencies(targetDirPath, appName, template) {
    const useYarn = isYarnInstalled();
    tempDeps_1.downloadDeps(useYarn, template, targetDirPath);
    console.log(chalk_1.default.gray(`
      1.进入文件夹:\t cd ${appName}
      2.运行项目:\t ${useYarn ? 'yarn' : 'npm run'} dev
    `));
}
function isYarnInstalled() {
    try {
        child_process_1.default.spawnSync('yarn', ['-v'], { shell: true });
        return true;
    }
    catch (error) {
        console.log(chalk_1.default.yellow('未安装yarn，将使用npm下载依赖'));
        return false;
    }
}
async function checkDirNameUseful(appName) {
    try {
        const targetDirPath = path_1.default.join(currentPath, appName);
        const isExist = fs_1.default.existsSync(targetDirPath);
        if (!isExist)
            return;
        const answers = await inquirer_1.default.prompt({
            type: 'confirm',
            message: '发现当前目录已存在与项目同名的文件夹，是否覆盖？',
            name: 'cover'
        });
        if (answers.cover) {
            const appPath = path_1.default.join(currentPath, appName);
            tempDeps_1.deleteFolderRecursive(appPath);
        }
        else {
            process.exit(1);
        }
    }
    catch (error) {
        process.exit(1);
    }
}
async function createOptionsHandler(name) {
    try {
        await checkDirNameUseful(name);
        const answers = await inquirer_1.default.prompt([
            {
                type: 'list',
                message: '请选择需要使用的模板',
                name: 'template',
                choices: ['vue-ts', 'vue-js', 'react-ts', 'react-js']
            }
        ]);
        templateInit(name, answers.template);
    }
    catch (error) {
        console.log(chalk_1.default.red(error));
        process.exit(1);
    }
}
exports.createOptionsHandler = createOptionsHandler;
