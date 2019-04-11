import cryptoJS from "crypto-js";
import axios from "axios";
import createUUID from "usedjs/lib/createUUID";
import * as querystring from "querystring";

const BAIDU_URL = "http://api.fanyi.baidu.com/api/trans/vip/translate";

export const baidu = (q: string, from: string, to: string, appid: string, appsecret: string) => {
  const salt = createUUID();
  const join = `${appid}${q}${salt}${appsecret}`;
  const sign = cryptoJS.MD5(join).toString();
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

export const google = () => {

}
