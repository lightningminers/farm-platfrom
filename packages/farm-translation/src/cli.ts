#!/usr/bin/env node

import chalk from "chalk";
import * as path from "path";
import * as fs from "fs";
import * as util from "util";
import * as _ from "lodash";
import * as translate from "./translation";
import { format, IConfig, baiduPlatfrom } from "./utils";
import mapping from "./mapping";

const baidu = "baidu";
const google = "google";
const configFilename = "farmconfig.json";
const defaultFilename = "translation_i18n.json";
const cwd = process.cwd();
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const printError = (message: string) => {
  console.log(chalk.red(message));
}

const printWarning = (message: string) => {
  console.log(chalk.yellow(message));
}

const printOk = (message: string) => {
  console.log(chalk.green(message))
}

const run = async (i18nFilename: string) => {
  try {
    const configString = await readFile(`${path.resolve(cwd, configFilename)}`, "utf8");
    const configJSON = JSON.parse(configString) as IConfig;
    const i18nString = await readFile(`${path.resolve(cwd, i18nFilename)}`, "utf8");
    const i18nJSON = JSON.parse(i18nString);
    const { localizes, platfrom } = configJSON;
    if (platfrom === baidu) {
      const output = Object.create(null);
      if (_.isUndefined(configJSON.output)) {
        output["filename"] = defaultFilename;
      }
      if (_.isUndefined(configJSON.output.filename)) {
        output["filename"] = defaultFilename;
      }
      // const response = await translate.baidu('apple','en', 'zh', '2015063000000001', '12345678');
      const data = await baiduPlatfrom(i18nJSON, localizes, configJSON);
      const outputFile = path.resolve(cwd, output.filename);
      const outputData = format(data);
      await writeFile(outputFile, outputData);
      printOk(`${outputFile} 创建成功`);
    }
    if (platfrom === google) {
      // TODO
    }
  } catch (e) {
    printError(JSON.stringify(`${e.stack} \n ${e.message}`));
  }
}

export default run;
