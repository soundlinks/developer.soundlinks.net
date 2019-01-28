---
sidebarDepth: 1
---

# 识别结果 API

## API - 获取识别结果

适用于 iOS & Android SDK 获取 Soundlinks 识别结果。

### 请求

```
POST /v3/sl/result
```

| 字段 | 类型 | 备注 |
| ----- | ---- | ---- |
| data | string | 数据 token |

### 返回

| 字段 | 类型 | 备注 |
| ----- | ---- | ---- |
| media | object | 版权信息 |
| links | object | 媒体链接 |
