---
sidebarDepth: 1
---

# Android SDK

## 快速集成

### 配置 gradle

1. 在项目下的 `build.gradle` 添加：

```groovy
allprojects {
    repositories {
        maven {
            url 'https://raw.githubusercontent.com/soundlinks/Soundlinks-Android-SDK/master'
        }
    }
}
```

2. 在 app 下的 `build.gradle` 添加：

```groovy
dependencies {
    implementation 'net.soundlinks:soundlinksSDK:1.0.0'
}
```

### 配置清单文件

```xml
<!-- 配置麦克风权限 -->
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS"/>

<!-- 在 application 节点配置 appId 和 appSecret -->
<meta-data android:name="SOUNLINKS_APPID" android:value="appId"/>
<meta-data android:name="SOUNLINKS_APPSECRET" android:value="appSecret"/>
```

## 使用方法

### 初始化

```java
Soundlinks.init(this, appId, appSecret, false);
```

参数说明：

| 参数 | 说明 |
|:----:|:----: |
| `Context context` | 上下文 |
| `String appId` | APP_ID，可在清单文件配置 |
| `String appSecret` | APP_SECRET，可在清单文件配置 |
| `Boolean isLog` | 是否开启日志 |

### 创建 `SLRecognizer`

创建 `SoundLinksRecognizer` 实例，并注册回调监听。

```java
SLRecognizer recognizer = new SLRecognizer(new SLRecognizerListener() {
    @Override
    public void onResult(int code) {

    }
});
```

识别到的 `code` 并不可读，需要调用下方生成 token 的方法。

### 开始识别

```java
recognizer.start();
```

### 结束识别

```java
recognizer.stop();
```

### 生成 token

将回调中的 `code` 转换成用来请求数据的 `token`，其有效期为 5 分钟。在有效期内可使用该 `token` 请求「[识别结果 API](/result/)」以获取歌曲最终的 Soundlinks 信息。

```java
String token = SoundlinksJWT.getInstance().generateToken(code);
```

::: tip 为什么识别结果要分 code 和 token？
`code` 相当于歌曲的 ID，每首歌都不同；`token` 一是考虑到每个 APP 的应用场景都不同，所以由开发者自行决定网络请求的时机；二是为了省去开发者自行生成签名麻烦，所以封装了生成 `token` 的方法。
:::

### ProGuard

根据你的 ProGuard 配置，可以添加以下内容：

```
# soundlinks
-keep class net.soundlinks.commonsdk.** { *; }

# jjwt
-keepattributes InnerClasses

-keep class io.jsonwebtoken.** { *; }
-keepnames class io.jsonwebtoken.* { *; }
-keepnames interface io.jsonwebtoken.* { *; }

-keep class org.bouncycastle.** { *; }
-keepnames class org.bouncycastle.** { *; }
-dontwarn org.bouncycastle.**
```

## 反馈建议

有任何问题和建议请在此[提出](https://github.com/soundlinks/Soundlinks-Android-SDK/issues/new) ，我们会及时处理。
