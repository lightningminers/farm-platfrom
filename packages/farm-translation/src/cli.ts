#!/usr/bin/env node

import chalk from "chalk";
import * as path from "path";
import * as fs from "fs";
import * as util from "util";
import * as translate from "./translation";
import { format } from "./utils";
import mapping from "./mapping";

interface IConfig {
  origin: string;
  localizes: string[];
  output: {
    filename: string;
  },
  platfrom: string;
  baidu?: {
    appId: string;
    appSecret: string;
  };
  google?: {
    projectId: string;
  }
}

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

const baiduPlatfrom = async(i18nJSON: any, localizes: string[], config: IConfig) => {
  const { origin } = config;
  const keys = Object.keys(i18nJSON);
  const baiduFrom = mapping[origin];
  for (const localize of localizes) {
    const baiduTo = mapping[localize];
    for (const iterator of keys) {
      const t = i18nJSON[iterator];
      const o = t[origin];
      const response = await translate.baidu(o.message, baiduFrom, baiduTo, config.baidu!.appId, config.baidu!.appSecret);
      const { data } = response;
      if (!data.error_code) {
        t[localize] = {
          "message": data.trans_result.dst
        }
      } else {
        printWarning(`${JSON.stringify(data)}`);
        t[localize] = {
          "message": ""
        }
      }
    }
  }
  console.log(i18nJSON);
  return i18nJSON;
}

const run = async (i18nFilename: string) => {
  try {
    const configString = await readFile(`${path.resolve(cwd, configFilename)}`, "utf8");
    const configJSON = JSON.parse(configString) as IConfig;
    const i18nString = await readFile(`${path.resolve(cwd, i18nFilename)}`, "utf8");
    const i18nJSON = JSON.parse(i18nString);
    const { localizes, output, platfrom } = configJSON;
    if (platfrom === baidu) {
      const response = await translate.baidu('apple','en', 'zh', '2015063000000001', '12345678');
      // const data = await baiduPlatfrom(i18nJSON, localizes, configJSON);
      const outputFile = path.resolve(cwd, output.filename || defaultFilename);
      const outputData = format(response.data);
      await writeFile(outputFile, outputData);
      printOk(`${outputFile} 创建成功`);
    }
  } catch (e) {
    printError(JSON.stringify(`${e.stack} \n ${e.message}`));
  }
}

export default run;
