import * as path from "path";
import * as fs from "fs";
import * as util from "util";
import * as _ from "lodash";
import * as webpack from "webpack";
import { checkLocalizeType, defaultParse, format } from "./utils";

const readFile = util.promisify(fs.readFile);
const defaultI18nOutPutDir = "_locales";
const defaultI18nFilename = "messages.json";
const defaultLocalize = "zh_CN";
const defaultSpace = 2;

export interface IOutput {
  dirPath: string;
  filename: string;
}

export type Parse = (localizes: string[], target: any) => any;

export interface IOptions {
  entry: string;
  localizes?: string[];
  output?: IOutput;
  space?: number;
  parse?: Parse;
}

class WebpackExtractI18nPlugin implements webpack.Plugin {

  public options: IOptions;

  constructor(options: IOptions){
    const { space, output, entry } = options;
    if (_.isUndefined(options.localizes)) {
      options.localizes = [defaultLocalize];
    }
    if (_.isUndefined(space) || !_.isNumber(space)) {
      options.space = defaultSpace;
    }
    if (_.isUndefined(output)) {
      options.output = {
        dirPath: defaultI18nOutPutDir,
        filename: defaultI18nFilename
      }
    }
    if (!checkLocalizeType(options.localizes!)) {
      throw new Error("not support localize type.");
    }
    if (_.isUndefined(entry)) {
      throw new Error("must declare localize file path.");
    }
    if (_.isString(entry) && !entry.includes(".json")) {
      throw new Error("localize file is not json");
    }
    this.options = options;
  }

  apply(compiler: webpack.Compiler){
    const { entry, output, localizes, space, parse } = this.options;
    compiler.hooks.emit.tapAsync('WebpackChromeI18nPlugin', (compilation, callback) => {
      readFile(entry, "utf8").then((value) => {
        const i18nJSON = JSON.parse(value);
        if (parse) {
          return parse(localizes!, i18nJSON);
        }
        return defaultParse(localizes!, i18nJSON);
      }).then((res) => {
        const keys = Object.keys(res);
        const { dirPath, filename } = output!;
        keys.forEach((key) => {
          compilation.assets[
            path.normalize(`${dirPath}/${key}/${filename}`)
          ] = {
            source(){
              return format(res[key], space!);
            },
            size(){
              return format(res[key], space!).length;
            }
          }
        });
        callback();
      });
    });
  }
}

export default WebpackExtractI18nPlugin;

module.exports = WebpackExtractI18nPlugin;
