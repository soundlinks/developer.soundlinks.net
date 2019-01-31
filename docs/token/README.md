---
sidebarDepth: 1
---

# Generating token

::: tip We have made it easier

When you get here, it's assumed that you have already known how to generate the data token with our SDK. If not, please read:

- [Generating token with iOS SDK](/ios/#generating-token)
- [Generating token with Android SDK](/android/#generating-token)

:::

In order to request other APIs, e.g. "[Encoding API](/encoding/)", you need to generate the data token **by yourself**.

All API parameters will be transmitted after [JWT (JSON Web Tokens)](https://jwt.io/) encryption to verify user's credentials and parameter's legality. The developers may choose any libraries as they wish depending on the development environment before proceeding to next steps.

The following example to generate token is based on Node.js, and other language and environment is similar. If you have any issues when generating token, please contact us for help.

### 1. Preparing `APP_ID` and `APP_SECRET`

A verified developer will get `APP_ID` and `APP_SECRET`. Please send email to [dev@soundlinks.net](mailto:dev@soundlinks.net) for the request.

### 2. Installing JWT library

Install [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken):

```bash
$ npm install -S jsonwebtoken
```

### 3. Constructing JWT header

The encryption method for signature is using HMAC SHA256. Just keep the default algorithm:

```json
{
    "alg": "HS256",
    "typ": "JWT"
}
```

### 4. Constructing JWT payload

Required JWT payload including:

- `iss` Your `APP_ID`
- `iat` The current timestamp (in second)
- `mtd` API's request method, like POST, PUT… (uppercase)
- `url` API's request URL
- `arg` API's request parameters

Taking "[Auto encoding API](/encoding/#api-start-auto-encoding)" for example, the complete code to generate JWT is like the following:

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
    arg: { src: 'https://example.com/song.mp3' },
}, APP_SECRET);
```

[Live Demo](https://runkit.com/wyudong/jwt-demo).

### 5. Starting request

When ready to request, set `Content-Type:application/json` in the request header and put `token` generated in the last step as `data` in the request body.

```json
{
    "data": <token>
}
```
