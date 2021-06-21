#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const commander_1 = __importDefault(require("commander"));
const semver_1 = __importDefault(require("semver"));
const package_json_1 = __importDefault(require("../package.json"));
const tempCreator_1 = require("./lib/tempCreator");
function checkNodeVersion(wanted, id) {
    if (!semver_1.default.satisfies(process.version, wanted)) {
        console.log(chalk_1.default.red(`你使用的Node版本号为：${process.version}，但${id}需运行在${wanted}` +
            '\n请升级你的Node版本'));
        process.exit(1);
    }
    if (semver_1.default.satisfies(process.version, '10.x')) {
        console.log(chalk_1.default.red(`你使用的Node版本是 ${process.version}.\n` + `强烈建议你使用最新LTS版本`));
    }
}
checkNodeVersion(package_json_1.default.engines.node, 'arsyun-cli');
commander_1.default.version(package_json_1.default.version, '-v, --version');
commander_1.default
    .command('create <app-name>')
    .description('create a new project')
    .option('--template <presetName>', '使用对应web模板')
    .action((name, cmd) => {
    if (cmd.template) {
        tempCreator_1.templateInit(name, cmd.template);
    }
    else {
        tempCreator_1.createOptionsHandler(name);
    }
});
commander_1.default.parse(process.argv);
