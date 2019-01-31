---
sidebarDepth: 1
---

# Recognition result API

## API - Get recognition result

For iOS & Android SDK to get recognition result of Soundlinks.

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
