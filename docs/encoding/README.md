---
sidebarDepth: 1
---

# Encoding API

You can use our encoding service to create your own song with Soundlinks. The process is as the following diagram:

![Soundlinks Encoding Service Diagram](./sequence.png)

## API - Start auto encoding

### Request

This API only accepts media link as one of parameter, so you need to upload the song waiting for encoding to a remote server in advance.

```
POST /v3/sl/encoding
```

#### Parameters in JWT payload

| Parameter | Type | Comment |
| ----- | ---- | ---- |
| src | string | Link of song |
| artist | string | Artist's name |

#### Parameters for request

| Parameter | Type | Comment |
| ----- | ---- | ---- |
| data | string | Data token |

### Response

| Parameter | Type | Comment |
| ----- | ---- | ---- |
| query | string | Query credential |

## API - Query encoding result

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

- processing
- complete
- failed

| Parameter | Type | Comment |
| ----- | ---- | ---- |
| status | string | Encoding status |
| message | string | Encoding message |

## Verifying Soundlinks

For verifying Soundlinks, please use the [SOUNDLINKS APP](https://soundlinks.net/apps) or integrate with our SDK.
