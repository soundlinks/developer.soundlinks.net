---
sidebarDepth: 1
---

# API

## Introduction

Our API is RESTful, uses [JWT](https://jwt.io/) as authentication, accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP  status codes.

The base URL is:

```
https://api.soundlinks.net
```

Please note that in the following API documentation, "parameters in JWT payload" means the parameters which should be included in payload `arg` when [generating token](/token/), while "parameters for request" means the parameter which is sent in the request body when requesting an API.

## Get recognition result

Get recognition result of Soundlinks for iOS & Android SDK. Please read the related SDK documentation first.

### Request

```
POST /v3/sl/result
```

#### Parameters for request

| Parameter | Type | Comment |
| ----- | ---- | ---- |
| data | string | Data token |

### Response

| Parameter | Type | Comment |
| ----- | ---- | ---- |
| media | object | Copyright information |
| links | object | Media links |

## Start encoding

You can use our encoding service to create your own song with Soundlinks. The process is as the following diagram:

![Soundlinks Encoding Service Diagram](./sequence.png)

### Request

This API only accepts media `file` URL as one of parameter, so you need to upload a song which will be encoded to a remote server in advance.

```
POST /v3/sl/encoding
```

#### Parameters in JWT payload

| Parameter | Type | Comment |
| ----- | ---- | ---- |
| artist | string | Artist name |
| file | string | Song URL |
| title | string | Song title |
| thumbnail | string | Song thumbnail URL |

#### Parameters for request

| Parameter | Type | Comment |
| ----- | ---- | ---- |
| data | string | Data token |

### Response

| Parameter | Type | Comment |
| ----- | ---- | ---- |
| query | string | Query credential |

## Query encoding result


Since the encoding may take several minutes to complete, you can use the `query` code to query the encoding result of your song.

### Request

```
POST /v3/sl/query
```

#### Parameters in JWT payload

| Parameter | Type | Comment |
| ----- | ---- | ---- |
| query | string | Query credential |

#### Parameters for request

| Parameter | Type | Comment |
| ----- | ---- | ---- |
| data | string | Data token |

### Response

These are the possible encoding status:

- null
- processing
- complete
- failed

| Parameter | Type | Comment |
| ----- | ---- | ---- |
| encodedUrl | string | Encoded song URL |
| status | string | Encoding status |

For verifying Soundlinks, please use the [SOUNDLINKS APP](https://soundlinks.net/apps) or try our SDK.
