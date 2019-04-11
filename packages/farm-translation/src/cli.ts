#!/usr/bin/env node

import chalk from "chalk";
import * as path from "path";
import * as fs from "fs";
import * as util from "util";
import * as _ from "lodash";
import { format, IConfig, baiduPlatfrom, googlePlatfrom } from "./utils";

const baidu = "baidu";
const google = "google";
const configFilename = "farmconfig.json";
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
    const { localizes, platfrom, output } = configJSON;
    if (platfrom === baidu) {
      if (_.isUndefined(configJSON.output) || _.isUndefined(configJSON.output.filename)) {
        throw new Error("output filename is empty.");
      }
      const data = await baiduPlatfrom(i18nJSON, localizes, configJSON);
      const outputFile = path.resolve(cwd, output.filename);
      const outputData = format(data);
      await writeFile(outputFile, outputData);
      printOk(`${outputFile} 创建成功`);
    }
    if (platfrom === google) {
      const data = await googlePlatfrom(i18nJSON, localizes, configJSON);
      const outputFile = path.resolve(cwd, output.filename);
      const outputData = format(data);
      await writeFile(outputFile, outputData);
      printOk(`${outputFile} 创建成功`);
    }
  } catch (e) {
    printError(JSON.stringify(`${e.stack} \n ${e.message}`));
  }
}

export default run;
