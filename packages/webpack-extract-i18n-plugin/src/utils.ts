import * as _ from "lodash";
import localeMap from "./locale";
import { warning } from "usedjs/lib/loggers";

export const checkLocalizeType = (target: string[]): boolean => {
  let checkResult = true;
  for (const iterator of target) {
    if (!localeMap.includes(iterator)) {
      checkResult = false;
      break;
    }
  }
  return checkResult;
}


/*

entry
{
  "localize_key": {
    "zh_CN": {
      "message": "icepy"
    },
    "en": {
      "message": "icepy"
    },
    "zh_TW": {
      "message": "icepy"
    }
  }
}

output
{
  "en": {
    "localize_key": {
      "message": "icepy"
    }
  },
  "zh_CN": {
    "localize_key": {
      "message": "icepy"
    }
  }
}
*/

export const defaultParse = (localizes: string[], target: any) => {
  const map = Object.create(null);
  const keys = Object.keys(target);
  localizes.forEach((localize) => {
    const localizeMap = Object.create(null);
    for (const iterator of keys) {
      let t = target[iterator][localize];
      if (!_.isObject(t)) {
        warning(`${iterator} : ${localize} is Empty`);
        t = {
          "message": "",
        }
      }
      localizeMap[iterator] = t;
    }
    map[localize] = localizeMap;
  });
  return map;
}

export const format = (data: any, space: number) => {
  return JSON.stringify(data, null, space);
}
