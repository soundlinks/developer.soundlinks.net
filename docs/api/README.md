---
sidebarDepth: 1
---

# API

## 介绍

我们的 API 遵循 RESTful 风格，通过 [JWT](https://jwt.io/) 进行验证，接受 JSON 编码的请求，返回 JSON 编码的结果，并使用标准的 HTTP 状态码。

- 生产环境 Base URL：https://api.soundlinks.net/v3
- 测试环境 Base URL：https://stage-api.soundlinks.net/v3

## 身份验证

在使用以下 API 时，除非在说明里指出“无需验证”，其它情况一律需要在 request header 里带上 `Authorization: Bearer {token}`。调用此 API 来获取 `token`，过期时间为 30 天。

```
POST /organization/token
```

#### 请求参数

| 字段 | 类型 | 备注 |
| ----- | ---- | ---- |
| appId | string | APP ID |
| appKey | string | APP Key |

### 返回

| 字段 | 类型 | 备注 |
| ----- | ---- | ---- |
| token | string | JWT token

## 编码音频

你可以使用编码服务来创建属于自己的带有 Soundlinks 的音频文件。流程如下图所示：

![Soundlinks Encoding Service Diagram](./sequence.jpg)

### 请求

该接口参数 `file` 仅接受音频文件的 URL，所以需要事先把待编码的音频上传到服务器（暂只支持 wav/mp3 格式的音频）。

```
POST /sl/encoding
```

#### 请求参数

| 字段 | 类型 | 备注 |
| ----- | ---- | ---- |
| artist | string | 作者名字 |
| file | string | 文件 URL |
| title | string | 文件标题 |
| thumbnail | string | 封面 URL |

### 返回

| 字段 | 类型 | 备注 |
| ----- | ---- | ---- |
| error | string | 错误信息 |
| query | string | 查询凭证 |
| code | string | Soundlinks ID |

## 查询编码结果

由于完成编码需要几分钟时间，你可以用编码 API 返回的 `query` 字段查询音频的编码结果。

### 请求

```
GET /sl/encoding/progress/{query}
```

#### 请求参数

| 字段 | 类型 | 备注 |
| ----- | ---- | ---- |
| query | string | 查询凭证 |

### 返回

返回的编码状态有以下可能：

- null
- processing
- complete
- failed

| 字段 | 类型 | 备注 |
| ----- | ---- | ---- |
| status | string | 编码状态 |
| encodedFile | string | 编码后的文件 URL |

## 解码音频

通过 URL 解码出音频中的 Soundlinks ID（暂只支持 wav/mp3 格式的音频）。

### 请求

```
POST /sl/decoding
```

#### 请求参数

| 字段 | 类型 | 备注 |
| ----- | ---- | ---- |
| file | string | 文件 URL |
| callbackUrl | string | 解码完成后的回调地址 |

如果 `callbackUrl` 使用 Base URL，Soundlinks 将会保存解码结果，开发者可使用下面的 API 查询解码结果。

### 返回

| 字段 | 类型 | 备注 |
| ----- | ---- | ---- |
| id | string | 解码任务 ID |

待 Soundlinks 解码完成后，会把结果以 JSON 格式 POST 到指定的 `callbackUrl`。POST 内容中的 `id` 为解码任务 ID，`code` 为 Soundlinks ID。示例：

```json
{
    "id": "95803265-b7af-c8ae-b2a3-16ee44c0b11a",
    "code": "4Npl1dGQwv6R"
}
```

## 查询解码结果

通过“解码任务 ID”查询解码结果。

### 请求

```
GET /sl/decoding/job/{id}
```

#### 请求参数

| 字段 | 类型 | 备注 |
| ----- | ---- | ---- |
| id | string | 解码任务 ID |

### 返回

| 字段 | 类型 | 备注 |
| ----- | ---- | ---- |
| result | object | 解码结果 |

示例：

```json
{
    "id": "e0cb3b4a-0aee-5b7f-1a37-f9a233dc0d51",
    "code": "LNownme2Ob4Z"
}
```
