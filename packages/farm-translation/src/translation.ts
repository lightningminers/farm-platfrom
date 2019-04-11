import cryptoJS from "crypto-js";
import axios from "axios";
import createUUID from "usedjs/lib/createUUID";
import { warning } from "usedjs/lib/loggers";
import * as querystring from "querystring";
import * as translation from "translation.js";

const BAIDU_URL = "http://api.fanyi.baidu.com/api/trans/vip/translate";

export const baidu = (q: string, from: string, to: string, appid: string, appsecret: string) => {
  // const _salt = `${Math.ceil(Math.random() * 10000)}${new Date().getTime()}`
  // const salt = Number(_salt.substring(0,10));
  const salt = 1435660288;
  const join = `${appid}${q}${salt}${appsecret}`;
  const sign = cryptoJS.MD5(join).toString();
  warning(`join ${join}---${sign}`);
  const p = querystring.stringify({
    q: encodeURIComponent(q),
    from,
    to,
    appid,
    appsecret,
    salt,
    sign
  });
  return axios.get(`${BAIDU_URL}?${p}`);
}

export const google = (q: string, from: string, to: string) => {
  return translation.google.translate({
    text: q,
    from,
    to
  });
}
