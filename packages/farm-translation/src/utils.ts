import * as _ from "lodash";
import { warning } from "usedjs/lib/loggers";

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
