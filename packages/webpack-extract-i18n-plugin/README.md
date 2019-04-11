# webpack-extract-i18n-plugin

![img](https://img.shields.io/github/license/icepy/farm-platfrom.svg)

i18n 国际化支持的 Webpack plugin

## Install

```bash
$ yarn add webpack-extract-i18n-plugin
```

## Usage

```js
const WebpackExtractI18nPlugin = require('webpack-extract-i18n-plugin');

[
  new WebpackExtractI18nPlugin({
    entry: './i18n.json'
  })
]
```

- entry: i18n.json 文件路径
- output: 输出的配置
  - dirPath: 需要输出的目录，默认输出 `_locales`
  - filename: 需要输出的文件名，默认输出 `messages.json`
- localizes: 需要提取的国际化支持，可在 [https://developer.chrome.com/webstore/i18n?csw=1#localeTable](https://developer.chrome.com/webstore/i18n?csw=1#localeTable) 中查询，默认提取 `zh_CN`
- space: JSON 格式输出的 Space，默认等于 `2`
- parse: 自定义处理函数，默认等于 `defaultParse`

## defaultParse

```js
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
```

## i18n.json

`i18n.json` 格式如下：

```json
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
```
