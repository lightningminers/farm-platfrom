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

如果你是全局安装，那么可以使用 `farm` 命令来输出翻译结果，当你运行 `farm` 时当前的目录下必须存在 `farmconfig.json` 文件，此文件是工具必须依赖的配置，默认使用 Google 翻译，格式如下：

```json
{
  "origin": "zh_CN",
  "localizes": ["en", "zh_TW"],
  "output": {
    "filename": "translation_i18n.json"
  },
  "platfrom": "google"
}
```

如果你是用于 Node.js 包，导出模块中包含请求和数据的处理。
