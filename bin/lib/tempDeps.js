"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFolderRecursive = exports.downloadDeps = exports.commonDeps = void 0;
const chalk_1 = __importDefault(require("chalk"));
const child_process_1 = __importDefault(require("child_process"));
const fs_1 = __importDefault(require("fs"));
const dependencies_1 = require("./dependencies");
Object.defineProperty(exports, "commonDeps", { enumerable: true, get: function () { return dependencies_1.commonDeps; } });
const cmdConfig = (targetDirPath) => ({
    env: process.env,
    cwd: targetDirPath,
    shell: true
});
function downloadDeps(useYarn, template, appDir) {
    const targetDeps = template.includes('vue') ? dependencies_1.vueDeps : dependencies_1.reactDeps;
    const useTypescript = template.includes('ts');
    let npmCmd = 'npm';
    let action = 'install';
    if (useYarn) {
        npmCmd = 'yarn';
        action = 'add';
    }
    let devActions = [action, '-D'].concat(targetDeps.devDeps, dependencies_1.commonDeps.devDep);
    let actions = [action].concat(targetDeps.deps, dependencies_1.commonDeps.dep);
    const tsRex = /(@types|typescript|vue-tsc)/;
    if (!useTypescript) {
        actions = actions.filter(cmd => !tsRex.test(cmd));
        devActions = devActions.filter(cmd => !tsRex.test(cmd));
    }
    try {
        child_process_1.default.spawnSync(npmCmd, devActions, cmdConfig(appDir));
        child_process_1.default.spawnSync(npmCmd, actions, cmdConfig(appDir));
    }
    catch (error) {
        console.log(chalk_1.default.red(error));
        deleteFolderRecursive(appDir);
        process.exit(1);
    }
}
exports.downloadDeps = downloadDeps;
function deleteFolderRecursive(path) {
    if (fs_1.default.existsSync(path)) {
        fs_1.default.readdirSync(path).forEach(file => {
            const curPath = path + '/' + file;
            if (fs_1.default.statSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            }
            else {
                fs_1.default.unlinkSync(curPath);
            }
        });
        fs_1.default.rmdirSync(path);
    }
}
exports.deleteFolderRecursive = deleteFolderRecursive;
