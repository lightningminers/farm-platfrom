import * as _ from "lodash";
import { warning, info } from "usedjs/lib/loggers";
import mapping from "./mapping";
import * as translate from "./translation";

export interface IConfig {
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

/*
{
  "SAY": {
    "message": ""
  }
}
*/
export const filterOrigin = (origin: string, target: any) => {
  const map = Object.create(null);
  const keys = Object.keys(target);
  for (const iterator of keys) {
    let t = target[iterator][origin];
    if (_.isUndefined(t)) {
      warning(`${iterator} : ${origin} is Empty`);
      t = {
        "message": ""
      }
    }
    map[iterator] = t;
  }
  return map;
}


export const format = (data: any, space = 2) => {
  return JSON.stringify(data, null, space);
}

export const baiduPlatfrom = async(i18nJSON: any, localizes: string[], config: IConfig) => {
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
        info(`${localize}-${iterator}`);
        t[localize] = {
          "message": data.trans_result.dst
        }
      } else {
        warning(`${localize}-${iterator}-${JSON.stringify(data)}`);
        t[localize] = {
          "message": ""
        }
      }
    }
  }
  return i18nJSON;
}

export const googlePlatfrom = async(i18nJSON: any, localizes: string[], config: IConfig) => {
  const { origin } = config;
  const keys = Object.keys(i18nJSON);
  for (const localize of localizes) {
    for (const iterator of keys) {
      const t = i18nJSON[iterator];
      const o = t[origin];
      try {
        const response = await translate.google(o.message, origin, localize);
        const { result } = response;
        if (result) {
          info(`${localize}-${iterator}-${JSON.stringify(result)}`);
          t[localize] = {
            "message": result[0] || "",
          }
        }
      } catch (e) {
        warning(`code: ${e.code} | ${localize}-${iterator}-${JSON.stringify(e.message)}`);
        t[localize] = {
          "message": ""
        }
      }
    }
  }
  return i18nJSON;
}
