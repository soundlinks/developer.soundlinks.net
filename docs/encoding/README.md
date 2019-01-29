---
sidebarDepth: 1
---

# Encoding API

You can use our encoding service to create your own song with Soundlinks. The process is as the following diagram:

![Soundlinks Encoding Service Diagram](./sequence.png)

## How to request encoding API

All API parameters will be transmitted using [JWT (JSON Web Tokens)](https://jwt.io/) to verify user's credentials and parameter's legality. The developers may choose any libraries as they wish depending on the development environment before proceeding to next steps.

The following example is based on Node.js, and other language and environment is similar. If you have any issues when generating JWT, please contact us for help.

### 1. Preparing `APP_ID` and `APP_SECRET`

A verified developer will get `APP_ID` and `APP_SECRET`. Please send email to [dev@soundlinks.net](mailto:dev@soundlinks.net) for the request.

### 2. Installing JWT library

Install [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken):

```bash
$ npm install -S jsonwebtoken
```

### 3. Construct JWT header

The encryption method for signature is using HMAC SHA256. Just keep the default algorithm:

```json
{
    "alg": "HS256",
    "typ": "JWT"
}
```

### 4. Construct JWT payload

Required JWT payload including:

- `iss` Your `APP_ID`
- `iat` The current timestamp to request data
- `mtd` API's HTTP method, like GET, POST, PUT, etc (uppercase)
- `url` API's request URL
- `arg` API's request parameters

Taking "Auto encoding API" for example, the complete code to generate JWT is like the following:

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

## API - Start auto encoding (work in progress)

### Request

This API only accepts media link as one of parameter, so you need to upload the song waiting for encoding to a remote server in advance.

```
POST /v3/sl/encoding
```

| Parameter | Type | Comment |
| ----- | ---- | ---- |
| src | string | Link of song |
| artist | string | Artist's name |

### Response

| Parameter | Type | Comment |
| ----- | ---- | ---- |
| query | string | Query credential |

## API - Query encoding result (work in progress)

### Request

```
POST /v3/sl/query
```

| Parameter | Type | Comment |
| ----- | ---- | ---- |
| query | string | Query credential |

### Response

These are the possible encoding status:

- processing
- complete
- failed

| Parameter | Type | Comment |
| ----- | ---- | ---- |
| status | string | Encoding status |
| message | string | Encoding message |

## Verifying Soundlinks

For verifying Soundlinks, please use the [SOUNDLINKS APP](https://soundlinks.net/apps) or integrate with our SDK.
