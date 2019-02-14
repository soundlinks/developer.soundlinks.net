---
sidebarDepth: 1
---

# 生成 token

::: tip 一切从简

当你看到这里时，我们假定你已经知道如何使用 SDK 生成数据 token 了。如果还不清楚，请参阅：

- [用 iOS SDK 生成 token](/zh/ios/#生成-token)
- [用 Android SDK 生成 token](/zh/android/#生成-token)

:::

要请求我们的 API，你需要**手动**生成 token。

请求 API 的参数将用 [JWT（JSON Web Tokens）](https://jwt.io/) 加密后传输，以验证使用方的身份和参数的合法性。开发者可根据使用环境选择合适的库进行接下来的步骤。

以下生成 token 的方法以 Node.js 为例，其它语言和环境也是类似的。如果在生成 token 时遇到任何问题，请联系我们。

### 1. 准备 `APP_ID` 和 `APP_SECRET`

经过认证的开发者将分配到一组 `APP_ID` 和 `APP_SECRET`，请发送邮件至 [dev@soundlinks.net](mailto:dev@soundlinks.net) 申请。

### 2. 安装 JWT 库

以 [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) 为例：

```bash
$ npm install -S jsonwebtoken
```

### 3. 构成 JWT header

签名加密算法使用 HMAC SHA256，即通常的默认算法：

```json
{
    "alg": "HS256",
    "typ": "JWT"
}
```

### 4. 构成 JWT payload

必需的 JWT payload 包括：

- `iss` 即 `APP_ID`
- `iat` 请求当时的时间戳（秒）
- `mtd` API 的请求方法，如 POST、PUT…（大写）
- `url` API 的请求 URL
- `arg` API 的请求参数（不含基地址）

以「[自动编码](/zh/encoding/#开始自动编码)」API 为例，生成完整 JWT 的代码如下：

```js
const jwt = require("jsonwebtoken");
const APP_ID = 'my_app_id';
const APP_SECRET = 'my_app_secret';

// Sign the payload
const token = jwt.sign({
    iss: APP_ID,
    iat: Math.floor(Date.now() / 1000),
    mtd: 'POST',
    url: '/v3/sl/encoding',
    arg: { file: 'https://example.com/dummy.mp3' },
}, APP_SECRET);
```

[在线 Demo](https://runkit.com/wyudong/jwt-demo)。

### 5. 开始请求

请求时，在 headers 里设置 `Content-Type:application/json`，然后将上一步生成的 `token` 作为 `data` 放在 body 里进行请求，即：

```json
{
    "data": <token>
}
```
