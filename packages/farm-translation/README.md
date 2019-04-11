# farm-translation

![img](https://img.shields.io/github/license/icepy/farm-platfrom.svg)

自动调百度翻译 API 或 Google translate API 进行翻译的命令行工具与 Node.js 包

## Install

```bash
$ npm i -g farm-translation
```

```bash
$ yarn add farm-translation
```

## Usage

如果你是全局安装，那么可以使用 `farm` 命令来输出翻译结果，当你运行 `farm` 时当前的目录下必须存在 `farmconfig.json` 文件，此文件是工具必须依赖的配置，默认使用百度翻译（Google 翻译需要翻墙），格式如下：

```json
{
  "origin": "zh_CN",
  "localizes": ["en", "zh_TW"],
  "output": {
    "filename": "translation_i18n.json"
  },
  "platfrom": "baidu",
  "baidu": {
    "appId": "",
    "appSecret": ""
  },
  "google": {
    "projectId": ""
  }
}
```

- 百度翻译使用的 `appId` 和 `appSecret` 请自行在 [http://api.fanyi.baidu.com/api/trans/product/index](http://api.fanyi.baidu.com/api/trans/product/index) 上注册。
- 关于 Google 翻译的调用，请参考 [https://cloud.google.com/docs/authentication/?hl=zh_CN&_ga=2.241616961.-272628168.1554971589](https://cloud.google.com/docs/authentication/?hl=zh_CN&_ga=2.241616961.-272628168.1554971589) 配置文件中只需要你的 projectId。

如果你是用于 Node.js 包，导出模块中包含请求和数据的处理。
