#!/usr/bin/env node
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var path = __importStar(require("path"));
var fs = __importStar(require("fs"));
var util = __importStar(require("util"));
var _ = __importStar(require("lodash"));
var utils_1 = require("./utils");
var baidu = "baidu";
var google = "google";
var configFilename = "farmconfig.json";
var defaultFilename = "translation_i18n.json";
var cwd = process.cwd();
var readFile = util.promisify(fs.readFile);
var writeFile = util.promisify(fs.writeFile);
var printError = function (message) {
    console.log(chalk_1.default.red(message));
};
var printWarning = function (message) {
    console.log(chalk_1.default.yellow(message));
};
var printOk = function (message) {
    console.log(chalk_1.default.green(message));
};
var run = function (i18nFilename) { return __awaiter(_this, void 0, void 0, function () {
    var configString, configJSON, i18nString, i18nJSON, localizes, platfrom, output, data, outputFile, outputData, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, readFile("" + path.resolve(cwd, configFilename), "utf8")];
            case 1:
                configString = _a.sent();
                configJSON = JSON.parse(configString);
                return [4 /*yield*/, readFile("" + path.resolve(cwd, i18nFilename), "utf8")];
            case 2:
                i18nString = _a.sent();
                i18nJSON = JSON.parse(i18nString);
                localizes = configJSON.localizes, platfrom = configJSON.platfrom;
                if (!(platfrom === baidu)) return [3 /*break*/, 5];
                output = Object.create(null);
                if (_.isUndefined(configJSON.output)) {
                    output["filename"] = defaultFilename;
                }
                if (_.isUndefined(configJSON.output.filename)) {
                    output["filename"] = defaultFilename;
                }
                return [4 /*yield*/, utils_1.baiduPlatfrom(i18nJSON, localizes, configJSON)];
            case 3:
                data = _a.sent();
                outputFile = path.resolve(cwd, output.filename);
                outputData = utils_1.format(data);
                return [4 /*yield*/, writeFile(outputFile, outputData)];
            case 4:
                _a.sent();
                printOk(outputFile + " \u521B\u5EFA\u6210\u529F");
                _a.label = 5;
            case 5:
                if (platfrom === google) {
                    // TODO
                }
                return [3 /*break*/, 7];
            case 6:
                e_1 = _a.sent();
                printError(JSON.stringify(e_1.stack + " \n " + e_1.message));
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.default = run;
