---
sidebarDepth: 0
---

# API

## Introduction

Our API is RESTful, uses [JWT](https://jwt.io/) as authentication, accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP  status codes.

The base URL is:

```
https://stage-api.soundlinks.net:2022/v3
```

## Authentication

To use our API, an access token must be included in the request header, like `Authorization: Bearer {token}`. Please request this API to get your token, it is valid for 30 days.

### Request

```
POST /organization/token
```

**Parameters**

| Parameter | Type | Comment |
| ----- | ---- | ---- |
| appId | string | APP ID |
| appKey | string | APP Key |

### Response

| Parameter | Type | Comment |
| ----- | ---- | ---- |
| token | string | JWT token |

## Start encoding

### Request

This API requires `file` URL as one of parameter, so you need to upload the audio file which to be encoded to a remote server in advance (temporarily supporting wav/mp3 audio only).

> Due to limited resource of the testing server, it is recommended to use audio files that shorter than 2 minutes to test.

```
POST /sl/encoding
```

**Parameters**

| Parameter | Type | Comment |
| ----- | ---- | ---- |
| file | string | File URL |
| title | string | File title |
| artist | string | Artist name (pass any value for testing) |
| thumbnail | string | Thumbnail URL (pass any value for testing) |

**Example**

```
curl --location --request POST 'https://stage-api.soundlinks.net:2022/v3/sl/encoding' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <token>' \
--data-raw '
  "file": "https://foo.com/bar.mp3",
  "title": "bar-encoding",
  "artist": "john lennon",
  "thumbnail": "thumbnail.png"
}'
```

### Response

| Parameter | Type | Comment |
| ----- | ---- | ---- |
| error | string | Error message |
| query | string | Query credential |
| code | string | Soundlinks ID |

## Query encoding result

Since the encoding may take several minutes to complete, you can use the `query` code to query the encoding result of your audio file.

### Request

```
GET /sl/encoding/progress/{query}
```

**Parameters**

| Parameter | Type | Comment |
| ----- | ---- | ---- |
| query | string | Query credential |

### Response

These are the possible encoding status:

- null
- processing
- complete
- failed

| Parameter | Type | Comment |
| ----- | ---- | ---- |
| status | string | Encoding status |
| encodedFile | string | Encoded file URL |

## Start decoding

Decode the Soundlinks ID of an audio file based on its URL (temporarily supporting wav/mp3 audio only).

### Request

```
POST /sl/decoding
```

**Parameters**

| Parameter | Type | Comment |
| ----- | ---- | ---- |
| file | string | File URL |
| callbackUrl | string | Callback URL to receive decoding result |

### Response

| Parameter | Type | Comment |
| ----- | ---- | ---- |
| id | string | Decoding task ID |

After the decoding task is completed, the result will be posted as JSON format to the specific `callbackUrl`. The `id` in the responsed content is decoding task ID.

**If `callbackUrl` equals to `https://stage-api.soundlinks.net/v3`, Soundlinks will save the decoding result and developers can query the result using the next API.**

## Query decoding result

Query the decoding result with decoding task ID.

### Request

```
GET /sl/decoding/job/{id}
```

**Parameters**

| Parameter | Type | Comment |
| ----- | ---- | ---- |
| id | string | Decoding task ID |

### Response

| Parameter | Type | Comment |
| ----- | ---- | ---- |
| id | string | Decoding task ID |
| code | string | Soundlinks ID |

## Decrypt

Decrypt Soundlinks ID to readable data。

### Request

```
GET /sl/decoding/code/{id}
```

**Parameters**

| Parameter | Type | Comment |
| ----- | ---- | ---- |
| id | string | Soundlinks ID |

### Response

| Parameter | Type | Comment |
| ----- | ---- | ---- |
| data0 | integer | Data 0 |
| data1 | integer | Data 1 |
