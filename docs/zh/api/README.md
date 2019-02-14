---
sidebarDepth: 1
---

# API

## 介绍

我们的 API 遵循 RESTful 风格，通过 [JWT](https://jwt.io/) 进行验证，接受 JSON 编码的请求，返回 JSON 编码的结果，并使用标准的 HTTP 状态码。

基地址是：

```
https://api.soundlinks.net
```

在以下 API 文档中需要注意的是，「JWT payload 参数」指的是[生成 token](/zh/token/) 时 payload 里的 `arg` 应该包含的参数，而「请求参数」指的是请求 API 时 request body 里应该传递的参数。

## 获取识别结果

适用于 iOS & Android SDK 获取 Soundlinks 识别结果。请先参阅相应的 SDK 文档。

### 请求

```
POST /v3/sl/result
```

#### 请求参数

| 字段 | 类型 | 备注 |
| ----- | ---- | ---- |
| data | string | 数据 token |

### 返回

| 字段 | 类型 | 备注 |
| ----- | ---- | ---- |
| media | object | 版权信息 |
| links | object | 媒体链接 |

## 自动编码

你可以使用我们的编码服务来创建属于自己的带有 Soundlinks 的歌曲。流程如下图所示：

![Soundlinks Encoding Service Diagram](./sequence.png)

### 请求

该接口仅接受歌曲文件（`file`）的 URL，所以需要事先把待编码的歌曲上传到远端服务器。

```
POST /v3/sl/encoding
```

#### JWT payload 参数

| 字段 | 类型 | 备注 |
| ----- | ---- | ---- |
| artist | string | 作者名字 |
| file | string | 歌曲 URL |
| title | string | 歌曲标题 |
| thumbnail | string | 歌曲封面 URL |

#### 请求参数

| 字段 | 类型 | 备注 |
| ----- | ---- | ---- |
| data | string | 数据 token |

### 返回

| 字段 | 类型 | 备注 |
| ----- | ---- | ---- |
| query | string | 查询凭证 |

## 查询编码结果

由于完成编码需要几分钟时间，你可以用返回的 `query` 代码去查询歌曲的加码结果。

### 请求

```
POST /v3/sl/query
```

#### JWT payload 参数

| 字段 | 类型 | 备注 |
| ----- | ---- | ---- |
| query | string | 查询凭证 |

#### 请求参数

| 字段 | 类型 | 备注 |
| ----- | ---- | ---- |
| data | string | 数据 token |

### 返回

返回的编码状态有以下可能：

- null
- processing
- complete
- failed

| 字段 | 类型 | 备注 |
| ----- | ---- | ---- |
| encodedUrl | string | 编码后的歌曲 URL |
| status | string | 编码状态 |

请使用 [SOUNDLINKS APP](https://soundlinks.net/apps) 或者试用我们的 SDK 后进行验证。
