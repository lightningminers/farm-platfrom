"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var _ = __importStar(require("lodash"));
var loggers_1 = require("usedjs/lib/loggers");
var mapping_1 = __importDefault(require("./mapping"));
var translate = __importStar(require("./translation"));
/*
{
  "SAY": {
    "message": ""
  }
}
*/
exports.filterOrigin = function (origin, target) {
    var map = Object.create(null);
    var keys = Object.keys(target);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var iterator = keys_1[_i];
        var t = target[iterator][origin];
        if (_.isUndefined(t)) {
            loggers_1.warning(iterator + " : " + origin + " is Empty");
            t = {
                "message": ""
            };
        }
        map[iterator] = t;
    }
    return map;
};
exports.format = function (data, space) {
    if (space === void 0) { space = 2; }
    return JSON.stringify(data, null, space);
};
exports.baiduPlatfrom = function (i18nJSON, localizes, config) { return __awaiter(_this, void 0, void 0, function () {
    var origin, keys, baiduFrom, _i, localizes_1, localize, baiduTo, _a, keys_2, iterator, t, o, response, data;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                origin = config.origin;
                keys = Object.keys(i18nJSON);
                baiduFrom = mapping_1.default[origin];
                _i = 0, localizes_1 = localizes;
                _b.label = 1;
            case 1:
                if (!(_i < localizes_1.length)) return [3 /*break*/, 6];
                localize = localizes_1[_i];
                baiduTo = mapping_1.default[localize];
                _a = 0, keys_2 = keys;
                _b.label = 2;
            case 2:
                if (!(_a < keys_2.length)) return [3 /*break*/, 5];
                iterator = keys_2[_a];
                t = i18nJSON[iterator];
                o = t[origin];
                return [4 /*yield*/, translate.baidu(o.message, baiduFrom, baiduTo, config.baidu.appId, config.baidu.appSecret)];
            case 3:
                response = _b.sent();
                data = response.data;
                if (!data.error_code) {
                    loggers_1.info(localize + "-" + iterator);
                    t[localize] = {
                        "message": data.trans_result.dst
                    };
                }
                else {
                    loggers_1.warning(localize + "-" + iterator + "-" + JSON.stringify(data));
                    t[localize] = {
                        "message": ""
                    };
                }
                _b.label = 4;
            case 4:
                _a++;
                return [3 /*break*/, 2];
            case 5:
                _i++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/, i18nJSON];
        }
    });
}); };
