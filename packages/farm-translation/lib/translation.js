"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_js_1 = __importDefault(require("crypto-js"));
var axios_1 = __importDefault(require("axios"));
var createUUID_1 = __importDefault(require("usedjs/lib/createUUID"));
var querystring = __importStar(require("querystring"));
var BAIDU_URL = "http://api.fanyi.baidu.com/api/trans/vip/translate";
exports.baidu = function (q, from, to, appid, appsecret) {
    var salt = createUUID_1.default();
    var join = "" + appid + q + salt + appsecret;
    var sign = crypto_js_1.default.MD5(join).toString();
    var p = querystring.stringify({
        q: encodeURIComponent(q),
        from: from,
        to: to,
        appid: appid,
        appsecret: appsecret,
        salt: salt,
        sign: sign
    });
    return axios_1.default.get(BAIDU_URL + "?" + p);
};
exports.google = function () {
};
